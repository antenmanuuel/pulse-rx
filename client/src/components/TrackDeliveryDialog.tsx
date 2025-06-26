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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, Clock, User, Package, Phone, CheckCircle, Circle, Navigation } from 'lucide-react';

interface TrackDeliveryDialogProps {
  delivery: any;
}

export default function TrackDeliveryDialog({ delivery }: TrackDeliveryDialogProps) {
  const trackingSteps = [
    {
      status: 'Order Received',
      time: '10:30 AM',
      completed: true,
      description: 'Prescription order received and verified',
      icon: CheckCircle
    },
    {
      status: 'Preparing',
      time: '11:15 AM',
      completed: true,
      description: 'Medications being prepared and packaged',
      icon: Package
    },
    {
      status: 'Out for Delivery',
      time: '1:45 PM',
      completed: delivery.status === 'Out for Delivery' || delivery.status === 'Delivered',
      description: 'Package is on route to delivery address',
      icon: Truck
    },
    {
      status: 'Delivered',
      time: delivery.status === 'Delivered' ? '2:15 PM' : 'Pending',
      completed: delivery.status === 'Delivered',
      description: 'Package successfully delivered to patient',
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
          <Navigation className="w-4 h-4 mr-2" />
          Track Delivery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
        <DialogHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="flex items-center text-xl">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Truck className="w-6 h-6 text-white" />
            </div>
            Track Delivery - {delivery.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Delivery Overview */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <CardTitle className="flex items-center text-blue-800">
                <Package className="w-5 h-5 mr-2" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Patient:</span>
                      <p className="font-medium text-gray-900">{delivery.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Driver:</span>
                      <p className="font-medium text-gray-900">{delivery.driver}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Estimated Delivery:</span>
                      <p className="font-medium text-gray-900">{delivery.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Status:</span>
                      <Badge className={`ml-2 border font-medium ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Progress Tracking */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
              <CardTitle className="flex items-center text-purple-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                Delivery Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {trackingSteps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="relative flex items-start space-x-4">
                        {/* Step Icon */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${step.completed
                            ? 'bg-green-500 border-green-500'
                            : 'bg-white border-gray-300'
                          }`}>
                          <IconComponent className={`w-6 h-6 ${step.completed ? 'text-white' : 'text-gray-400'
                            }`} />
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className={`bg-gradient-to-r p-4 rounded-lg ${step.completed
                              ? 'from-green-50 to-green-100 border border-green-200'
                              : 'from-gray-50 to-gray-100 border border-gray-200'
                            }`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold ${step.completed ? 'text-green-800' : 'text-gray-500'
                                }`}>
                                {step.status}
                              </h4>
                              <span className={`text-sm font-medium ${step.completed ? 'text-green-600' : 'text-gray-400'
                                }`}>
                                {step.time}
                              </span>
                            </div>
                            <p className={`text-sm ${step.completed ? 'text-green-700' : 'text-gray-500'
                              }`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
              <CardTitle className="flex items-center text-orange-800">
                <MapPin className="w-5 h-5 mr-2" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-walgreens-red mt-1" />
                  <p className="font-medium text-gray-900">{delivery.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg">
              <CardTitle className="flex items-center text-red-800">
                <Package className="w-5 h-5 mr-2" />
                Package Contents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {delivery.medications.map((med: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                    <div className="w-3 h-3 bg-walgreens-red rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900">{med}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 shadow-md"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Driver
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
