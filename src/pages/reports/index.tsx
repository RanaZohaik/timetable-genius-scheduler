
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const ReportsPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-purple-500" />
            <span>Timetable Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Generate, view and export various reports related to teacher loads, class timetables,
            subject allocation and more. Export options include PDF and Excel formats.
          </p>
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400">Reports module is under development</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ReportsPage;
