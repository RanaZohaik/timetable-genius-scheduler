
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import WelcomeBanner from '@/components/WelcomeBanner';
import DashboardCard from '@/components/DashboardCard';
import { Link } from 'react-router-dom';
import { Calendar, User, BookOpen, School, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Generate Timetable"
                description="Create a new timetable for your institution"
                icon={<Calendar className="h-5 w-5" />}
                linkTo="/generate"
                bgColor="bg-purple-500"
              />
              <DashboardCard
                title="Teacher Substitute"
                description="Manage teacher absences and substitutions"
                icon={<User className="h-5 w-5" />}
                linkTo="/teachers"
                bgColor="bg-amber-500"
              />
              <DashboardCard
                title="Step-by-Step Guide"
                description="Learn how to use UOG Timetable"
                icon={<FileText className="h-5 w-5" />}
                linkTo="/guide"
                bgColor="bg-blue-500"
              />
              <DashboardCard
                title="Schedule Demo"
                description="Book a personalized walkthrough"
                icon={<Calendar className="h-5 w-5" />}
                linkTo="/demo"
                bgColor="bg-green-600"
              />
              <DashboardCard
                title="Invite Users"
                description="Add team members to your organization"
                icon={<User className="h-5 w-5" />}
                linkTo="/users/invite"
                bgColor="bg-teal-500"
              />
              <DashboardCard
                title="Manage Users"
                description="View and manage organization members"
                icon={<Settings className="h-5 w-5" />}
                linkTo="/users"
                bgColor="bg-indigo-600"
              />
            </div>

            <Card className="mt-8">
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
        </main>
      </div>
    </div>
  );
};

export default Index;
