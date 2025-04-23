
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog } from 'lucide-react';

const TeacherSubstitutePage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Substitute</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5 text-amber-500" />
            <span>Substitute Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Mark teachers as absent and find suitable substitutes based on subject compatibility and availability.
            This module helps manage absences and maintains continuity in the teaching schedule.
          </p>
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400">Teacher substitute module is under development</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TeacherSubstitutePage;
