
import React from 'react';

interface AgeQuestionProps {
  value: number | null;
  onChange: (value: number) => void;
}

const AgeQuestion: React.FC<AgeQuestionProps> = ({ value, onChange }) => {
  return (
    <div className="form-question">
      <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">What is your age?</h2>
      <p className="text-black mb-6 text-center">This helps us tailor advice to your specific life stage.</p>
      
      <div className="w-full max-w-xs">

        <div className="relative">
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            min="12"
            max="100"
            className="w-full px-4 py-3 mt-4 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-lg"
            placeholder="Enter your age"
          />
        </div>

      </div>
    </div>
  );
};

export default AgeQuestion;
