
import React, { useState } from 'react';
import { Timetable } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';

// Define custom interfaces for this component
interface SchoolInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
}

interface WorkingDay {
  day: string;
  isWorkingDay: boolean;
  startTime: string;
  endTime: string;
}

interface Period {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

export interface GeneralSetupProps {
  timetable: Timetable;
  onTimetableChange: React.Dispatch<React.SetStateAction<Timetable>>;
  onNext: () => void;
}

const GeneralSetup: React.FC<GeneralSetupProps> = ({ timetable, onTimetableChange, onNext }) => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'University of Gujrat',
    address: 'Jalalpur Jattan Road, Gujrat, Pakistan',
    email: 'info@uog.edu.pk',
    phone: '+92-53-3643112',
    website: 'www.uog.edu.pk'
  });
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    timetable.startDate ? new Date(timetable.startDate) : undefined
  );
  
  const [endDate, setEndDate] = useState<Date | undefined>(
    timetable.endDate ? new Date(timetable.endDate) : undefined
  );

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    { day: 'Monday', isWorkingDay: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Tuesday', isWorkingDay: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Wednesday', isWorkingDay: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Thursday', isWorkingDay: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Friday', isWorkingDay: true, startTime: '08:00', endTime: '14:00' },
    { day: 'Saturday', isWorkingDay: false, startTime: '08:00', endTime: '13:00' },
    { day: 'Sunday', isWorkingDay: false, startTime: '08:00', endTime: '13:00' },
  ]);

  const [periods, setPeriods] = useState<Period[]>([
    { id: '1', name: 'Period 1', startTime: '08:00', endTime: '08:45', isBreak: false },
    { id: '2', name: 'Period 2', startTime: '08:45', endTime: '09:30', isBreak: false },
    { id: '3', name: 'Period 3', startTime: '09:30', endTime: '10:15', isBreak: false },
    { id: '4', name: 'Break', startTime: '10:15', endTime: '10:45', isBreak: true },
    { id: '5', name: 'Period 4', startTime: '10:45', endTime: '11:30', isBreak: false },
    { id: '6', name: 'Period 5', startTime: '11:30', endTime: '12:15', isBreak: false },
    { id: '7', name: 'Period 6', startTime: '12:15', endTime: '13:00', isBreak: false },
    { id: '8', name: 'Lunch', startTime: '13:00', endTime: '13:45', isBreak: true },
    { id: '9', name: 'Period 7', startTime: '13:45', endTime: '14:30', isBreak: false },
    { id: '10', name: 'Period 8', startTime: '14:30', endTime: '15:15', isBreak: false },
  ]);

  const handleTimetableChange = (field: keyof Timetable, value: any) => {
    onTimetableChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | undefined) => {
    if (field === 'startDate') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    if (date) {
      handleTimetableChange(field, date.toISOString().split('T')[0]);
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Setup</CardTitle>
          <CardDescription>Configure the basic details for your timetable</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timetable Basics Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Timetable Basics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Timetable Name</Label>
                <Input
                  id="name"
                  value={timetable.name}
                  onChange={(e) => handleTimetableChange('name', e.target.value)}
                  placeholder="e.g., Spring 2023 Timetable"
                />
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  value={timetable.academicYear}
                  onChange={(e) => handleTimetableChange('academicYear', e.target.value)}
                  placeholder="e.g., 2023-2024"
                />
              </div>
              <div>
                <Label htmlFor="term">Term / Semester</Label>
                <Select 
                  value={timetable.term}
                  onValueChange={(value) => handleTimetableChange('term', value)}
                >
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall Semester</SelectItem>
                    <SelectItem value="Spring">Spring Semester</SelectItem>
                    <SelectItem value="Summer">Summer Term</SelectItem>
                    <SelectItem value="First">First Term</SelectItem>
                    <SelectItem value="Second">Second Term</SelectItem>
                    <SelectItem value="Third">Third Term</SelectItem>
                    <SelectItem value="Fourth">Fourth Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={timetable.status}
                  onValueChange={(value) => handleTimetableChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={date => handleDateChange('startDate', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={date => handleDateChange('endDate', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* School Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">School Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  value={schoolInfo.name}
                  onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <Label htmlFor="schoolEmail">School Email</Label>
                <Input
                  id="schoolEmail"
                  type="email"
                  value={schoolInfo.email}
                  onChange={(e) => setSchoolInfo({...schoolInfo, email: e.target.value})}
                  placeholder="Enter school email"
                />
              </div>
              <div>
                <Label htmlFor="schoolPhone">School Phone Number</Label>
                <Input
                  id="schoolPhone"
                  value={schoolInfo.phone}
                  onChange={(e) => setSchoolInfo({...schoolInfo, phone: e.target.value})}
                  placeholder="Enter school phone number"
                />
              </div>
              <div>
                <Label htmlFor="schoolWebsite">School Website (Optional)</Label>
                <Input
                  id="schoolWebsite"
                  value={schoolInfo.website}
                  onChange={(e) => setSchoolInfo({...schoolInfo, website: e.target.value})}
                  placeholder="Enter school website URL"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="schoolAddress">School Address</Label>
                <Input
                  id="schoolAddress"
                  value={schoolInfo.address}
                  onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                  placeholder="Enter school address"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button onClick={handleNext} className="ml-auto">
            Next: Class Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralSetup;
