
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AssessmentForm from '../components/assessment/AssessmentForm';

const AssessmentPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-beige-800 text-center mb-8">Health Assessment</h1>
          <AssessmentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentPage;
