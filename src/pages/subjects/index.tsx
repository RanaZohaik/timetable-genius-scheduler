
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Edit, Trash2, Search, FilterX } from 'lucide-react';
import SubjectForm from '@/components/subjects/SubjectForm';

// Mock data
const mockSubjects = [
  { id: 1, name: 'Programming Fundamentals', code: 'CS101', department: 'Computer Science', color: '#3b82f6', weeklyHours: 4 },
  { id: 2, name: 'Calculus I', code: 'MATH201', department: 'Mathematics', color: '#10b981', weeklyHours: 3 },
  { id: 3, name: 'Digital Logic Design', code: 'EE150', department: 'Electronics', color: '#f59e0b', weeklyHours: 4 },
  { id: 4, name: 'Physics for Engineers', code: 'PHY101', department: 'Physics', color: '#8b5cf6', weeklyHours: 3 },
  { id: 5, name: 'Data Structures', code: 'CS202', department: 'Computer Science', color: '#3b82f6', weeklyHours: 4 },
];

const SubjectsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState(mockSubjects);
  const [editingSubject, setEditingSubject] = useState<any>(null);

  const handleAddSubject = (subject: any) => {
    setSubjects([...subjects, { ...subject, id: subjects.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleEditSubject = (subject: any) => {
    setSubjects(subjects.map(s => s.id === subject.id ? subject : s));
    setEditingSubject(null);
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };
  
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader 
        title="Subjects Management" 
        description="Create and manage subjects with codes, colors, and time constraints"
        actionLabel="Add Subject"
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
              placeholder="Search by name, code or department..."
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
            <BookOpen className="h-5 w-5 text-green-500" />
            <span>Subjects</span>
            <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{filteredSubjects.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubjects.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Subject Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Weekly Hours</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {subject.code}
                        </Badge>
                      </TableCell>
                      <TableCell>{subject.department}</TableCell>
                      <TableCell>{subject.weeklyHours}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="text-xs text-gray-500">{subject.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setEditingSubject(subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteSubject(subject.id)}
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
              <p className="text-gray-500">No subjects found. Try adjusting your search or add a new subject.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <SubjectForm onSubmit={handleAddSubject} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={!!editingSubject} onOpenChange={(isOpen) => !isOpen && setEditingSubject(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
          </DialogHeader>
          {editingSubject && (
            <SubjectForm 
              subject={editingSubject} 
              onSubmit={handleEditSubject} 
              onCancel={() => setEditingSubject(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SubjectsPage;
