import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Plus } from 'lucide-react';
import NewAppointmentDialog from '@/components/NewAppointmentDialog';
import CheckInDialog from '@/components/CheckInDialog';
import RescheduleDialog from '@/components/RescheduleDialog';
import ContactDialog from '@/components/ContactDialog';

const AppointmentsPage = () => {
  const appointments = [
    {
      id: 'APT001',
      patient: 'John Smith',
      service: 'Medication Consultation',
      time: '9:00 AM',
      duration: '15 min',
      status: 'confirmed',
      phone: '(555) 123-4567',
      notes: 'New diabetes medication review'
    },
    {
      id: 'APT002',
      patient: 'Maria Garcia',
      service: 'Flu Vaccination',
      time: '10:30 AM',
      duration: '10 min',
      status: 'confirmed',
      phone: '(555) 987-6543',
      notes: 'Annual flu shot'
    },
    {
      id: 'APT003',
      patient: 'Robert Davis',
      service: 'Blood Pressure Check',
      time: '11:15 AM',
      duration: '10 min',
      status: 'pending',
      phone: '(555) 456-7890',
      notes: 'Monthly BP monitoring'
    },
    {
      id: 'APT004',
      patient: 'Jennifer Wilson',
      service: 'Medication Synchronization',
      time: '2:00 PM',
      duration: '20 min',
      status: 'confirmed',
      phone: '(555) 234-5678',
      notes: 'Sync all chronic medications'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewAppointment = (appointmentData: any) => {
    console.log('New appointment scheduled:', appointmentData);
    // Handle appointment creation
  };

  const handleCheckIn = (checkInData: any) => {
    console.log('Patient checked in:', checkInData);
    // Handle check-in process
  };

  const handleReschedule = (rescheduleData: any) => {
    console.log('Appointment rescheduled:', rescheduleData);
    // Handle rescheduling
  };

  const handleContact = (contactData: any) => {
    console.log('Patient contacted:', contactData);
    // Handle contact logging
  };

  return (
    <Layout title="Appointments" subtitle="Manage patient appointments and consultations">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-walgreens-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-blue-600">6</p>
                </div>
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-walgreens-red" />
                Today's Schedule - December 21, 2023
              </CardTitle>
              <NewAppointmentDialog onSubmit={handleNewAppointment} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-center bg-walgreens-blue text-white p-2 rounded-lg min-w-[80px]">
                        <div className="font-bold">{appointment.time}</div>
                        <div className="text-xs">{appointment.duration}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="font-medium text-walgreens-blue">{appointment.service}</div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            {appointment.phone}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Notes:</span> {appointment.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 space-y-2">
                      <CheckInDialog appointment={appointment} onCheckIn={handleCheckIn} />
                      <RescheduleDialog appointment={appointment} onReschedule={handleReschedule} />
                      <ContactDialog contact={appointment} onContact={handleContact} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
