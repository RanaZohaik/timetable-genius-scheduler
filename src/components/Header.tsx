
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { LogOut, Settings, User } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Show toast notification
    toast.success('Signed out successfully');
    
    // Redirect to login page
    navigate('/auth/login');
  };

  return (
    <header className="border-b border-gray-200 bg-white py-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline">{user.name}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Your Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Header;
