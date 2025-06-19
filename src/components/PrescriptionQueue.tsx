
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Pill, AlertTriangle } from 'lucide-react';

const PrescriptionQueue = () => {
  const prescriptions = [
    {
      id: 'RX001234',
      patient: 'John Smith',
      medication: 'Lisinopril 10mg',
      quantity: '30 tablets',
      status: 'Ready for Review',
      priority: 'High',
      time: '2:30 PM',
      insurance: 'BCBS',
      prescriber: 'Dr. Johnson'
    },
    {
      id: 'RX001235',
      patient: 'Maria Garcia',
      medication: 'Metformin 500mg',
      quantity: '90 tablets',
      status: 'In Progress',
      priority: 'Normal',
      time: '2:45 PM',
      insurance: 'Aetna',
      prescriber: 'Dr. Wilson'
    },
    {
      id: 'RX001236',
      patient: 'Robert Davis',
      medication: 'Amoxicillin 500mg',
      quantity: '21 capsules',
      status: 'Verification',
      priority: 'Urgent',
      time: '3:00 PM',
      insurance: 'Cash',
      prescriber: 'Dr. Brown'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Review': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Verification': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Pill className="w-5 h-5 mr-2 text-walgreens-red" />
            Prescription Queue
          </CardTitle>
          <Button size="sm" className="bg-walgreens-red hover:bg-walgreens-red-dark">
            View All (12)
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-walgreens-blue">{rx.id}</span>
                    <Badge className={getPriorityColor(rx.priority)}>
                      {rx.priority}
                    </Badge>
                    <Badge className={getStatusColor(rx.status)}>
                      {rx.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <User className="w-4 h-4 mr-1" />
                        {rx.patient}
                      </div>
                      <div className="font-medium">{rx.medication}</div>
                      <div className="text-gray-500">{rx.quantity}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {rx.time}
                      </div>
                      <div className="text-gray-500">Dr: {rx.prescriber}</div>
                      <div className="text-gray-500">Ins: {rx.insurance}</div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 space-y-2">
                  <Button size="sm" variant="outline">
                    Process
                  </Button>
                  {rx.priority === 'Urgent' && (
                    <div className="flex items-center text-red-600 text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Urgent
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionQueue;
