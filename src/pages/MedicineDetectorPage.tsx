
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MedicineDetector from '../components/medicine/MedicineDetector';

const MedicineDetectorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-2">Medicine Safety Detector</h1>
          <p className="text-blue-600 text-center mb-8">Check if medications are safe for use during pregnancy</p>
          
          <MedicineDetector />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineDetectorPage;
