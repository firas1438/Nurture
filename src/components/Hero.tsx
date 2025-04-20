
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-beige-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-beige-200 rounded-full opacity-40 blur-3xl"></div>
      {/* Decorative background elements */}

      
      <div className="container mx-auto px-4 relative z-10">

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-beige-800 mb-6">
              Your AI Companion for a Gentle Birth Journey
            </h1>
            <p className="text-xl text-black mb-8">
              Personalized guidance, health monitoring, and support throughout your pregnancy. 
              Experience the perfect blend of care and technology.
            </p>
            <div className="flex space-x-4">

              <button 
                onClick={() => navigate('/assessment')}
                className="px-48 py-3 bg-beige-500 text-white rounded-full font-medium shadow-lg hover:bg-beige-600 transition-all transform hover:scale-105"
              >
                Start Health Assessment
              </button>


              
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-beige-200 rounded-full animate-pulse-gentle"></div>
              <div className="absolute inset-4 bg-beige-100 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="./mom.png" 
                  alt="Pregnancy illustration" 
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-semibold text-beige-800 mb-3">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-beige-500">1</span>
              </div>
              <h3 className="text-xl font-medium text-beige-800 mb-2">Complete Assessment</h3>
              <p className="text-beige-700">Answer a series of questions about your health and pregnancy to get personalized guidance.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-beige-500">2</span>
              </div>
              <h3 className="text-xl font-medium text-beige-800 mb-2">Get AI Support</h3>
              <p className="text-beige-700">Chat with our specialized AI to get answers to your pregnancy questions and concerns.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-beige-500">3</span>
              </div>
              <h3 className="text-xl font-medium text-beige-800 mb-2">Medicine Safety</h3>
              <p className="text-beige-700">Use our camera feature to scan medications and check if they're safe during pregnancy.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
