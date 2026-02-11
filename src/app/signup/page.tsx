'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  Text,
  Title,
  Radio,
  Checkbox,
  Stepper,
  Alert,
  Spinner,
  Link,
} from '@nimbus-ds/components';
import { FormField } from '@nimbus-ds/patterns';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  RocketIcon,
  CogIcon,
  UserIcon,
  StoreIcon,
} from '@nimbus-ds/icons';
import { Select } from '@nimbus-ds/components';
import '@nimbus-ds/styles/dist/index.css';
import { LocaleProvider, useTranslation } from '@/lib/useTranslation';
import type { Locale } from '@/lib/i18n';

// Nuvemshop Logo SVG component
function NuvemshopLogo() {
  return (
    <svg width="140" height="28" viewBox="0 0 841 164" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100.8 56.3c-3.5-17.5-19-30.7-37.5-30.7-6.5 0-12.6 1.6-18 4.5C39.5 12.7 22.3 0 2.2 0h-2v45.3c0 30.8 25 55.8 55.8 55.8h.1c24.7 0 45.6-16.2 52.8-38.5-.1 0 .1-2 .1-2-.1-1.4-.1-2.9-.2-4.3z" fill="#6C31C4"/>
      <path d="M220.8 36.4h16.2v8.4h.3c4.8-6.7 11.7-10.1 20.7-10.1 8.7 0 15.1 3 19.3 9.1 4.2 6 6.3 14.4 6.3 25.2v39.4h-17V72c0-7-.9-12.2-2.7-15.7-1.8-3.5-5.2-5.2-10.2-5.2-5.7 0-9.8 2-12.3 6.1-2.5 4.1-3.8 10.3-3.8 18.6v32.6h-16.8V36.4zM367.3 108.4h-16.8v-8.3h-.3c-5 6.6-12 9.9-21 9.9-8.7 0-15.1-3-19.3-9.1-4.2-6-6.3-14.4-6.3-25.2V36.4h17v36.4c0 7 .9 12.2 2.7 15.7 1.8 3.5 5.2 5.2 10.2 5.2 5.7 0 9.8-2 12.3-6.1 2.5-4.1 3.8-10.3 3.8-18.6V36.4h16.8v72h-.1zM432.3 36.4h17.1l-26.5 72h-18.7l-26.5-72h18.1l17.8 54.1h.8l17.9-54.1zM512.8 98.6c-5.3 7.6-13.7 11.4-25 11.4-11.7 0-20.7-3.8-26.8-11.3-6.2-7.6-9.2-17.3-9.2-29.3 0-11.5 3.2-21 9.5-28.4 6.3-7.4 15-11.2 26.2-11.2 11.5 0 20 3.6 25.5 10.9 5.5 7.3 8.3 17.6 8.3 30.9v2.8h-52.3c.5 7.3 2.6 12.9 6.3 16.9 3.7 4 8.8 5.9 15.3 5.9 4.5 0 8.2-1 11.1-3.1 2.9-2.1 5-5 6.3-8.8l14.8 3.3v-.1l-10 10.1zm-3.1-35c-.4-6.6-2.3-11.7-5.7-15.2-3.4-3.6-8.1-5.3-14.2-5.3-6 0-10.8 1.9-14.2 5.6-3.5 3.7-5.6 8.7-6.3 15H509.7zM534.8 36.4h16.2v8.4h.3c1.8-3.2 4.6-5.7 8.4-7.5 3.8-1.8 7.8-2.7 12-2.7 5.3 0 9.8 1.1 13.5 3.2 3.7 2.1 6.5 5.4 8.2 9.7 2.4-4.1 5.6-7.3 9.6-9.5 4-2.2 8.4-3.4 13.3-3.4 8.2 0 14 2.8 17.5 8.5 3.5 5.6 5.2 13.7 5.2 24.2v41.1h-17V72c0-13.1-4.2-19.7-12.5-19.7-5.3 0-9.2 1.9-11.6 5.6-2.4 3.7-3.6 9.7-3.6 17.8v32.6h-17V72c0-6.7-.9-11.7-2.6-15-1.7-3.4-4.9-5-9.5-5-5.5 0-9.5 2-12.1 6-2.6 4-3.9 10.2-3.9 18.5v31.8h-16.8V36.4h1.4zM666.8 95.6l14-5.3c1.5 4.3 3.8 7.5 7.1 9.6 3.3 2.1 7.2 3.2 11.9 3.2 4.5 0 8-1 10.5-2.9 2.5-1.9 3.8-4.5 3.8-7.8 0-3.1-1.1-5.4-3.4-7-2.3-1.6-6.5-3.2-12.6-5-8.2-2.3-14.3-5.5-18.3-9.5-4-4-6-9.2-6-15.4 0-7.5 2.8-13.5 8.5-18.1 5.6-4.5 12.7-6.8 21.2-6.8 7.3 0 13.5 1.8 18.5 5.4 5 3.6 8.4 8.5 10.2 14.8l-14 5c-2.5-7.3-8-11-16.5-11-4.1 0-7.3.9-9.8 2.7-2.4 1.8-3.6 4.3-3.6 7.3 0 3 1.2 5.3 3.5 6.8 2.3 1.5 6.3 3.1 11.8 4.7 8.5 2.5 14.9 5.8 19.1 9.9 4.2 4.1 6.3 9.5 6.3 16.1 0 8-3 14.3-8.9 18.8-6 4.5-13.3 6.8-22.1 6.8-8.5 0-15.5-2-21.2-5.9-5.6-3.9-9.4-9.5-11.4-16.5l1.4.1zM754.8 108.4V0h17v40.4h.3c4.8-6.8 12.1-10.2 22-10.2 8.7 0 15.5 3.5 20.2 10.4 4.8 6.9 7.1 16.3 7.1 28.1 0 12.1-2.6 21.6-7.7 28.6-5.2 7-12.2 10.5-21.2 10.5-9.5 0-16.5-3.7-21-11.2h-.3v9.5h-16.4v2.3zm16.7-39.1c0 8.4 1.7 15.1 5.2 19.9 3.5 4.9 8.5 7.3 15.1 7.3 6.3 0 11.1-2.5 14.3-7.6 3.3-5 4.9-11.6 4.9-19.6 0-7.9-1.5-14.3-4.6-19.2-3-4.9-7.7-7.4-13.9-7.4-7 0-12.2 2.5-15.6 7.6-3.6 5-5.4 11.3-5.4 19z" fill="#1A1A1A"/>
    </svg>
  );
}

