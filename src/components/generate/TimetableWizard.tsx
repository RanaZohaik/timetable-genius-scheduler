
import React, { useState } from 'react';
import GeneralSetup from './GeneralSetup';
import ClassSetup from './ClassSetup';
import TeacherManagement from './TeacherManagement';
import SubjectConfiguration from './SubjectConfiguration';
import LessonCreation from './LessonCreation';
import UpdateDistribute from './UpdateDistribute';
import ReviewGenerate from './ReviewGenerate';
import { Steps } from '../ui/steps';
import { Timetable, Teacher, ClassGroup, Subject, Room } from '@/types';

const steps = [
  { title: 'General Setup', description: 'Basic timetable settings' },
  { title: 'Class Setup', description: 'Configure classes and sections' },
  { title: 'Teacher Management', description: 'Add and assign teachers' },
  { title: 'Subject Config', description: 'Define subjects and timings' },
  { title: 'Lesson Creation', description: 'Create lessons and assignments' },
  { title: 'Review & Generate', description: 'Review and generate timetable' },
  { title: 'Update & Distribute', description: 'Finalize and distribute' },
];

const TimetableWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // State for the various data
  const [timetable, setTimetable] = useState<Timetable>({
    id: '',
    name: '',
    academicYear: '',
    term: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slots: [] // Add an empty array for slots
  });
  
  const [teachers, setTeachers] = useState<Teacher[]>([
    { 
      id: '1', 
      name: 'John Smith', 
      email: 'john.smith@example.com',
      department: 'Mathematics',
      subjects: ['Math', 'Physics'],
      hoursPerWeek: 20,
      availability: {
        monday: {morning: true, afternoon: true, evening: false},
        tuesday: {morning: true, afternoon: true, evening: false},
        wednesday: {morning: true, afternoon: false, evening: false},
        thursday: {morning: true, afternoon: true, evening: false},
        friday: {morning: true, afternoon: true, evening: false},
      }
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com',
      department: 'English',
      subjects: ['English Literature', 'Grammar'],
      hoursPerWeek: 18,
      availability: {
        monday: {morning: true, afternoon: true, evening: false},
        tuesday: {morning: false, afternoon: true, evening: false},
        wednesday: {morning: true, afternoon: true, evening: false},
        thursday: {morning: true, afternoon: true, evening: false},
        friday: {morning: true, afternoon: false, evening: false},
      }
    }
  ]);
  
  const [classes, setClasses] = useState<ClassGroup[]>([
    {
      id: '1',
      name: '10-A',
      grade: '10',
      section: 'A',
      roomId: '101',
      classTeacherId: '1',
      students: 30,
      subjects: ['Math', 'English', 'Science', 'History']
    },
    {
      id: '2',
      name: '9-B',
      grade: '9',
      section: 'B',
      roomId: '102',
      classTeacherId: '2',
      students: 28,
      subjects: ['Math', 'English', 'Physics', 'Geography']
    }
  ]);
  
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Math',
      code: 'MATH101',
      hoursPerWeek: 6,
      allowedRooms: ['101', '102'],
      assignedTeacherIds: ['1']
    },
    {
      id: '2',
      name: 'English Literature',
      code: 'ENG201',
      hoursPerWeek: 5,
      allowedRooms: ['102', '103'],
      assignedTeacherIds: ['2']
    }
  ]);
  
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '101',
      name: 'Room 101',
      type: 'Classroom',
      capacity: 35,
      facilities: ['Projector', 'Whiteboard']
    },
    {
      id: '102',
      name: 'Room 102',
      type: 'Classroom',
      capacity: 30,
      facilities: ['Whiteboard']
    },
    {
      id: '103',
      name: 'Lab 1',
      type: 'Laboratory',
      capacity: 25,
      facilities: ['Computers', 'Projector', 'Specialized Equipment']
    }
  ]);

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle completion of wizard
  const handleFinish = () => {
    // Reset to first step after completion
    setCurrentStep(0);
    
    // Clear form data or redirect as needed
    // For now, we'll just go back to first step
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />
      
      <div className="mt-8">
        {currentStep === 0 && (
          <GeneralSetup 
            timetable={timetable}
            onTimetableChange={setTimetable}
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 1 && (
          <ClassSetup 
            classes={classes}
            onClassesChange={setClasses}
            rooms={rooms}
            onRoomsChange={setRooms}
            teachers={teachers}
            onBack={handleBack} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 2 && (
          <TeacherManagement 
            teachers={teachers}
            onTeachersChange={setTeachers}
            subjects={subjects}
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        
        {currentStep === 3 && (
          <SubjectConfiguration 
            subjects={subjects}
            onSubjectsChange={setSubjects}
            teachers={teachers}
            classes={classes}
            rooms={rooms}
            onBack={handleBack} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 4 && (
          <LessonCreation 
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            rooms={rooms}
            onBack={handleBack} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 5 && (
          <ReviewGenerate 
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            onBack={handleBack} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 6 && (
          <UpdateDistribute 
            timetable={timetable}
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            rooms={rooms}
            onBack={handleBack} 
            onFinish={handleFinish} 
          />
        )}
      </div>
    </div>
  );
};

export default TimetableWizard;
