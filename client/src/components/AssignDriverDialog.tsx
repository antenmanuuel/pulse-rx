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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Truck, MapPin, Clock, AlertCircle, Users, Route } from 'lucide-react';

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
    { id: 'DRV001', name: 'Mike Johnson', status: 'Available', currentDeliveries: 2, rating: 4.8, zone: 'North' },
    { id: 'DRV002', name: 'Sarah Wilson', status: 'Available', currentDeliveries: 1, rating: 4.9, zone: 'South' },
    { id: 'DRV003', name: 'David Brown', status: 'On Route', currentDeliveries: 4, rating: 4.7, zone: 'East' },
    { id: 'DRV004', name: 'Lisa Garcia', status: 'Available', currentDeliveries: 0, rating: 5.0, zone: 'West' }
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

  const selectedDriver = availableDrivers.find(d => d.id === assignmentData.driverId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md">
          <Users className="w-4 h-4 mr-2" />
          Assign Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
        <DialogHeader className="bg-gradient-to-r from-walgreens-blue to-blue-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="flex items-center text-xl">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Truck className="w-6 h-6 text-white" />
            </div>
            Assign Driver - {delivery.patient}
          </DialogTitle>
        </DialogHeader>

        {/* Delivery Summary */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
            <CardTitle className="flex items-center text-green-800">
              <MapPin className="w-5 h-5 mr-2" />
              Delivery Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">Delivery ID:</span>
                <p className="font-mono text-blue-900 font-medium">{delivery.id}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-sm font-semibold text-purple-700">Priority:</span>
                <Badge className={`ml-2 ${delivery.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                  {delivery.priority === 'Urgent' ? '🚨' : '📋'} {delivery.priority}
                </Badge>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <span className="text-sm font-semibold text-orange-700">Estimated Time:</span>
                <p className="font-medium text-orange-900">{delivery.estimatedTime}</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-semibold text-gray-700 block mb-2">Delivery Address:</span>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-walgreens-red mt-1" />
                <p className="font-medium text-gray-900">{delivery.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Driver Selection */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <CardTitle className="flex items-center text-blue-800">
                <User className="w-5 h-5 mr-2" />
                Select Driver
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      onClick={() => setAssignmentData({ ...assignmentData, driverId: driver.id })}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${assignmentData.driverId === driver.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${driver.status === 'Available'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            } border`}>
                            {driver.status === 'Available' ? '✅' : '🚛'} {driver.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Route className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700">
                            <span className="font-medium">{driver.currentDeliveries}</span> deliveries
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-700">
                            <span className="font-medium">{driver.rating}</span> rating
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">
                            <span className="font-medium">{driver.zone}</span> Zone
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-700">
                            <span className="font-medium">
                              {driver.status === 'Available' ? 'Ready' : 'Busy'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedDriver && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Selected: {selectedDriver.name}</h4>
                        <p className="text-sm text-blue-700">
                          {selectedDriver.zone} Zone • {selectedDriver.currentDeliveries} active deliveries • ⭐ {selectedDriver.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assignment Details */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
              <CardTitle className="flex items-center text-purple-800">
                <Clock className="w-5 h-5 mr-2" />
                Assignment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">Delivery Priority</Label>
                  <Select onValueChange={(value) => setAssignmentData({ ...assignmentData, priority: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-200">
                      <SelectValue placeholder="Normal Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">📋 Low Priority</SelectItem>
                      <SelectItem value="normal">📝 Normal Priority</SelectItem>
                      <SelectItem value="high">⚡ High Priority</SelectItem>
                      <SelectItem value="urgent">🚨 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime" className="text-sm font-semibold text-gray-700">Estimated Delivery Time</Label>
                  <Select onValueChange={(value) => setAssignmentData({ ...assignmentData, estimatedDeliveryTime: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-200">
                      <SelectValue placeholder="Select time window" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">⚡ Within 30 minutes</SelectItem>
                      <SelectItem value="1hour">🕐 Within 1 hour</SelectItem>
                      <SelectItem value="2hours">🕑 Within 2 hours</SelectItem>
                      <SelectItem value="4hours">🕓 Within 4 hours</SelectItem>
                      <SelectItem value="today">🌅 By end of day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
              <CardTitle className="flex items-center text-orange-800">
                <AlertCircle className="w-5 h-5 mr-2" />
                Special Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-sm font-semibold text-gray-700">Instructions for Driver</Label>
                <Textarea
                  id="instructions"
                  value={assignmentData.specialInstructions}
                  onChange={(e) => setAssignmentData({ ...assignmentData, specialInstructions: e.target.value })}
                  placeholder="Any special delivery instructions, building access codes, or patient-specific notes for the driver"
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              disabled={!assignmentData.driverId}
            >
              <User className="w-4 h-4 mr-2" />
              Assign Driver
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
