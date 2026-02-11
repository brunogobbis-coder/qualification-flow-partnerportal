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

// Nuvemshop Logo SVG component
function NuvemshopLogo() {
  return (
    <svg width="140" height="28" viewBox="0 0 841 164" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100.8 56.3c-3.5-17.5-19-30.7-37.5-30.7-6.5 0-12.6 1.6-18 4.5C39.5 12.7 22.3 0 2.2 0h-2v45.3c0 30.8 25 55.8 55.8 55.8h.1c24.7 0 45.6-16.2 52.8-38.5-.1 0 .1-2 .1-2-.1-1.4-.1-2.9-.2-4.3z" fill="#6C31C4"/>
      <path d="M220.8 36.4h16.2v8.4h.3c4.8-6.7 11.7-10.1 20.7-10.1 8.7 0 15.1 3 19.3 9.1 4.2 6 6.3 14.4 6.3 25.2v39.4h-17V72c0-7-.9-12.2-2.7-15.7-1.8-3.5-5.2-5.2-10.2-5.2-5.7 0-9.8 2-12.3 6.1-2.5 4.1-3.8 10.3-3.8 18.6v32.6h-16.8V36.4zM367.3 108.4h-16.8v-8.3h-.3c-5 6.6-12 9.9-21 9.9-8.7 0-15.1-3-19.3-9.1-4.2-6-6.3-14.4-6.3-25.2V36.4h17v36.4c0 7 .9 12.2 2.7 15.7 1.8 3.5 5.2 5.2 10.2 5.2 5.7 0 9.8-2 12.3-6.1 2.5-4.1 3.8-10.3 3.8-18.6V36.4h16.8v72h-.1zM432.3 36.4h17.1l-26.5 72h-18.7l-26.5-72h18.1l17.8 54.1h.8l17.9-54.1zM512.8 98.6c-5.3 7.6-13.7 11.4-25 11.4-11.7 0-20.7-3.8-26.8-11.3-6.2-7.6-9.2-17.3-9.2-29.3 0-11.5 3.2-21 9.5-28.4 6.3-7.4 15-11.2 26.2-11.2 11.5 0 20 3.6 25.5 10.9 5.5 7.3 8.3 17.6 8.3 30.9v2.8h-52.3c.5 7.3 2.6 12.9 6.3 16.9 3.7 4 8.8 5.9 15.3 5.9 4.5 0 8.2-1 11.1-3.1 2.9-2.1 5-5 6.3-8.8l14.8 3.3v-.1l-10 10.1zm-3.1-35c-.4-6.6-2.3-11.7-5.7-15.2-3.4-3.6-8.1-5.3-14.2-5.3-6 0-10.8 1.9-14.2 5.6-3.5 3.7-5.6 8.7-6.3 15H509.7zM534.8 36.4h16.2v8.4h.3c1.8-3.2 4.6-5.7 8.4-7.5 3.8-1.8 7.8-2.7 12-2.7 5.3 0 9.8 1.1 13.5 3.2 3.7 2.1 6.5 5.4 8.2 9.7 2.4-4.1 5.6-7.3 9.6-9.5 4-2.2 8.4-3.4 13.3-3.4 8.2 0 14 2.8 17.5 8.5 3.5 5.6 5.2 13.7 5.2 24.2v41.1h-17V72c0-13.1-4.2-19.7-12.5-19.7-5.3 0-9.2 1.9-11.6 5.6-2.4 3.7-3.6 9.7-3.6 17.8v32.6h-17V72c0-6.7-.9-11.7-2.6-15-1.7-3.4-4.9-5-9.5-5-5.5 0-9.5 2-12.1 6-2.6 4-3.9 10.2-3.9 18.5v31.8h-16.8V36.4h1.4zM666.8 95.6l14-5.3c1.5 4.3 3.8 7.5 7.1 9.6 3.3 2.1 7.2 3.2 11.9 3.2 4.5 0 8-1 10.5-2.9 2.5-1.9 3.8-4.5 3.8-7.8 0-3.1-1.1-5.4-3.4-7-2.3-1.6-6.5-3.2-12.6-5-8.2-2.3-14.3-5.5-18.3-9.5-4-4-6-9.2-6-15.4 0-7.5 2.8-13.5 8.5-18.1 5.6-4.5 12.7-6.8 21.2-6.8 7.3 0 13.5 1.8 18.5 5.4 5 3.6 8.4 8.5 10.2 14.8l-14 5c-2.5-7.3-8-11-16.5-11-4.1 0-7.3.9-9.8 2.7-2.4 1.8-3.6 4.3-3.6 7.3 0 3 1.2 5.3 3.5 6.8 2.3 1.5 6.3 3.1 11.8 4.7 8.5 2.5 14.9 5.8 19.1 9.9 4.2 4.1 6.3 9.5 6.3 16.1 0 8-3 14.3-8.9 18.8-6 4.5-13.3 6.8-22.1 6.8-8.5 0-15.5-2-21.2-5.9-5.6-3.9-9.4-9.5-11.4-16.5l1.4.1zM754.8 108.4V0h17v40.4h.3c4.8-6.8 12.1-10.2 22-10.2 8.7 0 15.5 3.5 20.2 10.4 4.8 6.9 7.1 16.3 7.1 28.1 0 12.1-2.6 21.6-7.7 28.6-5.2 7-12.2 10.5-21.2 10.5-9.5 0-16.5-3.7-21-11.2h-.3v9.5h-16.4v2.3zm16.7-39.1c0 8.4 1.7 15.1 5.2 19.9 3.5 4.9 8.5 7.3 15.1 7.3 6.3 0 11.1-2.5 14.3-7.6 3.3-5 4.9-11.6 4.9-19.6 0-7.9-1.5-14.3-4.6-19.2-3-4.9-7.7-7.4-13.9-7.4-7 0-12.2 2.5-15.6 7.6-3.6 5-5.4 11.3-5.4 19z" fill="#1A1A1A"/>
    </svg>
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

// Step labels
const stepLabels = ['Objetivo', 'Perfil', 'Qualificação', 'Revisão'];

export default function NimbusSignupFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const clearedErrors = { ...errors };
    Object.keys(updates).forEach((key) => {
      delete clearedErrors[key];
    });
    setErrors(clearedErrors);
  }, [errors]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.partnerType) {
          newErrors.partnerType = 'Selecione um tipo de parceria';
        }
        break;
      case 1:
        if (formData.partnerType !== 'affiliate') {
          if (!formData.companyName.trim()) newErrors.companyName = 'Nome da empresa é obrigatório';
        }
        if (formData.partnerType === 'affiliate') {
          if (!formData.audienceSize) newErrors.audienceSize = 'Selecione o tamanho da sua audiência';
        }
        if (!formData.country) newErrors.country = 'País é obrigatório';
        break;
      case 2:
        if (formData.partnerType === 'tech_partner') {
          if (!formData.solutionType) newErrors.solutionType = 'Selecione o tipo de solução';
          if (formData.technologies.length === 0) newErrors.technologies = 'Selecione ao menos uma tecnologia';
        }
        if (formData.partnerType === 'service_partner') {
          if (!formData.serviceType) newErrors.serviceType = 'Selecione o tipo de prestador';
          if (!formData.storeFrequency) newErrors.storeFrequency = 'Selecione a frequência de criação de lojas';
          if (!formData.employeeCount) newErrors.employeeCount = 'Selecione a quantidade de colaboradores';
          if (formData.services.length === 0) newErrors.services = 'Selecione ao menos um serviço';
          if (!formData.clientsVolume) newErrors.clientsVolume = 'Selecione o volume de lojas';
          if (!formData.nuvemshopExperience) newErrors.nuvemshopExperience = 'Selecione sua experiência';
        }
        if (formData.partnerType === 'affiliate') {
          if (formData.contentPlatforms.length === 0) newErrors.contentPlatforms = 'Selecione ao menos uma plataforma';
          if (!formData.readyToRefer) newErrors.readyToRefer = 'Selecione uma opção';
          if (formData.monetization.length === 0) newErrors.monetization = 'Selecione ao menos uma forma de monetização';
          if (!formData.authority) newErrors.authority = 'Selecione uma opção';
          if (!formData.communityType) newErrors.communityType = 'Selecione o tipo de comunidade';
          if (!formData.ecommerceExperience) newErrors.ecommerceExperience = 'Selecione sua experiência';
          if (!formData.audienceNiche) newErrors.audienceNiche = 'Selecione o nicho da sua audiência';
          if (formData.expectations.length === 0) newErrors.expectations = 'Selecione ao menos uma expectativa';
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
    window.location.href = 'https://www.nuvemshop.com.br/monte-sua-loja-virtual';
  };

  // Success Screen
  if (isComplete) {
    const getSuccessContent = () => {
      const pt: string | undefined = formData.partnerType;
      switch (pt) {
        case 'tech_partner':
          return {
            title: 'Formulário concluído',
            subtitle: 'Tech Partner',
            message: 'Obrigado pelo interesse em se tornar um parceiro Nuvemshop! Nossa equipe analisará sua proposta e entrará em contato.',
            nextSteps: [
              'Análise da proposta pela equipe de parcerias',
              'Contato para agendar call técnica (se aprovado)',
              'Acesso à documentação e sandbox de desenvolvimento',
            ],
          };
        case 'service_provider':
          return {
            title: 'Formulário concluído',
            subtitle: 'Agency Partner',
            message: 'Confira seu e-mail, preparamos boas-vindas e uma trilha com materiais valiosos para você escalar conosco.',
            nextSteps: [
              'Acesso ao portal de parceiros e recursos exclusivos',
              'Análise do perfil e portfólio pela equipe',
              'Confira a trilha de materiais no seu e-mail para escalar conosco',
            ],
          };
        case 'affiliate':
          return {
            title: 'Formulário concluído',
            subtitle: 'Afiliado',
            message: 'Parabéns! Seu cadastro foi aprovado automaticamente. Você receberá um WhatsApp com seu link de afiliado e instruções para começar.',
            nextSteps: [
              'Acesso imediato ao painel de afiliados',
              'Link de indicação personalizado',
              'Materiais de marketing e banners',
            ],
          };
        default:
          return {
            title: 'Cadastro concluído!',
            subtitle: '',
            message: 'Obrigado por completar sua qualificação. Entraremos em contato em breve.',
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
        {/* Header */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1"
          padding="4"
          backgroundColor="neutral-background"
          borderStyle="solid"
          borderWidth="none"
          borderBottomWidth="1"
          borderColor="neutral-surfaceHighlight"
        >
          <NuvemshopLogo />
          <Text fontSize="caption" color="neutral-textLow">
            Programa de Parceiros
          </Text>
        </Box>

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
                  <Text fontWeight="bold" fontSize="base">Próximos passos</Text>
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
              <Button as="a" appearance="primary" href="https://partners.nuvemshop.com.br/home" target="_blank" rel="noopener noreferrer">
              Acessar Partner Portal
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
      {/* Header with Logo */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1"
        padding="4"
        backgroundColor="neutral-background"
        borderStyle="solid"
        borderWidth="none"
        borderBottomWidth="1"
        borderColor="neutral-surfaceHighlight"
      >
        <NuvemshopLogo />
        <Text fontSize="caption" color="neutral-textLow">
          Programa de Parceiros
        </Text>
      </Box>

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
                  Voltar
                </Button>
              ) : (
                <Box />
              )}
              
              {currentStep < stepLabels.length - 1 ? (
                <Button appearance="primary" onClick={handleNext}>
                  Continuar
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
                      <Text>Enviando...</Text>
                    </Box>
                  ) : (
                    'Enviar candidatura'
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
          <Link as="a" href="https://www.nuvemshop.com.br/termos-de-uso" target="_blank" appearance="primary">
            <Text fontSize="caption" color="neutral-textLow">Termos de Uso</Text>
          </Link>
          <Text fontSize="caption" color="neutral-textDisabled">|</Text>
          <Link as="a" href="https://www.nuvemshop.com.br/politica-de-privacidade" target="_blank" appearance="primary">
            <Text fontSize="caption" color="neutral-textLow">Política de Privacidade</Text>
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
  const options = [
    {
      value: 'tech_partner' as PartnerType,
      label: 'Desenvolver apps e integrações',
      description: 'Ideal para ERPs, empresas SaaS que querem integrar sua solução na Nuvemshop e para desenvolvedores que querem criar aplicativos e funcionalidades exclusivas na plataforma',
      icon: <CogIcon size={24} />,
    },
    {
      value: 'service_partner' as PartnerType,
      label: 'Criar lojas virtuais para meus clientes',
      description: 'Ideal para agências, freelancers e profissionais que prestam o serviço de criação e migração de lojas virtuais',
      icon: <UserIcon size={24} />,
    },
    {
      value: 'affiliate' as PartnerType,
      label: 'Indicar e ganhar comissões',
      description: 'Ideal para influencers, criadores de conteúdo e marketeiros que querem indicar a Nuvemshop para seus clientes',
      icon: <RocketIcon size={24} />,
    },
    {
      value: 'merchant' as PartnerType,
      label: 'Criar minha loja virtual',
      description: 'Quer vender online? Crie sua loja Nuvemshop aqui',
      icon: <StoreIcon size={24} />,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">O que você quer fazer com a Nuvemshop?</Title>
        <Text color="neutral-textLow">Escolha a opção que melhor descreve seu objetivo</Text>
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
  const countries = ['Brasil', 'Argentina', 'México', 'Colômbia', 'Chile', 'Outro'];

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">
          {formData.partnerType === 'affiliate' ? 'Seu perfil' : 'Sua empresa'}
        </Title>
        <Text color="neutral-textLow">
          {formData.partnerType === 'affiliate'
            ? 'Informações sobre você e sua presença online'
            : 'Informações da sua empresa ou negócio'}
        </Text>
      </Box>

      {formData.partnerType !== 'affiliate' && (
        <FormField.Input
          id="companyName"
          label="Nome da empresa"
          placeholder="Nome da sua empresa"
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
        label={formData.partnerType === 'affiliate' ? 'Seu site ou perfil' : 'Website'}
        placeholder="https://..."
        value={formData.website}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ website: e.target.value })}
      />

      {formData.partnerType === 'affiliate' && (
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="medium">Tamanho da audiência *</Text>
          <Select
            id="audienceSize"
            name="audienceSize"
            appearance={errors.audienceSize ? 'danger' : 'neutral'}
            value={formData.audienceSize || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ audienceSize: e.target.value || undefined })}
          >
            <Select.Option label="Selecione o tamanho da sua audiência" value="" disabled />
            <Select.Option label="Menos de 1.000" value="under_1k" />
            <Select.Option label="1.000 - 10.000" value="1k_10k" />
            <Select.Option label="10.000 - 100.000" value="10k_100k" />
            <Select.Option label="Mais de 100.000" value="more_than_100k" />
          </Select>
          {errors.audienceSize && (
            <Text color="danger-textLow" fontSize="caption">{errors.audienceSize}</Text>
          )}
        </Box>
      )}

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">País *</Text>
        <Select
          id="country"
          name="country"
          appearance={errors.country ? 'danger' : 'neutral'}
          value={formData.country}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ country: e.target.value })}
        >
          <Select.Option label="Selecione o país" value="" disabled selected={!formData.country} />
          {countries.map((country) => (
            <Select.Option key={country} label={country} value={country} />
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
  const solutionTypes = ['Aplicativo', 'Tema', 'Integração', 'ERP/CRM'];
  const technologies = ['React', 'Node.js', 'PHP', 'Python', 'Java', '.NET', 'Outro'];

  const toggleTechnology = (tech: string) => {
    const current = formData.technologies;
    if (current.includes(tech)) {
      onChange({ technologies: current.filter((t) => t !== tech) });
    } else {
      onChange({ technologies: [...current, tech] });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">Detalhes técnicos</Title>
        <Text color="neutral-textLow">Conte-nos sobre sua solução</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Tipo de solução *</Text>
        <Select
          id="solutionType"
          name="solutionType"
          appearance={errors.solutionType ? 'danger' : 'neutral'}
          value={formData.solutionType || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ solutionType: e.target.value })}
        >
          <Select.Option label="Selecione o tipo" value="" disabled selected={!formData.solutionType} />
          {solutionTypes.map((type) => (
            <Select.Option key={type} label={type} value={type} />
          ))}
        </Select>
        {errors.solutionType && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.solutionType}
          </Text>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Tecnologias *</Text>
        <Box display="flex" flexWrap="wrap" gap="2">
          {technologies.map((tech) => (
            <Checkbox
              key={tech}
              name={`tech-${tech}`}
              label={tech}
              checked={formData.technologies.includes(tech)}
              onChange={() => toggleTechnology(tech)}
            />
          ))}
        </Box>
        {errors.technologies && (
          <Text color="danger-textLow" fontSize="caption">
            {errors.technologies}
          </Text>
        )}
      </Box>

      <FormField.Textarea
        id="solutionDescription"
        label="Descreva sua solução"
        placeholder="O que você pretende desenvolver e como ajudará os lojistas?"
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
  const serviceTypes = ['Agência', 'Freelancer', 'Consultor', 'Desenvolvedor', 'Gestor de tráfego'];
  
  const employeeOptions = [
    { value: 'solo', label: 'Trabalho sozinho' },
    { value: '2-5', label: '2-5 pessoas' },
    { value: '6-10', label: '6-10 pessoas' },
    { value: '11-50', label: '11-50 pessoas' },
    { value: '50+', label: '50+ pessoas' },
  ];

  const services = [
    'Criação de lojas',
    'Design e UX',
    'Marketing digital',
    'Gestão de tráfego',
    'SEO e conteúdo',
    'Desenvolvimento',
    'Consultoria',
    'Suporte',
    'Migração',
  ];

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
        <Title as="h2">Seus serviços</Title>
        <Text color="neutral-textLow">Conte-nos sobre os serviços que você oferece</Text>
      </Box>

      {/* Service Type */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Tipo de prestador *</Text>
        <Select
          id="serviceType"
          name="serviceType"
          appearance={errors.serviceType ? 'danger' : 'neutral'}
          value={formData.serviceType || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ serviceType: e.target.value })}
        >
          <Select.Option label="Selecione o tipo" value="" disabled selected={!formData.serviceType} />
          {serviceTypes.map((type) => (
            <Select.Option key={type} label={type} value={type} />
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
        <Text fontWeight="medium">Já implanta loja virtual na sua agência? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {[
            { value: 'monthly', label: 'Sim, já crio todos os meses' },
            { value: 'bimonthly', label: 'Sim, em média a cada dois meses ou mais' },
            { value: 'interested', label: 'Ainda não, mas temos interesse' },
            { value: 'other', label: 'Não, atuamos em outro segmento' },
          ].map((opt) => (
            <Radio
              key={opt.value}
              name="storeFrequency"
              label={opt.label}
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
        <Text fontWeight="medium">Quantidade de colaboradores *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {employeeOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="employeeCount"
              label={opt.label}
              checked={formData.employeeCount === opt.value}
              onChange={() => onChange({ employeeCount: opt.value })}
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
        <Text fontWeight="medium">Serviços oferecidos *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {services.map((service) => (
            <Checkbox
              key={service}
              name={`service-${service}`}
              label={service}
              checked={formData.services.includes(service)}
              onChange={() => toggleService(service)}
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
        label="Site ou Instagram"
        placeholder="https://seusite.com ou @seu_instagram"
        value={formData.serviceWebsite}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ serviceWebsite: e.target.value })}
      />

      {/* Clients Volume */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Quantas lojas você cria por mês? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {[
            { value: 'none', label: 'Nenhuma no momento' },
            { value: '1_5', label: '1 a 5 lojas por mês' },
            { value: '6_20', label: '6 a 20 lojas por mês' },
            { value: '21_50', label: '21 a 50 lojas por mês' },
            { value: '50+', label: 'Mais de 50 lojas por mês' },
          ].map((opt) => (
            <Radio
              key={opt.value}
              name="clientsVolume"
              label={opt.label}
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
        <Text fontWeight="medium">Experiência com a Nuvemshop *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {[
            { value: 'none', label: 'Nenhuma' },
            { value: 'basic', label: 'Básica' },
            { value: 'intermediate', label: 'Intermediária' },
            { value: 'advanced', label: 'Avançada' },
          ].map((opt) => (
            <Radio
              key={opt.value}
              name="nuvemshopExperience"
              label={opt.label}
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
  const readyToReferOptions = [
    { value: 'yes', label: 'Sim, já tenho para quem indicar' },
    { value: 'no', label: 'Não, estou estruturando meu canal' },
  ];

  const monetizationOptions = [
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'cursos', label: 'Venda de cursos (produtos digitais)' },
    { value: 'mentorias', label: 'Mentorias' },
    { value: 'publicidade', label: 'Publicidade/conteúdo' },
    { value: 'afiliado', label: 'Afiliado' },
    { value: 'nao_monetizo', label: 'Ainda não monetizo' },
  ];

  const authorityOptions = [
    { value: 'cursos_recorrentes', label: 'Sim, dou cursos/mentorias grupais recorrentes' },
    { value: 'eventos_pontuais', label: 'Sim, fiz eventos ou talleres pontuais' },
    { value: 'tutoriais_gratuitos', label: 'Não, mas compartilho tutoriais educativos gratuitos' },
    { value: 'informativo', label: 'Não, meu conteúdo é informativo ou entretenimento' },
  ];

  const communityOptions = [
    { value: 'whatsapp_telegram', label: 'Grupo WhatsApp/Telegram ativo' },
    { value: 'newsletter', label: 'Newsletter com alta taxa de abertura' },
    { value: 'grupo_privado', label: 'Grupo privado de alunos (Facebook/Discord)' },
    { value: 'redes_sociais', label: 'Não, só me comunico por posts/stories em redes sociais' },
  ];

  const ecommerceOptions = [
    { value: 'usuario_nuvemshop', label: 'Já sou usuário da Nuvemshop (tenho minha loja)' },
    { value: 'criei_lojas_nuvemshop', label: 'Já criei lojas para clientes na Nuvemshop' },
    { value: 'criei_lojas_outras', label: 'Já criei lojas em outras plataformas' },
    { value: 'ensino_sem_loja', label: 'Ensino outros a criar negócio online mas não tenho loja' },
    { value: 'sem_experiencia', label: 'Sem experiência técnica, mas audiência pede conselhos' },
  ];

  const expectationOptions = [
    'Comissões',
    'Suporte exclusivo',
    'Materiais de capacitação',
    'Maior autoridade como partner Nuvemshop',
  ];

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
        <Title as="h2">Qualificação de Afiliado</Title>
        <Text color="neutral-textLow">Conte-nos sobre você e sua audiência</Text>
      </Box>

      {/* Content Platforms (up to 3) */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Quais as suas principais plataformas de conteúdo? (até 3) *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {[
            { value: 'youtube', label: 'YouTube' },
            { value: 'instagram', label: 'Instagram' },
            { value: 'tiktok', label: 'TikTok' },
            { value: 'blog', label: 'Blog / Website' },
            { value: 'podcast', label: 'Podcast' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'other', label: 'Outra' },
          ].map((opt) => (
            <Checkbox
              key={opt.value}
              name={`contentPlatform-${opt.value}`}
              label={opt.label}
              checked={formData.contentPlatforms.includes(opt.value)}
              onChange={() => {
                const current = formData.contentPlatforms;
                if (current.includes(opt.value)) {
                  onChange({ contentPlatforms: current.filter((p) => p !== opt.value) });
                } else if (current.length < 3) {
                  onChange({ contentPlatforms: [...current, opt.value] });
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
        <Text fontWeight="medium">Você já tem algum cliente ou indicação em mente? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {readyToReferOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="readyToRefer"
              label={opt.label}
              checked={formData.readyToRefer === opt.value}
              onChange={() => onChange({ readyToRefer: opt.value })}
            />
          ))}
        </Box>
        {errors.readyToRefer && (
          <Text color="danger-textLow" fontSize="caption">{errors.readyToRefer}</Text>
        )}
      </Box>

      {/* Monetization (multiple choice) */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Como você monetiza hoje? (selecione todas que se aplicam) *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {monetizationOptions.map((opt) => (
            <Checkbox
              key={opt.value}
              name={`monetization-${opt.value}`}
              label={opt.label}
              checked={formData.monetization.includes(opt.value)}
              onChange={() => {
                const current = formData.monetization;
                if (current.includes(opt.value)) {
                  onChange({ monetization: current.filter((m) => m !== opt.value) });
                } else {
                  onChange({ monetization: [...current, opt.value] });
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
        <Text fontWeight="medium">Fez formação, taller ou mentoria paga nos últimos 6 meses? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {authorityOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="authority"
              label={opt.label}
              checked={formData.authority === opt.value}
              onChange={() => onChange({ authority: opt.value })}
            />
          ))}
        </Box>
        {errors.authority && (
          <Text color="danger-textLow" fontSize="caption">{errors.authority}</Text>
        )}
      </Box>

      {/* Community Type */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Tem comunidades fechadas com empreendedores? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {communityOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="communityType"
              label={opt.label}
              checked={formData.communityType === opt.value}
              onChange={() => onChange({ communityType: opt.value })}
            />
          ))}
        </Box>
        {errors.communityType && (
          <Text color="danger-textLow" fontSize="caption">{errors.communityType}</Text>
        )}
      </Box>

      {/* E-commerce Experience */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Qual é sua experiência prévia com plataformas de E-commerce? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {ecommerceOptions.map((opt) => (
            <Radio
              key={opt.value}
              name="ecommerceExperience"
              label={opt.label}
              checked={formData.ecommerceExperience === opt.value}
              onChange={() => onChange({ ecommerceExperience: opt.value })}
            />
          ))}
        </Box>
        {errors.ecommerceExperience && (
          <Text color="danger-textLow" fontSize="caption">{errors.ecommerceExperience}</Text>
        )}
      </Box>

      {/* Audience Niche */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Qual o principal nicho da sua audiência? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {[
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'empreendedorismo', label: 'Empreendedorismo e Finanças' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'tecnologia', label: 'Tecnologia' },
            { value: 'marketplace', label: 'Marketplace' },
            { value: 'dropshipping', label: 'Dropshipping' },
            { value: 'lifestyle', label: 'Lifestyle' },
            { value: 'outro', label: 'Outro' },
          ].map((opt) => (
            <Radio
              key={opt.value}
              name="audienceNiche"
              label={opt.label}
              checked={formData.audienceNiche === opt.value}
              onChange={() => onChange({ audienceNiche: opt.value })}
            />
          ))}
        </Box>
        {errors.audienceNiche && (
          <Text color="danger-textLow" fontSize="caption">{errors.audienceNiche}</Text>
        )}
      </Box>

      {/* Expectations */}
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">O que busca se juntando ao Programa? *</Text>
        <Box display="flex" flexDirection="column" gap="2">
          {expectationOptions.map((exp) => (
            <Checkbox
              key={exp}
              name={`exp-${exp}`}
              label={exp}
              checked={formData.expectations.includes(exp)}
              onChange={() => toggleExpectation(exp)}
            />
          ))}
        </Box>
        {errors.expectations && (
          <Text color="danger-textLow" fontSize="caption">{errors.expectations}</Text>
        )}
      </Box>

      {/* High potential indicator */}
      {(formData.authority === 'cursos_recorrentes' || formData.communityType === 'grupo_privado') && (
        <Alert appearance="success" title="Afiliado de Alto Potencial">
          Com sua autoridade e comunidade, você pode se qualificar para benefícios exclusivos!
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
  const getPartnerTypeLabel = (type?: PartnerType) => {
    switch (type) {
      case 'tech_partner':
        return 'Tech Partner';
      case 'service_partner':
        return 'Agency Partner';
      case 'affiliate':
        return 'Afiliado';
      default:
        return '';
    }
  };

  const storeFreqLabel = (v?: string) => {
    if (v === 'monthly') return 'Sim, todos os meses';
    if (v === 'bimonthly') return 'A cada dois meses ou mais';
    if (v === 'interested') return 'Ainda não, mas tem interesse';
    if (v === 'other') return 'Outro segmento';
    return v;
  };

  const volumeLabel = (v?: string) => {
    if (v === 'none') return 'Nenhuma no momento';
    if (v === '1_5') return '1 a 5 lojas';
    if (v === '6_20') return '6 a 20 lojas';
    if (v === '21_50') return '21 a 50 lojas';
    if (v === '50+') return 'Mais de 50 lojas';
    return v;
  };

  const expLabel = (v?: string) => {
    if (v === 'none') return 'Nenhuma';
    if (v === 'basic') return 'Básica';
    if (v === 'intermediate') return 'Intermediária';
    if (v === 'advanced') return 'Avançada';
    return v;
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box>
        <Title as="h2">Revisão</Title>
        <Text color="neutral-textLow">Confirme as informações antes de enviar</Text>
      </Box>

      <Card padding="small">
        <Box display="flex" flexDirection="column">
          {/* Common fields */}
          <ConfirmRow label="Tipo de Parceria" value={getPartnerTypeLabel(formData.partnerType)} />
          {formData.companyName && <ConfirmRow label="Empresa" value={formData.companyName} />}
          <ConfirmRow label="País" value={formData.country} />
          {formData.website && <ConfirmRow label="Website" value={formData.website} />}

          {/* Tech Partner */}
          {formData.partnerType === 'tech_partner' && (
            <>
              <ConfirmRow label="Tipo de Solução" value={formData.solutionType} />
              <ConfirmRow label="Tecnologias" value={formData.technologies.join(', ')} />
              {formData.solutionDescription && <ConfirmRow label="Descrição" value={formData.solutionDescription} />}
            </>
          )}

          {/* Agency Partner */}
          {formData.partnerType === 'service_partner' && (
            <>
              <ConfirmRow label="Tipo de Prestador" value={formData.serviceType} />
              <ConfirmRow label="Implanta Lojas?" value={storeFreqLabel(formData.storeFrequency)} />
              <ConfirmRow label="Colaboradores" value={formData.employeeCount} />
              <ConfirmRow label="Serviços" value={formData.services.join(', ')} />
              <ConfirmRow label="Site / Instagram" value={formData.serviceWebsite} />
              <ConfirmRow label="Volume de Lojas" value={volumeLabel(formData.clientsVolume)} />
              <ConfirmRow label="Experiência Nuvemshop" value={expLabel(formData.nuvemshopExperience)} />
            </>
          )}

          {/* Affiliate */}
          {formData.partnerType === 'affiliate' && (
            <>
              <ConfirmRow label="Plataformas" value={formData.contentPlatforms.join(', ')} />
              <ConfirmRow label="Pronto para Indicar" value={formData.readyToRefer === 'yes' ? 'Sim' : 'Não'} />
              <ConfirmRow label="Monetização" value={formData.monetization.join(', ')} />
              <ConfirmRow label="Autoridade" value={formData.authority} />
              <ConfirmRow label="Comunidade" value={formData.communityType} />
              <ConfirmRow label="Experiência E-commerce" value={formData.ecommerceExperience} />
              <ConfirmRow label="Nicho" value={formData.audienceNiche} />
              {formData.expectations.length > 0 && (
                <ConfirmRow label="Expectativas" value={formData.expectations.join(', ')} />
              )}
            </>
          )}
        </Box>
      </Card>

      <Alert appearance="primary" title="Ao enviar sua candidatura">
        {formData.partnerType === 'affiliate'
          ? 'Afiliados são aprovados automaticamente. Você receberá seu link de indicação no seu painel.'
          : 'Nossa equipe analisará sua candidatura e entrará em contato em até 5 dias úteis.'}
      </Alert>
    </Box>
  );
}
