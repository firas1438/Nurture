import React, { useState, useRef } from 'react';
import { X, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setCapturedImage(imageDataUrl);
        detectMedicine(imageDataUrl);
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const detectMedicine = (imageUrl: string) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const randomResult = mockDetectionResults[Math.floor(Math.random() * mockDetectionResults.length)];
      setDetectionResult(randomResult);
      setLoading(false);
    }, 2000);
  };

  const resetDetection = () => {
    setCapturedImage(null);
    setDetectionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
  };

  const getSafetyBadge = (safety: 'safe' | 'caution' | 'unsafe') => {
    switch (safety) {
      case 'safe':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Safe
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Use with Caution
          </span>
        );
      case 'unsafe':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Not Recommended
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-beige-100">
        <div className="bg-beige-50 p-4 border-b border-beige-100">
          <h2 className="font-semibold text-beige-800 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            <span>Medicine Safety Detector</span>
          </h2>
          <p className="text-sm text-beige-600 mt-1">
            Upload an image of your medication to check if it's safe during pregnancy.
          </p>
        </div>

        <div className="p-6">
          {!capturedImage ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-beige-500" />
              </div>
              <h3 className="text-xl font-medium text-beige-800 mb-2">Medicine Detection</h3>
              <p className="text-beige-600 max-w-md mx-auto mb-6">
                Upload a clear image of the medicine packaging or label to get information about its safety during pregnancy.
              </p>
              <label
                htmlFor="image-upload"
                className="px-6 py-3 bg-beige-500 text-white rounded-full font-medium shadow-md hover:bg-beige-600 transition-colors cursor-pointer"
              >
                Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : null}

          {capturedImage && (
            <div className="mt-4 animate-fade-in">
              <div className="relative">
                <img src={capturedImage} alt="Uploaded medicine" className="w-full h-auto rounded-lg" />
                {!detectionResult && !loading && (
                  <button
                    onClick={resetDetection}
                    className="absolute top-2 right-2 p-2 bg-white/80 text-beige-700 rounded-full shadow-sm hover:bg-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {loading && (
                <div className="mt-6 text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beige-500 mx-auto mb-4"></div>
                  <p className="text-beige-700">Analyzing image...</p>
                </div>
              )}

              {detectionResult && (
                <div className="mt-6 bg-beige-50 p-6 rounded-xl animate-fade-in">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-beige-800">{detectionResult.name}</h3>
                      <div className="mt-1">
                        {getSafetyBadge(detectionResult.safetyRating)}
                      </div>
                    </div>
                    <button
                      onClick={resetDetection}
                      className="p-2 text-beige-500 hover:text-beige-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="prose prose-sm text-beige-700">
                    <p>{detectionResult.description}</p>
                  </div>

                  <div className="mt-6 bg-beige-100 p-4 rounded-lg text-sm text-beige-700">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 mr-2 text-beige-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <span className="font-medium">Note:</span> This information is provided for educational purposes only. Always consult with your healthcare provider before taking any medication during pregnancy.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={resetDetection}
                      className="px-6 py-2 bg-beige-500 text-white rounded-full font-medium shadow-md hover:bg-beige-600 transition-colors"
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