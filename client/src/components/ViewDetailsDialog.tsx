import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
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
  Calendar,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface Prescription {
  id: string;
  patient: string;
  medication: string;
  quantity: string;
  status: string;
  priority: string;
  time: string;
  insurance: string;
  prescriber: string;
  dob: string;
  phone: string;
  address: string;
  memberId: string;
  ndcNumber: string;
  lotNumber: string;
  daysSupply: string;
  refillsRemaining: number;
  genericAvailable: boolean;
  expiryDate: string;
  directions: string;
  warnings: string;
  npiNumber: string;
  deaNumber: string;
  prescriberPhone: string;
  prescriberFax: string;
  medicalSpecialty: string;
  practiceAddress: string;
  dosage: string;
  frequency: string;
  form: string;
  strength: string;
  brandName: string;
  manufacturer: string;
  substitutionAllowed: boolean;
  priorAuthorization: boolean;
  copay: string;
  totalCost: string;
}

interface ViewDetailsDialogProps {
  prescription: Prescription | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessPrescription?: (prescription: Prescription) => void;
  onEditPrescription?: (updatedPrescription: Prescription) => void;
}

const ViewDetailsDialog = ({
  prescription,
  open,
  onOpenChange,
  onProcessPrescription,
  onEditPrescription
}: ViewDetailsDialogProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Prescription>>({});

  useEffect(() => {
    if (prescription && isEditMode) {
      setEditForm({ ...prescription });
    }
  }, [prescription, isEditMode]);

  if (!prescription) return null;

  const handleStartEdit = () => {
    setEditForm({ ...prescription });
    setIsEditMode(true);
  };

  const handleSaveEdit = () => {
    if (onEditPrescription && editForm) {
      onEditPrescription({ ...prescription, ...editForm } as Prescription);
      setIsEditMode(false);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: string | number | boolean) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
              {onEditPrescription && !isEditMode && (
                <Button
                  onClick={handleStartEdit}
                  className="bg-walgreens-blue hover:bg-blue-700 text-white ml-2"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              {isEditMode && (
                <div className="flex space-x-2 ml-2">
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
                </div>
              )}
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
                    <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.patient || ''}
                        onChange={(e) => handleEditFormChange('patient', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.patient}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                    {isEditMode ? (
                      <Input
                        type="date"
                        value={editForm.dob || ''}
                        onChange={(e) => handleEditFormChange('dob', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.dob}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.phone || ''}
                        onChange={(e) => handleEditFormChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {prescription.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address</Label>
                    {isEditMode ? (
                      <Textarea
                        value={editForm.address || ''}
                        onChange={(e) => handleEditFormChange('address', e.target.value)}
                        className="mt-1"
                        rows={2}
                        placeholder="123 Main St, City, ST 12345"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900 flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                        {prescription.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Insurance Provider</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.insurance || ''}
                        onChange={(e) => handleEditFormChange('insurance', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.insurance}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Member ID</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.memberId || ''}
                        onChange={(e) => handleEditFormChange('memberId', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.memberId}</p>
                    )}
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
                    <Label className="text-sm font-medium text-gray-700">Medication Name</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.medication || ''}
                        onChange={(e) => handleEditFormChange('medication', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.medication}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Quantity Prescribed</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.quantity || ''}
                        onChange={(e) => handleEditFormChange('quantity', e.target.value)}
                        className="mt-1"
                        placeholder="30 tablets"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.quantity}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">NDC Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.ndcNumber || ''}
                        onChange={(e) => handleEditFormChange('ndcNumber', e.target.value)}
                        className="mt-1"
                        placeholder="12345-678-90"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.ndcNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Lot Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.lotNumber || ''}
                        onChange={(e) => handleEditFormChange('lotNumber', e.target.value)}
                        className="mt-1"
                        placeholder="AB123CD"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.lotNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Dosage</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.dosage || ''}
                        onChange={(e) => handleEditFormChange('dosage', e.target.value)}
                        className="mt-1"
                        placeholder="10mg"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.dosage}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Form</Label>
                    {isEditMode ? (
                      <Select
                        value={editForm.form || ''}
                        onValueChange={(value) => handleEditFormChange('form', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tablet">Tablet</SelectItem>
                          <SelectItem value="Capsule">Capsule</SelectItem>
                          <SelectItem value="Liquid">Liquid</SelectItem>
                          <SelectItem value="Injection">Injection</SelectItem>
                          <SelectItem value="Cream">Cream</SelectItem>
                          <SelectItem value="Ointment">Ointment</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.form}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Days Supply</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.daysSupply || ''}
                        onChange={(e) => handleEditFormChange('daysSupply', e.target.value)}
                        className="mt-1"
                        placeholder="30 days"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.daysSupply}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Refills Remaining</Label>
                    {isEditMode ? (
                      <Input
                        type="number"
                        value={editForm.refillsRemaining || ''}
                        onChange={(e) => handleEditFormChange('refillsRemaining', parseInt(e.target.value) || 0)}
                        className="mt-1"
                        min="0"
                        max="11"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.refillsRemaining} refills</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Generic Available</Label>
                    {isEditMode ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox
                          checked={editForm.genericAvailable || false}
                          onCheckedChange={(checked) => handleEditFormChange('genericAvailable', checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">Generic substitution available</span>
                      </div>
                    ) : (
                      <p className={`mt-1 font-semibold ${prescription.genericAvailable ? 'text-green-700' : 'text-red-700'}`}>
                        {prescription.genericAvailable ? 'Yes' : 'No'}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Expiry Date</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.expiryDate || ''}
                        onChange={(e) => handleEditFormChange('expiryDate', e.target.value)}
                        className="mt-1"
                        placeholder="12/2025"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {prescription.expiryDate}
                      </p>
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
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ready for Review">Ready for Review</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Verification">Verification</SelectItem>
                          <SelectItem value="Pending Insurance">Pending Insurance</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.status}</p>
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
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.priority}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Directions for Use</Label>
                  {isEditMode ? (
                    <Textarea
                      value={editForm.directions || ''}
                      onChange={(e) => handleEditFormChange('directions', e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Enter directions for use..."
                    />
                  ) : (
                    <p className="mt-1 font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {prescription.directions}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Important Warnings</Label>
                  {isEditMode ? (
                    <Textarea
                      value={editForm.warnings || ''}
                      onChange={(e) => handleEditFormChange('warnings', e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Enter important warnings..."
                    />
                  ) : (
                    <p className="mt-1 font-medium text-orange-800 bg-orange-50 p-3 rounded-lg flex items-start">
                      <AlertCircle className="w-4 h-4 mr-2 text-orange-600 mt-0.5 flex-shrink-0" />
                      {prescription.warnings}
                    </p>
                  )}
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
                    <Label className="text-sm font-medium text-gray-700">Prescribing Physician</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.prescriber || ''}
                        onChange={(e) => handleEditFormChange('prescriber', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.prescriber}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">NPI Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.npiNumber || ''}
                        onChange={(e) => handleEditFormChange('npiNumber', e.target.value)}
                        className="mt-1"
                        placeholder="1234567890"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.npiNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">DEA Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.deaNumber || ''}
                        onChange={(e) => handleEditFormChange('deaNumber', e.target.value)}
                        className="mt-1"
                        placeholder="AB1234567"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.deaNumber}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.prescriberPhone || ''}
                        onChange={(e) => handleEditFormChange('prescriberPhone', e.target.value)}
                        className="mt-1"
                        placeholder="(555) 987-6543"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {prescription.prescriberPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Fax Number</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.prescriberFax || ''}
                        onChange={(e) => handleEditFormChange('prescriberFax', e.target.value)}
                        className="mt-1"
                        placeholder="(555) 987-6544"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.prescriberFax}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Medical Specialty</Label>
                    {isEditMode ? (
                      <Input
                        value={editForm.medicalSpecialty || ''}
                        onChange={(e) => handleEditFormChange('medicalSpecialty', e.target.value)}
                        className="mt-1"
                        placeholder="Internal Medicine"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-gray-900">{prescription.medicalSpecialty}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <Label className="text-sm font-medium text-gray-700">Practice Address</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.practiceAddress || ''}
                    onChange={(e) => handleEditFormChange('practiceAddress', e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="456 Medical Center Dr, Suite 200, City, ST 12345"
                  />
                ) : (
                  <p className="font-semibold text-gray-900 flex items-start mt-1">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                    {prescription.practiceAddress}
                  </p>
                )}
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
