
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle2, CircleDashed, ArrowRight } from 'lucide-react';

interface GuideStep {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  completed: boolean;
}

const GuidePage = () => {
  const [guideSteps, setGuideSteps] = useState<GuideStep[]>([
    {
      id: 1,
      title: 'Set Up School Information',
      description: 'Configure your school details, schedule structure, and working days',
      path: '/settings',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      completed: true
    },
    {
      id: 2,
      title: 'Manage Subjects',
      description: 'Add subjects with codes, weekly hours, and special requirements',
      path: '/subjects',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      completed: false
    },
    {
      id: 3,
      title: 'Set Up Teachers',
      description: 'Add teacher profiles with subjects and availability',
      path: '/teachers',
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      completed: false
    },
    {
      id: 4,
      title: 'Configure Classes',
      description: 'Create classes and assign subjects to each class',
      path: '/classes',
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      completed: false
    },
    {
      id: 5,
      title: 'Define Lessons',
      description: 'Create lesson connections between classes, subjects, and teachers',
      path: '/generate',
      icon: <FileText className="h-5 w-5 text-rose-500" />,
      completed: false
    },
    {
      id: 6,
      title: 'Generate Your Timetable',
      description: 'Use the timetable wizard to create an optimized schedule',
      path: '/generate',
      icon: <FileText className="h-5 w-5 text-sky-500" />,
      completed: false
    },
    {
      id: 7,
      title: 'Distribute and Share',
      description: 'Export, publish, and share your timetable with teachers and students',
      path: '/generate',
      icon: <FileText className="h-5 w-5 text-teal-500" />,
      completed: false
    }
  ]);
  
  const markComplete = (stepId: number) => {
    setGuideSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  return (
    <Layout>
      <PageHeader 
        title="Step-by-Step Guide" 
        description="Follow these steps to set up and generate your timetable"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span>Interactive Guide</span>
              </CardTitle>
              <CardDescription>Complete these steps in order to set up your timetable system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 before:absolute before:left-4 before:h-full before:w-[1px] before:bg-gray-200">
                {guideSteps.map((step, index) => (
                  <div key={step.id} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-8 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      {step.completed ? (
                        <div className="rounded-full bg-green-100 p-1">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-100 p-1">
                          <CircleDashed className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="rounded-lg border border-gray-200 bg-white p-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-lg font-medium">
                            <span className="text-gray-500 mr-2">{step.id}.</span> {step.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-center">
                          {step.completed ? (
                            <span className="text-sm font-medium text-green-600">Completed</span>
                          ) : (
                            index === 0 || guideSteps[index - 1].completed ? (
                              <Button asChild>
                                <Link to={step.path}>
                                  Go to Step <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                              </Button>
                            ) : (
                              <Button disabled>Locked</Button>
                            )
                          )}
                          
                          {!step.completed && (index === 0 || guideSteps[index - 1].completed) && (
                            <Button variant="outline" onClick={() => markComplete(step.id)}>
                              Mark Done
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {step.id === 1 && step.completed && (
                        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                          <div className="flex items-center text-green-600 mb-1">
                            <CheckCircle2 className="h-4 w-4 mr-1.5" />
                            <span>School information set up successfully</span>
                          </div>
                          <p>You've configured your school details and period structure. This information will be used throughout the timetable process.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Guide Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      Step {guideSteps.filter(step => step.completed).length} of {guideSteps.length}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {Math.round((guideSteps.filter(step => step.completed).length / guideSteps.length) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                  <div style={{ width: `${(guideSteps.filter(step => step.completed).length / guideSteps.length) * 100}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500">
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-2">
                <p className="text-sm text-gray-600">Complete all steps to set up your timetable. Your progress is saved automatically.</p>
                
                <Button variant="outline" className="w-full">
                  Reset Progress
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Watch our video tutorials for step-by-step instructions on using the system.
              </p>
              
              <div className="rounded-md bg-gray-50 p-3 border border-gray-200">
                <h4 className="font-medium mb-2">Video Tutorials</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                      <span className="mr-1.5">▶</span> Getting Started Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                      <span className="mr-1.5">▶</span> Setting Up Your School
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                      <span className="mr-1.5">▶</span> Timetable Generation
                    </a>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full" variant="outline">
                Schedule Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;
