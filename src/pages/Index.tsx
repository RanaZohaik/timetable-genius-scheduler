
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import WelcomeBanner from '@/components/WelcomeBanner';
import DashboardCard from '@/components/DashboardCard';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  BookOpen, 
  School, 
  Settings, 
  FileText, 
  UserCog, 
  BarChart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header username="Admin" />
      <div className="flex flex-1">
        <Sidebar activePath="/" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <WelcomeBanner
              username="Admin"
              organization="University of Gujrat"
              timetablesCount={0}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel: Core Timetable Features */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Core Timetable Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DashboardCard
                    title="Generate Timetable"
                    description="Create optimized, conflict-free timetables with AI-powered scheduling"
                    icon={<Calendar className="h-5 w-5" />}
                    linkTo="/generate"
                    bgColor="bg-purple-500"
                  />
                  <DashboardCard
                    title="Teacher Substitute"
                    description="Instantly manage teacher absences and find qualified substitutes"
                    icon={<User className="h-5 w-5" />}
                    linkTo="/teachers/substitute"
                    bgColor="bg-amber-500"
                  />
                  <DashboardCard
                    title="Step-by-Step Guide"
                    description="Follow our interactive wizard to set up your perfect timetable"
                    icon={<FileText className="h-5 w-5" />}
                    linkTo="/guide"
                    bgColor="bg-blue-500"
                  />
                  <DashboardCard
                    title="Schedule Demo"
                    description="Book a personalized walkthrough with our support team"
                    icon={<Calendar className="h-5 w-5" />}
                    linkTo="/demo"
                    bgColor="bg-green-600"
                  />
                  <DashboardCard
                    title="Invite Users"
                    description="Add team members with role-based access control"
                    icon={<User className="h-5 w-5" />}
                    linkTo="/users/invite"
                    bgColor="bg-teal-500"
                  />
                  <DashboardCard
                    title="Manage Users"
                    description="View, edit and control user access and permissions"
                    icon={<UserCog className="h-5 w-5" />}
                    linkTo="/users"
                    bgColor="bg-indigo-600"
                  />
                </div>
                
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Your Timetables</h2>
                      <p className="text-gray-500 mb-8">Manage and organize your institution's schedules</p>
                      
                      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <Calendar className="h-10 w-10 text-gray-400" />
                          <h3 className="text-lg font-medium text-gray-900">No Timetables Yet</h3>
                          <p className="text-gray-500 max-w-sm">
                            Create your first timetable to get started with UOG Timetable's
                            intelligent scheduling platform.
                          </p>
                          <Button asChild className="mt-2">
                            <Link to="/generate">
                              Generate First Timetable
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Panel: System Configuration & Management */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">System Configuration</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Link to="/teachers" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <User size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Teachers</h3>
                          <p className="text-sm text-gray-500">Manage teacher profiles & availability</p>
                        </div>
                      </Link>
                      
                      <Separator />
                      
                      <Link to="/classes" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <School size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Classes</h3>
                          <p className="text-sm text-gray-500">Set up grades, sections & requirements</p>
                        </div>
                      </Link>
                      
                      <Separator />
                      
                      <Link to="/subjects" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Subjects</h3>
                          <p className="text-sm text-gray-500">Define subjects with codes & constraints</p>
                        </div>
                      </Link>
                      
                      <Separator />
                      
                      <Link to="/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                          <BarChart size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Reports</h3>
                          <p className="text-sm text-gray-500">Generate detailed timetable reports</p>
                        </div>
                      </Link>
                      
                      <Separator />
                      
                      <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                          <Settings size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Settings</h3>
                          <p className="text-sm text-gray-500">Customize system preferences</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-3">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Teachers</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Classes</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subjects</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Active Timetables</span>
                        <span className="font-semibold">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
