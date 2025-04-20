import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection

interface PregnancyQuestionProps {
  isPregnant: boolean;
  week: number | null;
  onPregnancyStatusChange: (value: boolean) => void;
  onPregnancyWeekChange: (value: number) => void;
}

const PregnancyQuestion: React.FC<PregnancyQuestionProps> = ({
  isPregnant,
  week,
  onPregnancyStatusChange,
  onPregnancyWeekChange,
}) => {
  const navigate = useNavigate(); // For redirecting to MedicationQuestion
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(
    week ? (week <= 12 ? 1 : week <= 27 ? 2 : 3) : null
  );

  const selectTrimester = (trimester: number) => {
    setSelectedTrimester(trimester);
    // Set to middle of trimester as default
    onPregnancyWeekChange(trimester === 1 ? 6 : trimester === 2 ? 20 : 34);
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
        return 'First Trimester (Weeks 1-12)';
      case 2:
        return 'Second Trimester (Weeks 13-27)';
      case 3:
        return 'Third Trimester (Weeks 28-40+)';
      default:
        return '';
    }
  };

  const handlePregnancyStatusChange = (value: boolean) => {
    onPregnancyStatusChange(value);
    if (!value) {
      // If not pregnant, redirect to MedicationQuestion
      navigate('/medications'); // Adjust the path based on your routing setup
    }
  };

  return (
    <div className="form-question">
      <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center">
        Are you currently pregnant?
      </h2>
      <p className="text-beige-600 mb-8 text-center">
        Your answer will help us tailor our assistance to your needs.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <button
          className={`px-6 py-4 rounded-xl flex flex-col items-center justify-center transition-all ${
            isPregnant
              ? 'bg-beige-500 text-white ring-2 ring-beige-500 ring-offset-2'
              : 'bg-white border border-beige-200 text-beige-700 hover:bg-beige-50'
          }`}
          onClick={() => handlePregnancyStatusChange(true)}
          aria-pressed={isPregnant}
          aria-label="Pregnant"
        >
          <span className="text-2xl mb-2">🤰</span>
          <span className={`font-medium ${isPregnant ? 'text-white' : 'text-beige-800'}`}>
            Yes
          </span>
        </button>

        <button
          className={`px-6 py-4 rounded-xl flex flex-col items-center justify-center transition-all ${
            !isPregnant
              ? 'bg-beige-500 text-white ring-2 ring-beige-500 ring-offset-2'
              : 'bg-white border border-beige-200 text-beige-700 hover:bg-beige-50'
          }`}
          onClick={() => handlePregnancyStatusChange(false)}
          aria-pressed={!isPregnant}
          aria-label="Not pregnant"
        >
          <span className="text-2xl mb-2">👩</span>
          <span className={`font-medium ${!isPregnant ? 'text-white' : 'text-beige-800'}`}>
            No
          </span>
        </button>
      </div>

      {isPregnant && (
        <div className="mt-8 w-full animate-fade-in">
          <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center">
            How far along are you?
          </h2>
          <p className="text-beige-600 mb-6 text-center">
            This helps us provide stage-appropriate advice.
          </p>

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
                    {trimester === 1
                      ? 'Early development stage'
                      : trimester === 2
                      ? 'Baby growth & movement'
                      : 'Final preparation for birth'}
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
                    onClick={() => onPregnancyWeekChange(weekNum)}
                  >
                    {weekNum}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PregnancyQuestion;