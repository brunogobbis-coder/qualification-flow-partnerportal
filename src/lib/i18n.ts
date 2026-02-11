export type Locale = 'pt-BR' | 'es';

export const translations: Record<Locale, typeof ptBR> = {
  'pt-BR': undefined as never,
  es: undefined as never,
};

// ── Portuguese (Brazil) ──────────────────────────────────────────────

const ptBR = {
  common: {
    partnerProgram: 'Programa de Parceiros',
    continue: 'Continuar',
    back: 'Voltar',
    submit: 'Enviar candidatura',
    submitting: 'Enviando...',
    termsOfUse: 'Termos de Uso',
    privacyPolicy: 'Política de Privacidade',
    accessPartnerPortal: 'Acessar Partner Portal',
    other: 'Outro',
    termsUrl: 'https://www.nuvemshop.com.br/termos-de-uso',
    privacyUrl: 'https://www.nuvemshop.com.br/politica-de-privacidade',
    merchantRedirectUrl: 'https://www.nuvemshop.com.br/monte-sua-loja-virtual',
    partnerPortalUrl: 'https://partners.nuvemshop.com.br/home',
  },

  steps: {
    objective: 'Objetivo',
    profile: 'Perfil',
    qualification: 'Qualificação',
    review: 'Revisão',
  },

  validation: {
    selectPartnerType: 'Selecione um tipo de parceria',
    companyNameRequired: 'Nome da empresa é obrigatório',
    selectAudienceSize: 'Selecione o tamanho da sua audiência',
    countryRequired: 'País é obrigatório',
    selectSolutionType: 'Selecione o tipo de solução',
    selectAtLeastOneTech: 'Selecione ao menos uma tecnologia',
    selectServiceType: 'Selecione o tipo de prestador',
    selectStoreFrequency: 'Selecione a frequência de criação de lojas',
    selectEmployeeCount: 'Selecione a quantidade de colaboradores',
    selectAtLeastOneService: 'Selecione ao menos um serviço',
    selectClientsVolume: 'Selecione o volume de lojas',
    selectExperience: 'Selecione sua experiência',
    selectAtLeastOnePlatform: 'Selecione ao menos uma plataforma',
    selectAnOption: 'Selecione uma opção',
    selectAtLeastOneMonetization: 'Selecione ao menos uma forma de monetização',
    selectCommunityType: 'Selecione o tipo de comunidade',
    selectEcommerceExperience: 'Selecione sua experiência',
    selectAudienceNiche: 'Selecione o nicho da sua audiência',
    selectAtLeastOneExpectation: 'Selecione ao menos uma expectativa',
  },

  success: {
    nextStepsTitle: 'Próximos passos',
    techPartner: {
      title: 'Formulário concluído',
      subtitle: 'Tech Partner',
      message:
        'Obrigado pelo interesse em se tornar um parceiro Nuvemshop! Nossa equipe analisará sua proposta e entrará em contato.',
      step1: 'Análise da proposta pela equipe de parcerias',
      step2: 'Contato para agendar call técnica (se aprovado)',
      step3: 'Acesso à documentação e sandbox de desenvolvimento',
    },
    servicePartner: {
      title: 'Formulário concluído',
      subtitle: 'Agency Partner',
      message:
        'Confira seu e-mail, preparamos boas-vindas e uma trilha com materiais valiosos para você escalar conosco.',
      step1: 'Acesso ao portal de parceiros e recursos exclusivos',
      step2: 'Análise do perfil e portfólio pela equipe',
      step3: 'Confira a trilha de materiais no seu e-mail para escalar conosco',
    },
    affiliate: {
      title: 'Formulário concluído',
      subtitle: 'Afiliado',
      message:
        'Parabéns! Seu cadastro foi aprovado automaticamente. Você receberá um WhatsApp com seu link de afiliado e instruções para começar.',
      step1: 'Acesso imediato ao painel de afiliados',
      step2: 'Link de indicação personalizado',
      step3: 'Materiais de marketing e banners',
    },
    default: {
      title: 'Cadastro concluído!',
      message:
        'Obrigado por completar sua qualificação. Entraremos em contato em breve.',
    },
  },

  partnerType: {
    title: 'O que você quer fazer com a Nuvemshop?',
    subtitle: 'Escolha a opção que melhor descreve seu objetivo',
    techPartner: {
      label: 'Desenvolver apps e integrações',
      description:
        'Ideal para ERPs, empresas SaaS que querem integrar sua solução na Nuvemshop e para desenvolvedores que querem criar aplicativos e funcionalidades exclusivas na plataforma',
    },
    servicePartner: {
      label: 'Criar lojas virtuais para meus clientes',
      description:
        'Ideal para agências, freelancers e profissionais que prestam o serviço de criação e migração de lojas virtuais',
    },
    affiliate: {
      label: 'Indicar e ganhar comissões',
      description:
        'Ideal para influencers, criadores de conteúdo e marketeiros que querem indicar a Nuvemshop para seus clientes',
    },
    merchant: {
      label: 'Criar minha loja virtual',
      description: 'Quer vender online? Crie sua loja Nuvemshop aqui',
    },
  },

  companyInfo: {
    titleAffiliate: 'Seu perfil',
    titleCompany: 'Sua empresa',
    subtitleAffiliate: 'Informações sobre você e sua presença online',
    subtitleCompany: 'Informações da sua empresa ou negócio',
    companyName: 'Nome da empresa',
    companyNamePlaceholder: 'Nome da sua empresa',
    websiteAffiliate: 'Seu site ou perfil',
    website: 'Website',
    audienceSizeLabel: 'Tamanho da audiência',
    selectAudienceSize: 'Selecione o tamanho da sua audiência',
    audienceSizes: {
      under_1k: 'Menos de 1.000',
      '1k_10k': '1.000 - 10.000',
      '10k_100k': '10.000 - 100.000',
      more_than_100k: 'Mais de 100.000',
    },
    countryLabel: 'País',
    selectCountry: 'Selecione o país',
    countries: {
      brasil: 'Brasil',
      argentina: 'Argentina',
      mexico: 'México',
      colombia: 'Colômbia',
      chile: 'Chile',
      other: 'Outro',
    },
  },

  techPartner: {
    title: 'Detalhes técnicos',
    subtitle: 'Conte-nos sobre sua solução',
    solutionTypeLabel: 'Tipo de solução',
    selectType: 'Selecione o tipo',
    solutionTypes: {
      app: 'Aplicativo',
      theme: 'Tema',
      integration: 'Integração',
      erp_crm: 'ERP/CRM',
    },
    technologiesLabel: 'Tecnologias',
    describeLabel: 'Descreva sua solução',
    describePlaceholder:
      'O que você pretende desenvolver e como ajudará os lojistas?',
  },

  servicePartner: {
    title: 'Seus serviços',
    subtitle: 'Conte-nos sobre os serviços que você oferece',
    serviceTypeLabel: 'Tipo de prestador',
    selectType: 'Selecione o tipo',
    serviceTypes: {
      agency: 'Agência',
      freelancer: 'Freelancer',
      consultant: 'Consultor',
      developer: 'Desenvolvedor',
      traffic_manager: 'Gestor de tráfego',
    },
    storeFrequencyLabel: 'Já implanta loja virtual na sua agência?',
    storeFrequencyOptions: {
      monthly: 'Sim, já crio todos os meses',
      bimonthly: 'Sim, em média a cada dois meses ou mais',
      interested: 'Ainda não, mas temos interesse',
      other: 'Não, atuamos em outro segmento',
    },
    employeeCountLabel: 'Quantidade de colaboradores',
    employeeOptions: {
      solo: 'Trabalho sozinho',
      '2_5': '2-5 pessoas',
      '6_10': '6-10 pessoas',
      '11_50': '11-50 pessoas',
      '50_plus': '50+ pessoas',
    },
    servicesLabel: 'Serviços oferecidos',
    services: {
      store_creation: 'Criação de lojas',
      design_ux: 'Design e UX',
      digital_marketing: 'Marketing digital',
      traffic_management: 'Gestão de tráfego',
      seo_content: 'SEO e conteúdo',
      development: 'Desenvolvimento',
      consulting: 'Consultoria',
      support: 'Suporte',
      migration: 'Migração',
    },
    siteOrInstagramLabel: 'Site ou Instagram',
    siteOrInstagramPlaceholder: 'https://seusite.com ou @seu_instagram',
    clientsVolumeLabel: 'Quantas lojas você cria por mês?',
    clientsVolumeOptions: {
      none: 'Nenhuma no momento',
      '1_5': '1 a 5 lojas por mês',
      '6_20': '6 a 20 lojas por mês',
      '21_50': '21 a 50 lojas por mês',
      '50_plus': 'Mais de 50 lojas por mês',
    },
    nuvemshopExperienceLabel: 'Experiência com a Nuvemshop',
    experienceOptions: {
      none: 'Nenhuma',
      basic: 'Básica',
      intermediate: 'Intermediária',
      advanced: 'Avançada',
    },
  },

  affiliate: {
    title: 'Qualificação de Afiliado',
    subtitle: 'Conte-nos sobre você e sua audiência',
    contentPlatformsLabel:
      'Quais as suas principais plataformas de conteúdo? (até 3)',
    platformOptions: {
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      blog: 'Blog / Website',
      podcast: 'Podcast',
      linkedin: 'LinkedIn',
      other: 'Outra',
    },
    readyToReferLabel:
      'Você já tem algum cliente ou indicação em mente?',
    readyToReferOptions: {
      yes: 'Sim, já tenho para quem indicar',
      no: 'Não, estou estruturando meu canal',
    },
    monetizationLabel:
      'Como você monetiza hoje? (selecione todas que se aplicam)',
    monetizationOptions: {
      consultoria: 'Consultoria',
      cursos: 'Venda de cursos (produtos digitais)',
      mentorias: 'Mentorias',
      publicidade: 'Publicidade/conteúdo',
      afiliado: 'Afiliado',
      nao_monetizo: 'Ainda não monetizo',
    },
    authorityLabel:
      'Fez formação, taller ou mentoria paga nos últimos 6 meses?',
    authorityOptions: {
      cursos_recorrentes: 'Sim, dou cursos/mentorias grupais recorrentes',
      eventos_pontuais: 'Sim, fiz eventos ou talleres pontuais',
      tutoriais_gratuitos:
        'Não, mas compartilho tutoriais educativos gratuitos',
      informativo: 'Não, meu conteúdo é informativo ou entretenimento',
    },
    communityTypeLabel: 'Tem comunidades fechadas com empreendedores?',
    communityOptions: {
      whatsapp_telegram: 'Grupo WhatsApp/Telegram ativo',
      newsletter: 'Newsletter com alta taxa de abertura',
      grupo_privado: 'Grupo privado de alunos (Facebook/Discord)',
      redes_sociais:
        'Não, só me comunico por posts/stories em redes sociais',
    },
    ecommerceExperienceLabel:
      'Qual é sua experiência prévia com plataformas de E-commerce?',
    ecommerceOptions: {
      usuario_nuvemshop: 'Já sou usuário da Nuvemshop (tenho minha loja)',
      criei_lojas_nuvemshop: 'Já criei lojas para clientes na Nuvemshop',
      criei_lojas_outras: 'Já criei lojas em outras plataformas',
      ensino_sem_loja:
        'Ensino outros a criar negócio online mas não tenho loja',
      sem_experiencia:
        'Sem experiência técnica, mas audiência pede conselhos',
    },
    audienceNicheLabel: 'Qual o principal nicho da sua audiência?',
    nicheOptions: {
      ecommerce: 'E-commerce',
      empreendedorismo: 'Empreendedorismo e Finanças',
      marketing: 'Marketing',
      tecnologia: 'Tecnologia',
      marketplace: 'Marketplace',
      dropshipping: 'Dropshipping',
      lifestyle: 'Lifestyle',
      outro: 'Outro',
    },
    expectationsLabel: 'O que busca se juntando ao Programa?',
    expectationOptions: {
      commissions: 'Comissões',
      exclusive_support: 'Suporte exclusivo',
      training_materials: 'Materiais de capacitação',
      authority_partner: 'Maior autoridade como partner Nuvemshop',
    },
    highPotentialTitle: 'Afiliado de Alto Potencial',
    highPotentialMessage:
      'Com sua autoridade e comunidade, você pode se qualificar para benefícios exclusivos!',
  },

  confirmation: {
    title: 'Revisão',
    subtitle: 'Confirme as informações antes de enviar',
    partnerTypeLabel: 'Tipo de Parceria',
    companyLabel: 'Empresa',
    countryLabel: 'País',
    websiteLabel: 'Website',
    solutionTypeLabel: 'Tipo de Solução',
    technologiesLabel: 'Tecnologias',
    descriptionLabel: 'Descrição',
    serviceTypeLabel: 'Tipo de Prestador',
    storeFrequencyLabel: 'Implanta Lojas?',
    employeesLabel: 'Colaboradores',
    servicesLabel: 'Serviços',
    siteInstagramLabel: 'Site / Instagram',
    storeVolumeLabel: 'Volume de Lojas',
    nuvemshopExpLabel: 'Experiência Nuvemshop',
    platformsLabel: 'Plataformas',
    readyToReferLabel: 'Pronto para Indicar',
    monetizationLabel: 'Monetização',
    authorityLabel: 'Autoridade',
    communityLabel: 'Comunidade',
    ecommerceExpLabel: 'Experiência E-commerce',
    nicheLabel: 'Nicho',
    expectationsLabel: 'Expectativas',
    partnerTypes: {
      tech_partner: 'Tech Partner',
      service_partner: 'Agency Partner',
      affiliate: 'Afiliado',
    },
    storeFreqValues: {
      monthly: 'Sim, todos os meses',
      bimonthly: 'A cada dois meses ou mais',
      interested: 'Ainda não, mas tem interesse',
      other: 'Outro segmento',
    },
    volumeValues: {
      none: 'Nenhuma no momento',
      '1_5': '1 a 5 lojas',
      '6_20': '6 a 20 lojas',
      '21_50': '21 a 50 lojas',
      '50_plus': 'Mais de 50 lojas',
    },
    experienceValues: {
      none: 'Nenhuma',
      basic: 'Básica',
      intermediate: 'Intermediária',
      advanced: 'Avançada',
    },
    yes: 'Sim',
    no: 'Não',
    submitAlertTitle: 'Ao enviar sua candidatura',
    submitAlertAffiliate:
      'Afiliados são aprovados automaticamente. Você receberá seu link de indicação no seu painel.',
    submitAlertDefault:
      'Nossa equipe analisará sua candidatura e entrará em contato em até 5 dias úteis.',
  },
};

