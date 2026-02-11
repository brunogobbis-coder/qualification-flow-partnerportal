'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import type { ServiceOffered, CheckboxOption, StepProps } from '@/types/qualification';

interface ServicesOfferedStepProps extends StepProps {
  value: ServiceOffered[];
  onChange: (value: ServiceOffered[]) => void;
}

const servicesOfferedOptions: CheckboxOption<ServiceOffered>[] = [
  {
    value: 'store_creation',
    label: 'Criação e setup de lojas',
    description: 'Configuração e implementação completa de lojas na plataforma',
  },
  {
    value: 'design',
    label: 'Design e UX',
    description: 'Criação de identidade visual, layouts e experiência do usuário',
  },
  {
    value: 'marketing',
    label: 'Marketing e publicidade',
    description: 'Estratégias de marketing, redes sociais e campanhas',
  },
  {
    value: 'traffic_management',
    label: 'Gestão de tráfego',
    description: 'Mídia paga, Google Ads, Meta Ads e otimização de tráfego',
  },
  {
    value: 'seo_content',
    label: 'SEO e conteúdo',
    description: 'Otimização para buscadores e criação de conteúdo',
  },
  {
    value: 'development',
    label: 'Desenvolvimento customizado',
    description: 'Customizações, integrações e desenvolvimento de funcionalidades',
  },
  {
    value: 'consulting',
    label: 'Consultoria e estratégia',
    description: 'Orientação estratégica e mentoria para lojistas',
  },
  {
    value: 'support',
    label: 'Suporte e operações',
    description: 'Atendimento contínuo e gestão operacional de lojas',
  },
  {
    value: 'migration',
    label: 'Migração de plataformas',
    description: 'Migração de lojas de outras plataformas para Nuvemshop',
  },
];

export function ServicesOfferedStep({
  value,
  onChange,
  onNext,
  onBack,
}: ServicesOfferedStepProps) {
  const handleChange = (selected: ServiceOffered[]) => {
    onChange(selected);
  };

  const canProceed = value.length >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      {/* Question Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Quais serviços você oferece?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione todos os serviços que fazem parte do seu portfólio
        </p>
      </div>

      {/* Options */}
      <CheckboxGroup<ServiceOffered>
        name="servicesOffered"
        options={servicesOfferedOptions}
        value={value}
        onChange={handleChange}
        minSelections={1}
      />

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}

export default ServicesOfferedStep;
