import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaginationControls from '@/components/ui/pagination-controls';
import AdvancedSearchDialog from '@/components/AdvancedSearchDialog';
import NewPatientDialog from '@/components/NewPatientDialog';
import PatientList from '@/components/PatientList';
import { Patient, patientData } from '@/data/patientData';

const PatientLookup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Initialize patients data from imported data
  const [patients, setPatients] = useState<Patient[]>(patientData);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Check for search params in URL (from other pages)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  // Filter patients based on search term and active tab
  useEffect(() => {
    let filtered = patients;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab === 'active') {
      filtered = filtered.filter(patient => patient.status === 'Active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter(patient => patient.status === 'Inactive');
    } else if (activeTab === 'recent') {
      // Sort by last visit date (most recent first)
      // This is a simplified version - in a real app, you'd parse the dates properly
      filtered = [...filtered].sort((a, b) => 
        new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      ).slice(0, 5);
    }
    
    setFilteredPatients(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, activeTab, patients]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleAdvancedSearch = (criteria: any) => {
    console.log('Advanced search criteria:', criteria);
    // Implement advanced search logic here
    toast({
      title: "Advanced Search",
      description: "Search criteria applied successfully."
    });
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients([...patients, newPatient]);
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been added successfully.`
    });
  };

  const handleViewProfile = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleCreatePrescription = (patient: Patient) => {
    navigate('/prescription-queue', { state: { selectedPatient: patient } });
  };

  return (
    <Layout title="Patient Lookup" subtitle="Search and manage patient records">
      <div className="space-y-6">
        {/* Search Bar */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search patients by name, ID, phone, or email..."
                  className="pl-12 py-6 text-lg border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <AdvancedSearchDialog onSearch={handleAdvancedSearch} />
                <NewPatientDialog onAddPatient={handleAddPatient} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs and Patient List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-full lg:w-auto">
                  <div className="bg-gray-100 p-1 rounded-md inline-flex">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                        activeTab === 'all' 
                          ? 'bg-walgreens-red text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All Patients
                    </button>
                    <button
                      onClick={() => setActiveTab('active')}
                      className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                        activeTab === 'active' 
                          ? 'bg-walgreens-red text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setActiveTab('inactive')}
                      className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                        activeTab === 'inactive' 
                          ? 'bg-walgreens-red text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Inactive
                    </button>
                    <button
                      onClick={() => setActiveTab('recent')}
                      className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                        activeTab === 'recent' 
                          ? 'bg-walgreens-red text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Recent
                    </button>
                  </div>
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <PatientList 
              patients={currentItems} 
              onViewProfile={handleViewProfile} 
              onCreatePrescription={handleCreatePrescription}
            />

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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPatients.length)} of {filteredPatients.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientLookup;