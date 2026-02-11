'use client';

import { motion } from 'framer-motion';
import { RadioGroup } from '@/components/ui';
import type { AuthorityTrainingLevel, RadioOption, StepProps } from '@/types/qualification';

interface AuthorityTrainingStepProps extends StepProps {
  value?: AuthorityTrainingLevel;
  onChange: (value: AuthorityTrainingLevel) => void;
}

const authorityTrainingOptions: RadioOption<AuthorityTrainingLevel>[] = [
  {
    value: 'recurring_courses',
    label: 'Sim, dou cursos/mentorias grupais de forma recorrente',
    description: 'Tenho turmas ou grupos de alunos regulares',
  },
  {
    value: 'occasional_workshops',
    label: 'Sim, realizei workshops ou eventos pontuais',
    description: 'Faço eventos ou workshops ocasionalmente',
  },
  {
    value: 'free_tutorials',
    label: 'Não, mas compartilho tutoriais educativos gratuitos',
    description: 'Produzo conteúdo educativo, mas sem cobrar por isso',
  },
  {
    value: 'informative_content',
    label: 'Não, meu conteúdo é puramente informativo ou entretenimento',
    description: 'Meu foco não é educação ou formação de empreendedores',
  },
];

export function AuthorityTrainingStep({
  value,
  onChange,
  onNext,
  onBack,
}: AuthorityTrainingStepProps) {
  const handleSelect = (selected: AuthorityTrainingLevel) => {
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
          Você oferece formações ou treinamentos?
        </h2>
        <p className="mt-2 text-gray-600">
          Nos últimos 6 meses, você realizou alguma formação, workshop ou mentoria paga para sua comunidade?
        </p>
      </div>

      {/* Options */}
      <RadioGroup<AuthorityTrainingLevel>
        name="authorityTraining"
        options={authorityTrainingOptions}
        value={value}
        onChange={handleSelect}
      />

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

export default AuthorityTrainingStep;
