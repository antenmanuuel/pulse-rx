import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Users,
  FileText,
  CalendarCheck
} from 'lucide-react';

interface NewAppointmentDialogProps {
  onSubmit: (appointment: any) => void;
}

export default function NewAppointmentDialog({ onSubmit }: NewAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState({
    patientName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    duration: '15',
    notes: '',
    priority: 'normal'
  });

  const services = [
    {
      value: 'medication-consultation',
      label: 'Medication Consultation',
      duration: '15',
      icon: '💊',
      description: 'Review and discuss medications'
    },
    {
      value: 'flu-vaccination',
      label: 'Flu Vaccination',
      duration: '10',
      icon: '💉',
      description: 'Annual flu immunization'
    },
    {
      value: 'blood-pressure-check',
      label: 'Blood Pressure Check',
      duration: '10',
      icon: '🩺',
      description: 'Blood pressure monitoring'
    },
    {
      value: 'medication-sync',
      label: 'Medication Synchronization',
      duration: '20',
      icon: '🔄',
      description: 'Synchronize all medications'
    },
    {
      value: 'covid-vaccination',
      label: 'COVID Vaccination',
      duration: '15',
      icon: '💉',
      description: 'COVID-19 immunization'
    },
    {
      value: 'wellness-screening',
      label: 'Wellness Screening',
      duration: '30',
      icon: '🏥',
      description: 'Comprehensive health screening'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedService = services.find(s => s.value === appointment.service);
    const appointmentData = {
      ...appointment,
      id: `APT${Date.now()}`,
      status: 'confirmed',
      serviceIcon: selectedService?.icon || '📅',
      serviceDescription: selectedService?.description || ''
    };
    onSubmit(appointmentData);
    setAppointment({
      patientName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      duration: '15',
      notes: '',
      priority: 'normal'
    });
    setOpen(false);
  };

  const handleServiceChange = (value: string) => {
    const selectedService = services.find(s => s.value === value);
    setAppointment({
      ...appointment,
      service: value,
      duration: selectedService?.duration || '15'
    });
  };

  const getSelectedService = () => {
    return services.find(s => s.value === appointment.service);
  };

  const isFormValid = () => {
    return appointment.patientName && appointment.phone && appointment.service &&
      appointment.date && appointment.time;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Schedule New Appointment
              </DialogTitle>
              <p className="text-gray-600">Book a new patient appointment for pharmacy services</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-walgreens-blue" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-medium text-gray-700">
                    Patient Name *
                  </Label>
                  <div className="relative">
                    <Input
                      id="patientName"
                      value={appointment.patientName}
                      onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
                      placeholder="Enter patient name"
                      className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-1 top-1 h-8 px-2"
                    >
                      <Search className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Click search to find existing patient</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={appointment.phone}
                    onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={appointment.email}
                  onChange={(e) => setAppointment({ ...appointment, email: e.target.value })}
                  placeholder="patient@example.com"
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Service Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium text-gray-700">
                  Service Type *
                </Label>
                <Select value={appointment.service} onValueChange={handleServiceChange}>
                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{service.icon}</span>
                          <div>
                            <div className="font-medium">{service.label}</div>
                            <div className="text-xs text-gray-500">{service.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Service Preview */}
              {getSelectedService() && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getSelectedService()?.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900">{getSelectedService()?.label}</h4>
                      <p className="text-sm text-blue-700">{getSelectedService()?.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-900">Duration</p>
                      <p className="text-lg font-bold text-blue-900">{appointment.duration} min</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </Label>
                  <Select value={appointment.duration} onValueChange={(value) => setAppointment({ ...appointment, duration: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                    Priority
                  </Label>
                  <Select value={appointment.priority} onValueChange={(value) => setAppointment({ ...appointment, priority: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span>Low Priority</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="normal">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Normal Priority</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>High Priority</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <CalendarCheck className="w-5 h-5 mr-2 text-walgreens-blue" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Appointment Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointment.date}
                    min={getMinDate()}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Appointment Time *
                  </Label>
                  <Select value={appointment.time} onValueChange={(value) => setAppointment({ ...appointment, time: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center justify-between w-full">
                            <span>{time}</span>
                            <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                              Available
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {appointment.date && appointment.time && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      Time slot available for {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Appointment Notes
                </Label>
                <Textarea
                  id="notes"
                  value={appointment.notes}
                  onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
                  placeholder="Additional notes about the appointment (reason for visit, special requirements, etc.)"
                  rows={3}
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Appointment Summary */}
          {isFormValid() && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Appointment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Patient Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{appointment.patientName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{appointment.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{appointment.email || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Appointment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{getSelectedService()?.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{appointment.duration} minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={getPriorityColor(appointment.priority)}>
                          {appointment.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-800 font-medium">
                      Appointment ready to be scheduled
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-blue-700">
                    Confirmation notification will be sent to the patient
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isFormValid()}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
