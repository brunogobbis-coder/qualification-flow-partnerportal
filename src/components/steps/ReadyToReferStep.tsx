'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { RadioOption, StepProps } from '@/types/qualification';

type ReadyToReferValue = 'yes' | 'no';

interface ReadyToReferStepProps extends StepProps {
  value?: ReadyToReferValue;
  onChange: (value: ReadyToReferValue) => void;
}

const readyToReferOptions: RadioOption<ReadyToReferValue>[] = [
  {
    value: 'yes',
    label: 'Sim, já tenho para quem indicar',
    description: 'Tenho clientes ou pessoas interessadas prontas para começar',
  },
  {
    value: 'no',
    label: 'Não, estou estruturando meu canal',
    description: 'Ainda estou preparando minha base de contatos e audiência',
  },
];

export function ReadyToReferStep({
  value,
  onChange,
  onNext,
  onBack,
}: ReadyToReferStepProps) {
  const handleSelect = (selected: ReadyToReferValue) => {
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
          Você já tem alguém para indicar?
        </h2>
        <p className="mt-2 text-gray-600">
          Queremos entender se você já tem pessoas prontas para conhecer a plataforma
        </p>
      </div>

      {/* Options */}
      <RadioGroup<ReadyToReferValue>
        name="readyToRefer"
        options={readyToReferOptions}
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

export default ReadyToReferStep;
