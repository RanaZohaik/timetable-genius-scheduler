
import React from 'react';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import TimetableWizard from '@/components/generate/TimetableWizard';

const GenerateTimetablePage = () => {
  return (
    <Layout>
      <PageHeader
        title="Generate Timetable"
        description="Create efficient and conflict-free timetables with our advanced scheduling algorithm"
      />
      <TimetableWizard />
    </Layout>
  );
};

export default GenerateTimetablePage;
