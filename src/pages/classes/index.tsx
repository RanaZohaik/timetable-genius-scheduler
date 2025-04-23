
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { School, Edit, Trash2, Search, FilterX, Users, Clock } from 'lucide-react';
import ClassForm from '@/components/classes/ClassForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockClasses = [
  { id: 1, name: 'BSCS-1A', fullName: 'BS Computer Science - 1st Year Section A', department: 'Computer Science', students: 45, specialNeeds: false },
  { id: 2, name: 'BSCS-1B', fullName: 'BS Computer Science - 1st Year Section B', department: 'Computer Science', students: 40, specialNeeds: false },
  { id: 3, name: 'BSCS-2A', fullName: 'BS Computer Science - 2nd Year Section A', department: 'Computer Science', students: 38, specialNeeds: false },
  { id: 4, name: 'BSMATH-1', fullName: 'BS Mathematics - 1st Year', department: 'Mathematics', students: 30, specialNeeds: false },
  { id: 5, name: 'BSEE-1', fullName: 'BS Electronics Engineering - 1st Year', department: 'Electronics', students: 35, specialNeeds: true },
];

// Mock assigned subjects
const mockAssignedSubjects = [
  { classId: 1, subjects: ['Programming Fundamentals', 'Calculus I', 'Physics for Engineers', 'English Composition', 'Introduction to Computing'] },
  { classId: 2, subjects: ['Programming Fundamentals', 'Calculus I', 'Physics for Engineers', 'English Composition', 'Introduction to Computing'] },
  { classId: 3, subjects: ['Data Structures', 'Object-Oriented Programming', 'Digital Logic Design', 'Discrete Mathematics', 'Technical Writing'] },
  { classId: 4, subjects: ['Calculus I', 'Linear Algebra', 'Discrete Mathematics', 'English Composition', 'Introduction to Computing'] },
  { classId: 5, subjects: ['Physics for Engineers', 'Digital Logic Design', 'Calculus I', 'Technical Communication', 'Circuit Theory'] },
];

// Mock timetable slots
const mockTimetable = [
  { classId: 1, day: 'Monday', slots: [
    { period: '8:30 - 10:00', subject: 'Programming Fundamentals', room: 'Lab-1' },
    { period: '10:15 - 11:45', subject: 'Calculus I', room: 'Room-101' },
    { period: '12:30 - 2:00', subject: 'Physics for Engineers', room: 'Room-201' },
  ]},
  { classId: 1, day: 'Tuesday', slots: [
    { period: '8:30 - 10:00', subject: 'English Composition', room: 'Room-102' },
    { period: '10:15 - 11:45', subject: 'Introduction to Computing', room: 'Lab-2' },
    { period: '12:30 - 2:00', subject: 'Programming Fundamentals', room: 'Lab-1' },
  ]},
  // More data would be included here for other days and classes
];

const ClassesPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState(mockClasses);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleAddClass = (classData: any) => {
    setClasses([...classes, { ...classData, id: classes.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleEditClass = (classData: any) => {
    setClasses(classes.map(c => c.id === classData.id ? classData : c));
    setEditingClass(null);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };
  
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAssignedSubjects = (classId: number) => {
    const assignment = mockAssignedSubjects.find(a => a.classId === classId);
    return assignment ? assignment.subjects : [];
  };

  const getClassTimetable = (classId: number) => {
    return mockTimetable.filter(t => t.classId === classId);
  };

  return (
    <Layout>
      <PageHeader 
        title="Classes Management" 
        description="Set up and manage classes, sections, and their specific timetable requirements"
        actionLabel="Add Class"
        onAction={() => setIsAddDialogOpen(true)}
      />
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Search & Filter</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>
              <FilterX className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by class name, full name or department..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-blue-500" />
                <span>Classes and Sections</span>
                <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{filteredClasses.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredClasses.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Code</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Special Needs</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map((classItem) => (
                        <TableRow 
                          key={classItem.id}
                          className={selectedClass?.id === classItem.id ? "bg-blue-50" : ""}
                          onClick={() => setSelectedClass(classItem)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell className="font-medium">{classItem.name}</TableCell>
                          <TableCell>{classItem.fullName}</TableCell>
                          <TableCell>{classItem.department}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-gray-500" />
                              <span>{classItem.students}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {classItem.specialNeeds ? (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Yes</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50">No</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingClass(classItem);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClass(classItem.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-500">No classes found. Try adjusting your search or add a new class.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Class Details</CardTitle>
              {selectedClass && (
                <CardDescription>
                  {selectedClass.fullName}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {selectedClass ? (
                <Tabs defaultValue="subjects">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                  </TabsList>
                  <TabsContent value="subjects" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Assigned Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {getAssignedSubjects(selectedClass.id).map(subject => (
                          <Badge key={subject} className="bg-blue-100 text-blue-800 hover:bg-blue-100">{subject}</Badge>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button size="sm" className="w-full">
                          Manage Subjects
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="timetable" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Weekly Schedule</h3>
                      <div className="space-y-3">
                        {getClassTimetable(selectedClass.id).map((daySchedule, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <h4 className="font-medium text-sm mb-2">{daySchedule.day}</h4>
                            <div className="space-y-2">
                              {daySchedule.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="flex items-center text-sm bg-gray-50 p-2 rounded">
                                  <Clock className="h-3 w-3 text-gray-500 mr-1" />
                                  <span className="text-gray-600 font-medium mr-2">{slot.period}:</span>
                                  <span>{slot.subject}</span>
                                  <Badge className="ml-auto bg-gray-100 text-gray-700 hover:bg-gray-100">{slot.room}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button size="sm" className="w-full">
                          View Full Timetable
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-500">Select a class to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
          </DialogHeader>
          <ClassForm onSubmit={handleAddClass} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={!!editingClass} onOpenChange={(isOpen) => !isOpen && setEditingClass(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>
          {editingClass && (
            <ClassForm 
              classData={editingClass} 
              onSubmit={handleEditClass} 
              onCancel={() => setEditingClass(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ClassesPage;
