import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import PaginationControls from '@/components/ui/pagination-controls';
import AddVendorDialog from '@/components/AddVendorDialog';
import CreatePODialog from '@/components/CreatePODialog';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  Search,
  Star,
  TrendingUp,
  DollarSign,
  Package,
  Phone,
  Mail,
  Globe,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Filter,
  MoreHorizontal,
  ShoppingCart,
  Calendar,
  ArrowUpDown,
  ArrowDown,
  ArrowUp
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Vendor>>({});
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [viewPODialogOpen, setViewPODialogOpen] = useState(false);

  // Pagination state for vendors
  const [currentVendorPage, setCurrentVendorPage] = useState(1);
  const [vendorsPerPage, setVendorsPerPage] = useState(6);

  // Pagination state for purchase orders
  const [currentPOPage, setCurrentPOPage] = useState(1);
  const [POsPerPage, setPoPerPage] = useState(5);
  
  // PO filtering and sorting
  const [poSearchTerm, setPoSearchTerm] = useState('');
  const [poFilterStatus, setPoFilterStatus] = useState('all');
  const [poFilterPriority, setPoFilterPriority] = useState('all');
  const [poSortField, setPoSortField] = useState('createdDate');
  const [poSortDirection, setPoSortDirection] = useState<'asc' | 'desc'>('desc');

  // Initialize vendors from the imported data
  const [vendors, setVendors] = useState<Vendor[]>(vendorData);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  
  // Initialize purchase orders from the imported data
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(purchaseOrderData);
  const [filteredPOs, setFilteredPOs] = useState<PurchaseOrder[]>(purchaseOrders);

  // Filter vendors based on search term and filters
  useEffect(() => {
    const filtered = vendors.filter(vendor => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contact.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    setFilteredVendors(filtered);
    setCurrentVendorPage(1); // Reset to first page when filtering
  }, [searchTerm, filterCategory, filterStatus, vendors]);

  // Filter and sort purchase orders
  useEffect(() => {
    let filtered = purchaseOrders.filter(po => {
      const matchesSearch = 
        po.id.toLowerCase().includes(poSearchTerm.toLowerCase()) ||
        po.vendor.toLowerCase().includes(poSearchTerm.toLowerCase()) ||
        po.requestedBy.toLowerCase().includes(poSearchTerm.toLowerCase()) ||
        po.department.toLowerCase().includes(poSearchTerm.toLowerCase());
      
      const matchesStatus = poFilterStatus === 'all' || po.status === poFilterStatus;
      const matchesPriority = poFilterPriority === 'all' || po.priority === poFilterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
    
    // Sort the filtered POs
    filtered = filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (poSortField) {
        case 'createdDate':
          comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
          break;
        case 'deliveryDate':
          comparison = new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
          break;
        case 'vendor':
          comparison = a.vendor.localeCompare(b.vendor);
          break;
        case 'total':
          comparison = a.financials.total - b.financials.total;
          break;
        default:
          comparison = 0;
      }
      
      return poSortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredPOs(filtered);
    setCurrentPOPage(1); // Reset to first page when filtering or sorting
  }, [poSearchTerm, poFilterStatus, poFilterPriority, poSortField, poSortDirection, purchaseOrders]);

  // Pagination logic for vendors
  const indexOfLastVendor = currentVendorPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalVendorPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  // Pagination logic for purchase orders
  const indexOfLastPO = currentPOPage * POsPerPage;
  const indexOfFirstPO = indexOfLastPO - POsPerPage;
  const currentPOs = filteredPOs.slice(indexOfFirstPO, indexOfLastPO);
  const totalPOPages = Math.ceil(filteredPOs.length / POsPerPage);

  const handleVendorPageChange = (pageNumber: number) => {
    setCurrentVendorPage(pageNumber);
  };

  const handleVendorsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendorsPerPage(Number(e.target.value));
    setCurrentVendorPage(1); // Reset to first page when changing items per page
  };

  const handlePOPageChange = (pageNumber: number) => {
    setCurrentPOPage(pageNumber);
  };

  const handlePOsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPoPerPage(Number(e.target.value));
    setCurrentPOPage(1); // Reset to first page when changing items per page
  };

  const handleSortChange = (field: string) => {
    if (poSortField === field) {
      // Toggle direction if clicking the same field
      setPoSortDirection(poSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setPoSortField(field);
      setPoSortDirection('desc');
    }
  };

  const categories = [
    'all',
    'Pharmaceuticals',
    'Medical Supplies',
    'Equipment',
    'Technology',
    'Cleaning Supplies',
    'Office Supplies',
    'Food & Beverages',
    'Packaging',
    'Maintenance',
    'Waste Management',
    'Security Services',
    'Other'
  ];

  const statuses = ['all', 'active', 'inactive', 'pending'];
  const poStatuses = ['all', 'pending', 'approved', 'received', 'cancelled'];
  const poPriorities = ['all', 'low', 'normal', 'high', 'urgent'];

  const getStatusColor = (status: string) => {
    switch (status) {
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
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddVendor = (newVendor: Vendor) => {
    setVendors([...vendors, newVendor]);
    toast({
      title: "Vendor Added",
      description: `${newVendor.name} has been added successfully.`
    });
  };

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setViewDetailsDialogOpen(true);
  };

  const handleCreatePO = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCreatePODialogOpen(true);
  };

  const handlePOSubmit = (poData: any) => {
    // Create a new purchase order
    const newPO: PurchaseOrder = {
      ...poData,
      tracking: {
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    };
    
    setPurchaseOrders([newPO, ...purchaseOrders]);
    
    toast({
      title: "Purchase Order Created",
      description: `PO ${poData.id} has been created successfully.`
    });
    setCreatePODialogOpen(false);
  };

  const handleViewPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setViewPODialogOpen(true);
  };

  const handleStartEdit = () => {
    if (selectedVendor) {
      setEditForm({ ...selectedVendor });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedVendor && editForm) {
      const updatedVendors = vendors.map(vendor =>
        vendor.id === selectedVendor.id ? { ...vendor, ...editForm } as Vendor : vendor
      );
      setVendors(updatedVendors);
      setSelectedVendor({ ...selectedVendor, ...editForm } as Vendor);
      setIsEditMode(false);
      setEditForm({});

      toast({
        title: "Vendor Updated",
        description: `${selectedVendor.name} has been updated successfully.`
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditForm(prev => {
      const newForm = { ...prev };
      
      // Handle nested fields
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newForm[parent as keyof typeof newForm] = {
          ...newForm[parent as keyof typeof newForm],
          [child]: value
        };
      } else {
        newForm[field as keyof typeof newForm] = value;
      }
      
      return newForm;
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${vendors.reduce((sum, v) => sum + v.performance.totalSpent, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {purchaseOrders.filter(po => po.status === 'pending').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Vendor Directory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
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
                      <SelectValue placeholder="Category" />
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
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
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
              {currentVendors.map((vendor) => (
                <Card key={vendor.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-walgreens-blue text-white text-lg">
                          {vendor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
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
                            <span className="text-gray-600">{vendor.address.city}, {vendor.address.state}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className={`font-medium ${getRatingColor(vendor.performance.rating)}`}>
                              Rating: {vendor.performance.rating}/5
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(vendor)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleCreatePO(vendor)}>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Create PO
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
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
                    <CreatePODialog 
                      onCreatePO={handlePOSubmit} 
                      vendors={vendors.filter(v => v.status === 'active')}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters for POs */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
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
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {poStatuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={poFilterPriority} onValueChange={setPoFilterPriority}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {poPriorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {filteredPOs.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No purchase orders found</h3>
                    <p className="text-gray-600 mb-6">
                      {poSearchTerm || poFilterStatus !== 'all' || poFilterPriority !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'Create your first purchase order to get started'}
                    </p>
                    {!poSearchTerm && poFilterStatus === 'all' && poFilterPriority === 'all' && (
                      <CreatePODialog 
                        onCreatePO={handlePOSubmit} 
                        vendors={vendors.filter(v => v.status === 'active')}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    {/* Purchase Orders Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                              <button 
                                className="flex items-center space-x-1 hover:text-walgreens-red"
                                onClick={() => handleSortChange('id')}
                              >
                                <span>PO Number</span>
                                {poSortField === 'id' && (
                                  poSortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                              <button 
                                className="flex items-center space-x-1 hover:text-walgreens-red"
                                onClick={() => handleSortChange('vendor')}
                              >
                                <span>Vendor</span>
                                {poSortField === 'vendor' && (
                                  poSortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                              <button 
                                className="flex items-center space-x-1 hover:text-walgreens-red"
                                onClick={() => handleSortChange('createdDate')}
                              >
                                <span>Created</span>
                                {poSortField === 'createdDate' && (
                                  poSortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                              <button 
                                className="flex items-center space-x-1 hover:text-walgreens-red"
                                onClick={() => handleSortChange('deliveryDate')}
                              >
                                <span>Delivery</span>
                                {poSortField === 'deliveryDate' && (
                                  poSortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Priority</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                              <button 
                                className="flex items-center space-x-1 hover:text-walgreens-red ml-auto"
                                onClick={() => handleSortChange('total')}
                              >
                                <span>Total</span>
                                {poSortField === 'total' && (
                                  poSortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPOs.map((po) => (
                            <tr key={po.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">{po.id}</td>
                              <td className="px-4 py-4 text-sm text-gray-700">{po.vendor}</td>
                              <td className="px-4 py-4 text-sm text-gray-700">{formatDate(po.createdDate)}</td>
                              <td className="px-4 py-4 text-sm text-gray-700">{formatDate(po.deliveryDate)}</td>
                              <td className="px-4 py-4">
                                <Badge className={getStatusColor(po.status)}>
                                  {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-4 py-4">
                                <Badge className={getPriorityColor(po.priority)}>
                                  {po.priority.charAt(0).toUpperCase() + po.priority.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                                {formatCurrency(po.financials.total)}
                              </td>
                              <td className="px-4 py-4 text-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewPO(po)}
                                  className="hover:bg-gray-100"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls for POs */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Items per page:</span>
                        <select 
                          value={POsPerPage} 
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
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Vendor Details Dialog */}
        <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedVendor && (
              <>
                <DialogHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          {selectedVendor.name}
                        </DialogTitle>
                        <p className="text-gray-600 mt-1">{selectedVendor.category} • {selectedVendor.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(selectedVendor.status)}>
                        {selectedVendor.status.charAt(0).toUpperCase() + selectedVendor.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Action Buttons */}
                  <div className="flex justify-end items-center">
                    <div className="flex space-x-2">
                      {!isEditMode ? (
                        <>
                          <Button
                            onClick={handleStartEdit}
                            className="bg-walgreens-blue hover:bg-blue-700 text-white"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setViewDetailsDialogOpen(false);
                              handleCreatePO(selectedVendor);
                            }}
                            className="bg-walgreens-red hover:bg-red-700 text-white"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Create PO
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleSaveEdit}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Contact Person</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.contact?.contactPerson || ''}
                            onChange={(e) => handleEditFormChange('contact.contactPerson', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.contact.contactPerson}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        {isEditMode ? (
                          <Input
                            type="email"
                            value={editForm.contact?.email || ''}
                            onChange={(e) => handleEditFormChange('contact.email', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.contact.email}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Phone</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.contact?.phone || ''}
                            onChange={(e) => handleEditFormChange('contact.phone', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.contact.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Website</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.contact?.website || ''}
                            onChange={(e) => handleEditFormChange('contact.website', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.contact.website}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-600" />
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Street Address</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.address?.street || ''}
                            onChange={(e) => handleEditFormChange('address.street', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.address.street}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">City</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.address?.city || ''}
                            onChange={(e) => handleEditFormChange('address.city', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.address.city}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">State</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.address?.state || ''}
                            onChange={(e) => handleEditFormChange('address.state', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.address.state}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">ZIP Code</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.address?.zipCode || ''}
                            onChange={(e) => handleEditFormChange('address.zipCode', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.address.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Tax ID</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.business?.taxId || ''}
                            onChange={(e) => handleEditFormChange('business.taxId', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.business.taxId}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Payment Terms</Label>
                        {isEditMode ? (
                          <Input
                            value={editForm.business?.paymentTerms || ''}
                            onChange={(e) => handleEditFormChange('business.paymentTerms', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{selectedVendor.business.paymentTerms}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Credit Limit</Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            value={editForm.business?.creditLimit || ''}
                            onChange={(e) => handleEditFormChange('business.creditLimit', parseFloat(e.target.value))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">${selectedVendor.business.creditLimit.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-blue-900">Rating</Label>
                        <div className="flex items-center mt-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <p className="text-xl font-bold text-blue-700 ml-1">{selectedVendor.performance.rating}/5</p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-green-900">On-Time Delivery</Label>
                        <p className="text-xl font-bold text-green-700 mt-1">{selectedVendor.performance.onTimeDelivery}%</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-purple-900">Total Orders</Label>
                        <p className="text-xl font-bold text-purple-700 mt-1">{selectedVendor.performance.totalOrders}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-orange-900">Total Spent</Label>
                        <p className="text-xl font-bold text-orange-700 mt-1">${selectedVendor.performance.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-600" />
                      Notes
                    </h3>
                    {isEditMode ? (
                      <Textarea
                        value={editForm.notes || ''}
                        onChange={(e) => handleEditFormChange('notes', e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedVendor.notes}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Create PO Dialog */}
        <CreatePODialog
          open={createPODialogOpen}
          onOpenChange={setCreatePODialogOpen}
          onCreatePO={handlePOSubmit}
          vendors={vendors.filter(v => v.status === 'active')}
          preSelectedVendor={selectedVendor?.name}
          hideStandardTrigger={true}
        />

        {/* Purchase Order Details Dialog */}
        <Dialog open={viewPODialogOpen} onOpenChange={setViewPODialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedPO && (
              <>
                <DialogHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Purchase Order: {selectedPO.id}
                        </DialogTitle>
                        <p className="text-gray-600 mt-1">Vendor: {selectedPO.vendor}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(selectedPO.status)}>
                        {selectedPO.status.charAt(0).toUpperCase() + selectedPO.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(selectedPO.priority)}>
                        {selectedPO.priority.charAt(0).toUpperCase() + selectedPO.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Order Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                          Order Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Department</Label>
                            <p className="text-gray-900">{selectedPO.department}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Requested By</Label>
                            <p className="text-gray-900">{selectedPO.requestedBy}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Created Date</Label>
                            <p className="text-gray-900">{formatDate(selectedPO.createdDate)}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Delivery Date</Label>
                            <p className="text-gray-900">{formatDate(selectedPO.deliveryDate)}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Delivery Address</Label>
                          <p className="text-gray-900">{selectedPO.deliveryAddress}</p>
                        </div>
                        {selectedPO.notes && (
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Notes</Label>
                            <p className="text-gray-900 bg-gray-50 p-2 rounded-md">{selectedPO.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                          Financial Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Subtotal:</span>
                              <span className="font-medium">{formatCurrency(selectedPO.financials.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Tax:</span>
                              <span className="font-medium">{formatCurrency(selectedPO.financials.tax)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-green-700">{formatCurrency(selectedPO.financials.total)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Approval Information */}
                        <div className="mt-4">
                          <Label className="text-sm font-medium text-gray-700">Approval Status</Label>
                          {selectedPO.approvals.length > 0 ? (
                            <div className="mt-2 space-y-2">
                              {selectedPO.approvals.map((approval, index) => (
                                <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                                      <span className="font-medium text-blue-800">{approval.approver}</span>
                                    </div>
                                    <span className="text-sm text-blue-600">{formatDate(approval.date)}</span>
                                  </div>
                                  {approval.comments && (
                                    <p className="text-sm text-blue-700 mt-1">{approval.comments}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-center">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                              <span className="text-yellow-800">Pending approval</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Items */}
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Package className="w-5 h-5 mr-2 text-walgreens-blue" />
                        Order Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Quantity</th>
                              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Unit Price</th>
                              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPO.items.map((item, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(item.unitPrice)}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-50">
                              <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-700 text-right">Subtotal:</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(selectedPO.financials.subtotal)}</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-700 text-right">Tax:</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(selectedPO.financials.tax)}</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Total:</td>
                              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(selectedPO.financials.total)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tracking Information */}
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-600" />
                        Tracking Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">Created</Label>
                            <p className="text-gray-900">{new Date(selectedPO.tracking.created).toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                            <p className="text-gray-900">{new Date(selectedPO.tracking.lastUpdated).toLocaleString()}</p>
                          </div>
                          {selectedPO.tracking.receivedDate && (
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                              <Label className="text-sm font-medium text-green-700">Received</Label>
                              <p className="text-green-900">{new Date(selectedPO.tracking.receivedDate).toLocaleString()}</p>
                              {selectedPO.tracking.receivedBy && (
                                <p className="text-sm text-green-700 mt-1">By: {selectedPO.tracking.receivedBy}</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Status Timeline */}
                        <div className="mt-4">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Status Timeline</Label>
                          <div className="relative pl-6 border-l-2 border-gray-200 space-y-4">
                            <div className="relative">
                              <div className="absolute -left-[25px] w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <FileText className="w-3 h-3 text-white" />
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <div className="flex justify-between">
                                  <span className="font-medium text-blue-800">Created</span>
                                  <span className="text-sm text-blue-600">{formatDate(selectedPO.createdDate)}</span>
                                </div>
                                <p className="text-sm text-blue-700 mt-1">PO created by {selectedPO.requestedBy}</p>
                              </div>
                            </div>

                            {selectedPO.approvals.length > 0 && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-green-800">Approved</span>
                                    <span className="text-sm text-green-600">{formatDate(selectedPO.approvals[0].date)}</span>
                                  </div>
                                  <p className="text-sm text-green-700 mt-1">Approved by {selectedPO.approvals[0].approver}</p>
                                </div>
                              </div>
                            )}

                            {selectedPO.tracking.receivedDate && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                  <Package className="w-3 h-3 text-white" />
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-purple-800">Received</span>
                                    <span className="text-sm text-purple-600">{formatDate(selectedPO.tracking.receivedDate)}</span>
                                  </div>
                                  <p className="text-sm text-purple-700 mt-1">Received by {selectedPO.tracking.receivedBy}</p>
                                </div>
                              </div>
                            )}

                            {selectedPO.status === 'pending' && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                  <Clock className="w-3 h-3 text-white" />
                                </div>
                                <div className="bg-yellow-50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-yellow-800">Pending Approval</span>
                                    <span className="text-sm text-yellow-600">Current Status</span>
                                  </div>
                                  <p className="text-sm text-yellow-700 mt-1">Waiting for approval</p>
                                </div>
                              </div>
                            )}

                            {selectedPO.status === 'approved' && !selectedPO.tracking.receivedDate && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                  <Clock className="w-3 h-3 text-white" />
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-orange-800">Awaiting Delivery</span>
                                    <span className="text-sm text-orange-600">Current Status</span>
                                  </div>
                                  <p className="text-sm text-orange-700 mt-1">Expected delivery: {formatDate(selectedPO.deliveryDate)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setViewPODialogOpen(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Close
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default VendorManagement;