'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTranslation } from '@/lib/useTranslation';
import type { StepProps } from '@/types/qualification';

interface ServiceProfileStepProps extends StepProps {
  portfolioUrl: string;
  onPortfolioUrlChange: (value: string) => void;
}

export function ServiceProfileStep({ portfolioUrl, onPortfolioUrlChange, onNext, onBack }: ServiceProfileStepProps) {
  const { t } = useTranslation();
  const [urlError, setUrlError] = useState<string>();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && !portfolioUrl.trim()) {
      setUrlError(t('q.serviceProfile.error'));
    } else {
      setUrlError(undefined);
    }
  }, [portfolioUrl, touched, t]);

  const canProceed = portfolioUrl.trim().length > 0;

  const handleSubmit = () => {
    setTouched(true);
    if (canProceed) { onNext(); }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.serviceProfile.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.serviceProfile.subtitle')}</p>
      </div>

      <div>
        <label htmlFor="portfolioUrl" className="label">
          {t('q.serviceProfile.label')}
          <span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="url"
          id="portfolioUrl"
          name="portfolioUrl"
          value={portfolioUrl}
          onChange={(e) => onPortfolioUrlChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={t('q.serviceProfile.placeholder')}
          className={clsx('input', urlError && 'input-error')}
          autoComplete="url"
          required
        />
        {urlError ? (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 flex items-center gap-1 text-sm text-red-600" role="alert">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {urlError}
          </motion.p>
        ) : (
          <p className="mt-1 text-sm text-gray-500">{t('q.serviceProfile.hint')}</p>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-2 text-sm font-medium text-gray-700">{t('q.serviceProfile.examplesTitle')}</p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• {t('q.serviceProfile.ex1')}</li>
          <li>• {t('q.serviceProfile.ex2')}</li>
          <li>• {t('q.serviceProfile.ex3')}</li>
          <li>• {t('q.serviceProfile.ex4')}</li>
        </ul>
      </motion.div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={handleSubmit} disabled={!canProceed} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ServiceProfileStep;
