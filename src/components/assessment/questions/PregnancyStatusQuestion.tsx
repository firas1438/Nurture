
import React from 'react';

interface PregnancyStatusQuestionProps {
  isPregnant: boolean;
  onChange: (value: boolean) => void;
}

const PregnancyStatusQuestion: React.FC<PregnancyStatusQuestionProps> = ({ isPregnant, onChange }) => {
  return (
    <div className="form-question">
      <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center">Are you currently pregnant?</h2>
      <p className="text-beige-600 mb-8 text-center">Your answer will help us tailor our assistance to your needs.</p>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <button
          className={`px-6 py-4 rounded-xl flex flex-col items-center justify-center transition-all ${
            isPregnant 
              ? 'bg-beige-500 text-white ring-2 ring-beige-500 ring-offset-2' 
              : 'bg-white border border-beige-200 text-beige-700 hover:bg-beige-50'
          }`}
          onClick={() => onChange(true)}
        >
          <span className="text-2xl mb-2">🤰</span>
          <span className={`font-medium ${isPregnant ? 'text-white' : 'text-beige-800'}`}>Yes</span>
        </button>
        
        <button
          className={`px-6 py-4 rounded-xl flex flex-col items-center justify-center transition-all ${
            !isPregnant 
              ? 'bg-beige-500 text-white ring-2 ring-beige-500 ring-offset-2' 
              : 'bg-white border border-beige-200 text-beige-700 hover:bg-beige-50'
          }`}
          onClick={() => onChange(false)}
        >
          <span className="text-2xl mb-2">👩</span>
          <span className={`font-medium ${!isPregnant ? 'text-white' : 'text-beige-800'}`}>No</span>
        </button>
      </div>
    </div>
  );
};

export default PregnancyStatusQuestion;
