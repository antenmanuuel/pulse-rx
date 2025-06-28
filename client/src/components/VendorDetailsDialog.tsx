import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  DollarSign,
  Star,
  FileText as FileTextIcon
} from 'lucide-react';
import { Vendor } from '@/data/vendorData';

interface VendorDetailsDialogProps {
  vendor: Vendor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePO: (vendor: Vendor) => void;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}

const VendorDetailsDialog = ({
  vendor,
  open,
  onOpenChange,
  onCreatePO,
  formatCurrency,
  getStatusColor
}: VendorDetailsDialogProps) => {
  if (!vendor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header with Basic Info */}
          <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {vendor.name}
              </h3>
              <p className="text-lg text-gray-600">{vendor.category}</p>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className={getStatusColor(vendor.status)}>
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">ID: {vendor.id}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold text-gray-900">
                  {vendor.performance.rating}
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
                    <p className="font-medium">{vendor.contact.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{vendor.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{vendor.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">
                      {vendor.address.street}, {vendor.address.city}, {vendor.address.state} {vendor.address.zipCode}
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
                    <p className="font-medium">{vendor.business.taxId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Terms</p>
                    <p className="font-medium">{vendor.business.paymentTerms}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="font-medium">{formatCurrency(vendor.business.creditLimit)}</p>
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
                  <p className="text-2xl font-bold text-blue-900">{vendor.performance.rating}/5</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">On-Time Delivery</p>
                  <p className="text-2xl font-bold text-green-900">{vendor.performance.onTimeDelivery}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-purple-900">{vendor.performance.totalOrders}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600 font-medium">Total Spent</p>
                  <p className="text-2xl font-bold text-orange-900">{formatCurrency(vendor.performance.totalSpent)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {vendor.notes && (
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{vendor.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                onOpenChange(false);
                onCreatePO(vendor);
              }} 
              className="bg-walgreens-red hover:bg-red-600"
            >
              <FileTextIcon className="w-4 h-4 mr-2" />
              Create Purchase Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorDetailsDialog;