
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UpdateStockDialogProps {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStock: (itemNdc: string, newQuantity: number, reason: string) => void;
}

const UpdateStockDialog = ({ item, open, onOpenChange, onUpdateStock }: UpdateStockDialogProps) => {
  const [quantity, setQuantity] = useState(item?.quantity?.toString() || '0');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onUpdateStock(item.ndc, parseInt(quantity), reason);
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Stock - {item.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Current Stock: <span className="font-semibold">{item.quantity}</span></p>
            <p className="text-sm text-gray-600">Location: <span className="font-semibold">{item.location}</span></p>
            <p className="text-sm text-gray-600">Min Stock: <span className="font-semibold">{item.minStock}</span></p>
          </div>
          
          <div>
            <Label htmlFor="quantity">New Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter new quantity"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="reason">Reason for Update</Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="received_shipment">Received Shipment</SelectItem>
                <SelectItem value="dispensed">Dispensed to Patient</SelectItem>
                <SelectItem value="damaged">Damaged/Expired</SelectItem>
                <SelectItem value="returned">Returned by Patient</SelectItem>
                <SelectItem value="cycle_count">Cycle Count Adjustment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-red hover:bg-walgreens-red-dark">
              Update Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStockDialog;
