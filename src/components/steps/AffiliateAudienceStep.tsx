'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { AudienceNiche, RadioOption, StepProps } from '@/types/qualification';

interface AffiliateAudienceStepProps extends StepProps {
  audienceNiche?: AudienceNiche;
  onAudienceNicheChange: (value: AudienceNiche) => void;
}

export function AffiliateAudienceStep({ audienceNiche, onAudienceNicheChange, onNext, onBack }: AffiliateAudienceStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<AudienceNiche>[] = [
    { value: 'ecommerce', label: t('q.audienceNiche.ecommerceOpt'), description: t('q.audienceNiche.ecommerceOptDesc') },
    { value: 'entrepreneurship', label: t('q.audienceNiche.entrepreneurship'), description: t('q.audienceNiche.entrepreneurshipDesc') },
    { value: 'marketing', label: t('q.audienceNiche.marketingOpt'), description: t('q.audienceNiche.marketingOptDesc') },
    { value: 'technology', label: t('q.audienceNiche.technology'), description: t('q.audienceNiche.technologyDesc') },
    { value: 'lifestyle', label: t('q.audienceNiche.lifestyle'), description: t('q.audienceNiche.lifestyleDesc') },
    { value: 'other', label: t('q.audienceNiche.otherNiche'), description: t('q.audienceNiche.otherNicheDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.audienceNiche.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.audienceNiche.subtitle')}</p>
      </div>
      <RadioGroup<AudienceNiche> name="audienceNiche" options={options} value={audienceNiche} onChange={onAudienceNicheChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!audienceNiche} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default AffiliateAudienceStep;
