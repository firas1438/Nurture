
import React from 'react';
import { MessageCircle, Camera, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-beige-100 text-black py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Gentle Birth Assistant</h3>
            <p className="text-black">
              Supporting your pregnancy journey with personalized AI assistance for health and wellness.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Personalized Health Assessment</span>
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>AI Chatbot</span>
              </li>
              <li className="flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                <span>Medicine Detector</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Note</h3>
            <p className="text-black-700">
              This application is for informational purposes only. Always consult with your healthcare provider for medical advice.
            </p>
          </div>
        </div>
        
        <div className="border-t border-beige-200 mt-8 pt-8 text-center">
          <p className="text-black-700">© {new Date().getFullYear()} Gentle Birth Assistant AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
