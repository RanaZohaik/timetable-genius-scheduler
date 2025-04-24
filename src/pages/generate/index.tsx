
import React from 'react';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import TimetableWizard from '@/components/generate/TimetableWizard';
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';
import { Link } from 'react-router-dom';

const GenerateTimetablePage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          title="Generate Timetable"
          description="Create efficient and conflict-free timetables with our advanced scheduling algorithm"
        />
        <Link to="/timetables">
          <Button variant="outline">
            <BookText className="w-4 h-4 mr-2" />
            View Existing Timetables
          </Button>
        </Link>
      </div>
      <TimetableWizard />
    </Layout>
  );
};

export default GenerateTimetablePage;
