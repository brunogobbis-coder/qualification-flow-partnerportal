'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { RadioOption, StepProps } from '@/types/qualification';

type ReadyToReferValue = 'yes' | 'no';

interface ReadyToReferStepProps extends StepProps {
  value?: ReadyToReferValue;
  onChange: (value: ReadyToReferValue) => void;
}

export function ReadyToReferStep({
  value,
  onChange,
  onNext,
  onBack,
}: ReadyToReferStepProps) {
  const { t } = useTranslation();

  const readyToReferOptions: RadioOption<ReadyToReferValue>[] = [
    { value: 'yes', label: t('q.readyToRefer.yesLabel'), description: t('q.readyToRefer.yesDesc') },
    { value: 'no', label: t('q.readyToRefer.noLabel'), description: t('q.readyToRefer.noDesc') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.readyToRefer.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.readyToRefer.subtitle')}</p>
      </div>
      <RadioGroup<ReadyToReferValue>
        name="readyToRefer"
        options={readyToReferOptions}
        value={value}
        onChange={onChange}
      />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ReadyToReferStep;
