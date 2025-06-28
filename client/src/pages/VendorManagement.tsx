import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import PaginationControls from '@/components/ui/pagination-controls';
import AddVendorDialog from '@/components/AddVendorDialog';
import CreatePODialog from '@/components/CreatePODialog';
import PurchaseOrderDetailsDialog from '@/components/PurchaseOrderDetailsDialog';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Star,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  Calendar,
  ArrowUpDown,
  Download,
  Truck,
  BarChart3,
  User
} from 'lucide-react';
import { Vendor, vendorData } from '@/data/vendorData';
import { PurchaseOrder, purchaseOrderData } from '@/data/purchaseOrderData';

const VendorManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [createPODialogOpen, setCreatePODialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [viewPODialogOpen, setViewPODialogOpen] = useState(false);

  // Vendor data
  const [vendors, setVendors] = useState<Vendor[]>(vendorData);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  
  // Purchase Order data
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(purchaseOrderData);
  const [filteredPOs, setFilteredPOs] = useState<PurchaseOrder[]>(purchaseOrders);
  const [poFilterStatus, setPoFilterStatus] = useState('all');
  const [poFilterPriority, setPoFilterPriority] = useState('all');
  const [poSearchTerm, setPoSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('createdDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination state for vendors
  const [currentVendorPage, setCurrentVendorPage] = useState(1);
  const [vendorsPerPage, setVendorsPerPage] = useState(6);

  // Pagination state for purchase orders
  const [currentPOPage, setCurrentPOPage] = useState(1);
  const [posPerPage, setPosPerPage] = useState(5);

  // Filter vendors based on search term and filters
  useEffect(() => {
    const filtered = vendors.filter(vendor => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contact.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    setFilteredVendors(filtered);
    setCurrentVendorPage(1); // Reset to first page when filtering
  }, [searchTerm, filterCategory, filterStatus, vendors]);

  // Filter purchase orders based on search term and filters
  useEffect(() => {
    let filtered = [...purchaseOrders];
    
    // Apply search filter
    if (poSearchTerm) {
      filtered = filtered.filter(po => 
        po.id.toLowerCase().includes(poSearchTerm.toLowerCase()) ||
        po.vendor.toLowerCase().includes(poSearchTerm.toLowerCase()) ||
        po.requestedBy.toLowerCase().includes(poSearchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (poFilterStatus !== 'all') {
      filtered = filtered.filter(po => po.status.toLowerCase() === poFilterStatus.toLowerCase());
    }
    
    // Apply priority filter
    if (poFilterPriority !== 'all') {
      filtered = filtered.filter(po => po.priority.toLowerCase() === poFilterPriority.toLowerCase());
    }
    
    // Apply sorting
    filtered = filtered.sort((a, b) => {
      let aValue, bValue;
      
      // Handle different field types
      if (sortField === 'createdDate' || sortField === 'deliveryDate') {
        aValue = new Date(a[sortField]).getTime();
        bValue = new Date(b[sortField]).getTime();
      } else if (sortField === 'total') {
        aValue = a.financials.total;
        bValue = b.financials.total;
      } else {
        aValue = a[sortField as keyof PurchaseOrder];
        bValue = b[sortField as keyof PurchaseOrder];
      }
      
      // Sort based on direction
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredPOs(filtered);
    setCurrentPOPage(1); // Reset to first page when filtering
  }, [poSearchTerm, poFilterStatus, poFilterPriority, purchaseOrders, sortField, sortDirection]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Pagination logic for vendors
  const indexOfLastVendor = currentVendorPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalVendorPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  // Pagination logic for purchase orders
  const indexOfLastPO = currentPOPage * posPerPage;
  const indexOfFirstPO = indexOfLastPO - posPerPage;
  const currentPOs = filteredPOs.slice(indexOfFirstPO, indexOfLastPO);
  const totalPOPages = Math.ceil(filteredPOs.length / posPerPage);

  const handleVendorPageChange = (pageNumber: number) => {
    setCurrentVendorPage(pageNumber);
  };

  const handlePOPageChange = (pageNumber: number) => {
    setCurrentPOPage(pageNumber);
  };

  const handleVendorsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendorsPerPage(Number(e.target.value));
    setCurrentVendorPage(1); // Reset to first page when changing items per page
  };

  const handlePOsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosPerPage(Number(e.target.value));
    setCurrentPOPage(1); // Reset to first page when changing items per page
  };

  const handleAddVendor = (newVendor: Vendor) => {
    setVendors([...vendors, newVendor]);
    toast({
      title: "Vendor Added",
      description: `${newVendor.name} has been added successfully.`
    });
  };

  const handleViewVendorDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setViewDetailsDialogOpen(true);
  };

  const handleCreatePO = (poData: any) => {
    const newPO: PurchaseOrder = {
      ...poData,
      id: poData.id || `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      tracking: {
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    };
    
    setPurchaseOrders([newPO, ...purchaseOrders]);
    toast({
      title: "Purchase Order Created",
      description: `PO ${newPO.id} has been created successfully.`
    });
  };

  const handleViewPODetails = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setViewPODialogOpen(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new field, default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ArrowUpDown className="w-4 h-4 rotate-180" /> 
      : <ArrowUpDown className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Layout title="Vendor Management" subtitle="Manage suppliers, purchase orders, and vendor relationships">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-walgreens-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-green-600">{vendors.filter(v => v.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending POs</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {purchaseOrders.filter(po => po.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spend (YTD)</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(purchaseOrders.reduce((sum, po) => sum + po.financials.total, 0))}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Vendors
            </TabsTrigger>
            <TabsTrigger value="purchase-orders" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Purchase Orders
            </TabsTrigger>
          </TabsList>

          {/* Vendors Tab */}
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
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Cleaning Supplies">Cleaning Supplies</SelectItem>
                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                      <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                      <SelectItem value="Waste Management">Waste Management</SelectItem>
                      <SelectItem value="Packaging">Packaging</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <AddVendorDialog onAddVendor={handleAddVendor} />
                </div>
              </CardContent>
            </Card>

            {/* Vendor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentVendors.map((vendor) => (
                <Card key={vendor.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
                              <Badge className={getStatusColor(vendor.status)}>
                                {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{vendor.category}</p>
                            <p className="text-xs text-gray-500">{vendor.id}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium text-gray-900">{vendor.performance.rating}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{vendor.contact.contactPerson}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{vendor.contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{vendor.contact.email}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{vendor.address.city}, {vendor.address.state}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">Terms: {vendor.business.paymentTerms}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">On-time: {vendor.performance.onTimeDelivery}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewVendorDetails(vendor)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedVendor(vendor);
                            setCreatePODialogOpen(true);
                          }}>
                            <FileText className="w-4 h-4 mr-1" />
                            Create PO
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls for Vendors */}
            {filteredVendors.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={vendorsPerPage} 
                    onChange={handleVendorsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentVendorPage}
                  totalPages={totalVendorPages}
                  onPageChange={handleVendorPageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstVendor + 1}-{Math.min(indexOfLastVendor, filteredVendors.length)} of {filteredVendors.length}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="purchase-orders" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={poSearchTerm}
                      onChange={(e) => setPoSearchTerm(e.target.value)}
                      placeholder="Search purchase orders..."
                      className="pl-10 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <Select value={poFilterStatus} onValueChange={setPoFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={poFilterPriority} onValueChange={setPoFilterPriority}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <CreatePODialog 
                    onCreatePO={handleCreatePO} 
                    vendors={vendors.filter(v => v.status === 'active')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Purchase Orders Table */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-walgreens-red" />
                  <span>Purchase Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-700">
                          <button 
                            className="flex items-center space-x-1 hover:text-walgreens-red"
                            onClick={() => handleSort('id')}
                          >
                            <span>PO Number</span>
                            {getSortIcon('id')}
                          </button>
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">
                          <button 
                            className="flex items-center space-x-1 hover:text-walgreens-red"
                            onClick={() => handleSort('vendor')}
                          >
                            <span>Vendor</span>
                            {getSortIcon('vendor')}
                          </button>
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">
                          <button 
                            className="flex items-center space-x-1 hover:text-walgreens-red"
                            onClick={() => handleSort('createdDate')}
                          >
                            <span>Created Date</span>
                            {getSortIcon('createdDate')}
                          </button>
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">
                          <button 
                            className="flex items-center space-x-1 hover:text-walgreens-red"
                            onClick={() => handleSort('deliveryDate')}
                          >
                            <span>Delivery Date</span>
                            {getSortIcon('deliveryDate')}
                          </button>
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">Status</th>
                        <th className="text-right p-3 font-medium text-gray-700">
                          <button 
                            className="flex items-center space-x-1 hover:text-walgreens-red ml-auto"
                            onClick={() => handleSort('total')}
                          >
                            <span>Total</span>
                            {getSortIcon('total')}
                          </button>
                        </th>
                        <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPOs.map((po) => (
                        <tr key={po.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-medium text-gray-900">{po.id}</td>
                          <td className="p-3 text-gray-800">{po.vendor}</td>
                          <td className="p-3 text-gray-800">{new Date(po.createdDate).toLocaleDateString()}</td>
                          <td className="p-3 text-gray-800">{new Date(po.deliveryDate).toLocaleDateString()}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(po.status)}>
                              {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-medium text-gray-900">
                            {formatCurrency(po.financials.total)}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewPODetails(po)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  // Download functionality would go here
                                  toast({
                                    title: "Download Started",
                                    description: `Purchase order ${po.id} is being downloaded.`
                                  });
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty State */}
                {filteredPOs.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No purchase orders found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or create a new purchase order</p>
                    <CreatePODialog 
                      onCreatePO={handleCreatePO} 
                      vendors={vendors.filter(v => v.status === 'active')}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination Controls for Purchase Orders */}
            {filteredPOs.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={posPerPage} 
                    onChange={handlePOsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPOPage}
                  totalPages={totalPOPages}
                  onPageChange={handlePOPageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstPO + 1}-{Math.min(indexOfLastPO, filteredPOs.length)} of {filteredPOs.length}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* View Vendor Details Dialog */}
        <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Vendor Details</DialogTitle>
            </DialogHeader>
            {selectedVendor && (
              <div className="space-y-6">
                {/* Header with Basic Info */}
                <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedVendor.name}
                    </h3>
                    <p className="text-lg text-gray-600">{selectedVendor.category}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge className={getStatusColor(selectedVendor.status)}>
                        {selectedVendor.status.charAt(0).toUpperCase() + selectedVendor.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500">ID: {selectedVendor.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold text-gray-900">
                        {selectedVendor.performance.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Vendor Rating</p>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Contact Person</p>
                          <p className="font-medium">{selectedVendor.contact.contactPerson}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedVendor.contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedVendor.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">
                            {selectedVendor.address.street}, {selectedVendor.address.city}, {selectedVendor.address.state} {selectedVendor.address.zipCode}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Information */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Tax ID</p>
                          <p className="font-medium">{selectedVendor.business.taxId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Payment Terms</p>
                          <p className="font-medium">{selectedVendor.business.paymentTerms}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Credit Limit</p>
                          <p className="font-medium">{formatCurrency(selectedVendor.business.creditLimit)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Rating</p>
                        <p className="text-2xl font-bold text-blue-900">{selectedVendor.performance.rating}/5</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">On-Time Delivery</p>
                        <p className="text-2xl font-bold text-green-900">{selectedVendor.performance.onTimeDelivery}%</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium">Total Orders</p>
                        <p className="text-2xl font-bold text-purple-900">{selectedVendor.performance.totalOrders}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-600 font-medium">Total Spent</p>
                        <p className="text-2xl font-bold text-orange-900">{formatCurrency(selectedVendor.performance.totalSpent)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedVendor.notes && (
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-800">{selectedVendor.notes}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setViewDetailsDialogOpen(false);
                      setSelectedVendor(selectedVendor);
                      setCreatePODialogOpen(true);
                    }} 
                    className="bg-walgreens-red hover:bg-red-600"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Create Purchase Order
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create PO Dialog */}
        <CreatePODialog 
          open={createPODialogOpen}
          onOpenChange={setCreatePODialogOpen}
          onCreatePO={handleCreatePO}
          vendors={vendors.filter(v => v.status === 'active')}
          preSelectedVendor={selectedVendor?.name}
          hideStandardTrigger={true}
        />

        {/* View Purchase Order Details Dialog */}
        <PurchaseOrderDetailsDialog
          purchaseOrder={selectedPO}
          open={viewPODialogOpen}
          onOpenChange={setViewPODialogOpen}
        />
      </div>
    </Layout>
  );
};

export default VendorManagement;