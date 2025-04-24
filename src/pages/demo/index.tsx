
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';

const DemoPage = () => {
  const [date, setDate] = useState<Date>();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating form submission
    setTimeout(() => {
      setFormStatus('submitted');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 500);
  };

  return (
    <Layout>
      <PageHeader 
        title="Schedule a Demo" 
        description="Book a live demonstration of UOG Timetable's full features with our team" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book a Live Demo</CardTitle>
            <CardDescription>Choose a date and time that works best for you and provide some details about your institution.</CardDescription>
          </CardHeader>
          
          {formStatus === 'submitted' ? (
            <CardContent className="pt-6">
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Demo Scheduled!</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Thank you for scheduling a demo with us. You'll receive a confirmation email with meeting details shortly.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFormStatus('idle')}
                >
                  Schedule Another Demo
                </Button>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john.doe@example.com" type="email" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="administrator">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="it-staff">IT Staff</SelectItem>
                        <SelectItem value="counselor">Counselor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="institution-size">Institution Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="institution-size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (< 500 students)</SelectItem>
                        <SelectItem value="medium">Medium (500-1500 students)</SelectItem>
                        <SelectItem value="large">Large (1500+ students)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label>Preferred Demo Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable dates in the past and weekends
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const day = date.getDay();
                          return date < now || day === 0 || day === 6;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="preferred-time">Preferred Time (Your Local Time)</Label>
                  <Select>
                    <SelectTrigger id="preferred-time">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="questions">Questions or Specific Areas of Interest</Label>
                  <Textarea 
                    id="questions" 
                    placeholder="Please share any specific features or questions you'd like addressed during the demo."
                    rows={3}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full">Schedule Demo</Button>
              </CardFooter>
            </form>
          )}
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
              <CardDescription>Our personalized demo sessions typically run for 45-60 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Introduction</h4>
                    <p className="text-sm text-gray-600">Brief overview of UOG Timetable's capabilities</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Guided Product Tour</h4>
                    <p className="text-sm text-gray-600">Walkthrough of all key features and modules</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Custom Use Cases</h4>
                    <p className="text-sm text-gray-600">Solutions for your specific institutional needs</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Q&A Session</h4>
                    <p className="text-sm text-gray-600">Open discussion about your institution's needs</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">5</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Next Steps</h4>
                    <p className="text-sm text-gray-600">Implementation options and pricing information</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Watch Recorded Demos</CardTitle>
              <CardDescription>Can't wait for a live session? Watch these pre-recorded demos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Full Product Overview</h4>
                      <p className="text-sm text-gray-600 mt-1">Comprehensive walkthrough of all features</p>
                    </div>
                    <Badge variant="secondary">25 min</Badge>
                  </div>
                </li>
                <li className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Timetable Generation</h4>
                      <p className="text-sm text-gray-600 mt-1">AI-powered scheduling in action</p>
                    </div>
                    <Badge variant="secondary">12 min</Badge>
                  </div>
                </li>
                <li className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Teacher Substitution</h4>
                      <p className="text-sm text-gray-600 mt-1">Managing teacher absences efficiently</p>
                    </div>
                    <Badge variant="secondary">8 min</Badge>
                  </div>
                </li>
                <li className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Setup Tutorial</h4>
                      <p className="text-sm text-gray-600 mt-1">Step-by-step implementation guide</p>
                    </div>
                    <Badge variant="secondary">15 min</Badge>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DemoPage;
