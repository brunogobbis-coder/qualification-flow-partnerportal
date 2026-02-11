'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { StepProps } from '@/types/qualification';

interface TechDescriptionStepProps extends StepProps {
  value: string;
  onChange: (value: string) => void;
}

const MIN_LENGTH = 50;
const MAX_LENGTH = 1000;

export function TechDescriptionStep({
  value,
  onChange,
  onNext,
  onBack,
}: TechDescriptionStepProps) {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (touched) {
      if (!value.trim()) {
        setError('Por favor, descreva sua solução');
      } else if (value.length < MIN_LENGTH) {
        setError(`Descreva com pelo menos ${MIN_LENGTH} caracteres (atual: ${value.length})`);
      } else {
        setError(undefined);
      }
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const canProceed = value.trim().length >= MIN_LENGTH;

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
          Descreva sua solução
        </h2>
        <p className="mt-2 text-gray-600">
          Conte-nos brevemente o que você planeja desenvolver e como ajudará os lojistas
        </p>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          rows={6}
          maxLength={MAX_LENGTH}
          placeholder="Ex: Pretendo criar um aplicativo de gestão de estoque que sincroniza automaticamente com os fornecedores, permitindo que os lojistas..."
          className={`${error ? 'input-error' : 'input'} resize-none`}
        />
        <div className="mt-2 flex justify-between text-sm">
          <span className={error ? 'text-red-600' : 'text-gray-500'}>
            {error || `Mínimo de ${MIN_LENGTH} caracteres`}
          </span>
          <span className="text-gray-500">
            {value.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4"
      >
        <h4 className="mb-2 font-medium text-blue-900">Dicas para uma boa descrição:</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Qual problema sua solução resolve?</li>
          <li>• Quem são os lojistas que mais se beneficiarão?</li>
          <li>• O que diferencia sua solução das existentes?</li>
        </ul>
      </motion.div>

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

export default TechDescriptionStep;
