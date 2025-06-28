import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PaginationControls from '@/components/ui/pagination-controls';
import AddVendorDialog from '@/components/AddVendorDialog';
import {
  Building2,
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  FileText
} from 'lucide-react';
import { Vendor } from '@/data/vendorData';

interface VendorSectionProps {
  vendors: Vendor[];
  filteredVendors: Vendor[];
  currentVendors: Vendor[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  handleAddVendor: (vendor: Vendor) => void;
  handleViewVendorDetails: (vendor: Vendor) => void;
  handleCreatePO: (vendor: Vendor) => void;
  currentVendorPage: number;
  totalVendorPages: number;
  handleVendorPageChange: (page: number) => void;
  vendorsPerPage: number;
  handleVendorsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  indexOfFirstVendor: number;
  indexOfLastVendor: number;
  getStatusColor: (status: string) => string;
}

const VendorSection: React.FC<VendorSectionProps> = ({
  vendors,
  filteredVendors,
  currentVendors,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterStatus,
  setFilterStatus,
  handleAddVendor,
  handleViewVendorDetails,
  handleCreatePO,
  currentVendorPage,
  totalVendorPages,
  handleVendorPageChange,
  vendorsPerPage,
  handleVendorsPerPageChange,
  indexOfFirstVendor,
  indexOfLastVendor,
  getStatusColor
}) => {
  return (
    <div className="space-y-6">
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
                    <Button variant="outline" size="sm" onClick={() => handleCreatePO(vendor)}>
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
    </div>
  );
};

export default VendorSection;