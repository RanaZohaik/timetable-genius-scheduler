import React, { useState, useCallback, useRef } from 'react';
import { Timetable, Subject, ClassGroup, Teacher, Room, TimetableSlot } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Plus, Edit as EditIcon, Trash2 as Trash2Icon, 
  Save, Move, Download, FileText, RefreshCw, Printer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import ClashDetector from './ClashDetector';

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
  'r103': { id: 'r103', name: 'Room 103', capacity: 30, type: 'regular', facilities: [] },
  'r104': { id: 'r104', name: 'Room 104', capacity: 28, type: 'regular', facilities: [] },
  'r105': { id: 'r105', name: 'Room 105', capacity: 25, type: 'regular', facilities: [] },
  'r109': { id: 'r109', name: 'Room 109', capacity: 30, type: 'regular', facilities: [] },
};

const sampleClasses: Record<string, ClassGroup> = {
  'c2b': { id: 'c2b', name: 'Class 2B', grade: '2', section: 'B' },
  'c3c': { id: 'c3c', name: 'Class 3C', grade: '3', section: 'C' },
  'c4d': { id: 'c4d', name: 'Class 4D', grade: '4', section: 'D' },
};

const sampleTeachers: Record<string, Teacher> = {
  't1': { id: 't1', name: 'Ms. Johnson', email: 'johnson@school.edu', subjects: ['s1'], hoursPerWeek: 20 },
  't4': { id: 't4', name: 'Mr. Smith', email: 'smith@school.edu', subjects: ['s2', 's3'], hoursPerWeek: 20 },
  't6': { id: 't6', name: 'Ms. Garcia', email: 'garcia@school.edu', subjects: ['s4'], hoursPerWeek: 18 },
  't9': { id: 't9', name: 'Mr. Wilson', email: 'wilson@school.edu', subjects: ['s5'], hoursPerWeek: 16 },
};

const samplePeriods = [
  { id: '1', name: 'Period 1', startTime: '08:00', endTime: '08:45' },
  { id: '2', name: 'Period 2', startTime: '08:50', endTime: '09:35' },
  { id: '3', name: 'Period 3', startTime: '09:45', endTime: '10:30' },
  { id: '4', name: 'Period 4', startTime: '10:35', endTime: '11:20' },
];

interface TimetableViewerProps {
  timetable: Timetable;
  onUpdateTimetable?: (updatedTimetable: Timetable) => void;
  availableClasses?: ClassGroup[];
}

