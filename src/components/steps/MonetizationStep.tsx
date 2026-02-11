'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import type { MonetizationType, CheckboxOption, StepProps } from '@/types/qualification';

interface MonetizationStepProps extends StepProps {
  value: MonetizationType[];
  onChange: (value: MonetizationType[]) => void;
}

const monetizationOptions: CheckboxOption<MonetizationType>[] = [
  {
    value: 'consulting',
    label: 'Consultoria',
    description: 'Ofereço serviços de consultoria para empresas ou empreendedores',
  },
  {
    value: 'courses',
    label: 'Venda de cursos (produtos digitais)',
    description: 'Crio e vendo cursos, e-books ou outros infoprodutos',
  },
  {
    value: 'mentoring',
    label: 'Mentorias',
    description: 'Ofereço mentorias individuais ou em grupo',
  },
  {
    value: 'advertising',
    label: 'Publicidade/conteúdo',
    description: 'Ganho com publicidade, patrocínios ou parcerias de conteúdo',
  },
  {
    value: 'affiliate',
    label: 'Afiliado',
    description: 'Indico produtos/serviços e ganho comissões',
  },
  {
    value: 'not_monetizing',
    label: 'Ainda não monetizo',
    description: 'Estou construindo minha audiência antes de monetizar',
  },
];

export function MonetizationStep({
  value,
  onChange,
  onNext,
  onBack,
}: MonetizationStepProps) {
  const handleChange = (selected: MonetizationType[]) => {
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
          Como você monetiza hoje?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione todas as opções que se aplicam a você
        </p>
      </div>

      {/* Options */}
      <CheckboxGroup<MonetizationType>
        name="monetization"
        options={monetizationOptions}
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

export default MonetizationStep;
