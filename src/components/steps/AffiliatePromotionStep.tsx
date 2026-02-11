'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { PromotionChannel, CheckboxOption, StepProps } from '@/types/qualification';

interface AffiliatePromotionStepProps extends StepProps {
  value: PromotionChannel[];
  onChange: (value: PromotionChannel[]) => void;
}

export function AffiliatePromotionStep({ value, onChange, onNext, onBack }: AffiliatePromotionStepProps) {
  const { t } = useTranslation();

  const options: CheckboxOption<PromotionChannel>[] = [
    { value: 'blog', label: t('q.promotion.blogOpt'), description: t('q.promotion.blogOptDesc') },
    { value: 'youtube', label: t('q.promotion.youtubeOpt'), description: t('q.promotion.youtubeOptDesc') },
    { value: 'social_media', label: t('q.promotion.socialMedia'), description: t('q.promotion.socialMediaDesc') },
    { value: 'email_marketing', label: t('q.promotion.emailMarketing'), description: t('q.promotion.emailMarketingDesc') },
    { value: 'paid_advertising', label: t('q.promotion.paidAds'), description: t('q.promotion.paidAdsDesc') },
    { value: 'community', label: t('q.promotion.communityOpt'), description: t('q.promotion.communityOptDesc') },
    { value: 'podcast', label: t('q.promotion.podcastOpt'), description: t('q.promotion.podcastOptDesc') },
    { value: 'other', label: t('q.promotion.otherOpt'), description: t('q.promotion.otherOptDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.promotion.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.promotion.subtitle')}</p>
      </div>
      <CheckboxGroup<PromotionChannel> name="promotionChannels" options={options} value={value} onChange={onChange} minSelections={1} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={value.length < 1} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default AffiliatePromotionStep;
