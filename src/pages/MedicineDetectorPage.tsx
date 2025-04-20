import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MedicineDetector from '../components/medicine/MedicineDetector';

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

// Animation variants for the MedicineDetector component
const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const MedicineDetectorPage = () => {
  return (
    <motion.div
      className="relative flex flex-col min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative Crystal Ball (unchanged) */}
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

      <motion.main
        className="flex-grow relative z-10"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-3xl font-bold text-blue-600 text-center mb-2 mt-4"
            variants={childVariants}
          >
            Medicine Safety Detector
          </motion.h1>
          <motion.p
            className="text-black text-center mb-8"
            variants={childVariants}
          >
            Check if medications are safe for use during pregnancy
          </motion.p>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <MedicineDetector />
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default MedicineDetectorPage;