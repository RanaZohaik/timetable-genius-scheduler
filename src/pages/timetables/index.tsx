
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Plus, RefreshCw, Printer, FileExport, Edit, Trash2 } from 'lucide-react';
import { Timetable } from '@/types';
import TimetableViewer from '@/components/timetables/TimetableViewer';
import TimetableList from '@/components/timetables/TimetableList';
import { useToast } from '@/components/ui/use-toast';

// Sample data for demonstration
const sampleTimetables: Timetable[] = [
  {
    id: '1',
    name: 'Semester 1 2023-24',
    schoolYear: '2023-2024',
    term: 'Fall',
    startDate: '2023-09-01',
    endDate: '2023-12-20',
    createdAt: '2023-08-15T10:30:00Z',
    updatedAt: '2023-08-20T14:45:00Z',
    slots: [
      {
        day: 'Monday',
        periodId: '1',
        teacherId: 't1',
        subjectId: 's1',
        classId: 'c2b',
        roomId: 'r103'
      },
      {
        day: 'Tuesday',
        periodId: '1',
        teacherId: 't4',
        subjectId: 's2',
        classId: 'c2b',
        roomId: 'r104'
      },
      {
        day: 'Tuesday',
        periodId: '2',
        teacherId: 't4',
        subjectId: 's3',
        classId: 'c2b',
        roomId: 'r104'
      },
      {
        day: 'Wednesday',
        periodId: '1',
        teacherId: 't6',
        subjectId: 's4',
        classId: 'c2b',
        roomId: 'r105'
      },
      {
        day: 'Friday',
        periodId: '3',
        teacherId: 't9',
        subjectId: 's5',
        classId: 'c2b',
        roomId: 'r109'
      },
    ],
    status: 'published'
  },
  {
    id: '2',
    name: 'Semester 2 2023-24',
    schoolYear: '2023-2024',
    term: 'Spring',
    startDate: '2024-01-10',
    endDate: '2024-05-30',
    createdAt: '2023-12-10T09:15:00Z',
    updatedAt: '2023-12-15T11:20:00Z',
    slots: [],
    status: 'draft'
  },
  {
    id: '3',
    name: 'Summer School 2024',
    schoolYear: '2023-2024',
    term: 'Summer',
    startDate: '2024-06-15',
    endDate: '2024-07-30',
    createdAt: '2024-05-20T13:45:00Z',
    updatedAt: '2024-05-22T10:30:00Z',
    slots: [],
    status: 'draft'
  }
];

const TimetablesPage = () => {
  const [timetables, setTimetables] = useState<Timetable[]>(sampleTimetables);
  const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(timetables[0] || null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const { toast } = useToast();
  
  const handleSelectTimetable = (timetable: Timetable) => {
    setSelectedTimetable(timetable);
    setViewMode('detail');
  };
  
  const handleDeleteTimetable = (id: string) => {
    setTimetables(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Timetable deleted",
      description: "The timetable has been deleted successfully."
    });
    
    if (selectedTimetable?.id === id) {
      setSelectedTimetable(timetables.find(t => t.id !== id) || null);
    }
  };
  
  const handleBackToList = () => {
    setViewMode('list');
  };
  
  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: "Timetable data has been refreshed."
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print initiated",
      description: "Preparing timetable for printing..."
    });
    window.print();
  };
  
  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Preparing timetable export..."
    });
  };

  return (
    <Layout>
      <PageHeader 
        title="Timetables" 
        description="View, manage, and export your created timetables"
      />
      
      {viewMode === 'list' ? (
        <TimetableList 
          timetables={timetables} 
          onSelect={handleSelectTimetable} 
          onDelete={handleDeleteTimetable}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={handleBackToList}>
              Back to List
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" /> Print
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <FileExport className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
          
          {selectedTimetable && (
            <TimetableViewer timetable={selectedTimetable} />
          )}
        </>
      )}
    </Layout>
  );
};

export default TimetablesPage;
