'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { EmployeeCount, RadioOption, StepProps } from '@/types/qualification';

interface EmployeeCountStepProps extends StepProps {
  value?: EmployeeCount;
  onChange: (value: EmployeeCount) => void;
}

export function EmployeeCountStep({ value, onChange, onNext, onBack }: EmployeeCountStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<EmployeeCount>[] = [
    { value: 'solo', label: t('q.employeeCount.solo'), description: t('q.employeeCount.soloDesc') },
    { value: '2_5', label: t('q.employeeCount.from2to5'), description: t('q.employeeCount.from2to5Desc') },
    { value: '6_10', label: t('q.employeeCount.from6to10'), description: t('q.employeeCount.from6to10Desc') },
    { value: '11_50', label: t('q.employeeCount.from11to50'), description: t('q.employeeCount.from11to50Desc') },
    { value: 'more_than_50', label: t('q.employeeCount.moreThan50'), description: t('q.employeeCount.moreThan50Desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.employeeCount.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.employeeCount.subtitle')}</p>
      </div>
      <RadioGroup<EmployeeCount> name="employeeCount" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default EmployeeCountStep;
