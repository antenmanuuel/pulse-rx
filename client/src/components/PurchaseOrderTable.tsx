import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';
import { PurchaseOrder } from '@/data/purchaseOrderData';
import { useToast } from '@/hooks/use-toast';

interface PurchaseOrderTableProps {
  currentPOs: PurchaseOrder[];
  filteredPOs: PurchaseOrder[];
  handleViewPODetails: (po: PurchaseOrder) => void;
  handleSort: (field: string) => void;
  getSortIcon: (field: string) => React.ReactNode;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
  CreatePODialog: React.ReactNode;
}

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
  currentPOs,
  filteredPOs,
  handleViewPODetails,
  handleSort,
  getSortIcon,
  formatCurrency,
  getStatusColor,
  CreatePODialog
}) => {
  const { toast } = useToast();

  return (
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
            {CreatePODialog}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderTable;