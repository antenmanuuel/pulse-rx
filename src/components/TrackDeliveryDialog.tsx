
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, User, Package } from 'lucide-react';

interface TrackDeliveryDialogProps {
  delivery: any;
}

export default function TrackDeliveryDialog({ delivery }: TrackDeliveryDialogProps) {
  const trackingSteps = [
    { status: 'Order Received', time: '10:30 AM', completed: true },
    { status: 'Preparing', time: '11:15 AM', completed: true },
    { status: 'Out for Delivery', time: '1:45 PM', completed: delivery.status === 'Out for Delivery' || delivery.status === 'Delivered' },
    { status: 'Delivered', time: delivery.status === 'Delivered' ? '2:15 PM' : 'Pending', completed: delivery.status === 'Delivered' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          Track Delivery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2 text-green-600" />
            Track Delivery - {delivery.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Patient:</strong> {delivery.patient}
              </div>
              <div>
                <strong>Driver:</strong> {delivery.driver}
              </div>
              <div>
                <strong>Estimated Delivery:</strong> {delivery.estimatedTime}
              </div>
              <div className="flex items-center">
                <strong>Status:</strong>
                <Badge className={`ml-2 ${delivery.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {delivery.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Delivery Progress
            </h3>
            <div className="space-y-3">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                    {step.completed && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${step.completed ? 'text-green-800' : 'text-gray-500'}`}>
                      {step.status}
                    </div>
                    <div className="text-sm text-gray-600">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Delivery Address
            </h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              {delivery.address}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Medications
            </h3>
            <ul className="space-y-1 text-sm">
              {delivery.medications.map((med: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-walgreens-blue rounded-full mr-2"></span>
                  {med}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Contact Driver
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
