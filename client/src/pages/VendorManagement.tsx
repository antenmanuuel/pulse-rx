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
  ShoppingCart
} from 'lucide-react';
import { Vendor, vendorData } from '@/data/vendorData';

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Initialize vendors from the imported data
  const [vendors, setVendors] = useState<Vendor[]>(vendorData);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);

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
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterCategory, filterStatus, vendors]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVendors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
    console.log('Purchase Order created:', poData);
    toast({
      title: "Purchase Order Created",
      description: `PO ${poData.id} has been created successfully.`
    });
    setCreatePODialogOpen(false);
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
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {(vendors.reduce((sum, v) => sum + v.performance.rating, 0) / vendors.length).toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500 fill-current" />
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
              {currentItems.map((vendor) => (
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
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredVendors.length)} of {filteredVendors.length}
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
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No purchase orders yet</h3>
                  <p className="text-gray-600 mb-6">Create your first purchase order to get started</p>
                  <CreatePODialog 
                    onCreatePO={handlePOSubmit} 
                    vendors={vendors.filter(v => v.status === 'active')}
                  />
                </div>
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
      </div>
    </Layout>
  );
};

export default VendorManagement;