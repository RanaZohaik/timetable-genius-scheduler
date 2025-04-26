import React from 'react';
import { Subject, Teacher, ClassGroup, Room, SubjectColor } from '@/types';

export interface SubjectConfigurationProps {
  subjects: Subject[];
  onSubjectsChange: React.Dispatch<React.SetStateAction<Subject[]>>;
  teachers: Teacher[];
  classes: ClassGroup[];
  rooms: Room[];
  onBack: () => void;
  onNext: () => void;
}

const SubjectConfiguration: React.FC<SubjectConfigurationProps> = ({ subjects, onSubjectsChange, teachers, classes, rooms, onBack, onNext }) => {
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    name: '',
    color: 'blue',
    periodsPerWeek: 3
  });

  const colors: { value: SubjectColor; label: string; bg: string; text: string }[] = [
    { value: 'red', label: 'Red', bg: 'bg-red-100', text: 'text-red-600' },
    { value: 'green', label: 'Green', bg: 'bg-green-100', text: 'text-green-600' },
    { value: 'blue', label: 'Blue', bg: 'bg-blue-100', text: 'text-blue-600' },
    { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-100', text: 'text-yellow-600' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-100', text: 'text-purple-600' },
    { value: 'pink', label: 'Pink', bg: 'bg-pink-100', text: 'text-pink-600' },
    { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-100', text: 'text-indigo-600' },
    { value: 'teal', label: 'Teal', bg: 'bg-teal-100', text: 'text-teal-600' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-100', text: 'text-orange-600' },
  ];

  const handleNewSubjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: name === 'periodsPerWeek' ? Number(value) : value }));
  };

  const handleColorChange = (color: SubjectColor) => {
    setNewSubject(prev => ({ ...prev, color }));
  };

  const generateSubjectCode = (name: string): string => {
    if (!name) return '';
    const prefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}${randomNum}`;
  };

  const addSubject = () => {
    if (!newSubject.name) return;

    const subjectCode = generateSubjectCode(newSubject.name);
    
    const subject: Subject = {
      id: (subjects.length + 1).toString(),
      code: subjectCode,
      name: newSubject.name,
      color: newSubject.color as SubjectColor,
      description: newSubject.description,
      periodsPerWeek: newSubject.periodsPerWeek
    };

    onSubjectsChange([...subjects, subject]);
    setNewSubject({ name: '', color: 'blue', periodsPerWeek: 3 });
  };

  const removeSubject = (id: string) => {
    onSubjectsChange(subjects.filter(subject => subject.id !== id));
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
          <CardTitle>Subject Configuration</CardTitle>
          <CardDescription>Add and configure subjects for your timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Add New Subject</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Subject Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newSubject.name}
                    onChange={handleNewSubjectChange}
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <Label>Color Indicator</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleColorChange(color.value)}
                        className={`w-8 h-8 rounded-full ${color.bg} flex items-center justify-center 
                          ${newSubject.color === color.value ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                        title={color.label}
                      >
                        {newSubject.color === color.value && (
                          <div className={`w-2 h-2 rounded-full ${color.bg === 'bg-yellow-100' ? 'bg-yellow-500' : 'bg-white'}`}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="periodsPerWeek">Periods Per Week</Label>
                  <Input
                    id="periodsPerWeek"
                    name="periodsPerWeek"
                    type="number"
                    min="1"
                    max="20"
                    value={newSubject.periodsPerWeek || ''}
                    onChange={handleNewSubjectChange}
                    placeholder="Number of periods per week"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newSubject.description || ''}
                    onChange={handleNewSubjectChange}
                    placeholder="Enter subject description"
                    rows={3}
                  />
                </div>
                
                <Button onClick={addSubject} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Import Subjects</h3>
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
              <h3 className="text-lg font-medium mb-4">Subject List</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-gray-50 px-4 py-2 border-b">
                  <div className="col-span-2 font-medium text-sm text-gray-600">Code</div>
                  <div className="col-span-3 font-medium text-sm text-gray-600">Name</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600">Color</div>
                  <div className="col-span-3 font-medium text-sm text-gray-600">Periods</div>
                  <div className="col-span-2 font-medium text-sm text-gray-600"></div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  {subjects.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No subjects added yet
                    </div>
                  ) : (
                    subjects.map(subject => (
                      <div key={subject.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center">
                        <div className="col-span-2 text-sm font-mono">{subject.code}</div>
                        <div className="col-span-3 text-sm font-medium">{subject.name}</div>
                        <div className="col-span-2">
                          <span className={`inline-block w-4 h-4 rounded-full bg-${subject.color}-500`}></span>
                        </div>
                        <div className="col-span-3 text-sm">{subject.periodsPerWeek} periods/week</div>
                        <div className="col-span-2 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubject(subject.id)}
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
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={handleNext}>Next: Teacher Management</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubjectConfiguration;
