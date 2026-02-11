'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { SolutionType, RadioOption, StepProps } from '@/types/qualification';

interface TechSolutionTypeStepProps extends StepProps {
  value?: SolutionType;
  onChange: (value: SolutionType) => void;
}

export function TechSolutionTypeStep({ value, onChange, onNext, onBack }: TechSolutionTypeStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<SolutionType>[] = [
    { value: 'app', label: t('q.techSolution.app'), description: t('q.techSolution.appDesc') },
    { value: 'theme', label: t('q.techSolution.theme'), description: t('q.techSolution.themeDesc') },
    { value: 'integration', label: t('q.techSolution.integration'), description: t('q.techSolution.integrationDesc') },
    { value: 'erp_crm', label: t('q.techSolution.erpCrm'), description: t('q.techSolution.erpCrmDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.techSolution.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.techSolution.subtitle')}</p>
      </div>
      <RadioGroup<SolutionType> name="solutionType" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default TechSolutionTypeStep;
