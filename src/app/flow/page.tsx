'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Flow step data with options
interface StepData {
  id: number;
  name: string;
  description: string;
  fieldType?: 'radio' | 'checkbox' | 'text' | 'textarea' | 'select';
  options?: string[];
  isDefault?: boolean; // Indica se este step é comum a todos os tipos de parceria
}

const techPartnerSteps: StepData[] = [
  { 
    id: 1, 
    name: 'Objetivo', 
    description: 'Seleção do tipo de parceria',
    fieldType: 'radio',
    options: ['Tech Partner', 'Agency Partner', 'Afiliado'],
    isDefault: true
  },
  { 
    id: 2, 
    name: 'Empresa', 
    description: 'Nome, site, país e tamanho da equipe',
    fieldType: 'select',
    options: ['1-5 pessoas', '6-20 pessoas', '21-50 pessoas', '51-200 pessoas', '200+ pessoas']
  },
  { 
    id: 3, 
    name: 'Tipo de Solução', 
    description: 'Tipo de produto a desenvolver',
    fieldType: 'radio',
    options: ['Aplicativo', 'Tema', 'Integração', 'ERP/CRM']
  },
  { 
    id: 4, 
    name: 'Experiência', 
    description: 'Produtos existentes em outras plataformas',
    fieldType: 'checkbox',
    options: ['Shopify', 'WooCommerce', 'Magento', 'VTEX', 'Outro', 'Nenhum']
  },
  { 
    id: 5, 
    name: 'Descrição', 
    description: 'Detalhes da solução proposta',
    fieldType: 'textarea',
    options: ['Campo livre para descrever a solução']
  },
  { 
    id: 6, 
    name: 'Stack Técnica', 
    description: 'Tecnologias utilizadas',
    fieldType: 'checkbox',
    options: ['React', 'Node.js', 'PHP', 'Python', 'Java', '.NET', 'Ruby', 'Go', 'Outro']
  },
  { 
    id: 7, 
    name: 'WhatsApp', 
    description: 'Contato para comunicação',
    fieldType: 'text',
    options: ['+55 (XX) XXXXX-XXXX']
  },
];

const servicePartnerSteps: StepData[] = [
  { 
    id: 1, 
    name: 'Objetivo', 
    description: 'Seleção do tipo de parceria',
    fieldType: 'radio',
    options: ['Tech Partner', 'Agency Partner', 'Afiliado'],
    isDefault: true
  },
  { 
    id: 2, 
    name: 'Tipo de Prestador', 
    description: 'Como você atua no mercado',
    fieldType: 'radio',
    options: ['Agência', 'Freelancer', 'Consultor', 'Desenvolvedor', 'Gestor de tráfego']
  },
  { 
    id: 3, 
    name: 'Implanta Lojas?', 
    description: 'Já implanta loja virtual na sua agência?',
    fieldType: 'radio',
    options: ['Sim, já crio todos os meses', 'Sim, em média a cada dois meses ou mais', 'Ainda não, mas temos interesse', 'Não, atuamos em outro segmento']
  },
  { 
    id: 4, 
    name: 'Nº de Funcionários', 
    description: 'Quantidade de colaboradores na agência/equipe',
    fieldType: 'radio',
    options: ['Trabalho sozinho', '2-5 pessoas', '6-10 pessoas', '11-50 pessoas', '50+ pessoas']
  },
  { 
    id: 5, 
    name: 'Serviços', 
    description: 'Principal serviço prestado e outros',
    fieldType: 'checkbox',
    options: ['Criação de lojas', 'Design e UX', 'Marketing digital', 'Gestão de tráfego', 'SEO e conteúdo', 'Desenvolvimento', 'Consultoria', 'Suporte', 'Migração']
  },
  { 
    id: 6, 
    name: 'Site ou Instagram', 
    description: 'URL do site ou perfil Instagram',
    fieldType: 'text',
    options: ['https://seusite.com', '@seu_instagram']
  },
  { 
    id: 7, 
    name: 'Volume Mensal de Lojas', 
    description: 'Quantas lojas você cria por mês?',
    fieldType: 'radio',
    options: ['Nenhuma no momento', '1-5 lojas/mês', '6-20 lojas/mês', '21-50 lojas/mês', '50+ lojas/mês']
  },
  { 
    id: 8, 
    name: 'Experiência Nuvemshop', 
    description: 'Familiaridade com a plataforma',
    fieldType: 'radio',
    options: ['Nenhuma', 'Básica', 'Intermediária', 'Avançada']
  },
  { 
    id: 9, 
    name: 'WhatsApp', 
    description: 'Contato para comunicação',
    fieldType: 'text',
    options: ['+55 (XX) XXXXX-XXXX']
  },
];

