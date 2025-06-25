
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import PrescriptionFilterDialog from '@/components/PrescriptionFilterDialog';
import ProcessDialog from '@/components/ProcessDialog';
import ViewDetailsDialog from '@/components/ViewDetailsDialog';
import { Clock, User, Pill, AlertTriangle, Search, Plus } from 'lucide-react';

const PrescriptionQueuePage = () => {
  const navigate = useNavigate();
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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
      prescriber: 'Dr. Johnson',
      dob: '03/15/1965'
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
      prescriber: 'Dr. Wilson',
      dob: '07/22/1978'
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
      prescriber: 'Dr. Brown',
      dob: '12/08/1945'
    },
    {
      id: 'RX001237',
      patient: 'Jennifer Wilson',
      medication: 'Atorvastatin 20mg',
      quantity: '30 tablets',
      status: 'Pending Insurance',
      priority: 'Normal',
      time: '3:15 PM',
      insurance: 'Humana',
      prescriber: 'Dr. Taylor',
      dob: '09/14/1982'
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
      case 'Pending Insurance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
  };

  const handleProcess = (prescription: any) => {
    setSelectedPrescription(prescription);
    setProcessDialogOpen(true);
  };

  const handleViewDetails = (prescription: any) => {
    setSelectedPrescription(prescription);
    setDetailsDialogOpen(true);
  };

  const handleProcessFromDetails = (prescription: any) => {
    setDetailsDialogOpen(false);
    setSelectedPrescription(prescription);
    setProcessDialogOpen(true);
  };

  return (
    <Layout title="Prescription Queue" subtitle="Manage and process prescription orders">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-walgreens-red" />
                Active Prescriptions ({prescriptions.length})
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search prescriptions..." className="pl-10 w-64" />
                </div>
                <PrescriptionFilterDialog onFilterChange={handleFilterChange} />
                <Button 
                  className="bg-walgreens-red hover:bg-walgreens-red-dark"
                  onClick={() => navigate('/new-prescription')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Prescription
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-walgreens-blue">{rx.id}</span>
                        <Badge className={getPriorityColor(rx.priority)}>
                          {rx.priority}
                        </Badge>
                        <Badge className={getStatusColor(rx.status)}>
                          {rx.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="w-4 h-4 mr-1" />
                            {rx.patient}
                          </div>
                          <div className="text-gray-500 text-xs">DOB: {rx.dob}</div>
                          <div className="font-medium mt-1">{rx.medication}</div>
                          <div className="text-gray-500">{rx.quantity}</div>
                        </div>
                        
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="w-4 h-4 mr-1" />
                            Received: {rx.time}
                          </div>
                          <div className="text-gray-500">Prescriber: {rx.prescriber}</div>
                          <div className="text-gray-500">Insurance: {rx.insurance}</div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            size="sm" 
                            className="bg-walgreens-red hover:bg-walgreens-red-dark"
                            onClick={() => handleProcess(rx)}
                          >
                            Process
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(rx)}
                          >
                            View Details
                          </Button>
                          {rx.priority === 'Urgent' && (
                            <div className="flex items-center text-red-600 text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Urgent Priority
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ProcessDialog
        prescription={selectedPrescription}
        open={processDialogOpen}
        onOpenChange={setProcessDialogOpen}
      />

      <ViewDetailsDialog
        prescription={selectedPrescription}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onProcessPrescription={handleProcessFromDetails}
      />
    </Layout>
  );
};

export default PrescriptionQueuePage;
