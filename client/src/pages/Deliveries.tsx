import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  Phone,
  Plus,
  Search,
  Filter,
  Eye,
  TrendingUp,
  TrendingDown,
  CheckCircle
} from 'lucide-react';
import TrackDeliveryDialog from '@/components/TrackDeliveryDialog';
import ContactPatientDialog from '@/components/ContactPatientDialog';
import MarkReadyDialog from '@/components/MarkReadyDialog';
import AssignDriverDialog from '@/components/AssignDriverDialog';
import NewDeliveryDialog from '@/components/NewDeliveryDialog';
import DeliveryDetailsDialog from '@/components/DeliveryDetailsDialog';
import PaginationControls from '@/components/ui/pagination-controls';

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
    },
    {
      id: 'DEL005',
      patient: 'Michael Brown',
      address: '567 Maple Ave, Anytown, ST 12345',
      phone: '(555) 876-5432',
      medications: ['Lisinopril 20mg x30', 'Simvastatin 40mg x30'],
      status: 'Scheduled',
      driver: 'Unassigned',
      estimatedTime: '10:30 AM',
      priority: 'Standard',
      email: 'michael.brown@email.com',
      emergencyContact: 'Sarah Brown - (555) 876-5433',
      deliveryInstructions: 'Leave with front desk if patient not home',
      prescriptionId: 'RX005-2023',
      orderDate: '2023-12-02',
      scheduledDate: '2023-12-03',
      actualDeliveryTime: null,
      deliveryWindow: '10:00 AM - 12:00 PM',
      cost: '$42.50',
      copay: '$15.00',
      insurance: 'Medicare',
      policyNumber: 'MED567890123',
      pharmacistNotes: 'Patient requested morning delivery',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234571',
      driverPhone: 'N/A',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: 'DEL006',
      patient: 'Sarah Johnson',
      address: '789 Oak St, Anytown, ST 12345',
      phone: '(555) 765-4321',
      medications: ['Escitalopram 10mg x30', 'Alprazolam 0.5mg x30'],
      status: 'Preparing',
      driver: 'Unassigned',
      estimatedTime: '1:30 PM',
      priority: 'High',
      email: 'sarah.johnson@email.com',
      emergencyContact: 'Mark Johnson - (555) 765-4322',
      deliveryInstructions: 'Call patient 15 minutes before arrival',
      prescriptionId: 'RX006-2023',
      orderDate: '2023-12-02',
      scheduledDate: '2023-12-03',
      actualDeliveryTime: null,
      deliveryWindow: '1:00 PM - 3:00 PM',
      cost: '$55.25',
      copay: '$20.00',
      insurance: 'Cigna',
      policyNumber: 'CIG678901234',
      pharmacistNotes: 'Patient requested ID verification upon delivery',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234572',
      driverPhone: 'N/A',
      deliveryMethod: 'Hand-to-Hand Delivery'
    },
    {
      id: 'DEL007',
      patient: 'Thomas Anderson',
      address: '789 Maple St, Anytown, ST 12345',
      phone: '(555) 109-8765',
      medications: ['Albuterol Inhaler x1', 'Fluticasone Inhaler x1'],
      status: 'Out for Delivery',
      driver: 'David Brown',
      estimatedTime: '3:45 PM',
      priority: 'Urgent',
      email: 'thomas.anderson@email.com',
      emergencyContact: 'Emily Anderson - (555) 109-8766',
      deliveryInstructions: 'Apartment 2C, knock loudly - patient has hearing impairment',
      prescriptionId: 'RX007-2023',
      orderDate: '2023-12-02',
      scheduledDate: '2023-12-03',
      actualDeliveryTime: null,
      deliveryWindow: '3:00 PM - 5:00 PM',
      cost: '$85.75',
      copay: '$30.00',
      insurance: 'Blue Cross',
      policyNumber: 'BC901234567',
      pharmacistNotes: 'Patient needs inhaler urgently - expedite delivery',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234573',
      driverPhone: '(555) 222-3333',
      deliveryMethod: 'Express Delivery'
    },
    {
      id: 'DEL008',
      patient: 'Emily Thompson',
      address: '456 Birch St, Anytown, ST 12345',
      phone: '(555) 987-0123',
      medications: ['Amoxicillin 500mg x21'],
      status: 'Delivered',
      driver: 'Lisa Garcia',
      estimatedTime: 'Completed at 11:30 AM',
      priority: 'High',
      email: 'emily.thompson@email.com',
      emergencyContact: 'James Thompson - (555) 987-0124',
      deliveryInstructions: 'Leave with neighbor if not home',
      prescriptionId: 'RX008-2023',
      orderDate: '2023-12-02',
      scheduledDate: '2023-12-03',
      actualDeliveryTime: '11:30 AM',
      deliveryWindow: '10:00 AM - 12:00 PM',
      cost: '$15.99',
      copay: '$5.00',
      insurance: 'Aetna',
      policyNumber: 'AET012345678',
      pharmacistNotes: 'Antibiotic for acute infection - priority delivery',
      patientSignature: true,
      deliveryAttempts: 1,
      trackingNumber: 'TRK001234574',
      driverPhone: '(555) 444-5555',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: 'DEL009',
      patient: 'James Wilson',
      address: '789 Cedar St, Anytown, ST 12345',
      phone: '(555) 876-0123',
      medications: ['Lisinopril 10mg x30', 'Hydrochlorothiazide 25mg x30', 'Metoprolol 50mg x60'],
      status: 'Scheduled',
      driver: 'Unassigned',
      estimatedTime: '2:00 PM',
      priority: 'Standard',
      email: 'james.wilson@email.com',
      emergencyContact: 'Linda Wilson - (555) 876-0124',
      deliveryInstructions: 'Gated community - code #1234',
      prescriptionId: 'RX009-2023',
      orderDate: '2023-12-03',
      scheduledDate: '2023-12-04',
      actualDeliveryTime: null,
      deliveryWindow: '1:00 PM - 3:00 PM',
      cost: '$65.50',
      copay: '$25.00',
      insurance: 'Humana',
      policyNumber: 'HUM123456789',
      pharmacistNotes: 'Monthly maintenance medications',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234575',
      driverPhone: 'N/A',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: 'DEL010',
      patient: 'Patricia Moore',
      address: '123 Walnut St, Anytown, ST 12345',
      phone: '(555) 765-0123',
      medications: ['Insulin Lispro x3 vials', 'Insulin Syringes x100', 'Glucose Test Strips x100'],
      status: 'Preparing',
      driver: 'Unassigned',
      estimatedTime: '9:30 AM',
      priority: 'Urgent',
      email: 'patricia.moore@email.com',
      emergencyContact: 'Robert Moore - (555) 765-0124',
      deliveryInstructions: 'Cold chain delivery - hand directly to patient',
      prescriptionId: 'RX010-2023',
      orderDate: '2023-12-03',
      scheduledDate: '2023-12-04',
      actualDeliveryTime: null,
      deliveryWindow: '9:00 AM - 11:00 AM',
      cost: '$175.25',
      copay: '$50.00',
      insurance: 'Medicare',
      policyNumber: 'MED234567890',
      pharmacistNotes: 'Diabetic supplies - maintain cold chain for insulin',
      patientSignature: false,
      deliveryAttempts: 0,
      trackingNumber: 'TRK001234576',
      driverPhone: 'N/A',
      deliveryMethod: 'Cold Chain Delivery'
    }
  ]);

  const [detailsDelivery, setDetailsDelivery] = useState<Delivery | null>(null);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>(deliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Apply filters and search
  useEffect(() => {
    const filtered = deliveries.filter(delivery => {
      // Apply search filter
      const matchesSearch = !searchTerm ||
        delivery.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.phone.includes(searchTerm);

      // Apply status filter
      const matchesStatus = filterStatus === 'all' || delivery.status === filterStatus;

      // Apply priority filter
      const matchesPriority = filterPriority === 'all' || delivery.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    setFilteredDeliveries(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterStatus, filterPriority, deliveries]);

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

  const handleNewDelivery = (deliveryData: Partial<Delivery>) => {
    console.log('New delivery scheduled:', deliveryData);
    // In a real app, you would add the new delivery to the state
    const newDelivery = {
      ...deliveryData,
      id: `DEL${Date.now().toString().slice(-6)}`,
    } as Delivery;
    
    setDeliveries([...deliveries, newDelivery]);
  };

  const handleContactPatient = (contactData: { deliveryId: string; method: string; message: string }) => {
    console.log('Patient contacted:', contactData);
    // In a real app, you would record the contact attempt
  };

  const handleMarkReady = (readyData: { deliveryId: string; preparedBy: string }) => {
    console.log('Delivery marked ready:', readyData);
    // Update the delivery status
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === readyData.deliveryId 
        ? { ...delivery, status: 'Out for Delivery' } 
        : delivery
    );
    setDeliveries(updatedDeliveries);
  };

  const handleAssignDriver = (assignmentData: { deliveryId: string; driverId: string; driverName: string }) => {
    console.log('Driver assigned:', assignmentData);
    // Update the delivery driver
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === assignmentData.deliveryId 
        ? { ...delivery, driver: assignmentData.driverName } 
        : delivery
    );
    setDeliveries(updatedDeliveries);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <Layout title="Delivery Management" subtitle="Track and manage prescription deliveries">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deliveries..."
                className="pl-10 w-64 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
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
                <p className="text-gray-600">
                  {filteredDeliveries.length} deliveries scheduled • 
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDeliveries.length)} of {filteredDeliveries.length}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {currentItems.map((delivery) => (
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

            {/* Pagination Controls */}
            {filteredDeliveries.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDeliveries.length)} of {filteredDeliveries.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Details Dialog - Using the new component */}
        <DeliveryDetailsDialog
          delivery={detailsDelivery}
          open={!!detailsDelivery}
          onOpenChange={(open) => !open && setDetailsDelivery(null)}
        />
      </div>
    </Layout>
  );
};

export default DeliveriesPage;