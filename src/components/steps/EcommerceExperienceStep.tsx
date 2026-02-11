'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { EcommerceExperience, RadioOption, StepProps } from '@/types/qualification';

interface EcommerceExperienceStepProps extends StepProps {
  value?: EcommerceExperience;
  onChange: (value: EcommerceExperience) => void;
}

const experienceOptions: RadioOption<EcommerceExperience>[] = [
  {
    value: 'nuvemshop_user',
    label: 'Já sou usuário da Nuvemshop (tenho minha própria loja)',
    description: 'Uso a plataforma para meu próprio negócio',
  },
  {
    value: 'nuvemshop_for_clients',
    label: 'Já criei lojas para clientes na Nuvemshop',
    description: 'Tenho experiência implementando lojas para terceiros',
  },
  {
    value: 'other_platforms_for_clients',
    label: 'Já criei lojas para clientes em outras plataformas',
    description: 'Conheço e-commerce, mas em outras plataformas',
  },
  {
    value: 'teaches_without_store',
    label: 'Ensino outros a criar seu negócio online mas não tenho loja própria',
    description: 'Sou educador/mentor na área de negócios digitais',
  },
  {
    value: 'no_technical_experience',
    label: 'Não tenho experiência técnica, mas minha audiência me pede conselhos de venda online',
    description: 'Minha audiência busca orientação sobre vendas online',
  },
];

export function EcommerceExperienceStep({
  value,
  onChange,
  onNext,
  onBack,
}: EcommerceExperienceStepProps) {
  const handleSelect = (selected: EcommerceExperience) => {
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
          Qual é a sua experiência com E-commerce?
        </h2>
        <p className="mt-2 text-gray-600">
          Sua experiência prévia com plataformas de e-commerce
        </p>
      </div>

      {/* Options */}
      <RadioGroup<EcommerceExperience>
        name="ecommerceExperience"
        options={experienceOptions}
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

export default EcommerceExperienceStep;