const TimetableViewer: React.FC<TimetableViewerProps> = ({ timetable, onUpdateTimetable, availableClasses }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedClass, setSelectedClass] = useState<string>('c2b');
  const [currentTimetable, setCurrentTimetable] = useState<Timetable>({...timetable});
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState<Partial<TimetableSlot>>({
    day: '',
    periodId: '',
    subjectId: '',
    teacherId: '',
    roomId: '',
    classId: selectedClass
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showClashDetection, setShowClashDetection] = useState(false);
  const [clashingSlot, setClashingSlot] = useState<TimetableSlot | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const classOptions = availableClasses || Object.values(sampleClasses);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const validateSlot = (slot: Partial<TimetableSlot>): boolean => {
    if (!slot.day || !slot.periodId || !slot.subjectId || !slot.roomId || !slot.teacherId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const checkForClashes = (slot: TimetableSlot): boolean => {
    const teacherClash = currentTimetable.slots.some(
      s => 
        s.id !== slot.id && 
        s.teacherId === slot.teacherId && 
        s.day === slot.day && 
        s.periodId === slot.periodId
    );

    const classClash = currentTimetable.slots.some(
      s => 
        s.id !== slot.id && 
        s.classId === slot.classId && 
        s.day === slot.day && 
        s.periodId === slot.periodId
    );

    const roomClash = currentTimetable.slots.some(
      s => 
        s.id !== slot.id && 
        s.roomId === slot.roomId && 
        s.day === slot.day && 
        s.periodId === slot.periodId
    );

    return teacherClash || classClash || roomClash;
  };

  const handleAddCard = () => {
    if (!validateSlot(newCard)) return;

    const newSlot: TimetableSlot = {
      ...newCard as TimetableSlot,
      id: `slot-${Date.now()}`
    };

    if (checkForClashes(newSlot)) {
      setClashingSlot(newSlot);
      setShowClashDetection(true);
      return;
    }

    const updatedTimetable = {
      ...currentTimetable,
      slots: [...currentTimetable.slots, newSlot],
      updatedAt: new Date().toISOString()
    };

    setCurrentTimetable(updatedTimetable);
    if (onUpdateTimetable) onUpdateTimetable(updatedTimetable);
    
    setNewCard({
      day: '',
      periodId: '',
      subjectId: '',
      teacherId: '',
      roomId: '',
      classId: selectedClass
    });
    
    setIsCardDialogOpen(false);
    
    toast({
      title: "Card added",
      description: "The new timetable card has been added successfully",
    });
  };

  const handleEditCard = () => {
    if (!validateSlot(newCard)) return;

    const updatedSlot: TimetableSlot = {
      ...newCard as TimetableSlot,
      id: editingCard || `slot-${Date.now()}`
    };

    if (checkForClashes(updatedSlot)) {
      setClashingSlot(updatedSlot);
      setShowClashDetection(true);
      return;
    }

    const updatedSlots = currentTimetable.slots.map(slot => 
      slot.id === editingCard ? updatedSlot : slot
    );

    const updatedTimetable = {
      ...currentTimetable,
      slots: updatedSlots,
      updatedAt: new Date().toISOString()
    };

    setCurrentTimetable(updatedTimetable);
    if (onUpdateTimetable) onUpdateTimetable(updatedTimetable);
    
    setIsEditMode(false);
    setEditingCard(null);
    setIsCardDialogOpen(false);
    
    toast({
      title: "Card updated",
      description: "The timetable card has been updated successfully",
    });
  };

  const handleDeleteCard = () => {
    if (!cardToDelete) return;

    const updatedSlots = currentTimetable.slots.filter(slot => slot.id !== cardToDelete);
    const updatedTimetable = {
      ...currentTimetable,
      slots: updatedSlots,
      updatedAt: new Date().toISOString()
    };

    setCurrentTimetable(updatedTimetable);
    if (onUpdateTimetable) onUpdateTimetable(updatedTimetable);
    setCardToDelete(null);
    
    toast({
      title: "Card deleted",
      description: "The timetable card has been deleted successfully",
    });
  };

  const handleResolveClash = (resolution: 'cancel' | 'replace' | 'reschedule', existingSlot?: TimetableSlot) => {
    if (!clashingSlot) return;

    switch(resolution) {
      case 'cancel':
        setShowClashDetection(false);
        setClashingSlot(null);
        toast({
          title: "Changes cancelled",
          description: "Your changes were not applied due to scheduling conflicts."
        });
        break;

      case 'replace':
        if (existingSlot) {
          const filteredSlots = currentTimetable.slots.filter(s => s.id !== existingSlot.id);
          
          const updatedTimetable = {
            ...currentTimetable,
            slots: [...filteredSlots, clashingSlot],
            updatedAt: new Date().toISOString()
          };
          
          setCurrentTimetable(updatedTimetable);
          if (onUpdateTimetable) onUpdateTimetable(updatedTimetable);
          
          toast({
            title: "Schedule replaced",
            description: "The existing schedule was replaced with your new entry."
          });
        }
        setShowClashDetection(false);
        setClashingSlot(null);
        setIsCardDialogOpen(false);
        setIsEditMode(false);
        break;

      case 'reschedule':
        setShowClashDetection(false);
        toast({
          title: "Please reschedule",
          description: "You can modify your entry to avoid the scheduling conflict."
        });
        break;
    }
  };

  const handlePrint = useCallback(() => {
    toast({
      title: "Printing timetable",
      description: "Preparing the timetable for printing...",
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  }, [toast]);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(currentTimetable, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `timetable-${currentTimetable.name}-${format(new Date(), 'yyyy-MM-dd')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Timetable exported",
      description: "The timetable has been exported as JSON",
    });
  }, [currentTimetable, toast]);

  const handleRefresh = useCallback(() => {
    setCurrentTimetable({...timetable});
    
    toast({
      title: "Timetable refreshed",
      description: "The timetable has been refreshed to its original state",
    });
  }, [timetable, toast]);

  const handleEditClick = (slot: TimetableSlot) => {
    setIsEditMode(true);
    setEditingCard(slot.id);
    setNewCard({
      day: slot.day,
      periodId: slot.periodId,
      subjectId: slot.subjectId,
      teacherId: slot.teacherId,
      roomId: slot.roomId,
      classId: slot.classId
    });
    setIsCardDialogOpen(true);
  };

  const handleDeleteClick = (slotId: string) => {
    setCardToDelete(slotId);
    setIsDeleteDialogOpen(true);
  };

  const getCell = (periodId: string, day: string) => {
    const slot = currentTimetable.slots.find(s => 
      s.periodId === periodId && s.day === day && s.classId === selectedClass
    );
    
    if (!slot) {
      return (
        <div 
          className="h-full p-2 flex items-center justify-center border-dashed border-2 border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => {
            setNewCard({
              day: day,
              periodId: periodId,
              subjectId: '',
              teacherId: '',
              roomId: '',
              classId: selectedClass
            });
            setIsEditMode(false);
            setIsCardDialogOpen(true);
          }}
        >
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
      );
    }
    
    const subject = sampleSubjects[slot.subjectId];
    const room = slot.roomId ? sampleRooms[slot.roomId] : null;
    const teacher = slot.teacherId ? sampleTeachers[slot.teacherId] : null;
    
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
      <div className={`h-full p-2 ${getSubjectColor(subject.color)} relative group`}>
        <div className="flex justify-between items-start">
          <span className="text-xs">{periodId}</span>
          <span className="text-xs">{room?.name || ''}</span>
        </div>
        <div className="text-center font-bold text-xl mt-2">
          {subject.code}
        </div>
        <div className="text-sm text-center mt-1">
          {teacher?.name || 'No teacher'}
        </div>
        <div className="absolute top-0 right-0 bg-white rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleEditClick(slot)}
          >
            <EditIcon className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500"
            onClick={() => handleDeleteClick(slot.id)}
          >
            <Trash2Icon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4" ref={printRef}>
        {showClashDetection && clashingSlot && (
          <ClashDetector 
            slots={currentTimetable.slots} 
            newSlot={clashingSlot}
            onResolveClash={handleResolveClash} 
          />
        )}
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>
                {classOptions.find(c => c.id === selectedClass)?.name || 'Class'}
              </CardTitle>
              <Button variant="outline" onClick={() => {
                setNewCard({
                  day: '',
                  periodId: '',
                  subjectId: '',
                  teacherId: '',
                  roomId: '',
                  classId: selectedClass
                });
                setIsEditMode(false);
                setIsCardDialogOpen(true);
              }}>
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
                {classOptions.map((cls) => (
                  <div 
                    key={cls.id} 
                    className={`p-3 border rounded-md cursor-pointer flex justify-between items-center
                      ${selectedClass === cls.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedClass(cls.id)}
                  >
                    <div>
                      <span className="font-medium">{cls.name}</span>
                      {cls.grade && cls.section && (
                        <span className="text-sm ml-2 opacity-80">
                          (Grade {cls.grade}, Section {cls.section})
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {classOptions.length === 0 && (
                  <div className="p-4 text-center border border-dashed rounded-md">
                    <p className="text-gray-500">No classes available. Add classes to create timetable.</p>
                  </div>
                )}
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

      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Card' : 'Add New Card'}</DialogTitle>
            <DialogDescription>
              Fill out the details for this timetable card.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select value={newCard.day} onValueChange={(value) => setNewCard({...newCard, day: value})}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Select value={newCard.periodId} onValueChange={(value) => setNewCard({...newCard, periodId: value})}>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {samplePeriods.map(period => (
                      <SelectItem key={period.id} value={period.id}>
                        {period.name} ({period.startTime}-{period.endTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={newCard.subjectId} onValueChange={(value) => setNewCard({...newCard, subjectId: value})}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(sampleSubjects).map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Select value={newCard.teacherId} onValueChange={(value) => setNewCard({...newCard, teacherId: value})}>
                <SelectTrigger id="teacher">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(sampleTeachers).map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Select value={newCard.roomId} onValueChange={(value) => setNewCard({...newCard, roomId: value})}>
                <SelectTrigger id="room">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(sampleRooms).map(room => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} (Capacity: {room.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={newCard.classId} onValueChange={(value) => setNewCard({...newCard, classId: value})}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCardDialogOpen(false)}>Cancel</Button>
            <Button onClick={isEditMode ? handleEditCard : handleAddCard}>
              {isEditMode ? 'Save Changes' : 'Add Card'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this card?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this timetable card.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCard} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DndProvider>
  );
};

export default TimetableViewer;
