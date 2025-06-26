import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  User,
  Pill,
  FileText,
  Clock,
  Phone,
  MapPin,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  Eye,
  Calendar
} from 'lucide-react';

interface ViewDetailsDialogProps {
  prescription: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessPrescription?: (prescription: any) => void;
}

const ViewDetailsDialog = ({ prescription, open, onOpenChange, onProcessPrescription }: ViewDetailsDialogProps) => {
  if (!prescription) return null;

  const handleProcessPrescription = () => {
    if (onProcessPrescription) {
      onProcessPrescription(prescription);
    }
    onOpenChange(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Review': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Verification': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pending Insurance': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const processingHistory = [
    { step: 'Prescription received', time: prescription.time, status: 'completed', icon: FileText },
    { step: 'Insurance verification started', time: '2:35 PM', status: 'completed', icon: Shield },
    { step: 'Drug interaction check completed', time: '2:40 PM', status: 'completed', icon: CheckCircle },
    { step: 'Ready for final review', time: 'Current', status: 'current', icon: Eye }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Prescription Details
                </DialogTitle>
                <p className="text-gray-600 mt-1">Prescription ID: {prescription.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className={`${getPriorityColor(prescription.priority)} font-medium`}>
                {prescription.priority}
              </Badge>
              <Badge className={`${getStatusColor(prescription.status)} font-medium`}>
                {prescription.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-walgreens-blue" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Full Name</span>
                    <p className="font-semibold text-gray-900">{prescription.patient}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date of Birth</span>
                    <p className="font-semibold text-gray-900">{prescription.dob}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone Number</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Address</span>
                    <p className="font-semibold text-gray-900 flex items-start">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                      123 Main St, City, ST 12345
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Insurance Provider</span>
                    <p className="font-semibold text-gray-900">{prescription.insurance}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Member ID</span>
                    <p className="font-semibold text-gray-900">ABC123456789</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medication Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
                Medication Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Medication Name</span>
                    <p className="font-semibold text-gray-900">{prescription.medication}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Quantity Prescribed</span>
                    <p className="font-semibold text-gray-900">{prescription.quantity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">NDC Number</span>
                    <p className="font-semibold text-gray-900">12345-678-90</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Lot Number</span>
                    <p className="font-semibold text-gray-900">AB123CD</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Days Supply</span>
                    <p className="font-semibold text-gray-900">30 days</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Refills Remaining</span>
                    <p className="font-semibold text-gray-900">3 refills</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Generic Available</span>
                    <p className="font-semibold text-green-700">Yes</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Expiry Date</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      12/2025
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Directions for Use</span>
                  <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                    Take 1 tablet by mouth daily with food. Take at the same time each day for best results.
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Important Warnings</span>
                  <p className="font-medium text-orange-800 bg-orange-50 p-3 rounded-lg flex items-start">
                    <AlertCircle className="w-4 h-4 mr-2 text-orange-600 mt-0.5 flex-shrink-0" />
                    May cause dizziness. Do not drive or operate machinery while taking this medication. Avoid alcohol consumption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prescriber Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Prescriber Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Prescribing Physician</span>
                    <p className="font-semibold text-gray-900">{prescription.prescriber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">NPI Number</span>
                    <p className="font-semibold text-gray-900">1234567890</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">DEA Number</span>
                    <p className="font-semibold text-gray-900">AB1234567</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Phone Number</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      (555) 987-6543
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Fax Number</span>
                    <p className="font-semibold text-gray-900">(555) 987-6544</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Medical Specialty</span>
                    <p className="font-semibold text-gray-900">Internal Medicine</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <span className="text-sm text-gray-600">Practice Address</span>
                <p className="font-semibold text-gray-900 flex items-start mt-1">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                  456 Medical Center Dr, Suite 200, City, ST 12345
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Processing History */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <Activity className="w-5 h-5 mr-2 text-walgreens-blue" />
                Processing Timeline
              </h3>
              <div className="space-y-4">
                {processingHistory.map((item, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${item.status === 'completed' ? 'bg-green-50 border border-green-200' :
                    item.status === 'current' ? 'bg-blue-50 border border-blue-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.status === 'completed' ? 'bg-green-100 text-green-600' :
                      item.status === 'current' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${item.status === 'completed' ? 'text-green-900' :
                        item.status === 'current' ? 'text-blue-900' :
                          'text-gray-900'
                        }`}>
                        {item.step}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleProcessPrescription}
            >
              <Shield className="w-4 h-4 mr-2" />
              Process Prescription
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
