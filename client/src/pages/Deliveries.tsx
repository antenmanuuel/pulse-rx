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
import { Delivery, deliveryData } from '@/data/deliveryData';

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(deliveryData);
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