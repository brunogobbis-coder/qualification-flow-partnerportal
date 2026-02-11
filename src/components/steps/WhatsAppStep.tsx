'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { PhoneInput } from '@/components/ui';
import type { StepProps } from '@/types/qualification';

interface WhatsAppStepProps extends StepProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function WhatsAppStep({
  value,
  onChange,
  onNext,
  onBack,
  isSubmitting = false,
  submitError,
}: WhatsAppStepProps) {
  const [phoneError, setPhoneError] = useState<string>();
  const [touched, setTouched] = useState(false);

  // Validate phone number
  useEffect(() => {
    if (touched) {
      if (!value) {
        setPhoneError('Por favor, informe seu número de WhatsApp');
      } else if (!isValidPhoneNumber(value)) {
        setPhoneError('Por favor, insira um número de telefone válido');
      } else {
        setPhoneError(undefined);
      }
    }
  }, [value, touched]);

  const isValid = value ? isValidPhoneNumber(value) : false;
  const canProceed = isValid && !isSubmitting;

  const handleSubmit = () => {
    setTouched(true);
    if (canProceed) {
      onNext();
    }
  };

  const handlePhoneChange = (newValue: string | undefined) => {
    onChange(newValue);
    if (newValue) {
      setTouched(true);
    }
  };

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
          Qual é o seu WhatsApp?
        </h2>
        <p className="mt-2 text-gray-600">
          Usaremos este número para entrar em contato com você sobre oportunidades e atualizações do programa
        </p>
      </div>

      {/* Phone Input */}
      <PhoneInput
        name="whatsapp"
        value={value}
        onChange={handlePhoneChange}
        placeholder="Seu número de WhatsApp"
        defaultCountry="BR"
        error={phoneError}
        required
        helperText="Selecione seu país e insira o número com DDD"
      />

      {/* WhatsApp Icon/Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <svg
          className="h-8 w-8 flex-shrink-0 text-green-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <div>
          <p className="font-medium text-green-800">
            Comunicação via WhatsApp
          </p>
          <p className="text-sm text-green-700">
            Você receberá atualizações importantes e suporte direto
          </p>
        </div>
      </motion.div>

      {/* Submit Error */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">{submitError}</p>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="btn-secondary"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary min-w-[140px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enviando...
            </span>
          ) : (
            'Finalizar'
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default WhatsAppStep;
