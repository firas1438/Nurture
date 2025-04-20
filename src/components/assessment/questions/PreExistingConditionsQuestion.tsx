
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
      <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center">Do you have any pre-existing health conditions?</h2>
      <p className="text-beige-600 mb-6 text-center">This information helps us provide more personalized advice.</p>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full ${hasConditions ? 'bg-beige-500 text-white' : 'bg-white border border-beige-200 text-beige-700'}`}
          onClick={() => onHasConditionsChange(true)}
        >
          Yes
        </button>
        <button
          className={`px-5 py-2 rounded-full ${!hasConditions ? 'bg-beige-500 text-white' : 'bg-white border border-beige-200 text-beige-700'}`}
          onClick={() => onHasConditionsChange(false)}
        >
          No
        </button>
      </div>
      
      {hasConditions && (
        <div className="w-full space-y-4 animate-fade-in">
          <p className="text-beige-700 text-sm">Select all that apply:</p>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            {commonConditions.map((condition) => (
              <div 
                key={condition}
                className={`px-3 py-2 border rounded-lg cursor-pointer transition-colors text-sm text-center ${
                  conditions.includes(condition) 
                    ? 'bg-beige-100 border-beige-300 text-beige-800' 
                    : 'bg-white border-beige-100 text-beige-600'
                }`}
                onClick={() => handleConditionToggle(condition)}
              >
                {condition}
              </div>
            ))}
          </div>
          
          <div>
            <p className="text-beige-700 text-sm mb-1">Other condition (press Enter to add):</p>
            <input
              type="text"
              className="w-full px-3 py-2 border border-beige-200 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent outline-none"
              placeholder="Type and press Enter"
              onKeyDown={handleCustomCondition}
            />
          </div>
          
          {conditions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {conditions.map((condition) => (
                <div key={condition} className="bg-beige-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>{condition}</span>
                  <button 
                    className="ml-2 text-beige-500"
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
