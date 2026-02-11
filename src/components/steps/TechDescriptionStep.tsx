'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/useTranslation';
import type { StepProps } from '@/types/qualification';

interface TechDescriptionStepProps extends StepProps {
  value: string;
  onChange: (value: string) => void;
}

const MIN_LENGTH = 50;
const MAX_LENGTH = 1000;

export function TechDescriptionStep({ value, onChange, onNext, onBack }: TechDescriptionStepProps) {
  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (touched) {
      if (!value.trim()) {
        setError(t('q.techDescription.errorRequired'));
      } else if (value.length < MIN_LENGTH) {
        setError(t('q.techDescription.errorMinLength').replace('{min}', String(MIN_LENGTH)).replace('{current}', String(value.length)));
      } else {
        setError(undefined);
      }
    }
  }, [value, touched, t]);

  const canProceed = value.trim().length >= MIN_LENGTH;

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.techDescription.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.techDescription.subtitle')}</p>
      </div>

      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          rows={6}
          maxLength={MAX_LENGTH}
          placeholder={t('q.techDescription.placeholder')}
          className={`${error ? 'input-error' : 'input'} resize-none`}
        />
        <div className="mt-2 flex justify-between text-sm">
          <span className={error ? 'text-red-600' : 'text-gray-500'}>
            {error || t('q.techDescription.minChars').replace('{min}', String(MIN_LENGTH))}
          </span>
          <span className="text-gray-500">{value.length}/{MAX_LENGTH}</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">{t('q.techDescription.tipsTitle')}</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• {t('q.techDescription.tip1')}</li>
          <li>• {t('q.techDescription.tip2')}</li>
          <li>• {t('q.techDescription.tip3')}</li>
        </ul>
      </motion.div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!canProceed} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default TechDescriptionStep;
