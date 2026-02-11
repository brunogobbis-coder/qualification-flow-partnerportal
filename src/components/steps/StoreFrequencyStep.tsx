'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { StoreCreationFrequency, RadioOption, StepProps } from '@/types/qualification';

interface StoreFrequencyStepProps extends StepProps {
  value?: StoreCreationFrequency;
  onChange: (value: StoreCreationFrequency) => void;
}

const storeFrequencyOptions: RadioOption<StoreCreationFrequency>[] = [
  {
    value: 'monthly',
    label: 'Sim, já crio todos os meses',
    description: 'Criação recorrente de lojas virtuais para clientes',
  },
  {
    value: 'bimonthly_or_more',
    label: 'Sim, em média a cada dois meses ou mais',
    description: 'Criação periódica mas não mensal',
  },
  {
    value: 'not_yet_interested',
    label: 'Ainda não, mas temos interesse',
    description: 'Queremos começar a criar lojas virtuais',
  },
  {
    value: 'other_segment',
    label: 'Não, atuamos em outro segmento',
    description: 'Nosso foco principal não é criação de lojas',
  },
];

export function StoreFrequencyStep({
  value,
  onChange,
  onNext,
  onBack,
}: StoreFrequencyStepProps) {
  const handleSelect = (selected: StoreCreationFrequency) => {
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
          Já implanta loja virtual na sua agência?
        </h2>
        <p className="mt-2 text-gray-600">
          Queremos entender sua frequência de criação de lojas virtuais
        </p>
      </div>

      {/* Options */}
      <RadioGroup<StoreCreationFrequency>
        name="storeFrequency"
        options={storeFrequencyOptions}
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

export default StoreFrequencyStep;
