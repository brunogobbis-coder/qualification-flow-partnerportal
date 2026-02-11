'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ui';
import { submitQualification, type SubmissionResult } from '@/lib/submission';
import { analytics, trackObjectiveSelection, trackStepChange, trackFormSubmission, trackMerchantRedirect } from '@/lib/analytics';
import { getOnboardingTrack } from '@/lib/onboarding';
import {
  ObjectiveStep,
  ProfileStep,
  ReadyToReferStep,
  MonetizationStep,
  AuthorityTrainingStep,
  CommunityStep,
  EcommerceExperienceStep,
  ExpectationsStep,
  WhatsAppStep,
  ServiceTypeStep,
  StoreFrequencyStep,
  EmployeeCountStep,
  ServicesOfferedStep,
  ClientsVolumeStep,
  NuvemshopExperienceStep,
  ServiceProfileStep,
  // Tech Partner Steps
  TechCompanyInfoStep,
  TechSolutionTypeStep,
  TechExperienceStep,
  TechDescriptionStep,
  TechStackStep,
  // Affiliate Steps (new)
  ContentPlatformStep,
  AffiliatePromotionStep,
  AffiliateAudienceStep,
} from '@/components/steps';
import type {
  Objective,
  MonetizationType,
  AuthorityTrainingLevel,
  CommunityType,
  EcommerceExperience,
  ProgramExpectation,
  QualificationData,
  ServiceType,
  StoreCreationFrequency,
  EmployeeCount,
  ServiceOffered,
  ClientsVolume,
  NuvemshopExperienceLevel,
  // Tech Partner Types
  CompanySize,
  SolutionType,
  EcommercePlatformExperience,
  Technology,
  // Affiliate Types
  ContentPlatform,
  PromotionChannel,
  AudienceSize,
  AudienceNiche,
} from '@/types/qualification';

// Step configuration for different flows
const AFFILIATE_STEPS = [
  'objective',
  'contentPlatform',
  'profile',
  'readyToRefer',
  'monetization',
  'authorityTraining',
  'community',
  'ecommerceExperience',
  'expectations',
  'whatsapp',
] as const;

const SERVICE_PROVIDER_STEPS = [
  'objective',
  'serviceType',
  'storeFrequency',
  'employeeCount',
  'servicesOffered',
  'serviceProfile',
  'clientsVolume',
  'nuvemshopExperience',
  'whatsapp',
] as const;

const TECH_PARTNER_STEPS = [
  'objective',
  'techCompanyInfo',
  'techSolutionType',
  'techExperience',
  'techDescription',
  'techStack',
  'whatsapp',
] as const;

type AffiliateStepId = (typeof AFFILIATE_STEPS)[number];
type ServiceProviderStepId = (typeof SERVICE_PROVIDER_STEPS)[number];
type TechPartnerStepId = (typeof TECH_PARTNER_STEPS)[number];
type StepId = AffiliateStepId | ServiceProviderStepId | TechPartnerStepId;

