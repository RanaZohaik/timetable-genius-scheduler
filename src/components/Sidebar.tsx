
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Settings, BookOpen, School, FileText } from 'lucide-react';

interface SidebarProps {
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Calendar size={20} /> },
    { name: 'Generate Timetable', path: '/generate', icon: <Calendar size={20} /> },
    { name: 'Teachers', path: '/teachers', icon: <Users size={20} /> },
    { name: 'Classes', path: '/classes', icon: <School size={20} /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen">
      <nav className="py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activePath === item.path 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
