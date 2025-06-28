import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  Phone,
  User,
  FileText,
  DollarSign,
  Navigation,
  Shield,
  Edit3,
  Save,
  X,
  Mail,
  CheckCircle
} from 'lucide-react';

interface Delivery {
  id: string;
  patient: string;
  address: string;
  phone: string;
  medications: string[];
  status: string;
  driver: string;
  estimatedTime: string;
  priority: string;
  email: string;
  emergencyContact: string;
  deliveryInstructions: string;
  prescriptionId: string;
  orderDate: string;
  scheduledDate: string;
  actualDeliveryTime: string | null;
  deliveryWindow: string;
  cost: string;
  copay: string;
  insurance: string;
  policyNumber: string;
  pharmacistNotes: string;
  patientSignature: boolean;
  deliveryAttempts: number;
  trackingNumber: string;
  driverPhone: string;
  deliveryMethod: string;
}

interface DeliveryDetailsDialogProps {
  delivery: Delivery | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStock?: (delivery: Delivery) => void;
  onAssignDriver?: (delivery: Delivery) => void;
}

const DeliveryDetailsDialog = ({
  delivery,
  open,
  onOpenChange,
  onUpdateStock,
  onAssignDriver
}: DeliveryDetailsDialogProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Delivery>>({});

  const handleStartEdit = () => {
    if (delivery) {
      setEditForm({ ...delivery });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (delivery && editForm) {
      // In a real app, you would update the delivery in the database
      console.log('Delivery updated:', editForm);
      setIsEditMode(false);
      setEditForm({});
      onOpenChange(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: string | boolean | number) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!delivery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Truck className="w-6 h-6 mr-2 text-walgreens-blue" />
            Delivery Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Delivery ID: <span className="font-mono font-medium">{delivery.id}</span>
              {delivery.trackingNumber && (
                <span className="ml-4">
                  Tracking: <span className="font-mono font-medium">{delivery.trackingNumber}</span>
                </span>
              )}
            </div>
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
                  <p className="mt-1 text-gray-900">{delivery.patient}</p>
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
                  <p className="mt-1 text-gray-900">{delivery.phone}</p>
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
                  <p className="mt-1 text-gray-900">{delivery.email}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Emergency Contact</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.emergencyContact || ''}
                    onChange={(e) => handleEditFormChange('emergencyContact', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.emergencyContact}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Delivery Address</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.address || ''}
                    onChange={(e) => handleEditFormChange('address', e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.address}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-green-600" />
              Delivery Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Preparing">Preparing</SelectItem>
                      <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Failed Delivery">Failed Delivery</SelectItem>
                      <SelectItem value="Returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.status}</p>
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
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.priority}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Driver</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.driver || ''}
                    onChange={(e) => handleEditFormChange('driver', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.driver}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Driver Phone</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.driverPhone || ''}
                    onChange={(e) => handleEditFormChange('driverPhone', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.driverPhone}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Estimated Time</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.estimatedTime || ''}
                    onChange={(e) => handleEditFormChange('estimatedTime', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 2:30 PM"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.estimatedTime}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Delivery Window</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.deliveryWindow || ''}
                    onChange={(e) => handleEditFormChange('deliveryWindow', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 2:00 PM - 4:00 PM"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.deliveryWindow}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Scheduled Date</Label>
                {isEditMode ? (
                  <Input
                    type="date"
                    value={editForm.scheduledDate || ''}
                    onChange={(e) => handleEditFormChange('scheduledDate', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.scheduledDate}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Delivery Method</Label>
                {isEditMode ? (
                  <Select
                    value={editForm.deliveryMethod || ''}
                    onValueChange={(value) => handleEditFormChange('deliveryMethod', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard Delivery">Standard Delivery</SelectItem>
                      <SelectItem value="Cold Chain Delivery">Cold Chain Delivery</SelectItem>
                      <SelectItem value="Hand-to-Hand Delivery">Hand-to-Hand Delivery</SelectItem>
                      <SelectItem value="Express Delivery">Express Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.deliveryMethod}</p>
                )}
              </div>
              {delivery.actualDeliveryTime && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Actual Delivery Time</Label>
                  <p className="mt-1 text-green-700 font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Delivered at {delivery.actualDeliveryTime}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Delivery Instructions</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.deliveryInstructions || ''}
                    onChange={(e) => handleEditFormChange('deliveryInstructions', e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Special delivery instructions..."
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.deliveryInstructions}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Prescription Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-purple-600" />
              Prescription Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Prescription ID</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.prescriptionId || ''}
                    onChange={(e) => handleEditFormChange('prescriptionId', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-mono">{delivery.prescriptionId}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Order Date</Label>
                {isEditMode ? (
                  <Input
                    type="date"
                    value={editForm.orderDate || ''}
                    onChange={(e) => handleEditFormChange('orderDate', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.orderDate}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Medications</Label>
                <div className="mt-1 bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {delivery.medications.map((med, index) => (
                      <li key={index} className="flex items-center text-gray-900">
                        <span className="w-2 h-2 bg-walgreens-blue rounded-full mr-3"></span>
                        <span className="font-medium">{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Pharmacist Notes</Label>
                {isEditMode ? (
                  <Textarea
                    value={editForm.pharmacistNotes || ''}
                    onChange={(e) => handleEditFormChange('pharmacistNotes', e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Additional pharmacist notes..."
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{delivery.pharmacistNotes}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Total Cost</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.cost || ''}
                    onChange={(e) => handleEditFormChange('cost', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., $45.99"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-semibold">{delivery.cost}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Patient Copay</Label>
                {isEditMode ? (
                  <Input
                    value={editForm.copay || ''}
                    onChange={(e) => handleEditFormChange('copay', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., $10.00"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-semibold">{delivery.copay}</p>
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
                  <p className="mt-1 text-gray-900">{delivery.insurance}</p>
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
                  <p className="mt-1 text-gray-900 font-mono">{delivery.policyNumber}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-600" />
              Delivery Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-blue-900">Delivery Attempts</Label>
                <p className="text-xl font-bold text-blue-700">{delivery.deliveryAttempts}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-purple-900">Patient Signature</Label>
                <p className="text-lg font-semibold text-purple-700">
                  {delivery.patientSignature ? '✅ Obtained' : '❌ Required'}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-green-900">Tracking Number</Label>
                <p className="text-sm font-mono font-semibold text-green-700">{delivery.trackingNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryDetailsDialog;