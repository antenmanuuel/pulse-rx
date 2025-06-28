import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  User,
  Package,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Truck,
  ShoppingCart,
  Download,
  Printer
} from 'lucide-react';
import { PurchaseOrder } from '@/data/purchaseOrderData';

interface PurchaseOrderDetailsDialogProps {
  purchaseOrder: PurchaseOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseOrderDetailsDialog = ({
  purchaseOrder,
  open,
  onOpenChange
}: PurchaseOrderDetailsDialogProps) => {
  if (!purchaseOrder) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  const getApprovalStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <ClockIcon className="w-4 h-4 text-yellow-600" />;
      default: return <ClockIcon className="w-4 h-4 text-gray-600" />;
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Purchase Order Details
              </DialogTitle>
              <p className="text-gray-600">PO Number: {purchaseOrder.id}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Vendor</h3>
                </div>
                <p className="text-gray-800 font-medium">{purchaseOrder.vendor}</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Order Date</h3>
                </div>
                <p className="text-gray-800 font-medium">{formatDate(purchaseOrder.createdDate)}</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Delivery Date</h3>
                </div>
                <p className="text-gray-800 font-medium">{formatDate(purchaseOrder.deliveryDate)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Status and Priority */}
          <div className="flex flex-wrap gap-4">
            <Badge className={getStatusColor(purchaseOrder.status)}>
              Status: {purchaseOrder.status.charAt(0).toUpperCase() + purchaseOrder.status.slice(1)}
            </Badge>
            <Badge className={getPriorityColor(purchaseOrder.priority)}>
              Priority: {purchaseOrder.priority.charAt(0).toUpperCase() + purchaseOrder.priority.slice(1)}
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
              Department: {purchaseOrder.department}
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
              Requested By: {purchaseOrder.requestedBy}
            </Badge>
          </div>

          {/* Order Items */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-walgreens-blue" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 font-medium text-gray-700">Description</th>
                      <th className="text-center p-3 font-medium text-gray-700">Quantity</th>
                      <th className="text-right p-3 font-medium text-gray-700">Unit Price</th>
                      <th className="text-right p-3 font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-3 text-gray-800">{item.description}</td>
                        <td className="p-3 text-center text-gray-800">{item.quantity}</td>
                        <td className="p-3 text-right text-gray-800">{formatCurrency(item.unitPrice)}</td>
                        <td className="p-3 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="p-3"></td>
                      <td className="p-3 text-right font-medium text-gray-700">Subtotal:</td>
                      <td className="p-3 text-right font-medium text-gray-900">{formatCurrency(purchaseOrder.financials.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="p-3"></td>
                      <td className="p-3 text-right font-medium text-gray-700">Tax:</td>
                      <td className="p-3 text-right font-medium text-gray-900">{formatCurrency(purchaseOrder.financials.tax)}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td colSpan={2} className="p-3"></td>
                      <td className="p-3 text-right font-bold text-gray-900">Total:</td>
                      <td className="p-3 text-right font-bold text-gray-900">{formatCurrency(purchaseOrder.financials.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          {purchaseOrder.deliveryAddress && (
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{purchaseOrder.deliveryAddress}</p>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {purchaseOrder.notes && (
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{purchaseOrder.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Approvals */}
          {purchaseOrder.approvals.length > 0 && (
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseOrder.approvals.map((approval, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getApprovalStatusIcon(approval.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{approval.approver}</p>
                          <Badge className={getStatusColor(approval.status)}>
                            {approval.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Date: {formatDate(approval.date)}</p>
                        {approval.comments && <p className="text-sm text-gray-700 mt-1">{approval.comments}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tracking Timeline */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-walgreens-blue" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="absolute top-8 left-4 w-0.5 h-12 bg-gray-200"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Order Created</p>
                    <p className="text-sm text-gray-600">
                      {new Date(purchaseOrder.tracking.created).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Purchase order created by {purchaseOrder.requestedBy}
                    </p>
                  </div>
                </div>

                {purchaseOrder.approvals.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      {purchaseOrder.tracking.receivedDate && (
                        <div className="absolute top-8 left-4 w-0.5 h-12 bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Order Approved</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(purchaseOrder.approvals[0].date)}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Approved by {purchaseOrder.approvals[0].approver}
                      </p>
                    </div>
                  </div>
                )}

                {purchaseOrder.tracking.receivedDate && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Order Received</p>
                      <p className="text-sm text-gray-600">
                        {new Date(purchaseOrder.tracking.receivedDate).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Received by {purchaseOrder.tracking.receivedBy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseOrderDetailsDialog;