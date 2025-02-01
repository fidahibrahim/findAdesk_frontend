import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-4 px-6 border-t border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 text-gray-600" />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-gray-600" />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-gray-600" />
          </a>
        </div>

        {/* Copyright Text */}
        <div className="text-gray-600 text-sm">
          © Copyright 2024. All Rights Reserved
        </div>

        {/* Footer Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/aboutUs" className="text-gray-600 hover:text-gray-800 transition-colors">
            About Us
          </a>
          <a href="/contactUs" className="text-gray-600 hover:text-gray-800 transition-colors">
            Contact Us
          </a>
          <a href="/termsAndConditions" className="text-gray-600 hover:text-gray-800 transition-colors">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;