// Language switcher button
function LangButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      as="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="1"
      paddingLeft="2"
      paddingRight="2"
      borderRadius="2"
      borderStyle="solid"
      borderWidth="1"
      borderColor={active ? 'primary-interactive' : 'neutral-surfaceHighlight'}
      backgroundColor={active ? 'primary-surface' : 'transparent'}
      cursor="pointer"
      onClick={onClick}
      style={{ outline: 'none' }}
    >
      <Text
        fontSize="caption"
        fontWeight={active ? 'bold' : 'regular'}
        color={active ? 'primary-interactive' : 'neutral-textLow'}
      >
        {label}
      </Text>
    </Box>
  );
}

// Shared header with logo and language switcher
function Header() {
  const { t, locale, setLocale } = useTranslation();
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="4"
      backgroundColor="neutral-background"
      borderStyle="solid"
      borderWidth="none"
      borderBottomWidth="1"
      borderColor="neutral-surfaceHighlight"
    >
      <Box width="60px" />
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1"
      >
        <NuvemshopLogo />
        <Text fontSize="caption" color="neutral-textLow">
          {t('common.partnerProgram')}
        </Text>
      </Box>
      <Box display="flex" gap="1">
        <LangButton
          label="PT"
          active={locale === 'pt-BR'}
          onClick={() => setLocale('pt-BR' as Locale)}
        />
        <LangButton
          label="ES"
          active={locale === 'es'}
          onClick={() => setLocale('es' as Locale)}
        />
      </Box>
    </Box>
  );
}

// Types
type PartnerType = 'tech_partner' | 'service_partner' | 'affiliate' | 'merchant';

interface FormData {
  // Step 1: Partner Type
  partnerType?: PartnerType;
  // Step 2: Company/Profile (name/email/phone come from authenticated session)
  companyName: string;
  website: string;
  country: string;
  // Step 4: Specifics (varies by type)
  // Tech Partner
  solutionType?: string;
  technologies: string[];
  solutionDescription: string;
  // Service Partner (Agency Partner)
  serviceType?: string;
  storeFrequency?: string;
  services: string[];
  employeeCount?: string;
  serviceWebsite: string;
  clientsVolume?: string;
  nuvemshopExperience?: string;
  // Affiliate
  contentPlatforms: string[];
  promotionChannels: string[];
  audienceSize?: string;
  readyToRefer?: string;
  monetization: string[];
  authority?: string;
  communityType?: string;
  ecommerceExperience?: string;
  audienceNiche?: string;
  expectations: string[];
}

const initialFormData: FormData = {
  companyName: '',
  website: '',
  country: '',
  technologies: [],
  solutionDescription: '',
  services: [],
  serviceWebsite: '',
  contentPlatforms: [],
  promotionChannels: [],
  monetization: [],
  expectations: [],
};

export default function NimbusSignupFlow() {
  return (
    <LocaleProvider>
      <SignupFlowContent />
    </LocaleProvider>
  );
}