export default function QualificationFlow() {
  // Form state - Common
  const [objective, setObjective] = useState<Objective>();
  const [whatsapp, setWhatsapp] = useState<string>();

  // Form state - Affiliate
  const [username, setUsername] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [readyToRefer, setReadyToRefer] = useState<'yes' | 'no'>();
  const [monetization, setMonetization] = useState<MonetizationType[]>([]);
  const [authorityTraining, setAuthorityTraining] = useState<AuthorityTrainingLevel>();
  const [communityType, setCommunityType] = useState<CommunityType>();
  const [ecommerceExperience, setEcommerceExperience] = useState<EcommerceExperience>();
  const [expectations, setExpectations] = useState<ProgramExpectation[]>([]);
  // New Affiliate fields
  const [contentPlatforms, setContentPlatforms] = useState<ContentPlatform[]>([]);
  const [promotionChannels, setPromotionChannels] = useState<PromotionChannel[]>([]);
  const [audienceSize, setAudienceSize] = useState<AudienceSize>();
  const [audienceNiche, setAudienceNiche] = useState<AudienceNiche>();

  // Form state - Service Provider
  const [serviceType, setServiceType] = useState<ServiceType>();
  const [storeFrequency, setStoreFrequency] = useState<StoreCreationFrequency>();
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>();
  const [servicesOffered, setServicesOffered] = useState<ServiceOffered[]>([]);
  const [clientsVolume, setClientsVolume] = useState<ClientsVolume>();
  const [nuvemshopExperience, setNuvemshopExperience] = useState<NuvemshopExperienceLevel>();
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Form state - Tech Partner
  const [techCompanyName, setTechCompanyName] = useState('');
  const [techWebsiteUrl, setTechWebsiteUrl] = useState('');
  const [techCountry, setTechCountry] = useState('');
  const [techCompanySize, setTechCompanySize] = useState<CompanySize>();
  const [techSolutionType, setTechSolutionType] = useState<SolutionType>();
  const [techHasExistingProduct, setTechHasExistingProduct] = useState<boolean>();
  const [techExistingPlatforms, setTechExistingPlatforms] = useState<EcommercePlatformExperience[]>([]);
  const [techSolutionDescription, setTechSolutionDescription] = useState('');
  const [techTechnologies, setTechTechnologies] = useState<Technology[]>([]);
  const [techHasApiExperience, setTechHasApiExperience] = useState<boolean>();

  // Flow state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>();

  // Track page view on mount
  useEffect(() => {
    analytics.track({ type: 'page_view', page: 'qualification_flow' });
  }, []);

  // Determine which flow to use based on objective
  const getSteps = () => {
    if (objective === 'affiliate') return AFFILIATE_STEPS;
    if (objective === 'service_provider') return SERVICE_PROVIDER_STEPS;
    if (objective === 'tech_partner') return TECH_PARTNER_STEPS;
    return TECH_PARTNER_STEPS; // Default to tech partner for objective selection
  };

  const steps = getSteps();
  const currentStep = steps[currentStepIndex] as StepId;
  const totalSteps = steps.length;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const fromStep = currentStep;
      setCurrentStepIndex((prev) => prev + 1);
      // Track step transition
      trackStepChange(fromStep, steps[currentStepIndex + 1], objective);
    }
  }, [currentStepIndex, steps, currentStep, objective]);

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const handleObjectiveChange = useCallback((value: Objective) => {
    const previousObjective = objective;
    setObjective(value);
    // Reset step index when changing objective to avoid invalid states
    setCurrentStepIndex(0);
    // Track objective selection
    trackObjectiveSelection(value);
    // Track if merchant was redirected to service partner
    if (previousObjective === 'create_store' && value === 'service_provider') {
      trackMerchantRedirect(true);
    }
  }, [objective]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      // Build the qualification data
      const data: QualificationData = {
        objective: objective!,
        whatsapp: whatsapp!,
      };

      if (objective === 'affiliate') {
        data.affiliateData = {
          username: username || undefined,
          siteUrl,
          readyToRefer: readyToRefer!,
          monetization,
          authorityTraining: authorityTraining!,
          communityType: communityType!,
          experience: ecommerceExperience!,
          expectations,
          contentPlatforms,
          promotionChannels,
          audienceSize,
          audienceNiche,
        };
      }

      if (objective === 'service_provider') {
        data.serviceProviderData = {
          serviceType: serviceType!,
          storeCreationFrequency: storeFrequency!,
          employeeCount: employeeCount!,
          servicesOffered,
          clientsVolume: clientsVolume!,
          nuvemshopExperience: nuvemshopExperience!,
          portfolioUrl,
        };
      }

      if (objective === 'tech_partner') {
        data.techPartnerData = {
          companyName: techCompanyName,
          websiteUrl: techWebsiteUrl,
          country: techCountry,
          companySize: techCompanySize!,
          solutionType: techSolutionType!,
          hasExistingProduct: techHasExistingProduct!,
          existingPlatforms: techExistingPlatforms,
          solutionDescription: techSolutionDescription,
          technologies: techTechnologies,
          hasApiExperience: techHasApiExperience!,
        };
      }

      // Submit to the qualification service
      const result = await submitQualification(data);
      
      // Track submission
      trackFormSubmission(data, result.status);

      if (result.success) {
        setSubmissionResult(result);
        setIsComplete(true);
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    objective,
    whatsapp,
    username,
    siteUrl,
    readyToRefer,
    monetization,
    authorityTraining,
    communityType,
    ecommerceExperience,
    expectations,
    contentPlatforms,
    promotionChannels,
    audienceSize,
    audienceNiche,
    serviceType,
    servicesOffered,
    clientsVolume,
    nuvemshopExperience,
    portfolioUrl,
    techCompanyName,
    techWebsiteUrl,
    techCountry,
    techCompanySize,
    techSolutionType,
    techHasExistingProduct,
    techExistingPlatforms,
    techSolutionDescription,
    techTechnologies,
    techHasApiExperience,
  ]);

  // On the last step, "next" triggers submission
  const handleNextOrSubmit = isLastStep ? handleSubmit : handleNext;

  // Reset form function
  const resetForm = useCallback(() => {
    // Common
    setObjective(undefined);
    setWhatsapp(undefined);
    // Affiliate
    setUsername('');
    setSiteUrl('');
    setReadyToRefer(undefined);
    setMonetization([]);
    setAuthorityTraining(undefined);
    setCommunityType(undefined);
    setEcommerceExperience(undefined);
    setExpectations([]);
    setContentPlatforms([]);
    setPromotionChannels([]);
    setAudienceSize(undefined);
    setAudienceNiche(undefined);
    // Service Provider
    setServiceType(undefined);
    setServicesOffered([]);
    setClientsVolume(undefined);
    setNuvemshopExperience(undefined);
    setPortfolioUrl('');
    // Tech Partner
    setTechCompanyName('');
    setTechWebsiteUrl('');
    setTechCountry('');
    setTechCompanySize(undefined);
    setTechSolutionType(undefined);
    setTechHasExistingProduct(undefined);
    setTechExistingPlatforms([]);
    setTechSolutionDescription('');
    setTechTechnologies([]);
    setTechHasApiExperience(undefined);
    // Flow
    setCurrentStepIndex(0);
    setIsComplete(false);
    setSubmissionResult(undefined);
    setSubmitError(undefined);
    // Reset analytics for new session
    analytics.reset();
    analytics.track({ type: 'page_view', page: 'qualification_flow' });
  }, []);

  // Get success message based on partner type and submission result
  const getSuccessContent = () => {
    const isAutoApproved = submissionResult?.status === 'auto_approved';
    const isHighPotential = submissionResult?.isHighPotential;
    const applicationId = submissionResult?.applicationId;
    const onboardingTrack = objective ? getOnboardingTrack(objective) : null;

    switch (objective) {
      case 'tech_partner':
        return {
          title: 'Formulário concluído',
          subtitle: 'Tech Partner',
          message: submissionResult?.message || 'Obrigado pelo interesse em se tornar um parceiro Nuvemshop! Nossa equipe analisará sua proposta e entrará em contato.',
          nextSteps: onboardingTrack?.steps.slice(0, 3).map(s => s.title) || [
            'Análise da proposta pela equipe de parcerias',
            'Contato para agendar call técnica (se aprovado)',
            'Acesso à documentação e sandbox de desenvolvimento',
          ],
          color: 'purple',
          applicationId,
          isAutoApproved,
          resources: onboardingTrack?.resources,
        };
      case 'service_provider':
        return {
          title: 'Formulário concluído',
          subtitle: 'Agency Partner',
          message: submissionResult?.message || 'Confira seu e-mail, preparamos boas-vindas e uma trilha com materiais valiosos para você escalar conosco.',
          nextSteps: onboardingTrack?.steps.slice(0, 3).map(s => s.title) || [
            'Acesso ao portal de parceiros e recursos exclusivos',
            'Análise do perfil e portfólio pela equipe',
            'Confira a trilha de materiais no seu e-mail para escalar conosco',
          ],
          color: 'blue',
          applicationId,
          isAutoApproved,
          resources: onboardingTrack?.resources,
        };
      case 'affiliate':
        return {
          title: 'Formulário concluído',
          subtitle: 'Afiliado',
          message: submissionResult?.message || 'Parabéns! Seu cadastro foi aprovado automaticamente. Você receberá um WhatsApp com seu link de afiliado e instruções para começar.',
          nextSteps: onboardingTrack?.steps.slice(0, 3).map(s => s.title) || [
            'Acesso imediato ao painel de afiliados',
            'Link de indicação personalizado',
            'Materiais de marketing e banners',
          ],
          color: isHighPotential ? 'yellow' : 'green',
          applicationId,
          isAutoApproved: true,
          isHighPotential,
          resources: onboardingTrack?.resources,
        };
      default:
        return {
          title: 'Cadastro concluído!',
          subtitle: '',
          message: 'Obrigado por completar sua qualificação. Entraremos em contato em breve pelo WhatsApp.',
          nextSteps: [],
          color: 'green',
          applicationId,
          isAutoApproved: false,
        };
    }
  };

  // Success screen
  if (isComplete) {
    const successContent = getSuccessContent();
    const colorClasses = {
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', badge: 'bg-purple-600', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', badge: 'bg-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', badge: 'bg-green-600', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', badge: 'bg-yellow-500', border: 'border-yellow-200' },
    };
    const colors = colorClasses[successContent.color as keyof typeof colorClasses] || colorClasses.green;

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-lg">
          <div className="card text-center">
            {/* Success Icon */}
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${colors.bg}`}>
              {successContent.isHighPotential ? (
                <svg className={`h-10 w-10 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ) : (
                <svg className={`h-10 w-10 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Badge */}
            {successContent.subtitle && (
              <span className={`mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${colors.badge}`}>
                {successContent.subtitle}
              </span>
            )}

            {/* Title & Message */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {successContent.title}
            </h1>
            <p className="mb-4 text-gray-600">
              {successContent.message}
            </p>

            {/* Application ID */}
            {successContent.applicationId && (
              <p className="mb-6 text-xs text-gray-400">
                ID da candidatura: <span className="font-mono">{successContent.applicationId}</span>
              </p>
            )}

            {/* Next Steps */}
            {successContent.nextSteps.length > 0 && (
              <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
                <h3 className="mb-3 font-semibold text-gray-900">Próximos passos:</h3>
                <ul className="space-y-2">
                  {successContent.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${colors.badge}`}>
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources (for auto-approved affiliates) */}
            {successContent.isAutoApproved && successContent.resources && successContent.resources.length > 0 && (
              <div className={`mb-6 rounded-lg border ${colors.border} ${colors.bg} p-4 text-left`}>
                <h3 className="mb-3 font-semibold text-gray-900">Recursos disponíveis:</h3>
                <ul className="space-y-2">
                  {successContent.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium ${colors.icon} hover:underline`}
                      >
                        {resource.title} →
                      </a>
                      <p className="text-xs text-gray-500">{resource.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href="https://partners.nuvemshop.com.br/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center"
            >
              Acessar Partner Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'objective':
        return (
          <ObjectiveStep
            value={objective}
            onChange={handleObjectiveChange}
            onNext={handleNext}
          />
        );

      // Affiliate Steps
      case 'profile':
        return (
          <ProfileStep
            username={username}
            siteUrl={siteUrl}
            audienceSize={audienceSize}
            onUsernameChange={setUsername}
            onSiteUrlChange={setSiteUrl}
            onAudienceSizeChange={setAudienceSize}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'contentPlatform':
        return (
          <ContentPlatformStep
            value={contentPlatforms}
            onChange={setContentPlatforms}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'readyToRefer':
        return (
          <ReadyToReferStep
            value={readyToRefer}
            onChange={setReadyToRefer}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'monetization':
        return (
          <MonetizationStep
            value={monetization}
            onChange={setMonetization}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'authorityTraining':
        return (
          <AuthorityTrainingStep
            value={authorityTraining}
            onChange={setAuthorityTraining}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'community':
        return (
          <CommunityStep
            value={communityType}
            onChange={setCommunityType}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'ecommerceExperience':
        return (
          <EcommerceExperienceStep
            value={ecommerceExperience}
            onChange={setEcommerceExperience}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'expectations':
        return (
          <ExpectationsStep
            value={expectations}
            onChange={setExpectations}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      // Service Provider Steps
      case 'serviceType':
        return (
          <ServiceTypeStep
            value={serviceType}
            onChange={setServiceType}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'storeFrequency':
        return (
          <StoreFrequencyStep
            value={storeFrequency}
            onChange={setStoreFrequency}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'employeeCount':
        return (
          <EmployeeCountStep
            value={employeeCount}
            onChange={setEmployeeCount}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'servicesOffered':
        return (
          <ServicesOfferedStep
            value={servicesOffered}
            onChange={setServicesOffered}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'clientsVolume':
        return (
          <ClientsVolumeStep
            value={clientsVolume}
            onChange={setClientsVolume}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'nuvemshopExperience':
        return (
          <NuvemshopExperienceStep
            value={nuvemshopExperience}
            onChange={setNuvemshopExperience}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'serviceProfile':
        return (
          <ServiceProfileStep
            portfolioUrl={portfolioUrl}
            onPortfolioUrlChange={setPortfolioUrl}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      // Tech Partner Steps
      case 'techCompanyInfo':
        return (
          <TechCompanyInfoStep
            companyName={techCompanyName}
            websiteUrl={techWebsiteUrl}
            country={techCountry}
            companySize={techCompanySize}
            onCompanyNameChange={setTechCompanyName}
            onWebsiteUrlChange={setTechWebsiteUrl}
            onCountryChange={setTechCountry}
            onCompanySizeChange={setTechCompanySize}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'techSolutionType':
        return (
          <TechSolutionTypeStep
            value={techSolutionType}
            onChange={setTechSolutionType}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'techExperience':
        return (
          <TechExperienceStep
            hasExistingProduct={techHasExistingProduct}
            existingPlatforms={techExistingPlatforms}
            onHasExistingProductChange={setTechHasExistingProduct}
            onExistingPlatformsChange={setTechExistingPlatforms}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'techDescription':
        return (
          <TechDescriptionStep
            value={techSolutionDescription}
            onChange={setTechSolutionDescription}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      case 'techStack':
        return (
          <TechStackStep
            technologies={techTechnologies}
            hasApiExperience={techHasApiExperience}
            onTechnologiesChange={setTechTechnologies}
            onHasApiExperienceChange={setTechHasApiExperience}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
          />
        );

      // Common final step
      case 'whatsapp':
        return (
          <WhatsAppStep
            value={whatsapp}
            onChange={setWhatsapp}
            onNext={handleNextOrSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          {/* Nuvemshop Logo */}
          <img
            src="/logo.png"
            alt="Nuvemshop"
            className="h-12 w-auto"
          />
          <p className="mt-3 text-sm text-gray-500">Qualificação de Parceiros</p>
        </div>

        {/* Progress Bar - Only show after objective is selected */}
        {currentStepIndex > 0 && (
          <div className="mb-8">
            <ProgressBar
              currentStep={currentStepIndex}
              totalSteps={totalSteps - 1}
            />
          </div>
        )}

        {/* Step Content */}
        <div className="card">
          <AnimatePresence mode="wait">
            <div key={currentStep}>{renderStep()}</div>
          </AnimatePresence>
        </div>

        {/* Debug Info (remove in production) */}
        <details className="mt-8 rounded-lg bg-gray-100 p-4 text-xs">
          <summary className="cursor-pointer font-medium text-gray-700">
            Debug Info
          </summary>
          <pre className="mt-2 overflow-auto text-gray-600">
            {JSON.stringify(
              {
                currentStep,
                currentStepIndex,
                totalSteps,
                objective,
                // Affiliate data
                username,
                siteUrl,
                readyToRefer,
                monetization,
                authorityTraining,
                communityType,
                ecommerceExperience,
                expectations,
                contentPlatforms,
                promotionChannels,
                audienceSize,
                audienceNiche,
                // Service Provider data
                serviceType,
                storeFrequency,
                employeeCount,
                servicesOffered,
                clientsVolume,
                nuvemshopExperience,
                portfolioUrl,
                // Tech Partner data
                techCompanyName,
                techWebsiteUrl,
                techCountry,
                techCompanySize,
                techSolutionType,
                techHasExistingProduct,
                techExistingPlatforms,
                techSolutionDescription,
                techTechnologies,
                techHasApiExperience,
                // Common
                whatsapp,
              },
              null,
              2
            )}
          </pre>
        </details>
      </div>
    </div>
  );
}
