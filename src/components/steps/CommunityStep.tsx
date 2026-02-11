'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { CommunityType, RadioOption, StepProps } from '@/types/qualification';

interface CommunityStepProps extends StepProps {
  value?: CommunityType;
  onChange: (value: CommunityType) => void;
}

export function CommunityStep({ value, onChange, onNext, onBack }: CommunityStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<CommunityType>[] = [
    { value: 'whatsapp_telegram', label: t('q.community.whatsapp'), description: t('q.community.whatsappDesc') },
    { value: 'newsletter', label: t('q.community.newsletter'), description: t('q.community.newsletterDesc') },
    { value: 'private_group', label: t('q.community.privateGroup'), description: t('q.community.privateGroupDesc') },
    { value: 'social_posts_only', label: t('q.community.socialOnly'), description: t('q.community.socialOnlyDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.community.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.community.subtitle')}</p>
      </div>
      <RadioGroup<CommunityType> name="communityType" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default CommunityStep;