function SignupFlowContent() {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stepLabels = [
    t('steps.objective'),
    t('steps.profile'),
    t('steps.qualification'),
    t('steps.review'),
  ];

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    setErrors((prev) => {
      const clearedErrors = { ...prev };
      Object.keys(updates).forEach((key) => {
        delete clearedErrors[key];
      });
      return clearedErrors;
    });
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.partnerType) {
          newErrors.partnerType = t('validation.selectPartnerType');
        }
        break;
      case 1:
        if (formData.partnerType !== 'affiliate') {
          if (!formData.companyName.trim()) newErrors.companyName = t('validation.companyNameRequired');
        }
        if (formData.partnerType === 'affiliate') {
          if (!formData.audienceSize) newErrors.audienceSize = t('validation.selectAudienceSize');
        }
        if (!formData.country) newErrors.country = t('validation.countryRequired');
        break;
      case 2:
        if (formData.partnerType === 'tech_partner') {
          if (!formData.solutionType) newErrors.solutionType = t('validation.selectSolutionType');
          if (formData.technologies.length === 0) newErrors.technologies = t('validation.selectAtLeastOneTech');
        }
        if (formData.partnerType === 'service_partner') {
          if (!formData.serviceType) newErrors.serviceType = t('validation.selectServiceType');
          if (!formData.storeFrequency) newErrors.storeFrequency = t('validation.selectStoreFrequency');
          if (!formData.employeeCount) newErrors.employeeCount = t('validation.selectEmployeeCount');
          if (formData.services.length === 0) newErrors.services = t('validation.selectAtLeastOneService');
          if (!formData.clientsVolume) newErrors.clientsVolume = t('validation.selectClientsVolume');
          if (!formData.nuvemshopExperience) newErrors.nuvemshopExperience = t('validation.selectExperience');
        }
        if (formData.partnerType === 'affiliate') {
          if (formData.contentPlatforms.length === 0) newErrors.contentPlatforms = t('validation.selectAtLeastOnePlatform');
          if (!formData.readyToRefer) newErrors.readyToRefer = t('validation.selectAnOption');
          if (formData.monetization.length === 0) newErrors.monetization = t('validation.selectAtLeastOneMonetization');
          if (!formData.authority) newErrors.authority = t('validation.selectAnOption');
          if (!formData.communityType) newErrors.communityType = t('validation.selectCommunityType');
          if (!formData.ecommerceExperience) newErrors.ecommerceExperience = t('validation.selectEcommerceExperience');
          if (!formData.audienceNiche) newErrors.audienceNiche = t('validation.selectAudienceNiche');
          if (formData.expectations.length === 0) newErrors.expectations = t('validation.selectAtLeastOneExpectation');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < stepLabels.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsComplete(true);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsComplete(false);
    setErrors({});
  };

  // Redirect merchant to store signup
  const handleMerchantRedirect = () => {
    window.location.href = t('common.merchantRedirectUrl');
  };

  // Success Screen
  if (isComplete) {
    const getSuccessContent = () => {
      const pt: string | undefined = formData.partnerType;
      switch (pt) {
        case 'tech_partner':
          return {
            title: t('success.techPartner.title'),
            subtitle: t('success.techPartner.subtitle'),
            message: t('success.techPartner.message'),
            nextSteps: [
              t('success.techPartner.step1'),
              t('success.techPartner.step2'),
              t('success.techPartner.step3'),
            ],
          };
        case 'service_provider':
          return {
            title: t('success.servicePartner.title'),
            subtitle: t('success.servicePartner.subtitle'),
            message: t('success.servicePartner.message'),
            nextSteps: [
              t('success.servicePartner.step1'),
              t('success.servicePartner.step2'),
              t('success.servicePartner.step3'),
            ],
          };
        case 'affiliate':
          return {
            title: t('success.affiliate.title'),
            subtitle: t('success.affiliate.subtitle'),
            message: t('success.affiliate.message'),
            nextSteps: [
              t('success.affiliate.step1'),
              t('success.affiliate.step2'),
              t('success.affiliate.step3'),
            ],
          };
        default:
          return {
            title: t('success.default.title'),
            subtitle: '',
            message: t('success.default.message'),
            nextSteps: [],
          };
      }
    };

    const successContent = getSuccessContent();

    return (
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        backgroundColor="neutral-surface"
      >
        <Header />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex="1"
          padding="6"
        >
          <Card padding="base">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="6"
              maxWidth="500px"
            >
              {/* Success icon */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="72px"
                height="72px"
                borderRadius="full"
                backgroundColor="success-surface"
              >
                <CheckCircleIcon size={36} />
              </Box>

              {/* Badge */}
              {successContent.subtitle && (
                <Box
                  padding="2"
                  paddingLeft="4"
                  paddingRight="4"
                  borderRadius="full"
                  backgroundColor="primary-surface"
                >
                  <Text fontSize="caption" fontWeight="bold" color="primary-interactive">
                    {successContent.subtitle}
                  </Text>
                </Box>
              )}

              {/* Title & message */}
              <Box display="flex" flexDirection="column" alignItems="center" gap="2">
                <Title as="h2" textAlign="center">
                  {successContent.title}
                </Title>
                <Text textAlign="center" color="neutral-textLow" fontSize="base">
                  {successContent.message}
                </Text>
              </Box>

              {/* Next steps */}
              {successContent.nextSteps.length > 0 && (
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="3"
                  width="100%"
                  padding="4"
                  borderRadius="2"
                  backgroundColor="neutral-surface"
                  borderStyle="solid"
                  borderWidth="1"
                  borderColor="neutral-surfaceHighlight"
                >
                  <Text fontWeight="bold" fontSize="base">{t('success.nextStepsTitle')}</Text>
                  {successContent.nextSteps.map((step, index) => (
                    <Box key={index} display="flex" alignItems="flex-start" gap="3">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="24px"
                        height="24px"
                        borderRadius="full"
                        backgroundColor="primary-surface"
                        style={{ flexShrink: 0 }}
                      >
                        <Text fontSize="caption" fontWeight="bold" color="primary-interactive">
                          {index + 1}
                        </Text>
                      </Box>
                      <Text fontSize="base" color="neutral-textLow">{step}</Text>
                    </Box>
                  ))}
                </Box>
              )}

              {/* CTA */}
              <Button
                as="a"
                appearance="primary"
                href={t('common.partnerPortalUrl')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.accessPartnerPortal')}
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor="neutral-surface"
    >
      <Header />

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="6"
        gap="4"
        flex="1"
      >
        {/* Stepper */}
        <Box width="100%" maxWidth="640px">
          <Stepper.Card>
            <Stepper
              activeStep={currentStep}
              selectedStep={currentStep}
              onSelectStep={(step) => {
                if (step < currentStep) setCurrentStep(step);
              }}
            >
              {stepLabels.map((label) => (
                <Stepper.Item key={label} label={label} />
              ))}
            </Stepper>
          </Stepper.Card>
        </Box>

        {/* Form Card */}
        <Card padding="base">
          <Box
            display="flex"
            flexDirection="column"
            gap="6"
            width="100%"
            minWidth={{ xs: '100%', md: '520px' }}
            maxWidth="640px"
          >
            {/* Step Content */}
            {currentStep === 0 && (
              <StepPartnerType
                value={formData.partnerType}
                onChange={(type) => updateFormData({ partnerType: type })}
                onMerchantRedirect={handleMerchantRedirect}
                error={errors.partnerType}
              />
            )}

            {currentStep === 1 && (
              <StepCompanyInfo
                formData={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <StepDetails
                formData={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <StepConfirmation formData={formData} />
            )}

            {/* Navigation Buttons */}
            <Box display="flex" justifyContent="space-between" gap="4" marginTop="4">
              {currentStep > 0 ? (
                <Button
                  appearance="neutral"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  {t('common.back')}
                </Button>
              ) : (
                <Box />
              )}
              
              {currentStep < stepLabels.length - 1 ? (
                <Button appearance="primary" onClick={handleNext}>
                  {t('common.continue')}
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Box display="flex" alignItems="center" gap="2">
                      <Spinner size="small" />
                      <Text>{t('common.submitting')}</Text>
                    </Box>
                  ) : (
                    t('common.submit')
                  )}
                </Button>
              )}
            </Box>
          </Box>
        </Card>

        {/* Footer with Terms */}
        <Box
          display="flex"
          justifyContent="center"
          gap="4"
          padding="4"
        >
          <Link as="a" href={t('common.termsUrl')} target="_blank" appearance="primary">
            <Text fontSize="caption" color="neutral-textLow">{t('common.termsOfUse')}</Text>
          </Link>
          <Text fontSize="caption" color="neutral-textDisabled">|</Text>
          <Link as="a" href={t('common.privacyUrl')} target="_blank" appearance="primary">
            <Text fontSize="caption" color="neutral-textLow">{t('common.privacyPolicy')}</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

// Step 1: Partner Type Selection
function StepPartnerType({
  value,
  onChange,
  onMerchantRedirect,
  error,
}: {
  value?: PartnerType;
  onChange: (type: PartnerType) => void;
  onMerchantRedirect: () => void;
  error?: string;
}) {
  const { t } = useTranslation();

  const options = [
    {
      value: 'tech_partner' as PartnerType,
      label: t('partnerType.techPartner.label'),
      description: t('partnerType.techPartner.description'),
      icon: <CogIcon size={24} />,
    },
    {
      value: 'service_partner' as PartnerType,
      label: t('partnerType.servicePartner.label'),
      description: t('partnerType.servicePartner.description'),
      icon: <UserIcon size={24} />,
    },
    {
      value: 'affiliate' as PartnerType,
      label: t('partnerType.affiliate.label'),
      description: t('partnerType.affiliate.description'),
      icon: <RocketIcon size={24} />,
    },
    {
      value: 'merchant' as PartnerType,
      label: t('partnerType.merchant.label'),
      description: t('partnerType.merchant.description'),
      icon: <StoreIcon size={24} />,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">{t('partnerType.title')}</Title>
        <Text color="neutral-textLow">{t('partnerType.subtitle')}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Box
              key={option.value}
              as="button"
              display="flex"
              alignItems="center"
              gap="4"
              padding="4"
              borderRadius="2"
              borderStyle="solid"
              borderWidth={isSelected ? '2' : '1'}
              borderColor={isSelected ? 'primary-interactive' : 'neutral-surfaceHighlight'}
              backgroundColor={isSelected ? 'primary-surface' : 'neutral-background'}
              cursor="pointer"
              onClick={() => {
                if (option.value === 'merchant') {
                  onMerchantRedirect();
                } else {
                  onChange(option.value);
                }
              }}
              style={{
                textAlign: 'left',
                transition: 'all 0.15s ease-in-out',
                outline: 'none',
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="44px"
                height="44px"
                borderRadius="2"
                backgroundColor={isSelected ? 'primary-surfaceHighlight' : 'neutral-surface'}
                style={{ flexShrink: 0 }}
              >
                {option.icon}
              </Box>
              <Box flex="1" display="flex" flexDirection="column" gap="1">
                <Text fontWeight="bold" fontSize="base">{option.label}</Text>
                <Text fontSize="caption" color="neutral-textLow">
                  {option.description}
                </Text>
              </Box>
              <Radio
                name="partnerType"
                checked={isSelected}
                onChange={() => {
                  if (option.value !== 'merchant') {
                    onChange(option.value);
                  }
                }}
              />
            </Box>
          );
        })}
      </Box>

      {error && (
        <Text color="danger-textLow" fontSize="caption">
          {error}
        </Text>
      )}
    </Box>
  );
}

// Step 2: Company/Profile Info
function StepCompanyInfo({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}) {
  const { t } = useTranslation();

  const countryKeys = ['brasil', 'argentina', 'mexico', 'colombia', 'chile', 'other'] as const;

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">
          {formData.partnerType === 'affiliate'
            ? t('companyInfo.titleAffiliate')
            : t('companyInfo.titleCompany')}
        </Title>
        <Text color="neutral-textLow">
          {formData.partnerType === 'affiliate'
            ? t('companyInfo.subtitleAffiliate')
            : t('companyInfo.subtitleCompany')}
        </Text>
      </Box>

      {formData.partnerType !== 'affiliate' && (
        <FormField.Input
          id="companyName"
          label={t('companyInfo.companyName')}
          placeholder={t('companyInfo.companyNamePlaceholder')}
          value={formData.companyName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ companyName: e.target.value })}
          appearance={errors.companyName ? 'danger' : undefined}
          helpText={errors.companyName}
          showHelpText={!!errors.companyName}
          helpIcon={errors.companyName ? ExclamationCircleIcon : undefined}
        />
      )}

      <FormField.Input
        id="website"
        label={formData.partnerType === 'affiliate'
          ? t('companyInfo.websiteAffiliate')
          : t('companyInfo.website')}
        placeholder="https://..."
        value={formData.website}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ website: e.target.value })}
      />

      {formData.partnerType === 'affiliate' && (
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="medium">{t('companyInfo.audienceSizeLabel')} *</Text>
          <Select
            id="audienceSize"
            name="audienceSize"
            appearance={errors.audienceSize ? 'danger' : 'neutral'}
            value={formData.audienceSize || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ audienceSize: e.target.value || undefined })}
          >
            <Select.Option label={t('companyInfo.selectAudienceSize')} value="" disabled />
            <Select.Option label={t('companyInfo.audienceSizes.under_1k')} value="under_1k" />
            <Select.Option label={t('companyInfo.audienceSizes.1k_10k')} value="1k_10k" />
            <Select.Option label={t('companyInfo.audienceSizes.10k_100k')} value="10k_100k" />
            <Select.Option label={t('companyInfo.audienceSizes.more_than_100k')} value="more_than_100k" />
          </Select>
          {errors.audienceSize && (
            <Text color="danger-textLow" fontSize="caption">{errors.audienceSize}</Text>
          )}
        </Box>
      )}

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('companyInfo.countryLabel')} *</Text>
        <Select
          id="country"
          name="country"
          appearance={errors.country ? 'danger' : 'neutral'}
          value={formData.country}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ country: e.target.value })}
        >
          <Select.Option label={t('companyInfo.selectCountry')} value="" disabled selected={!formData.country} />
          {countryKeys.map((key) => (
            <Select.Option key={key} label={t(`companyInfo.countries.${key}`)} value={key} />
          ))}
        </Select>
        {errors.country && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.country}
          </Text>
        )}
      </Box>
    </Box>
  );
}

