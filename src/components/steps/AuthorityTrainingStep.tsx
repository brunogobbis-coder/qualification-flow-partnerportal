'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { AuthorityTrainingLevel, RadioOption, StepProps } from '@/types/qualification';

interface AuthorityTrainingStepProps extends StepProps {
  value?: AuthorityTrainingLevel;
  onChange: (value: AuthorityTrainingLevel) => void;
}

export function AuthorityTrainingStep({ value, onChange, onNext, onBack }: AuthorityTrainingStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<AuthorityTrainingLevel>[] = [
    { value: 'recurring_courses', label: t('q.authority.recurring'), description: t('q.authority.recurringDesc') },
    { value: 'occasional_workshops', label: t('q.authority.occasional'), description: t('q.authority.occasionalDesc') },
    { value: 'free_tutorials', label: t('q.authority.freeTutorials'), description: t('q.authority.freeTutorialsDesc') },
    { value: 'informative_content', label: t('q.authority.informative'), description: t('q.authority.informativeDesc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.authority.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.authority.subtitle')}</p>
      </div>
      <RadioGroup<AuthorityTrainingLevel> name="authorityTraining" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default AuthorityTrainingStep;
