'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import type { ContentPlatform, CheckboxOption, StepProps } from '@/types/qualification';

interface ContentPlatformStepProps extends StepProps {
  value: ContentPlatform[];
  onChange: (value: ContentPlatform[]) => void;
}

const contentPlatformOptions: CheckboxOption<ContentPlatform>[] = [
  {
    value: 'youtube',
    label: 'YouTube',
    description: 'Canal no YouTube com vídeos e conteúdo em vídeo',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    description: 'Perfil no Instagram com posts, reels e stories',
  },
  {
    value: 'tiktok',
    label: 'TikTok',
    description: 'Perfil no TikTok com vídeos curtos',
  },
  {
    value: 'blog',
    label: 'Blog / Website',
    description: 'Blog ou site pessoal com artigos e conteúdo escrito',
  },
  {
    value: 'podcast',
    label: 'Podcast',
    description: 'Produção de podcasts e conteúdo em áudio',
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    description: 'Perfil profissional no LinkedIn com publicações',
  },
  {
    value: 'other',
    label: 'Outra',
    description: 'Outra plataforma de conteúdo',
  },
];

export function ContentPlatformStep({
  value,
  onChange,
  onNext,
  onBack,
}: ContentPlatformStepProps) {
  const handleChange = (selected: ContentPlatform[]) => {
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
          Quais as suas principais plataformas de conteúdo?
        </h2>
        <p className="mt-2 text-gray-600">
          Selecione até 3 plataformas onde você mais produz e publica conteúdo
        </p>
      </div>

      {/* Options */}
      <CheckboxGroup<ContentPlatform>
        name="contentPlatforms"
        options={contentPlatformOptions}
        value={value}
        onChange={handleChange}
        minSelections={1}
        maxSelections={3}
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

export default ContentPlatformStep;
