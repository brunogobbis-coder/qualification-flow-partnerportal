'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { ServiceType, RadioOption, StepProps } from '@/types/qualification';

interface ServiceTypeStepProps extends StepProps {
  value?: ServiceType;
  onChange: (value: ServiceType) => void;
}

export function ServiceTypeStep({ value, onChange, onNext, onBack }: ServiceTypeStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<ServiceType>[] = [
    { value: 'agency', label: t('q.serviceType.agency'), description: t('q.serviceType.agencyDesc') },
    { value: 'freelancer', label: t('q.serviceType.freelancer'), description: t('q.serviceType.freelancerDesc') },
    { value: 'consultant', label: t('q.serviceType.consultant'), description: t('q.serviceType.consultantDesc') },
    { value: 'developer', label: t('q.serviceType.developer'), description: t('q.serviceType.developerDesc') },
    { value: 'traffic_manager', label: t('q.serviceType.trafficMgr'), description: t('q.serviceType.trafficMgrDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.serviceType.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.serviceType.subtitle')}</p>
      </div>
      <RadioGroup<ServiceType> name="serviceType" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ServiceTypeStep;
