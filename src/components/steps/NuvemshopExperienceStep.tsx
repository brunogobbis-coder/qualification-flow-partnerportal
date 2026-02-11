'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { NuvemshopExperienceLevel, RadioOption, StepProps } from '@/types/qualification';

interface NuvemshopExperienceStepProps extends StepProps {
  value?: NuvemshopExperienceLevel;
  onChange: (value: NuvemshopExperienceLevel) => void;
}

export function NuvemshopExperienceStep({ value, onChange, onNext, onBack }: NuvemshopExperienceStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<NuvemshopExperienceLevel>[] = [
    { value: 'active_stores', label: t('q.nuvemshopExp.active'), description: t('q.nuvemshopExp.activeDesc') },
    { value: 'created_for_clients', label: t('q.nuvemshopExp.created'), description: t('q.nuvemshopExp.createdDesc') },
    { value: 'familiar', label: t('q.nuvemshopExp.familiar'), description: t('q.nuvemshopExp.familiarDesc') },
    { value: 'no_experience', label: t('q.nuvemshopExp.noExp'), description: t('q.nuvemshopExp.noExpDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.nuvemshopExp.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.nuvemshopExp.subtitle')}</p>
      </div>
      <RadioGroup<NuvemshopExperienceLevel> name="nuvemshopExperience" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default NuvemshopExperienceStep;
