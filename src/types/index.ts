
// School settings
export interface SchoolInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  logo?: string;
}

export interface WorkingDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isWorkingDay: boolean;
  startTime: string;
  endTime: string;
}

export interface Period {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

// Subject
export type SubjectColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'teal' | 'orange' | 'pink' | 'indigo';

export interface Subject {
  id: string;
  code: string;
  name: string;
  color: SubjectColor;
  description?: string;
  periodsPerWeek?: number;
  unavailableDays?: string[];
  unavailableTimeSlots?: string[];
}

// Teacher
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[]; // Subject IDs
  maxHoursPerDay?: number;
  maxHoursPerWeek?: number;
  unavailableDays?: string[];
  unavailableTimeSlots?: string[];
  preferences?: {
    preferredStartTime?: string;
    preferredEndTime?: string;
    preferredSubjects?: string[]; // Subject IDs
    consecutivePeriodsLimit?: number;
  };
}

// Class
export interface ClassGroup {
  id: string;
  name: string;
  grade?: string;
  section?: string;
  numberOfStudents?: number;
  assignedRoom?: string;
  unavailableDays?: string[];
  unavailableTimeSlots?: string[];
  specialRequirements?: string[];
}

// Lesson
export interface Lesson {
  id: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  roomId?: string;
  periodsPerWeek: number;
  preferences?: {
    consecutivePeriods?: boolean;
    preferredDays?: string[];
    preferredTimeSlots?: string[];
  };
}

// Room
export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'regular' | 'lab' | 'hall' | 'sports' | 'special';
  features?: string[];
  unavailableDays?: string[];
  unavailableTimeSlots?: string[];
}

// Timetable
export interface TimetableSlot {
  id: string; // Added id property to fix the error
  day: string;
  periodId: string;
  lessonId?: string;
  teacherId?: string;
  subjectId?: string;
  classId?: string;
  roomId?: string;
}

export interface Timetable {
  id: string;
  name: string;
  schoolYear: string;
  term?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  slots: TimetableSlot[];
  status: 'draft' | 'published' | 'archived';
}

// Conflict
export interface Conflict {
  type: 'teacher' | 'room' | 'class' | 'subject' | 'constraint';
  description: string;
  severity: 'low' | 'medium' | 'high';
  affectedSlots: TimetableSlot[];
  suggestions?: any[];
}

// GenerationSettings
export interface GenerationSettings {
  prioritizeTeacherPreferences: boolean;
  avoidTeacherIdleHours: boolean;
  balanceTeacherLoad: boolean;
  maximizeLunchBreaks: boolean;
  minimizeRoomChanges: boolean;
  avoidSameSubjectConsecutiveDays: boolean;
  spreadSubjectsEvenly: boolean;
}
