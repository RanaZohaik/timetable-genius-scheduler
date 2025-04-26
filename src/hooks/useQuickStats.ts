
import { useState, useEffect } from 'react';
import { Timetable, Teacher, ClassGroup, Subject } from '@/types';

interface QuickStats {
  teachersCount: number;
  classesCount: number;
  subjectsCount: number;
  activeTimetablesCount: number;
}

export const useQuickStats = (timetables: Timetable[]) => {
  const [stats, setStats] = useState<QuickStats>({
    teachersCount: 0,
    classesCount: 0,
    subjectsCount: 0,
    activeTimetablesCount: 0,
  });

  useEffect(() => {
    const uniqueTeachers = new Set<string>();
    const uniqueClasses = new Set<string>();
    const uniqueSubjects = new Set<string>();
    
    timetables.forEach(timetable => {
      timetable.slots.forEach(slot => {
        if (slot.teacherId) uniqueTeachers.add(slot.teacherId);
        if (slot.classId) uniqueClasses.add(slot.classId);
        if (slot.subjectId) uniqueSubjects.add(slot.subjectId);
      });
    });

    const activeTimetables = timetables.filter(t => t.status === 'published').length;

    setStats({
      teachersCount: uniqueTeachers.size,
      classesCount: uniqueClasses.size,
      subjectsCount: uniqueSubjects.size,
      activeTimetablesCount: activeTimetables,
    });
  }, [timetables]);

  return stats;
};
