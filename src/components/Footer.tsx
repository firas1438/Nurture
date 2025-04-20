
import React from 'react';
import { MessageCircle, Camera, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black py-6 mt-auto">

      <div className="container mx-auto px-4">
        <div className=" mt-2  text-center">
          <p className="text-black-700">© {new Date().getFullYear()} Gentle Birth Assistant AI. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
