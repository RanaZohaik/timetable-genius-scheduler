
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TimetableWizard from '@/components/generate/TimetableWizard';

const GenerateTimetablePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header username="Admin" />
      <div className="flex flex-1">
        <Sidebar activePath="/generate" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Generate Timetable</h1>
            
            <TimetableWizard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GenerateTimetablePage;
