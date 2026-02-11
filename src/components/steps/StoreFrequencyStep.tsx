'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { StoreCreationFrequency, RadioOption, StepProps } from '@/types/qualification';

interface StoreFrequencyStepProps extends StepProps {
  value?: StoreCreationFrequency;
  onChange: (value: StoreCreationFrequency) => void;
}

export function StoreFrequencyStep({ value, onChange, onNext, onBack }: StoreFrequencyStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<StoreCreationFrequency>[] = [
    { value: 'monthly', label: t('q.storeFrequency.monthly'), description: t('q.storeFrequency.monthlyDesc') },
    { value: 'bimonthly_or_more', label: t('q.storeFrequency.bimonthly'), description: t('q.storeFrequency.bimonthlyDesc') },
    { value: 'not_yet_interested', label: t('q.storeFrequency.notYet'), description: t('q.storeFrequency.notYetDesc') },
    { value: 'other_segment', label: t('q.storeFrequency.otherSegment'), description: t('q.storeFrequency.otherSegmentDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.storeFrequency.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.storeFrequency.subtitle')}</p>
      </div>
      <RadioGroup<StoreCreationFrequency> name="storeFrequency" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default StoreFrequencyStep;
