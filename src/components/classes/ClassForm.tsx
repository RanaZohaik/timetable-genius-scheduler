
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema
const classFormSchema = z.object({
  name: z.string().min(2, { message: "Class code must be at least 2 characters." }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  department: z.string().min(1, { message: "Please select a department." }),
  students: z.coerce.number().int().min(1, { message: "Student count must be at least 1." }),
  specialNeeds: z.boolean().default(false),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

interface ClassFormProps {
  classData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ classData, onSubmit, onCancel }) => {
  const defaultValues = classData || {
    name: '',
    fullName: '',
    department: '',
    students: 30,
    specialNeeds: false
  };

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues
  });

  const handleSubmit = (data: ClassFormValues) => {
    onSubmit({
      ...data,
      id: classData?.id
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Code</FormLabel>
                <FormControl>
                  <Input placeholder="BSCS-1A" {...field} />
                </FormControl>
                <FormDescription>
                  Short unique identifier for this class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Students</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Class Name</FormLabel>
              <FormControl>
                <Input placeholder="BS Computer Science - 1st Year Section A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Special Requirements</FormLabel>
                <FormDescription>
                  This class has special timetable requirements
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {classData ? 'Update Class' : 'Add Class'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClassForm;
