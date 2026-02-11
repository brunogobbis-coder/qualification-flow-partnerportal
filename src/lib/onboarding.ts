import type { Objective } from '@/types/qualification';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: 'email' | 'sandbox' | 'call' | 'portal' | 'training' | 'directory' | 'dashboard' | 'materials' | 'link' | 'docs';
  timing?: string;
}

export interface OnboardingTrack {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  steps: OnboardingStep[];
  resources: {
    title: string;
    url: string;
    description: string;
  }[];
}

export const onboardingTracks: Record<Objective, OnboardingTrack> = {
  tech_partner: {
    title: 'Tech Partner Onboarding',
    subtitle: 'Bem-vindo ao programa de desenvolvedores',
    welcomeMessage: 'Parabéns por ser aprovado como Parceiro Tecnológico da Nuvemshop! Estamos empolgados em ter você no nosso ecossistema.',
    steps: [
      {
        id: 'welcome-email',
        title: 'Email de boas-vindas',
        description: 'Você receberá um email com credenciais de acesso à documentação da API e ao portal de desenvolvedores.',
        icon: 'email',
        timing: 'Imediato após aprovação',
      },
      {
        id: 'sandbox',
        title: 'Sandbox de desenvolvimento',
        description: 'Provisionamento de loja de teste ilimitada para desenvolvimento e testes da sua integração.',
        icon: 'sandbox',
        timing: '24 horas',
      },
      {
        id: 'tech-call',
        title: 'Call de onboarding técnico',
        description: 'Opcional: Agende uma call com nossa equipe técnica para tirar dúvidas e receber orientações.',
        icon: 'call',
        timing: 'Sob demanda',
      },
      {
        id: 'portal-access',
        title: 'Acesso ao portal de parceiros',
        description: 'Dashboard completo para acompanhar instalações, métricas e documentação técnica.',
        icon: 'portal',
        timing: 'Imediato',
      },
    ],
    resources: [
      {
        title: 'Documentação da API',
        url: 'https://nuvemshop.github.io/api-documentation/',
        description: 'Documentação completa da API REST da Nuvemshop',
      },
      {
        title: 'App Store Guidelines',
        url: 'https://www.nuvemshop.com.br/parceiros/desenvolvedores',
        description: 'Diretrizes para publicação de apps na loja',
      },
      {
        title: 'Design System Nimbus',
        url: 'https://nimbus.nuvemshop.com.br/',
        description: 'Componentes e padrões de design para apps',
      },
    ],
  },

  service_provider: {
    title: 'Service Partner Onboarding',
    subtitle: 'Bem-vindo ao programa de parceiros de serviços',
    welcomeMessage: 'Parabéns por ser aprovado como Parceiro de Serviços! Você agora faz parte da nossa rede de especialistas.',
    steps: [
      {
        id: 'welcome-email',
        title: 'Email de boas-vindas',
        description: 'Você receberá um email com acesso aos recursos exclusivos para parceiros de serviços.',
        icon: 'email',
        timing: 'Imediato após aprovação',
      },
      {
        id: 'directory',
        title: 'Listagem no diretório de parceiros',
        description: 'Após verificação, seu perfil será listado no diretório oficial de parceiros Nuvemshop.',
        icon: 'directory',
        timing: '5-7 dias após verificação',
      },
      {
        id: 'training',
        title: 'Trilha de capacitação',
        description: 'Acesso a materiais e treinamentos da Nuvemshop para aumentar sua credibilidade.',
        icon: 'training',
        timing: 'Acesso imediato',
      },
      {
        id: 'leads',
        title: 'Programa de indicação de leads',
        description: 'Inscrição no programa para receber indicações de lojistas que precisam de serviços.',
        icon: 'portal',
        timing: 'Após completar trilha de capacitação',
      },
    ],
    resources: [
      {
        title: 'Portal de Parceiros',
        url: 'https://www.nuvemshop.com.br/parceiros',
        description: 'Acesse recursos, treinamentos e oportunidades',
      },
      {
        title: 'Central de Ajuda',
        url: 'https://atendimento.nuvemshop.com.br/',
        description: 'Base de conhecimento completa sobre a plataforma',
      },
      {
        title: 'Comunidade de Parceiros',
        url: 'https://www.nuvemshop.com.br/parceiros/comunidade',
        description: 'Conecte-se com outros parceiros',
      },
    ],
  },

  affiliate: {
    title: 'Affiliate Onboarding',
    subtitle: 'Bem-vindo ao programa de afiliados',
    welcomeMessage: 'Parabéns! Você foi aprovado automaticamente no programa de afiliados da Nuvemshop.',
    steps: [
      {
        id: 'dashboard',
        title: 'Acesso ao painel de afiliados',
        description: 'Dashboard para acompanhar suas indicações, conversões e comissões em tempo real.',
        icon: 'dashboard',
        timing: 'Imediato',
      },
      {
        id: 'materials',
        title: 'Materiais de marketing',
        description: 'Biblioteca com banners, textos prontos e materiais gráficos para divulgação.',
        icon: 'materials',
        timing: 'Imediato',
      },
      {
        id: 'tracking-link',
        title: 'Link de indicação personalizado',
        description: 'Seu link exclusivo com tracking para rastrear todas as suas indicações.',
        icon: 'link',
        timing: 'Imediato',
      },
      {
        id: 'docs',
        title: 'Estrutura de comissões',
        description: 'Documentação detalhada sobre como funcionam as comissões e pagamentos.',
        icon: 'docs',
        timing: 'Imediato',
      },
    ],
    resources: [
      {
        title: 'Painel de Afiliados',
        url: 'https://www.nuvemshop.com.br/afiliados/dashboard',
        description: 'Acompanhe suas métricas e comissões',
      },
      {
        title: 'Materiais de Marketing',
        url: 'https://www.nuvemshop.com.br/afiliados/materiais',
        description: 'Banners, textos e recursos para promoção',
      },
      {
        title: 'FAQ do Programa',
        url: 'https://www.nuvemshop.com.br/afiliados/faq',
        description: 'Perguntas frequentes sobre o programa',
      },
    ],
  },
};

// Get onboarding track by objective
export function getOnboardingTrack(objective: Objective): OnboardingTrack | null {
  return onboardingTracks[objective];
}

// Generate personalized welcome message
export function getWelcomeMessage(objective: Objective, name?: string): string {
  const track = getOnboardingTrack(objective);
  if (!track) return '';
  
  const greeting = name ? `Olá ${name}! ` : '';
  return greeting + track.welcomeMessage;
}
