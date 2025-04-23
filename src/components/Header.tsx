
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = 'Guest' }) => {
  return (
    <header className="border-b border-gray-200 bg-white py-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Plan: <span className="font-medium">Free</span></span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
            {username.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
