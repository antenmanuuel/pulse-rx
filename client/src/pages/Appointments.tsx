import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Calendar as CalendarIcon
} from 'lucide-react';
import NewAppointmentDialog from '@/components/NewAppointmentDialog';
import CheckInDialog from '@/components/CheckInDialog';
import RescheduleDialog from '@/components/RescheduleDialog';
import ContactDialog from '@/components/ContactDialog';
import FilterDialog from '@/components/FilterDialog';

const AppointmentsPage = () => {
  const [appointments] = useState([
    {
      id: 'APT001',
      patient: 'John Smith',
      service: 'Medication Consultation',
      time: '9:00 AM',
      duration: '15 min',
      status: 'confirmed',
      phone: '(555) 123-4567',
      notes: 'New diabetes medication review',
      age: 58,
      email: 'john.smith@email.com',
      arrivalTime: null,
      serviceIcon: '💊',
      priority: 'normal'
    },
    {
      id: 'APT002',
      patient: 'Maria Garcia',
      service: 'Flu Vaccination',
      time: '10:30 AM',
      duration: '10 min',
      status: 'checked-in',
      phone: '(555) 987-6543',
      notes: 'Annual flu shot',
      age: 34,
      email: 'maria.garcia@email.com',
      arrivalTime: '10:25 AM',
      serviceIcon: '💉',
      priority: 'normal'
    },
    {
      id: 'APT003',
      patient: 'Robert Davis',
      service: 'Blood Pressure Check',
      time: '11:15 AM',
      duration: '10 min',
      status: 'pending',
      phone: '(555) 456-7890',
      notes: 'Monthly BP monitoring',
      age: 72,
      email: 'robert.davis@email.com',
      arrivalTime: null,
      serviceIcon: '🩺',
      priority: 'high'
    },
    {
      id: 'APT004',
      patient: 'Jennifer Wilson',
      service: 'Medication Synchronization',
      time: '2:00 PM',
      duration: '20 min',
      status: 'confirmed',
      phone: '(555) 234-5678',
      notes: 'Sync all chronic medications',
      age: 45,
      email: 'jennifer.wilson@email.com',
      arrivalTime: null,
      serviceIcon: '🔄',
      priority: 'normal'
    },
    {
      id: 'APT005',
      patient: 'David Thompson',
      service: 'COVID Vaccination',
      time: '3:30 PM',
      duration: '15 min',
      status: 'cancelled',
      phone: '(555) 345-6789',
      notes: 'Booster shot - cancelled due to illness',
      age: 28,
      email: 'david.thompson@email.com',
      arrivalTime: null,
      serviceIcon: '💉',
      priority: 'normal'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [activeFilters, setActiveFilters] = useState({
    status: '',
    service: '',
    priority: '',
    timeRange: '',
    showCancelled: false,
    showCompleted: false
  });

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

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  const handleNewAppointment = (appointmentData: any) => {
    console.log('New appointment created:', appointmentData);
    // Handle appointment creation
  };

  const handleCheckIn = (checkInData: any) => {
    console.log('Patient checked in:', checkInData);
    // Handle check-in
  };

  const handleReschedule = (rescheduleData: any) => {
    console.log('Appointment rescheduled:', rescheduleData);
    // Handle reschedule
  };

  const handleContact = (contactData: any) => {
    console.log('Patient contacted:', contactData);
    // Handle contact
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

  return (
    <Layout title="Appointments" subtitle="Manage patient appointments and consultations efficiently">
      <div className="space-y-6">
        <div className="flex justify-end">
          <NewAppointmentDialog onSubmit={handleNewAppointment} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-gray-900">{confirmedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Ready for check-in</p>
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

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Slots</p>
                  <p className="text-3xl font-bold text-gray-900">6</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Book more appointments</p>
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
                <p className="text-gray-600">{getCurrentDate()}</p>
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
                {filteredAppointments.map((appointment) => (
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
