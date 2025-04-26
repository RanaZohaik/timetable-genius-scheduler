
import React from 'react';
import { Github, Mail, BookOpen } from 'lucide-react';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">UOG Timetable</h3>
            <p className="text-gray-300 text-sm">
              Intelligent scheduling and timetable management platform for educational institutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:info@uogtimetable.edu" className="hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://docs.uogtimetable.edu" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                <BookOpen className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/guide" className="hover:text-purple-400 transition-colors">User Guide</Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-purple-400 transition-colors">Request Demo</Link>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">API Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Release Notes</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Data Protection</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Licenses</a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-700" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} University of Gujrat Timetable System. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with ❤️ for education.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
