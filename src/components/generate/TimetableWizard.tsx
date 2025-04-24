
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import GeneralSetup from './GeneralSetup';
import SubjectConfiguration from './SubjectConfiguration';
import TeacherManagement from './TeacherManagement';
import ClassSetup from './ClassSetup';
import LessonCreation from './LessonCreation';
import ReviewGenerate from './ReviewGenerate';
import UpdateDistribute from './UpdateDistribute';
import { SchoolInfo, WorkingDay, Period, Subject, Teacher, ClassGroup, Lesson, Room, GenerationSettings, Timetable } from '@/types';
import { CheckCircle } from 'lucide-react';

// Enhanced wizard step interface for better UI
interface WizardStepInfo {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

enum WizardStep {
  GeneralSetup = 0,
  SubjectConfiguration = 1,
  TeacherManagement = 2,
  ClassSetup = 3,
  LessonCreation = 4,
  ReviewGenerate = 5,
  UpdateDistribute = 6
}

const TimetableWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.GeneralSetup);
  
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'University of Gujrat',
    address: '',
    email: '',
    phone: '',
  });
  
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  
  const [generatedTimetable, setGeneratedTimetable] = useState<Timetable>({
    id: '1',
    name: 'University of Gujrat Timetable',
    schoolYear: '2023-2024',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slots: [],
    status: 'draft'
  });

  // Define steps with enhanced UI data
  const steps: WizardStepInfo[] = [
    { 
      id: WizardStep.GeneralSetup,
      name: "General Setup", 
      description: "School info & periods",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">1</div>
    },
    { 
      id: WizardStep.SubjectConfiguration,
      name: "Subjects", 
      description: "Configure subjects",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">2</div>
    },
    { 
      id: WizardStep.TeacherManagement,
      name: "Teachers", 
      description: "Teacher profiles",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">3</div>
    },
    { 
      id: WizardStep.ClassSetup,
      name: "Classes", 
      description: "Class setup",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">4</div>
    },
    { 
      id: WizardStep.LessonCreation,
      name: "Lessons", 
      description: "Create lessons",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">5</div>
    },
    { 
      id: WizardStep.ReviewGenerate,
      name: "Generate", 
      description: "Review & generate",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">6</div>
    },
    { 
      id: WizardStep.UpdateDistribute,
      name: "Distribute", 
      description: "Share & finalize",
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">7</div>
    },
  ];

  const handleGeneralSetupComplete = (data: { 
    schoolInfo: SchoolInfo; workingDays: WorkingDay[]; periods: Period[] 
  }) => {
    setSchoolInfo(data.schoolInfo);
    setWorkingDays(data.workingDays);
    setPeriods(data.periods);
    setCurrentStep(WizardStep.SubjectConfiguration);
  };

  const handleSubjectConfigurationComplete = (data: { subjects: Subject[] }) => {
    setSubjects(data.subjects);
    setCurrentStep(WizardStep.TeacherManagement);
  };

  const handleTeacherManagementComplete = (data: { teachers: Teacher[] }) => {
    setTeachers(data.teachers);
    setCurrentStep(WizardStep.ClassSetup);
  };

  const handleClassSetupComplete = (data: { classes: ClassGroup[] }) => {
    setClasses(data.classes);
    setCurrentStep(WizardStep.LessonCreation);
  };

  const handleLessonCreationComplete = (data: { lessons: Lesson[], rooms: Room[] }) => {
    setLessons(data.lessons);
    setRooms(data.rooms);
    setCurrentStep(WizardStep.ReviewGenerate);
  };

  const handleGenerateTimetable = (settings: GenerationSettings) => {
    // In a real app, this would call a backend API to generate the timetable
    console.log('Generating timetable with settings:', settings);
    
    // For now, just proceed to the next step with mock data
    setCurrentStep(WizardStep.UpdateDistribute);
  };

  const handleFinish = () => {
    // In a real app, this would save the final timetable and redirect
    console.log('Timetable wizard completed');
    window.location.href = '/';
  };

  const getStepContent = () => {
    switch (currentStep) {
      case WizardStep.GeneralSetup:
        return <GeneralSetup onNext={handleGeneralSetupComplete} />;
        
      case WizardStep.SubjectConfiguration:
        return (
          <SubjectConfiguration 
            onNext={handleSubjectConfigurationComplete}
            onBack={() => setCurrentStep(WizardStep.GeneralSetup)}
          />
        );
        
      case WizardStep.TeacherManagement:
        return (
          <TeacherManagement 
            subjects={subjects}
            onNext={handleTeacherManagementComplete}
            onBack={() => setCurrentStep(WizardStep.SubjectConfiguration)}
          />
        );
        
      case WizardStep.ClassSetup:
        return (
          <ClassSetup 
            onNext={handleClassSetupComplete}
            onBack={() => setCurrentStep(WizardStep.TeacherManagement)}
          />
        );
        
      case WizardStep.LessonCreation:
        return (
          <LessonCreation 
            teachers={teachers}
            subjects={subjects}
            classes={classes}
            onNext={handleLessonCreationComplete}
            onBack={() => setCurrentStep(WizardStep.ClassSetup)}
          />
        );
        
      case WizardStep.ReviewGenerate:
        return (
          <ReviewGenerate 
            subjects={subjects}
            teachers={teachers}
            classes={classes}
            lessons={lessons}
            rooms={rooms}
            periods={periods}
            onGenerate={handleGenerateTimetable}
            onBack={() => setCurrentStep(WizardStep.LessonCreation)}
          />
        );
        
      case WizardStep.UpdateDistribute:
        return (
          <UpdateDistribute 
            timetable={generatedTimetable}
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            rooms={rooms}
            onBack={() => setCurrentStep(WizardStep.ReviewGenerate)}
            onFinish={handleFinish}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white shadow-md border-purple-100">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Enhanced progress indicator */}
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`${currentStep >= step.id ? 'bg-purple-600' : 'bg-gray-200'} 
                              ${currentStep === step.id ? 'ring-4 ring-purple-100' : ''} 
                              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300`}
                    onClick={() => index < currentStep && setCurrentStep(step.id)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <span className={`${currentStep >= step.id ? 'text-white' : 'text-gray-500'} text-sm font-medium`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center w-24">
                    <p className={`text-sm font-medium ${currentStep === step.id ? 'text-purple-700' : 'text-gray-600'}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Step connector line */}
              <div className="absolute top-5 h-0.5 bg-gray-200 w-full z-0" />
              <div 
                className="absolute top-5 h-0.5 bg-purple-600 transition-all duration-500 z-0" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Step content container with enhanced animation */}
      <div className="transition-all duration-300">
        {getStepContent()}
      </div>
    </div>
  );
};

export default TimetableWizard;
