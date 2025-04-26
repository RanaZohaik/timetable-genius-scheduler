import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, UploadCloud, X, Check } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Teacher, Subject } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TeacherManagementProps {
  subjects: Subject[];
  teachers: Teacher[];
  onTeachersChange: React.Dispatch<React.SetStateAction<Teacher[]>>;
  onNext: () => void;
  onBack: () => void;
}

const TeacherManagement: React.FC<TeacherManagementProps> = ({ subjects, teachers, onTeachersChange, onNext, onBack }) => {
  const [localTeachers, setLocalTeachers] = useState<Teacher[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john.doe@uog.edu.pk', 
      subjects: ['1', '3'],
      hoursPerWeek: 20,
      maxHoursPerDay: 6,
      maxHoursPerWeek: 20
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane.smith@uog.edu.pk', 
      subjects: ['2'],
      hoursPerWeek: 18,
      maxHoursPerDay: 5,
      maxHoursPerWeek: 18
    },
  ]);

  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: '',
    email: '',
    subjects: [],
    maxHoursPerDay: 6,
    maxHoursPerWeek: 20
  });

  const handleNewTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeacher(prev => ({ 
      ...prev, 
      [name]: name === 'maxHoursPerDay' || name === 'maxHoursPerWeek' ? Number(value) : value 
    }));
  };

  const handleSubjectSelection = (subjectId: string) => {
    setNewTeacher(prev => {
      const currentSubjects = prev.subjects || [];
      if (currentSubjects.includes(subjectId)) {
        return { ...prev, subjects: currentSubjects.filter(id => id !== subjectId) };
      } else {
        return { ...prev, subjects: [...currentSubjects, subjectId] };
      }
    });
  };

  const addTeacher = () => {
    if (!newTeacher.name || !newTeacher.email) return;
    
    const teacher: Teacher = {
      id: (localTeachers.length + 1).toString(),
      name: newTeacher.name,
      email: newTeacher.email,
      subjects: newTeacher.subjects || [],
      hoursPerWeek: newTeacher.maxHoursPerWeek || 20,
      maxHoursPerDay: newTeacher.maxHoursPerDay,
      maxHoursPerWeek: newTeacher.maxHoursPerWeek,
      preferences: newTeacher.preferences
    };

    const updatedTeachers = [...localTeachers, teacher];
    setLocalTeachers(updatedTeachers);
    setNewTeacher({
      name: '',
      email: '',
      subjects: [],
      maxHoursPerDay: 6,
      maxHoursPerWeek: 20
    });
    onTeachersChange(updatedTeachers);
  };

  const removeTeacher = (id: string) => {
    const updatedTeachers = localTeachers.filter(teacher => teacher.id !== id);
    setLocalTeachers(updatedTeachers);
    onTeachersChange(updatedTeachers);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('CSV/Excel import functionality would be implemented here');
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>Add and manage teacher profiles and their subject assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add New Teacher</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Teacher Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newTeacher.name}
                    onChange={handleNewTeacherChange}
                    placeholder="Enter teacher name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newTeacher.email}
                    onChange={handleNewTeacherChange}
                    placeholder="Enter teacher email"
                  />
                </div>
                
                <div>
                  <Label>Assign Subjects</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {subjects.map(subject => (
                      <div key={subject.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`subject-${subject.id}`}
                          checked={(newTeacher.subjects || []).includes(subject.id)}
                          onCheckedChange={() => handleSubjectSelection(subject.id)}
                        />
                        <label
                          htmlFor={`subject-${subject.id}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {subject.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxHoursPerDay">Max Hours Per Day</Label>
                    <Input
                      id="maxHoursPerDay"
                      name="maxHoursPerDay"
                      type="number"
                      min="1"
                      max="10"
                      value={newTeacher.maxHoursPerDay || ''}
                      onChange={handleNewTeacherChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxHoursPerWeek">Max Hours Per Week</Label>
                    <Input
                      id="maxHoursPerWeek"
                      name="maxHoursPerWeek"
                      type="number"
                      min="1"
                      max="40"
                      value={newTeacher.maxHoursPerWeek || ''}
                      onChange={handleNewTeacherChange}
                    />
                  </div>
                </div>
                
                <Button onClick={addTeacher} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Import Teachers</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
                  <p className="text-xs text-gray-400 mb-4">Supported formats: CSV, Excel (.xlsx)</p>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="w-full">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Teacher List</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-gray-50 px-4 py-2 border-b">
                  <div className="col-span-4 font-medium text-sm text-gray-600">Name</div>
                  <div className="col-span-4 font-medium text-sm text-gray-600">Email</div>
                  <div className="col-span-3 font-medium text-sm text-gray-600">Subjects</div>
                  <div className="col-span-1 font-medium text-sm text-gray-600"></div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  {localTeachers.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No teachers added yet
                    </div>
                  ) : (
                    localTeachers.map(teacher => (
                      <div key={teacher.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center">
                        <div className="col-span-4 text-sm font-medium">{teacher.name}</div>
                        <div className="col-span-4 text-sm text-gray-600">{teacher.email}</div>
                        <div className="col-span-3 text-sm">
                          {teacher.subjects.length > 0 ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {teacher.subjects.length} subject{teacher.subjects.length > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              No subjects
                            </span>
                          )}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTeacher(teacher.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mt-6 space-y-2 border rounded-md bg-blue-50 p-4">
                <h4 className="text-sm font-medium text-blue-700 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Automatic Availability Checks
                </h4>
                <p className="text-xs text-blue-600">
                  The system will automatically check teacher availability when generating timetables
                  based on the assigned subjects, maximum hours per day/week, and any specific constraints.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleNext}>Next: Class Setup</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeacherManagement;
