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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Clock,
  UserCheck,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Heart,
  ClipboardList
} from 'lucide-react';

interface CheckInDialogProps {
  appointment: any;
  onCheckIn: (data: any) => void;
}

export default function CheckInDialog({ appointment, onCheckIn }: CheckInDialogProps) {
  const [open, setOpen] = useState(false);
  const [checkInData, setCheckInData] = useState({
    arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    symptoms: '',
    medications: '',
    insuranceVerified: false,
    consentSigned: false,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckIn({ ...checkInData, appointmentId: appointment.id });
    setOpen(false);
  };

  const isFormValid = () => {
    return checkInData.arrivalTime && checkInData.insuranceVerified && checkInData.consentSigned;
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCompletionPercentage = () => {
    const fields = [
      checkInData.arrivalTime,
      checkInData.symptoms,
      checkInData.medications,
      checkInData.insuranceVerified,
      checkInData.consentSigned,
      checkInData.notes
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <UserCheck className="w-4 h-4 mr-1" />
          Check In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Patient Check-In
              </DialogTitle>
              <p className="text-gray-600">{appointment.patient} - {appointment.service}</p>
            </div>
          </div>
        </DialogHeader>

        {/* Appointment Overview */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-walgreens-blue" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{appointment.time}</div>
                  <div className="text-sm text-blue-700">Scheduled Time</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900">{getCurrentTime()}</div>
                  <div className="text-sm text-green-700">Current Time</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{appointment.duration}</div>
                  <div className="text-sm text-purple-700">Duration</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{appointment.serviceIcon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{appointment.service}</div>
                    <div className="text-gray-600">Patient ID: {appointment.id}</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Check-In Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-walgreens-blue" />
                Check-In Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="arrivalTime" className="text-sm font-medium text-gray-700">
                  Actual Arrival Time *
                </Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  value={checkInData.arrivalTime}
                  onChange={(e) => setCheckInData({ ...checkInData, arrivalTime: e.target.value })}
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms" className="text-sm font-medium text-gray-700">
                    Current Symptoms/Concerns
                  </Label>
                  <Textarea
                    id="symptoms"
                    value={checkInData.symptoms}
                    onChange={(e) => setCheckInData({ ...checkInData, symptoms: e.target.value })}
                    placeholder="Any symptoms or concerns the patient mentions"
                    rows={3}
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications" className="text-sm font-medium text-gray-700">
                    Current Medications
                  </Label>
                  <Textarea
                    id="medications"
                    value={checkInData.medications}
                    onChange={(e) => setCheckInData({ ...checkInData, medications: e.target.value })}
                    placeholder="List current medications or 'None'"
                    rows={3}
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification & Consent */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-walgreens-blue" />
                Verification & Consent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      id="insurance"
                      checked={checkInData.insuranceVerified}
                      onCheckedChange={(checked) => setCheckInData({ ...checkInData, insuranceVerified: checked as boolean })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="insurance" className="font-medium text-blue-900 cursor-pointer">
                        Insurance Verification
                      </Label>
                      <p className="text-sm text-blue-700 mt-1">
                        Insurance information has been verified and is active
                      </p>
                      <div className="flex items-center space-x-1 mt-2">
                        {checkInData.insuranceVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                        <span className="text-xs text-gray-600">
                          {checkInData.insuranceVerified ? 'Verified' : 'Pending verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Checkbox
                      id="consent"
                      checked={checkInData.consentSigned}
                      onCheckedChange={(checked) => setCheckInData({ ...checkInData, consentSigned: checked as boolean })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="consent" className="font-medium text-green-900 cursor-pointer">
                        Consent Forms
                      </Label>
                      <p className="text-sm text-green-700 mt-1">
                        Required consent forms have been signed
                      </p>
                      <div className="flex items-center space-x-1 mt-2">
                        {checkInData.consentSigned ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                        <span className="text-xs text-gray-600">
                          {checkInData.consentSigned ? 'Completed' : 'Pending signature'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Pharmacist Notes
                </Label>
                <Textarea
                  id="notes"
                  value={checkInData.notes}
                  onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
                  placeholder="Any additional notes for the pharmacist or service provider"
                  rows={3}
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Check-In Summary */}
          {(checkInData.arrivalTime || checkInData.symptoms || checkInData.medications) && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Check-In Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-700">Form Completion</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getCompletionPercentage()}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-900">{getCompletionPercentage()}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Patient Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Arrival Time:</span>
                        <span className="font-medium">{checkInData.arrivalTime || 'Not set'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Insurance:</span>
                        <span className={`font-medium ${checkInData.insuranceVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                          {checkInData.insuranceVerified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Consent:</span>
                        <span className={`font-medium ${checkInData.consentSigned ? 'text-green-600' : 'text-yellow-600'}`}>
                          {checkInData.consentSigned ? 'Signed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Ready for Service</h4>
                    <div className="space-y-2 text-sm">
                      {isFormValid() ? (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>All requirements met</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-yellow-700">
                          <AlertCircle className="w-4 h-4" />
                          <span>Complete verification steps</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-blue-700">
                        <Stethoscope className="w-4 h-4" />
                        <span>Ready for pharmacist</span>
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
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isFormValid()}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Complete Check-In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
