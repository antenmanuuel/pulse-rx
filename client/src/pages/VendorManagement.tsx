import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { Vendor, vendorData } from '@/data/vendorData';
import { PurchaseOrder, purchaseOrderData } from '@/data/purchaseOrderData';

// Import components
import VendorSection from '@/components/VendorSection';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import VendorDetailsDialog from '@/components/VendorDetailsDialog';
import CreatePODialog from '@/components/CreatePODialog';
import PurchaseOrderDetailsDialog from '@/components/PurchaseOrderDetailsDialog';

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

  const handleCreatePOFromVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCreatePODialogOpen(true);
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
            <VendorSection
              vendors={vendors}
              filteredVendors={filteredVendors}
              currentVendors={currentVendors}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              handleAddVendor={handleAddVendor}
              handleViewVendorDetails={handleViewVendorDetails}
              handleCreatePO={handleCreatePOFromVendor}
              currentVendorPage={currentVendorPage}
              totalVendorPages={totalVendorPages}
              handleVendorPageChange={handleVendorPageChange}
              vendorsPerPage={vendorsPerPage}
              handleVendorsPerPageChange={handleVendorsPerPageChange}
              indexOfFirstVendor={indexOfFirstVendor}
              indexOfLastVendor={indexOfLastVendor}
              getStatusColor={getStatusColor}
            />
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
            <PurchaseOrderTable
              currentPOs={currentPOs}
              filteredPOs={filteredPOs}
              handleViewPODetails={handleViewPODetails}
              handleSort={handleSort}
              getSortIcon={getSortIcon}
              formatCurrency={formatCurrency}
              getStatusColor={getStatusColor}
              CreatePODialog={
                <CreatePODialog 
                  onCreatePO={handleCreatePO} 
                  vendors={vendors.filter(v => v.status === 'active')}
                />
              }
            />

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
        <VendorDetailsDialog
          vendor={selectedVendor}
          open={viewDetailsDialogOpen}
          onOpenChange={setViewDetailsDialogOpen}
          onCreatePO={handleCreatePOFromVendor}
          formatCurrency={formatCurrency}
          getStatusColor={getStatusColor}
        />

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