'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { EcommerceExperience, RadioOption, StepProps } from '@/types/qualification';

interface EcommerceExperienceStepProps extends StepProps {
  value?: EcommerceExperience;
  onChange: (value: EcommerceExperience) => void;
}

export function EcommerceExperienceStep({ value, onChange, onNext, onBack }: EcommerceExperienceStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<EcommerceExperience>[] = [
    { value: 'nuvemshop_user', label: t('q.ecommerce.nuvemUser'), description: t('q.ecommerce.nuvemUserDesc') },
    { value: 'nuvemshop_for_clients', label: t('q.ecommerce.nuvemClients'), description: t('q.ecommerce.nuvemClientsDesc') },
    { value: 'other_platforms_for_clients', label: t('q.ecommerce.otherPlatforms'), description: t('q.ecommerce.otherPlatformsDesc') },
    { value: 'teaches_without_store', label: t('q.ecommerce.teachesNoStore'), description: t('q.ecommerce.teachesNoStoreDesc') },
    { value: 'no_technical_experience', label: t('q.ecommerce.noTechExp'), description: t('q.ecommerce.noTechExpDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.ecommerce.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.ecommerce.subtitle')}</p>
      </div>
      <RadioGroup<EcommerceExperience> name="ecommerceExperience" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default EcommerceExperienceStep;