// Step 4: Details (varies by partner type)
function StepDetails({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}) {
  if (formData.partnerType === 'tech_partner') {
    return <TechPartnerDetails formData={formData} onChange={onChange} errors={errors} />;
  }
  if (formData.partnerType === 'service_partner') {
    return <ServicePartnerDetails formData={formData} onChange={onChange} errors={errors} />;
  }
  if (formData.partnerType === 'affiliate') {
    return <AffiliateDetails formData={formData} onChange={onChange} errors={errors} />;
  }
  return null;
}

function TechPartnerDetails({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}) {
  const { t } = useTranslation();

  const solutionTypeKeys = ['app', 'theme', 'integration', 'erp_crm'] as const;
  const techNames = ['React', 'Node.js', 'PHP', 'Python', 'Java', '.NET'];

  const toggleTechnology = (tech: string) => {
    const current = formData.technologies;
    if (current.includes(tech)) {
      onChange({ technologies: current.filter((item) => item !== tech) });
    } else {
      onChange({ technologies: [...current, tech] });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">{t('techPartner.title')}</Title>
        <Text color="neutral-textLow">{t('techPartner.subtitle')}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('techPartner.solutionTypeLabel')} *</Text>
        <Select
          id="solutionType"
          name="solutionType"
          appearance={errors.solutionType ? 'danger' : 'neutral'}
          value={formData.solutionType || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ solutionType: e.target.value })}
        >
          <Select.Option label={t('techPartner.selectType')} value="" disabled selected={!formData.solutionType} />
          {solutionTypeKeys.map((key) => (
            <Select.Option key={key} label={t(`techPartner.solutionTypes.${key}`)} value={key} />
          ))}
        </Select>
        {errors.solutionType && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.solutionType}
          </Text>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('techPartner.technologiesLabel')} *</Text>
        <Box display="flex" flexWrap="wrap" gap="2">
          {techNames.map((tech) => (
            <Checkbox
              key={tech}
              name={`tech-${tech}`}
              label={tech}
              checked={formData.technologies.includes(tech)}
              onChange={() => toggleTechnology(tech)}
            />
          ))}
          <Checkbox
            name="tech-other"
            label={t('common.other')}
            checked={formData.technologies.includes('other')}
            onChange={() => toggleTechnology('other')}
          />
        </Box>
        {errors.technologies && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.technologies}
          </Text>
        )}
      </Box>

      <FormField.Textarea
        id="solutionDescription"
        label={t('techPartner.describeLabel')}
        placeholder={t('techPartner.describePlaceholder')}
        value={formData.solutionDescription}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange({ solutionDescription: e.target.value })
        }
      />
    </Box>
  );
}