const affiliateSteps: StepData[] = [
  { 
    id: 1, 
    name: 'Objetivo', 
    description: 'Seleção do tipo de parceria',
    fieldType: 'radio',
    options: ['Tech Partner', 'Agency Partner', 'Afiliado'],
    isDefault: true
  },
  { 
    id: 2, 
    name: 'Plataformas de Conteúdo', 
    description: 'Quais as suas principais plataformas de conteúdo? (múltipla escolha, até 3)',
    fieldType: 'checkbox',
    options: ['YouTube', 'Instagram', 'TikTok', 'Blog / Website', 'Podcast', 'LinkedIn', 'Outra']
  },
  { 
    id: 3, 
    name: 'Site ou Rede Social', 
    description: 'Site ou rede social principal + Tamanho da audiência (droplist)',
    fieldType: 'text',
    options: ['https://seusite.com', '@seu_perfil', 'Tamanho: Menos de 1.000 | 1.000-10.000 | 10.000-100.000 | Mais de 100.000']
  },
  { 
    id: 4, 
    name: 'Pronto para Indicar', 
    description: 'Você já tem algum cliente ou indicação em mente?',
    fieldType: 'radio',
    options: ['Sim, já tenho para quem indicar', 'Não, estou estruturando meu canal']
  },
  { 
    id: 5, 
    name: 'Monetização', 
    description: 'Como você monetiza hoje? (múltipla escolha)',
    fieldType: 'checkbox',
    options: ['Consultoria', 'Venda de cursos (produtos digitais)', 'Mentorias', 'Publicidade/conteúdo', 'Afiliado', 'Ainda não monetizo']
  },
  { 
    id: 6, 
    name: 'Autoridade', 
    description: 'Fez formação, taller ou mentoria paga nos últimos 6 meses?',
    fieldType: 'radio',
    options: ['Sim, dou cursos/mentorias grupais recorrentes', 'Sim, fiz eventos ou talleres pontuais', 'Não, mas compartilho tutoriais educativos gratuitos', 'Não, meu conteúdo é informativo ou entretenimento']
  },
  { 
    id: 7, 
    name: 'Comunidades Fechadas', 
    description: 'Tem comunidades fechadas com empreendedores?',
    fieldType: 'radio',
    options: ['Grupo WhatsApp/Telegram ativo', 'Newsletter com alta taxa de abertura', 'Grupo privado de alunos (Facebook/Discord)', 'Não, só me comunico por posts/stories em redes sociais']
  },
  { 
    id: 8, 
    name: 'Experiência E-commerce', 
    description: 'Qual é sua experiência prévia com plataformas de E-commerce?',
    fieldType: 'radio',
    options: ['Já sou usuário da Nuvemshop (tenho minha própria loja)', 'Já criei lojas para clientes na Nuvemshop', 'Já criei lojas para clientes em outras plataformas', 'Ensino outros a criar negócio online mas não tenho loja própria', 'Não tenho experiência técnica, mas minha audiência pede conselhos de venda online']
  },
  { 
    id: 9, 
    name: 'Nicho da Audiência', 
    description: 'Qual o principal nicho da sua audiência?',
    fieldType: 'radio',
    options: ['E-commerce', 'Empreendedorismo e Finanças', 'Marketing', 'Tecnologia', 'Marketplace', 'Dropshipping', 'Lifestyle', 'Outro']
  },
  { 
    id: 10, 
    name: 'Expectativas', 
    description: 'O que busca se juntando ao Programa?',
    fieldType: 'checkbox',
    options: ['Comissões', 'Suporte exclusivo', 'Materiais de capacitação', 'Maior autoridade com minha comunidade como partner Nuvemshop']
  },
  { 
    id: 11, 
    name: 'WhatsApp', 
    description: 'Contato para comunicação',
    fieldType: 'text',
    options: ['+55 (XX) XXXXX-XXXX']
  },
];

