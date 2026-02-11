'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { CompanySize, RadioOption, StepProps } from '@/types/qualification';

interface TechCompanyInfoStepProps extends StepProps {
  companyName: string;
  websiteUrl: string;
  country: string;
  companySize?: CompanySize;
  onCompanyNameChange: (value: string) => void;
  onWebsiteUrlChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onCompanySizeChange: (value: CompanySize) => void;
}

const companySizeOptions: RadioOption<CompanySize>[] = [
  { value: '1_10', label: '1-10 funcionários', description: 'Startup ou pequena empresa' },
  { value: '11_50', label: '11-50 funcionários', description: 'Empresa em crescimento' },
  { value: '51_200', label: '51-200 funcionários', description: 'Empresa de médio porte' },
  { value: 'more_than_200', label: '200+ funcionários', description: 'Grande empresa' },
];

const countries = [
  'Brasil',
  'Argentina',
  'México',
  'Colômbia',
  'Chile',
  'Peru',
  'Uruguai',
  'Equador',
  'Outro',
];

export function TechCompanyInfoStep({
  companyName,
  websiteUrl,
  country,
  companySize,
  onCompanyNameChange,
  onWebsiteUrlChange,
  onCountryChange,
  onCompanySizeChange,
  onNext,
  onBack,
}: TechCompanyInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (touched.companyName && !companyName.trim()) {
      newErrors.companyName = 'Nome da empresa é obrigatório';
    }
    
    if (touched.websiteUrl && websiteUrl) {
      try {
        new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
      } catch {
        newErrors.websiteUrl = 'URL inválida';
      }
    }
    
    if (touched.country && !country) {
      newErrors.country = 'Selecione um país';
    }

    setErrors(newErrors);
  }, [companyName, websiteUrl, country, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContinue = () => {
    const allTouched = { companyName: true, websiteUrl: true, country: true };
    setTouched(allTouched);

    if (companyName.trim() && country && companySize) {
      onNext();
    }
  };

  const canProceed = companyName.trim() && country && companySize && Object.keys(errors).length === 0;

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
          Informações da Empresa
        </h2>
        <p className="mt-2 text-gray-600">
          Conte-nos sobre sua empresa ou equipe de desenvolvimento
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="label">
            Nome da Empresa *
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            onBlur={() => handleBlur('companyName')}
            placeholder="Ex: Minha Empresa Tech"
            className={errors.companyName ? 'input-error' : 'input'}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
          )}
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="websiteUrl" className="label">
            Website
          </label>
          <input
            type="url"
            id="websiteUrl"
            value={websiteUrl}
            onChange={(e) => onWebsiteUrlChange(e.target.value)}
            onBlur={() => handleBlur('websiteUrl')}
            placeholder="Ex: https://minhaempresa.com"
            className={errors.websiteUrl ? 'input-error' : 'input'}
          />
          {errors.websiteUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.websiteUrl}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="label">
            País *
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            onBlur={() => handleBlur('country')}
            className={`${errors.country ? 'input-error' : 'input'} cursor-pointer`}
          >
            <option value="">Selecione um país</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        {/* Company Size */}
        <div>
          <label className="label mb-3">Tamanho da Equipe *</label>
          <RadioGroup<CompanySize>
            name="companySize"
            options={companySizeOptions}
            value={companySize}
            onChange={onCompanySizeChange}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Voltar
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canProceed}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}

export default TechCompanyInfoStep;
