'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { EmployeeCount, RadioOption, StepProps } from '@/types/qualification';

interface EmployeeCountStepProps extends StepProps {
  value?: EmployeeCount;
  onChange: (value: EmployeeCount) => void;
}

const employeeCountOptions: RadioOption<EmployeeCount>[] = [
  {
    value: 'solo',
    label: 'Trabalho sozinho',
    description: 'Sou um profissional individual',
  },
  {
    value: '2_5',
    label: '2-5 pessoas',
    description: 'Equipe pequena',
  },
  {
    value: '6_10',
    label: '6-10 pessoas',
    description: 'Equipe em crescimento',
  },
  {
    value: '11_50',
    label: '11-50 pessoas',
    description: 'Empresa de médio porte',
  },
  {
    value: 'more_than_50',
    label: '50+ pessoas',
    description: 'Empresa grande',
  },
];

export function EmployeeCountStep({
  value,
  onChange,
  onNext,
  onBack,
}: EmployeeCountStepProps) {
  const handleSelect = (selected: EmployeeCount) => {
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
          Quantos colaboradores tem sua equipe?
        </h2>
        <p className="mt-2 text-gray-600">
          Quantidade de funcionários/colaboradores na agência ou equipe
        </p>
      </div>

      {/* Options */}
      <RadioGroup<EmployeeCount>
        name="employeeCount"
        options={employeeCountOptions}
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

export default EmployeeCountStep;
