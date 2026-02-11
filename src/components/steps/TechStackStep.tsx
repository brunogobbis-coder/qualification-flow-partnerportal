'use client';

import { motion } from 'framer-motion';
import { CheckboxGroup, RadioGroup } from '@/components/ui';
import type { Technology, CheckboxOption, RadioOption, StepProps } from '@/types/qualification';

interface TechStackStepProps extends StepProps {
  technologies: Technology[];
  hasApiExperience?: boolean;
  onTechnologiesChange: (value: Technology[]) => void;
  onHasApiExperienceChange: (value: boolean) => void;
}

const technologyOptions: CheckboxOption<Technology>[] = [
  { value: 'react', label: 'React / React Native' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'dotnet', label: '.NET' },
  { value: 'other', label: 'Outra' },
];

const apiExperienceOptions: RadioOption<'yes' | 'no'>[] = [
  { value: 'yes', label: 'Sim', description: 'Tenho experiência com REST APIs e OAuth' },
  { value: 'no', label: 'Não', description: 'Ainda não tenho experiência, mas estou disposto a aprender' },
];

export function TechStackStep({
  technologies,
  hasApiExperience,
  onTechnologiesChange,
  onHasApiExperienceChange,
  onNext,
  onBack,
}: TechStackStepProps) {
  const handleApiExperienceChange = (value: 'yes' | 'no') => {
    onHasApiExperienceChange(value === 'yes');
  };

  const canProceed = technologies.length > 0 && hasApiExperience !== undefined;

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
          Stack Tecnológica
        </h2>
        <p className="mt-2 text-gray-600">
          Quais tecnologias sua equipe utiliza no desenvolvimento?
        </p>
      </div>

      {/* Technologies */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Tecnologias que você trabalha
        </h3>
        <CheckboxGroup<Technology>
          name="technologies"
          options={technologyOptions}
          value={technologies}
          onChange={onTechnologiesChange}
          minSelections={1}
        />
      </div>

      {/* API Experience */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Experiência com APIs REST e OAuth?
        </h3>
        <RadioGroup<'yes' | 'no'>
          name="hasApiExperience"
          options={apiExperienceOptions}
          value={hasApiExperience === undefined ? undefined : hasApiExperience ? 'yes' : 'no'}
          onChange={handleApiExperienceChange}
        />
      </div>

      {/* Developer Resources Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4"
      >
        <div className="flex items-start gap-3">
          <svg className="h-6 w-6 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-purple-900">Recursos para Desenvolvedores</h4>
            <p className="mt-1 text-sm text-purple-700">
              Após aprovação, você terá acesso à documentação completa da API, sandbox para testes e suporte técnico dedicado.
            </p>
          </div>
        </div>
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

export default TechStackStep;
