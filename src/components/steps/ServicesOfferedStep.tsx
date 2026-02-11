'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { ServiceOffered, CheckboxOption, StepProps } from '@/types/qualification';

interface ServicesOfferedStepProps extends StepProps {
  value: ServiceOffered[];
  onChange: (value: ServiceOffered[]) => void;
}

export function ServicesOfferedStep({ value, onChange, onNext, onBack }: ServicesOfferedStepProps) {
  const { t } = useTranslation();

  const options: CheckboxOption<ServiceOffered>[] = [
    { value: 'store_creation', label: t('q.servicesOffered.storeCreation'), description: t('q.servicesOffered.storeCreationDesc') },
    { value: 'design', label: t('q.servicesOffered.design'), description: t('q.servicesOffered.designDesc') },
    { value: 'marketing', label: t('q.servicesOffered.marketing'), description: t('q.servicesOffered.marketingDesc') },
    { value: 'traffic_management', label: t('q.servicesOffered.trafficMgmt'), description: t('q.servicesOffered.trafficMgmtDesc') },
    { value: 'seo_content', label: t('q.servicesOffered.seoContent'), description: t('q.servicesOffered.seoContentDesc') },
    { value: 'development', label: t('q.servicesOffered.development'), description: t('q.servicesOffered.developmentDesc') },
    { value: 'consulting', label: t('q.servicesOffered.consulting'), description: t('q.servicesOffered.consultingDesc') },
    { value: 'support', label: t('q.servicesOffered.support'), description: t('q.servicesOffered.supportDesc') },
    { value: 'migration', label: t('q.servicesOffered.migration'), description: t('q.servicesOffered.migrationDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.servicesOffered.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.servicesOffered.subtitle')}</p>
      </div>
      <CheckboxGroup<ServiceOffered> name="servicesOffered" options={options} value={value} onChange={onChange} minSelections={1} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={value.length < 1} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ServicesOfferedStep;
