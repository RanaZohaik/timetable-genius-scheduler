
import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Printer, Share2 } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const generateRandomData = () => {
  // Generate random data for demo purposes
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science', 'Physical Education'];
  const teacherIds = ['T001', 'T002', 'T003', 'T004', 'T005', 'T006', 'T007'];
  const teacherNames = ['John Smith', 'Sarah Johnson', 'David Williams', 'Emma Brown', 'Michael Davis', 'Sophia Wilson', 'James Taylor'];
  
  const teacherLoad = teacherNames.map((name, index) => ({
    id: teacherIds[index],
    name: name,
    totalHours: Math.floor(Math.random() * 15) + 15,
    subjectCount: Math.floor(Math.random() * 3) + 1,
    classCount: Math.floor(Math.random() * 4) + 2,
  }));
  
  const subjectAllocation = subjects.map(subject => ({
    name: subject,
    value: Math.floor(Math.random() * 20) + 10,
  }));
  
  return { teacherLoad, subjectAllocation };
};

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState<string>('current');
  const { teacherLoad, subjectAllocation } = generateRandomData();
  
  return (
    <Layout>
      <PageHeader 
        title="Reports" 
        description="Generate and export detailed timetable reports"
      />
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="previous">Previous Term</SelectItem>
              <SelectItem value="next">Next Term (Draft)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="teacher">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="teacher">Teacher Load</TabsTrigger>
          <TabsTrigger value="subject">Subject Allocation</TabsTrigger>
          <TabsTrigger value="class">Class Timetables</TabsTrigger>
          <TabsTrigger value="utilization">Resource Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teacher">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Workload Analysis</CardTitle>
                <CardDescription>Total hours per week by teacher</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teacherLoad}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="totalHours" fill="#8884d8" name="Weekly Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Hours allocation by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}h`}
                      >
                        {subjectAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Teacher Workload Details</CardTitle>
                <CardDescription>Detailed breakdown of teaching assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Teacher ID</th>
                        <th scope="col" className="px-6 py-3">Teacher Name</th>
                        <th scope="col" className="px-6 py-3">Total Hours</th>
                        <th scope="col" className="px-6 py-3">Subjects</th>
                        <th scope="col" className="px-6 py-3">Classes</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherLoad.map((teacher) => (
                        <tr key={teacher.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{teacher.id}</td>
                          <td className="px-6 py-4 font-medium">{teacher.name}</td>
                          <td className="px-6 py-4">{teacher.totalHours}</td>
                          <td className="px-6 py-4">{teacher.subjectCount}</td>
                          <td className="px-6 py-4">{teacher.classCount}</td>
                          <td className="px-6 py-4">
                            {teacher.totalHours > 25 ? (
                              <Badge className="bg-amber-500">Overloaded</Badge>
                            ) : teacher.totalHours < 18 ? (
                              <Badge className="bg-blue-500">Underloaded</Badge>
                            ) : (
                              <Badge className="bg-green-500">Optimal</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subject">
          <Card>
            <CardHeader>
              <CardTitle>Subject Allocation Reports</CardTitle>
              <CardDescription>Analysis of subject distribution across classes and teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-60 text-gray-500 text-lg border-2 border-dashed rounded-lg">
                Select a subject to view detailed allocation reports
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="class">
          <Card>
            <CardHeader>
              <CardTitle>Class Timetables</CardTitle>
              <CardDescription>View and export class-specific schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-60 text-gray-500 text-lg border-2 border-dashed rounded-lg">
                Select a class to view or export timetable
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="utilization">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>Classroom and specialist room usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-60 text-gray-500 text-lg border-2 border-dashed rounded-lg">
                Resource utilization data will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ReportsPage;
