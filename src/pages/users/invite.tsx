
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, MailIcon, RefreshCw, AlertTriangle, ArrowLeft, CheckCircle2, Clock, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

// Mock data for pending invitations
const mockInvitations = [
  { 
    id: 1, 
    email: 'robert.brown@uog.edu', 
    name: 'Robert Brown',
    role: 'teacher', 
    status: 'pending',
    sentAt: new Date(2025, 3, 22),
    expires: new Date(2025, 4, 22),
  },
  { 
    id: 2, 
    email: 'jennifer.lee@uog.edu', 
    name: 'Jennifer Lee',
    role: 'admin', 
    status: 'pending',
    sentAt: new Date(2025, 3, 21),
    expires: new Date(2025, 4, 21),
  },
  { 
    id: 3, 
    email: 'samuel.garcia@uog.edu', 
    name: 'Samuel Garcia',
    role: 'teacher', 
    status: 'expired',
    sentAt: new Date(2025, 2, 10),
    expires: new Date(2025, 3, 10),
  },
  { 
    id: 4, 
    email: 'lisa.wong@uog.edu', 
    name: 'Lisa Wong',
    role: 'viewer', 
    status: 'pending',
    sentAt: new Date(2025, 3, 18),
    expires: new Date(2025, 4, 18),
  },
];

const InviteUsersPage = () => {
  const [invitations, setInvitations] = useState(mockInvitations);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      emails: '',
      role: 'viewer',
      message: 'I\'d like to invite you to join UOG Timetable as a user. Please click the link below to set up your account.',
    }
  });

  const handleSendInvites = (data: any) => {
    // In a real app, this would send the invitation emails
    console.log('Sending invites with data:', data);
    
    // Parse email addresses
    const emailList = data.emails.split(/[\s,;]+/).filter((e: string) => e.trim().length > 0);
    
    // Add new invitations
    const newInvites = emailList.map((email: string, index: number) => ({
      id: invitations.length + index + 1,
      email: email.trim(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      role: data.role,
      status: 'pending',
      sentAt: new Date(),
      expires: new Date(new Date().setDate(new Date().getDate() + 30)), // Expires in 30 days
    }));
    
    setInvitations([...invitations, ...newInvites]);
    setInviteSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      setInviteSuccess(false);
      setIsInviteDialogOpen(false);
    }, 2000);
  };

  const handleResendInvite = (id: number) => {
    setInvitations(invitations.map(invite => 
      invite.id === id 
        ? {
            ...invite, 
            status: 'pending',
            sentAt: new Date(),
            expires: new Date(new Date().setDate(new Date().getDate() + 30))
          } 
        : invite
    ));
  };

  const handleRevokeInvite = (id: number) => {
    setInvitations(invitations.filter(invite => invite.id !== id));
  };

  // Role badge styling
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'teacher':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'viewer':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  // Status badge styling
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'expired':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Invite Users" 
        description="Send invitations to new users via email and track pending invites"
        actionLabel="Send Invitations"
        onAction={() => setIsInviteDialogOpen(true)}
      />
      
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User Management
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-amber-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Pending Invites</p>
              <h3 className="text-2xl font-bold text-amber-900">
                {invitations.filter(invite => invite.status === 'pending').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Expired Invites</p>
              <h3 className="text-2xl font-bold text-red-900">
                {invitations.filter(invite => invite.status === 'expired').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Total Users</p>
              <h3 className="text-2xl font-bold text-blue-900">5</h3>
              <p className="text-xs text-blue-700 mt-1">View all users</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-teal-500" />
            <span>Pending Invitations</span>
          </CardTitle>
          <CardDescription>
            Track and manage user invitations that have been sent
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell className="font-medium">{invite.email}</TableCell>
                      <TableCell>{invite.name}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(invite.role)}>
                          {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(invite.status)}>
                          {invite.status === 'pending' ? 'Pending' : 'Expired'}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(invite.sentAt, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        {invite.status === 'expired' ? (
                          <span className="text-red-600">Expired</span>
                        ) : (
                          format(invite.expires, 'MMM d, yyyy')
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            onClick={() => handleResendInvite(invite.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                            <span className="sr-only">Resend</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRevokeInvite(invite.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            <span className="sr-only">Revoke</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <p className="text-gray-400">No pending invitations</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Invite New Users</DialogTitle>
          </DialogHeader>
          
          {!inviteSuccess ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSendInvites)} className="space-y-6">
                <FormField
                  name="emails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Addresses</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter email addresses, separated by commas or new lines"
                          className="min-h-24 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter one or more email addresses, separated by commas, spaces, or new lines
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        All invited users will be assigned this role
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invitation Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Optional personal message to include in the invitation email"
                          className="min-h-24 resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <MailIcon className="mr-2 h-4 w-4" />
                    Send Invitations
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="text-center py-6">
              <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Invitations Sent!</h3>
              <p className="text-gray-600">
                Email invitations have been sent successfully.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InviteUsersPage;
