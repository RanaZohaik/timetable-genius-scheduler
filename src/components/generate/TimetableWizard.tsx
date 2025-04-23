
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import GeneralSetup from './GeneralSetup';
import SubjectConfiguration from './SubjectConfiguration';
import TeacherManagement from './TeacherManagement';
import ClassSetup from './ClassSetup';
import LessonCreation from './LessonCreation';
import ReviewGenerate from './ReviewGenerate';
import UpdateDistribute from './UpdateDistribute';
import { SchoolInfo, WorkingDay, Period, Subject, Teacher, ClassGroup, Lesson, Room, GenerationSettings, Timetable } from '@/types';
import { Steps, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator } from '../ui/steps';

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
    <div className="space-y-6">
      <Card className="bg-white">
        <CardContent className="pt-6 pb-4">
          <Steps activeStep={currentStep}>
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>General Setup</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Subjects</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Teachers</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Classes</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Lessons</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Generate</StepTitle>
              <StepSeparator />
            </div>
            
            <div className="flex justify-between">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>Distribute</StepTitle>
            </div>
          </Steps>
        </CardContent>
      </Card>
      
      {getStepContent()}
    </div>
  );
};

export default TimetableWizard;
