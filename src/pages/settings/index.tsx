
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, Building, Calendar, Clock, Bell, PaintBucket, 
  Save, Download, Upload, RefreshCw
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const weekdays = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('school-info');
  const [loading, setLoading] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const schoolInfoForm = useForm({
    defaultValues: {
      schoolName: 'University of Gujrat',
      address: '1 University Way, Gujrat',
      email: 'admin@uog.edu',
      phone: '+92-123-4567890',
      website: 'www.uog.edu',
      logo: '',
      description: 'University of Gujrat is a leading educational institution committed to excellence in teaching and research.'
    }
  });
  
  const periodSettingsForm = useForm({
    defaultValues: {
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      periodsPerDay: 8,
      periodDuration: 45,
      startTime: '08:00',
      breakTime: '10:30',
      breakDuration: 15,
      lunchTime: '12:30',
      lunchDuration: 45,
    }
  });
  
  const preferencesForm = useForm({
    defaultValues: {
      theme: 'light',
      language: 'en',
      notifications: true,
      emailNotifications: true,
      autoSave: true,
      maxTeacherLoad: 24,
      allowConflicts: false,
      enableSubstitution: true,
      restrictRooms: true,
      backupFrequency: 'daily'
    }
  });
  
  const handleSaveSchoolInfo = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log('School info saved:', data);
      toast({
        title: "Settings saved",
        description: "School information has been updated successfully.",
      });
      setLoading(false);
    }, 800);
  };
  
  const handleSavePeriodSettings = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Period settings saved:', data);
      toast({
        title: "Settings saved",
        description: "Period settings have been updated successfully.",
      });
      setLoading(false);
    }, 800);
  };
  
  const handleSavePreferences = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Preferences saved:', data);
      toast({
        title: "Settings saved",
        description: "Preferences have been updated successfully.",
      });
      setLoading(false);
    }, 800);
  };

  const handleCreateBackup = () => {
    setLoading(true);
    setTimeout(() => {
      const settings = {
        schoolInfo: schoolInfoForm.getValues(),
        periodSettings: periodSettingsForm.getValues(),
        preferences: preferencesForm.getValues(),
        timestamp: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(settings, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `system-settings-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Backup created",
        description: "System settings have been backed up successfully.",
      });
      
      setLoading(false);
    }, 1000);
  };
  
  const handleRestoreBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target?.result as string);
          
          if (settings.schoolInfo) {
            schoolInfoForm.reset(settings.schoolInfo);
          }
          
          if (settings.periodSettings) {
            periodSettingsForm.reset(settings.periodSettings);
          }
          
          if (settings.preferences) {
            preferencesForm.reset(settings.preferences);
          }
          
          toast({
            title: "Backup restored",
            description: `Settings restored from backup (${new Date(settings.timestamp).toLocaleString()})`,
          });
          
          setIsRestoreDialogOpen(false);
        } catch (error) {
          toast({
            title: "Restore failed",
            description: "The selected file is not a valid settings backup.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <Layout>
      <PageHeader 
        title="System Settings" 
        description="Configure system settings and preferences for the timetable generation process"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Setting Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav>
                <ul className="space-y-1 p-3">
                  <li>
                    <button 
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                        activeTab === 'school-info' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('school-info')}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      School Information
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                        activeTab === 'period-settings' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('period-settings')}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Period Settings
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                        activeTab === 'preferences' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('preferences')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      General Preferences
                    </button>
                  </li>
                </ul>
              </nav>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Help</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p className="mb-3">Configure your system settings carefully as they affect how your timetable will be generated.</p>
              <p className="mb-3">School information is used in reports and exports. Period settings define the structure of your school day, and preferences control various system behaviors.</p>
              <p>For more help, check our <a href="#" className="text-blue-600 hover:underline">documentation</a> or contact support.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {activeTab === 'school-info' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-600" />
                  <span>School Information</span>
                </CardTitle>
                <CardDescription>
                  Basic details about your institution used in reports and exports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...schoolInfoForm}>
                  <form onSubmit={schoolInfoForm.handleSubmit(handleSaveSchoolInfo)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={schoolInfoForm.control}
                        name="schoolName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>School Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={schoolInfoForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={schoolInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={schoolInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={schoolInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={schoolInfoForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Input type="file" className="w-full" onChange={(e) => console.log(e.target.files)} />
                              {field.value && (
                                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                                  <img src={field.value} alt="Logo" className="max-h-full" />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload school logo for reports and header (PNG or JPEG, max 1MB)
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={schoolInfoForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="min-h-24 resize-none" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description used in timetable exports and reports
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save School Information
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'period-settings' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Period Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure the structure of school days, periods and breaks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...periodSettingsForm}>
                  <form onSubmit={periodSettingsForm.handleSubmit(handleSavePeriodSettings)} className="space-y-6">
                    <FormItem>
                      <FormLabel>Working Days</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {weekdays.map((day) => (
                          <label
                            key={day.id}
                            className={`flex items-center justify-center px-3 py-2 border rounded-md cursor-pointer ${
                              periodSettingsForm.watch('workingDays').includes(day.id)
                                ? 'bg-purple-100 border-purple-300 text-purple-700'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={day.id}
                              className="sr-only"
                              checked={periodSettingsForm.watch('workingDays').includes(day.id)}
                              onChange={(e) => {
                                const currentValues = periodSettingsForm.watch('workingDays');
                                if (e.target.checked) {
                                  periodSettingsForm.setValue('workingDays', [...currentValues, day.id]);
                                } else {
                                  periodSettingsForm.setValue('workingDays', currentValues.filter(v => v !== day.id));
                                }
                              }}
                            />
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </FormItem>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={periodSettingsForm.control}
                        name="periodsPerDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Periods Per Day</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="12" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={periodSettingsForm.control}
                        name="periodDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period Duration (mins)</FormLabel>
                            <FormControl>
                              <Input type="number" min="30" max="90" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={periodSettingsForm.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="font-medium mb-4">Break Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={periodSettingsForm.control}
                          name="breakTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Morning Break Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={periodSettingsForm.control}
                          name="breakDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Break Duration (mins)</FormLabel>
                              <FormControl>
                                <Input type="number" min="5" max="30" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={periodSettingsForm.control}
                        name="lunchTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lunch Break Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={periodSettingsForm.control}
                        name="lunchDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lunch Duration (mins)</FormLabel>
                            <FormControl>
                              <Input type="number" min="15" max="90" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Period Settings
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'preferences' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span>General Preferences</span>
                </CardTitle>
                <CardDescription>
                  Personalize the system and set constraints for timetable generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...preferencesForm}>
                  <form onSubmit={preferencesForm.handleSubmit(handleSavePreferences)} className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium mb-4">Appearance & Interface</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={preferencesForm.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Theme</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select theme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="system">System Default</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={preferencesForm.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="ur">Urdu</SelectItem>
                                  <SelectItem value="ar">Arabic</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <FormField
                          control={preferencesForm.control}
                          name="notifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>System Notifications</FormLabel>
                                <FormDescription>
                                  Show notifications about conflicts and updates
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
                        
                        <FormField
                          control={preferencesForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive emails about important system changes
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
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium mb-4">Timetable Constraints</h3>
                      <div className="space-y-4">
                        <FormField
                          control={preferencesForm.control}
                          name="maxTeacherLoad"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Teacher Load (hours/week)</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" max="40" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={preferencesForm.control}
                          name="allowConflicts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Allow Conflicts</FormLabel>
                                <FormDescription>
                                  Allow timetable to have conflicts (not recommended)
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
                        
                        <FormField
                          control={preferencesForm.control}
                          name="restrictRooms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Enforce Room Restrictions</FormLabel>
                                <FormDescription>
                                  Only allow subjects in compatible rooms
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
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Backup & Recovery</h3>
                      <div className="space-y-4">
                        <FormField
                          control={preferencesForm.control}
                          name="autoSave"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel>Auto-Save Changes</FormLabel>
                                <FormDescription>
                                  Automatically save changes as you work
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
                        
                        <FormField
                          control={preferencesForm.control}
                          name="backupFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Backup Frequency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="hourly">Hourly</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="manual">Manual Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            className="mr-2" 
                            disabled={loading} 
                            onClick={handleCreateBackup}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Create Backup Now
                          </Button>
                          
                          <AlertDialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Restore from Backup
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Restore from Backup</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will overwrite all current settings with the ones from the backup file.
                                  Make sure to create a backup of your current settings before proceeding.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleRestoreBackup}>
                                  Select Backup File
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
