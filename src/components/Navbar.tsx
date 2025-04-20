import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Camera, Home, Heart, HeartCrack, BabyIcon, LucideBaby, Baby } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-50/90 backdrop-blur-md shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Baby className="w-7 h-7 text-blue-600" />
          <span className="font-bold text-xl text-gray-800 px-1">Nurture</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <Home className="w-4 h-4 mr-2" />
            <span>Home</span>
          </Link>
          <Link to="/chatbot" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Chatbot</span>
          </Link>
          <Link to="/medicine-detector" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <Camera className="w-4 h-4 mr-2" />
            <span>Analyzer</span>
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;