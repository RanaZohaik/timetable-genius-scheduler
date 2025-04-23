
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Edit, Trash2, Search, FilterX, UserPlus, ShieldCheck, Lock, Clock } from 'lucide-react';
import UserForm from '@/components/users/UserForm';
import { format } from 'date-fns';

// Mock data for users
const mockUsers = [
  { 
    id: 1, 
    name: 'John Smith',
    email: 'john.smith@uog.edu', 
    role: 'admin', 
    status: 'active',
    lastLogin: new Date(2025, 3, 22),
  },
  { 
    id: 2, 
    name: 'Sarah Johnson',
    email: 'sjohnson@uog.edu', 
    role: 'teacher', 
    status: 'active',
    lastLogin: new Date(2025, 3, 21),
  },
  { 
    id: 3, 
    name: 'Michael Chen',
    email: 'mchen@uog.edu', 
    role: 'teacher', 
    status: 'active',
    lastLogin: new Date(2025, 3, 20),
  },
  { 
    id: 4, 
    name: 'Emma Williams',
    email: 'emma.w@uog.edu', 
    role: 'viewer', 
    status: 'inactive',
    lastLogin: new Date(2025, 3, 15),
  },
  { 
    id: 5, 
    name: 'David Lee',
    email: 'dlee@uog.edu', 
    role: 'admin', 
    status: 'active',
    lastLogin: new Date(2025, 3, 22),
  },
];

const UsersPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleAddUser = (userData: any) => {
    setUsers([...users, { ...userData, id: users.length + 1, lastLogin: null }]);
    setIsAddDialogOpen(false);
  };

  const handleEditUser = (userData: any) => {
    setUsers(users.map(user => user.id === userData.id ? userData : user));
    setEditingUser(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setUserToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'inactive':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="User Management" 
        description="Manage all users with role-based access control"
        actionLabel="Add User"
        onAction={() => setIsAddDialogOpen(true)}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-purple-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800">Total Users</p>
              <h3 className="text-2xl font-bold text-purple-900">{users.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Admins</p>
              <h3 className="text-2xl font-bold text-blue-900">
                {users.filter(user => user.role === 'admin').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Teachers</p>
              <h3 className="text-2xl font-bold text-green-900">
                {users.filter(user => user.role === 'teacher').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Active Today</p>
              <h3 className="text-2xl font-bold text-amber-900">
                {users.filter(
                  user => user.lastLogin && user.lastLogin.toDateString() === new Date().toDateString()
                ).length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4 flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users by name, email or role..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')} className="ml-2">
                <FilterX className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Button asChild className="sm:self-center">
          <Link to="/users/invite">
            <UserPlus className="h-4 w-4 mr-2" /> Invite Users
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            <span>System Users</span>
            <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{filteredUsers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? 
                          format(user.lastLogin, 'MMM d, yyyy') : 
                          <span className="text-gray-400">Never</span>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          >
                            <Lock className="h-4 w-4" />
                            <span className="sr-only">Reset Password</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteClick(user)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
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
              <p className="text-gray-400">
                {searchTerm ? 'No users match your search criteria' : 'No users found. Add users to get started.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <UserForm onSubmit={handleAddUser} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm 
              user={editingUser} 
              onSubmit={handleEditUser} 
              onCancel={() => setEditingUser(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UsersPage;
