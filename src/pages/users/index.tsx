
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const UsersPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            <span>System Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Manage all users with role-based access control. Add, edit or delete users,
            view activity logs, and reset passwords as needed.
          </p>
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-400">User management module is under development</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default UsersPage;
