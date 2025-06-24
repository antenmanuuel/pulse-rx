
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Truck } from 'lucide-react';

interface AssignDriverDialogProps {
  delivery: any;
  onAssignDriver: (data: any) => void;
}

export default function AssignDriverDialog({ delivery, onAssignDriver }: AssignDriverDialogProps) {
  const [assignmentData, setAssignmentData] = useState({
    driverId: '',
    priority: 'normal',
    specialInstructions: '',
    estimatedDeliveryTime: ''
  });

  const availableDrivers = [
    { id: 'DRV001', name: 'Mike Johnson', status: 'Available', currentDeliveries: 2 },
    { id: 'DRV002', name: 'Sarah Wilson', status: 'Available', currentDeliveries: 1 },
    { id: 'DRV003', name: 'David Brown', status: 'On Route', currentDeliveries: 4 },
    { id: 'DRV004', name: 'Lisa Garcia', status: 'Available', currentDeliveries: 0 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDriver = availableDrivers.find(d => d.id === assignmentData.driverId);
    onAssignDriver({ 
      ...assignmentData, 
      deliveryId: delivery.id,
      driverName: selectedDriver?.name 
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
          Assign Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2 text-walgreens-blue" />
            Assign Driver - {delivery.patient}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-sm">
            <div><strong>Delivery ID:</strong> {delivery.id}</div>
            <div><strong>Address:</strong> {delivery.address}</div>
            <div><strong>Priority:</strong> {delivery.priority}</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driver">Select Driver</Label>
            <Select onValueChange={(value) => setAssignmentData({ ...assignmentData, driverId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose available driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{driver.name}</span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={`px-2 py-1 rounded ${driver.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {driver.status}
                        </span>
                        <span className="text-gray-500">({driver.currentDeliveries} deliveries)</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Delivery Priority</Label>
            <Select onValueChange={(value) => setAssignmentData({ ...assignmentData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Normal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="normal">Normal Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Delivery Time</Label>
            <Select onValueChange={(value) => setAssignmentData({ ...assignmentData, estimatedDeliveryTime: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select time window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">Within 30 minutes</SelectItem>
                <SelectItem value="1hour">Within 1 hour</SelectItem>
                <SelectItem value="2hours">Within 2 hours</SelectItem>
                <SelectItem value="4hours">Within 4 hours</SelectItem>
                <SelectItem value="today">By end of day</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={assignmentData.specialInstructions}
              onChange={(e) => setAssignmentData({ ...assignmentData, specialInstructions: e.target.value })}
              placeholder="Any special delivery instructions for the driver"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              <User className="w-4 h-4 mr-2" />
              Assign Driver
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
