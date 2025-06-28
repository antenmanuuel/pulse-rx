import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  User,
  Pill,
  FileText,
  Clock,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Mail,
  Shield,
  CreditCard
} from 'lucide-react';

interface Appointment {
  id: string;
  patient: string;
  service: string;
  time: string;
  duration: string;
  status: string;
  phone: string;
  notes: string;
  age: number;
  email: string;
  arrivalTime: string | null;
  serviceIcon: string;
  priority: string;
  address: string;
  emergencyContact: string;
  insurance: string;
  policyNumber: string;
  dateOfBirth: string;
  allergies: string;
  medications: string;
  lastVisit: string;
  reasonForVisit: string;
  copay: string;
  appointmentType: string;
}

interface AppointmentDetailsDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditAppointment?: (updatedAppointment: Appointment) => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  appointment,
  open,
  onOpenChange,
  onEditAppointment
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Appointment>>({});

  const handleStartEdit = () => {
    if (appointment) {
      setEditForm({ ...appointment });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (appointment && editForm && onEditAppointment) {
      onEditAppointment({ ...appointment, ...editForm } as Appointment);
      setIsEditMode(false);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-walgreens-blue" />
            Appointment Details
            <Badge className={`ml-3 ${getStatusColor(appointment.status)} border font-medium`}>
              <span className="capitalize">{appointment.status.replace('-', ' ')}</span>
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-end items-center">
            <div className="flex space-x-2">
              {!isEditMode ? (
                <Button
                  onClick={handleStartEdit}
                  className="bg-walgreens-blue hover:bg-blue-700 text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Patient Name</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.patient || ''}
                    onChange={(e) => handleEditFormChange('patient', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.patient}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Age</Label>
                {isEditMode ? (
                  <Input
                    type="number"
                    value={editForm.age || ''}
                    onChange={(e) => handleEditFormChange('age', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.age} years old</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                {isEditMode ? (
                  <Input
                    type="date"
                    value={editForm.dateOfBirth || ''}
                    onChange={(e) => handleEditFormChange('dateOfBirth', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.dateOfBirth}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => handleEditFormChange('phone', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.phone}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                {isEditMode ? (
                  <Input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => handleEditFormChange('email', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.email}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Address</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.address || ''}
                    onChange={(e) => handleEditFormChange('address', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.address}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Appointment Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Service</Label>
                {isEditMode ? (
                  <Select
                    value={editForm.service || ''}
                    onValueChange={(value) => handleEditFormChange('service', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medication Consultation">Medication Consultation</SelectItem>
                      <SelectItem value="Flu Vaccination">Flu Vaccination</SelectItem>
                      <SelectItem value="COVID Vaccination">COVID Vaccination</SelectItem>
                      <SelectItem value="Blood Pressure Check">Blood Pressure Check</SelectItem>
                      <SelectItem value="Medication Synchronization">Medication Synchronization</SelectItem>
                      <SelectItem value="Health Screening">Health Screening</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900 flex items-center">
                    <span className="text-xl mr-2">{appointment.serviceIcon}</span>
                    {appointment.service}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Appointment Type</Label>
                {isEditMode ? (
                  <Select
                    value={editForm.appointmentType || ''}
                    onValueChange={(value) => handleEditFormChange('appointmentType', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900 capitalize">{appointment.appointmentType}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Time</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.time || ''}
                    onChange={(e) => handleEditFormChange('time', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 9:00 AM"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.time}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Duration</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.duration || ''}
                    onChange={(e) => handleEditFormChange('duration', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 15 min"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.duration}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                {isEditMode ? (
                  <Select
                    value={editForm.status || ''}
                    onValueChange={(value) => handleEditFormChange('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900 capitalize">{appointment.status.replace('-', ' ')}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Priority</Label>
                {isEditMode ? (
                  <Select
                    value={editForm.priority || ''}
                    onValueChange={(value) => handleEditFormChange('priority', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900 capitalize">{appointment.priority}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Copay</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.copay || ''}
                    onChange={(e) => handleEditFormChange('copay', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., $25.00"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.copay}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Last Visit</Label>
                {isEditMode ? (
                  <Input
                    type="date"
                    value={editForm.lastVisit || ''}
                    onChange={(e) => handleEditFormChange('lastVisit', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.lastVisit}</p>
                )}
              </div>
              {appointment.arrivalTime && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Arrival Time</Label>
                  <p className="mt-1 text-green-700 font-medium">
                    Arrived at {appointment.arrivalTime}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Reason for Visit</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.reasonForVisit || ''}
                    onChange={(e) => handleEditFormChange('reasonForVisit', e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.reasonForVisit}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Notes</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.notes || ''}
                    onChange={(e) => handleEditFormChange('notes', e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.notes}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Insurance Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              Insurance Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Insurance Provider</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.insurance || ''}
                    onChange={(e) => handleEditFormChange('insurance', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.insurance}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Policy Number</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.policyNumber || ''}
                    onChange={(e) => handleEditFormChange('policyNumber', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-mono">{appointment.policyNumber}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-red-600" />
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Allergies</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.allergies || ''}
                    onChange={(e) => handleEditFormChange('allergies', e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="List any known allergies..."
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.allergies}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Medications</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.medications || ''}
                    onChange={(e) => handleEditFormChange('medications', e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="List current medications and dosages..."
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{appointment.medications}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;