// ── Spanish (LATAM) ──────────────────────────────────────────────────

const es: typeof ptBR = {
  common: {
    partnerProgram: 'Programa de Socios',
    continue: 'Continuar',
    back: 'Volver',
    submit: 'Enviar postulación',
    submitting: 'Enviando...',
    termsOfUse: 'Términos de Uso',
    privacyPolicy: 'Política de Privacidad',
    accessPartnerPortal: 'Acceder al Partner Portal',
    other: 'Otro',
    termsUrl: 'https://www.tiendanube.com/terminos-de-uso',
    privacyUrl: 'https://www.tiendanube.com/politica-de-privacidad',
    merchantRedirectUrl: 'https://www.tiendanube.com/crear-tienda-online',
    partnerPortalUrl: 'https://partners.nuvemshop.com.br/home',
  },

  steps: {
    objective: 'Objetivo',
    profile: 'Perfil',
    qualification: 'Calificación',
    review: 'Revisión',
  },

  validation: {
    selectPartnerType: 'Selecciona un tipo de asociación',
    companyNameRequired: 'El nombre de la empresa es obligatorio',
    selectAudienceSize: 'Selecciona el tamaño de tu audiencia',
    countryRequired: 'El país es obligatorio',
    selectSolutionType: 'Selecciona el tipo de solución',
    selectAtLeastOneTech: 'Selecciona al menos una tecnología',
    selectServiceType: 'Selecciona el tipo de prestador',
    selectStoreFrequency:
      'Selecciona la frecuencia de creación de tiendas',
    selectEmployeeCount: 'Selecciona la cantidad de colaboradores',
    selectAtLeastOneService: 'Selecciona al menos un servicio',
    selectClientsVolume: 'Selecciona el volumen de tiendas',
    selectExperience: 'Selecciona tu experiencia',
    selectAtLeastOnePlatform: 'Selecciona al menos una plataforma',
    selectAnOption: 'Selecciona una opción',
    selectAtLeastOneMonetization:
      'Selecciona al menos una forma de monetización',
    selectCommunityType: 'Selecciona el tipo de comunidad',
    selectEcommerceExperience: 'Selecciona tu experiencia',
    selectAudienceNiche: 'Selecciona el nicho de tu audiencia',
    selectAtLeastOneExpectation: 'Selecciona al menos una expectativa',
  },

  success: {
    nextStepsTitle: 'Próximos pasos',
    techPartner: {
      title: 'Formulario completado',
      subtitle: 'Tech Partner',
      message:
        '¡Gracias por tu interés en convertirte en socio de Nuvemshop! Nuestro equipo analizará tu propuesta y se pondrá en contacto.',
      step1: 'Análisis de la propuesta por el equipo de alianzas',
      step2: 'Contacto para agendar llamada técnica (si es aprobado)',
      step3: 'Acceso a la documentación y sandbox de desarrollo',
    },
    servicePartner: {
      title: 'Formulario completado',
      subtitle: 'Agency Partner',
      message:
        'Revisa tu e-mail, preparamos una bienvenida y una ruta con materiales valiosos para que escales con nosotros.',
      step1: 'Acceso al portal de socios y recursos exclusivos',
      step2: 'Análisis del perfil y portafolio por el equipo',
      step3: 'Revisa la ruta de materiales en tu e-mail para escalar con nosotros',
    },
    affiliate: {
      title: 'Formulario completado',
      subtitle: 'Afiliado',
      message:
        '¡Felicidades! Tu registro fue aprobado automáticamente. Recibirás un WhatsApp con tu enlace de afiliado e instrucciones para comenzar.',
      step1: 'Acceso inmediato al panel de afiliados',
      step2: 'Enlace de referido personalizado',
      step3: 'Materiales de marketing y banners',
    },
    default: {
      title: '¡Registro completado!',
      message:
        'Gracias por completar tu calificación. Nos pondremos en contacto pronto.',
    },
  },

  partnerType: {
    title: '¿Qué quieres hacer con Nuvemshop?',
    subtitle: 'Elige la opción que mejor describe tu objetivo',
    techPartner: {
      label: 'Desarrollar apps e integraciones',
      description:
        'Ideal para ERPs, empresas SaaS que quieren integrar su solución en Nuvemshop y para desarrolladores que quieren crear aplicaciones y funcionalidades exclusivas en la plataforma',
    },
    servicePartner: {
      label: 'Crear tiendas virtuales para mis clientes',
      description:
        'Ideal para agencias, freelancers y profesionales que prestan el servicio de creación y migración de tiendas virtuales',
    },
    affiliate: {
      label: 'Recomendar y ganar comisiones',
      description:
        'Ideal para influencers, creadores de contenido y marketeros que quieren recomendar Nuvemshop a sus clientes',
    },
    merchant: {
      label: 'Crear mi tienda virtual',
      description: '¿Quieres vender online? Crea tu tienda Nuvemshop aquí',
    },
  },

  companyInfo: {
    titleAffiliate: 'Tu perfil',
    titleCompany: 'Tu empresa',
    subtitleAffiliate: 'Información sobre ti y tu presencia en línea',
    subtitleCompany: 'Información de tu empresa o negocio',
    companyName: 'Nombre de la empresa',
    companyNamePlaceholder: 'Nombre de tu empresa',
    websiteAffiliate: 'Tu sitio o perfil',
    website: 'Sitio web',
    audienceSizeLabel: 'Tamaño de la audiencia',
    selectAudienceSize: 'Selecciona el tamaño de tu audiencia',
    audienceSizes: {
      under_1k: 'Menos de 1.000',
      '1k_10k': '1.000 - 10.000',
      '10k_100k': '10.000 - 100.000',
      more_than_100k: 'Más de 100.000',
    },
    countryLabel: 'País',
    selectCountry: 'Selecciona el país',
    countries: {
      brasil: 'Brasil',
      argentina: 'Argentina',
      mexico: 'México',
      colombia: 'Colombia',
      chile: 'Chile',
      other: 'Otro',
    },
  },

  techPartner: {
    title: 'Detalles técnicos',
    subtitle: 'Cuéntanos sobre tu solución',
    solutionTypeLabel: 'Tipo de solución',
    selectType: 'Selecciona el tipo',
    solutionTypes: {
      app: 'Aplicación',
      theme: 'Tema',
      integration: 'Integración',
      erp_crm: 'ERP/CRM',
    },
    technologiesLabel: 'Tecnologías',
    describeLabel: 'Describe tu solución',
    describePlaceholder:
      '¿Qué pretendes desarrollar y cómo ayudará a los comerciantes?',
  },

  servicePartner: {
    title: 'Tus servicios',
    subtitle: 'Cuéntanos sobre los servicios que ofreces',
    serviceTypeLabel: 'Tipo de prestador',
    selectType: 'Selecciona el tipo',
    serviceTypes: {
      agency: 'Agencia',
      freelancer: 'Freelancer',
      consultant: 'Consultor',
      developer: 'Desarrollador',
      traffic_manager: 'Gestor de tráfico',
    },
    storeFrequencyLabel:
      '¿Ya implementas tiendas virtuales en tu agencia?',
    storeFrequencyOptions: {
      monthly: 'Sí, ya creo todos los meses',
      bimonthly: 'Sí, en promedio cada dos meses o más',
      interested: 'Todavía no, pero tenemos interés',
      other: 'No, actuamos en otro segmento',
    },
    employeeCountLabel: 'Cantidad de colaboradores',
    employeeOptions: {
      solo: 'Trabajo solo',
      '2_5': '2-5 personas',
      '6_10': '6-10 personas',
      '11_50': '11-50 personas',
      '50_plus': '50+ personas',
    },
    servicesLabel: 'Servicios ofrecidos',
    services: {
      store_creation: 'Creación de tiendas',
      design_ux: 'Diseño y UX',
      digital_marketing: 'Marketing digital',
      traffic_management: 'Gestión de tráfico',
      seo_content: 'SEO y contenido',
      development: 'Desarrollo',
      consulting: 'Consultoría',
      support: 'Soporte',
      migration: 'Migración',
    },
    siteOrInstagramLabel: 'Sitio o Instagram',
    siteOrInstagramPlaceholder: 'https://tusitio.com o @tu_instagram',
    clientsVolumeLabel: '¿Cuántas tiendas creas por mes?',
    clientsVolumeOptions: {
      none: 'Ninguna en este momento',
      '1_5': '1 a 5 tiendas por mes',
      '6_20': '6 a 20 tiendas por mes',
      '21_50': '21 a 50 tiendas por mes',
      '50_plus': 'Más de 50 tiendas por mes',
    },
    nuvemshopExperienceLabel: 'Experiencia con Nuvemshop',
    experienceOptions: {
      none: 'Ninguna',
      basic: 'Básica',
      intermediate: 'Intermedia',
      advanced: 'Avanzada',
    },
  },

  affiliate: {
    title: 'Calificación de Afiliado',
    subtitle: 'Cuéntanos sobre ti y tu audiencia',
    contentPlatformsLabel:
      '¿Cuáles son tus principales plataformas de contenido? (hasta 3)',
    platformOptions: {
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      blog: 'Blog / Sitio web',
      podcast: 'Podcast',
      linkedin: 'LinkedIn',
      other: 'Otra',
    },
    readyToReferLabel:
      '¿Ya tienes algún cliente o referido en mente?',
    readyToReferOptions: {
      yes: 'Sí, ya tengo a quién recomendar',
      no: 'No, estoy estructurando mi canal',
    },
    monetizationLabel:
      '¿Cómo monetizas hoy? (selecciona todas las que apliquen)',
    monetizationOptions: {
      consultoria: 'Consultoría',
      cursos: 'Venta de cursos (productos digitales)',
      mentorias: 'Mentorías',
      publicidade: 'Publicidad/contenido',
      afiliado: 'Afiliado',
      nao_monetizo: 'Todavía no monetizo',
    },
    authorityLabel:
      '¿Hiciste formación, taller o mentoría paga en los últimos 6 meses?',
    authorityOptions: {
      cursos_recorrentes:
        'Sí, doy cursos/mentorías grupales recurrentes',
      eventos_pontuais: 'Sí, hice eventos o talleres puntuales',
      tutoriais_gratuitos:
        'No, pero comparto tutoriales educativos gratuitos',
      informativo: 'No, mi contenido es informativo o de entretenimiento',
    },
    communityTypeLabel:
      '¿Tienes comunidades cerradas con emprendedores?',
    communityOptions: {
      whatsapp_telegram: 'Grupo WhatsApp/Telegram activo',
      newsletter: 'Newsletter con alta tasa de apertura',
      grupo_privado: 'Grupo privado de alumnos (Facebook/Discord)',
      redes_sociais:
        'No, solo me comunico por posts/stories en redes sociales',
    },
    ecommerceExperienceLabel:
      '¿Cuál es tu experiencia previa con plataformas de E-commerce?',
    ecommerceOptions: {
      usuario_nuvemshop:
        'Ya soy usuario de Nuvemshop (tengo mi tienda)',
      criei_lojas_nuvemshop:
        'Ya creé tiendas para clientes en Nuvemshop',
      criei_lojas_outras: 'Ya creé tiendas en otras plataformas',
      ensino_sem_loja:
        'Enseño a otros a crear negocios online pero no tengo tienda',
      sem_experiencia:
        'Sin experiencia técnica, pero mi audiencia pide consejos',
    },
    audienceNicheLabel: '¿Cuál es el principal nicho de tu audiencia?',
    nicheOptions: {
      ecommerce: 'E-commerce',
      empreendedorismo: 'Emprendimiento y Finanzas',
      marketing: 'Marketing',
      tecnologia: 'Tecnología',
      marketplace: 'Marketplace',
      dropshipping: 'Dropshipping',
      lifestyle: 'Lifestyle',
      outro: 'Otro',
    },
    expectationsLabel: '¿Qué buscas al unirte al Programa?',
    expectationOptions: {
      commissions: 'Comisiones',
      exclusive_support: 'Soporte exclusivo',
      training_materials: 'Materiales de capacitación',
      authority_partner: 'Mayor autoridad como partner Nuvemshop',
    },
    highPotentialTitle: 'Afiliado de Alto Potencial',
    highPotentialMessage:
      '¡Con tu autoridad y comunidad, puedes calificar para beneficios exclusivos!',
  },

  confirmation: {
    title: 'Revisión',
    subtitle: 'Confirma la información antes de enviar',
    partnerTypeLabel: 'Tipo de Asociación',
    companyLabel: 'Empresa',
    countryLabel: 'País',
    websiteLabel: 'Sitio web',
    solutionTypeLabel: 'Tipo de Solución',
    technologiesLabel: 'Tecnologías',
    descriptionLabel: 'Descripción',
    serviceTypeLabel: 'Tipo de Prestador',
    storeFrequencyLabel: '¿Implementa Tiendas?',
    employeesLabel: 'Colaboradores',
    servicesLabel: 'Servicios',
    siteInstagramLabel: 'Sitio / Instagram',
    storeVolumeLabel: 'Volumen de Tiendas',
    nuvemshopExpLabel: 'Experiencia Nuvemshop',
    platformsLabel: 'Plataformas',
    readyToReferLabel: 'Listo para Recomendar',
    monetizationLabel: 'Monetización',
    authorityLabel: 'Autoridad',
    communityLabel: 'Comunidad',
    ecommerceExpLabel: 'Experiencia E-commerce',
    nicheLabel: 'Nicho',
    expectationsLabel: 'Expectativas',
    partnerTypes: {
      tech_partner: 'Tech Partner',
      service_partner: 'Agency Partner',
      affiliate: 'Afiliado',
    },
    storeFreqValues: {
      monthly: 'Sí, todos los meses',
      bimonthly: 'Cada dos meses o más',
      interested: 'Todavía no, pero tiene interés',
      other: 'Otro segmento',
    },
    volumeValues: {
      none: 'Ninguna en este momento',
      '1_5': '1 a 5 tiendas',
      '6_20': '6 a 20 tiendas',
      '21_50': '21 a 50 tiendas',
      '50_plus': 'Más de 50 tiendas',
    },
    experienceValues: {
      none: 'Ninguna',
      basic: 'Básica',
      intermediate: 'Intermedia',
      advanced: 'Avanzada',
    },
    yes: 'Sí',
    no: 'No',
    submitAlertTitle: 'Al enviar tu postulación',
    submitAlertAffiliate:
      'Los afiliados son aprobados automáticamente. Recibirás tu enlace de referido en tu panel.',
    submitAlertDefault:
      'Nuestro equipo analizará tu postulación y se pondrá en contacto en hasta 5 días hábiles.',
  },
};

// Wire up the translations object
translations['pt-BR'] = ptBR;
translations['es'] = es;
