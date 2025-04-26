import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Plus, Check, X, Info } from 'lucide-react';
import { Teacher, Subject, ClassGroup, Lesson, Room } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface LessonCreationProps {
  teachers: Teacher[];
  subjects: Subject[];
  classes: ClassGroup[];
  rooms: Room[];
  onNext: () => void;
  onBack: () => void;
}

const LessonCreation: React.FC<LessonCreationProps> = ({ teachers, subjects, classes, rooms, onNext, onBack }) => {
  const [localRooms, setLocalRooms] = useState<Room[]>([
    { id: '1', name: 'Room 101', capacity: 35, type: 'regular', facilities: ['Whiteboard'] },
    { id: '2', name: 'Room 102', capacity: 30, type: 'regular', facilities: ['Whiteboard'] },
    { id: '3', name: 'Science Lab', capacity: 25, type: 'lab', facilities: ['Lab Equipment'] },
    { id: '4', name: 'Computer Lab', capacity: 30, type: 'lab', facilities: ['Computers'] },
  ]);
  
  const [lessons, setLessons] = useState<Lesson[]>([
    { 
      id: '1', 
      subjectId: '1', // Mathematics
      teacherId: '1', // John Doe
      classId: '1',   // Class 9-A
      roomId: '1',    // Room 101
      periodsPerWeek: 5, 
      preferences: { 
        consecutivePeriods: true,
        preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    },
  ]);

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    subjectId: '',
    teacherId: '',
    classId: '',
    roomId: '',
    periodsPerWeek: 3,
    preferences: {
      consecutivePeriods: false,
      preferredDays: []
    }
  });

  const handleNewLessonChange = (field: keyof Lesson, value: any) => {
    setNewLesson(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: keyof Required<Lesson>['preferences'], value: any) => {
    setNewLesson(prev => ({
      ...prev,
      preferences: { ...(prev.preferences || {}), [field]: value }
    }));
  };

  const handlePreferredDayToggle = (day: string) => {
    setNewLesson(prev => {
      const currentDays = prev.preferences?.preferredDays || [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day];
      
      return {
        ...prev,
        preferences: { ...(prev.preferences || {}), preferredDays: updatedDays }
      };
    });
  };

  const addLesson = () => {
    if (!newLesson.subjectId || !newLesson.teacherId || !newLesson.classId) return;
    
    const lesson: Lesson = {
      id: (lessons.length + 1).toString(),
      subjectId: newLesson.subjectId,
      teacherId: newLesson.teacherId,
      classId: newLesson.classId,
      roomId: newLesson.roomId,
      periodsPerWeek: newLesson.periodsPerWeek || 3,
      preferences: newLesson.preferences
    };

    setLessons([...lessons, lesson]);
    setNewLesson({
      subjectId: '',
      teacherId: '',
      classId: '',
      roomId: '',
      periodsPerWeek: 3,
      preferences: {
        consecutivePeriods: false,
        preferredDays: []
      }
    });
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const getTeacherById = (id: string) => teachers.find(t => t.id === id);
  const getSubjectById = (id: string) => subjects.find(s => s.id === id);
  const getClassById = (id: string) => classes.find(c => c.id === id);
  const getRoomById = (id: string) => localRooms.find(r => r.id === id);

  const handleNext = () => {
    onNext();
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lesson Creation</CardTitle>
          <CardDescription>Connect subjects, teachers, and classes into lessons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Create New Lesson</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Select Subject</Label>
                  <Select
                    value={newLesson.subjectId}
                    onValueChange={(value) => handleNewLessonChange('subjectId', value)}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="teacher">Select Teacher</Label>
                  <Select
                    value={newLesson.teacherId}
                    onValueChange={(value) => handleNewLessonChange('teacherId', value)}
                  >
                    <SelectTrigger id="teacher">
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers
                        .filter(teacher => !newLesson.subjectId || teacher.subjects.includes(newLesson.subjectId))
                        .map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newLesson.subjectId && !teachers.some(t => t.subjects.includes(newLesson.subjectId)) && (
                    <p className="text-xs text-amber-600 mt-1">
                      No teachers available for this subject. Please assign the subject to a teacher first.
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="class">Select Class</Label>
                  <Select
                    value={newLesson.classId}
                    onValueChange={(value) => handleNewLessonChange('classId', value)}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classGroup) => (
                        <SelectItem key={classGroup.id} value={classGroup.id}>
                          {classGroup.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="room">Select Room (Optional)</Label>
                  <Select
                    value={newLesson.roomId}
                    onValueChange={(value) => handleNewLessonChange('roomId', value)}
                  >
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {localRooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} ({room.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="periodsPerWeek">Periods Per Week</Label>
                  <Input
                    id="periodsPerWeek"
                    type="number"
                    min="1"
                    max="20"
                    value={newLesson.periodsPerWeek || ''}
                    onChange={(e) => handleNewLessonChange('periodsPerWeek', Number(e.target.value))}
                  />
                </div>

                <div className="border rounded-md p-4 bg-gray-50">
                  <h4 className="text-sm font-medium mb-3">Preferences</h4>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="consecutivePeriods"
                      checked={newLesson.preferences?.consecutivePeriods || false}
                      onCheckedChange={(checked) => 
                        handlePreferenceChange('consecutivePeriods', checked === true)
                      }
                    />
                    <Label htmlFor="consecutivePeriods" className="text-sm">
                      Schedule consecutive periods when possible
                    </Label>
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Preferred Days</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {weekdays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day}`}
                            checked={(newLesson.preferences?.preferredDays || []).includes(day)}
                            onCheckedChange={() => handlePreferredDayToggle(day)}
                          />
                          <Label htmlFor={`day-${day}`} className="text-xs">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button onClick={addLesson} className="w-full mt-4" disabled={!newLesson.subjectId || !newLesson.teacherId || !newLesson.classId}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Lesson List</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-gray-50 px-4 py-2 border-b">
                  <div className="col-span-3 font-medium text-sm text-gray-600">Subject</div>
                  <div className="col-span-3 font-medium text-sm text-gray-600">Teacher</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600">Class</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600">Periods</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600"></div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  {lessons.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No lessons added yet
                    </div>
                  ) : (
                    lessons.map(lesson => (
                      <div key={lesson.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center">
                        <div className="col-span-3 text-sm font-medium">
                          {getSubjectById(lesson.subjectId)?.name || 'Unknown Subject'}
                        </div>
                        <div className="col-span-3 text-sm text-gray-600">
                          {getTeacherById(lesson.teacherId)?.name || 'Unknown Teacher'}
                        </div>
                        <div className="col-span-2 text-sm text-gray-600">
                          {getClassById(lesson.classId)?.name || 'Unknown Class'}
                        </div>
                        <div className="col-span-2 text-sm text-gray-600">
                          {lesson.periodsPerWeek} per week
                        </div>
                        <div className="col-span-2 flex justify-end items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-500"
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {lesson.preferences?.consecutivePeriods 
                                    ? 'Consecutive periods preferred' 
                                    : 'No consecutive periods'}
                                </p>
                                <p>
                                  Room: {lesson.roomId 
                                    ? getRoomById(lesson.roomId)?.name 
                                    : 'Any room'}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLesson(lesson.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mt-6 space-y-2 border rounded-md bg-blue-50 p-4">
                <h4 className="text-sm font-medium text-blue-700 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Automatic Availability Checks
                </h4>
                <p className="text-xs text-blue-600">
                  The system automatically checks availability of teachers, classes, and rooms when generating
                  timetables to eliminate scheduling conflicts and optimize resource allocation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleNext}>Next: Review & Generate</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LessonCreation;
