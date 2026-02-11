'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { CheckboxOption } from '@/types/qualification';

interface CheckboxGroupProps<T extends string = string> {
  /** Unique name for the checkbox group */
  name: string;
  /** Available options */
  options: CheckboxOption<T>[];
  /** Currently selected values */
  value: T[];
  /** Callback when selection changes */
  onChange: (values: T[]) => void;
  /** Minimum number of selections required */
  minSelections?: number;
  /** Maximum number of selections allowed */
  maxSelections?: number;
  /** Optional error message */
  error?: string;
  /** Optional class name for styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
}

export function CheckboxGroup<T extends string = string>({
  name,
  options,
  value = [],
  onChange,
  minSelections = 0,
  maxSelections,
  error,
  className,
  disabled = false,
  direction = 'vertical',
}: CheckboxGroupProps<T>) {
  const handleToggle = (optionValue: T) => {
    if (disabled) return;

    const isCurrentlySelected = value.includes(optionValue);

    if (isCurrentlySelected) {
      // Remove from selection
      onChange(value.filter((v) => v !== optionValue));
    } else {
      // Add to selection (respecting maxSelections)
      if (maxSelections && value.length >= maxSelections) {
        // Replace the first selection if max is reached
        onChange([...value.slice(1), optionValue]);
      } else {
        onChange([...value, optionValue]);
      }
    }
  };

  return (
    <div
      role="group"
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
      {/* Selection Info */}
      {(minSelections > 0 || maxSelections) && (
        <p className="mb-2 text-sm text-gray-500">
          {minSelections > 0 && maxSelections
            ? `Selecione entre ${minSelections} e ${maxSelections} opções`
            : minSelections > 0
            ? `Selecione pelo menos ${minSelections} opção${minSelections > 1 ? 'ões' : ''}`
            : maxSelections
            ? `Selecione até ${maxSelections} opção${maxSelections > 1 ? 'ões' : ''}`
            : null}
          <span className="ml-2 font-medium text-gray-700">
            ({value.length} selecionado{value.length !== 1 ? 's' : ''})
          </span>
        </p>
      )}

      {options.map((option, index) => {
        const isSelected = value.includes(option.value);
        const isMaxReached = maxSelections ? value.length >= maxSelections : false;
        const isDisabledOption = disabled || (isMaxReached && !isSelected);

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
                  !isSelected && !isDisabledOption,
                'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60': isDisabledOption,
              }
            )}
          >
            <input
              type="checkbox"
              name={`${name}-${option.value}`}
              value={option.value}
              checked={isSelected}
              onChange={() => handleToggle(option.value)}
              disabled={isDisabledOption}
              className="sr-only"
              aria-describedby={option.description ? `${name}-${option.value}-desc` : undefined}
            />

            {/* Custom Checkbox */}
            <span
              className={clsx(
                'mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors',
                {
                  'border-blue-500 bg-blue-500': isSelected,
                  'border-gray-300 bg-white': !isSelected,
                }
              )}
            >
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-3.5 w-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
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

            {/* Selection Order Badge */}
            {isSelected && value.length > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
              >
                {value.indexOf(option.value) + 1}
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

export default CheckboxGroup;
