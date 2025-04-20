import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import AgeQuestion from './questions/AgeQuestion';
import PreExistingConditionsQuestion from './questions/PreExistingConditionsQuestion';
import PregnancyQuestion from './questions/PregnancyQuestion';
import MedicationQuestion from './questions/MedicationQuestion';

export type FormData = {
  age: number | null;
  hasPreExistingConditions: boolean;
  conditions: string[];
  isPregnant: boolean;
  pregnancyWeek: number | null;
  takingMedications: boolean;
  medications: string[];
};

const initialFormData: FormData = {
  age: null,
  hasPreExistingConditions: false,
  conditions: [],
  isPregnant: false,
  pregnancyWeek: null,
  takingMedications: false,
  medications: [],
};

const AssessmentForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 0 && !formData.age) {
      toast.error('Please enter your age to continue');
      return;
    }

    if (step === 2 && formData.isPregnant && !formData.pregnancyWeek) {
      toast.error('Please select your pregnancy week to continue');
      return;
    }

    setDirection('forward');

    if (step === (formData.isPregnant ? 3 : 2)) {
      // Form completed, save data and redirect
      localStorage.setItem('assessmentData', JSON.stringify(formData));
      toast.success('Assessment completed successfully!');
      navigate('/chatbot');
      return;
    }

    setStep((prev) => {
      // Skip pregnancy week step if not pregnant
      if (step === 2 && !formData.isPregnant) {
        return prev + 1;
      }
      return prev + 1;
    });
  };

  const prevStep = () => {
    if (step === 0) return;

    setDirection('backward');
    setStep((prev) => {
      // Skip pregnancy week step when going back if not pregnant
      if (step === 3 && !formData.isPregnant) {
        return prev - 1;
      }
      return prev - 1;
    });
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <AgeQuestion
            value={formData.age}
            onChange={(value) => updateFormData('age', value)}
          />
        );
      case 1:
        return (
          <PreExistingConditionsQuestion
            hasConditions={formData.hasPreExistingConditions}
            conditions={formData.conditions}
            onHasConditionsChange={(value) => updateFormData('hasPreExistingConditions', value)}
            onConditionsChange={(value) => updateFormData('conditions', value)}
          />
        );
      case 2:
        return (
          <PregnancyQuestion
            isPregnant={formData.isPregnant}
            week={formData.pregnancyWeek}
            onPregnancyStatusChange={(value) => updateFormData('isPregnant', value)}
            onPregnancyWeekChange={(value) => updateFormData('pregnancyWeek', value)}
          />
        );
      case 3:
        return (
          <MedicationQuestion
            takingMedications={formData.takingMedications}
            medications={formData.medications}
            onTakingMedicationsChange={(value) => updateFormData('takingMedications', value)}
            onMedicationsChange={(value) => updateFormData('medications', value)}
          />
        );
      default:
        return null;
    }
  };

  const getProgress = () => {
    const totalSteps = formData.isPregnant ? 4 : 3; // Adjusted for combined PregnancyQuestion
    return ((step + 1) / totalSteps) * 100;
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="form-container">
        <div className="w-full bg-blue-100 h-2 rounded-full mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>

        <div className={`transition-opacity duration-500 ${direction === 'forward' ? 'animate-fade-in' : 'animate-slide-in'}`}>
          {getStepContent()}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className={`px-4 py-2 rounded-full border border-blue-200 text-blue-700 ${step === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}`}
            disabled={step === 0}
          >
            Back
          </button>

          <button onClick={nextStep} className="form-button">
            {step === (formData.isPregnant ? 3 : 2) ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;