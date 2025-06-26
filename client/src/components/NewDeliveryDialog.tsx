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
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Package, User, MapPin, Calendar, Clock, AlertCircle, Pill } from 'lucide-react';

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
        <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Delivery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
        <DialogHeader className="bg-gradient-to-r from-walgreens-red to-red-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="flex items-center text-xl">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Package className="w-6 h-6 text-white" />
            </div>
            Schedule New Delivery
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <CardTitle className="flex items-center text-blue-800">
                <User className="w-5 h-5 mr-2" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-semibold text-gray-700">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={delivery.patientName}
                    onChange={(e) => setDelivery({ ...delivery, patientName: e.target.value })}
                    placeholder="Enter patient full name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    value={delivery.phone}
                    onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="flex items-center text-green-800">
                <MapPin className="w-5 h-5 mr-2" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Complete Address</Label>
                <Textarea
                  id="address"
                  value={delivery.address}
                  onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                  placeholder="Enter complete delivery address including apartment/unit number"
                  rows={3}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-200"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
              <CardTitle className="flex items-center text-purple-800">
                <Pill className="w-5 h-5 mr-2" />
                Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {delivery.medications.map((medication, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Input
                      value={medication}
                      onChange={(e) => handleMedicationChange(index, e.target.value)}
                      placeholder="Enter medication name, strength, and quantity"
                      className="flex-1 border-purple-200 focus:border-purple-500 focus:ring-purple-200"
                    />
                    {delivery.medications.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMedication(index)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
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
                  className="mt-3 border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Medication
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Details */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
              <CardTitle className="flex items-center text-orange-800">
                <Calendar className="w-5 h-5 mr-2" />
                Delivery Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">Priority</Label>
                  <Select onValueChange={(value) => setDelivery({ ...delivery, priority: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-200">
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">📋 Standard</SelectItem>
                      <SelectItem value="high">⚡ High Priority</SelectItem>
                      <SelectItem value="urgent">🚨 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate" className="text-sm font-semibold text-gray-700">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={delivery.deliveryDate}
                    onChange={(e) => setDelivery({ ...delivery, deliveryDate: e.target.value })}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime" className="text-sm font-semibold text-gray-700">Preferred Time</Label>
                  <Select onValueChange={(value) => setDelivery({ ...delivery, deliveryTime: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-200">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">🌅 Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">☀️ Afternoon (12 PM - 5 PM)</SelectItem>
                      <SelectItem value="evening">🌆 Evening (5 PM - 8 PM)</SelectItem>
                      <SelectItem value="anytime">🕐 Any time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-t-lg">
              <CardTitle className="flex items-center text-yellow-800">
                <AlertCircle className="w-5 h-5 mr-2" />
                Special Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-sm font-semibold text-gray-700">Delivery Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={delivery.specialInstructions}
                    onChange={(e) => setDelivery({ ...delivery, specialInstructions: e.target.value })}
                    placeholder="Any special delivery instructions (e.g., gate code, preferred entrance, building access, etc.)"
                    rows={3}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-200"
                  />
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Checkbox
                    id="temperatureControlled"
                    checked={delivery.temperatureControlled}
                    onCheckedChange={(checked) => setDelivery({ ...delivery, temperatureControlled: checked as boolean })}
                    className="border-blue-300"
                  />
                  <Label htmlFor="temperatureControlled" className="text-sm font-medium text-blue-800">
                    ❄️ Temperature-controlled medications included
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Delivery
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
