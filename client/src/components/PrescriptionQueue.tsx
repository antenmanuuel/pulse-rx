import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Pill, AlertTriangle, ArrowRight, Calendar } from 'lucide-react';

const PrescriptionQueue = () => {
  const navigate = useNavigate();

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
    },
    {
      id: 'RX001237',
      patient: 'Emily Johnson',
      medication: 'Atorvastatin 20mg',
      quantity: '30 tablets',
      status: 'Ready for Review',
      priority: 'Normal',
      time: '3:15 PM',
      insurance: 'Medicare',
      prescriber: 'Dr. Smith'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Review': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Verification': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Urgent': return '🚨';
      case 'High': return '⚡';
      default: return '📋';
    }
  };

  const handleProcess = (prescriptionId: string) => {
    console.log('Processing prescription:', prescriptionId);
    navigate('/prescription-queue');
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">
                Prescription Queue
              </CardTitle>
              <p className="text-sm text-gray-600">Recent prescriptions requiring attention</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Total in queue</p>
              <p className="text-lg font-bold text-gray-900">12</p>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/prescription-queue')}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{getPriorityIcon(rx.priority)}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm text-walgreens-blue">{rx.id}</span>
                        <Badge className={`${getPriorityColor(rx.priority)} text-xs font-medium px-2 py-1`}>
                          {rx.priority}
                        </Badge>
                        <Badge className={`${getStatusColor(rx.status)} text-xs font-medium px-2 py-1`}>
                          {rx.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">Prescribed by {rx.prescriber}</p>
                    </div>
                  </div>

                  {rx.priority === 'Urgent' && (
                    <div className="flex items-center bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Urgent
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  {/* Patient Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-xs font-medium">
                      <User className="w-3 h-3 mr-1 text-walgreens-blue" />
                      Patient Information
                    </div>
                    <div className="pl-4 space-y-1">
                      <p className="font-semibold text-sm text-gray-900">{rx.patient}</p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                        Insurance: {rx.insurance}
                      </p>
                    </div>
                  </div>

                  {/* Medication Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-xs font-medium">
                      <Pill className="w-3 h-3 mr-1 text-walgreens-blue" />
                      Medication Details
                    </div>
                    <div className="pl-4 space-y-1">
                      <p className="font-semibold text-sm text-gray-900">{rx.medication}</p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                        Quantity: {rx.quantity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    Received: {rx.time}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-3 border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue transition-colors duration-200"
                    >
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="text-xs h-7 px-3 bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
                      onClick={() => handleProcess(rx.id)}
                    >
                      Process
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Queue Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">8</p>
                <p className="text-xs text-gray-600">Ready</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">3</p>
                <p className="text-xs text-gray-600">Progress</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">1</p>
                <p className="text-xs text-gray-600">Urgent</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:border-walgreens-red hover:text-walgreens-red"
              onClick={() => navigate('/prescription-queue')}
            >
              Manage Queue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionQueue;
