'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { ClientsVolume, RadioOption, StepProps } from '@/types/qualification';

interface ClientsVolumeStepProps extends StepProps {
  value?: ClientsVolume;
  onChange: (value: ClientsVolume) => void;
}

const clientsVolumeOptions: RadioOption<ClientsVolume>[] = [
  {
    value: 'none',
    label: 'Nenhuma no momento',
    description: 'Ainda não estou criando lojas regularmente',
  },
  {
    value: '1_5',
    label: '1 a 5 lojas por mês',
    description: 'Crio algumas lojas mensalmente',
  },
  {
    value: '6_20',
    label: '6 a 20 lojas por mês',
    description: 'Tenho um fluxo constante de criação de lojas',
  },
  {
    value: '21_50',
    label: '21 a 50 lojas por mês',
    description: 'Alto volume mensal de criação de lojas',
  },
  {
    value: 'more_than_50',
    label: 'Mais de 50 lojas por mês',
    description: 'Volume muito alto de criação mensal',
  },
];

export function ClientsVolumeStep({
  value,
  onChange,
  onNext,
  onBack,
}: ClientsVolumeStepProps) {
  const handleSelect = (selected: ClientsVolume) => {
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
          Quantas lojas você cria por mês?
        </h2>
        <p className="mt-2 text-gray-600">
          Considere a média mensal de lojas que você cria ou migra
        </p>
      </div>

      {/* Options */}
      <RadioGroup<ClientsVolume>
        name="clientsVolume"
        options={clientsVolumeOptions}
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

export default ClientsVolumeStep;
