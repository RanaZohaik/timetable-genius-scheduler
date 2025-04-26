
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, AlertCircle, ArrowRight, Info, Activity } from 'lucide-react';
import { Teacher, Subject, ClassGroup, Lesson, Room, Period, GenerationSettings, Conflict } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import ConflictResolver from './ConflictResolver';
import { useToast } from '@/hooks/use-toast';

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
  const [activeTab, setActiveTab] = useState('review');
  const { toast } = useToast();
  
  // Enhanced conflicts for UI demonstration with IDs and solutions
  const conflicts: Conflict[] = [
    {
      id: 'conflict-1',
      type: 'teacher',
      description: 'John Doe is assigned 22 periods/week which exceeds maximum capacity (20)',
      severity: 'medium',
      affectedSlots: [],
      solution: 'Redistribute 2 periods to another qualified teacher or reduce the teaching load.'
    },
    {
      id: 'conflict-2',
      type: 'room',
      description: 'Computer Lab is required for 3 lessons at the same time on Monday',
      severity: 'high',
      affectedSlots: [],
      solution: 'Reschedule one of the computer classes to Tuesday or schedule them in different periods.'
    },
    {
      id: 'conflict-3',
      type: 'class',
      description: 'Class 3C has Physics and Chemistry scheduled at the same time',
      severity: 'high',
      affectedSlots: [],
      solution: 'Move Chemistry class to a different period or day.'
    },
    {
      id: 'conflict-4',
      type: 'subject',
      description: 'Mathematics occurs on 3 consecutive days, may cause student fatigue',
      severity: 'low',
      affectedSlots: [],
      solution: 'Distribute Mathematics classes more evenly throughout the week.'
    }
  ];

  const handleSettingChange = (key: keyof GenerationSettings, value: boolean) => {
    setGenerationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleResolveAllConflicts = () => {
    toast({
      title: "Conflicts resolved",
      description: "All conflicts have been automatically resolved based on optimization settings.",
    });
    // In a real app, this would apply automatic fixes to the conflicts
  };
  
  const handleIgnoreConflict = (conflictId: string) => {
    toast({
      title: "Conflict ignored",
      description: "This conflict will be ignored during timetable generation.",
    });
    // In a real app, this would mark the conflict as ignored
  };
  
  const handleViewConflictDetails = (conflictId: string) => {
    toast({
      title: "Viewing conflict details",
      description: "Showing detailed information about the selected conflict.",
    });
    // In a real app, this would show a modal with detailed conflict info
  };

  const handleGenerateTimetable = () => {
    setIsGenerating(true);
    setProgress(0);
    setActiveTab('review');
    
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
      <Card className="bg-white shadow-md border-purple-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-purple-800">Review & Generate Timetable</CardTitle>
              <CardDescription>Review your data and generate a conflict-free timetable</CardDescription>
            </div>
            {readyToGenerate && !isGenerating && (
              <Button 
                onClick={handleGenerateTimetable} 
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                Generate Timetable
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="review" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
                Review Data
              </TabsTrigger>
              <TabsTrigger value="conflicts" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
                Conflicts ({conflicts.length})
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
                Generation Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="review" className="space-y-6 mt-2 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="py-3">
                    <CardTitle className="text-md flex items-center">
                      <Info className="h-4 w-4 mr-2 text-purple-600" />
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
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="py-3">
                    <CardTitle className="text-md flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-purple-600" />
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
              
              <Card className={
                readyToGenerate 
                  ? "border border-green-200 bg-green-50 shadow-sm" 
                  : "border border-amber-200 bg-amber-50 shadow-sm"
              }>
                <CardContent className="py-4 px-6">
                  <div className="flex items-start space-x-4">
                    {readyToGenerate ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-amber-500 mt-0.5 shrink-0" />
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
            
            <TabsContent value="conflicts" className="space-y-4 animate-fade-in">
              <ConflictResolver 
                conflicts={conflicts}
                onResolveAll={handleResolveAllConflicts}
                onIgnore={handleIgnoreConflict}
                onViewDetails={handleViewConflictDetails}
              />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 animate-fade-in">
              <Card className="shadow-sm">
                <CardHeader className="py-4">
                  <CardTitle className="text-md">Optimization Settings</CardTitle>
                  <CardDescription>
                    Configure how the timetable generator should optimize the schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Prioritize Teacher Preferences</h4>
                          <p className="text-xs text-gray-500">Try to honor teacher's preferred days and times</p>
                        </div>
                        <Switch
                          checked={generationSettings.prioritizeTeacherPreferences}
                          onCheckedChange={(checked) => handleSettingChange('prioritizeTeacherPreferences', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Avoid Teacher Idle Hours</h4>
                          <p className="text-xs text-gray-500">Minimize periods where teachers have gaps in their schedule</p>
                        </div>
                        <Switch
                          checked={generationSettings.avoidTeacherIdleHours}
                          onCheckedChange={(checked) => handleSettingChange('avoidTeacherIdleHours', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Balance Teacher Load</h4>
                          <p className="text-xs text-gray-500">Distribute teaching load evenly across the week</p>
                        </div>
                        <Switch
                          checked={generationSettings.balanceTeacherLoad}
                          onCheckedChange={(checked) => handleSettingChange('balanceTeacherLoad', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Maximize Lunch Breaks</h4>
                          <p className="text-xs text-gray-500">Ensure teachers and classes have lunch breaks when possible</p>
                        </div>
                        <Switch
                          checked={generationSettings.maximizeLunchBreaks}
                          onCheckedChange={(checked) => handleSettingChange('maximizeLunchBreaks', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Minimize Room Changes</h4>
                          <p className="text-xs text-gray-500">Try to keep classes in the same room when possible</p>
                        </div>
                        <Switch
                          checked={generationSettings.minimizeRoomChanges}
                          onCheckedChange={(checked) => handleSettingChange('minimizeRoomChanges', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Avoid Same Subject on Consecutive Days</h4>
                          <p className="text-xs text-gray-500">Spread subjects across different days of the week</p>
                        </div>
                        <Switch
                          checked={generationSettings.avoidSameSubjectConsecutiveDays}
                          onCheckedChange={(checked) => handleSettingChange('avoidSameSubjectConsecutiveDays', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-sm font-medium">Spread Subjects Evenly</h4>
                          <p className="text-xs text-gray-500">Distribute subjects evenly throughout the week</p>
                        </div>
                        <Switch
                          checked={generationSettings.spreadSubjectsEvenly}
                          onCheckedChange={(checked) => handleSettingChange('spreadSubjectsEvenly', checked)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-purple-100 bg-purple-50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-purple-800">Algorithm Performance</h3>
                      <p className="text-sm text-purple-700 mt-1">
                        Enabling more optimization settings may increase generation time but produces better results.
                        For large schools with complex requirements, expect generation to take 1-2 minutes.
                      </p>
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
                <Progress value={progress} className="h-2 w-full bg-gray-200" indicatorClassName="bg-purple-600" />
              </div>
              <span className="text-xs text-gray-500">Generating timetable... {progress}%</span>
            </div>
          ) : (
            <Button 
              onClick={handleGenerateTimetable} 
              disabled={!readyToGenerate}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
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
