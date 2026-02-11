'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { ProgramExpectation, CheckboxOption, StepProps } from '@/types/qualification';

interface ExpectationsStepProps extends StepProps {
  value: ProgramExpectation[];
  onChange: (value: ProgramExpectation[]) => void;
}

export function ExpectationsStep({ value, onChange, onNext, onBack }: ExpectationsStepProps) {
  const { t } = useTranslation();

  const options: CheckboxOption<ProgramExpectation>[] = [
    { value: 'commissions', label: t('q.expectations.commissions'), description: t('q.expectations.commissionsDesc') },
    { value: 'exclusive_support', label: t('q.expectations.exclusiveSupport'), description: t('q.expectations.exclusiveSupportDesc') },
    { value: 'training_materials', label: t('q.expectations.training'), description: t('q.expectations.trainingDesc') },
    { value: 'authority_partnership', label: t('q.expectations.authorityPartnership'), description: t('q.expectations.authorityPartnershipDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.expectations.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.expectations.subtitle')}</p>
      </div>
      <CheckboxGroup<ProgramExpectation> name="expectations" options={options} value={value} onChange={onChange} minSelections={1} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={value.length < 1} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ExpectationsStep;
