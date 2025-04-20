
import React from 'react';

interface PreExistingConditionsQuestionProps {
  hasConditions: boolean;
  conditions: string[];
  onHasConditionsChange: (value: boolean) => void;
  onConditionsChange: (value: string[]) => void;
}

const commonConditions = [
  "Diabetes", 
  "Hypertension", 
  "Thyroid disorders", 
  "Asthma", 
  "Heart disease", 
  "Autoimmune conditions"
];

const PreExistingConditionsQuestion: React.FC<PreExistingConditionsQuestionProps> = ({ 
  hasConditions, 
  conditions, 
  onHasConditionsChange, 
  onConditionsChange 
}) => {
  const handleConditionToggle = (condition: string) => {
    if (conditions.includes(condition)) {
      onConditionsChange(conditions.filter(c => c !== condition));
    } else {
      onConditionsChange([...conditions, condition]);
    }
  };

  const handleCustomCondition = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      const newCondition = e.currentTarget.value.trim();
      if (!conditions.includes(newCondition)) {
        onConditionsChange([...conditions, newCondition]);
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="form-question">
      <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">Do you have any pre-existing health conditions?</h2>
      <p className="text-black mb-6 text-center">This information helps us provide more personalized advice.</p>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full ${hasConditions ? 'bg-blue-500 text-white' : 'bg-white border border-blue-200 text-blue-700'}`}
          onClick={() => onHasConditionsChange(true)}
        >
          Yes
        </button>
        <button
          className={`px-5 py-2 rounded-full ${!hasConditions ? 'bg-blue-500 text-white' : 'bg-white border border-blue-200 text-blue-700'}`}
          onClick={() => onHasConditionsChange(false)}
        >
          No
        </button>
      </div>
      
      {hasConditions && (
        <div className="w-full space-y-4 animate-fade-in">
          <p className="text-blue-700 text-sm mt-4">Select all that apply:</p>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            {commonConditions.map((condition) => (
              <div 
                key={condition}
                className={`px-3 py-2 border rounded-lg cursor-pointer transition-colors text-sm text-center ${
                  conditions.includes(condition) 
                    ? 'bg-blue-100 border-blue-300 text-blue-800' 
                    : 'bg-white border-blue-100 text-blue-600'
                }`}
                onClick={() => handleConditionToggle(condition)}
              >
                {condition}
              </div>
            ))}
          </div>
          

          
          {conditions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {conditions.map((condition) => (
                <div key={condition} className="bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{condition}</span>
                  <button 
                    className="ml-2 text-blue-500"
                    onClick={() => onConditionsChange(conditions.filter(c => c !== condition))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreExistingConditionsQuestion;
