
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema
const absenceFormSchema = z.object({
  teacherId: z.coerce.number().min(1, { message: "Please select a teacher." }),
  date: z.date({ required_error: "Please select a date." }),
  reason: z.string().min(1, { message: "Please provide a reason for absence." }),
  slots: z.array(z.object({
    period: z.string(),
    subject: z.string(),
    class: z.string(),
    room: z.string(),
  })).optional(),
});

type AbsenceFormValues = z.infer<typeof absenceFormSchema>;

interface AbsenceFormProps {
  teachers: any[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

// Mock teacher schedule data - in a real app, this would be fetched based on teacher selection
const mockTeacherSchedule = [
  { period: '8:30 - 10:00', subject: 'Programming', class: 'BSCS-1A', room: 'Lab-1' },
  { period: '10:15 - 11:45', subject: 'Algorithms', class: 'BSCS-2A', room: 'Room-201' },
  { period: '12:30 - 2:00', subject: 'Database Systems', class: 'BSCS-3A', room: 'Lab-2' },
];

const AbsenceForm: React.FC<AbsenceFormProps> = ({ teachers, onSubmit, onCancel }) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [teacherSchedule, setTeacherSchedule] = useState<any[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  
  const form = useForm<AbsenceFormValues>({
    resolver: zodResolver(absenceFormSchema),
    defaultValues: {
      teacherId: undefined,
      date: new Date(),
      reason: '',
      slots: [],
    }
  });

  const handleTeacherChange = (teacherId: string) => {
    const id = parseInt(teacherId);
    setSelectedTeacherId(id);
    // In a real app, you would fetch the schedule based on teacher and date
    setTeacherSchedule(mockTeacherSchedule);
    setSelectedSlots([]);
    form.setValue('teacherId', id);
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // In a real app, you would fetch the schedule based on teacher and date
      form.setValue('date', date);
    }
  };

  const toggleSlotSelection = (index: number) => {
    setSelectedSlots(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSubmit = (data: AbsenceFormValues) => {
    // Get only selected slots from the schedule
    const slots = selectedSlots.map(index => teacherSchedule[index]);
    
    onSubmit({
      ...data,
      slots
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher</FormLabel>
                <Select 
                  onValueChange={(value) => handleTeacherChange(value)} 
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Absence Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
                      selected={field.value}
                      onSelect={(date) => {
                        handleDateChange(date);
                        field.onChange(date);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Absence</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide details about the reason for absence"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedTeacherId && teacherSchedule.length > 0 && (
          <div className="space-y-3">
            <FormLabel>Select Classes Requiring Substitutes</FormLabel>
            <div className="border rounded-md">
              <div className="bg-gray-50 p-3 border-b">
                <div className="grid grid-cols-4 gap-2 font-medium text-sm text-gray-700">
                  <div>Period</div>
                  <div>Subject</div>
                  <div>Class</div>
                  <div>Room</div>
                </div>
              </div>
              {teacherSchedule.map((slot, index) => (
                <div 
                  key={index}
                  className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                    selectedSlots.includes(index) ? 'bg-amber-50' : ''
                  }`}
                  onClick={() => toggleSlotSelection(index)}
                >
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-medium">{slot.period}</div>
                    <div>{slot.subject}</div>
                    <div>{slot.class}</div>
                    <div>{slot.room}</div>
                  </div>
                </div>
              ))}
            </div>
            {form.formState.errors.slots && (
              <p className="text-sm font-medium text-red-500">Please select at least one class</p>
            )}
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={selectedSlots.length === 0 || !selectedTeacherId}
          >
            Mark Absent
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AbsenceForm;
