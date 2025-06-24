
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Package } from 'lucide-react';

interface NewDeliveryDialogProps {
  onSubmit: (delivery: any) => void;
}

export default function NewDeliveryDialog({ onSubmit }: NewDeliveryDialogProps) {
  const [delivery, setDelivery] = useState({
    patientName: '',
    phone: '',
    address: '',
    medications: [''],
    priority: 'standard',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    temperatureControlled: false
  });

  const handleAddMedication = () => {
    setDelivery({ ...delivery, medications: [...delivery.medications, ''] });
  };

  const handleRemoveMedication = (index: number) => {
    const newMeds = delivery.medications.filter((_, i) => i !== index);
    setDelivery({ ...delivery, medications: newMeds });
  };

  const handleMedicationChange = (index: number, value: string) => {
    const newMeds = [...delivery.medications];
    newMeds[index] = value;
    setDelivery({ ...delivery, medications: newMeds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredMedications = delivery.medications.filter(med => med.trim() !== '');
    onSubmit({ ...delivery, medications: filteredMedications });
    setDelivery({
      patientName: '',
      phone: '',
      address: '',
      medications: [''],
      priority: 'standard',
      deliveryDate: '',
      deliveryTime: '',
      specialInstructions: '',
      temperatureControlled: false
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
          <Plus className="w-4 h-4 mr-2" />
          New Delivery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-walgreens-red" />
            Schedule New Delivery
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={delivery.patientName}
                onChange={(e) => setDelivery({ ...delivery, patientName: e.target.value })}
                placeholder="Enter patient name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={delivery.phone}
                onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              value={delivery.address}
              onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
              placeholder="Enter complete delivery address"
              rows={2}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Medications</Label>
            {delivery.medications.map((medication, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={medication}
                  onChange={(e) => handleMedicationChange(index, e.target.value)}
                  placeholder="Enter medication name and quantity"
                  className="flex-1"
                />
                {delivery.medications.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveMedication(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddMedication}
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => setDelivery({ ...delivery, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={delivery.deliveryDate}
                onChange={(e) => setDelivery({ ...delivery, deliveryDate: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Preferred Time</Label>
              <Select onValueChange={(value) => setDelivery({ ...delivery, deliveryTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                  <SelectItem value="anytime">Any time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={delivery.specialInstructions}
              onChange={(e) => setDelivery({ ...delivery, specialInstructions: e.target.value })}
              placeholder="Any special delivery instructions (e.g., gate code, preferred entrance, etc.)"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              Schedule Delivery
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
