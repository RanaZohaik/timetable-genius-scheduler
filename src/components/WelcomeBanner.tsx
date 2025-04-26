
import React from 'react';
import { Card, CardContent } from './ui/card';
import { useQuickStats } from '@/hooks/useQuickStats';
import { Timetable } from '@/types';

interface WelcomeBannerProps {
  username: string;
  organization?: string;
  timetables: Timetable[];
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  username = 'User', 
  organization = 'Your Organization',
  timetables = []
}) => {
  const stats = useQuickStats(timetables);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 pb-4 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {username}!</h1>
            <p className="text-gray-600">
              Manage your timetables, generate schedules, and streamline your institution's planning
              with UOG Timetable's intelligent scheduling platform.
            </p>
          </div>
          <div className="mt-4 md:mt-0 space-y-2 text-right">
            <div className="flex items-center justify-end gap-2">
              <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a7 7 0 0112 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Active Organization: <span className="font-medium">{organization}</span></span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Timetables Created: <span className="font-medium">{timetables.length}</span></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
