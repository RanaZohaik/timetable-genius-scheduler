
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';

const ClassesPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Classes Management</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5 text-blue-500" />
            <span>Classes and Sections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Set up and manage classes, sections, and their specific requirements. 
            This module allows you to organize classes and view their respective timetables.
          </p>
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400">Classes management module is under development</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ClassesPage;
