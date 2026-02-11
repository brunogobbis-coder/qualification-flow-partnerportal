import type { QualificationData, AudienceSize } from '@/types/qualification';

export interface SubmissionResult {
  success: boolean;
  status: 'auto_approved' | 'pending_review' | 'error';
  message: string;
  applicationId?: string;
  isHighPotential?: boolean;
}

// Simulates API submission with different approval logic per partner type
export async function submitQualification(data: QualificationData): Promise<SubmissionResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate a mock application ID
  const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  try {
    // Log the submission (in production, this would be an API call)
    console.log('Submitting qualification data:', {
      applicationId,
      ...data,
      submittedAt: new Date().toISOString(),
    });

    // Determine approval logic based on partner type
    switch (data.objective) {
      case 'affiliate':
        // Affiliates get auto-approved
        const isHighPotential = data.affiliateData?.audienceSize === 'more_than_100k';
        return {
          success: true,
          status: 'auto_approved',
          applicationId,
          isHighPotential,
          message: isHighPotential
            ? 'Parabéns! Como afiliado de alto potencial, você receberá contato prioritário de nossa equipe!'
            : 'Seu cadastro foi aprovado automaticamente. Bem-vindo ao programa de afiliados!',
        };

      case 'tech_partner':
        // Tech partners require manual review
        return {
          success: true,
          status: 'pending_review',
          applicationId,
          message: 'Sua proposta foi recebida e será analisada pela equipe de parcerias tecnológicas.',
        };

      case 'service_provider':
        // Service providers require manual review
        return {
          success: true,
          status: 'pending_review',
          applicationId,
          message: 'Seu perfil foi recebido e será analisado pela equipe de parcerias de serviços.',
        };

      default:
        return {
          success: false,
          status: 'error',
          message: 'Tipo de parceria não identificado.',
        };
    }
  } catch (error) {
    console.error('Submission error:', error);
    return {
      success: false,
      status: 'error',
      message: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.',
    };
  }
}

// Review criteria configuration (for documentation/display purposes)
export const reviewCriteria = {
  tech_partner: {
    criteria: [
      'Viabilidade técnica da solução proposta',
      'Capacidades da equipe',
      'Potencial de mercado',
      'Diferenciação de apps existentes',
    ],
    sla: '5-7 dias úteis',
    reviewTeam: 'Equipe de Parcerias Tecnológicas',
  },
  service_provider: {
    criteria: [
      'Experiência relevante',
      'Qualidade do portfólio',
      'Relacionamentos com lojistas existentes',
      'Cobertura geográfica necessária',
    ],
    sla: '3-5 dias úteis',
    reviewTeam: 'Equipe de Parcerias de Serviços',
  },
  affiliate: {
    criteria: [],
    sla: 'Aprovação automática',
    reviewTeam: null,
  },
};

// Routing logic for internal review dashboard
export const routingLogic = {
  highPotential: {
    condition: (data: QualificationData) => {
      if (data.objective === 'affiliate' && data.affiliateData?.audienceSize === 'more_than_100k') {
        return true;
      }
      if (data.objective === 'tech_partner' && data.techPartnerData?.companySize === 'more_than_200') {
        return true;
      }
      return false;
    },
    routing: 'Direct to Partner Manager',
  },
  standard: {
    routing: 'Queue for batch review',
  },
  lowQuality: {
    condition: (data: QualificationData) => {
      // Example: incomplete tech descriptions
      if (
        data.objective === 'tech_partner' &&
        data.techPartnerData?.solutionDescription &&
        data.techPartnerData.solutionDescription.length < 100
      ) {
        return true;
      }
      return false;
    },
    routing: 'Automated rejection with feedback',
  },
};
