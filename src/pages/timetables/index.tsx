
import React, { useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, RefreshCw, Printer, FileText, Save, Calendar } from 'lucide-react';
import { Timetable, ClassGroup } from '@/types';
import TimetableViewer from '@/components/timetables/TimetableViewer';
import TimetableList from '@/components/timetables/TimetableList';
import ClassEditor from '@/components/timetables/ClassEditor';
import { useToast } from '@/hooks/use-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

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
        id: 'slot-1',
        day: 'Monday',
        periodId: '1',
        teacherId: 't1',
        subjectId: 's1',
        classId: 'c2b',
        roomId: 'r103'
      },
      {
        id: 'slot-2',
        day: 'Tuesday',
        periodId: '1',
        teacherId: 't4',
        subjectId: 's2',
        classId: 'c2b',
        roomId: 'r104'
      },
      {
        id: 'slot-3',
        day: 'Tuesday',
        periodId: '2',
        teacherId: 't4',
        subjectId: 's3',
        classId: 'c2b',
        roomId: 'r104'
      },
      {
        id: 'slot-4',
        day: 'Wednesday',
        periodId: '1',
        teacherId: 't6',
        subjectId: 's4',
        classId: 'c2b',
        roomId: 'r105'
      },
      {
        id: 'slot-5',
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

const availableClasses: ClassGroup[] = [
  { id: 'c2b', name: 'Class 2B', grade: '2', section: 'B' },
  { id: 'c3c', name: 'Class 3C', grade: '3', section: 'C' },
  { id: 'c4d', name: 'Class 4D', grade: '4', section: 'D' },
  { id: 'c5e', name: 'Class 5E', grade: '5', section: 'E' },
  { id: 'c6f', name: 'Class 6F', grade: '6', section: 'F' },
  { id: 'c7g', name: 'Class 7G', grade: '7', section: 'G' },
];

const TimetablesPage = () => {
  const [timetables, setTimetables] = useState<Timetable[]>(sampleTimetables);
  const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(timetables[0] || null);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'classes'>('list');
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<ClassGroup[]>(availableClasses);
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
  
  const handleRefresh = useCallback(() => {
    setLoading(true);
    
    setTimeout(() => {
      setSelectedTimetable(prev => {
        if (!prev) return null;
        const freshData = timetables.find(t => t.id === prev.id);
        return freshData ? {...freshData} : prev;
      });
      
      setLoading(false);
      
      toast({
        title: "Refreshed",
        description: "Timetable data has been refreshed."
      });
    }, 800);
  }, [toast, timetables]);
  
  const handlePrint = useCallback(() => {
    toast({
      title: "Print initiated",
      description: "Preparing timetable for printing..."
    });
    window.print();
  }, [toast]);
  
  const handleExport = useCallback(() => {
    if (!selectedTimetable) return;
    
    const dataStr = JSON.stringify(selectedTimetable, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `timetable-${selectedTimetable.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export initiated",
      description: "Timetable exported as JSON file"
    });
  }, [selectedTimetable, toast]);

  const handlePublishTimetable = (id: string) => {
    setLoading(true);
    
    setTimeout(() => {
      const timetableToPublish = timetables.find(t => t.id === id);
      
      if (!timetableToPublish) {
        toast({
          title: "Error",
          description: "Timetable not found.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Check if timetable has any slots
      if (timetableToPublish.slots.length === 0) {
        toast({
          title: "Cannot publish",
          description: "Empty timetables cannot be published. Please add timetable entries first.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      setTimetables(prev => prev.map(t => 
        t.id === id ? { ...t, status: 'published', updatedAt: new Date().toISOString() } : t
      ));
      
      setLoading(false);
      
      toast({
        title: "Timetable Published",
        description: "The timetable has been successfully published and is now available to all users.",
        variant: "default",
      });
      
      if (selectedTimetable?.id === id) {
        setSelectedTimetable(prev => prev ? { ...prev, status: 'published', updatedAt: new Date().toISOString() } : null);
      }
    }, 1000);
  };

  const handleUpdateTimetable = (updatedTimetable: Timetable) => {
    setTimetables(prev => prev.map(t => 
      t.id === updatedTimetable.id ? updatedTimetable : t
    ));
    
    setSelectedTimetable(updatedTimetable);
    
    toast({
      title: "Timetable updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleSaveTimetable = () => {
    if (!selectedTimetable) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const updatedTimetable = {
        ...selectedTimetable,
        updatedAt: new Date().toISOString()
      };
      
      setTimetables(prev => prev.map(t => 
        t.id === updatedTimetable.id ? updatedTimetable : t
      ));
      
      setSelectedTimetable(updatedTimetable);
      
      setLoading(false);
      
      toast({
        title: "Timetable saved",
        description: "All changes have been saved successfully."
      });
    }, 800);
  };

  const handleClassesChange = (updatedClasses: ClassGroup[]) => {
    setClasses(updatedClasses);
    
    toast({
      title: "Classes updated",
      description: "Class information has been updated successfully."
    });
  };

  const handleSwitchToClasses = () => {
    setViewMode('classes');
  };

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <PageHeader 
          title="Timetables" 
          description="View, manage, and export your created timetables"
        />
        
        {viewMode === 'list' ? (
          <TimetableList 
            timetables={timetables} 
            onSelect={handleSelectTimetable} 
            onDelete={handleDeleteTimetable}
            onPublish={handlePublishTimetable}
          />
        ) : viewMode === 'classes' ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" onClick={() => setViewMode('detail')}>
                Back to Timetable
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ClassEditor 
                  classes={classes}
                  onClassesChange={handleClassesChange}
                />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" onClick={handleBackToList}>
                Back to List
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> 
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <FileText className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button variant="outline" onClick={handleSwitchToClasses}>
                  <Plus className="w-4 h-4 mr-2" /> Edit Classes
                </Button>
                <Button variant="outline" onClick={handleSaveTimetable} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                {selectedTimetable && selectedTimetable.status !== 'published' && (
                  <Button 
                    onClick={() => handlePublishTimetable(selectedTimetable.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={loading || selectedTimetable.slots.length === 0}
                    title={selectedTimetable.slots.length === 0 ? "Cannot publish empty timetable" : "Publish timetable"}
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </Button>
                )}
              </div>
            </div>
            
            {selectedTimetable && (
              <>
                {selectedTimetable.status === 'published' && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-700 font-medium">This timetable is published and available to all users</span>
                    </div>
                    <span className="text-sm text-green-600">
                      Published on {new Date(selectedTimetable.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <TimetableViewer 
                  timetable={selectedTimetable} 
                  onUpdateTimetable={handleUpdateTimetable}
                  availableClasses={classes}
                />
              </>
            )}
          </>
        )}
      </DndProvider>
    </Layout>
  );
};

export default TimetablesPage;
