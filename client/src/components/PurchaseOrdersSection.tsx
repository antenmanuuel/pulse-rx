import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { PurchaseOrder } from '@/data/purchaseOrderData';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import PaginationControls from '@/components/ui/pagination-controls';

interface PurchaseOrdersSectionProps {
  poSearchTerm: string;
  setPoSearchTerm: (term: string) => void;
  poFilterStatus: string;
  setPoFilterStatus: (status: string) => void;
  poFilterPriority: string;
  setPoFilterPriority: (priority: string) => void;
  currentPOs: PurchaseOrder[];
  filteredPOs: PurchaseOrder[];
  handleViewPODetails: (po: PurchaseOrder) => void;
  handleSort: (field: string) => void;
  getSortIcon: (field: string) => React.ReactNode;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
  CreatePODialog: React.ReactNode;
  currentPOPage: number;
  totalPOPages: number;
  handlePOPageChange: (page: number) => void;
  posPerPage: number;
  handlePOsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  indexOfFirstPO: number;
  indexOfLastPO: number;
}

const PurchaseOrdersSection: React.FC<PurchaseOrdersSectionProps> = ({
  poSearchTerm,
  setPoSearchTerm,
  poFilterStatus,
  setPoFilterStatus,
  poFilterPriority,
  setPoFilterPriority,
  currentPOs,
  filteredPOs,
  handleViewPODetails,
  handleSort,
  getSortIcon,
  formatCurrency,
  getStatusColor,
  CreatePODialog,
  currentPOPage,
  totalPOPages,
  handlePOPageChange,
  posPerPage,
  handlePOsPerPageChange,
  indexOfFirstPO,
  indexOfLastPO
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
            {CreatePODialog}
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
        CreatePODialog={CreatePODialog}
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
    </div>
  );
};

export default PurchaseOrdersSection;