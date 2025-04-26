
export interface Timetable {
  id: string;
  name: string;
  academicYear: string;
  term: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  slots: TimetableSlot[];
  schoolYear?: string; // For backward compatibility
}

export interface TimetableSlot {
  id: string;
  day: string;
  periodId: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  roomId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department?: string;
  subjects: string[];
  hoursPerWeek: number;
  maxHoursPerDay?: number;
  maxHoursPerWeek?: number;
  preferences?: any;
  availability?: {
    monday: { morning: boolean; afternoon: boolean; evening: boolean };
    tuesday: { morning: boolean; afternoon: boolean; evening: boolean };
    wednesday: { morning: boolean; afternoon: boolean; evening: boolean };
    thursday: { morning: boolean; afternoon: boolean; evening: boolean };
    friday: { morning: boolean; afternoon: boolean; evening: boolean };
  };
}

export interface ClassGroup {
  id: string;
  name: string;
  grade: string;
  section: string;
  roomId?: string;
  classTeacherId?: string;
  students?: number;
  numberOfStudents?: number;
  assignedRoom?: string;
  specialRequirements?: string[];
  subjects?: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  hoursPerWeek?: number;
  periodsPerWeek?: number;
  allowedRooms?: string[];
  assignedTeacherIds?: string[];
  description?: string;
  color?: SubjectColor;
}

export type SubjectColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'teal' | 'orange';

export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  facilities: string[];
  features?: string[];
}

export interface Conflict {
  id: string;
  type: 'teacher' | 'room' | 'class' | 'other' | 'subject';
  description: string;
  details: {
    day: string;
    time: string;
    items: string[];
  };
  resolved?: boolean;
  severity?: 'low' | 'medium' | 'high';
  affectedSlots?: any[];
  solution?: string;
}

export interface SchoolInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
}

export interface WorkingDay {
  day: string;
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

export interface Lesson {
  id: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  roomId?: string;
  periodsPerWeek?: number;
  preferences?: {
    consecutivePeriods?: boolean;
    preferredDays?: string[];
  };
}

export interface GenerationSettings {
  prioritizeTeacherPreferences: boolean;
  avoidTeacherIdleHours: boolean;
  balanceTeacherLoad: boolean;
  maximizeLunchBreaks: boolean;
  minimizeRoomChanges: boolean;
  avoidSameSubjectConsecutiveDays: boolean;
  spreadSubjectsEvenly: boolean;
}
