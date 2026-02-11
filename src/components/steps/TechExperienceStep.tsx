'use client';

import { motion } from 'framer-motion';
import { RadioGroup, CheckboxGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { EcommercePlatformExperience, CheckboxOption, RadioOption, StepProps } from '@/types/qualification';

interface TechExperienceStepProps extends StepProps {
  hasExistingProduct?: boolean;
  existingPlatforms: EcommercePlatformExperience[];
  onHasExistingProductChange: (value: boolean) => void;
  onExistingPlatformsChange: (value: EcommercePlatformExperience[]) => void;
}

export function TechExperienceStep({ hasExistingProduct, existingPlatforms, onHasExistingProductChange, onExistingPlatformsChange, onNext, onBack }: TechExperienceStepProps) {
  const { t } = useTranslation();

  const yesNoOptions: RadioOption<'yes' | 'no'>[] = [
    { value: 'yes', label: t('q.techExperience.yes'), description: t('q.techExperience.yesDesc') },
    { value: 'no', label: t('q.techExperience.no'), description: t('q.techExperience.noDesc') },
  ];

  const platformOptions: CheckboxOption<EcommercePlatformExperience>[] = [
    { value: 'shopify', label: 'Shopify' },
    { value: 'vtex', label: 'VTEX' },
    { value: 'woocommerce', label: 'WooCommerce' },
    { value: 'magento', label: 'Magento' },
    { value: 'other', label: t('q.techExperience.otherPlatform') },
  ];

  const handleYesNoChange = (value: 'yes' | 'no') => {
    onHasExistingProductChange(value === 'yes');
    if (value === 'no') { onExistingPlatformsChange([]); }
  };

  const canProceed = hasExistingProduct !== undefined && (!hasExistingProduct || existingPlatforms.length > 0);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.techExperience.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.techExperience.subtitle')}</p>
      </div>
      <RadioGroup<'yes' | 'no'> name="hasExistingProduct" options={yesNoOptions} value={hasExistingProduct === undefined ? undefined : hasExistingProduct ? 'yes' : 'no'} onChange={handleYesNoChange} />
      {hasExistingProduct && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">{t('q.techExperience.whichPlatforms')}</h3>
          <CheckboxGroup<EcommercePlatformExperience> name="existingPlatforms" options={platformOptions} value={existingPlatforms} onChange={onExistingPlatformsChange} minSelections={1} />
        </motion.div>
      )}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!canProceed} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default TechExperienceStep;
