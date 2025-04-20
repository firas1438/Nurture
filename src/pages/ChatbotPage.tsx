
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/chatbot/Chatbot';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const hasCompletedAssessment = localStorage.getItem('assessmentData') !== null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-2">AI Health Assistant</h1>
          <p className="text-blue-600 text-center mb-8">Get personalized advice and support for your pregnancy journey</p>
          
          {!hasCompletedAssessment ? (
            <div className="max-w-2xl mx-auto bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Complete Your Assessment First</h2>
              <p className="text-blue-700 mb-4">
                To get the most personalized advice, please complete a brief health assessment. 
                This will help our AI tailor recommendations specifically for you.
              </p>
              <button
                onClick={() => navigate('/assessment')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          ) : (
            <Chatbot />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
