'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { AudienceNiche, RadioOption, StepProps } from '@/types/qualification';

interface AffiliateAudienceStepProps extends StepProps {
  audienceNiche?: AudienceNiche;
  onAudienceNicheChange: (value: AudienceNiche) => void;
}

const audienceNicheOptions: RadioOption<AudienceNiche>[] = [
  { value: 'ecommerce', label: 'E-commerce', description: 'Vendas online e lojas virtuais' },
  { value: 'entrepreneurship', label: 'Empreendedorismo', description: 'Negócios e startups' },
  { value: 'marketing', label: 'Marketing', description: 'Marketing digital e publicidade' },
  { value: 'technology', label: 'Tecnologia', description: 'Tech, software e desenvolvimento' },
  { value: 'lifestyle', label: 'Lifestyle', description: 'Estilo de vida e bem-estar' },
  { value: 'other', label: 'Outro', description: 'Outro nicho de audiência' },
];

export function AffiliateAudienceStep({
  audienceNiche,
  onAudienceNicheChange,
  onNext,
  onBack,
}: AffiliateAudienceStepProps) {
  const canProceed = Boolean(audienceNiche);

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
          Qual o principal nicho da sua audiência?
        </h2>
        <p className="mt-2 text-gray-600">
          Nos conte sobre o nicho do seu público
        </p>
      </div>

      {/* Audience Niche */}
      <RadioGroup<AudienceNiche>
        name="audienceNiche"
        options={audienceNicheOptions}
        value={audienceNiche}
        onChange={onAudienceNicheChange}
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

export default AffiliateAudienceStep;
