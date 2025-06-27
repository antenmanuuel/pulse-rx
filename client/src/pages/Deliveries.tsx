import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  Phone,
  Plus,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit3,
  Save,
  X,
  User,
  FileText,
  DollarSign,
  Navigation,
  Shield
} from 'lucide-react';
import TrackDeliveryDialog from '@/components/TrackDeliveryDialog';
import ContactPatientDialog from '@/components/ContactPatientDialog';
import MarkReadyDialog from '@/components/MarkReadyDialog';
import AssignDriverDialog from '@/components/AssignDriverDialog';
import NewDeliveryDialog from '@/components/NewDeliveryDialog';

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

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 'DEL001',
      patient: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      phone: '(555) 123-4567',
      medications: ['Lisinopril 10mg x30', 'Metformin 500mg x90'],
      status: 'Out for Delivery',
      driver: 'Mike Johnson',
      estimatedTime: '2:30 PM',
      priority: 'Standard',
      email: 'john.smith@email.com',
      emergencyContact: 'Jane Smith - (555) 123-4568',
      deliveryInstructions: 'Leave at front door, ring doorbell',
      prescriptionId: 'RX001-2023',
      orderDate: '2023-12-01',
      scheduledDate: '2023-12-02',
      actualDeliveryTime: null,
      deliveryWindow: '2:00 PM - 4:00 PM',
      cost: '$45.99',
      copay: '$10.00',
      insurance: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      pharmacistNotes: 'Patient prefers afternoon delivery',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234567',
      driverPhone: '(555) 111-2222',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: 'DEL002',
      patient: 'Maria Garcia',
      address: '456 Oak Ave, Anytown, ST 12345',
      phone: '(555) 987-6543',
      medications: ['Insulin Glargine', 'Test Strips x100'],
      status: 'Preparing',
      driver: 'Unassigned',
      estimatedTime: '4:00 PM',
      priority: 'Urgent',
      email: 'maria.garcia@email.com',
      emergencyContact: 'Carlos Garcia - (555) 987-6544',
      deliveryInstructions: 'Cold storage required, deliver to side door',
      prescriptionId: 'RX002-2023',
      orderDate: '2023-12-01',
      scheduledDate: '2023-12-02',
      actualDeliveryTime: null,
      deliveryWindow: '3:00 PM - 5:00 PM',
      cost: '$125.50',
      copay: '$25.00',
      insurance: 'Aetna',
      policyNumber: 'AET987654321',
      pharmacistNotes: 'Refrigerated medication - priority delivery',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234568',
      driverPhone: 'N/A',
      deliveryMethod: 'Cold Chain Delivery'
    },
    {
      id: 'DEL003',
      patient: 'Robert Davis',
      address: '789 Pine St, Anytown, ST 12345',
      phone: '(555) 456-7890',
      medications: ['Warfarin 5mg x30', 'Diltiazem 120mg x30'],
      status: 'Delivered',
      driver: 'Sarah Wilson',
      estimatedTime: 'Completed at 1:15 PM',
      priority: 'Standard',
      email: 'robert.davis@email.com',
      emergencyContact: 'Susan Davis - (555) 456-7891',
      deliveryInstructions: 'Apartment 3B, buzz #3',
      prescriptionId: 'RX003-2023',
      orderDate: '2023-12-01',
      scheduledDate: '2023-12-02',
      actualDeliveryTime: '1:15 PM',
      deliveryWindow: '1:00 PM - 3:00 PM',
      cost: '$67.25',
      copay: '$15.00',
      insurance: 'Medicare',
      policyNumber: 'MED123456789',
      pharmacistNotes: 'Patient has mobility issues - hand deliver to patient',
      patientSignature: true,
      deliveryAttempts: 1,
      trackingNumber: 'TRK001234569',
      driverPhone: '(555) 333-4444',
      deliveryMethod: 'Hand-to-Hand Delivery'
    },
    {
      id: 'DEL004',
      patient: 'Jennifer Wilson',
      address: '321 Elm St, Anytown, ST 12345',
      phone: '(555) 234-5678',
      medications: ['Levothyroxine 50mcg x30'],
      status: 'Scheduled',
      driver: 'Unassigned',
      estimatedTime: '5:30 PM',
      priority: 'Standard',
      email: 'jennifer.wilson@email.com',
      emergencyContact: 'Michael Wilson - (555) 234-5679',
      deliveryInstructions: 'Ring doorbell, patient works from home',
      prescriptionId: 'RX004-2023',
      orderDate: '2023-12-01',
      scheduledDate: '2023-12-02',
      actualDeliveryTime: null,
      deliveryWindow: '5:00 PM - 7:00 PM',
      cost: '$28.75',
      copay: '$5.00',
      insurance: 'Cigna',
      policyNumber: 'CIG345678901',
      pharmacistNotes: 'Regular monthly refill',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234570',
      driverPhone: 'N/A',
      deliveryMethod: 'Standard Delivery'
    }
  ]);

  const [detailsDelivery, setDetailsDelivery] = useState<Delivery | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Delivery>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Scheduled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Urgent': return '🚨';
      case 'High': return '⚡';
      default: return '📋';
    }
  };

  const activeDeliveries = deliveries.filter(d => d.status !== 'Delivered').length;
  const outForDelivery = deliveries.filter(d => d.status === 'Out for Delivery').length;

  // Handler functions for edit functionality
  const handleStartEdit = () => {
    if (detailsDelivery) {
      setEditForm({ ...detailsDelivery });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (detailsDelivery && editForm) {
      const updatedDeliveries = deliveries.map(delivery =>
        delivery.id === detailsDelivery.id ? { ...delivery, ...editForm } as Delivery : delivery
      );
      setDeliveries(updatedDeliveries);
      setDetailsDelivery({ ...detailsDelivery, ...editForm } as Delivery);
      setIsEditMode(false);
      setEditForm({});

      console.log('Delivery updated:', editForm);
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

  const handleNewDelivery = (deliveryData: Partial<Delivery>) => {
    console.log('New delivery scheduled:', deliveryData);
    // Handle delivery creation
  };

  const handleContactPatient = (contactData: { type: string; message: string; patientId: string }) => {
    console.log('Patient contacted:', contactData);
    // Handle patient contact
  };

  const handleMarkReady = (readyData: { deliveryId: string; readyTime: string }) => {
    console.log('Delivery marked ready:', readyData);
    // Handle marking delivery ready
  };

  const handleAssignDriver = (assignmentData: { deliveryId: string; driverId: string; driverName: string }) => {
    console.log('Driver assigned:', assignmentData);
    // Handle driver assignment
  };

  return (
    <Layout title="Delivery Management" subtitle="Track and manage prescription deliveries">
      <div className="space-y-6">
        <div className="flex justify-end">
          <NewDeliveryDialog onSubmit={handleNewDelivery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
                  <p className="text-3xl font-bold text-gray-900">{activeDeliveries}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">+12% today</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out for Delivery</p>
                  <p className="text-3xl font-bold text-gray-900">{outForDelivery}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Package className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">On track</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Today</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">+8 vs yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                  <p className="text-3xl font-bold text-gray-900">45min</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500">-5min today</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Today's Deliveries
                </CardTitle>
                <p className="text-gray-600">{deliveries.length} deliveries scheduled</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-xl text-gray-900">{delivery.patient}</h3>
                          <Badge className={`${getStatusColor(delivery.status)} border font-medium`}>
                            {delivery.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(delivery.priority)} border font-medium`}>
                            <span className="mr-1">{getPriorityIcon(delivery.priority)}</span>
                            {delivery.priority}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2 text-walgreens-red" />
                            <span className="font-medium">{delivery.address}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-5 h-5 mr-2 text-blue-600" />
                            <span className="font-medium">{delivery.phone}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2 text-orange-600" />
                            <span className="font-medium">{delivery.estimatedTime}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <span className="font-semibold text-gray-900 text-sm block mb-2">
                              <Package className="w-4 h-4 inline mr-2" />
                              Medications:
                            </span>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {delivery.medications.map((med, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-2 h-2 bg-walgreens-blue rounded-full mr-3"></span>
                                  <span className="font-medium">{med}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <span className="font-semibold text-blue-900">Driver:</span>
                              <br />
                              <span className="text-blue-700">{delivery.driver}</span>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <span className="font-semibold text-purple-900">Delivery ID:</span>
                              <br />
                              <span className="text-purple-700 font-mono">{delivery.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 space-y-2 flex flex-col">
                      {delivery.status === 'Scheduled' && (
                        <AssignDriverDialog delivery={delivery} onAssignDriver={handleAssignDriver} />
                      )}
                      {delivery.status === 'Preparing' && (
                        <MarkReadyDialog delivery={delivery} onMarkReady={handleMarkReady} />
                      )}
                      {delivery.status === 'Out for Delivery' && (
                        <TrackDeliveryDialog delivery={delivery} />
                      )}
                      <ContactPatientDialog delivery={delivery} onContact={handleContactPatient} />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDetailsDelivery(delivery)}
                        className="border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details Dialog */}
        <Dialog open={!!detailsDelivery} onOpenChange={() => {
          setDetailsDelivery(null);
          setIsEditMode(false);
          setEditForm({});
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Truck className="w-6 h-6 mr-2 text-walgreens-blue" />
                Delivery Details
                {detailsDelivery && (
                  <Badge className={`ml-3 ${getStatusColor(detailsDelivery.status)} border font-medium`}>
                    {detailsDelivery.status}
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>

            {detailsDelivery && (
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Delivery ID: <span className="font-mono font-medium">{detailsDelivery.id}</span>
                    {detailsDelivery.trackingNumber && (
                      <span className="ml-4">
                        Tracking: <span className="font-mono font-medium">{detailsDelivery.trackingNumber}</span>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.patient}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.phone}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.email}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.emergencyContact}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.address}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.status}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.priority}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.driver}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.driverPhone}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.estimatedTime}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.deliveryWindow}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.scheduledDate}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.deliveryMethod}</p>
                      )}
                    </div>
                    {detailsDelivery.actualDeliveryTime && (
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Actual Delivery Time</Label>
                        <p className="mt-1 text-green-700 font-medium">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Delivered at {detailsDelivery.actualDeliveryTime}
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.deliveryInstructions}</p>
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
                        <p className="mt-1 text-gray-900 font-mono">{detailsDelivery.prescriptionId}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.orderDate}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">Medications</Label>
                      <div className="mt-1 bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {detailsDelivery.medications.map((med, index) => (
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.pharmacistNotes}</p>
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
                        <p className="mt-1 text-gray-900 font-semibold">{detailsDelivery.cost}</p>
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
                        <p className="mt-1 text-gray-900 font-semibold">{detailsDelivery.copay}</p>
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
                        <p className="mt-1 text-gray-900">{detailsDelivery.insurance}</p>
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
                        <p className="mt-1 text-gray-900 font-mono">{detailsDelivery.policyNumber}</p>
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
                      <p className="text-xl font-bold text-blue-700">{detailsDelivery.deliveryAttempts}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-purple-900">Patient Signature</Label>
                      <p className="text-lg font-semibold text-purple-700">
                        {detailsDelivery.patientSignature ? '✅ Obtained' : '❌ Required'}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-green-900">Tracking Number</Label>
                      <p className="text-sm font-mono font-semibold text-green-700">{detailsDelivery.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DeliveriesPage;
