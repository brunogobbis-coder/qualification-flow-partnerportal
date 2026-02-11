'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { SolutionType, RadioOption, StepProps } from '@/types/qualification';

interface TechSolutionTypeStepProps extends StepProps {
  value?: SolutionType;
  onChange: (value: SolutionType) => void;
}

const solutionTypeOptions: RadioOption<SolutionType>[] = [
  {
    value: 'app',
    label: 'Aplicativo',
    description: 'App para a loja de aplicativos Nuvemshop que adiciona funcionalidades aos lojistas',
  },
  {
    value: 'theme',
    label: 'Tema / Template',
    description: 'Template de design para lojas virtuais na plataforma',
  },
  {
    value: 'integration',
    label: 'Integração / Conector',
    description: 'Conexão entre Nuvemshop e outras plataformas ou serviços',
  },
  {
    value: 'erp_crm',
    label: 'Integração ERP/CRM',
    description: 'Integração com sistemas de gestão empresarial ou CRM',
  },
];

export function TechSolutionTypeStep({
  value,
  onChange,
  onNext,
  onBack,
}: TechSolutionTypeStepProps) {
  const handleSelect = (selected: SolutionType) => {
    onChange(selected);
  };

  const canProceed = Boolean(value);

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
          O que você quer desenvolver?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione o tipo de solução que você planeja criar para o ecossistema Nuvemshop
        </p>
      </div>

      {/* Options */}
      <RadioGroup<SolutionType>
        name="solutionType"
        options={solutionTypeOptions}
        value={value}
        onChange={handleSelect}
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

export default TechSolutionTypeStep;
