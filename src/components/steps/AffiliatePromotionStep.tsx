'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import type { PromotionChannel, CheckboxOption, StepProps } from '@/types/qualification';

interface AffiliatePromotionStepProps extends StepProps {
  value: PromotionChannel[];
  onChange: (value: PromotionChannel[]) => void;
}

const promotionChannelOptions: CheckboxOption<PromotionChannel>[] = [
  {
    value: 'blog',
    label: 'Blog / Marketing de conteúdo',
    description: 'Artigos, reviews e conteúdo escrito',
  },
  {
    value: 'youtube',
    label: 'YouTube / Vídeo',
    description: 'Canal no YouTube ou produção de vídeos',
  },
  {
    value: 'social_media',
    label: 'Redes sociais',
    description: 'Instagram, TikTok, Twitter/X, Facebook, etc.',
  },
  {
    value: 'email_marketing',
    label: 'Email marketing',
    description: 'Newsletter ou listas de email',
  },
  {
    value: 'paid_advertising',
    label: 'Publicidade paga',
    description: 'Anúncios em Google, Meta, etc.',
  },
  {
    value: 'community',
    label: 'Comunidade / Fóruns',
    description: 'Grupos, comunidades online ou fóruns',
  },
  {
    value: 'podcast',
    label: 'Podcast',
    description: 'Produção ou participação em podcasts',
  },
  {
    value: 'other',
    label: 'Outro',
    description: 'Outras formas de promoção',
  },
];

export function AffiliatePromotionStep({
  value,
  onChange,
  onNext,
  onBack,
}: AffiliatePromotionStepProps) {
  const handleChange = (selected: PromotionChannel[]) => {
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
          Como você pretende promover a Nuvemshop?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione todos os canais que você utiliza ou pretende utilizar
        </p>
      </div>

      {/* Options */}
      <CheckboxGroup<PromotionChannel>
        name="promotionChannels"
        options={promotionChannelOptions}
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

export default AffiliatePromotionStep;
