import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import PaginationControls from '@/components/ui/pagination-controls';
import { staffData, StaffMember } from '@/data/staffData';
import {
  Users,
  Search,
  UserPlus,
  Shield,
  User,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  Lock,
  Unlock,
  Save
} from 'lucide-react';

// Extend StaffMember with user-specific properties
interface UserWithAccess extends StaffMember {
  userRole: 'admin' | 'user';
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  lastLogin: string;
  permissions: string[];
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserWithAccess | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  // Form state for adding/editing users
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: 'user',
    status: 'active',
    permissions: [] as string[]
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Convert staff data to user data
  const [users, setUsers] = useState<UserWithAccess[]>([]);

  // Initialize users from staff data
  useEffect(() => {
    const initialUsers: UserWithAccess[] = staffData.map(staff => ({
      ...staff,
      userRole: staff.role === 'Store Manager' || staff.role === 'Assistant Manager' ? 'admin' : 'user',
      status: staff.status as 'active' | 'inactive' | 'on-leave' | 'terminated',
      lastLogin: staff.lastLogin || 'Never',
      permissions: staff.role === 'Store Manager' || staff.role === 'Assistant Manager' 
        ? ['all'] 
        : ['prescription_view', 'patient_view', 'inventory_view']
    }));
    
    // Add admin user if not present
    if (!initialUsers.some(user => user.email === 'admin@walgreens.com')) {
      initialUsers.push({
        id: 'EMP-ADMIN',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@walgreens.com',
        phone: '(555) 000-0000',
        role: 'Administrator',
        userRole: 'admin',
        status: 'active',
        department: 'Management',
        hireDate: '2019-01-01',
        lastLogin: '2024-01-16 10:45 AM',
        certifications: ['System Administration'],
        performance: 100,
        address: 'Corporate HQ',
        emergencyContact: 'IT Department',
        schedule: 'Full-time',
        avatar: null,
        permissions: ['all']
      });
    }
    
    setUsers(initialUsers);
  }, []);

