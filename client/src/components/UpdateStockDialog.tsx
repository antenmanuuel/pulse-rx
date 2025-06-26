import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar
} from 'lucide-react';

interface UpdateStockDialogProps {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStock: (itemNdc: string, newQuantity: number, reason: string) => void;
}

const UpdateStockDialog = ({ item, open, onOpenChange, onUpdateStock }: UpdateStockDialogProps) => {
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'set' | 'add' | 'subtract'>('set');
  const [adjustmentAmount, setAdjustmentAmount] = useState('');

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity?.toString() || '0');
      setReason('');
      setAdjustmentType('set');
      setAdjustmentAmount('');
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item && reason) {
      let finalQuantity = parseInt(quantity);

      if (adjustmentType === 'add') {
        finalQuantity = item.quantity + parseInt(adjustmentAmount || '0');
      } else if (adjustmentType === 'subtract') {
        finalQuantity = Math.max(0, item.quantity - parseInt(adjustmentAmount || '0'));
      }

      onUpdateStock(item.ndc, finalQuantity, reason);
      onOpenChange(false);
    }
  };

  const handleAdjustmentTypeChange = (type: 'set' | 'add' | 'subtract') => {
    setAdjustmentType(type);
    if (type === 'set') {
      setQuantity(item?.quantity?.toString() || '0');
    } else {
      setAdjustmentAmount('');
    }
  };

  const getNewQuantity = () => {
    if (!item) return 0;

    if (adjustmentType === 'set') {
      return parseInt(quantity) || 0;
    } else if (adjustmentType === 'add') {
      return item.quantity + (parseInt(adjustmentAmount) || 0);
    } else if (adjustmentType === 'subtract') {
      return Math.max(0, item.quantity - (parseInt(adjustmentAmount) || 0));
    }
    return item.quantity;
  };

  const getNewStatus = (newQty: number) => {
    if (!item) return 'Unknown';
    if (newQty === 0) return 'Out of Stock';
    if (newQty <= item.minStock) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!item) return null;

  const newQuantity = getNewQuantity();
  const newStatus = getNewStatus(newQuantity);
  const quantityDiff = newQuantity - item.quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Update Stock
              </DialogTitle>
              <p className="text-gray-600">{item.name} - {item.brand}</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Item Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-walgreens-blue" />
                Current Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium">Current Stock</p>
                  <p className="text-2xl font-bold text-blue-900">{item.quantity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Min Stock</p>
                  <p className="text-lg font-semibold text-gray-900">{item.minStock}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Location</p>
                  <p className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Expiry</p>
                  <p className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.expiry}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Current Status:</span>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stock Adjustment */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-walgreens-red" />
                Stock Adjustment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Adjustment Type Selection */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={adjustmentType === 'set' ? 'default' : 'outline'}
                  onClick={() => handleAdjustmentTypeChange('set')}
                  className={adjustmentType === 'set' ? 'bg-walgreens-blue text-white' : 'border-gray-300'}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Set Total
                </Button>
                <Button
                  type="button"
                  variant={adjustmentType === 'add' ? 'default' : 'outline'}
                  onClick={() => handleAdjustmentTypeChange('add')}
                  className={adjustmentType === 'add' ? 'bg-green-600 text-white' : 'border-gray-300'}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Stock
                </Button>
                <Button
                  type="button"
                  variant={adjustmentType === 'subtract' ? 'default' : 'outline'}
                  onClick={() => handleAdjustmentTypeChange('subtract')}
                  className={adjustmentType === 'subtract' ? 'bg-red-600 text-white' : 'border-gray-300'}
                >
                  <Minus className="w-4 h-4 mr-1" />
                  Remove Stock
                </Button>
              </div>

              {/* Quantity Input */}
              <div className="space-y-2">
                <Label htmlFor="quantity-input" className="text-sm font-medium text-gray-700">
                  {adjustmentType === 'set' ? 'New Total Quantity' :
                    adjustmentType === 'add' ? 'Quantity to Add' : 'Quantity to Remove'}
                </Label>
                {adjustmentType === 'set' ? (
                  <Input
                    id="quantity-input"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter new total quantity"
                    className="text-lg font-semibold focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                ) : (
                  <Input
                    id="quantity-input"
                    type="number"
                    min="0"
                    value={adjustmentAmount}
                    onChange={(e) => setAdjustmentAmount(e.target.value)}
                    placeholder={`Enter quantity to ${adjustmentType}`}
                    className="text-lg font-semibold focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                )}
              </div>

              {/* Reason Selection */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason for Update *
                </Label>
                <Select value={reason} onValueChange={setReason} required>
                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                    <SelectValue placeholder="Select reason for stock update" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received_shipment">📦 Received Shipment</SelectItem>
                    <SelectItem value="dispensed">💊 Dispensed to Patient</SelectItem>
                    <SelectItem value="damaged">⚠️ Damaged/Expired</SelectItem>
                    <SelectItem value="returned">↩️ Returned by Patient</SelectItem>
                    <SelectItem value="cycle_count">📊 Cycle Count Adjustment</SelectItem>
                    <SelectItem value="transfer_in">📥 Transfer In</SelectItem>
                    <SelectItem value="transfer_out">📤 Transfer Out</SelectItem>
                    <SelectItem value="theft_loss">�� Theft/Loss</SelectItem>
                    <SelectItem value="other">📝 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview Changes */}
          {(adjustmentType !== 'set' && adjustmentAmount) || (adjustmentType === 'set' && quantity) ? (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Preview Changes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Current</p>
                    <p className="text-2xl font-bold text-blue-900">{item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-blue-700">
                      {quantityDiff > 0 ? (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-semibold">+{quantityDiff}</span>
                        </>
                      ) : quantityDiff < 0 ? (
                        <>
                          <TrendingDown className="w-5 h-5" />
                          <span className="font-semibold">{quantityDiff}</span>
                        </>
                      ) : (
                        <span className="font-semibold">No Change</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">New</p>
                    <p className="text-2xl font-bold text-blue-900">{newQuantity}</p>
                  </div>
                </div>

                <Separator className="bg-blue-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">New Status:</span>
                  <Badge className={getStatusColor(newStatus)}>
                    {newStatus}
                  </Badge>
                </div>

                {newQuantity <= item.minStock && (
                  <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-orange-800 font-medium">
                      {newQuantity === 0 ? 'Item will be out of stock' : 'Item will be below minimum stock level'}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

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
              disabled={!reason || (!quantity && !adjustmentAmount)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStockDialog;
