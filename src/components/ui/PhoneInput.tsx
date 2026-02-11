'use client';

import { useState, useCallback, forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import PhoneInputLib, { 
  type Country,
  getCountryCallingCode,
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  /** Input name attribute */
  name?: string;
  /** Current phone value (E.164 format) */
  value?: string;
  /** Callback when phone changes */
  onChange: (value: string | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Default country code */
  defaultCountry?: Country;
  /** Optional error message */
  error?: string;
  /** Optional class name for styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Label for the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Required field */
  required?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      name = 'phone',
      value,
      onChange,
      placeholder = 'Seu número de WhatsApp',
      defaultCountry = 'BR',
      error,
      className,
      disabled = false,
      label,
      helperText,
      required = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<string | undefined>(value);

    const handleChange = useCallback(
      (newValue: string | undefined) => {
        setInternalValue(newValue);
        onChange(newValue);
      },
      [onChange]
    );

    const isValid = internalValue ? isValidPhoneNumber(internalValue) : false;
    const formattedDisplay = internalValue ? formatPhoneNumberIntl(internalValue) : '';

    return (
      <div className={clsx('w-full', className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div
          className={clsx(
            'relative rounded-lg border-2 transition-all duration-200',
            {
              'border-blue-500 ring-2 ring-blue-500/20': isFocused && !error,
              'border-red-500 ring-2 ring-red-500/20': error,
              'border-gray-200 hover:border-gray-300': !isFocused && !error && !disabled,
              'border-gray-100 bg-gray-50 opacity-60': disabled,
            }
          )}
        >
          <PhoneInputLib
            international
            countryCallingCodeEditable={false}
            defaultCountry={defaultCountry}
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="phone-input-wrapper"
            numberInputProps={{
              name,
              id: name,
              className: clsx(
                'w-full rounded-r-lg border-0 bg-transparent px-4 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400',
                { 'cursor-not-allowed': disabled }
              ),
            }}
          />

          {/* Validation Indicator */}
          {internalValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {isValid ? (
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </div>

        {/* Formatted Display */}
        {internalValue && isValid && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-gray-500"
          >
            Número formatado: <span className="font-medium text-gray-700">{formattedDisplay}</span>
          </motion.p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-1 text-sm text-red-600"
            role="alert"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}

        {/* Custom Styles for react-phone-number-input */}
        <style jsx global>{`
          .phone-input-wrapper {
            display: flex;
            align-items: center;
          }

          .phone-input-wrapper .PhoneInputCountry {
            display: flex;
            align-items: center;
            padding-left: 12px;
            padding-right: 8px;
            border-right: 1px solid #e5e7eb;
            margin-right: 0;
          }

          .phone-input-wrapper .PhoneInputCountrySelect {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 1;
          }

          .phone-input-wrapper .PhoneInputCountryIcon {
            width: 24px;
            height: 18px;
            border-radius: 2px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .phone-input-wrapper .PhoneInputCountrySelectArrow {
            display: block;
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #6b7280;
            margin-left: 8px;
          }

          .phone-input-wrapper input::placeholder {
            color: #9ca3af;
          }

          .phone-input-wrapper input:focus {
            outline: none;
          }
        `}</style>
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
