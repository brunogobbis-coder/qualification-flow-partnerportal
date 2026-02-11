'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { NuvemshopExperienceLevel, RadioOption, StepProps } from '@/types/qualification';

interface NuvemshopExperienceStepProps extends StepProps {
  value?: NuvemshopExperienceLevel;
  onChange: (value: NuvemshopExperienceLevel) => void;
}

const nuvemshopExperienceOptions: RadioOption<NuvemshopExperienceLevel>[] = [
  {
    value: 'active_stores',
    label: 'Tenho lojas ativas na Nuvemshop',
    description: 'Gerencio ou possuo lojas funcionando na plataforma',
  },
  {
    value: 'created_for_clients',
    label: 'Já criei lojas para clientes na Nuvemshop',
    description: 'Tenho experiência implementando projetos na plataforma',
  },
  {
    value: 'familiar',
    label: 'Conheço a plataforma, mas ainda não criei lojas',
    description: 'Já explorei a Nuvemshop mas não tenho projetos ativos',
  },
  {
    value: 'no_experience',
    label: 'Não tenho experiência com Nuvemshop',
    description: 'É meu primeiro contato com a plataforma',
  },
];

export function NuvemshopExperienceStep({
  value,
  onChange,
  onNext,
  onBack,
}: NuvemshopExperienceStepProps) {
  const handleSelect = (selected: NuvemshopExperienceLevel) => {
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
          Qual é a sua experiência com Nuvemshop?
        </h2>
        <p className="mt-2 text-gray-600">
          Queremos entender seu nível de familiaridade com nossa plataforma
        </p>
      </div>

      {/* Options */}
      <RadioGroup<NuvemshopExperienceLevel>
        name="nuvemshopExperience"
        options={nuvemshopExperienceOptions}
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

export default NuvemshopExperienceStep;
