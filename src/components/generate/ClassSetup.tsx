
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, UploadCloud, X, Check } from 'lucide-react';
import { ClassGroup } from '@/types';
import { Textarea } from '../ui/textarea';

interface ClassSetupProps {
  onNext: (data: { classes: ClassGroup[] }) => void;
  onBack: () => void;
}

const ClassSetup: React.FC<ClassSetupProps> = ({ onNext, onBack }) => {
  const [classes, setClasses] = useState<ClassGroup[]>([
    { 
      id: '1', 
      name: 'Class 9-A', 
      grade: '9', 
      section: 'A',
      numberOfStudents: 30,
      assignedRoom: 'Room 101'
    },
    { 
      id: '2', 
      name: 'Class 10-B', 
      grade: '10', 
      section: 'B',
      numberOfStudents: 28,
      assignedRoom: 'Room 102'
    },
  ]);

  const [newClass, setNewClass] = useState<Partial<ClassGroup>>({
    name: '',
    grade: '',
    section: '',
    numberOfStudents: 30,
    assignedRoom: '',
    specialRequirements: []
  });

  const handleNewClassChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for special requirements - convert textarea input to array
    if (name === 'specialRequirements') {
      setNewClass(prev => ({
        ...prev,
        [name]: value.split('\n').filter(item => item.trim() !== '')
      }));
    } else {
      setNewClass(prev => ({
        ...prev,
        [name]: name === 'numberOfStudents' ? Number(value) : value
      }));
    }
  };

  const addClass = () => {
    if (!newClass.name) return;
    
    const classGroup: ClassGroup = {
      id: (classes.length + 1).toString(),
      name: newClass.name,
      grade: newClass.grade,
      section: newClass.section,
      numberOfStudents: newClass.numberOfStudents,
      assignedRoom: newClass.assignedRoom,
      specialRequirements: newClass.specialRequirements
    };

    setClasses([...classes, classGroup]);
    setNewClass({
      name: '',
      grade: '',
      section: '',
      numberOfStudents: 30,
      assignedRoom: '',
      specialRequirements: []
    });
  };

  const removeClass = (id: string) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a placeholder for the file upload functionality
    alert('CSV/Excel import functionality would be implemented here');
  };

  const handleNext = () => {
    onNext({ classes });
  };

  // Convert special requirements array back to newline-separated string for textarea display
  const specialRequirementsText = newClass.specialRequirements ? newClass.specialRequirements.join('\n') : '';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Class Setup</CardTitle>
          <CardDescription>Add and manage classes or sections for your timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add New Class</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newClass.name}
                    onChange={handleNewClassChange}
                    placeholder="e.g., Class 9-A"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grade">Grade/Year</Label>
                    <Input
                      id="grade"
                      name="grade"
                      value={newClass.grade}
                      onChange={handleNewClassChange}
                      placeholder="e.g., 9"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      name="section"
                      value={newClass.section}
                      onChange={handleNewClassChange}
                      placeholder="e.g., A"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numberOfStudents">Number of Students</Label>
                    <Input
                      id="numberOfStudents"
                      name="numberOfStudents"
                      type="number"
                      value={newClass.numberOfStudents || ''}
                      onChange={handleNewClassChange}
                      placeholder="e.g., 30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="assignedRoom">Default Room</Label>
                    <Input
                      id="assignedRoom"
                      name="assignedRoom"
                      value={newClass.assignedRoom || ''}
                      onChange={handleNewClassChange}
                      placeholder="e.g., Room 101"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                  <Textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={specialRequirementsText}
                    onChange={handleNewClassChange}
                    placeholder="Enter any special requirements, one per line"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    e.g., Needs lab access for science classes, Requires projector, etc.
                  </p>
                </div>
                
                <Button onClick={addClass} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Import Classes</h3>
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
              <h3 className="text-lg font-medium mb-4">Class List</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-gray-50 px-4 py-2 border-b">
                  <div className="col-span-4 font-medium text-sm text-gray-600">Name</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600">Grade</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600">Students</div>
                  <div className="col-span-3 font-medium text-sm text-gray-600">Room</div>
                  <div className="col-span-1 font-medium text-sm text-gray-600"></div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  {classes.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No classes added yet
                    </div>
                  ) : (
                    classes.map(cls => (
                      <div key={cls.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center">
                        <div className="col-span-4 text-sm font-medium">{cls.name}</div>
                        <div className="col-span-2 text-sm text-gray-600">
                          {cls.grade}{cls.section ? `-${cls.section}` : ''}
                        </div>
                        <div className="col-span-2 text-sm text-gray-600">
                          {cls.numberOfStudents || '-'}
                        </div>
                        <div className="col-span-3 text-sm text-gray-600">
                          {cls.assignedRoom || '-'}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeClass(cls.id)}
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
                  The system will automatically consider class availability and special requirements when 
                  generating timetables to ensure optimal scheduling and resource allocation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleNext}>Next: Lesson Creation</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClassSetup;
