import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import PrescriptionFilterDialog from '@/components/PrescriptionFilterDialog';
import ProcessDialog from '@/components/ProcessDialog';
import ViewDetailsDialog from '@/components/ViewDetailsDialog';
import PaginationControls from '@/components/ui/pagination-controls';
import NewPrescriptionDialog from '@/components/NewPrescriptionDialog';
import { prescriptionData, Prescription } from '@/data/prescriptionData';
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
  const { toast } = useToast();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Initialize prescriptions from the imported data
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(prescriptionData);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>(prescriptionData);
  const [searchTerm, setSearchTerm] = useState('');

  // Apply search filter
  useEffect(() => {
    const filtered = prescriptions.filter(rx => 
      rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.prescriber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrescriptions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, prescriptions]);

  const queueStats = [
    { label: 'Total Queue', value: prescriptions.length, icon: Activity, color: 'text-blue-600' },
    { label: 'Urgent', value: prescriptions.filter(p => p.priority === 'Urgent').length, icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Ready', value: prescriptions.filter(p => p.status === 'Ready for Review').length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Processing', value: prescriptions.filter(p => p.status === 'In Progress').length, icon: Clock, color: 'text-orange-600' }
  ];

  const handleEditPrescription = (updatedPrescription: Prescription) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.id === updatedPrescription.id ? updatedPrescription : prescription
      )
    );

    // Update selected prescription if it's the one being edited
    if (selectedPrescription && selectedPrescription.id === updatedPrescription.id) {
      setSelectedPrescription(updatedPrescription);
    }

    toast({
      title: "Prescription Updated",
      description: `Prescription ${updatedPrescription.id} has been successfully updated.`,
    });

    console.log("Prescription updated:", updatedPrescription);
  };

  const handleNewPrescription = (prescriptionData: any) => {
    // Create a new prescription with the provided data
    const newPrescription = {
      ...prescriptionData,
      id: prescriptionData.id || `RX${Date.now().toString().slice(-6)}`,
      status: 'Ready for Review',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    } as Prescription;
    
    // Add the new prescription to the list
    setPrescriptions([newPrescription, ...prescriptions]);
    
    toast({
      title: "Prescription Created",
      description: `New prescription for ${newPrescription.patient} has been added to the queue.`,
    });
    
    console.log("New prescription created:", newPrescription);
  };

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

  const handleFilterChange = (filters: Record<string, string | boolean>) => {
    console.log('Filters applied:', filters);
    // Implement filtering logic here
    let filtered = [...prescriptions];
    
    if (filters.status) {
      filtered = filtered.filter(rx => rx.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(rx => rx.priority === filters.priority);
    }
    
    if (filters.prescriber) {
      filtered = filtered.filter(rx => rx.prescriber === filters.prescriber);
    }
    
    if (filters.insurance) {
      filtered = filtered.filter(rx => rx.insurance === filters.insurance);
    }
    
    if (filters.todayOnly) {
      // This would filter by today's date in a real implementation
      // For demo purposes, we'll just return all prescriptions
    }
    
    if (filters.urgentOnly) {
      filtered = filtered.filter(rx => rx.priority === 'Urgent');
    }
    
    setFilteredPrescriptions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleProcess = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setProcessDialogOpen(true);
  };

  const handleViewDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setDetailsDialogOpen(true);
  };

  const handleProcessFromDetails = (prescription: Prescription) => {
    setDetailsDialogOpen(false);
    setSelectedPrescription(prescription);
    setProcessDialogOpen(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
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
                  <p className="text-gray-600">
                    {filteredPrescriptions.length} prescriptions in queue • 
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPrescriptions.length)} of {filteredPrescriptions.length}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <PrescriptionFilterDialog onFilterChange={handleFilterChange} />
                <NewPrescriptionDialog onSubmit={handleNewPrescription} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              {currentItems.map((rx) => (
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

            {/* Pagination Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              
              <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPrescriptions.length)} of {filteredPrescriptions.length}
              </div>
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
        onEditPrescription={handleEditPrescription}
      />
    </Layout>
  );
};

export default PrescriptionQueuePage;