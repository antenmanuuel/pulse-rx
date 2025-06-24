
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, Check } from 'lucide-react';

interface MarkReadyDialogProps {
  delivery: any;
  onMarkReady: (data: any) => void;
}

export default function MarkReadyDialog({ delivery, onMarkReady }: MarkReadyDialogProps) {
  const [readyData, setReadyData] = useState({
    preparedBy: '',
    preparationTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    qualityCheck: false,
    packagingComplete: false,
    labelVerified: false,
    temperatureControlled: false,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMarkReady({ ...readyData, deliveryId: delivery.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-walgreens-red hover:bg-walgreens-red-dark">
          Mark Ready
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-walgreens-red" />
            Mark Ready for Delivery - {delivery.patient}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-sm">
            <div><strong>Delivery ID:</strong> {delivery.id}</div>
            <div><strong>Medications:</strong></div>
            <ul className="ml-4 mt-1">
              {delivery.medications.map((med: string, index: number) => (
                <li key={index}>• {med}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preparedBy">Prepared By</Label>
              <Input
                id="preparedBy"
                value={readyData.preparedBy}
                onChange={(e) => setReadyData({ ...readyData, preparedBy: e.target.value })}
                placeholder="Pharmacist name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preparationTime">Preparation Time</Label>
              <Input
                id="preparationTime"
                type="time"
                value={readyData.preparationTime}
                onChange={(e) => setReadyData({ ...readyData, preparationTime: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Quality Checklist</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="qualityCheck"
                checked={readyData.qualityCheck}
                onCheckedChange={(checked) => setReadyData({ ...readyData, qualityCheck: checked as boolean })}
              />
              <Label htmlFor="qualityCheck">Quality check completed</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="packagingComplete"
                checked={readyData.packagingComplete}
                onCheckedChange={(checked) => setReadyData({ ...readyData, packagingComplete: checked as boolean })}
              />
              <Label htmlFor="packagingComplete">Packaging complete and secure</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="labelVerified"
                checked={readyData.labelVerified}
                onCheckedChange={(checked) => setReadyData({ ...readyData, labelVerified: checked as boolean })}
              />
              <Label htmlFor="labelVerified">Labels verified for accuracy</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="temperatureControlled"
                checked={readyData.temperatureControlled}
                onCheckedChange={(checked) => setReadyData({ ...readyData, temperatureControlled: checked as boolean })}
              />
              <Label htmlFor="temperatureControlled">Temperature-controlled items properly handled</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Preparation Notes</Label>
            <Textarea
              id="notes"
              value={readyData.notes}
              onChange={(e) => setReadyData({ ...readyData, notes: e.target.value })}
              placeholder="Any special notes about the preparation"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-2" />
              Mark Ready for Delivery
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
