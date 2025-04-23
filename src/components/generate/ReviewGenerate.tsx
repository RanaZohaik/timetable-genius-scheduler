
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, AlertCircle, AlertTriangle, ArrowRight, Info, Activity } from 'lucide-react';
import { Teacher, Subject, ClassGroup, Lesson, Room, Period, GenerationSettings, Conflict } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface ReviewGenerateProps {
  subjects: Subject[];
  teachers: Teacher[];
  classes: ClassGroup[];
  lessons: Lesson[];
  rooms: Room[];
  periods: Period[];
  onGenerate: (settings: GenerationSettings) => void;
  onBack: () => void;
}

const ReviewGenerate: React.FC<ReviewGenerateProps> = ({ 
  subjects, teachers, classes, lessons, rooms, periods, onGenerate, onBack 
}) => {
  const [generationSettings, setGenerationSettings] = useState<GenerationSettings>({
    prioritizeTeacherPreferences: true,
    avoidTeacherIdleHours: true,
    balanceTeacherLoad: true,
    maximizeLunchBreaks: true,
    minimizeRoomChanges: true,
    avoidSameSubjectConsecutiveDays: true,
    spreadSubjectsEvenly: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Sample conflicts for UI demonstration
  const conflicts: Conflict[] = [
    {
      type: 'teacher',
      description: 'John Doe is assigned 22 periods/week which exceeds maximum capacity (20)',
      severity: 'medium',
      affectedSlots: []
    },
    {
      type: 'room',
      description: 'Computer Lab is required for 3 lessons at the same time on Monday',
      severity: 'high',
      affectedSlots: []
    }
  ];

  const handleSettingChange = (key: keyof GenerationSettings, value: boolean) => {
    setGenerationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerateTimetable = () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate the generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onGenerate(generationSettings);
            setIsGenerating(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Helper function to check if requirements are met
  const checkRequirements = () => {
    const checks = {
      subjects: subjects.length > 0,
      teachers: teachers.length > 0,
      classes: classes.length > 0,
      lessons: lessons.length > 0,
      periods: periods.length > 0,
    };
    
    return checks;
  };

  const requirements = checkRequirements();
  const readyToGenerate = Object.values(requirements).every(Boolean);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Generate Timetable</CardTitle>
          <CardDescription>Review your data and generate a conflict-free timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="review">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="review">Review Data</TabsTrigger>
              <TabsTrigger value="conflicts">Conflicts ({conflicts.length})</TabsTrigger>
              <TabsTrigger value="settings">Generation Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="review" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Subjects:</span>
                        <span className="text-sm font-medium">{subjects.length}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Teachers:</span>
                        <span className="text-sm font-medium">{teachers.length}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Classes:</span>
                        <span className="text-sm font-medium">{classes.length}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Lessons:</span>
                        <span className="text-sm font-medium">{lessons.length}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Rooms:</span>
                        <span className="text-sm font-medium">{rooms.length}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Periods Structure:</span>
                        <span className="text-sm font-medium">
                          {periods.length} ({periods.filter(p => !p.isBreak).length} teaching, {periods.filter(p => p.isBreak).length} breaks)
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-gray-500">Total Teaching Periods:</span>
                        <span className="text-sm font-medium">{lessons.reduce((sum, lesson) => sum + lesson.periodsPerWeek, 0)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Requirements Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {requirements.subjects ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-sm">Subjects Added</span>
                      </div>
                      <div className="flex items-center">
                        {requirements.teachers ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-sm">Teachers Added</span>
                      </div>
                      <div className="flex items-center">
                        {requirements.classes ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-sm">Classes Added</span>
                      </div>
                      <div className="flex items-center">
                        {requirements.lessons ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-sm">Lessons Created</span>
                      </div>
                      <div className="flex items-center">
                        {requirements.periods ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-sm">Periods Defined</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className={`border ${readyToGenerate ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
                <CardContent className="py-4 px-6">
                  <div className="flex items-start space-x-4">
                    {readyToGenerate ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <h3 className={`font-medium ${readyToGenerate ? 'text-green-700' : 'text-amber-700'}`}>
                        {readyToGenerate ? 'Ready to Generate Timetable' : 'Missing Required Data'}
                      </h3>
                      <p className={`text-sm mt-1 ${readyToGenerate ? 'text-green-600' : 'text-amber-600'}`}>
                        {readyToGenerate 
                          ? 'All requirements are met. You can now generate a conflict-free timetable.' 
                          : 'Please complete all required steps before generating the timetable.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conflicts" className="space-y-4 mt-6">
              {conflicts.length === 0 ? (
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="py-4 px-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-700">No Conflicts Detected</h3>
                        <p className="text-sm mt-1 text-green-600">
                          Your data looks good! No conflicts or issues were detected.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {conflicts.map((conflict, index) => (
                    <Card key={index} className={`border ${
                      conflict.severity === 'high' 
                        ? 'border-red-200 bg-red-50' 
                        : conflict.severity === 'medium'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-yellow-200 bg-yellow-50'
                    }`}>
                      <CardContent className="py-4 px-6">
                        <div className="flex items-start space-x-4">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            conflict.severity === 'high' 
                              ? 'text-red-500' 
                              : conflict.severity === 'medium'
                              ? 'text-amber-500'
                              : 'text-yellow-500'
                          }`} />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {conflict.type.charAt(0).toUpperCase() + conflict.type.slice(1)} Conflict
                            </h3>
                            <p className="text-sm mt-1 text-gray-600">
                              {conflict.description}
                            </p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500 mb-4">
                      The timetable generator will attempt to resolve these conflicts automatically.
                      You can also resolve them manually after generation.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-6">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-md">Optimization Settings</CardTitle>
                  <CardDescription>
                    Configure how the timetable generator should optimize the schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Prioritize Teacher Preferences</h4>
                        <p className="text-xs text-gray-500">Try to honor teacher's preferred days and times</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.prioritizeTeacherPreferences ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('prioritizeTeacherPreferences', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.prioritizeTeacherPreferences ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('prioritizeTeacherPreferences', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Avoid Teacher Idle Hours</h4>
                        <p className="text-xs text-gray-500">Minimize periods where teachers have gaps in their schedule</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.avoidTeacherIdleHours ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('avoidTeacherIdleHours', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.avoidTeacherIdleHours ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('avoidTeacherIdleHours', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Balance Teacher Load</h4>
                        <p className="text-xs text-gray-500">Distribute teaching load evenly across the week</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.balanceTeacherLoad ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('balanceTeacherLoad', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.balanceTeacherLoad ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('balanceTeacherLoad', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Maximize Lunch Breaks</h4>
                        <p className="text-xs text-gray-500">Ensure teachers and classes have lunch breaks when possible</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.maximizeLunchBreaks ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('maximizeLunchBreaks', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.maximizeLunchBreaks ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('maximizeLunchBreaks', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Minimize Room Changes</h4>
                        <p className="text-xs text-gray-500">Try to keep classes in the same room when possible</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.minimizeRoomChanges ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('minimizeRoomChanges', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.minimizeRoomChanges ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('minimizeRoomChanges', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Avoid Same Subject on Consecutive Days</h4>
                        <p className="text-xs text-gray-500">Spread subjects across different days of the week</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.avoidSameSubjectConsecutiveDays ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('avoidSameSubjectConsecutiveDays', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.avoidSameSubjectConsecutiveDays ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('avoidSameSubjectConsecutiveDays', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Spread Subjects Evenly</h4>
                        <p className="text-xs text-gray-500">Distribute subjects evenly throughout the week</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant={generationSettings.spreadSubjectsEvenly ? "default" : "outline"} 
                          size="sm"
                          className="rounded-r-none"
                          onClick={() => handleSettingChange('spreadSubjectsEvenly', true)}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!generationSettings.spreadSubjectsEvenly ? "default" : "outline"} 
                          size="sm"
                          className="rounded-l-none"
                          onClick={() => handleSettingChange('spreadSubjectsEvenly', false)}
                        >
                          Off
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          
          {isGenerating ? (
            <div className="flex flex-col items-end space-y-2 w-1/2">
              <div className="w-full">
                <Progress value={progress} className="h-2 w-full" />
              </div>
              <span className="text-xs text-gray-500">Generating timetable... {progress}%</span>
            </div>
          ) : (
            <Button 
              onClick={handleGenerateTimetable} 
              disabled={!readyToGenerate}
              className="flex items-center"
            >
              Generate Timetable
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewGenerate;
