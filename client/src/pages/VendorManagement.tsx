import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddVendorDialog from '@/components/AddVendorDialog';
import CreatePODialog from '@/components/CreatePODialog';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Truck,
  DollarSign,
  TrendingUp,
  Star,
  CheckCircle,
  AlertTriangle,
  Package,
  FileText,
  Calendar,
  Clock,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Award,
  Target
} from 'lucide-react';

const VendorManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [viewPODialogOpen, setViewPODialogOpen] = useState(false);
  const [trackPODialogOpen, setTrackPODialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [viewVendorDialogOpen, setViewVendorDialogOpen] = useState(false);
  const [createPODialogOpen, setCreatePODialogOpen] = useState(false);

  // Vendor data (now as state to allow adding new vendors)
  const [vendors, setVendors] = useState([
    {
      id: 'VEN-001',
      name: 'McKesson Corporation',
      category: 'Pharmaceutical Distributor',
      status: 'active',
      contact: {
        email: 'orders@mckesson.com',
        phone: '1-800-MCKESSON',
        address: '6555 State Hwy 161, Irving, TX 75039',
        contactPerson: 'Jennifer Walsh',
        website: 'www.mckesson.com'
      },
      financial: {
        totalSpent: '$125,450.00',
        outstandingBalance: '$15,230.00',
        creditLimit: '$50,000.00',
        paymentTerms: 'NET 30'
      },
      performance: {
        rating: 4.8,
        onTimeDelivery: 96,
        qualityScore: 98,
        responsiveness: 92
      },
      contractInfo: {
        contractNumber: 'MCK-2024-001',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        autoRenewal: true
      },
      lastOrder: '2024-01-15',
      products: ['Generic Medications', 'Brand Medications', 'OTC Products', 'Medical Supplies']
    },
    {
      id: 'VEN-002',
      name: 'AmerisourceBergen',
      category: 'Pharmaceutical Distributor',
      status: 'active',
      contact: {
        email: 'customerservice@amerisourcebergen.com',
        phone: '1-800-829-3132',
        address: '1300 Morris Dr, Chesterbrook, PA 19087',
        contactPerson: 'Robert Chen',
        website: 'www.amerisourcebergen.com'
      },
      financial: {
        totalSpent: '$89,320.00',
        outstandingBalance: '$8,450.00',
        creditLimit: '$40,000.00',
        paymentTerms: 'NET 30'
      },
      performance: {
        rating: 4.6,
        onTimeDelivery: 94,
        qualityScore: 96,
        responsiveness: 90
      },
      contractInfo: {
        contractNumber: 'ASB-2024-002',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        autoRenewal: true
      },
      lastOrder: '2024-01-14',
      products: ['Specialty Medications', 'Vaccines', 'Refrigerated Products']
    },
    {
      id: 'VEN-003',
      name: 'Local Medical Supply Co.',
      category: 'Medical Supplies',
      status: 'active',
      contact: {
        email: 'orders@localmedsupply.com',
        phone: '(555) 123-4567',
        address: '123 Healthcare Way, Local City, ST 12345',
        contactPerson: 'Sarah Martinez',
        website: 'www.localmedsupply.com'
      },
      financial: {
        totalSpent: '$12,850.00',
        outstandingBalance: '$2,100.00',
        creditLimit: '$10,000.00',
        paymentTerms: 'NET 15'
      },
      performance: {
        rating: 4.2,
        onTimeDelivery: 88,
        qualityScore: 94,
        responsiveness: 95
      },
      contractInfo: {
        contractNumber: 'LMS-2024-003',
        startDate: '2024-02-01',
        endDate: '2025-01-31',
        autoRenewal: false
      },
      lastOrder: '2024-01-12',
      products: ['Syringes', 'Vials', 'Pharmacy Bags', 'Labels']
    },
    {
      id: 'VEN-004',
      name: 'TechFlow Systems',
      category: 'Technology Services',
      status: 'pending',
      contact: {
        email: 'support@techflow.com',
        phone: '(555) 987-6543',
        address: '456 Tech Blvd, Innovation Park, CA 90210',
        contactPerson: 'David Kim',
        website: 'www.techflow.com'
      },
      financial: {
        totalSpent: '$5,500.00',
        outstandingBalance: '$0.00',
        creditLimit: '$15,000.00',
        paymentTerms: 'NET 30'
      },
      performance: {
        rating: 4.0,
        onTimeDelivery: 92,
        qualityScore: 90,
        responsiveness: 88
      },
      contractInfo: {
        contractNumber: 'TFS-2024-004',
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        autoRenewal: true
      },
      lastOrder: '2024-01-08',
      products: ['Software Licenses', 'Hardware Maintenance', 'IT Support']
    }
  ]);

  // Purchase orders data (now as state to allow adding new POs)
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 'PO-2024-001',
      vendorId: 'VEN-001',
      vendorName: 'McKesson Corporation',
      date: '2024-01-15',
      status: 'delivered',
      total: '$8,450.00',
      items: 15,
      expectedDelivery: '2024-01-16',
      actualDelivery: '2024-01-16',
      priority: 'normal'
    },
    {
      id: 'PO-2024-002',
      vendorId: 'VEN-002',
      vendorName: 'AmerisourceBergen',
      date: '2024-01-14',
      status: 'in-transit',
      total: '$6,230.00',
      items: 8,
      expectedDelivery: '2024-01-17',
      actualDelivery: null,
      priority: 'urgent'
    },
    {
      id: 'PO-2024-003',
      vendorId: 'VEN-003',
      vendorName: 'Local Medical Supply Co.',
      date: '2024-01-12',
      status: 'pending',
      total: '$850.00',
      items: 25,
      expectedDelivery: '2024-01-18',
      actualDelivery: null,
      priority: 'normal'
    },
    {
      id: 'PO-2024-004',
      vendorId: 'VEN-001',
      vendorName: 'McKesson Corporation',
      date: '2024-01-10',
      status: 'received',
      total: '$12,340.00',
      items: 22,
      expectedDelivery: '2024-01-12',
      actualDelivery: '2024-01-11',
      priority: 'high'
    }
  ]);

  const categories = ['all', 'Pharmaceutical Distributor', 'Medical Supplies', 'Technology Services', 'Equipment'];
  const statuses = ['all', 'active', 'pending', 'suspended', 'inactive'];
  const orderStatuses = ['all', 'pending', 'confirmed', 'in-transit', 'delivered', 'received', 'cancelled'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'suspended': return 'bg-red-50 text-red-700 border-red-200';
      case 'inactive': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 text-green-700';
      case 'in-transit': return 'bg-blue-50 text-blue-700';
      case 'received': return 'bg-purple-50 text-purple-700';
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'cancelled': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-50 text-red-700';
      case 'high': return 'bg-orange-50 text-orange-700';
      case 'normal': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddVendor = (newVendor: any) => {
    setVendors(prev => [...prev, newVendor]);
  };

  const handleCreatePO = (newPO: any) => {
    setPurchaseOrders(prev => [...prev, newPO]);
  };

  const handleViewPO = (order: any) => {
    setSelectedPO(order);
    setViewPODialogOpen(true);
  };

  const handleTrackPO = (order: any) => {
    setSelectedPO(order);
    setTrackPODialogOpen(true);
  };

  const handleViewVendorDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setViewVendorDialogOpen(true);
  };

  const handleCreatePOForVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setCreatePODialogOpen(true);
  };

  return (
    <Layout title="Vendor Management" subtitle="Manage suppliers, contracts, and purchase orders">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Building2 className="w-8 h-8 text-walgreens-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent (YTD)</p>
                  <p className="text-2xl font-bold text-green-600">$233k</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Orders</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">4.4</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Vendor Directory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Vendor Directory Tab */}
          <TabsContent value="vendors" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search vendors..."
                      className="pl-10 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-56">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AddVendorDialog onAddVendor={handleAddVendor} />
                </div>
              </CardContent>
            </Card>

            {/* Vendor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                          <p className="text-sm text-gray-600">{vendor.category}</p>
                          <p className="text-xs text-gray-500">{vendor.id}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(vendor.status)}>
                            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{vendor.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{vendor.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{vendor.contact.address}</span>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center space-x-1">
                            {getRatingStars(vendor.performance.rating)}
                            <span className="text-gray-600 ml-1">{vendor.performance.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">Overall Rating</p>
                        </div>
                        <div>
                          <p className="font-medium text-green-600">{vendor.performance.onTimeDelivery}%</p>
                          <p className="text-xs text-gray-500">On-Time Delivery</p>
                        </div>
                      </div>

                      {/* Financial Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{vendor.financial.totalSpent}</p>
                          <p className="text-xs text-gray-500">Total Spent</p>
                        </div>
                        <div>
                          <p className="font-medium text-orange-600">{vendor.financial.outstandingBalance}</p>
                          <p className="text-xs text-gray-500">Outstanding</p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="flex flex-wrap gap-1">
                        {vendor.products.slice(0, 3).map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                        {vendor.products.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{vendor.products.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewVendorDetails(vendor)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCreatePOForVendor(vendor)}>
                          <FileText className="w-4 h-4 mr-1" />
                          Create PO
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-walgreens-red" />
                    <span>Purchase Orders</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <CreatePODialog onCreatePO={handleCreatePO} vendors={vendors} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((order) => (
                    <Card key={order.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium text-gray-900">{order.id}</h4>
                              <Badge className={getOrderStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                              <Badge className={getPriorityColor(order.priority)}>
                                {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{order.vendorName}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Date: {order.date}</span>
                              <span>Items: {order.items}</span>
                              <span>Expected: {order.expectedDelivery}</span>
                              {order.actualDelivery && (
                                <span>Delivered: {order.actualDelivery}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-lg font-bold text-gray-900">{order.total}</p>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewPO(order)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleTrackPO(order)}>
                                <Truck className="w-4 h-4 mr-1" />
                                Track
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(vendor.performance.rating)}
                          <span className="text-gray-600 ml-1">{vendor.performance.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">On-Time Delivery</span>
                              <span className="text-sm font-medium">{vendor.performance.onTimeDelivery}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${vendor.performance.onTimeDelivery}%` }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">Quality Score</span>
                              <span className="text-sm font-medium">{vendor.performance.qualityScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${vendor.performance.qualityScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">Responsiveness</span>
                              <span className="text-sm font-medium">{vendor.performance.responsiveness}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${vendor.performance.responsiveness}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">Last Order</p>
                            <p className="text-sm font-medium">{vendor.lastOrder}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Total Orders</p>
                            <p className="font-medium">24</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Avg Order Value</p>
                            <p className="font-medium">$5,227</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* View Purchase Order Dialog */}
        <Dialog open={viewPODialogOpen} onOpenChange={setViewPODialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Purchase Order Details</DialogTitle>
              <DialogDescription>
                View complete purchase order information and order items
              </DialogDescription>
            </DialogHeader>
            {selectedPO && (
              <div className="space-y-6">
                {/* PO Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Order Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">PO Number:</span> {selectedPO.id}</p>
                      <p><span className="font-medium">Order Date:</span> {selectedPO.date}</p>
                      <p><span className="font-medium">Expected Delivery:</span> {selectedPO.expectedDelivery}</p>
                      {selectedPO.actualDelivery && (
                        <p><span className="font-medium">Actual Delivery:</span> {selectedPO.actualDelivery}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Vendor Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Vendor:</span> {selectedPO.vendorName}</p>
                      <p><span className="font-medium">Total Amount:</span> {selectedPO.total}</p>
                      <p><span className="font-medium">Items Count:</span> {selectedPO.items}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <Badge className={getOrderStatusColor(selectedPO.status)}>
                          {selectedPO.status.charAt(0).toUpperCase() + selectedPO.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Order Items */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Order Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Amoxicillin 500mg Capsules</td>
                          <td className="px-4 py-3 text-sm text-gray-600">100 bottles</td>
                          <td className="px-4 py-3 text-sm text-gray-600">$12.50</td>
                          <td className="px-4 py-3 text-sm text-gray-900">$1,250.00</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Lisinopril 10mg Tablets</td>
                          <td className="px-4 py-3 text-sm text-gray-600">50 bottles</td>
                          <td className="px-4 py-3 text-sm text-gray-600">$8.25</td>
                          <td className="px-4 py-3 text-sm text-gray-900">$412.50</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Metformin 500mg Tablets</td>
                          <td className="px-4 py-3 text-sm text-gray-600">75 bottles</td>
                          <td className="px-4 py-3 text-sm text-gray-600">$6.80</td>
                          <td className="px-4 py-3 text-sm text-gray-900">$510.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setViewPODialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "Download Started",
                      description: `Purchase Order ${selectedPO.id} is being downloaded.`
                    });
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Track Purchase Order Dialog */}
        <Dialog open={trackPODialogOpen} onOpenChange={setTrackPODialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Track Purchase Order</DialogTitle>
              <DialogDescription>
                Real-time tracking information for your purchase order
              </DialogDescription>
            </DialogHeader>
            {selectedPO && (
              <div className="space-y-6">
                {/* Tracking Header */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedPO.id}</h3>
                      <p className="text-sm text-gray-600">{selectedPO.vendorName}</p>
                    </div>
                    <Badge className={getOrderStatusColor(selectedPO.status)}>
                      {selectedPO.status.charAt(0).toUpperCase() + selectedPO.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Delivery Timeline</h3>
                  <div className="space-y-4">
                    {/* Order Placed */}
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Order Placed</p>
                        <p className="text-xs text-gray-500">{selectedPO.date} at 9:00 AM</p>
                        <p className="text-xs text-gray-600">Purchase order submitted to vendor</p>
                      </div>
                    </div>

                    {/* Order Confirmed */}
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedPO.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                        {selectedPO.status !== 'pending' ? (
                          <>
                            <p className="text-xs text-gray-500">{selectedPO.date} at 2:30 PM</p>
                            <p className="text-xs text-gray-600">Vendor confirmed order and began processing</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">Pending vendor confirmation</p>
                        )}
                      </div>
                    </div>

                    {/* In Transit */}
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedPO.status === 'in-transit' || selectedPO.status === 'delivered' || selectedPO.status === 'received'
                        ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">In Transit</p>
                        {(selectedPO.status === 'in-transit' || selectedPO.status === 'delivered' || selectedPO.status === 'received') ? (
                          <>
                            <p className="text-xs text-gray-500">Yesterday at 8:00 AM</p>
                            <p className="text-xs text-gray-600">Package picked up and en route to pharmacy</p>
                            <p className="text-xs text-blue-600 font-medium">Tracking #: TRK-{selectedPO.id.slice(-3)}789</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">Awaiting shipment</p>
                        )}
                      </div>
                    </div>

                    {/* Delivered */}
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedPO.status === 'delivered' || selectedPO.status === 'received' ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                        {(selectedPO.status === 'delivered' || selectedPO.status === 'received') ? (
                          <>
                            <p className="text-xs text-gray-500">{selectedPO.actualDelivery || selectedPO.expectedDelivery} at 10:30 AM</p>
                            <p className="text-xs text-gray-600">Package delivered to pharmacy loading dock</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">Expected: {selectedPO.expectedDelivery}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {selectedPO.status === 'in-transit' && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Out for Delivery</p>
                        <p className="text-xs text-blue-700">Estimated arrival: {selectedPO.expectedDelivery} between 9:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setTrackPODialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Vendor Contacted",
                      description: `Message sent to ${selectedPO.vendorName} regarding order status.`
                    });
                  }}>
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Vendor
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Vendor Details Dialog */}
        <Dialog open={viewVendorDialogOpen} onOpenChange={setViewVendorDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Vendor Details</DialogTitle>
              <DialogDescription>
                Complete vendor information and performance metrics
              </DialogDescription>
            </DialogHeader>
            {selectedVendor && (
              <div className="space-y-6">
                {/* Vendor Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Company Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedVendor.name}</p>
                      <p><span className="font-medium">Category:</span> {selectedVendor.category}</p>
                      <p><span className="font-medium">ID:</span> {selectedVendor.id}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <Badge className={getStatusColor(selectedVendor.status)}>
                          {selectedVendor.status.charAt(0).toUpperCase() + selectedVendor.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Contact Person:</span> {selectedVendor.contact.contactPerson}</p>
                      <p><span className="font-medium">Email:</span> {selectedVendor.contact.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedVendor.contact.phone}</p>
                      <p><span className="font-medium">Website:</span> {selectedVendor.contact.website}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Overall Rating</span>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(selectedVendor.performance.rating)}
                          <span className="text-sm font-medium ml-1">{selectedVendor.performance.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">On-Time Delivery</span>
                        <span className="text-sm font-medium text-green-600">{selectedVendor.performance.onTimeDelivery}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Quality Score</span>
                        <span className="text-sm font-medium text-blue-600">{selectedVendor.performance.qualityScore}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Responsiveness</span>
                        <span className="text-sm font-medium text-purple-600">{selectedVendor.performance.responsiveness}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Spent</span>
                        <span className="text-sm font-medium text-gray-900">{selectedVendor.financial.totalSpent}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Outstanding Balance</span>
                        <span className="text-sm font-medium text-orange-600">{selectedVendor.financial.outstandingBalance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Credit Limit</span>
                        <span className="text-sm font-medium text-gray-900">{selectedVendor.financial.creditLimit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Terms</span>
                        <span className="text-sm font-medium text-gray-900">{selectedVendor.financial.paymentTerms}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contract Information */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Contract Number:</span>
                        <span className="ml-2 text-gray-600">{selectedVendor.contractInfo.contractNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Start Date:</span>
                        <span className="ml-2 text-gray-600">{selectedVendor.contractInfo.startDate}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">End Date:</span>
                        <span className="ml-2 text-gray-600">{selectedVendor.contractInfo.endDate}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Auto Renewal:</span>
                        <span className="ml-2 text-gray-600">{selectedVendor.contractInfo.autoRenewal ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Products/Services */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Products & Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedVendor.products.map((product: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setViewVendorDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setViewVendorDialogOpen(false);
                    handleCreatePOForVendor(selectedVendor);
                  }}>
                    <FileText className="w-4 h-4 mr-2" />
                    Create Purchase Order
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "Contact Initiated",
                      description: `Contacting ${selectedVendor.contact.contactPerson} at ${selectedVendor.name}.`
                    });
                  }}>
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Vendor
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create PO for Specific Vendor Dialog */}
        <CreatePODialog
          open={createPODialogOpen}
          onOpenChange={setCreatePODialogOpen}
          hideStandardTrigger={true}
          onCreatePO={(po) => {
            handleCreatePO(po);
            setCreatePODialogOpen(false);
          }}
          vendors={vendors}
          preSelectedVendor={selectedVendor?.name}
        />
      </div>
    </Layout>
  );
};

export default VendorManagement;