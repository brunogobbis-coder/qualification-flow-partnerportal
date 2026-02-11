'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { MonetizationType, CheckboxOption, StepProps } from '@/types/qualification';

interface MonetizationStepProps extends StepProps {
  value: MonetizationType[];
  onChange: (value: MonetizationType[]) => void;
}

export function MonetizationStep({ value, onChange, onNext, onBack }: MonetizationStepProps) {
  const { t } = useTranslation();

  const monetizationOptions: CheckboxOption<MonetizationType>[] = [
    { value: 'consulting', label: t('q.monetization.consulting'), description: t('q.monetization.consultingDesc') },
    { value: 'courses', label: t('q.monetization.courses'), description: t('q.monetization.coursesDesc') },
    { value: 'mentoring', label: t('q.monetization.mentoring'), description: t('q.monetization.mentoringDesc') },
    { value: 'advertising', label: t('q.monetization.advertising'), description: t('q.monetization.advertisingDesc') },
    { value: 'affiliate', label: t('q.monetization.affiliateOpt'), description: t('q.monetization.affiliateOptDesc') },
    { value: 'not_monetizing', label: t('q.monetization.notMonetizing'), description: t('q.monetization.notMonetizingDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.monetization.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.monetization.subtitle')}</p>
      </div>
      <CheckboxGroup<MonetizationType> name="monetization" options={monetizationOptions} value={value} onChange={onChange} minSelections={1} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={value.length < 1} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default MonetizationStep;
