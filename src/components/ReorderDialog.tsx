
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onReorder({
        ...orderData,
        item: item,
        quantity: parseInt(orderData.quantity),
        orderDate: new Date().toISOString().split('T')[0]
      });
      setOrderData({
        quantity: '',
        supplier: '',
        priority: 'normal',
        notes: ''
      });
      onOpenChange(false);
    }
  };

  if (!item) return null;

  const suggestedQuantity = Math.max(item.minStock * 2, 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reorder - {item.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Current Stock: <span className="font-semibold">{item.quantity}</span></p>
            <p className="text-sm text-gray-600">Min Stock: <span className="font-semibold">{item.minStock}</span></p>
            <p className="text-sm text-gray-600">Suggested Quantity: <span className="font-semibold">{suggestedQuantity}</span></p>
            <p className="text-sm text-gray-600">Last Cost: <span className="font-semibold">{item.cost}</span></p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Order Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={orderData.quantity}
                onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                placeholder={suggestedQuantity.toString()}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={orderData.priority} onValueChange={(value) => setOrderData({ ...orderData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 days)</SelectItem>
                  <SelectItem value="high">High (3-5 days)</SelectItem>
                  <SelectItem value="normal">Normal (7-10 days)</SelectItem>
                  <SelectItem value="low">Low (2+ weeks)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="supplier">Preferred Supplier</Label>
            <Select value={orderData.supplier} onValueChange={(value) => setOrderData({ ...orderData, supplier: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardinal">Cardinal Health</SelectItem>
                <SelectItem value="mckesson">McKesson</SelectItem>
                <SelectItem value="amerisource">AmerisourceBergen</SelectItem>
                <SelectItem value="direct">Direct from Manufacturer</SelectItem>
                <SelectItem value="other">Other Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={orderData.notes}
              onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
              placeholder="Special instructions, delivery preferences, etc."
              rows={3}
            />
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              Estimated Total: ${orderData.quantity ? (parseInt(orderData.quantity) * parseFloat(item.cost.replace('$', ''))).toFixed(2) : '0.00'}
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-red hover:bg-walgreens-red-dark">
              Place Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReorderDialog;
