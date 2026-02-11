'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ProgressBarProps {
  /** Current step (1-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Optional class name for styling */
  className?: string;
  /** Show step numbers below the bar */
  showStepNumbers?: boolean;
  /** Accessible label for the progress bar */
  ariaLabel?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  className,
  showStepNumbers = false,
  ariaLabel = 'Progresso do formulário',
}: ProgressBarProps) {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className={clsx('w-full', className)}>
      {/* Progress Bar Container */}
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={ariaLabel}
        className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
        />
      </div>

      {/* Step Indicator */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Passo {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Optional Step Numbers */}
      {showStepNumbers && (
        <div className="mt-3 flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <motion.div
                key={stepNumber}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  {
                    'bg-blue-600 text-white': isCompleted || isCurrent,
                    'bg-gray-200 text-gray-500': !isCompleted && !isCurrent,
                  }
                )}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#2563eb' : '#e5e7eb',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
