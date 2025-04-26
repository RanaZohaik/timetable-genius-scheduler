export interface Timetable {
  id: string;
  name: string;
  academicYear: string;
  term: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  hoursPerWeek: number;
  availability: {
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
  roomId: string;
  classTeacherId: string;
  students: number;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  hoursPerWeek: number;
  allowedRooms: string[];
  assignedTeacherIds: string[];
}

export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  facilities: string[];
}

export interface Conflict {
  id: string;
  type: 'teacher' | 'room' | 'class' | 'other';
  description: string;
  details: {
    day: string;
    time: string;
    items: string[];
  };
  resolved: boolean;
}
