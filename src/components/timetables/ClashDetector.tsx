
import React from 'react';
import { TimetableSlot, Teacher, ClassGroup, Room, Conflict } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClashDetectorProps {
  slots: TimetableSlot[];
  newSlot?: TimetableSlot | null;
  onResolveClash: (resolution: 'cancel' | 'replace' | 'reschedule', slot?: TimetableSlot) => void;
}

interface ClashType {
  type: 'teacher' | 'class' | 'room';
  existingSlot: TimetableSlot;
  message: string;
}

const ClashDetector: React.FC<ClashDetectorProps> = ({ slots, newSlot, onResolveClash }) => {
  const [clashes, setClashes] = React.useState<ClashType[]>([]);

  React.useEffect(() => {
    if (!newSlot) {
      setClashes([]);
      return;
    }

    const detectedClashes: ClashType[] = [];

    // Check for teacher clashes (same teacher, same time, different class)
    const teacherClashes = slots.filter(
      slot => 
        slot.id !== newSlot.id && 
        slot.teacherId === newSlot.teacherId && 
        slot.day === newSlot.day && 
        slot.periodId === newSlot.periodId
    );

    if (teacherClashes.length > 0) {
      teacherClashes.forEach(clash => {
        detectedClashes.push({
          type: 'teacher',
          existingSlot: clash,
          message: `Teacher is already assigned to another class at the same time (${clash.day}, Period ${clash.periodId})`
        });
      });
    }

    // Check for class clashes (same class, same time, different subject)
    const classClashes = slots.filter(
      slot => 
        slot.id !== newSlot.id && 
        slot.classId === newSlot.classId && 
        slot.day === newSlot.day && 
        slot.periodId === newSlot.periodId
    );

    if (classClashes.length > 0) {
      classClashes.forEach(clash => {
        detectedClashes.push({
          type: 'class',
          existingSlot: clash,
          message: `Class already has a different subject at this time (${clash.day}, Period ${clash.periodId})`
        });
      });
    }

    // Check for room clashes (same room, same time, different class)
    const roomClashes = slots.filter(
      slot => 
        slot.id !== newSlot.id && 
        slot.roomId === newSlot.roomId && 
        slot.day === newSlot.day && 
        slot.periodId === newSlot.periodId
    );

    if (roomClashes.length > 0) {
      roomClashes.forEach(clash => {
        detectedClashes.push({
          type: 'room',
          existingSlot: clash,
          message: `Room is already booked for another class at the same time (${clash.day}, Period ${clash.periodId})`
        });
      });
    }

    setClashes(detectedClashes);
  }, [newSlot, slots]);

  if (clashes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 my-4">
      {clashes.map((clash, index) => (
        <Alert key={index} variant="destructive" className="bg-red-50 border-red-300">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div className="ml-3 flex-1">
            <AlertTitle className="text-red-700 font-medium">
              {clash.type === 'teacher' ? 'Teacher Scheduling Conflict' : 
               clash.type === 'class' ? 'Class Scheduling Conflict' : 'Room Scheduling Conflict'}
            </AlertTitle>
            <AlertDescription className="text-red-600 mt-1">
              {clash.message}
            </AlertDescription>
            <div className="flex space-x-2 mt-3">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-red-200 hover:bg-red-100 text-red-700"
                onClick={() => onResolveClash('cancel')}
              >
                Cancel My Changes
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-amber-200 hover:bg-amber-100 text-amber-700"
                onClick={() => onResolveClash('replace', clash.existingSlot)}
              >
                Replace Existing Schedule
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-blue-200 hover:bg-blue-100 text-blue-700"
                onClick={() => onResolveClash('reschedule')}
              >
                Reschedule My Class
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default ClashDetector;
