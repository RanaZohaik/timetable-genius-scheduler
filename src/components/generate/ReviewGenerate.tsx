import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Teacher, ClassGroup, Subject, Conflict } from '@/types';
import { Check, AlertTriangle, X, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ReviewGenerateProps {
  teachers: Teacher[];
  classes: ClassGroup[];
  subjects: Subject[];
  onBack: () => void;
  onNext: () => void;
}

const ReviewGenerate: React.FC<ReviewGenerateProps> = ({ teachers, classes, subjects, onBack, onNext }) => {
  const [conflicts, setConflicts] = useState<Conflict[]>([
    {
      id: '1',
      type: 'teacher',
      description: 'Teacher John Smith has conflicting classes on Monday at 10:00 AM',
      severity: 'medium',
      affectedSlots: [],
      solution: 'Reschedule one of the conflicting classes to a different time slot',
      details: {} // Added as per type requirement
    },
    {
      id: '2',
      type: 'room',
      description: 'Room 101 is double-booked on Tuesday at 2:00 PM',
      severity: 'high',
      affectedSlots: [],
      solution: 'Assign a different room to one of the classes',
      details: {} // Added as per type requirement
    },
    {
      id: '3',
      type: 'class',
      description: 'Class 10-A has two consecutive periods of Physics on Wednesday',
      severity: 'high',
      affectedSlots: [],
      solution: 'Distribute Physics periods throughout the week',
      details: {} // Added as per type requirement
    },
    {
      id: '4',
      type: 'subject',
      description: 'Subject Math is scheduled for more than the required hours',
      severity: 'low',
      affectedSlots: [],
      solution: 'Reduce the number of Math periods',
      details: {} // Added as per type requirement
    }
  ]);

  const totalConflicts = conflicts.length;
  const highSeverityConflicts = conflicts.filter(c => c.severity === 'high').length;
  const mediumSeverityConflicts = conflicts.filter(c => c.severity === 'medium').length;
  const lowSeverityConflicts = conflicts.filter(c => c.severity === 'low').length;

  const conflictProgress = totalConflicts > 0 ? ((totalConflicts - highSeverityConflicts) / totalConflicts) * 100 : 100;

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review and Generate</CardTitle>
          <CardDescription>Review all configurations and generate the timetable</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Conflict Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Total Conflicts:</span>
                  <Badge variant="secondary">{totalConflicts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>High Severity:</span>
                  <Badge variant="destructive">{highSeverityConflicts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Medium Severity:</span>
                  <Badge variant="outline">{mediumSeverityConflicts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Low Severity:</span>
                  <Badge>{lowSeverityConflicts}</Badge>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium">Conflict Resolution Progress</h4>
                <Progress value={conflictProgress} className="mt-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {conflictProgress === 100 ? 'All high severity conflicts resolved' : 'Resolve high severity conflicts for best results'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Configuration Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Teachers Configured:</span>
                  <span className="font-medium">{teachers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Classes Configured:</span>
                  <span className="font-medium">{classes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subjects Configured:</span>
                  <span className="font-medium">{subjects.length}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-4">Conflict Details</h3>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Conflicts ({totalConflicts})</TabsTrigger>
                <TabsTrigger value="high">High Severity ({highSeverityConflicts})</TabsTrigger>
                <TabsTrigger value="medium">Medium Severity ({mediumSeverityConflicts})</TabsTrigger>
                <TabsTrigger value="low">Low Severity ({lowSeverityConflicts})</TabsTrigger>
              </TabsList>
              <Separator className="my-2" />
              <TabsContent value="all" className="space-y-3">
                {conflicts.map(conflict => (
                  <div key={conflict.id} className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-center space-x-3 mb-2">
                      {conflict.severity === 'high' && <AlertTriangle className="text-red-500 h-4 w-4" />}
                      {conflict.severity === 'medium' && <AlertTriangle className="text-orange-500 h-4 w-4" />}
                      {conflict.severity === 'low' && <Check className="text-green-500 h-4 w-4" />}
                      <span className="font-medium">{conflict.type.toUpperCase()} CONFLICT</span>
                    </div>
                    <p className="text-sm text-gray-800">{conflict.description}</p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Possible Solution:</span> {conflict.solution}
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="high" className="space-y-3">
                {conflicts
                  .filter(conflict => conflict.severity === 'high')
                  .map(conflict => (
                    <div key={conflict.id} className="border rounded-md p-4 bg-gray-50">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className="text-red-500 h-4 w-4" />
                        <span className="font-medium">{conflict.type.toUpperCase()} CONFLICT</span>
                      </div>
                      <p className="text-sm text-gray-800">{conflict.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Possible Solution:</span> {conflict.solution}
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="medium" className="space-y-3">
                {conflicts
                  .filter(conflict => conflict.severity === 'medium')
                  .map(conflict => (
                    <div key={conflict.id} className="border rounded-md p-4 bg-gray-50">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className="text-orange-500 h-4 w-4" />
                        <span className="font-medium">{conflict.type.toUpperCase()} CONFLICT</span>
                      </div>
                      <p className="text-sm text-gray-800">{conflict.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Possible Solution:</span> {conflict.solution}
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="low" className="space-y-3">
                {conflicts
                  .filter(conflict => conflict.severity === 'low')
                  .map(conflict => (
                    <div key={conflict.id} className="border rounded-md p-4 bg-gray-50">
                      <div className="flex items-center space-x-3 mb-2">
                        <Check className="text-green-500 h-4 w-4" />
                        <span className="font-medium">{conflict.type.toUpperCase()} CONFLICT</span>
                      </div>
                      <p className="text-sm text-gray-800">{conflict.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Possible Solution:</span> {conflict.solution}
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back
          </Button>
          <Button onClick={handleNext}>
            Generate Timetable
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewGenerate;
