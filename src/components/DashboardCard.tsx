
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  bgColor?: string;
  textColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  linkTo,
  bgColor = 'bg-purple-500',
  textColor = 'text-white'
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${bgColor} ${textColor} p-6 flex flex-col gap-4`}>
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-90">{description}</p>
      <div className="mt-2">
        <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
          <Link to={linkTo}>
            {title}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardCard;
