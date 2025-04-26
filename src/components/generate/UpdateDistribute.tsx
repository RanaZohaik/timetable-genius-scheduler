import React, { useState } from 'react';
import { Conflict } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import ConflictResolver from './ConflictResolver';

interface UpdateDistributeProps {
  onBack: () => void;
  onComplete: () => void;
  timetableData: any;
}

const UpdateDistribute: React.FC<UpdateDistributeProps> = ({ onBack, onComplete, timetableData }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [showConflictResolver, setShowConflictResolver] = useState(false);

  const checkForConflicts = () => {
    setIsUpdating(true);
    // Simulate checking for conflicts
    setTimeout(() => {
      const detectedConflicts: Conflict[] = [
        {
          id: "conflict-1",  // Added ID to fix the build error
          type: "teacher",
          description: "Teacher John Smith is assigned to two classes at the same time.",
          severity: "high",
          affectedSlots: [],
        },
        {
          id: "conflict-2",  // Added ID to fix the build error
          type: "room",
          description: "Room 201 is double booked during period 3.",
          severity: "medium",
          affectedSlots: [],
        },
        {
          id: "conflict-3",  // Added ID to fix the build error
          type: "time",
          description: "Class A has no available teacher for subject Math on Monday.",
          severity: "low",
          affectedSlots: [],
        },
      ];

      setConflicts(detectedConflicts);
      setIsUpdating(false);

      if (detectedConflicts.length > 0) {
        setShowConflictResolver(true);
      } else {
        toast.success("No conflicts detected! You can publish the timetable.");
      }
    }, 1500);
  };

  const handleResolveConflicts = () => {
    setShowConflictResolver(false);
    toast.success("Conflicts resolved! You can now proceed.");
    onComplete();
  };

  const handleBackAction = () => {
    onBack();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-2xl p-4">
        <CardHeader>
          <CardTitle>Update and Distribute Timetable</CardTitle>
          <CardDescription>
            Review and resolve any conflicts before distributing the timetable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {conflicts.length === 0 ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="text-green-500 h-6 w-6" />
              <p className="text-lg font-semibold">No conflicts detected!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-yellow-500 h-6 w-6" />
                <p className="text-lg font-semibold">Conflicts Detected:</p>
              </div>
              {conflicts.map((conflict) => (
                <Card key={conflict.id} className="border-l-4 border-red-500 bg-red-50">
                  <CardContent className="py-2">
                    <p className="text-sm font-medium">{conflict.description}</p>
                    <Badge variant="destructive">{conflict.severity}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={handleBackAction}>
            Back
          </Button>
          <Button onClick={checkForConflicts} disabled={isUpdating}>
            {isUpdating ? "Checking for Conflicts..." : "Check for Conflicts"}
          </Button>
        </CardFooter>
      </Card>

      {showConflictResolver && (
        <ConflictResolver conflicts={conflicts} onResolve={handleResolveConflicts} />
      )}
    </div>
  );
};

export default UpdateDistribute;
