import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AddStaffDialog from '@/components/AddStaffDialog';
import EditStaffForm from '@/components/EditStaffForm';
import AddShiftDialog from '@/components/AddShiftDialog';
import AddTrainingDialog from '@/components/AddTrainingDialog';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Shield,
  Star,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Upload,
  Activity
} from 'lucide-react';

const StaffManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [editStaffDialogOpen, setEditStaffDialogOpen] = useState(false);
  const [addShiftDialogOpen, setAddShiftDialogOpen] = useState(false);
  const [addTrainingDialogOpen, setAddTrainingDialogOpen] = useState(false);

  // Staff data (now as state to allow adding new staff)
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 'EMP-001',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@pulserx.com',
      phone: '(555) 123-4567',
      role: 'Pharmacist',
      status: 'active',
      department: 'Clinical',
      hireDate: '2020-01-15',
      lastLogin: '2024-01-16 09:30 AM',
      certifications: ['PharmD', 'Immunization Certified', 'MTM Certified'],
      performance: 95,
      address: '123 Main St, City, State 12345',
      emergencyContact: 'John Johnson - (555) 987-6543',
      schedule: 'Full-time',
      avatar: null
    },
    {
      id: 'EMP-002',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@pulserx.com',
      phone: '(555) 234-5678',
      role: 'Pharmacy Technician',
      status: 'active',
      department: 'Operations',
      hireDate: '2021-03-22',
      lastLogin: '2024-01-16 08:15 AM',
      certifications: ['CPhT', 'Sterile Compounding'],
      performance: 88,
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: 'Lisa Chen - (555) 876-5432',
      schedule: 'Full-time',
      avatar: null
    },
    {
      id: 'EMP-003',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@pulserx.com',
      phone: '(555) 345-6789',
      role: 'Pharmacy Intern',
      status: 'active',
      department: 'Clinical',
      hireDate: '2023-09-01',
      lastLogin: '2024-01-15 04:45 PM',
      certifications: ['PharmD Student', 'CPR Certified'],
      performance: 92,
      address: '789 Pine St, City, State 12345',
      emergencyContact: 'Maria Rodriguez - (555) 765-4321',
      schedule: 'Part-time',
      avatar: null
    },
    {
      id: 'EMP-004',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@pulserx.com',
      phone: '(555) 456-7890',
      role: 'Store Manager',
      status: 'on-leave',
      department: 'Management',
      hireDate: '2019-05-10',
      lastLogin: '2024-01-10 06:20 PM',
      certifications: ['Pharmacy Management', 'Leadership Certified'],
      performance: 91,
      address: '321 Elm Dr, City, State 12345',
      emergencyContact: 'Susan Wilson - (555) 654-3210',
      schedule: 'Full-time',
      avatar: null
    }
  ]);

  // Mock schedule data (now as state to allow adding new shifts)
  const [weeklySchedule, setWeeklySchedule] = useState([
    {
      employeeId: 'EMP-001',
      name: 'Dr. Sarah Johnson',
      role: 'Pharmacist',
      schedule: {
        monday: { start: '08:00', end: '17:00', status: 'scheduled' },
        tuesday: { start: '08:00', end: '17:00', status: 'scheduled' },
        wednesday: { start: '08:00', end: '17:00', status: 'scheduled' },
        thursday: { start: '08:00', end: '17:00', status: 'scheduled' },
        friday: { start: '08:00', end: '17:00', status: 'scheduled' },
        saturday: { start: 'off', end: 'off', status: 'off' },
        sunday: { start: 'off', end: 'off', status: 'off' }
      }
    },
    {
      employeeId: 'EMP-002',
      name: 'Mike Chen',
      role: 'Pharmacy Technician',
      schedule: {
        monday: { start: '09:00', end: '18:00', status: 'scheduled' },
        tuesday: { start: '09:00', end: '18:00', status: 'scheduled' },
        wednesday: { start: '09:00', end: '18:00', status: 'scheduled' },
        thursday: { start: 'off', end: 'off', status: 'off' },
        friday: { start: '09:00', end: '18:00', status: 'scheduled' },
        saturday: { start: '10:00', end: '15:00', status: 'scheduled' },
        sunday: { start: 'off', end: 'off', status: 'off' }
      }
    },
    {
      employeeId: 'EMP-003',
      name: 'Emily Rodriguez',
      role: 'Pharmacy Intern',
      schedule: {
        monday: { start: '14:00', end: '20:00', status: 'scheduled' },
        tuesday: { start: 'off', end: 'off', status: 'off' },
        wednesday: { start: '14:00', end: '20:00', status: 'scheduled' },
        thursday: { start: '14:00', end: '20:00', status: 'scheduled' },
        friday: { start: 'off', end: 'off', status: 'off' },
        saturday: { start: '10:00', end: '18:00', status: 'scheduled' },
        sunday: { start: 'off', end: 'off', status: 'off' }
      }
    }
  ]);

  // Mock training records (now as state to allow adding new training)
  const [trainingRecords, setTrainingRecords] = useState([
    {
      employeeId: 'EMP-001',
      name: 'Dr. Sarah Johnson',
      trainings: [
        { course: 'Advanced Clinical Pharmacy', completed: '2024-01-10', expiry: '2025-01-10', status: 'completed' },
        { course: 'Immunization Updates', completed: '2023-12-15', expiry: '2024-12-15', status: 'current' },
        { course: 'HIPAA Compliance', completed: '2023-11-20', expiry: '2024-11-20', status: 'expiring' }
      ]
    },
    {
      employeeId: 'EMP-002',
      name: 'Mike Chen',
      trainings: [
        { course: 'Sterile Compounding Safety', completed: '2023-10-05', expiry: '2024-10-05', status: 'expiring' },
        { course: 'Customer Service Excellence', completed: '2024-01-08', expiry: '2025-01-08', status: 'completed' },
        { course: 'Pharmacy Technology Updates', completed: null, expiry: null, status: 'pending' }
      ]
    },
    {
      employeeId: 'EMP-003',
      name: 'Emily Rodriguez',
      trainings: [
        { course: 'Pharmacy Intern Orientation', completed: '2023-09-01', expiry: '2024-09-01', status: 'current' },
        { course: 'Patient Counseling Basics', completed: '2023-10-15', expiry: '2024-10-15', status: 'current' },
        { course: 'Emergency Procedures', completed: null, expiry: null, status: 'pending' }
      ]
    }
  ]);

  const roles = ['all', 'Pharmacist', 'Pharmacy Technician', 'Pharmacy Intern', 'Store Manager'];
  const statuses = ['all', 'active', 'on-leave', 'terminated'];
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'on-leave': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'terminated': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700';
      case 'current': return 'bg-blue-50 text-blue-700';
      case 'expiring': return 'bg-yellow-50 text-yellow-700';
      case 'pending': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch =
      staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || staff.role === filterRole;
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddStaff = (newStaff: any) => {
    setStaffMembers(prev => [...prev, newStaff]);
  };

  const handleViewDetails = (staff: any) => {
    setSelectedStaff(staff);
    setViewDetailsDialogOpen(true);
  };

  const handleEditStaff = (staff: any) => {
    setSelectedStaff(staff);
    setEditStaffDialogOpen(true);
  };

  const handleSaveEdit = (updatedStaff: any) => {
    setStaffMembers(prev =>
      prev.map(staff => staff.id === updatedStaff.id ? updatedStaff : staff)
    );
    setEditStaffDialogOpen(false);
    toast({
      title: "Staff Updated",
      description: `${updatedStaff.firstName} ${updatedStaff.lastName}'s information has been updated.`
    });
  };

  const handleAddShift = (shiftData: any) => {
    setWeeklySchedule(prev => {
      // Check if employee already exists in the schedule
      const existingEmployeeIndex = prev.findIndex(emp => emp.employeeId === shiftData.employeeId);

      if (existingEmployeeIndex !== -1) {
        // Update existing employee's schedule
        const updatedSchedule = [...prev];
        updatedSchedule[existingEmployeeIndex] = {
          ...updatedSchedule[existingEmployeeIndex],
          schedule: {
            ...updatedSchedule[existingEmployeeIndex].schedule,
            [shiftData.day]: shiftData.shift
          }
        };
        return updatedSchedule;
      } else {
        // Add new employee to schedule
        const newEmployeeSchedule = {
          employeeId: shiftData.employeeId,
          name: shiftData.employeeName,
          role: shiftData.role,
          schedule: {
            monday: { start: 'off', end: 'off', status: 'off' },
            tuesday: { start: 'off', end: 'off', status: 'off' },
            wednesday: { start: 'off', end: 'off', status: 'off' },
            thursday: { start: 'off', end: 'off', status: 'off' },
            friday: { start: 'off', end: 'off', status: 'off' },
            saturday: { start: 'off', end: 'off', status: 'off' },
            sunday: { start: 'off', end: 'off', status: 'off' },
            [shiftData.day]: shiftData.shift
          }
        };
        return [...prev, newEmployeeSchedule];
      }
    });
  };

  const handleAddTraining = (trainingData: any) => {
    setTrainingRecords(prev => {
      // Check if employee already exists in training records
      const existingEmployeeIndex = prev.findIndex(emp => emp.employeeId === trainingData.employeeId);

      if (existingEmployeeIndex !== -1) {
        // Add training to existing employee's record
        const updatedRecords = [...prev];
        updatedRecords[existingEmployeeIndex] = {
          ...updatedRecords[existingEmployeeIndex],
          trainings: [...updatedRecords[existingEmployeeIndex].trainings, trainingData.training]
        };
        return updatedRecords;
      } else {
        // Create new employee training record
        const newEmployeeTraining = {
          employeeId: trainingData.employeeId,
          name: trainingData.employeeName,
          trainings: [trainingData.training]
        };
        return [...prev, newEmployeeTraining];
      }
    });
  };

  return (
    <Layout title="Staff Management" subtitle="Manage employees, schedules, and training records">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Staff</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <Users className="w-8 h-8 text-walgreens-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On Duty Today</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Performance</p>
                  <p className="text-2xl font-bold text-blue-600">91.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Training Due</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="staff" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Staff Directory
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedules
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <GraduationCap className="w-4 h-4 mr-2" />
              Training
            </TabsTrigger>
          </TabsList>

          {/* Staff Directory Tab */}
          <TabsContent value="staff" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search staff members..."
                      className="pl-10 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>
                          {role === 'all' ? 'All Roles' : role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AddStaffDialog onAddStaff={handleAddStaff} />
                </div>
              </CardContent>
            </Card>

            {/* Staff Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStaff.map((staff) => (
                <Card key={staff.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={staff.avatar} alt={`${staff.firstName} ${staff.lastName}`} />
                        <AvatarFallback className="bg-walgreens-red text-white text-lg">
                          {staff.firstName[0]}{staff.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{staff.firstName} {staff.lastName}</h3>
                            <p className="text-sm text-gray-600">{staff.role}</p>
                            <p className="text-xs text-gray-500">{staff.id}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{staff.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{staff.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{staff.department} • {staff.schedule}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className={`font-medium ${getPerformanceColor(staff.performance)}`}>
                              Performance: {staff.performance}%
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {staff.certifications.slice(0, 3).map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                          {staff.certifications.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{staff.certifications.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(staff)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditStaff(staff)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-walgreens-red" />
                    <span>Weekly Schedule</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-walgreens-red hover:bg-red-600" onClick={() => setAddShiftDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Shift
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-medium text-gray-900">Employee</th>
                        {daysOfWeek.map(day => (
                          <th key={day} className="text-center p-3 font-medium text-gray-900 min-w-24">
                            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weeklySchedule.map((employee) => (
                        <tr key={employee.employeeId} className="border-b border-gray-100">
                          <td className="p-3">
                            <div>
                              <p className="font-medium text-gray-900">{employee.name}</p>
                              <p className="text-sm text-gray-600">{employee.role}</p>
                            </div>
                          </td>
                          {daysOfWeek.map(day => {
                            const shift = employee.schedule[day as keyof typeof employee.schedule];
                            return (
                              <td key={day} className="p-3 text-center">
                                {shift.status === 'off' ? (
                                  <Badge className="bg-gray-100 text-gray-600 text-xs">OFF</Badge>
                                ) : (
                                  <div className="text-xs">
                                    <div className="font-medium text-gray-900">{shift.start}</div>
                                    <div className="text-gray-600">{shift.end}</div>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-walgreens-red" />
                    <span>Training Records</span>
                  </CardTitle>
                  <Button size="sm" className="bg-walgreens-red hover:bg-red-600" onClick={() => setAddTrainingDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Training
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {trainingRecords.map((employee) => (
                  <div key={employee.employeeId} className="space-y-3">
                    <h4 className="font-medium text-gray-900">{employee.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {employee.trainings.map((training, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm text-gray-900">{training.course}</h5>
                                <Badge className={getTrainingStatusColor(training.status) + ' text-xs'}>
                                  {training.status}
                                </Badge>
                              </div>
                              {training.completed && (
                                <div className="text-xs text-gray-600">
                                  <p>Completed: {training.completed}</p>
                                  {training.expiry && (
                                    <p>Expires: {training.expiry}</p>
                                  )}
                                </div>
                              )}
                              {training.status === 'pending' && (
                                <p className="text-xs text-orange-600">Enrollment required</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Staff Details Dialog */}
        <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Staff Member Details</DialogTitle>
              <DialogDescription>
                Complete information for staff member
              </DialogDescription>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedStaff.avatar} alt={`${selectedStaff.firstName} ${selectedStaff.lastName}`} />
                    <AvatarFallback className="bg-walgreens-red text-white text-xl">
                      {selectedStaff.firstName[0]}{selectedStaff.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedStaff.firstName} {selectedStaff.lastName}
                    </h3>
                    <p className="text-lg text-gray-600">{selectedStaff.role}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge className={getStatusColor(selectedStaff.status)}>
                        {selectedStaff.status.charAt(0).toUpperCase() + selectedStaff.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500">ID: {selectedStaff.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className={`text-lg font-semibold ${getPerformanceColor(selectedStaff.performance)}`}>
                        {selectedStaff.performance}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Performance Score</p>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedStaff.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedStaff.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{selectedStaff.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Emergency Contact</p>
                          <p className="font-medium">{selectedStaff.emergencyContact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Employment Information */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Employment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Department</p>
                          <p className="font-medium">{selectedStaff.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Hire Date</p>
                          <p className="font-medium">{selectedStaff.hireDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Schedule</p>
                          <p className="font-medium">{selectedStaff.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Last Login</p>
                          <p className="font-medium">{selectedStaff.lastLogin}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Certifications */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications & Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedStaff.certifications.map((cert: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setViewDetailsDialogOpen(false);
                    handleEditStaff(selectedStaff);
                  }} className="bg-walgreens-red hover:bg-red-600">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Staff Member
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Staff Dialog */}
        <Dialog open={editStaffDialogOpen} onOpenChange={setEditStaffDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Staff Member</DialogTitle>
              <DialogDescription>
                Update staff member information
              </DialogDescription>
            </DialogHeader>
            {selectedStaff && (
              <EditStaffForm
                staff={selectedStaff}
                onSave={handleSaveEdit}
                onCancel={() => setEditStaffDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Add Shift Dialog */}
        <AddShiftDialog
          open={addShiftDialogOpen}
          onOpenChange={setAddShiftDialogOpen}
          staffMembers={staffMembers}
          onAddShift={handleAddShift}
        />

        {/* Add Training Dialog */}
        <AddTrainingDialog
          open={addTrainingDialogOpen}
          onOpenChange={setAddTrainingDialogOpen}
          staffMembers={staffMembers}
          onAddTraining={handleAddTraining}
        />
      </div>
    </Layout>
  );
};

export default StaffManagement;