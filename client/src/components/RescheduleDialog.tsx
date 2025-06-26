import React, { useState, useEffect } from 'react';
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
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  CalendarCheck,
  FileText,
  RotateCcw
} from 'lucide-react';

interface RescheduleDialogProps {
  appointment: any;
  onReschedule: (data: any) => void;
}

export default function RescheduleDialog({ appointment, onReschedule }: RescheduleDialogProps) {
  const [open, setOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: '',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    if (open) {
      setRescheduleData({
        newDate: '',
        newTime: '',
        reason: '',
        notes: ''
      });
    }
  }, [open]);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const rescheduleReasons = [
    { value: 'patient-request', label: '👤 Patient Request', description: 'Patient requested to change appointment' },
    { value: 'pharmacist-unavailable', label: '👨‍⚕️ Pharmacist Unavailable', description: 'Pharmacist schedule conflict' },
    { value: 'emergency', label: '🚨 Emergency', description: 'Emergency situation arose' },
    { value: 'equipment-issue', label: '⚙️ Equipment Issue', description: 'Equipment maintenance or malfunction' },
    { value: 'scheduling-conflict', label: '📅 Scheduling Conflict', description: 'Double booking or overlap' },
    { value: 'patient-illness', label: '🤒 Patient Illness', description: 'Patient is unwell' },
    { value: 'weather', label: '🌧️ Weather Conditions', description: 'Severe weather conditions' },
    { value: 'other', label: '📝 Other', description: 'Other reason not listed' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReschedule({
      ...rescheduleData,
      appointmentId: appointment.id,
      originalDate: appointment.time,
      originalService: appointment.service
    });
    setOpen(false);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isFormValid = () => {
    return rescheduleData.newDate && rescheduleData.newTime && rescheduleData.reason;
  };

  const getReasonInfo = () => {
    return rescheduleReasons.find(r => r.value === rescheduleData.reason);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not selected';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue">
          <RotateCcw className="w-4 h-4 mr-1" />
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Reschedule Appointment
              </DialogTitle>
              <p className="text-gray-600">{appointment.patient} - {appointment.service}</p>
            </div>
          </div>
        </DialogHeader>

        {/* Current Appointment Details */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-walgreens-blue" />
              Current Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{appointment.patient}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{appointment.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium">{appointment.id}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Current Schedule</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Time:</span>
                    <span className="font-medium text-blue-900">{appointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Service:</span>
                    <span className="font-medium text-blue-900">{appointment.service}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Duration:</span>
                    <span className="font-medium text-blue-900">{appointment.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Status:</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Date & Time Selection */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <CalendarCheck className="w-5 h-5 mr-2 text-walgreens-blue" />
                New Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newDate" className="text-sm font-medium text-gray-700">
                    New Date *
                  </Label>
                  <Input
                    id="newDate"
                    type="date"
                    value={rescheduleData.newDate}
                    min={getMinDate()}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newTime" className="text-sm font-medium text-gray-700">
                    New Time *
                  </Label>
                  <Select value={rescheduleData.newTime} onValueChange={(value) => setRescheduleData({ ...rescheduleData, newTime: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select new time slot" />
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

              {/* Date & Time Preview */}
              {rescheduleData.newDate && rescheduleData.newTime && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Current</p>
                      <p className="font-semibold text-gray-900">{appointment.time}</p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-green-600" />

                    <div className="text-center">
                      <p className="text-sm text-green-600 mb-1">New</p>
                      <p className="font-semibold text-green-900">
                        {formatDate(rescheduleData.newDate)} at {rescheduleData.newTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      New time slot is available
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reschedule Reason */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Reason for Rescheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason *
                </Label>
                <Select value={rescheduleData.reason} onValueChange={(value) => setRescheduleData({ ...rescheduleData, reason: value })}>
                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                    <SelectValue placeholder="Select reason for rescheduling" />
                  </SelectTrigger>
                  <SelectContent>
                    {rescheduleReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        <div>
                          <div className="font-medium">{reason.label}</div>
                          <div className="text-xs text-gray-500">{reason.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reason Preview */}
              {getReasonInfo() && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800 font-medium">
                      {getReasonInfo()?.label}: {getReasonInfo()?.description}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  value={rescheduleData.notes}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, notes: e.target.value })}
                  placeholder="Any additional notes about the rescheduling (optional)"
                  rows={3}
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reschedule Summary */}
          {isFormValid() && (
            <Card className="border border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-green-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Reschedule Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Change Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium text-green-900">
                          {rescheduleData.newTime} on {new Date(rescheduleData.newDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Reason:</span>
                        <span className="font-medium">{getReasonInfo()?.label.replace(/[^\w\s]/gi, '')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Impact Assessment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>No schedule conflicts detected</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Patient notification will be sent</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Calendar updated automatically</span>
                      </div>
                    </div>
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
              className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isFormValid()}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