// Collapsible Section Component
function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false,
  color = 'blue'
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  color?: 'purple' | 'blue' | 'green' | 'orange';
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const colorClasses = {
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  };

  return (
    <div className="rounded-xl border-2 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${colorClasses[color]}`}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white border-t">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step Flow Component
function StepFlow({ steps, color }: { steps: StepData[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color} text-white text-sm`}>
            <span className="font-bold">{step.id}</span>
            <span>{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <svg className="w-6 h-6 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// Main Flow Diagram (SVG-based for reliability)
function MainFlowDiagram() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
      <svg viewBox="0 0 700 500" className="w-full min-w-[500px]" style={{ maxHeight: '500px' }}>
        {/* Definitions */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
          </marker>
        </defs>

        {/* 1. Partner Portal */}
        <rect x="275" y="15" width="150" height="44" rx="8" fill="#3B82F6" />
        <text x="350" y="42" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Partner Portal</text>

        {/* Arrow: Portal -> Signup */}
        <line x1="350" y1="59" x2="350" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* 2. Signup */}
        <rect x="290" y="80" width="120" height="40" rx="8" fill="#8B5CF6" />
        <text x="350" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Signup</text>

        {/* Arrow: Signup -> Question */}
        <line x1="350" y1="120" x2="350" y2="148" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* 3. Initial Question */}
        <rect x="250" y="148" width="200" height="44" rx="8" fill="#6366F1" />
        <text x="350" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Qual é seu objetivo?</text>

        {/* Arrows from Question to 3 Tracks */}
        <path d="M 310 192 Q 200 220 120 248" fill="none" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="350" y1="192" x2="350" y2="248" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 390 192 Q 500 220 580 248" fill="none" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* 4. Three Tracks */}
        {/* Tech Partner */}
        <rect x="50" y="248" width="140" height="46" rx="8" fill="#9333EA" />
        <text x="120" y="266" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Tech Partner</text>
        <text x="120" y="282" textAnchor="middle" fill="white" fontSize="10">Apps e integrações</text>

        {/* Agency Partner */}
        <rect x="280" y="248" width="140" height="46" rx="8" fill="#3B82F6" />
        <text x="350" y="266" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Agency Partner</text>
        <text x="350" y="282" textAnchor="middle" fill="white" fontSize="10">Serviços profissionais</text>

        {/* Affiliate */}
        <rect x="510" y="248" width="140" height="46" rx="8" fill="#22C55E" />
        <text x="580" y="266" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Affiliate</text>
        <text x="580" y="282" textAnchor="middle" fill="white" fontSize="10">Indicar e ganhar</text>

        {/* 5. Forms */}
        <line x1="120" y1="294" x2="120" y2="328" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="350" y1="294" x2="350" y2="328" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="580" y1="294" x2="580" y2="328" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

        <rect x="50" y="328" width="140" height="38" rx="6" fill="#A855F7" opacity="0.8" />
        <text x="120" y="351" textAnchor="middle" fill="white" fontSize="11">Tech Form (7 steps)</text>

        <rect x="280" y="328" width="140" height="38" rx="6" fill="#60A5FA" opacity="0.8" />
        <text x="350" y="351" textAnchor="middle" fill="white" fontSize="11">Service Form (9 steps)</text>

        <rect x="510" y="328" width="140" height="38" rx="6" fill="#4ADE80" opacity="0.8" />
        <text x="580" y="351" textAnchor="middle" fill="white" fontSize="11">Affiliate Form (11 steps)</text>

        {/* 6. All forms -> Partner Portal Access */}
        <path d="M 120 366 Q 120 395 260 420" fill="none" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 350 366 Q 350 395 340 420" fill="none" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 580 366 Q 580 395 440 420" fill="none" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Partner Portal Access */}
        <rect x="255" y="420" width="190" height="44" rx="8" fill="#0EA5E9" />
        <text x="350" y="447" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Partner Portal Access</text>

        {/* 7. Partner Program Review (parallel) */}
        <rect x="500" y="405" width="180" height="56" rx="8" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="6 3" />
        <rect x="500" y="405" width="180" height="56" rx="8" fill="#7C3AED" opacity="0.1" />
        <text x="590" y="430" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="600">Partner Program Review</text>
        <text x="590" y="446" textAnchor="middle" fill="#6B7280" fontSize="10">(em paralelo)</text>

        <line x1="445" y1="442" x2="498" y2="433" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrowhead)" />

        {/* Label: dados enviados ao HubSpot */}
        <text x="350" y="488" textAnchor="middle" fill="#6B7280" fontSize="11" fontStyle="italic">dados enviados ao HubSpot</text>
      </svg>
    </div>
  );
}

// Data Model Diagram
function DataModelDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Common Fields */}
      <div className="rounded-lg border-2 border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 font-semibold">QualificationData</div>
        <div className="p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>objective</span><span className="text-gray-500">Objective</span></div>
          <div className="flex justify-between"><span>whatsapp</span><span className="text-gray-500">string</span></div>
          <div className="flex justify-between"><span>email?</span><span className="text-gray-500">string</span></div>
          <div className="flex justify-between"><span>name?</span><span className="text-gray-500">string</span></div>
          <div className="flex justify-between"><span>country?</span><span className="text-gray-500">string</span></div>
          <hr className="my-2" />
          <div className="flex justify-between text-purple-600"><span>techPartnerData?</span><span>TechPartnerData</span></div>
          <div className="flex justify-between text-blue-600"><span>serviceProviderData?</span><span>ServiceProviderData</span></div>
          <div className="flex justify-between text-green-600"><span>affiliateData?</span><span>AffiliateData</span></div>
        </div>
      </div>

      {/* Tech Partner */}
      <div className="rounded-lg border-2 border-purple-300 overflow-hidden">
        <div className="bg-purple-100 px-4 py-2 font-semibold text-purple-800">TechPartnerData</div>
        <div className="p-4 space-y-1 text-sm">
          <div>companyName: string</div>
          <div>websiteUrl: string</div>
          <div>country: string</div>
          <div>companySize: CompanySize</div>
          <div>solutionType: SolutionType</div>
          <div>hasExistingProduct: boolean</div>
          <div>existingPlatforms?: EcommercePlatformExperience[]</div>
          <div>solutionDescription: string</div>
          <div>technologies: Technology[]</div>
          <div>hasApiExperience: boolean</div>
        </div>
      </div>

      {/* Service Provider */}
      <div className="rounded-lg border-2 border-blue-300 overflow-hidden">
        <div className="bg-blue-100 px-4 py-2 font-semibold text-blue-800">ServiceProviderData</div>
        <div className="p-4 space-y-1 text-sm">
          <div>serviceType: ServiceType</div>
          <div>storeCreationFrequency: StoreCreationFrequency</div>
          <div>employeeCount: EmployeeCount</div>
          <div>servicesOffered: ServiceOffered[]</div>
          <div>clientsVolume: ClientsVolume</div>
          <div>nuvemshopExperience: NuvemshopExperienceLevel</div>
          <div>portfolioUrl: string</div>
        </div>
      </div>

      {/* Affiliate */}
      <div className="rounded-lg border-2 border-green-300 overflow-hidden md:col-span-2 lg:col-span-1">
        <div className="bg-green-100 px-4 py-2 font-semibold text-green-800">AffiliateData</div>
        <div className="p-4 space-y-1 text-sm">
          <div>username?: string</div>
          <div>siteUrl: string</div>
          <div>readyToRefer: &apos;yes&apos; | &apos;no&apos;</div>
          <div>monetization: MonetizationType[]</div>
          <div>authorityTraining: AuthorityTrainingLevel</div>
          <div>communityType: CommunityType</div>
          <div>experience: EcommerceExperience</div>
          <div>expectations: ProgramExpectation[]</div>
          <div>contentPlatforms?: ContentPlatform[]</div>
          <div>promotionChannels?: PromotionChannel[]</div>
          <div>audienceSize?: AudienceSize</div>
          <div>audienceNiche?: AudienceNiche</div>
        </div>
      </div>
    </div>
  );
}


export default function FlowPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Partner Qualification Flow</h1>
              <p className="text-gray-600 mt-1">Documentação visual do fluxo de qualificação de parceiros Nuvemshop</p>
            </div>
            <Link 
              href="/" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir para o Flow
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Main Flow Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Visão Geral do Fluxo</h2>
          <MainFlowDiagram />
        </section>

        {/* Track Details */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Detalhes por Trilha</h2>
          <div className="space-y-4">
            <CollapsibleSection title="Tech Partner - Desenvolvedores (7 etapas)" color="purple" defaultOpen>
              <div className="space-y-4">
                <StepFlow steps={techPartnerSteps} color="bg-purple-600" />
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  {techPartnerSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center font-bold">
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-purple-900">{step.name}</div>
                          {step.isDefault && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-700 text-white rounded font-medium">
                              Default para todos
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-purple-700 mb-2">{step.description}</div>
                        {step.isDefault && (
                          <div className="text-xs text-gray-500 italic mb-2">
                            Esta etapa é comum a todas as trilhas de parceria
                          </div>
                        )}
                        {step.options && step.options.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-purple-200">
                            <div className="flex items-center gap-1 text-xs text-purple-600 mb-1">
                              {step.fieldType === 'radio' && <span className="font-medium">● Opções (escolha única):</span>}
                              {step.fieldType === 'checkbox' && <span className="font-medium">☑ Opções (múltipla escolha):</span>}
                              {step.fieldType === 'text' && <span className="font-medium">✎ Campo de texto:</span>}
                              {step.fieldType === 'textarea' && <span className="font-medium">✎ Campo de texto longo:</span>}
                              {step.fieldType === 'select' && <span className="font-medium">▼ Seleção:</span>}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.options.map((option, idx) => (
                                <span 
                                  key={idx} 
                                  className="inline-block px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded border border-purple-200"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Agency Partner - Agências e Freelancers (9 etapas)" color="blue">
              <div className="space-y-4">
                <StepFlow steps={servicePartnerSteps} color="bg-blue-600" />
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  {servicePartnerSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-blue-900">{step.name}</div>
                          {step.isDefault && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-700 text-white rounded font-medium">
                              Default para todos
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-blue-700 mb-2">{step.description}</div>
                        {step.isDefault && (
                          <div className="text-xs text-gray-500 italic mb-2">
                            Esta etapa é comum a todas as trilhas de parceria
                          </div>
                        )}
                        {step.options && step.options.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-blue-200">
                            <div className="flex items-center gap-1 text-xs text-blue-600 mb-1">
                              {step.fieldType === 'radio' && <span className="font-medium">● Opções (escolha única):</span>}
                              {step.fieldType === 'checkbox' && <span className="font-medium">☑ Opções (múltipla escolha):</span>}
                              {step.fieldType === 'text' && <span className="font-medium">✎ Campo de texto:</span>}
                              {step.fieldType === 'textarea' && <span className="font-medium">✎ Campo de texto longo:</span>}
                              {step.fieldType === 'select' && <span className="font-medium">▼ Seleção:</span>}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.options.map((option, idx) => (
                                <span 
                                  key={idx} 
                                  className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded border border-blue-200"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Affiliate - Afiliados e Influenciadores (11 etapas)" color="green">
              <div className="space-y-4">
                <StepFlow steps={affiliateSteps} color="bg-green-600" />
                <div className="grid gap-3 md:grid-cols-2 mt-4">
                  {affiliateSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center font-bold">
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-green-900">{step.name}</div>
                          {step.isDefault && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-700 text-white rounded font-medium">
                              Default para todos
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-green-700 mb-2">{step.description}</div>
                        {step.isDefault && (
                          <div className="text-xs text-gray-500 italic mb-2">
                            Esta etapa é comum a todas as trilhas de parceria
                          </div>
                        )}
                        {step.options && step.options.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                              {step.fieldType === 'radio' && <span className="font-medium">● Opções (escolha única):</span>}
                              {step.fieldType === 'checkbox' && <span className="font-medium">☑ Opções (múltipla escolha):</span>}
                              {step.fieldType === 'text' && <span className="font-medium">✎ Campo de texto:</span>}
                              {step.fieldType === 'textarea' && <span className="font-medium">✎ Campo de texto longo:</span>}
                              {step.fieldType === 'select' && <span className="font-medium">▼ Seleção:</span>}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.options.map((option, idx) => (
                                <span 
                                  key={idx} 
                                  className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded border border-green-200"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

          </div>
        </section>

        {/* Review Process */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Processo de Aprovação</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Manual Review */}
            <div className="rounded-xl border-2 border-purple-200 overflow-hidden">
              <div className="bg-purple-100 px-4 py-3">
                <h3 className="font-semibold text-purple-900">Revisão Manual</h3>
                <p className="text-sm text-purple-700">Tech Partners e Agency Partners</p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Critérios - Tech Partner:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Viabilidade técnica da solução</li>
                    <li>• Capacidades da equipe</li>
                    <li>• Potencial de mercado</li>
                    <li>• Diferenciação de apps existentes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Critérios - Agency Partner:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Experiência relevante</li>
                    <li>• Qualidade do portfólio</li>
                    <li>• Relacionamento com lojistas</li>
                    <li>• Cobertura geográfica</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm"><strong>SLA:</strong> 5-7 dias úteis (Tech) / 3-5 dias úteis (Service)</p>
                </div>
              </div>
            </div>

            {/* Auto Approval */}
            <div className="rounded-xl border-2 border-green-200 overflow-hidden">
              <div className="bg-green-100 px-4 py-3">
                <h3 className="font-semibold text-green-900">Aprovação Automática</h3>
                <p className="text-sm text-green-700">Afiliados</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-green-900">Aprovação Imediata</p>
                    <p className="text-sm text-green-700">Todos os afiliados são aprovados automaticamente</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">High-Potential Flag:</h4>
                  <p className="text-sm text-gray-600">Afiliados com audiência 100K+ recebem:</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Badge VIP no cadastro</li>
                    <li>• Contato prioritário do time</li>
                    <li>• Benefícios exclusivos</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm"><strong>SLA:</strong> Imediato</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Model */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Modelo de Dados</h2>
          <DataModelDiagram />
        </section>


        {/* Quick Links */}
        <section className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Links Rápidos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/" className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <div>
                <p className="font-medium">Testar Flow</p>
                <p className="text-sm text-gray-500">Acesse o formulário</p>
              </div>
            </Link>
            <a href="https://github.com/brunogobbis-coder/qualification-flow-partnerportal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div>
                <p className="font-medium">Código Fonte</p>
                <p className="text-sm text-gray-500">Ver no GitHub</p>
              </div>
            </a>
            <a href="https://docs.google.com/document/d/1q8aNW4S73L3CIKRF6QRonSongQZljP-o/edit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="font-medium">PRD</p>
                <p className="text-sm text-gray-500">Product Requirements Document</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          Partner Qualification Flow - Nuvemshop Ecosystem
        </div>
      </footer>
    </div>
  );
}
