
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, Calendar, Clock, Search, FilterX, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import AbsenceForm from '@/components/substitute/AbsenceForm';

// Mock teacher data
const mockTeachers = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Computer Science', subjects: ['Programming', 'Algorithms'] },
  { id: 2, name: 'Prof. Michael Chen', department: 'Mathematics', subjects: ['Calculus', 'Linear Algebra'] },
  { id: 3, name: 'Dr. Emily Rodriguez', department: 'Physics', subjects: ['Mechanics', 'Electromagnetism'] },
  { id: 4, name: 'Prof. James Wilson', department: 'Computer Science', subjects: ['Database Systems', 'Web Development'] },
  { id: 5, name: 'Dr. Priya Sharma', department: 'Electronics', subjects: ['Digital Systems', 'Microprocessors'] },
];

// Mock absences and substitutes
const mockAbsences = [
  { 
    id: 1, 
    teacherId: 3, 
    date: '2025-04-25', 
    reason: 'Medical leave',
    status: 'resolved',
    slots: [
      { period: '8:30 - 10:00', subject: 'Mechanics', class: 'BSPHY-2A', room: 'Room-301' },
      { period: '10:15 - 11:45', subject: 'Electromagnetism', class: 'BSPHY-3A', room: 'Room-302' },
    ],
    substitutes: [
      { slotIndex: 0, teacherId: 1, status: 'confirmed' },
      { slotIndex: 1, teacherId: 5, status: 'pending' },
    ]
  },
  { 
    id: 2, 
    teacherId: 1, 
    date: '2025-04-24', 
    reason: 'Conference attendance',
    status: 'pending',
    slots: [
      { period: '12:30 - 2:00', subject: 'Programming', class: 'BSCS-1A', room: 'Lab-1' },
      { period: '2:15 - 3:45', subject: 'Algorithms', class: 'BSCS-2A', room: 'Room-201' },
    ],
    substitutes: []
  },
  { 
    id: 3, 
    teacherId: 5, 
    date: '2025-04-26', 
    reason: 'Personal leave',
    status: 'resolved',
    slots: [
      { period: '8:30 - 10:00', subject: 'Digital Systems', class: 'BSEE-1', room: 'Lab-3' },
    ],
    substitutes: [
      { slotIndex: 0, teacherId: 4, status: 'confirmed' },
    ]
  },
];

// Helper function to get teacher by ID
const getTeacherById = (id: number) => {
  return mockTeachers.find(teacher => teacher.id === id);
};

const TeacherSubstitutePage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [absences, setAbsences] = useState(mockAbsences);
  const [selectedAbsence, setSelectedAbsence] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('pending');

  const handleAddAbsence = (absenceData: any) => {
    // In a real app, you would validate and process the data
    setAbsences([...absences, { 
      ...absenceData,
      id: absences.length + 1,
      status: 'pending',
      substitutes: [] 
    }]);
    setIsAddDialogOpen(false);
  };

  const handleConfirmSubstitute = (absenceId: number, slotIndex: number, teacherId: number) => {
    setAbsences(absences.map(absence => {
      if (absence.id === absenceId) {
        const newSubstitutes = [...(absence.substitutes || [])];
        // Check if substitute already exists
        const existingIndex = newSubstitutes.findIndex(s => s.slotIndex === slotIndex);
        
        if (existingIndex >= 0) {
          newSubstitutes[existingIndex] = { slotIndex, teacherId, status: 'confirmed' };
        } else {
          newSubstitutes.push({ slotIndex, teacherId, status: 'confirmed' });
        }
        
        // Check if all slots have confirmed substitutes
        const allConfirmed = absence.slots.every((_, idx) => 
          newSubstitutes.some(s => s.slotIndex === idx && s.status === 'confirmed')
        );
        
        return {
          ...absence,
          status: allConfirmed ? 'resolved' : 'pending',
          substitutes: newSubstitutes
        };
      }
      return absence;
    }));
  };
  
  const filteredAbsences = absences.filter(absence => {
    const teacher = getTeacherById(absence.teacherId);
    const matchesSearch = !searchTerm || 
      (teacher && teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || absence.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <Layout>
      <PageHeader 
        title="Teacher Substitute" 
        description="Mark teachers as absent and find suitable substitutes based on availability"
        actionLabel="Mark Teacher Absent"
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
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-sm">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by teacher name..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-amber-500" />
                <span>Teacher Absences</span>
                <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{filteredAbsences.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAbsences.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Slots</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAbsences.map((absence) => {
                        const teacher = getTeacherById(absence.teacherId);
                        return (
                          <TableRow 
                            key={absence.id}
                            className={selectedAbsence?.id === absence.id ? "bg-amber-50" : ""}
                            onClick={() => setSelectedAbsence(absence)}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell className="font-medium">{teacher?.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-500" />
                                <span>{format(new Date(absence.date), 'MMM d, yyyy')}</span>
                              </div>
                            </TableCell>
                            <TableCell>{absence.reason}</TableCell>
                            <TableCell>{absence.slots.length} classes</TableCell>
                            <TableCell>
                              <Badge 
                                className={absence.status === 'resolved' 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                }
                              >
                                {absence.status === 'resolved' ? 'Resolved' : 'Pending'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-500">No absences found. Try adjusting your filter or add a new absence record.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Substitute Details</CardTitle>
              {selectedAbsence && (
                <CardDescription>
                  {getTeacherById(selectedAbsence.teacherId)?.name} - {format(new Date(selectedAbsence.date), 'MMM d, yyyy')}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {selectedAbsence ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Classes Needing Substitutes</h3>
                    <div className="space-y-3">
                      {selectedAbsence.slots.map((slot: any, index: number) => {
                        const substitute = selectedAbsence.substitutes.find((s: any) => s.slotIndex === index);
                        const substituteTeacher = substitute ? getTeacherById(substitute.teacherId) : null;
                        
                        return (
                          <div key={index} className="border rounded-md p-3">
                            <div className="flex items-center text-sm mb-2">
                              <Clock className="h-3 w-3 text-gray-500 mr-1" />
                              <span className="text-gray-600 font-medium">{slot.period}</span>
                              <Badge className="ml-auto bg-gray-100 text-gray-700 hover:bg-gray-100">{slot.room}</Badge>
                            </div>
                            <div className="mb-2">
                              <div className="font-medium">{slot.subject}</div>
                              <div className="text-sm text-gray-500">{slot.class}</div>
                            </div>
                            
                            {substituteTeacher ? (
                              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium">Substitute:</div>
                                  <div className="flex items-center">
                                    <span className="text-sm">{substituteTeacher.name}</span>
                                    {substitute.status === 'confirmed' && (
                                      <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />
                                    )}
                                  </div>
                                </div>
                                {substitute.status === 'pending' && (
                                  <Button size="sm" variant="outline" onClick={() => handleConfirmSubstitute(selectedAbsence.id, index, substitute.teacherId)}>
                                    Confirm
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <div className="mt-3 pt-3 border-t">
                                <Button size="sm" className="w-full" variant="outline">
                                  Find Substitute
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">Absence Notes</h3>
                    <p className="text-sm text-gray-600">{selectedAbsence.reason}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-500">Select an absence record to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Absence Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mark Teacher Absent</DialogTitle>
          </DialogHeader>
          <AbsenceForm 
            teachers={mockTeachers} 
            onSubmit={handleAddAbsence} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TeacherSubstitutePage;
