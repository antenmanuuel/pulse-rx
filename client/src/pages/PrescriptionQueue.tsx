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
import {
  Clock,
  User,
  Pill,
  AlertTriangle,
  Search,
  Plus,
  Activity,
  TrendingUp,
  FileText,
  Shield
} from 'lucide-react';

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

  const queueStats = [
    { label: 'Total Queue', value: prescriptions.length, icon: Activity, color: 'text-blue-600' },
    { label: 'Urgent', value: prescriptions.filter(p => p.priority === 'Urgent').length, icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Ready', value: prescriptions.filter(p => p.status === 'Ready for Review').length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Processing', value: prescriptions.filter(p => p.status === 'In Progress').length, icon: Clock, color: 'text-orange-600' }
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
      case 'Pending Insurance': return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <Layout title="Prescription Queue" subtitle="Manage and process prescription orders efficiently">
      <div className="space-y-8">
        {/* Queue Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {queueStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Queue */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Active Prescriptions
                  </CardTitle>
                  <p className="text-gray-600">{prescriptions.length} prescriptions in queue</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>
                <PrescriptionFilterDialog onFilterChange={handleFilterChange} />
                <Button
                  className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-10"
                  onClick={() => navigate('/new-prescription')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Prescription
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <Card key={rx.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getPriorityIcon(rx.priority)}</div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-bold text-lg text-walgreens-blue">{rx.id}</span>
                            <Badge className={`${getPriorityColor(rx.priority)} font-medium`}>
                              {rx.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(rx.status)} font-medium`}>
                              {rx.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {rx.priority === 'Urgent' && (
                        <div className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Urgent Priority
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      {/* Patient Info */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700 font-medium">
                          <User className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Patient Information
                        </div>
                        <div className="pl-6 space-y-1">
                          <p className="font-semibold text-gray-900">{rx.patient}</p>
                          <p className="text-sm text-gray-600">DOB: {rx.dob}</p>
                          <p className="text-sm text-gray-600">Insurance: {rx.insurance}</p>
                        </div>
                      </div>

                      {/* Medication Info */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700 font-medium">
                          <Pill className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Medication Details
                        </div>
                        <div className="pl-6 space-y-1">
                          <p className="font-semibold text-gray-900">{rx.medication}</p>
                          <p className="text-sm text-gray-600">Quantity: {rx.quantity}</p>
                          <p className="text-sm text-gray-600">Prescriber: {rx.prescriber}</p>
                        </div>
                      </div>

                      {/* Processing Info */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700 font-medium">
                          <Clock className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Processing Details
                        </div>
                        <div className="pl-6 space-y-1">
                          <p className="text-sm text-gray-600">Received: {rx.time}</p>
                          <p className="text-sm text-gray-600">Status: {rx.status}</p>
                          <p className="text-sm text-gray-600">Priority: {rx.priority}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-100">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue"
                        onClick={() => handleViewDetails(rx)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => handleProcess(rx)}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Process Prescription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
