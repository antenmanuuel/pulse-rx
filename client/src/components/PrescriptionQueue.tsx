import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Pill, AlertTriangle, ArrowRight } from 'lucide-react';

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
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
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
          <Button
            size="sm"
            className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/prescription-queue')}
          >
            View All (12)
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="group hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-gray-200 hover:border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">{getPriorityIcon(rx.priority)}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm text-walgreens-blue">{rx.id}</span>
                        <Badge className={`${getPriorityColor(rx.priority)} text-xs font-medium`}>
                          {rx.priority}
                        </Badge>
                        <Badge className={`${getStatusColor(rx.status)} text-xs font-medium`}>
                          {rx.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {rx.priority === 'Urgent' && (
                    <div className="flex items-center bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Urgent
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Patient Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-xs font-medium">
                      <User className="w-3 h-3 mr-1 text-walgreens-blue" />
                      Patient
                    </div>
                    <div className="pl-4 space-y-1">
                      <p className="font-semibold text-sm text-gray-900">{rx.patient}</p>
                      <p className="text-xs text-gray-600">Insurance: {rx.insurance}</p>
                    </div>
                  </div>

                  {/* Medication Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-xs font-medium">
                      <Pill className="w-3 h-3 mr-1 text-walgreens-blue" />
                      Medication
                    </div>
                    <div className="pl-4 space-y-1">
                      <p className="font-semibold text-sm text-gray-900">{rx.medication}</p>
                      <p className="text-xs text-gray-600">{rx.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Time and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    Received: {rx.time}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-3 border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue"
                    onClick={() => handleProcess(rx.id)}
                  >
                    Process
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionQueue;
