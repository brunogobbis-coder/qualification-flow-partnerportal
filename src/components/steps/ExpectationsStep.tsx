'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import type { ProgramExpectation, CheckboxOption, StepProps } from '@/types/qualification';

interface ExpectationsStepProps extends StepProps {
  value: ProgramExpectation[];
  onChange: (value: ProgramExpectation[]) => void;
}

const expectationOptions: CheckboxOption<ProgramExpectation>[] = [
  {
    value: 'commissions',
    label: 'Comissões',
    description: 'Ganhar dinheiro com cada indicação bem-sucedida',
  },
  {
    value: 'exclusive_support',
    label: 'Suporte exclusivo',
    description: 'Acesso prioritário a canais de atendimento dedicados',
  },
  {
    value: 'training_materials',
    label: 'Materiais de capacitação',
    description: 'Cursos, guias e conteúdos exclusivos para parceiros',
  },
  {
    value: 'authority_partnership',
    label: 'Maior autoridade com sua comunidade como parceiro Nuvemshop',
    description: 'Ser reconhecido oficialmente como parceiro da plataforma',
  },
];

export function ExpectationsStep({
  value,
  onChange,
  onNext,
  onBack,
}: ExpectationsStepProps) {
  const handleChange = (selected: ProgramExpectation[]) => {
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
          O que você busca no Programa?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione todas as opções que se aplicam a você
        </p>
      </div>

      {/* Options */}
      <CheckboxGroup<ProgramExpectation>
        name="expectations"
        options={expectationOptions}
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

export default ExpectationsStep;
