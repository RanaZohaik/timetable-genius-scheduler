import React, { useState } from 'react';
import { Timetable, Subject, ClassGroup, Teacher, Room } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit as EditIcon, Trash2 as Trash2Icon } from 'lucide-react';

const sampleSubjects: Record<string, Subject> = {
  's1': { id: 's1', code: 'PE', name: 'Physical Education', color: 'teal' },
  's2': { id: 's2', code: 'Fr', name: 'French', color: 'green' },
  's3': { id: 's3', code: 'Dr', name: 'Drama', color: 'purple' },
  's4': { id: 's4', code: 'En', name: 'English', color: 'green' },
  's5': { id: 's5', code: 'CS', name: 'Computer Science', color: 'teal' },
  's6': { id: 's6', code: 'Hi', name: 'History', color: 'blue' },
  's7': { id: 's7', code: 'Ph', name: 'Physics', color: 'purple' },
  's8': { id: 's8', code: 'Bi', name: 'Biology', color: 'red' },
  's9': { id: 's9', code: 'Ch', name: 'Chemistry', color: 'orange' },
  's10': { id: 's10', code: 'Sp', name: 'Spanish', color: 'blue' },
};

const sampleRooms: Record<string, Room> = {
  'r103': { id: 'r103', name: 'Room 103', capacity: 30, type: 'regular' },
  'r104': { id: 'r104', name: 'Room 104', capacity: 28, type: 'regular' },
  'r105': { id: 'r105', name: 'Room 105', capacity: 25, type: 'regular' },
  'r109': { id: 'r109', name: 'Room 109', capacity: 30, type: 'regular' },
};

const sampleClasses: Record<string, ClassGroup> = {
  'c2b': { id: 'c2b', name: 'Class 2B', grade: '2', section: 'B' },
  'c3c': { id: 'c3c', name: 'Class 3C', grade: '3', section: 'C' },
  'c4d': { id: 'c4d', name: 'Class 4D', grade: '4', section: 'D' },
};

const sampleTeachers: Record<string, Teacher> = {
  't1': { id: 't1', name: 'Ms. Johnson', email: 'johnson@school.edu', subjects: ['s1'] },
  't4': { id: 't4', name: 'Mr. Smith', email: 'smith@school.edu', subjects: ['s2', 's3'] },
  't6': { id: 't6', name: 'Ms. Garcia', email: 'garcia@school.edu', subjects: ['s4'] },
  't9': { id: 't9', name: 'Mr. Wilson', email: 'wilson@school.edu', subjects: ['s5'] },
};

const samplePeriods = [
  { id: '1', name: 'Period 1', startTime: '08:00', endTime: '08:45' },
  { id: '2', name: 'Period 2', startTime: '08:50', endTime: '09:35' },
  { id: '3', name: 'Period 3', startTime: '09:45', endTime: '10:30' },
  { id: '4', name: 'Period 4', startTime: '10:35', endTime: '11:20' },
];

interface TimetableViewerProps {
  timetable: Timetable;
}

const TimetableViewer: React.FC<TimetableViewerProps> = ({ timetable }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedClass, setSelectedClass] = useState<string>('c2b');
  
  const availableClasses = [
    { id: 'c2b', name: 'Class 2B' },
    { id: 'c3c', name: 'Class 3C' },
    { id: 'c4d', name: 'Class 4D' },
    { id: 'c5e', name: 'Class 5E' },
    { id: 'c6f', name: 'Class 6F' },
    { id: 'c7g', name: 'Class 7G' },
    { id: 'c8h', name: 'Class 8H' },
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getCell = (periodId: string, day: string) => {
    const slot = timetable.slots.find(s => s.periodId === periodId && s.day === day);
    
    if (!slot) {
      return null;
    }
    
    const subject = sampleSubjects[slot.subjectId];
    const room = slot.roomId ? sampleRooms[slot.roomId] : null;
    
    if (!subject) {
      return null;
    }
    
    const getSubjectColor = (color: string) => {
      const colorMap: Record<string, string> = {
        'red': 'bg-red-200 text-red-800',
        'green': 'bg-green-200 text-green-800',
        'blue': 'bg-blue-200 text-blue-800',
        'yellow': 'bg-yellow-200 text-yellow-800',
        'purple': 'bg-purple-200 text-purple-800',
        'teal': 'bg-teal-200 text-teal-800',
        'orange': 'bg-orange-200 text-orange-800',
        'pink': 'bg-pink-200 text-pink-800',
        'indigo': 'bg-indigo-200 text-indigo-800',
      };
      
      return colorMap[color] || 'bg-gray-200 text-gray-800';
    };
    
    return (
      <div className={`h-full p-2 ${getSubjectColor(subject.color)}`}>
        <div className="flex justify-between items-start">
          <span className="text-xs">{periodId}</span>
          <span className="text-xs">{room?.name || ''}</span>
        </div>
        <div className="text-center font-bold text-xl mt-2">
          {subject.code}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>{sampleClasses[selectedClass]?.name || 'Class'}</CardTitle>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead className="border font-medium text-center py-4">Period/Day</TableHead>
                  {weekDays.map(day => (
                    <TableHead key={day} className="border font-medium text-center py-4 min-w-[140px]">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {samplePeriods.map(period => (
                  <TableRow key={period.id}>
                    <TableCell className="border text-center font-medium bg-gray-50">
                      <div className="text-lg">{period.id}</div>
                      <div className="text-xs text-gray-500">{period.startTime}-{period.endTime}</div>
                    </TableCell>
                    {weekDays.map(day => (
                      <TableCell key={`${period.id}-${day}`} className="border p-0 h-24">
                        {getCell(period.id, day)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableClasses.map((cls) => (
                <div 
                  key={cls.id} 
                  className={`p-3 border rounded-md cursor-pointer flex justify-between items-center
                    ${selectedClass === cls.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedClass(cls.id)}
                >
                  <span>{cls.name}</span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={selectedClass === cls.id ? 'hover:bg-blue-700' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit class', cls.id);
                      }}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={selectedClass === cls.id ? 'hover:bg-blue-700' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Delete class', cls.id);
                      }}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subject Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(sampleSubjects).map((subject) => {
                const getSubjectColor = (color: string) => {
                  const colorMap: Record<string, string> = {
                    'red': 'bg-red-200 text-red-800',
                    'green': 'bg-green-200 text-green-800',
                    'blue': 'bg-blue-200 text-blue-800',
                    'yellow': 'bg-yellow-200 text-yellow-800',
                    'purple': 'bg-purple-200 text-purple-800',
                    'teal': 'bg-teal-200 text-teal-800',
                    'orange': 'bg-orange-200 text-orange-800',
                    'pink': 'bg-pink-200 text-pink-800',
                    'indigo': 'bg-indigo-200 text-indigo-800',
                  };
                  
                  return colorMap[color] || 'bg-gray-200 text-gray-800';
                };
                
                return (
                  <div 
                    key={subject.id} 
                    className={`px-3 py-2 rounded-md flex items-center space-x-2 ${getSubjectColor(subject.color)}`}
                  >
                    <span className="font-bold">{subject.code}</span>
                    <span className="text-sm">- {subject.name}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimetableViewer;
