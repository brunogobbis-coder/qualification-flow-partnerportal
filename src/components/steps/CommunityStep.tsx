'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { CommunityType, RadioOption, StepProps } from '@/types/qualification';

interface CommunityStepProps extends StepProps {
  value?: CommunityType;
  onChange: (value: CommunityType) => void;
}

const communityOptions: RadioOption<CommunityType>[] = [
  {
    value: 'whatsapp_telegram',
    label: 'Grupo de WhatsApp / Telegram ativo',
    description: 'Tenho um grupo onde interajo regularmente com empreendedores',
  },
  {
    value: 'newsletter',
    label: 'Newsletter com alta taxa de abertura',
    description: 'Mantenho uma lista de e-mails engajada',
  },
  {
    value: 'private_group',
    label: 'Grupo privado de alunos (Facebook/Discord)',
    description: 'Tenho uma comunidade fechada em plataformas como Facebook ou Discord',
  },
  {
    value: 'social_posts_only',
    label: 'Não, só me comunico através de posts/stories nas redes sociais',
    description: 'Minha comunicação é aberta, sem grupos ou comunidades fechadas',
  },
];

export function CommunityStep({
  value,
  onChange,
  onNext,
  onBack,
}: CommunityStepProps) {
  const handleSelect = (selected: CommunityType) => {
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
          Tem comunidades fechadas com empreendedores?
        </h2>
        <p className="mt-2 text-gray-600">
          Como você se comunica com sua audiência de empreendedores?
        </p>
      </div>

      {/* Options */}
      <RadioGroup<CommunityType>
        name="communityType"
        options={communityOptions}
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

export default CommunityStep;