  // Available permissions
  const availablePermissions = [
    { id: 'prescription_view', label: 'View Prescriptions' },
    { id: 'prescription_edit', label: 'Edit Prescriptions' },
    { id: 'prescription_delete', label: 'Delete Prescriptions' },
    { id: 'patient_view', label: 'View Patients' },
    { id: 'patient_edit', label: 'Edit Patients' },
    { id: 'patient_delete', label: 'Delete Patients' },
    { id: 'inventory_view', label: 'View Inventory' },
    { id: 'inventory_edit', label: 'Edit Inventory' },
    { id: 'staff_view', label: 'View Staff' },
    { id: 'staff_edit', label: 'Edit Staff' },
    { id: 'vendor_view', label: 'View Vendors' },
    { id: 'vendor_edit', label: 'Edit Vendors' },
    { id: 'reports_view', label: 'View Reports' },
    { id: 'settings_edit', label: 'Edit Settings' }
  ];

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.userRole === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddUser = () => {
    // Reset form
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userRole: 'user',
      status: 'active',
      permissions: []
    });
    setIsAddUserDialogOpen(true);
  };

  const handleEditUser = (user: UserWithAccess) => {
    setSelectedUser(user);
    setUserForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      confirmPassword: '',
      userRole: user.userRole,
      status: user.status,
      permissions: user.permissions
    });
    setIsEditDialogOpen(true);
  };

  const handleViewUser = (user: UserWithAccess) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeleteUser = (user: UserWithAccess) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleUserStatus = (user: UserWithAccess) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus as 'active' | 'inactive' | 'on-leave' | 'terminated' } : u
    );
    setUsers(updatedUsers);
    
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `${user.firstName} ${user.lastName} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
    });
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "User Deleted",
        description: `${selectedUser.firstName} ${selectedUser.lastName} has been deleted.`,
        variant: "destructive"
      });
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setUserForm({
        ...userForm,
        permissions: [...userForm.permissions, permissionId]
      });
    } else {
      setUserForm({
        ...userForm,
        permissions: userForm.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleRoleChange = (role: string) => {
    // If changing to admin, set all permissions
    if (role === 'admin') {
      setUserForm({
        ...userForm,
        userRole: role as 'admin' | 'user',
        permissions: ['all']
      });
    } else {
      // If changing from admin to user, reset permissions
      setUserForm({
        ...userForm,
        userRole: role as 'admin' | 'user',
        permissions: userForm.permissions.includes('all') ? [] : userForm.permissions
      });
    }
  };

  const handleSubmitAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!userForm.firstName || !userForm.lastName || !userForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (userForm.password !== userForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email.toLowerCase() === userForm.email.toLowerCase())) {
      toast({
        title: "Email Already Exists",
        description: "A user with this email already exists.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new user
    const newUser: UserWithAccess = {
      id: `EMP-${Date.now().toString().slice(-6)}`,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      phone: '(555) 000-0000', // Default phone
      role: userForm.userRole === 'admin' ? 'Administrator' : 'Staff Member',
      userRole: userForm.userRole,
      status: userForm.status as 'active' | 'inactive' | 'on-leave' | 'terminated',
      department: 'Pharmacy',
      hireDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      certifications: [],
      performance: 0,
      address: '',
      emergencyContact: '',
      schedule: 'Full-time',
      avatar: null,
      permissions: userForm.permissions
    };
    
    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    
    toast({
      title: "User Added",
      description: `${newUser.firstName} ${newUser.lastName} has been added successfully.`
    });
  };

  const handleSubmitEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    // Validate form
    if (!userForm.firstName || !userForm.lastName || !userForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists (excluding the current user)
    if (users.some(user => 
      user.email.toLowerCase() === userForm.email.toLowerCase() && 
      user.id !== selectedUser.id
    )) {
      toast({
        title: "Email Already Exists",
        description: "A user with this email already exists.",
        variant: "destructive"
      });
      return;
    }
    
    // Update user
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? {
            ...user,
            firstName: userForm.firstName,
            lastName: userForm.lastName,
            email: userForm.email,
            userRole: userForm.userRole,
            role: userForm.userRole === 'admin' ? 'Administrator' : user.role,
            status: userForm.status as 'active' | 'inactive' | 'on-leave' | 'terminated',
            permissions: userForm.permissions
          }
        : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "User Updated",
      description: `${userForm.firstName} ${userForm.lastName}'s information has been updated.`
    });
  };

  return (
    <Layout title="User Management" subtitle="Manage user accounts and access permissions">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-walgreens-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inactive Users</p>
                  <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status !== 'active').length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Administrators</p>
                  <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.userRole === 'admin').length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users by name, email, or ID..."
                  className="pl-10 focus:border-walgreens-red focus:ring-walgreens-red"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="user">Regular Users</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-walgreens-red hover:bg-red-600" onClick={handleAddUser}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-walgreens-red" />
              <span>System Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left p-3 font-medium text-gray-700">Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">Email</th>
                    <th className="text-left p-3 font-medium text-gray-700">Role</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    <th className="text-left p-3 font-medium text-gray-700">Last Login</th>
                    <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-walgreens-red text-white">
                              {user.firstName[0]}{user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-800">{user.email}</td>
                      <td className="p-3">
                        <Badge className={getRoleColor(user.userRole)}>
                          {user.userRole === 'admin' ? 'Administrator' : 'Regular User'}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-800">{user.lastLogin}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleToggleUserStatus(user)}
                          >
                            {user.status === 'active' ? (
                              <Lock className="h-4 w-4 text-red-600" />
                            ) : (
                              <Unlock className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or add a new user</p>
                <Button className="bg-walgreens-red hover:bg-red-600" onClick={handleAddUser}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View User Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View complete user information and permissions
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-walgreens-red text-white text-xl">
                      {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getRoleColor(selectedUser.userRole)}>
                        {selectedUser.userRole === 'admin' ? 'Administrator' : 'Regular User'}
                      </Badge>
                      <Badge className={getStatusColor(selectedUser.status)}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">User ID</p>
                        <p className="font-medium text-gray-900">{selectedUser.id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Hire Date</p>
                        <p className="font-medium text-gray-900">{selectedUser.hireDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Last Login</p>
                        <p className="font-medium text-gray-900">{selectedUser.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Job Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm text-gray-600">Role</p>
                        <p className="font-medium text-gray-900">{selectedUser.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium text-gray-900">{selectedUser.department}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Permissions</h4>
                  {selectedUser.permissions.includes('all') ? (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Full Administrator Access</span>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">
                        This user has full access to all system features and functions.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availablePermissions.map(permission => (
                        <div 
                          key={permission.id}
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            selectedUser.permissions.includes(permission.id) 
                              ? 'bg-green-50 text-green-900' 
                              : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          {selectedUser.permissions.includes(permission.id) ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm">{permission.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button 
                    className="bg-walgreens-red hover:bg-red-600"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleEditUser(selectedUser);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add User Dialog */}
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and set permissions
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitAddUser} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userForm.firstName}
                      onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userForm.lastName}
                      onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={userForm.userRole} 
                      onValueChange={(value) => handleRoleChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={userForm.confirmPassword}
                      onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Account Status</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="statusActive"
                      checked={userForm.status === 'active'}
                      onChange={() => setUserForm({ ...userForm, status: 'active' })}
                      className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                    />
                    <Label htmlFor="statusActive" className="cursor-pointer">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="statusInactive"
                      checked={userForm.status === 'inactive'}
                      onChange={() => setUserForm({ ...userForm, status: 'inactive' })}
                      className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                    />
                    <Label htmlFor="statusInactive" className="cursor-pointer">Inactive</Label>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              {userForm.userRole !== 'admin' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availablePermissions.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          checked={userForm.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(permission.id, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`permission-${permission.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userForm.userRole === 'admin' && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Administrator Access</span>
                  </div>
                  <p className="text-sm text-purple-700 mt-1">
                    Administrators have full access to all system features and functions.
                  </p>
                </div>
              )}

              <Separator />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddUserDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <form onSubmit={handleSubmitEditUser} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userForm.firstName}
                        onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userForm.lastName}
                        onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={userForm.userRole} 
                        onValueChange={(value) => handleRoleChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Regular User</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Password Reset (Optional) */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Password Reset (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={userForm.confirmPassword}
                        onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Account Status</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="statusActive"
                        checked={userForm.status === 'active'}
                        onChange={() => setUserForm({ ...userForm, status: 'active' })}
                        className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                      />
                      <Label htmlFor="statusActive" className="cursor-pointer">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="statusInactive"
                        checked={userForm.status === 'inactive'}
                        onChange={() => setUserForm({ ...userForm, status: 'inactive' })}
                        className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                      />
                      <Label htmlFor="statusInactive" className="cursor-pointer">Inactive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="statusOnLeave"
                        checked={userForm.status === 'on-leave'}
                        onChange={() => setUserForm({ ...userForm, status: 'on-leave' })}
                        className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                      />
                      <Label htmlFor="statusOnLeave" className="cursor-pointer">On Leave</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="statusTerminated"
                        checked={userForm.status === 'terminated'}
                        onChange={() => setUserForm({ ...userForm, status: 'terminated' })}
                        className="h-4 w-4 text-walgreens-red focus:ring-walgreens-red"
                      />
                      <Label htmlFor="statusTerminated" className="cursor-pointer">Terminated</Label>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                {userForm.userRole !== 'admin' && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availablePermissions.map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`permission-${permission.id}`}
                            checked={userForm.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(permission.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`permission-${permission.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {userForm.userRole === 'admin' && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-900">Administrator Access</span>
                    </div>
                    <p className="text-sm text-purple-700 mt-1">
                      Administrators have full access to all system features and functions.
                    </p>
                  </div>
                )}

                <Separator />

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete User Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm User Deletion</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to delete this user?
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Warning: Permanent Action</p>
                      <p className="text-sm text-red-700 mt-1">
                        You are about to delete the user account for <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>. 
                        This will remove all user data and access permissions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={confirmDeleteUser}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserManagement;