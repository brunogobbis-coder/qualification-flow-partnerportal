'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTranslation } from '@/lib/useTranslation';
import type { AudienceSize, StepProps } from '@/types/qualification';

interface ProfileStepProps extends StepProps {
  username?: string;
  siteUrl: string;
  audienceSize?: AudienceSize;
  onUsernameChange: (value: string) => void;
  onSiteUrlChange: (value: string) => void;
  onAudienceSizeChange: (value: AudienceSize) => void;
}

export function ProfileStep({
  username = '',
  siteUrl,
  audienceSize,
  onUsernameChange,
  onSiteUrlChange,
  onAudienceSizeChange,
  onNext,
  onBack,
}: ProfileStepProps) {
  const { t } = useTranslation();
  const [siteUrlError, setSiteUrlError] = useState<string>();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && !siteUrl.trim()) {
      setSiteUrlError(t('q.profile.siteUrlError'));
    } else {
      setSiteUrlError(undefined);
    }
  }, [siteUrl, touched, t]);

  const audienceSizeOptions: { value: AudienceSize; label: string }[] = [
    { value: 'under_1k', label: t('q.profile.under1k') },
    { value: '1k_10k', label: t('q.profile.from1kTo10k') },
    { value: '10k_100k', label: t('q.profile.from10kTo100k') },
    { value: 'more_than_100k', label: t('q.profile.moreThan100k') },
  ];

  const canProceed = siteUrl.trim().length > 0 && Boolean(audienceSize);

  const handleSubmit = () => {
    setTouched(true);
    if (canProceed) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('q.profile.title')}
        </h2>
        <p className="mt-2 text-gray-600">
          {t('q.profile.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="username" className="label">
            {t('q.profile.usernameLabel')}
            <span className="ml-1 text-gray-400">{t('q.profile.optional')}</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder={t('q.profile.usernamePlaceholder')}
            className="input"
            autoComplete="username"
          />
          <p className="mt-1 text-sm text-gray-500">
            {t('q.profile.usernameHint')}
          </p>
        </div>

        <div>
          <label htmlFor="siteUrl" className="label">
            {t('q.profile.siteUrlLabel')}
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="url"
            id="siteUrl"
            name="siteUrl"
            value={siteUrl}
            onChange={(e) => onSiteUrlChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={t('q.profile.siteUrlPlaceholder')}
            className={clsx('input', siteUrlError && 'input-error')}
            autoComplete="url"
            required
          />
          {siteUrlError ? (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {siteUrlError}
            </motion.p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              {t('q.profile.siteUrlHint')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="audienceSize" className="label">
            {t('q.profile.audienceSizeLabel')}
            <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="audienceSize"
            name="audienceSize"
            value={audienceSize || ''}
            onChange={(e) => onAudienceSizeChange(e.target.value as AudienceSize)}
            className="input"
          >
            <option value="" disabled>{t('q.profile.audienceSizePlaceholder')}</option>
            {audienceSizeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {t('q.profile.audienceSizeHint')}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          {t('common.back')}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary"
        >
          {t('common.continue')}
        </button>
      </div>
    </motion.div>
  );
}

export default ProfileStep;