function ServicePartnerDetails({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}) {
  const { t } = useTranslation();

  const serviceTypeKeys = ['agency', 'freelancer', 'consultant', 'developer', 'traffic_manager'] as const;

  const employeeKeys = ['solo', '2_5', '6_10', '11_50', '50_plus'] as const;

  const serviceKeys = [
    'store_creation', 'design_ux', 'digital_marketing', 'traffic_management',
    'seo_content', 'development', 'consulting', 'support', 'migration',
  ] as const;

  const storeFrequencyOptions = [
    { value: 'monthly', key: 'monthly' },
    { value: 'bimonthly', key: 'bimonthly' },
    { value: 'interested', key: 'interested' },
    { value: 'other', key: 'other' },
  ] as const;

  const clientsVolumeOptions = [
    { value: 'none', key: 'none' },
    { value: '1_5', key: '1_5' },
    { value: '6_20', key: '6_20' },
    { value: '21_50', key: '21_50' },
    { value: '50_plus', key: '50_plus' },
  ] as const;

  const experienceOptions = [
    { value: 'none', key: 'none' },
    { value: 'basic', key: 'basic' },
    { value: 'intermediate', key: 'intermediate' },
    { value: 'advanced', key: 'advanced' },
  ] as const;

  const toggleService = (service: string) => {
    const current = formData.services;
    if (current.includes(service)) {
      onChange({ services: current.filter((s) => s !== service) });
    } else {
      onChange({ services: [...current, service] });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">{t('servicePartner.title')}</Title>
        <Text color="neutral-textLow">{t('servicePartner.subtitle')}</Text>
      </Box>

      {/* Service Type */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.serviceTypeLabel')} *</Text>
        <Select
          id="serviceType"
          name="serviceType"
          appearance={errors.serviceType ? 'danger' : 'neutral'}
          value={formData.serviceType || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ serviceType: e.target.value })}
        >
          <Select.Option label={t('servicePartner.selectType')} value="" disabled selected={!formData.serviceType} />
          {serviceTypeKeys.map((key) => (
            <Select.Option key={key} label={t(`servicePartner.serviceTypes.${key}`)} value={key} />
          ))}
        </Select>
        {errors.serviceType && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.serviceType}
          </Text>
        )}
      </Box>

      {/* Store Frequency */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.storeFrequencyLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {storeFrequencyOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="storeFrequency"
              label={t(`servicePartner.storeFrequencyOptions.${opt.key}`)}
              checked={formData.storeFrequency === opt.value}
              onChange={() => onChange({ storeFrequency: opt.value })}
            />
          ))}
        </Box>
        {errors.storeFrequency && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.storeFrequency}
          </Text>
        )}
      </Box>

      {/* Employee Count */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.employeeCountLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {employeeKeys.map((key) => (
            <Radio
              key={key}
              name="employeeCount"
              label={t(`servicePartner.employeeOptions.${key}`)}
              checked={formData.employeeCount === key}
              onChange={() => onChange({ employeeCount: key })}
            />
          ))}
        </Box>
        {errors.employeeCount && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.employeeCount}
          </Text>
        )}
      </Box>

      {/* Services */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.servicesLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {serviceKeys.map((key) => (
            <Checkbox
              key={key}
              name={`service-${key}`}
              label={t(`servicePartner.services.${key}`)}
              checked={formData.services.includes(key)}
              onChange={() => toggleService(key)}
            />
          ))}
        </Box>
        {errors.services && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.services}
          </Text>
        )}
      </Box>

      {/* Service Website / Instagram */}
      <FormField.Input
        id="serviceWebsite"
        label={t('servicePartner.siteOrInstagramLabel')}
        placeholder={t('servicePartner.siteOrInstagramPlaceholder')}
        value={formData.serviceWebsite}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ serviceWebsite: e.target.value })}
      />

      {/* Clients Volume */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.clientsVolumeLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {clientsVolumeOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="clientsVolume"
              label={t(`servicePartner.clientsVolumeOptions.${opt.key}`)}
              checked={formData.clientsVolume === opt.value}
              onChange={() => onChange({ clientsVolume: opt.value })}
            />
          ))}
        </Box>
        {errors.clientsVolume && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.clientsVolume}
          </Text>
        )}
      </Box>

      {/* Nuvemshop Experience */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('servicePartner.nuvemshopExperienceLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {experienceOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="nuvemshopExperience"
              label={t(`servicePartner.experienceOptions.${opt.key}`)}
              checked={formData.nuvemshopExperience === opt.value}
              onChange={() => onChange({ nuvemshopExperience: opt.value })}
            />
          ))}
        </Box>
        {errors.nuvemshopExperience && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.nuvemshopExperience}
          </Text>
        )}
      </Box>
    </Box>
  );
}

