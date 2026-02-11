'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import { useTranslation } from '@/lib/useTranslation';
import type { ClientsVolume, RadioOption, StepProps } from '@/types/qualification';

interface ClientsVolumeStepProps extends StepProps {
  value?: ClientsVolume;
  onChange: (value: ClientsVolume) => void;
}

export function ClientsVolumeStep({ value, onChange, onNext, onBack }: ClientsVolumeStepProps) {
  const { t } = useTranslation();

  const options: RadioOption<ClientsVolume>[] = [
    { value: 'none', label: t('q.clientsVolume.none'), description: t('q.clientsVolume.noneDesc') },
    { value: '1_5', label: t('q.clientsVolume.from1to5'), description: t('q.clientsVolume.from1to5Desc') },
    { value: '6_20', label: t('q.clientsVolume.from6to20'), description: t('q.clientsVolume.from6to20Desc') },
    { value: '21_50', label: t('q.clientsVolume.from21to50'), description: t('q.clientsVolume.from21to50Desc') },
    { value: 'more_than_50', label: t('q.clientsVolume.moreThan50'), description: t('q.clientsVolume.moreThan50Desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('q.clientsVolume.title')}</h2>
        <p className="mt-2 text-gray-600">{t('q.clientsVolume.subtitle')}</p>
      </div>
      <RadioGroup<ClientsVolume> name="clientsVolume" options={options} value={value} onChange={onChange} />
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t('common.back')}</button>
        <button type="button" onClick={onNext} disabled={!value} className="btn-primary">{t('common.continue')}</button>
      </div>
    </motion.div>
  );
}

export default ClientsVolumeStep;
