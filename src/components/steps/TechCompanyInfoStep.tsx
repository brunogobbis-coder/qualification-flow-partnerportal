'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
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

export function TechCompanyInfoStep({
  companyName, websiteUrl, country, companySize,
  onCompanyNameChange, onWebsiteUrlChange, onCountryChange, onCompanySizeChange,
  onNext, onBack,
}: TechCompanyInfoStepProps) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const companySizeOptions: RadioOption<CompanySize>[] = [
    { value: '1_10', label: t('q.techCompany.size1to10'), description: t('q.techCompany.size1to10Desc') },
    { value: '11_50', label: t('q.techCompany.size11to50'), description: t('q.techCompany.size11to50Desc') },
    { value: '51_200', label: t('q.techCompany.size51to200'), description: t('q.techCompany.size51to200Desc') },
    { value: 'more_than_200', label: t('q.techCompany.size200plus'), description: t('q.techCompany.size200plusDesc') },
  ];

  const countryKeys = ['Brasil', 'Argentina', 'Mexico', 'Colombia', 'Chile', 'Peru', 'Uruguai', 'Equador', 'Other'] as const;
  const countryTranslationKeys: Record<string, string> = {
    Brasil: 'q.techCompany.countriesBrasil',
    Argentina: 'q.techCompany.countriesArgentina',
    Mexico: 'q.techCompany.countriesMexico',
    Colombia: 'q.techCompany.countriesColombia',
    Chile: 'q.techCompany.countriesChile',
    Peru: 'q.techCompany.countriesPeru',
    Uruguai: 'q.techCompany.countriesUruguai',
    Equador: 'q.techCompany.countriesEquador',
    Other: 'q.techCompany.countriesOther',
  };

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (touched.companyName && !companyName.trim()) {
      newErrors.companyName = t('q.techCompany.companyNameError');
    }
    if (touched.websiteUrl && websiteUrl) {
      try { new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`); } catch { newErrors.websiteUrl = t('q.techCompany.websiteError'); }
    }
    if (touched.country && !country) {
      newErrors.country = t('q.techCompany.countryError');
    }
    setErrors(newErrors);
  }, [companyName, websiteUrl, country, touched, t]);

  const handleBlur = (field: string) => { setTouched((prev) => ({ ...prev, [field]: true })); };

  const handleContinue = () => {
    setTouched({ companyName: true, websiteUrl: true, country: true });
    if (companyName.trim() && country && companySize) { onNext(); }
  };

  const canProceed = companyName.trim() && country && companySize && Object.keys(errors).length === 0;

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.techCompany.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.techCompany.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="companyName" className="label">{t('q.techCompany.companyNameLabel')} *</label>
          <input type="text" id="companyName" value={companyName} onChange={(e) => onCompanyNameChange(e.target.value)} onBlur={() => handleBlur('companyName')} placeholder={t('q.techCompany.companyNamePlaceholder')} className={errors.companyName ? 'input-error' : 'input'} />
          {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="websiteUrl" className="label">{t('q.techCompany.websiteLabel')}</label>
          <input type="url" id="websiteUrl" value={websiteUrl} onChange={(e) => onWebsiteUrlChange(e.target.value)} onBlur={() => handleBlur('websiteUrl')} placeholder={t('q.techCompany.websitePlaceholder')} className={errors.websiteUrl ? 'input-error' : 'input'} />
          {errors.websiteUrl && <p className="mt-1 text-sm text-red-600">{errors.websiteUrl}</p>}
        </div>

        <div>
          <label htmlFor="country" className="label">{t('q.techCompany.countryLabel')} *</label>
          <select id="country" value={country} onChange={(e) => onCountryChange(e.target.value)} onBlur={() => handleBlur('country')} className={`${errors.country ? 'input-error' : 'input'} cursor-pointer`}>
            <option value="">{t('q.techCompany.countryPlaceholder')}</option>
            {countryKeys.map((c) => (
              <option key={c} value={c}>{t(countryTranslationKeys[c])}</option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>

        <div>
          <label className="label mb-3">{t('q.techCompany.teamSizeLabel')} *</label>
          <RadioGroup<CompanySize> name="companySize" options={companySizeOptions} value={companySize} onChange={onCompanySizeChange} />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={handleContinue} disabled={!canProceed} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default TechCompanyInfoStep;
