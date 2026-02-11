'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { RadioOption } from '@/types/qualification';

interface RadioGroupProps<T extends string = string> {
  /** Unique name for the radio group */
  name: string;
  /** Available options */
  options: RadioOption<T>[];
  /** Currently selected value */
  value?: T;
  /** Callback when selection changes */
  onChange: (value: T) => void;
  /** Optional error message */
  error?: string;
  /** Optional class name for styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
}

export function RadioGroup<T extends string = string>({
  name,
  options,
  value,
  onChange,
  error,
  className,
  disabled = false,
  direction = 'vertical',
}: RadioGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={clsx(
        'w-full',
        {
          'flex flex-col space-y-3': direction === 'vertical',
          'flex flex-wrap gap-3': direction === 'horizontal',
        },
        className
      )}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <motion.label
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
              'relative flex cursor-pointer items-start rounded-lg border-2 p-4 transition-all duration-200',
              {
                'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20': isSelected,
                'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50':
                  !isSelected && !disabled,
                'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60': disabled,
              }
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="sr-only"
              aria-describedby={option.description ? `${name}-${option.value}-desc` : undefined}
            />

            {/* Custom Radio Circle */}
            <span
              className={clsx(
                'mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                {
                  'border-blue-500 bg-blue-500': isSelected,
                  'border-gray-300 bg-white': !isSelected,
                }
              )}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-2.5 w-2.5 rounded-full bg-white"
              />
            </span>

            {/* Label and Description */}
            <div className="flex-1">
              <span
                className={clsx('block text-base font-medium', {
                  'text-blue-900': isSelected,
                  'text-gray-900': !isSelected,
                })}
              >
                {option.label}
              </span>
              {option.description && (
                <span
                  id={`${name}-${option.value}-desc`}
                  className={clsx('mt-1 block text-sm', {
                    'text-blue-700': isSelected,
                    'text-gray-500': !isSelected,
                  })}
                >
                  {option.description}
                </span>
              )}
            </div>

            {/* Selected Indicator */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-3"
              >
                <svg
                  className="h-5 w-5 text-blue-500"
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
          </motion.label>
        );
      })}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default RadioGroup;
