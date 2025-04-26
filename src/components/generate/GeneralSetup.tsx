import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Timetable } from '@/types';
import { DatePicker } from '../ui/datepicker';

// Define additional types needed for GeneralSetup
export interface SchoolInfo {
  name: string;
  address: string;
  principalName: string;
  contactNumber: string;
}

export interface WorkingDay {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface Period {
  duration: number;
  startTime: string;
}

export interface GeneralSetupProps {
  timetable: Timetable;
  onTimetableChange: React.Dispatch<React.SetStateAction<Timetable>>;
  onNext: () => void;
}

const GeneralSetup: React.FC<GeneralSetupProps> = ({ timetable, onTimetableChange, onNext }) => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'University of Gujrat',
    address: '123 Education Street, Gujrat',
    principalName: 'Dr. Ahmed Khan',
    contactNumber: '+92-123-4567890'
  });

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    { day: 'Monday', isWorking: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Tuesday', isWorking: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Wednesday', isWorking: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Thursday', isWorking: true, startTime: '08:00', endTime: '15:00' },
    { day: 'Friday', isWorking: true, startTime: '08:00', endTime: '13:00' },
    { day: 'Saturday', isWorking: false, startTime: '08:00', endTime: '12:00' },
    { day: 'Sunday', isWorking: false, startTime: '08:00', endTime: '12:00' },
  ]);

  const [periods, setPeriods] = useState<Period[]>([
    { duration: 45, startTime: '08:00' },
    { duration: 45, startTime: '08:50' },
    { duration: 45, startTime: '09:40' },
    { duration: 30, startTime: '10:30' }, // Break
    { duration: 45, startTime: '11:00' },
    { duration: 45, startTime: '11:50' },
    { duration: 45, startTime: '12:40' },
    { duration: 45, startTime: '13:30' },
  ]);

  const handleTimetableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTimetableChange(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    onTimetableChange(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date?: Date) => {
    if (date) {
      onTimetableChange(prev => ({ ...prev, [name]: date.toISOString().split('T')[0] }));
    }
  };

  const handleWorkingDayChange = (index: number, field: keyof WorkingDay, value: any) => {
    const updatedDays = [...workingDays];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    setWorkingDays(updatedDays);
  };

  const handleNext = () => {
    // Validate required fields
    if (!timetable.name || !timetable.academicYear || !timetable.startDate || !timetable.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Proceed to next step
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Setup</CardTitle>
          <CardDescription>Configure basic settings for your timetable</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Timetable Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={timetable.name}
                  onChange={handleTimetableChange}
                  placeholder="e.g., Fall Semester 2023"
                />
              </div>
              
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select
                  value={timetable.academicYear}
                  onValueChange={(value) => handleSelectChange('academicYear', value)}
                >
                  <SelectTrigger id="academicYear">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="term">Term/Semester</Label>
                <Select
                  value={timetable.term}
                  onValueChange={(value) => handleSelectChange('term', value)}
                >
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Fall Semester</SelectItem>
                    <SelectItem value="Spring">Spring Semester</SelectItem>
                    <SelectItem value="Summer">Summer Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <DatePicker
                    date={timetable.startDate ? new Date(timetable.startDate) : undefined}
                    onDateChange={(date) => handleDateChange('startDate', date)}
                    placeholder="Select start date"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <DatePicker
                    date={timetable.endDate ? new Date(timetable.endDate) : undefined}
                    onDateChange={(date) => handleDateChange('endDate', date)}
                    placeholder="Select end date"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Working Days</h3>
              <div className="space-y-2">
                {workingDays.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-1/3">
                      <Checkbox
                        id={`day-${day.day}`}
                        checked={day.isWorking}
                        onCheckedChange={(checked) => 
                          handleWorkingDayChange(index, 'isWorking', checked === true)
                        }
                      />
                      <Label htmlFor={`day-${day.day}`} className="text-sm">
                        {day.day}
                      </Label>
                    </div>
                    
                    {day.isWorking && (
                      <div className="flex space-x-2 w-2/3">
                        <div className="w-1/2">
                          <Input
                            type="time"
                            value={day.startTime}
                            onChange={(e) => 
                              handleWorkingDayChange(index, 'startTime', e.target.value)
                            }
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="w-1/2">
                          <Input
                            type="time"
                            value={day.endTime}
                            onChange={(e) => 
                              handleWorkingDayChange(index, 'endTime', e.target.value)
                            }
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">School Information</h3>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="schoolName" className="text-xs">School Name</Label>
                    <Input
                      id="schoolName"
                      value={schoolInfo.name}
                      onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="principalName" className="text-xs">Principal Name</Label>
                    <Input
                      id="principalName"
                      value={schoolInfo.principalName}
                      onChange={(e) => setSchoolInfo({...schoolInfo, principalName: e.target.value})}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button onClick={handleNext}>Next: Class Setup</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralSetup;
