import React, { useState, useRef } from 'react';
import { X, FileText, Upload, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseGeminiResponse } from '@/lib/parse_gemni_response';

type DetectionResult = {
  name: string;
  safetyRating: 'safe' | 'caution' | 'unsafe';
  description: string;
};

// Mock detection results for demonstration
const mockDetectionResults: DetectionResult[] = [
  {
    name: "Prenatal Vitamin",
    safetyRating: "safe",
    description: "Prenatal vitamins are generally safe and recommended during pregnancy. They contain important nutrients like folic acid, iron, and calcium."
  },
  {
    name: "Paracetamol (Acetaminophen)",
    safetyRating: "caution",
    description: "Paracetamol is generally considered safe during pregnancy when used as directed, but should only be taken when necessary and at the lowest effective dose."
  },
  {
    name: "Ibuprofen",
    safetyRating: "unsafe",
    description: "Ibuprofen is not recommended during pregnancy, especially in the third trimester. It may cause complications including reduced amniotic fluid and premature closure of a vessel in the fetus's heart."
  }
];

const MedicineDetector = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async() => {
        const imageDataUrl = reader.result as string;
        setCapturedImage(imageDataUrl);
        await detectMedicine(file);
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const detectMedicine = async (file:File) => {
    setLoading(true);
    // Simulate API call delay
    const GEMINI_API_KEY =import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    try{
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const imageBase64 = await convertImageToBase64(file);

      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: file.type,
        },
      };

      const prompt = `
Analyze this medication packaging and return ONLY valid JSON:
{
  "nom": "Medication name",
  "paragraphe": "Description of pregnancy effects (3-5 sentences in English)",
  "alert": "safe/warning/danger"
}

Strict rules:
- "paragraph" must be in clear English
- "alert" level based on risk category
- No comments outside JSON
- No additional elements
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    const parse_gemini = parseGeminiResponse(text);
    const medicationData: DetectionResult = {
      name: parse_gemini.nom || 'Unknown',
      safetyRating: parse_gemini.alert === 'safe' ? 'safe' : parse_gemini.alert === 'warning' ? 'caution' : 'unsafe',
      description: parse_gemini.paragraphe || 'No description available.'
    };
    setDetectionResult(medicationData);

    }
    catch(error){
      toast.error("Error during image detection: " + error.message);
    }
    finally {
      setLoading(false);
    }

  };


  const resetDetection = () => {
    setCapturedImage(null);
    setDetectionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
  };

  const getSafetyBadge = (safety: 'safe' | 'caution' | 'unsafe') => {
    const badgeStyles = {
      safe: 'bg-green-100 text-green-800',
      caution: 'bg-yellow-100 text-yellow-800',
      unsafe: 'bg-red-100 text-red-800',
    };

    const iconStyles = 'w-5 h-5 mr-1.5';

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          badgeStyles[safety]
        } animate-pulse`}
      >
        {safety === 'safe' && <CheckCircle className={iconStyles} />}
        {safety === 'caution' && <AlertCircle className={iconStyles} />}
        {safety === 'unsafe' && <XCircle className={iconStyles} />}
        {safety === 'safe' && 'Safe'}
        {safety === 'caution' && 'Use with Caution'}
        {safety === 'unsafe' && 'Not Recommended'}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-100 p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                Medicine Safety Detector
              </h2>
              <p className="text-xs text-gray-600">
                Upload an image of your medication to check if it's safe during
                pregnancy.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!capturedImage ? (
            <div
              className={`text-center py-10 border-2 border-dashed rounded-lg transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Medicine Detection
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Drag and drop a clear image of the medicine packaging or label
                here, or click to upload.
              </p>
              <label
                htmlFor="image-upload"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : null}

          {capturedImage && (
            <div className="mt-4 animate-fade-in">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Uploaded medicine"
                  className="max-w-full max-h-96 object-contain rounded-lg mx-auto"
                />
                {!detectionResult && !loading && (
                  <button
                    onClick={resetDetection}
                    className="absolute top-2 right-2 p-2 bg-white/80 text-gray-600 rounded-full shadow-sm hover:bg-white hover:text-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {loading && (
                <div className="mt-6 text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-900">Analyzing image...</p>
                </div>
              )}

              {detectionResult && (
                <div className="mt-6 bg-blue-50 p-6 rounded-xl animate-fade-in">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {detectionResult.name}
                      </h3>
                      <div className="mt-4">
                        {getSafetyBadge(detectionResult.safetyRating)}
                      </div>
                    </div>
                    <button
                      onClick={resetDetection}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="prose prose-sm text-gray-900">
                    <p>{detectionResult.description}</p>
                  </div>

                  <div className="mt-6 bg-blue-100 p-4 rounded-lg text-sm text-gray-900">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p>
                        <span className="font-medium">Note:</span> This
                        information is provided for educational purposes only.
                        Always consult with your healthcare provider before
                        taking any medication during pregnancy.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={resetDetection}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Upload Another Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetector;