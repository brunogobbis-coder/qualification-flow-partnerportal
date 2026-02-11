'use client';

import { motion } from 'framer-motion';
import { RadioGroup, CheckboxGroup } from '@/components/ui';
import type { EcommercePlatformExperience, CheckboxOption, RadioOption, StepProps } from '@/types/qualification';

interface TechExperienceStepProps extends StepProps {
  hasExistingProduct?: boolean;
  existingPlatforms: EcommercePlatformExperience[];
  onHasExistingProductChange: (value: boolean) => void;
  onExistingPlatformsChange: (value: EcommercePlatformExperience[]) => void;
}

const yesNoOptions: RadioOption<'yes' | 'no'>[] = [
  { value: 'yes', label: 'Sim', description: 'Já tenho um produto em outra plataforma de e-commerce' },
  { value: 'no', label: 'Não', description: 'Este será meu primeiro produto para e-commerce' },
];

const platformOptions: CheckboxOption<EcommercePlatformExperience>[] = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'vtex', label: 'VTEX' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'other', label: 'Outra plataforma' },
];

export function TechExperienceStep({
  hasExistingProduct,
  existingPlatforms,
  onHasExistingProductChange,
  onExistingPlatformsChange,
  onNext,
  onBack,
}: TechExperienceStepProps) {
  const handleYesNoChange = (value: 'yes' | 'no') => {
    onHasExistingProductChange(value === 'yes');
    if (value === 'no') {
      onExistingPlatformsChange([]);
    }
  };

  const canProceed = hasExistingProduct !== undefined && 
    (!hasExistingProduct || existingPlatforms.length > 0);

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
          Experiência com outras plataformas
        </h2>
        <p className="mt-2 text-gray-600">
          Você já tem um produto similar em outra plataforma de e-commerce?
        </p>
      </div>

      {/* Yes/No Selection */}
      <RadioGroup<'yes' | 'no'>
        name="hasExistingProduct"
        options={yesNoOptions}
        value={hasExistingProduct === undefined ? undefined : hasExistingProduct ? 'yes' : 'no'}
        onChange={handleYesNoChange}
      />

      {/* Platform Selection (if yes) */}
      {hasExistingProduct && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Em quais plataformas?
          </h3>
          <CheckboxGroup<EcommercePlatformExperience>
            name="existingPlatforms"
            options={platformOptions}
            value={existingPlatforms}
            onChange={onExistingPlatformsChange}
            minSelections={1}
          />
        </motion.div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}

export default TechExperienceStep;
