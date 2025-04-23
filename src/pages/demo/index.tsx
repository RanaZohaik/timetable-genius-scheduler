
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Video, Calendar as CalendarIcon, PlayCircle, Users, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

// Mock data for available demo slots
const demoSlots = [
  { date: new Date(2025, 3, 24), slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { date: new Date(2025, 3, 25), slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
  { date: new Date(2025, 3, 26), slots: ['10:00 AM', '1:00 PM'] },
  { date: new Date(2025, 3, 29), slots: ['11:00 AM', '2:00 PM', '5:00 PM'] },
  { date: new Date(2025, 3, 30), slots: ['9:30 AM', '12:30 PM', '3:30 PM'] },
];

// Mock data for recorded demos
const recordedDemos = [
  { 
    id: 1, 
    title: 'Getting Started with UOG Timetable', 
    description: 'Overview of key features and basic navigation',
    duration: '10:45',
    thumbnail: 'https://via.placeholder.com/300x200',
    views: 245,
  },
  { 
    id: 2, 
    title: 'Timetable Generation Process', 
    description: 'Step-by-step guide to creating optimized timetables',
    duration: '15:20',
    thumbnail: 'https://via.placeholder.com/300x200',
    views: 187,
  },
  { 
    id: 3, 
    title: 'Teacher Substitutions & Conflicts', 
    description: 'Managing absent teachers and resolving scheduling conflicts',
    duration: '8:15',
    thumbnail: 'https://via.placeholder.com/300x200',
    views: 132,
  },
  { 
    id: 4, 
    title: 'Reports & Data Export', 
    description: 'Creating and customizing reports for various stakeholders',
    duration: '12:30',
    thumbnail: 'https://via.placeholder.com/300x200',
    views: 98,
  },
];

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      institution: '',
      participants: '1',
      questions: '',
    }
  });
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(undefined);
    
    if (date) {
      const matchingDate = demoSlots.find(slot => 
        slot.date.getDate() === date.getDate() && 
        slot.date.getMonth() === date.getMonth() && 
        slot.date.getFullYear() === date.getFullYear()
      );
      
      setAvailableSlots(matchingDate ? matchingDate.slots : []);
    } else {
      setAvailableSlots([]);
    }
  };
  
  const handleBookDemo = (data: any) => {
    console.log('Booking demo with data:', { ...data, date: selectedDate, timeSlot: selectedSlot });
    // In a real app, this would submit to a server
    setBookingSuccess(true);
  };

  return (
    <Layout>
      <PageHeader 
        title="Schedule Demo" 
        description="Book a live demo session or watch pre-recorded demos of UOG Timetable"
      />
      
      <div className="mb-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="live">
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                <span>Live Demo</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="recorded">
              <div className="flex items-center">
                <PlayCircle className="mr-2 h-4 w-4" />
                <span>Recorded Demos</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {activeTab === 'live' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-green-500" />
                  <span>Book a Live Demo Session</span>
                </CardTitle>
                <CardDescription>
                  Schedule a personalized demo with our team to explore UOG Timetable features
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!bookingSuccess ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleBookDemo)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" required {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" required {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (123) 456-7890" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution Name</FormLabel>
                              <FormControl>
                                <Input placeholder="University/School Name" required {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormItem className="flex flex-col">
                          <FormLabel>Select Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                  )}
                                >
                                  {selectedDate ? (
                                    format(selectedDate, "MMMM d, yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(date) => {
                                  // Disable dates that don't have available slots or are in the past
                                  return (
                                    date < new Date() ||
                                    !demoSlots.some(
                                      slot => 
                                        slot.date.getDate() === date.getDate() && 
                                        slot.date.getMonth() === date.getMonth() && 
                                        slot.date.getFullYear() === date.getFullYear()
                                    )
                                  );
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {selectedDate && availableSlots.length === 0 && (
                            <p className="text-sm text-red-500 mt-1">No slots available on this date</p>
                          )}
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel>Time Slot</FormLabel>
                          <Select 
                            value={selectedSlot} 
                            onValueChange={setSelectedSlot}
                            disabled={!selectedDate || availableSlots.length === 0}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="participants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Participants</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select number" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">Just me</SelectItem>
                                  <SelectItem value="2-5">2-5 people</SelectItem>
                                  <SelectItem value="6-10">6-10 people</SelectItem>
                                  <SelectItem value="10+">More than 10</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="questions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Questions or Topics of Interest</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Let us know what specific topics you'd like covered in the demo"
                                className="resize-none min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This helps us personalize your demo experience
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit"
                          disabled={!selectedDate || !selectedSlot}
                        >
                          Book Demo
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Demo Successfully Booked!</h3>
                    <p className="text-gray-600 mb-6">
                      Your demo is scheduled for {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedSlot}
                    </p>
                    <p className="text-gray-600 mb-4">
                      We've sent a calendar invitation to your email with the meeting details.
                    </p>
                    <Button onClick={() => {
                      setBookingSuccess(false);
                      form.reset();
                      setSelectedDate(undefined);
                      setSelectedSlot(undefined);
                    }}>
                      Book Another Demo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">About Live Demos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">45-Minute Session</h4>
                    <p className="text-sm text-gray-600">Our demos typically last 45 minutes with extra time for Q&A</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bring Your Team</h4>
                    <p className="text-sm text-gray-600">Invite relevant staff members to join and ask questions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Online Meeting</h4>
                    <p className="text-sm text-gray-600">Demos are conducted via Zoom or Google Meet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Overview of UOG Timetable's core features</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Live demonstration of timetable generation</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Detailed walkthrough of key modules</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Customized scenarios based on your needs</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Interactive Q&A session</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Discussion about implementation and pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'recorded' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordedDemos.map((demo) => (
            <Card key={demo.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={demo.thumbnail} 
                  alt={demo.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="rounded-full bg-white bg-opacity-80 p-3">
                    <PlayCircle className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                  {demo.duration}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{demo.views} views</span>
                  </div>
                  <Button size="sm" variant="ghost">Watch Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-purple-100 p-3 mb-4">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Request Custom Demo</h3>
            <p className="text-center text-sm text-gray-600 mb-4">
              Need a demo on a specific topic? Let us know and we'll create it for you.
            </p>
            <Button>Request Video</Button>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default DemoPage;
