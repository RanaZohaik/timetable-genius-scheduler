
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart, FilterX, Download, Printer } from 'lucide-react';
import { 
  BarChart as RechartBar, 
  Bar, 
  LineChart as RechartLine, 
  Line, 
  PieChart as RechartPie, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for teacher load chart
const teacherLoadData = [
  { name: 'Dr. Sarah Johnson', load: 18, expected: 20 },
  { name: 'Prof. Michael Chen', load: 16, expected: 18 },
  { name: 'Dr. Emily Rodriguez', load: 20, expected: 20 },
  { name: 'Prof. James Wilson', load: 12, expected: 15 },
  { name: 'Dr. Priya Sharma', load: 22, expected: 20 },
  { name: 'Prof. David Lee', load: 15, expected: 15 },
  { name: 'Dr. Robert Brown', load: 18, expected: 18 },
];

// Mock data for room utilization
const roomUtilizationData = [
  { name: 'Lab-1', value: 85 },
  { name: 'Lab-2', value: 70 },
  { name: 'Room-101', value: 95 },
  { name: 'Room-102', value: 60 },
  { name: 'Room-201', value: 75 },
  { name: 'Room-202', value: 50 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

// Mock data for weekly classes
const weeklyClassesData = [
  { day: 'Monday', classes: 42 },
  { day: 'Tuesday', classes: 38 },
  { day: 'Wednesday', classes: 45 },
  { day: 'Thursday', classes: 40 },
  { day: 'Friday', classes: 35 },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('teacher-load');

  return (
    <Layout>
      <PageHeader 
        title="Reports" 
        description="Generate, view and export various reports related to timetable data"
      />
      
      <div className="mb-6 flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teacher-load">Teacher Load</TabsTrigger>
            <TabsTrigger value="room-utilization">Room Utilization</TabsTrigger>
            <TabsTrigger value="weekly-classes">Weekly Classes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab === 'teacher-load' && <BarChart className="h-5 w-5 text-purple-500" />}
                  {activeTab === 'room-utilization' && <PieChart className="h-5 w-5 text-blue-500" />}
                  {activeTab === 'weekly-classes' && <LineChart className="h-5 w-5 text-green-500" />}
                  <span>
                    {activeTab === 'teacher-load' && 'Teacher Load Analysis'}
                    {activeTab === 'room-utilization' && 'Room Utilization'}
                    {activeTab === 'weekly-classes' && 'Weekly Class Distribution'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {activeTab === 'teacher-load' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBar
                      data={teacherLoadData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="load" name="Current Load" fill="#8884d8" />
                      <Bar dataKey="expected" name="Expected Load" fill="#82ca9d" />
                    </RechartBar>
                  </ResponsiveContainer>
                )}
                
                {activeTab === 'room-utilization' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPie
                      data={roomUtilizationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={1}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {roomUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </RechartPie>
                  </ResponsiveContainer>
                )}
                
                {activeTab === 'weekly-classes' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLine
                      data={weeklyClassesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="classes" 
                        name="Number of Classes" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </RechartLine>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Report Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTab === 'teacher-load' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="all">All Departments</option>
                        <option value="cs">Computer Science</option>
                        <option value="math">Mathematics</option>
                        <option value="physics">Physics</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Load Type</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="weekly">Weekly Hours</option>
                        <option value="credit">Credit Hours</option>
                      </select>
                    </div>
                  </>
                )}
                
                {activeTab === 'room-utilization' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Room Type</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="all">All Rooms</option>
                        <option value="lab">Labs Only</option>
                        <option value="classroom">Classrooms Only</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Period</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="week">Current Week</option>
                        <option value="month">This Month</option>
                        <option value="term">Full Term</option>
                      </select>
                    </div>
                  </>
                )}
                
                {activeTab === 'weekly-classes' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="all">All Classes</option>
                        <option value="bscs-1a">BSCS-1A</option>
                        <option value="bscs-1b">BSCS-1B</option>
                        <option value="bscs-2a">BSCS-2A</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Week</label>
                      <select className="w-full border rounded-md p-2">
                        <option value="current">Current Week</option>
                        <option value="next">Next Week</option>
                        <option value="previous">Previous Week</option>
                      </select>
                    </div>
                  </>
                )}
                
                <Button className="w-full mt-4">Update Report</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Export as PDF</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 15v-2h6v2" />
                    <path d="M11 13v6" />
                    <path d="M9 19h4" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Export as Excel</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                    <line x1="10" y1="9" x2="14" y2="9" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Save to Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <rect x="6" y="14" width="3" height="3" />
                    <rect x="12" y="14" width="3" height="3" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
