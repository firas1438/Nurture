
import React, { useState } from 'react';

interface PregnancyStageQuestionProps {
  week: number | null;
  onChange: (value: number) => void;
}

const PregnancyStageQuestion: React.FC<PregnancyStageQuestionProps> = ({ week, onChange }) => {
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(
    week ? (week <= 12 ? 1 : week <= 27 ? 2 : 3) : null
  );

  const selectTrimester = (trimester: number) => {
    setSelectedTrimester(trimester);
    // Set to middle of trimester as default
    onChange(trimester === 1 ? 6 : trimester === 2 ? 20 : 34);
  };

  const getWeeksByTrimester = () => {
    switch (selectedTrimester) {
      case 1:
        return Array.from({ length: 12 }, (_, i) => i + 1);
      case 2:
        return Array.from({ length: 15 }, (_, i) => i + 13);
      case 3:
        return Array.from({ length: 14 }, (_, i) => i + 28);
      default:
        return [];
    }
  };

  const getTrimesterName = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "First Trimester (Weeks 1-12)";
      case 2:
        return "Second Trimester (Weeks 13-27)";
      case 3:
        return "Third Trimester (Weeks 28-40+)";
      default:
        return "";
    }
  };

  return (
    <div className="form-question">
      <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center mt-6">How far along are you?</h2>
      <p className="text-beige-600 mb-6 text-center">This helps us provide stage-appropriate advice.</p>
      
      {!selectedTrimester ? (
        <div className="space-y-4 w-full">
          <p className="text-beige-700 text-sm mb-1">Select your trimester:</p>
          {[1, 2, 3].map((trimester) => (
            <button
              key={trimester}
              className="w-full p-4 border border-beige-200 rounded-xl bg-white hover:bg-beige-50 text-left transition-colors"
              onClick={() => selectTrimester(trimester)}
            >
              <div className="font-medium text-beige-800">{getTrimesterName(trimester)}</div>
              <div className="text-sm text-beige-600 mt-1">
                {trimester === 1 ? "Early development stage" : 
                 trimester === 2 ? "Baby growth & movement" : 
                 "Final preparation for birth"}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 w-full animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-beige-700">{getTrimesterName(selectedTrimester)}</h3>
            <button 
              className="text-sm text-beige-500 hover:text-beige-700"
              onClick={() => setSelectedTrimester(null)}
            >
              Change
            </button>
          </div>
          
          <p className="text-beige-700 text-sm mb-1">Select your current week:</p>
          <div className="grid grid-cols-4 gap-2">
            {getWeeksByTrimester().map((weekNum) => (
              <div
                key={weekNum}
                className={`p-2 border rounded-lg cursor-pointer text-center transition-colors ${
                  week === weekNum 
                    ? 'bg-beige-500 border-beige-500 text-white' 
                    : 'bg-white border-beige-100 text-beige-700 hover:bg-beige-50'
                }`}
                onClick={() => onChange(weekNum)}
              >
                {weekNum}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyStageQuestion;
