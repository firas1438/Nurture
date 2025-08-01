
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
      <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">Are you currently taking any medications?</h2>
      <p className="text-black mb-6 text-center">This helps us identify potential interactions or concerns.</p>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full ${takingMedications ? 'bg-blue-500 text-white' : 'bg-white border border-blue-200 text-blue-700'}`}
          onClick={() => onTakingMedicationsChange(true)}
        >
          Yes
        </button>
        <button
          className={`px-5 py-2 rounded-full ${!takingMedications ? 'bg-blue-500 text-white' : 'bg-white border border-blue-200 text-blue-700'}`}
          onClick={() => onTakingMedicationsChange(false)}
        >
          No
        </button>
      </div>
      
      {takingMedications && (
        <div className="w-full animate-fade-in">
          <p className=" text-sm mb-2 mt-6">Please list all medications you're currently taking:</p>
          
          <div className="flex mb-2">
            <input
              type="text"
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              className="flex-1 px-3 py-2 border border-blue-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Medication name"
              onKeyDown={(e) => e.key === 'Enter' && handleAddMedication()}
            />
            <button
              onClick={handleAddMedication}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          
          {medications.length > 0 ? (
            <div className="mt-4 space-y-2">
              {medications.map((med, index) => (
                <div key={index} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                  <span className="text-black">{med}</span>
                  <button
                    onClick={() => handleRemoveMedication(med)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-orange-500 italic mt-4">No medications added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationQuestion;
