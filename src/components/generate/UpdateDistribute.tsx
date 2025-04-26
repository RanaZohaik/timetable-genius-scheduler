
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Share2, Download, CheckCircle } from 'lucide-react';
import ConflictResolver from './ConflictResolver';
import { toast } from 'sonner';
import { Timetable, Teacher, ClassGroup, Subject, Room, Conflict } from '@/types';

export interface UpdateDistributeProps {
  timetable?: Timetable;
  teachers?: Teacher[];
  classes?: ClassGroup[];
  subjects?: Subject[];
  rooms?: Room[];
  onBack: () => void;
  onFinish: () => void;
}

const UpdateDistribute: React.FC<UpdateDistributeProps> = ({ 
  timetable, 
  teachers, 
  classes, 
  subjects,
  rooms,
  onBack, 
  onFinish 
}) => {
  const [activeTab, setActiveTab] = useState('distribute');
  const [conflicts, setConflicts] = useState<Conflict[]>([
    {
      id: '1',
      type: 'teacher',
      description: 'Teacher John Smith has overlapping classes on Monday',
      details: {
        day: 'Monday',
        time: '10:00 AM',
        items: ['Class 10-A (Math)', 'Class 11-B (Math)']
      },
      resolved: false
    },
    {
      id: '2',
      type: 'room',
      description: 'Room 101 is double-booked on Tuesday',
      details: {
        day: 'Tuesday',
        time: '11:00 AM',
        items: ['Class 9-C (Physics)', 'Class 12-D (Chemistry)']
      },
      resolved: false
    }
  ]);

  const handlePublish = () => {
    // Check for unresolved conflicts
    const unresolvedConflicts = conflicts.filter(c => !c.resolved);
    
    if (unresolvedConflicts.length > 0) {
      toast.error(`Cannot publish. ${unresolvedConflicts.length} conflicts need resolution.`);
      setActiveTab('conflicts');
      return;
    }
    
    // Here we would send the timetable to the server
    toast.success("Timetable published successfully!");
    
    // Save to localStorage for viewing in the timetables page
    const existingTimetables = JSON.parse(localStorage.getItem('timetables') || '[]');
    
    if (timetable) {
      const newTimetable = {
        ...timetable,
        id: crypto.randomUUID(),
        publishedAt: new Date().toISOString(),
        status: 'active'
      };
      
      localStorage.setItem('timetables', JSON.stringify([...existingTimetables, newTimetable]));
    }
    
    onFinish();
  };

  const handleExport = () => {
    // In a real app, this would generate and download a file
    toast.success("Timetable exported successfully!");
  };

  const handleResolveAll = () => {
    // Mark all conflicts as resolved
    setConflicts(conflicts.map(c => ({ ...c, resolved: true })));
    toast.success("All conflicts resolved!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Finalize Timetable</CardTitle>
        <CardDescription>
          Review, resolve conflicts, and distribute the timetable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribute" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="distribute">Distribute</TabsTrigger>
            <TabsTrigger value="conflicts">
              Conflicts 
              {conflicts.some(c => !c.resolved) && 
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {conflicts.filter(c => !c.resolved).length}
                </span>
              }
            </TabsTrigger>
          </TabsList>
          <TabsContent value="distribute" className="space-y-4 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Distribution Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Timetable
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Timetable
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="conflicts" className="py-4">
            {conflicts.length > 0 ? (
              <ConflictResolver 
                conflicts={conflicts} 
                onResolveAll={handleResolveAll} 
              />
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-2 text-lg font-medium">No conflicts found</p>
                <p className="text-muted-foreground">The timetable is ready to publish</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handlePublish} disabled={conflicts.some(c => !c.resolved)}>
          Publish Timetable
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateDistribute;
