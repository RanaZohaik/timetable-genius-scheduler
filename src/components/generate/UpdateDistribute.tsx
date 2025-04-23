
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Share, Printer, Mail, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Timetable, TimetableSlot, Teacher, ClassGroup, Subject, Room, Conflict } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UpdateDistributeProps {
  timetable: Timetable;
  teachers: Teacher[];
  classes: ClassGroup[];
  subjects: Subject[];
  rooms: Room[];
  onBack: () => void;
  onFinish: () => void;
}

const UpdateDistribute: React.FC<UpdateDistributeProps> = ({ 
  timetable, teachers, classes, subjects, rooms, onBack, onFinish 
}) => {
  const [selectedView, setSelectedView] = useState<'class' | 'teacher' | 'room'>('class');
  const [selectedEntityId, setSelectedEntityId] = useState<string>(classes[0]?.id || '');
  
  const [conflicts] = useState<Conflict[]>([
    {
      type: 'teacher',
      description: 'Teacher John Doe has a scheduling conflict on Monday Period 3',
      severity: 'high',
      affectedSlots: []
    }
  ]);

  // Create mock timetable data
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periodIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Helper functions
  const getEntityName = (type: 'teacher' | 'class' | 'subject' | 'room', id: string) => {
    switch (type) {
      case 'teacher': return teachers.find(t => t.id === id)?.name || 'Unknown';
      case 'class': return classes.find(c => c.id === id)?.name || 'Unknown';
      case 'subject': return subjects.find(s => s.id === id)?.name || 'Unknown';
      case 'room': return rooms.find(r => r.id === id)?.name || 'Unknown';
      default: return 'Unknown';
    }
  };

  const getSlotForDayAndPeriod = (day: string, periodId: string): TimetableSlot | undefined => {
    // In a real application, this would look up the actual timetable data
    // Here we just create some mock data
    if (Math.random() > 0.3) {
      const teacherId = teachers[Math.floor(Math.random() * teachers.length)]?.id;
      const subjectId = subjects[Math.floor(Math.random() * subjects.length)]?.id;
      const classId = classes[Math.floor(Math.random() * classes.length)]?.id;
      const roomId = rooms[Math.floor(Math.random() * rooms.length)]?.id;
      
      return { day, periodId, teacherId, subjectId, classId, roomId };
    }
    
    return undefined;
  };

  const getEntitySlots = () => {
    const entitySlots: Record<string, Record<string, TimetableSlot | undefined>> = {};
    
    days.forEach(day => {
      entitySlots[day] = {};
      
      periodIds.forEach(periodId => {
        entitySlots[day][periodId] = getSlotForDayAndPeriod(day, periodId);
      });
    });
    
    return entitySlots;
  };

  const timetableData = getEntitySlots();

  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`Exporting timetable as ${format.toUpperCase()}`);
  };

  const handleShare = (method: 'email' | 'link') => {
    alert(`Sharing timetable via ${method}`);
  };

  const handlePublish = () => {
    alert('Timetable published successfully!');
    onFinish();
  };

  const hasConflicts = conflicts.length > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Update & Distribute Timetable</CardTitle>
          <CardDescription>Review, edit, and distribute your generated timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">University of Gujrat Timetable</h2>
              <p className="text-sm text-gray-500">Academic Year 2023-2024</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                <Download className="h-4 w-4 mr-1" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('email')}>
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('link')}>
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
          
          {hasConflicts && (
            <Card className="border-red-200 bg-red-50 mb-4">
              <CardContent className="py-3 px-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      {conflicts.length} conflict{conflicts.length > 1 ? 's' : ''} detected
                    </h3>
                    <p className="text-xs text-red-700">
                      Please resolve conflicts before publishing the timetable.
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-red-700">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="class">Class View</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher View</TabsTrigger>
                  <TabsTrigger value="room">Room View</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="w-[250px]">
                <Select
                  value={selectedEntityId}
                  onValueChange={setSelectedEntityId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${selectedView}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedView === 'class' && classes.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                    {selectedView === 'teacher' && teachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                    {selectedView === 'room' && rooms.map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-6 border-b bg-gray-50">
                <div className="p-2 font-medium text-sm text-gray-600 border-r">Time / Day</div>
                {days.map(day => (
                  <div key={day} className="p-2 font-medium text-sm text-gray-600 text-center border-r last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              {periodIds.map((periodId, index) => {
                const isBreak = [3, 6].includes(index);
                
                return (
                  <div 
                    key={periodId} 
                    className={`grid grid-cols-6 border-b last:border-b-0 ${isBreak ? 'bg-gray-50' : ''}`}
                  >
                    <div className={`p-2 text-sm border-r ${isBreak ? 'font-medium' : ''}`}>
                      {isBreak ? (index === 3 ? 'Break' : 'Lunch') : `Period ${index + 1}`}
                      <div className="text-xs text-gray-500">
                        {index === 0 ? '8:00 - 9:00' : 
                         index === 1 ? '9:00 - 10:00' :
                         index === 2 ? '10:00 - 11:00' :
                         index === 3 ? '11:00 - 11:30' :
                         index === 4 ? '11:30 - 12:30' :
                         index === 5 ? '12:30 - 13:30' :
                         index === 6 ? '13:30 - 14:00' : '14:00 - 15:00'}
                      </div>
                    </div>
                    
                    {days.map(day => {
                      const slot = timetableData[day][periodId];
                      const hasSlot = Boolean(slot) && !isBreak;
                      
                      return (
                        <div 
                          key={day} 
                          className={`p-2 border-r last:border-r-0 ${isBreak ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        >
                          {hasSlot && (
                            <div className="text-sm p-1 bg-white border rounded shadow-sm cursor-pointer hover:shadow">
                              <div className="font-medium">{getEntityName('subject', slot!.subjectId!)}</div>
                              <div className="text-xs flex justify-between">
                                <span>{getEntityName('teacher', slot!.teacherId!)}</span>
                                <span className="text-gray-500">{getEntityName('room', slot!.roomId!)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Drag and drop lessons to manually update the timetable. Any conflicts will be highlighted in red.</p>
            </div>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-md">Timetable Analysis</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      Teacher Distribution
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      All teachers have a balanced workload with optimal distribution across days.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      Room Utilization
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Rooms are efficiently utilized with minimal movement between classes.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      Subject Distribution
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Subjects are well distributed throughout the week for optimal learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handlePublish}>Publish Timetable</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateDistribute;
