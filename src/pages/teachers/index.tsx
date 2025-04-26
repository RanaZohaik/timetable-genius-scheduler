import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Edit, Trash2, Search, FilterX } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import TeacherForm from '@/components/teachers/TeacherForm';

// Mock data
const mockTeachers = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@uog.edu', department: 'Computer Science', subjects: ['Programming', 'Algorithms'], status: 'active' },
  { id: 2, name: 'Prof. Michael Chen', email: 'mchen@uog.edu', department: 'Mathematics', subjects: ['Calculus', 'Linear Algebra'], status: 'active' },
  { id: 3, name: 'Dr. Emily Rodriguez', email: 'emily.r@uog.edu', department: 'Physics', subjects: ['Mechanics', 'Electromagnetism'], status: 'on leave' },
  { id: 4, name: 'Prof. James Wilson', email: 'jwilson@uog.edu', department: 'Computer Science', subjects: ['Database Systems', 'Web Development'], status: 'active' },
  { id: 5, name: 'Dr. Priya Sharma', email: 'p.sharma@uog.edu', department: 'Electronics', subjects: ['Digital Systems', 'Microprocessors'], status: 'active' },
];

const TeachersPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState(mockTeachers);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  const handleAddTeacher = (teacher: any) => {
    setTeachers([...teachers, { ...teacher, id: teachers.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleEditTeacher = (teacher: any) => {
    setTeachers(teachers.map(t => t.id === teacher.id ? teacher : t));
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <TooltipProvider>
        <PageHeader 
          title="Teacher Management" 
          description="Add, edit and manage teacher profiles, availability, and subject assignments"
          actionLabel="Add Teacher"
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
                placeholder="Search by name, department or subject..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-500" />
              <span>Teachers</span>
              <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{filteredTeachers.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTeachers.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.map((subject) => (
                              <Badge key={subject} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={teacher.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }
                          >
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setEditingTeacher(teacher)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteTeacher(teacher.id)}
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
                <p className="text-gray-500">No teachers found. Try adjusting your search or add a new teacher.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Teacher Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <TeacherForm onSubmit={handleAddTeacher} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Edit Teacher Dialog */}
        <Dialog open={!!editingTeacher} onOpenChange={(isOpen) => !isOpen && setEditingTeacher(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            {editingTeacher && (
              <TeacherForm 
                teacher={editingTeacher} 
                onSubmit={handleEditTeacher} 
                onCancel={() => setEditingTeacher(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </Layout>
  );
};

export default TeachersPage;
