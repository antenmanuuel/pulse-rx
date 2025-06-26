import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Package,
  Truck,
  Calculator,
  Clock,
  AlertTriangle,
  CheckCircle,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';

interface ReorderDialogProps {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReorder: (orderData: any) => void;
}

const ReorderDialog = ({ item, open, onOpenChange, onReorder }: ReorderDialogProps) => {
  const [orderData, setOrderData] = useState({
    quantity: '',
    supplier: '',
    priority: 'normal',
    notes: ''
  });

  useEffect(() => {
    if (item) {
      const suggestedQty = Math.max(item.minStock * 2, 100);
      setOrderData({
        quantity: suggestedQty.toString(),
        supplier: '',
        priority: 'normal',
        notes: ''
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item && orderData.supplier) {
      onReorder({
        ...orderData,
        item: item,
        quantity: parseInt(orderData.quantity),
        orderDate: new Date().toISOString().split('T')[0],
        estimatedTotal: getEstimatedTotal(),
        estimatedDelivery: getEstimatedDelivery()
      });
      onOpenChange(false);
    }
  };

  const getEstimatedTotal = () => {
    const quantity = parseInt(orderData.quantity) || 0;
    const unitCost = parseFloat(item?.cost?.replace('$', '') || '0');
    return (quantity * unitCost).toFixed(2);
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    let daysToAdd = 7; // default

    switch (orderData.priority) {
      case 'urgent':
        daysToAdd = 2;
        break;
      case 'high':
        daysToAdd = 4;
        break;
      case 'normal':
        daysToAdd = 7;
        break;
      case 'low':
        daysToAdd = 14;
        break;
    }

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);
    return deliveryDate.toLocaleDateString();
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

  const getSupplierInfo = (supplierValue: string) => {
    const suppliers = {
      'cardinal': {
        name: 'Cardinal Health',
        rating: '4.8/5',
        deliveryTime: '2-3 business days',
        discount: '5% bulk discount',
        contact: '1-800-234-5678'
      },
      'mckesson': {
        name: 'McKesson Corporation',
        rating: '4.7/5',
        deliveryTime: '1-2 business days',
        discount: '3% volume discount',
        contact: '1-800-MCKESSON'
      },
      'amerisource': {
        name: 'AmerisourceBergen',
        rating: '4.6/5',
        deliveryTime: '2-4 business days',
        discount: '4% preferred customer',
        contact: '1-800-829-3132'
      },
      'direct': {
        name: 'Direct from Manufacturer',
        rating: '4.9/5',
        deliveryTime: '5-7 business days',
        discount: '10% direct pricing',
        contact: 'Varies by manufacturer'
      },
      'other': {
        name: 'Other Supplier',
        rating: 'N/A',
        deliveryTime: 'To be confirmed',
        discount: 'To be negotiated',
        contact: 'Contact supplier directly'
      }
    };
    return suppliers[supplierValue as keyof typeof suppliers] || suppliers.other;
  };

  if (!item) return null;

  const suggestedQuantity = Math.max(item.minStock * 2, 100);
  const supplierInfo = orderData.supplier ? getSupplierInfo(orderData.supplier) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Reorder Medication
              </DialogTitle>
              <p className="text-gray-600">{item.name} - {item.brand}</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Item Status */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-walgreens-blue" />
                Current Inventory Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <p className="text-xs text-red-600 font-medium">Current Stock</p>
                  <p className="text-2xl font-bold text-red-900">{item.quantity}</p>
                  <p className="text-xs text-red-600">
                    {item.quantity <= item.minStock ? '⚠️ Below minimum' : '✅ Above minimum'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Min Stock</p>
                  <p className="text-lg font-semibold text-gray-900">{item.minStock}</p>
                  <p className="text-xs text-gray-500">Required level</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium">Suggested Order</p>
                  <p className="text-lg font-semibold text-blue-900">{suggestedQuantity}</p>
                  <p className="text-xs text-blue-600">2x minimum stock</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 font-medium">Last Unit Cost</p>
                  <p className="text-lg font-semibold text-green-900">{item.cost}</p>
                  <p className="text-xs text-green-600">Per unit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-walgreens-blue" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Order Quantity *
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={orderData.quantity}
                    onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                    placeholder={suggestedQuantity.toString()}
                    className="text-lg font-semibold focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Recommended: {suggestedQuantity} units
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                    Order Priority *
                  </Label>
                  <Select value={orderData.priority} onValueChange={(value) => setOrderData({ ...orderData, priority: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>🚨 Urgent (1-2 days)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>⚡ High (3-5 days)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="normal">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>📦 Normal (7-10 days)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span>📅 Low (2+ weeks)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-sm font-medium text-gray-700">
                  Preferred Supplier *
                </Label>
                <Select value={orderData.supplier} onValueChange={(value) => setOrderData({ ...orderData, supplier: value })} required>
                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardinal">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Cardinal Health</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mckesson">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>McKesson Corporation</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="amerisource">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>AmerisourceBergen</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="direct">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Direct from Manufacturer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Other Supplier</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Order Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={orderData.notes}
                  onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                  placeholder="Special instructions, delivery preferences, contact information..."
                  rows={3}
                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Supplier Information */}
          {supplierInfo && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Supplier Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{supplierInfo.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium text-yellow-600">⭐ {supplierInfo.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium text-blue-600">{supplierInfo.contact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Delivery & Pricing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium text-green-600 flex items-center">
                          <Truck className="w-3 h-3 mr-1" />
                          {supplierInfo.deliveryTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-medium text-green-600">{supplierInfo.discount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          {orderData.quantity && orderData.supplier && (
            <Card className="border border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-green-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calculator className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Order Total</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-900">${getEstimatedTotal()}</p>
                    <p className="text-xs text-green-600">
                      {orderData.quantity} units × {item.cost}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Estimated Delivery</h4>
                    </div>
                    <p className="text-lg font-semibold text-green-900">{getEstimatedDelivery()}</p>
                    <Badge className={getPriorityColor(orderData.priority)}>
                      {orderData.priority.charAt(0).toUpperCase() + orderData.priority.slice(1)} Priority
                    </Badge>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Stock After Delivery</h4>
                    </div>
                    <p className="text-lg font-semibold text-green-900">
                      {item.quantity + parseInt(orderData.quantity)} units
                    </p>
                    <p className="text-xs text-green-600">
                      {((item.quantity + parseInt(orderData.quantity)) / item.minStock).toFixed(1)}x minimum stock
                    </p>
                  </div>
                </div>

                {parseInt(orderData.quantity) < suggestedQuantity && (
                  <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-orange-800 font-medium">
                      Order quantity is below suggested amount. Consider ordering {suggestedQuantity} units for optimal stock levels.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!orderData.supplier || !orderData.quantity}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Place Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReorderDialog;
