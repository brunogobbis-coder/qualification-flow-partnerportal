'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { ServiceType, RadioOption, StepProps } from '@/types/qualification';

interface ServiceTypeStepProps extends StepProps {
  value?: ServiceType;
  onChange: (value: ServiceType) => void;
}

const serviceTypeOptions: RadioOption<ServiceType>[] = [
  {
    value: 'agency',
    label: 'Agência',
    description: 'Empresa que oferece serviços completos de e-commerce para múltiplos clientes',
  },
  {
    value: 'freelancer',
    label: 'Freelancer',
    description: 'Profissional autônomo que presta serviços de forma independente',
  },
  {
    value: 'consultant',
    label: 'Consultor',
    description: 'Especialista que oferece consultoria estratégica em e-commerce',
  },
  {
    value: 'developer',
    label: 'Desenvolvedor',
    description: 'Profissional focado em desenvolvimento técnico e integrações',
  },
  {
    value: 'traffic_manager',
    label: 'Gestor de tráfego',
    description: 'Especialista em mídia paga e gestão de tráfego para lojas virtuais',
  },
];

export function ServiceTypeStep({
  value,
  onChange,
  onNext,
  onBack,
}: ServiceTypeStepProps) {
  const handleSelect = (selected: ServiceType) => {
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
          Qual tipo de prestador de serviço você é?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione a opção que melhor descreve seu modelo de trabalho
        </p>
      </div>

      {/* Options */}
      <RadioGroup<ServiceType>
        name="serviceType"
        options={serviceTypeOptions}
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

export default ServiceTypeStep;
