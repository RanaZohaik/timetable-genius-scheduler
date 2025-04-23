
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const GuidePage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Step-by-Step Guide</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span>Interactive Timetable Guide</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            An interactive walkthrough of the timetable creation process. This guide will help you
            set up all necessary components in the correct order for optimal timetable generation.
          </p>
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400">Interactive guide is under development</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default GuidePage;