function AffiliateDetails({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}) {
  const { t } = useTranslation();

  const platformKeys = ['youtube', 'instagram', 'tiktok', 'blog', 'podcast', 'linkedin', 'other'] as const;
  const readyToReferKeys = ['yes', 'no'] as const;
  const monetizationKeys = ['consultoria', 'cursos', 'mentorias', 'publicidade', 'afiliado', 'nao_monetizo'] as const;
  const authorityKeys = ['cursos_recorrentes', 'eventos_pontuais', 'tutoriais_gratuitos', 'informativo'] as const;
  const communityKeys = ['whatsapp_telegram', 'newsletter', 'grupo_privado', 'redes_sociais'] as const;
  const ecommerceKeys = ['usuario_nuvemshop', 'criei_lojas_nuvemshop', 'criei_lojas_outras', 'ensino_sem_loja', 'sem_experiencia'] as const;
  const nicheKeys = ['ecommerce', 'empreendedorismo', 'marketing', 'tecnologia', 'marketplace', 'dropshipping', 'lifestyle', 'outro'] as const;
  const expectationKeys = ['commissions', 'exclusive_support', 'training_materials', 'authority_partner'] as const;

  const toggleExpectation = (exp: string) => {
    const current = formData.expectations;
    if (current.includes(exp)) {
      onChange({ expectations: current.filter((e) => e !== exp) });
    } else {
      onChange({ expectations: [...current, exp] });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">{t('affiliate.title')}</Title>
        <Text color="neutral-textLow">{t('affiliate.subtitle')}</Text>
      </Box>

      {/* Content Platforms (up to 3) */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.contentPlatformsLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {platformKeys.map((key) => (
            <Checkbox
              key={key}
              name={`contentPlatform-${key}`}
              label={t(`affiliate.platformOptions.${key}`)}
              checked={formData.contentPlatforms.includes(key)}
              onChange={() => {
                const current = formData.contentPlatforms;
                if (current.includes(key)) {
                  onChange({ contentPlatforms: current.filter((p) => p !== key) });
                } else if (current.length < 3) {
                  onChange({ contentPlatforms: [...current, key] });
                }
              }}
            />
          ))}
        </Box>
        {errors.contentPlatforms && (
          <Text color="danger-textLow" fontSize="caption">{errors.contentPlatforms}</Text>
        )}
      </Box>

      {/* Ready to Refer */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.readyToReferLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {readyToReferKeys.map((key) => (
            <Radio
              key={key}
              name="readyToRefer"
              label={t(`affiliate.readyToReferOptions.${key}`)}
              checked={formData.readyToRefer === key}
              onChange={() => onChange({ readyToRefer: key })}
            />
          ))}
        </Box>
        {errors.readyToRefer && (
          <Text color="danger-textLow" fontSize="caption">{errors.readyToRefer}</Text>
        )}
      </Box>

      {/* Monetization (multiple choice) */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.monetizationLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {monetizationKeys.map((key) => (
            <Checkbox
              key={key}
              name={`monetization-${key}`}
              label={t(`affiliate.monetizationOptions.${key}`)}
              checked={formData.monetization.includes(key)}
              onChange={() => {
                const current = formData.monetization;
                if (current.includes(key)) {
                  onChange({ monetization: current.filter((m) => m !== key) });
                } else {
                  onChange({ monetization: [...current, key] });
                }
              }}
            />
          ))}
        </Box>
        {errors.monetization && (
          <Text color="danger-textLow" fontSize="caption">{errors.monetization}</Text>
        )}
      </Box>

      {/* Authority */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.authorityLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {authorityKeys.map((key) => (
            <Radio
              key={key}
              name="authority"
              label={t(`affiliate.authorityOptions.${key}`)}
              checked={formData.authority === key}
              onChange={() => onChange({ authority: key })}
            />
          ))}
        </Box>
        {errors.authority && (
          <Text color="danger-textLow" fontSize="caption">{errors.authority}</Text>
        )}
      </Box>

      {/* Community Type */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.communityTypeLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {communityKeys.map((key) => (
            <Radio
              key={key}
              name="communityType"
              label={t(`affiliate.communityOptions.${key}`)}
              checked={formData.communityType === key}
              onChange={() => onChange({ communityType: key })}
            />
          ))}
        </Box>
        {errors.communityType && (
          <Text color="danger-textLow" fontSize="caption">{errors.communityType}</Text>
        )}
      </Box>

      {/* E-commerce Experience */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.ecommerceExperienceLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {ecommerceKeys.map((key) => (
            <Radio
              key={key}
              name="ecommerceExperience"
              label={t(`affiliate.ecommerceOptions.${key}`)}
              checked={formData.ecommerceExperience === key}
              onChange={() => onChange({ ecommerceExperience: key })}
            />
          ))}
        </Box>
        {errors.ecommerceExperience && (
          <Text color="danger-textLow" fontSize="caption">{errors.ecommerceExperience}</Text>
        )}
      </Box>

      {/* Audience Niche */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.audienceNicheLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {nicheKeys.map((key) => (
            <Radio
              key={key}
              name="audienceNiche"
              label={t(`affiliate.nicheOptions.${key}`)}
              checked={formData.audienceNiche === key}
              onChange={() => onChange({ audienceNiche: key })}
            />
          ))}
        </Box>
        {errors.audienceNiche && (
          <Text color="danger-textLow" fontSize="caption">{errors.audienceNiche}</Text>
        )}
      </Box>

      {/* Expectations */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">{t('affiliate.expectationsLabel')} *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {expectationKeys.map((key) => (
            <Checkbox
              key={key}
              name={`exp-${key}`}
              label={t(`affiliate.expectationOptions.${key}`)}
              checked={formData.expectations.includes(key)}
              onChange={() => toggleExpectation(key)}
            />
          ))}
        </Box>
        {errors.expectations && (
          <Text color="danger-textLow" fontSize="caption">{errors.expectations}</Text>
        )}
      </Box>

      {/* High potential indicator */}
      {(formData.authority === 'cursos_recorrentes' || formData.communityType === 'grupo_privado') && (
        <Alert appearance="success" title={t('affiliate.highPotentialTitle')}>
          {t('affiliate.highPotentialMessage')}
        </Alert>
      )}
    </Box>
  );
}

// Confirmation row helper
function ConfirmRow({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      gap="4"
      padding="2"
      borderStyle="solid"
      borderWidth="none"
      borderBottomWidth="1"
      borderColor="neutral-surfaceHighlight"
    >
      <Text fontSize="caption" color="neutral-textLow" style={{ minWidth: '140px', flexShrink: 0 }}>
        {label}
      </Text>
      <Text fontSize="base" fontWeight="medium" textAlign="right">
        {value}
      </Text>
    </Box>
  );
}

// Step 5: Confirmation
function StepConfirmation({ formData }: { formData: FormData }) {
  const { t } = useTranslation();

  const getPartnerTypeLabel = (type?: PartnerType) => {
    if (type && type !== 'merchant') {
      return t(`confirmation.partnerTypes.${type}`);
    }
    return '';
  };

  const storeFreqLabel = (v?: string) => {
    if (v) return t(`confirmation.storeFreqValues.${v}`);
    return v;
  };

  const volumeLabel = (v?: string) => {
    if (v) return t(`confirmation.volumeValues.${v}`);
    return v;
  };

  const expLabel = (v?: string) => {
    if (v) return t(`confirmation.experienceValues.${v}`);
    return v;
  };

  /** Translate a list of keys using a translation prefix. */
  const translateList = (keys: string[], prefix: string) =>
    keys.map((k) => t(`${prefix}.${k}`)).join(', ');

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">{t('confirmation.title')}</Title>
        <Text color="neutral-textLow">{t('confirmation.subtitle')}</Text>
      </Box>

      <Card padding="small">
        <Box display="flex" flexDirection="column">
          {/* Common fields */}
          <ConfirmRow label={t('confirmation.partnerTypeLabel')} value={getPartnerTypeLabel(formData.partnerType)} />
          {formData.companyName && <ConfirmRow label={t('confirmation.companyLabel')} value={formData.companyName} />}
          <ConfirmRow label={t('confirmation.countryLabel')} value={formData.country ? t(`companyInfo.countries.${formData.country}`) : undefined} />
          {formData.website && <ConfirmRow label={t('confirmation.websiteLabel')} value={formData.website} />}

          {/* Tech Partner */}
          {formData.partnerType === 'tech_partner' && (
            <>
              <ConfirmRow label={t('confirmation.solutionTypeLabel')} value={formData.solutionType ? t(`techPartner.solutionTypes.${formData.solutionType}`) : undefined} />
              <ConfirmRow label={t('confirmation.technologiesLabel')} value={formData.technologies.join(', ')} />
              {formData.solutionDescription && <ConfirmRow label={t('confirmation.descriptionLabel')} value={formData.solutionDescription} />}
            </>
          )}

          {/* Agency Partner */}
          {formData.partnerType === 'service_partner' && (
            <>
              <ConfirmRow label={t('confirmation.serviceTypeLabel')} value={formData.serviceType ? t(`servicePartner.serviceTypes.${formData.serviceType}`) : undefined} />
              <ConfirmRow label={t('confirmation.storeFrequencyLabel')} value={storeFreqLabel(formData.storeFrequency)} />
              <ConfirmRow label={t('confirmation.employeesLabel')} value={formData.employeeCount ? t(`servicePartner.employeeOptions.${formData.employeeCount}`) : undefined} />
              <ConfirmRow label={t('confirmation.servicesLabel')} value={formData.services.length > 0 ? translateList(formData.services, 'servicePartner.services') : undefined} />
              <ConfirmRow label={t('confirmation.siteInstagramLabel')} value={formData.serviceWebsite} />
              <ConfirmRow label={t('confirmation.storeVolumeLabel')} value={volumeLabel(formData.clientsVolume)} />
              <ConfirmRow label={t('confirmation.nuvemshopExpLabel')} value={expLabel(formData.nuvemshopExperience)} />
            </>
          )}

          {/* Affiliate */}
          {formData.partnerType === 'affiliate' && (
            <>
              <ConfirmRow label={t('confirmation.platformsLabel')} value={formData.contentPlatforms.length > 0 ? translateList(formData.contentPlatforms, 'affiliate.platformOptions') : undefined} />
              <ConfirmRow label={t('confirmation.readyToReferLabel')} value={formData.readyToRefer === 'yes' ? t('confirmation.yes') : t('confirmation.no')} />
              <ConfirmRow label={t('confirmation.monetizationLabel')} value={formData.monetization.length > 0 ? translateList(formData.monetization, 'affiliate.monetizationOptions') : undefined} />
              <ConfirmRow label={t('confirmation.authorityLabel')} value={formData.authority ? t(`affiliate.authorityOptions.${formData.authority}`) : undefined} />
              <ConfirmRow label={t('confirmation.communityLabel')} value={formData.communityType ? t(`affiliate.communityOptions.${formData.communityType}`) : undefined} />
              <ConfirmRow label={t('confirmation.ecommerceExpLabel')} value={formData.ecommerceExperience ? t(`affiliate.ecommerceOptions.${formData.ecommerceExperience}`) : undefined} />
              <ConfirmRow label={t('confirmation.nicheLabel')} value={formData.audienceNiche ? t(`affiliate.nicheOptions.${formData.audienceNiche}`) : undefined} />
              {formData.expectations.length > 0 && (
                <ConfirmRow label={t('confirmation.expectationsLabel')} value={translateList(formData.expectations, 'affiliate.expectationOptions')} />
              )}
            </>
          )}
        </Box>
      </Card>

      <Alert appearance="primary" title={t('confirmation.submitAlertTitle')}>
        {formData.partnerType === 'affiliate'
          ? t('confirmation.submitAlertAffiliate')
          : t('confirmation.submitAlertDefault')}
      </Alert>
    </Box>
  );
}
