'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { AudienceSize, StepProps } from '@/types/qualification';

interface ProfileStepProps extends StepProps {
  username?: string;
  siteUrl: string;
  audienceSize?: AudienceSize;
  onUsernameChange: (value: string) => void;
  onSiteUrlChange: (value: string) => void;
  onAudienceSizeChange: (value: AudienceSize) => void;
}

const audienceSizeOptions: { value: AudienceSize; label: string }[] = [
  { value: 'under_1k', label: 'Menos de 1.000' },
  { value: '1k_10k', label: '1.000 - 10.000' },
  { value: '10k_100k', label: '10.000 - 100.000' },
  { value: 'more_than_100k', label: 'Mais de 100.000' },
];

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
  const [siteUrlError, setSiteUrlError] = useState<string>();
  const [touched, setTouched] = useState(false);

  // Validate site URL
  useEffect(() => {
    if (touched && !siteUrl.trim()) {
      setSiteUrlError('Por favor, informe seu site ou rede social principal');
    } else {
      setSiteUrlError(undefined);
    }
  }, [siteUrl, touched]);

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
      {/* Question Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Conte mais sobre você
        </h2>
        <p className="mt-2 text-gray-600">
          Precisamos conhecer sua presença online para entender melhor seu perfil
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Username (Optional) */}
        <div>
          <label htmlFor="username" className="label">
            Seu nome de usuário ou apelido
            <span className="ml-1 text-gray-400">(opcional)</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Ex: @seunome"
            className="input"
            autoComplete="username"
          />
          <p className="mt-1 text-sm text-gray-500">
            Como você é conhecido nas redes sociais
          </p>
        </div>

        {/* Site URL (Required) */}
        <div>
          <label htmlFor="siteUrl" className="label">
            Site ou rede social principal
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="url"
            id="siteUrl"
            name="siteUrl"
            value={siteUrl}
            onChange={(e) => onSiteUrlChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Ex: https://instagram.com/seuperfil"
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
              Instagram, YouTube, TikTok, LinkedIn, blog, ou website pessoal
            </p>
          )}
        </div>

        {/* Audience Size (Required) */}
        <div>
          <label htmlFor="audienceSize" className="label">
            Tamanho da audiência
            <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="audienceSize"
            name="audienceSize"
            value={audienceSize || ''}
            onChange={(e) => onAudienceSizeChange(e.target.value as AudienceSize)}
            className="input"
          >
            <option value="" disabled>Selecione o tamanho da sua audiência</option>
            {audienceSizeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Alcance mensal estimado em suas plataformas
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}

export default ProfileStep;
