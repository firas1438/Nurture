interface MedicationData {
    nom : string | null;
    paragraphe: string | null;
    alert: string | null;
  }
  
export const parseGeminiResponse = (text: string): MedicationData => {
    try {
      // Nettoyage du texte (supprime les ```json le cas échéant)
      const cleanedText = text.replace(/```json|```/g, '').trim();
      const data: MedicationData = JSON.parse(cleanedText);
      
      // Validation minimale
      if (typeof data.paragraphe !== 'string' && data.paragraphe !== null) {
        throw new Error("Format invalide : champ 'paragraphe' manquant");
      }
      
      return data;
    } catch (err) {
      console.error("Erreur de parsing JSON :", err);
      return {
        paragraphe: null,
        alert: null,
        nom: null,
      };
    }
  };