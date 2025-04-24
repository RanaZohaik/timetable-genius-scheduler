
import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { LogOut, Settings, User } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = 'Guest' }) => {
  return (
    <header className="border-b border-gray-200 bg-white py-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{username}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-medium">{username}</p>
                <p className="text-sm text-gray-500">administrator@example.com</p>
              </div>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Your Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
