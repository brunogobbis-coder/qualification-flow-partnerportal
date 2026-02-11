'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { ContentPlatform, CheckboxOption, StepProps } from '@/types/qualification';

interface ContentPlatformStepProps extends StepProps {
  value: ContentPlatform[];
  onChange: (value: ContentPlatform[]) => void;
}

export function ContentPlatformStep({ value, onChange, onNext, onBack }: ContentPlatformStepProps) {
  const { t } = useTranslation();

  const options: CheckboxOption<ContentPlatform>[] = [
    { value: 'youtube', label: t('q.contentPlatform.youtube'), description: t('q.contentPlatform.youtubeDesc') },
    { value: 'instagram', label: t('q.contentPlatform.instagram'), description: t('q.contentPlatform.instagramDesc') },
    { value: 'tiktok', label: t('q.contentPlatform.tiktok'), description: t('q.contentPlatform.tiktokDesc') },
    { value: 'blog', label: t('q.contentPlatform.blog'), description: t('q.contentPlatform.blogDesc') },
    { value: 'podcast', label: t('q.contentPlatform.podcast'), description: t('q.contentPlatform.podcastDesc') },
    { value: 'linkedin', label: t('q.contentPlatform.linkedin'), description: t('q.contentPlatform.linkedinDesc') },
    { value: 'other', label: t('q.contentPlatform.other'), description: t('q.contentPlatform.otherDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.contentPlatform.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.contentPlatform.subtitle')}</p>
      </div>
      <CheckboxGroup<ContentPlatform> name="contentPlatforms" options={options} value={value} onChange={onChange} minSelections={1} maxSelections={3} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={value.length < 1} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ContentPlatformStep;
