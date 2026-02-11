'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/useTranslation';
import type { Objective, StepProps } from '@/types/qualification';

interface ObjectiveStepProps extends StepProps {
  value?: Objective;
  onChange: (value: Objective) => void;
}

export function ObjectiveStep({
  value,
  onChange,
  onNext,
}: ObjectiveStepProps) {
  const { t } = useTranslation();

  const partnerTracks: {
    value: Objective;
    icon: React.ReactNode;
    headline: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }[] = [
    {
      value: 'tech_partner',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      headline: t('q.objective.techLabel'),
      description: t('q.objective.techDesc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
    },
    {
      value: 'service_provider',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      headline: t('q.objective.serviceLabel'),
      description: t('q.objective.serviceDesc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
    {
      value: 'affiliate',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      headline: t('q.objective.affiliateLabel'),
      description: t('q.objective.affiliateDesc'),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
    },
  ];

  const handleSelect = (selected: Objective) => {
    onChange(selected);
  };

  const canProceed = Boolean(value);

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
          {t('q.objective.title')}
        </h2>
        <p className="mt-2 text-gray-600">
          {t('q.objective.subtitle')}
        </p>
      </div>

      {/* Partner Track Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {partnerTracks.map((track, index) => {
          const isSelected = value === track.value;
          
          return (
            <motion.button
              key={track.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(track.value)}
              className={`
                relative flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all duration-200
                ${isSelected 
                  ? `${track.borderColor} ${track.bgColor} ring-2 ring-offset-2 ${track.borderColor.replace('border-', 'ring-')}`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {/* Icon */}
              <div className={`mb-4 rounded-lg p-2 ${isSelected ? track.bgColor : 'bg-gray-100'}`}>
                <span className={isSelected ? track.color : 'text-gray-500'}>
                  {track.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className={`text-lg font-semibold ${isSelected ? track.color.replace('text-', 'text-').replace('-600', '-900') : 'text-gray-900'}`}>
                {track.headline}
              </h3>
              <p className={`mt-2 text-sm ${isSelected ? track.color.replace('-600', '-700') : 'text-gray-500'}`}>
                {track.description}
              </p>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3"
                >
                  <svg
                    className={`h-6 w-6 ${track.color}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary"
        >
          {t('common.continue')}
        </button>
      </div>
    </motion.div>
  );
}

export default ObjectiveStep;
