import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/chatbot/Chatbot';

// Animation variants for the main container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger child animations
    },
  },
};

// Animation variants for child elements (heading, description, etc.)
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Animation variants for the assessment prompt and chatbot
const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const ChatbotPage = () => {
  const navigate = useNavigate();
  const hasCompletedAssessment = localStorage.getItem('assessmentData') !== null;

  return (
    <motion.div className="relative flex flex-col min-h-screen overflow-clip" initial="hidden" animate="visible" variants={containerVariants}>

      {/* Decorative Crystal Ball  */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80 rounded-full bg-blue-100/20 blur-3xl animate-float-slow">
            <div className="absolute w-48 h-48 rounded-full bg-blue-200/30 blur-2xl animate-pulse-slow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-32 h-32 rounded-full bg-blue-300/20 blur-xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Main orbiting particles */}
          <div
            className="absolute w-3 h-3 bg-blue-300 rounded-full blur-sm animate-orbit"
            style={{ animationDuration: '9s' }}
          />
          <div
            className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm animate-orbit-delay"
            style={{ animationDuration: '7s', animationDelay: '0.5s' }}
          />
        </div>

        {/* Scattered particles - RIGHT SIDE */}
        <div
          className="absolute top-10 left-10 w-2 h-2 bg-blue-300 rounded-full blur-sm animate-orbit"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute top-1/4 right-20 w-3 h-3 bg-blue-400 rounded-full blur-sm animate-orbit-delay"
          style={{ animationDuration: '10s', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-2 h-2 bg-blue-500 rounded-full blur-sm animate-orbit"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-10 right-10 w-3 h-3 bg-blue-300 rounded-full blur-sm animate-orbit-delay"
          style={{ animationDuration: '11s', animationDelay: '0.7s' }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-orbit"
          style={{ animationDuration: '9s' }}
        />

        {/* Scattered particles - LEFT SIDE */}
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-orbit-delay"
          style={{ animationDuration: '9s', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/3 left-32 w-3 h-3 bg-blue-500 rounded-full blur-sm animate-orbit"
          style={{ animationDuration: '7s' }}
        />
        <div
          className="absolute bottom-32 left-16 w-2 h-2 bg-blue-300 rounded-full blur-sm animate-orbit-delay"
          style={{ animationDuration: '10s', animationDelay: '0.5s' }}
        />
        <div
          className="absolute bottom-20 left-5 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-orbit"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute top-1/2 left-10 w-3 h-3 bg-blue-500 rounded-full blur-sm animate-orbit-delay"
          style={{ animationDuration: '8s', animationDelay: '0.8s' }}
        />
      </div>

      <Navbar />

      <motion.main className="flex-grow relative z-10" variants={containerVariants}>
        <div className="container mx-auto px-4 py-8">
          <motion.h1 className="text-3xl font-bold text-blue-600 text-center mb-2 mt-4" variants={childVariants}>
            AI Health Assistant
          </motion.h1>
          <motion.p className="text-black text-center mb-8" variants={childVariants}>
            Get personalized advice and support for your pregnancy journey
          </motion.p>

          <AnimatePresence mode="wait">
            {!hasCompletedAssessment ? (
              <motion.div key="assessment-prompt" className="max-w-4xl mx-auto bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                <motion.h2 className="text-xl font-bold mb-3" variants={childVariants}>
                  Complete Your Assessment First
                </motion.h2>
                <motion.p className=" mb-4" variants={childVariants}>
                  To get the most personalized advice, please complete a brief health assessment. 
                  This will help our AI tailor recommendations specifically for you. Takes only about 2-3 minutes.
                </motion.p>
                <motion.button onClick={() => navigate('/assessment')} className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium shadow-md hover:bg-gray-600 transition-colors" variants={childVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Start Assessment
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="chatbot" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                <Chatbot />
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default ChatbotPage;