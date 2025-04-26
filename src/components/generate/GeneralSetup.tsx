import React from 'react';
import { Timetable, SchoolInfo, WorkingDay, Period } from '@/types';

export interface GeneralSetupProps {
  timetable: Timetable;
  onTimetableChange: React.Dispatch<React.SetStateAction<Timetable>>;
  onNext: () => void;
}

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Plus, Minus, Clock } from 'lucide-react';
import { SchoolInfo, WorkingDay, Period } from '@/types';

interface GeneralSetupProps {
  onNext: (data: { schoolInfo: SchoolInfo; workingDays: WorkingDay[]; periods: Period[] }) => void;
}

const GeneralSetup: React.FC<GeneralSetupProps> = ({ onNext }) => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'University of Gujrat',
    address: '123 Main St, Gujrat, Pakistan',
    email: 'info@uog.edu.pk',
    phone: '+92 123 4567890',
    website: 'www.uog.edu.pk'
  });

  const defaultWorkingDays: WorkingDay[] = [
    { day: 'Monday', isWorkingDay: true, startTime: '08:00', endTime: '16:00' },
    { day: 'Tuesday', isWorkingDay: true, startTime: '08:00', endTime: '16:00' },
    { day: 'Wednesday', isWorkingDay: true, startTime: '08:00', endTime: '16:00' },
    { day: 'Thursday', isWorkingDay: true, startTime: '08:00', endTime: '16:00' },
    { day: 'Friday', isWorkingDay: true, startTime: '08:00', endTime: '16:00' },
    { day: 'Saturday', isWorkingDay: false, startTime: '08:00', endTime: '16:00' },
    { day: 'Sunday', isWorkingDay: false, startTime: '08:00', endTime: '16:00' }
  ];

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>(defaultWorkingDays);

  const defaultPeriods: Period[] = [
    { id: '1', name: 'Period 1', startTime: '08:00', endTime: '09:00', isBreak: false },
    { id: '2', name: 'Period 2', startTime: '09:00', endTime: '10:00', isBreak: false },
    { id: '3', name: 'Break', startTime: '10:00', endTime: '10:30', isBreak: true },
    { id: '4', name: 'Period 3', startTime: '10:30', endTime: '11:30', isBreak: false },
    { id: '5', name: 'Period 4', startTime: '11:30', endTime: '12:30', isBreak: false },
    { id: '6', name: 'Lunch', startTime: '12:30', endTime: '13:30', isBreak: true },
    { id: '7', name: 'Period 5', startTime: '13:30', endTime: '14:30', isBreak: false },
    { id: '8', name: 'Period 6', startTime: '14:30', endTime: '15:30', isBreak: false }
  ];

  const [periods, setPeriods] = useState<Period[]>(defaultPeriods);

  const handleSchoolInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchoolInfo(prev => ({ ...prev, [name]: value }));
  };

  const toggleWorkingDay = (index: number) => {
    const updatedWorkingDays = [...workingDays];
    updatedWorkingDays[index].isWorkingDay = !updatedWorkingDays[index].isWorkingDay;
    setWorkingDays(updatedWorkingDays);
  };

  const handleWorkingDayChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedWorkingDays = [...workingDays];
    updatedWorkingDays[index][field] = value;
    setWorkingDays(updatedWorkingDays);
  };

  const handlePeriodChange = (index: number, field: keyof Period, value: string | boolean) => {
    const updatedPeriods = [...periods];
    // @ts-ignore
    updatedPeriods[index][field] = value;
    setPeriods(updatedPeriods);
  };

  const addPeriod = () => {
    const lastPeriod = periods[periods.length - 1];
    const newEndTime = lastPeriod ? lastPeriod.endTime : '08:00';
    const newPeriod: Period = {
      id: (periods.length + 1).toString(),
      name: `Period ${periods.filter(p => !p.isBreak).length + 1}`,
      startTime: newEndTime,
      endTime: '00:00', // User will need to set this
      isBreak: false
    };
    setPeriods([...periods, newPeriod]);
  };

  const removePeriod = (index: number) => {
    if (periods.length > 1) {
      const updatedPeriods = [...periods];
      updatedPeriods.splice(index, 1);
      setPeriods(updatedPeriods);
    }
  };

  const handleNext = () => {
    onNext({ schoolInfo, workingDays, periods });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>School Information</CardTitle>
          <CardDescription>Enter your institution's details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>
              <Input 
                id="name" 
                name="name"
                value={schoolInfo.name} 
                onChange={handleSchoolInfoChange} 
                placeholder="Enter school name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address"
                value={schoolInfo.address} 
                onChange={handleSchoolInfoChange} 
                placeholder="Enter school address" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={schoolInfo.email} 
                onChange={handleSchoolInfoChange} 
                placeholder="Enter school email" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone"
                value={schoolInfo.phone} 
                onChange={handleSchoolInfoChange} 
                placeholder="Enter school phone" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input 
                id="website" 
                name="website"
                value={schoolInfo.website} 
                onChange={handleSchoolInfoChange} 
                placeholder="Enter school website" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Working Days</CardTitle>
          <CardDescription>Set your institution's working days and hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workingDays.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={day.isWorkingDay} 
                    onCheckedChange={() => toggleWorkingDay(index)} 
                    id={`day-${day.day}`} 
                  />
                  <Label htmlFor={`day-${day.day}`}>{day.day}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Input 
                      type="time" 
                      value={day.startTime} 
                      onChange={(e) => handleWorkingDayChange(index, 'startTime', e.target.value)}
                      disabled={!day.isWorkingDay}
                      className="w-24" 
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Input 
                      type="time" 
                      value={day.endTime} 
                      onChange={(e) => handleWorkingDayChange(index, 'endTime', e.target.value)}
                      disabled={!day.isWorkingDay}
                      className="w-24" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Periods & Breaks</CardTitle>
          <CardDescription>Configure your daily periods and breaks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-4 font-medium text-sm text-gray-600 px-2">
              <div className="col-span-2">Period Name</div>
              <div className="col-span-2">Start Time</div>
              <div className="col-span-2">End Time</div>
              <div className="col-span-1">Break</div>
              <div className="col-span-1"></div>
            </div>
            
            <Separator />

            {periods.map((period, index) => (
              <div key={period.id} className="grid grid-cols-8 gap-4 items-center">
                <div className="col-span-2">
                  <Input 
                    value={period.name} 
                    onChange={(e) => handlePeriodChange(index, 'name', e.target.value)} 
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="time" 
                    value={period.startTime} 
                    onChange={(e) => handlePeriodChange(index, 'startTime', e.target.value)} 
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="time" 
                    value={period.endTime} 
                    onChange={(e) => handlePeriodChange(index, 'endTime', e.target.value)} 
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Switch 
                    checked={period.isBreak} 
                    onCheckedChange={(checked) => handlePeriodChange(index, 'isBreak', checked)} 
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removePeriod(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4 flex items-center" onClick={addPeriod}>
              <Plus className="h-4 w-4 mr-2" />
              Add Period
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button onClick={handleNext}>Next: Subject Configuration</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralSetup;
