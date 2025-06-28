import React, { useState, useEffect } from 'react';
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
import StaffDetailsDialog from '@/components/StaffDetailsDialog';
import PaginationControls from '@/components/ui/pagination-controls';
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
import { StaffMember, staffData, ScheduleEntry, scheduleData, TrainingRecord, trainingData } from '@/data/staffData';

const StaffManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [editStaffDialogOpen, setEditStaffDialogOpen] = useState(false);
  const [addShiftDialogOpen, setAddShiftDialogOpen] = useState(false);
  const [addTrainingDialogOpen, setAddTrainingDialogOpen] = useState(false);

  // Staff data (now as state to allow adding new staff)
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(staffData);
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>(staffMembers);
  
  // Schedule data
  const [weeklySchedule, setWeeklySchedule] = useState<ScheduleEntry[]>(scheduleData);
  
  // Training records
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>(trainingData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const roles = ['all', 'Pharmacist', 'Pharmacy Technician', 'Pharmacy Intern', 'Store Manager', 'Assistant Manager', 'Cashier'];
  const statuses = ['all', 'active', 'on-leave', 'terminated'];
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Filter staff based on search term and filters
  useEffect(() => {
    const filtered = staffMembers.filter(staff => {
      const matchesSearch =
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || staff.role === filterRole;
      const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    setFilteredStaff(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterRole, filterStatus, staffMembers]);

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleAddStaff = (newStaff: StaffMember) => {
    setStaffMembers(prev => [...prev, newStaff]);
    toast({
      title: "Staff Added",
      description: `${newStaff.firstName} ${newStaff.lastName} has been added successfully.`
    });
  };

  const handleViewDetails = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setViewDetailsDialogOpen(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setEditStaffDialogOpen(true);
  };

  const handleSaveEdit = (updatedStaff: StaffMember) => {
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
    
    toast({
      title: "Shift Added",
      description: `Shift added for ${shiftData.employeeName} on ${shiftData.day}.`
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
    
    toast({
      title: "Training Added",
      description: `Training record added for ${trainingData.employeeName}.`
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
                  <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
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
                  <p className="text-2xl font-bold text-green-600">{staffMembers.filter(s => s.status === 'active').length}</p>
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
                  <p className="text-2xl font-bold text-blue-600">
                    {(staffMembers.reduce((sum, staff) => sum + staff.performance, 0) / staffMembers.length).toFixed(1)}%
                  </p>
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
                  <p className="text-2xl font-bold text-orange-600">
                    {trainingRecords.reduce((sum, record) => 
                      sum + record.trainings.filter(t => t.status === 'pending' || t.status === 'expiring').length, 0)}
                  </p>
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
              {currentItems.map((staff) => (
                <Card key={staff.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={staff.avatar || undefined} alt={`${staff.firstName} ${staff.lastName}`} />
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

            {/* Pagination Controls */}
            {filteredStaff.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStaff.length)} of {filteredStaff.length}
                </div>
              </div>
            )}
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
        <StaffDetailsDialog
          staff={selectedStaff}
          open={viewDetailsDialogOpen}
          onOpenChange={setViewDetailsDialogOpen}
          onEdit={handleEditStaff}
          getStatusColor={getStatusColor}
          getPerformanceColor={getPerformanceColor}
        />

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