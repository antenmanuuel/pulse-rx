
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, Package, Phone } from 'lucide-react';

const DeliveriesPage = () => {
  const deliveries = [
    {
      id: 'DEL001',
      patient: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      phone: '(555) 123-4567',
      medications: ['Lisinopril 10mg x30', 'Metformin 500mg x90'],
      status: 'Out for Delivery',
      driver: 'Mike Johnson',
      estimatedTime: '2:30 PM',
      priority: 'Standard'
    },
    {
      id: 'DEL002',
      patient: 'Maria Garcia',
      address: '456 Oak Ave, Anytown, ST 12345',
      phone: '(555) 987-6543',
      medications: ['Insulin Glargine', 'Test Strips x100'],
      status: 'Preparing',
      driver: 'Unassigned',
      estimatedTime: '4:00 PM',
      priority: 'Urgent'
    },
    {
      id: 'DEL003',
      patient: 'Robert Davis',
      address: '789 Pine St, Anytown, ST 12345',
      phone: '(555) 456-7890',
      medications: ['Warfarin 5mg x30', 'Diltiazem 120mg x30'],
      status: 'Delivered',
      driver: 'Sarah Wilson',
      estimatedTime: 'Completed at 1:15 PM',
      priority: 'Standard'
    },
    {
      id: 'DEL004',
      patient: 'Jennifer Wilson',
      address: '321 Elm St, Anytown, ST 12345',
      phone: '(555) 234-5678',
      medications: ['Levothyroxine 50mcg x30'],
      status: 'Scheduled',
      driver: 'Unassigned',
      estimatedTime: '5:30 PM',
      priority: 'Standard'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const activeDeliveries = deliveries.filter(d => d.status !== 'Delivered').length;
  const outForDelivery = deliveries.filter(d => d.status === 'Out for Delivery').length;

  return (
    <Layout title="Delivery Management" subtitle="Track and manage prescription deliveries">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Deliveries</p>
                  <p className="text-2xl font-bold">{activeDeliveries}</p>
                </div>
                <Truck className="w-8 h-8 text-walgreens-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out for Delivery</p>
                  <p className="text-2xl font-bold text-blue-600">{outForDelivery}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">45min</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-walgreens-red" />
              Today's Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{delivery.patient}</h3>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                          <Badge className={getPriorityColor(delivery.priority)}>
                            {delivery.priority}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {delivery.address}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            {delivery.phone}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {delivery.estimatedTime}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-sm">Medications:</span>
                            <ul className="text-sm text-gray-600 mt-1">
                              {delivery.medications.map((med, index) => (
                                <li key={index}>• {med}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Driver:</span> {delivery.driver}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Delivery ID:</span> {delivery.id}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 space-y-2">
                      {delivery.status === 'Scheduled' && (
                        <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                          Assign Driver
                        </Button>
                      )}
                      {delivery.status === 'Preparing' && (
                        <Button size="sm" className="bg-walgreens-red hover:bg-walgreens-red-dark">
                          Mark Ready
                        </Button>
                      )}
                      {delivery.status === 'Out for Delivery' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Track Delivery
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Contact Patient
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DeliveriesPage;
