
import React, { useState } from 'react';

interface MedicationQuestionProps {
  takingMedications: boolean;
  medications: string[];
  onTakingMedicationsChange: (value: boolean) => void;
  onMedicationsChange: (value: string[]) => void;
}

const MedicationQuestion: React.FC<MedicationQuestionProps> = ({ 
  takingMedications, 
  medications, 
  onTakingMedicationsChange, 
  onMedicationsChange 
}) => {
  const [newMed, setNewMed] = useState('');

  const handleAddMedication = () => {
    if (newMed.trim()) {
      onMedicationsChange([...medications, newMed.trim()]);
      setNewMed('');
    }
  };

  const handleRemoveMedication = (med: string) => {
    onMedicationsChange(medications.filter(m => m !== med));
  };

  return (
    <div className="form-question">
      <h2 className="text-2xl font-semibold text-beige-800 mb-3 text-center">Are you currently taking any medications?</h2>
      <p className="text-beige-600 mb-6 text-center">This helps us identify potential interactions or concerns.</p>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full ${takingMedications ? 'bg-beige-500 text-white' : 'bg-white border border-beige-200 text-beige-700'}`}
          onClick={() => onTakingMedicationsChange(true)}
        >
          Yes
        </button>
        <button
          className={`px-5 py-2 rounded-full ${!takingMedications ? 'bg-beige-500 text-white' : 'bg-white border border-beige-200 text-beige-700'}`}
          onClick={() => onTakingMedicationsChange(false)}
        >
          No
        </button>
      </div>
      
      {takingMedications && (
        <div className="w-full animate-fade-in">
          <p className="text-beige-700 text-sm mb-2">Please list all medications you're currently taking:</p>
          
          <div className="flex mb-2">
            <input
              type="text"
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              className="flex-1 px-3 py-2 border border-beige-200 rounded-l-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent outline-none"
              placeholder="Medication name"
              onKeyDown={(e) => e.key === 'Enter' && handleAddMedication()}
            />
            <button
              onClick={handleAddMedication}
              className="px-4 py-2 bg-beige-500 text-white rounded-r-lg hover:bg-beige-600"
            >
              Add
            </button>
          </div>
          
          {medications.length > 0 ? (
            <div className="mt-4 space-y-2">
              {medications.map((med, index) => (
                <div key={index} className="flex justify-between items-center bg-beige-50 p-3 rounded-lg">
                  <span className="text-beige-800">{med}</span>
                  <button
                    onClick={() => handleRemoveMedication(med)}
                    className="text-beige-500 hover:text-beige-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-beige-600 italic mt-2">No medications added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationQuestion;
