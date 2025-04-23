
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
      <div className="bg-purple-500 text-white p-1 rounded flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <span>UOG Timetable</span>
    </div>
  );
};

export default Logo;
