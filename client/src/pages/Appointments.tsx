import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Plus,
  Search,
  Filter,
  Download,
  CalendarCheck,
  UserCheck,
  AlertCircle,
  Settings,
  MapPin,
  FileText,
  CheckCircle2,
  TimerIcon,
  Users,
  CalendarX,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell,
  Calendar as CalendarIcon,
  Eye
} from 'lucide-react';
import NewAppointmentDialog from '@/components/NewAppointmentDialog';
import CheckInDialog from '@/components/CheckInDialog';
import RescheduleDialog from '@/components/RescheduleDialog';
import ContactDialog from '@/components/ContactDialog';
import FilterDialog from '@/components/FilterDialog';
import AppointmentDetailsDialog from '@/components/AppointmentDetailsDialog';
import PaginationControls from '@/components/ui/pagination-controls';
import { Appointment, appointmentData } from '@/data/appointmentData';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);
  const [activeFilters, setActiveFilters] = useState({
    status: '',
    service: '',
    priority: '',
    timeRange: '',
    showCancelled: false,
    showCompleted: false
  });
  const [detailsAppointment, setDetailsAppointment] = useState<Appointment | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Function to get time range for appointment
  const getTimeRange = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    const period = time.includes('PM') ? 'PM' : 'AM';
    const hour24 = period === 'PM' && hour !== 12 ? hour + 12 : (period === 'AM' && hour === 12 ? 0 : hour);

    if (hour24 >= 6 && hour24 < 12) return 'morning';
    if (hour24 >= 12 && hour24 < 18) return 'afternoon';
    if (hour24 >= 18 && hour24 < 22) return 'evening';
    return 'other';
  };

  // Apply filters and search
  const applyFiltersAndSearch = () => {
    const filtered = appointments.filter(appointment => {
      // Apply search filter
      const matchesSearch = !searchTerm ||
        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply status filter
      const matchesStatus = !activeFilters.status || appointment.status === activeFilters.status;

      // Apply service filter
      const matchesService = !activeFilters.service || appointment.service === activeFilters.service;

      // Apply priority filter
      const matchesPriority = !activeFilters.priority || appointment.priority === activeFilters.priority;

      // Apply time range filter
      const matchesTimeRange = !activeFilters.timeRange || getTimeRange(appointment.time) === activeFilters.timeRange;

      // Apply cancelled filter
      const matchesCancelled = activeFilters.showCancelled || appointment.status !== 'cancelled';

      // Apply completed filter
      const matchesCompleted = activeFilters.showCompleted || appointment.status !== 'completed';

      return matchesSearch && matchesStatus && matchesService && matchesPriority && matchesTimeRange && matchesCancelled && matchesCompleted;
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Effect to apply filters when search term or filters change
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, activeFilters, appointments]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'checked-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="w-4 h-4" />;
      case 'pending': return <TimerIcon className="w-4 h-4" />;
      case 'checked-in': return <UserCheck className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled': return <CalendarX className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🚨';
      case 'normal': return '📋';
      case 'low': return '⬇️';
      default: return '📋';
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters: {
    status: string;
    service: string;
    priority: string;
    timeRange: string;
    showCancelled: boolean;
    showCompleted: boolean;
  }) => {
    setActiveFilters(filters);
  };

  const handleNewAppointment = (appointmentData: Partial<Appointment>) => {
    console.log('New appointment created:', appointmentData);
    // In a real app, you would add the new appointment to the state
    const newAppointment = {
      ...appointmentData,
      id: `APT${Date.now().toString().slice(-6)}`,
    } as Appointment;
    
    setAppointments([...appointments, newAppointment]);
  };

  const handleCheckIn = (checkInData: { appointmentId: string; arrivalTime: string }) => {
    console.log('Patient checked in:', checkInData);
    // Update the appointment status
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === checkInData.appointmentId 
        ? { ...appointment, status: 'checked-in', arrivalTime: checkInData.arrivalTime } 
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleReschedule = (rescheduleData: { appointmentId: string; newTime: string; newDate: string }) => {
    console.log('Appointment rescheduled:', rescheduleData);
    // Update the appointment time
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === rescheduleData.appointmentId 
        ? { ...appointment, time: rescheduleData.newTime } 
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleContact = (contactData: { contactId: string; method: string; message: string }) => {
    console.log('Patient contacted:', contactData);
    // In a real app, you would record the contact attempt
  };

  const handleEditAppointment = (updatedAppointment: Appointment) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    );
    setAppointments(updatedAppointments);
    setDetailsAppointment(updatedAppointment);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length;
  const checkedInCount = appointments.filter(apt => apt.status === 'checked-in').length;
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length;

  // Check if any filters are active
  const hasActiveFilters = Object.values(activeFilters).some(value =>
    typeof value === 'boolean' ? value : value !== ''
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <Layout title="Appointments" subtitle="Manage patient appointments and consultations efficiently">
      <div className="space-y-6">
        <div className="flex justify-end">
          <NewAppointmentDialog onSubmit={handleNewAppointment} />
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <CalendarIcon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Checked In</p>
                  <p className="text-3xl font-bold text-gray-900">{checkedInCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">In progress</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Today's Schedule
                </CardTitle>
                <p className="text-gray-600">
                  {getCurrentDate()} • 
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search appointments..."
                  className="pl-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <FilterDialog onFilterChange={handleFilterChange} filterType="appointments" />
                  {hasActiveFilters && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-walgreens-red rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                  )}
                </div>
                <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400 hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800 font-medium">
                    Filters active - Showing {filteredAppointments.length} of {appointments.length} appointments
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleFilterChange({
                    status: '',
                    service: '',
                    priority: '',
                    timeRange: '',
                    showCancelled: false,
                    showCompleted: false
                  })}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No appointments scheduled for today.'}
                </p>
                <NewAppointmentDialog onSubmit={handleNewAppointment} />
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((appointment) => (
                  <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-center bg-gradient-to-br from-walgreens-blue to-blue-600 text-white p-3 rounded-xl min-w-[90px] shadow-md">
                              <div className="font-bold text-lg">{appointment.time}</div>
                              <div className="text-xs opacity-90">{appointment.duration}</div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl text-gray-900">{appointment.patient}</h3>
                              <p className="text-sm text-gray-600">Age: {appointment.age}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={`${getStatusColor(appointment.status)} border font-medium`}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1 capitalize">{appointment.status.replace('-', ' ')}</span>
                            </Badge>
                            {appointment.priority === 'high' && (
                              <Badge className={`${getPriorityColor(appointment.priority)} border font-medium`}>
                                <span className="mr-1">{getPriorityIcon(appointment.priority)}</span>
                                High Priority
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-5 h-5 mr-2 text-blue-600" />
                              <span className="font-medium">{appointment.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <User className="w-5 h-5 mr-2 text-gray-500" />
                              <span className="font-medium">{appointment.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FileText className="w-5 h-5 mr-2 text-purple-600" />
                              <span className="font-medium font-mono">{appointment.id}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="space-y-3">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <span className="font-semibold text-gray-900 text-sm block mb-2">
                                <span className="text-2xl mr-2">{appointment.serviceIcon}</span>
                                Service:
                              </span>
                              <h4 className="font-semibold text-gray-900 mb-2">{appointment.service}</h4>
                              <p className="text-sm text-gray-600">{appointment.notes}</p>
                            </div>

                            {appointment.arrivalTime && (
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-700 font-medium">
                                    Arrived at {appointment.arrivalTime}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <span className="font-semibold text-blue-900">Status:</span>
                                <br />
                                <span className="text-blue-700 capitalize">{appointment.status.replace('-', ' ')}</span>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <span className="font-semibold text-purple-900">Appointment ID:</span>
                                <br />
                                <span className="text-purple-700 font-mono">{appointment.id}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 space-y-2 flex flex-col">
                        {appointment.status !== 'cancelled' && (
                          <>
                            <CheckInDialog appointment={appointment} onCheckIn={handleCheckIn} />
                            <RescheduleDialog appointment={appointment} onReschedule={handleReschedule} />
                            <ContactDialog contact={appointment} onContact={handleContact} />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setDetailsAppointment(appointment);
                                setDetailsDialogOpen(true);
                              }}
                              className="border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </>
                        )}

                        {appointment.status === 'cancelled' && (
                          <div className="text-center p-2">
                            <CalendarX className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Cancelled</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredAppointments.length > 0 && (
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
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointment Details Dialog - Using the new component */}
        <AppointmentDetailsDialog
          appointment={detailsAppointment}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          onEditAppointment={handleEditAppointment}
        />
      </div>
    </Layout>
  );
};

export default AppointmentsPage;