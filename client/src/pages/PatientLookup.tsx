import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import PaginationControls from '@/components/ui/pagination-controls';
import AdvancedSearchDialog from '@/components/AdvancedSearchDialog';
import PatientProfileDialog from '@/components/PatientProfileDialog';
import PatientHistoryDialog from '@/components/PatientHistoryDialog';
import NewPatientDialog from '@/components/NewPatientDialog';
import {
  Search,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Pill,
  AlertTriangle,
  Clock,
  Filter,
  Plus,
  FileText,
  MessageSquare,
  ArrowRight,
  Download,
  UserPlus
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  lastVisit: string;
  activeRx: number;
  allergies: string[];
  status: string;
}

const PatientLookup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Initialize patients data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'PT001',
      name: 'John Smith',
      dob: '03/15/1965',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, Anytown, ST 12345',
      insurance: 'Blue Cross Blue Shield',
      lastVisit: '01/15/2024',
      activeRx: 3,
      allergies: ['Penicillin', 'Sulfa'],
      status: 'Active'
    },
    {
      id: 'PT002',
      name: 'Maria Garcia',
      dob: '07/22/1978',
      phone: '(555) 987-6543',
      email: 'maria.garcia@email.com',
      address: '456 Oak Ave, Anytown, ST 12345',
      insurance: 'Aetna',
      lastVisit: '01/10/2024',
      activeRx: 2,
      allergies: ['None known'],
      status: 'Active'
    },
    {
      id: 'PT003',
      name: 'Robert Davis',
      dob: '12/08/1945',
      phone: '(555) 456-7890',
      email: 'robert.davis@email.com',
      address: '789 Pine St, Anytown, ST 12345',
      insurance: 'Medicare',
      lastVisit: '12/20/2023',
      activeRx: 5,
      allergies: ['Aspirin', 'Latex'],
      status: 'Active'
    },
    {
      id: 'PT004',
      name: 'Jennifer Wilson',
      dob: '09/14/1982',
      phone: '(555) 234-5678',
      email: 'jennifer.wilson@email.com',
      address: '321 Elm St, Anytown, ST 12345',
      insurance: 'Cigna',
      lastVisit: '01/05/2024',
      activeRx: 1,
      allergies: ['None known'],
      status: 'Active'
    },
    {
      id: 'PT005',
      name: 'Michael Brown',
      dob: '05/22/1950',
      phone: '(555) 876-5432',
      email: 'michael.brown@email.com',
      address: '567 Maple Ave, Anytown, ST 12345',
      insurance: 'Medicare',
      lastVisit: '01/08/2024',
      activeRx: 4,
      allergies: ['Codeine', 'Ibuprofen'],
      status: 'Active'
    },
    {
      id: 'PT006',
      name: 'Sarah Johnson',
      dob: '11/30/1975',
      phone: '(555) 765-4321',
      email: 'sarah.johnson@email.com',
      address: '789 Oak St, Anytown, ST 12345',
      insurance: 'Cigna',
      lastVisit: '12/15/2023',
      activeRx: 2,
      allergies: ['None known'],
      status: 'Active'
    },
    {
      id: 'PT007',
      name: 'David Wilson',
      dob: '08/15/1968',
      phone: '(555) 543-2109',
      email: 'david.wilson@email.com',
      address: '456 Pine St, Anytown, ST 12345',
      insurance: 'United Healthcare',
      lastVisit: '01/12/2024',
      activeRx: 3,
      allergies: ['Penicillin'],
      status: 'Inactive'
    },
    {
      id: 'PT008',
      name: 'Lisa Martinez',
      dob: '03/25/1985',
      phone: '(555) 321-0987',
      email: 'lisa.martinez@email.com',
      address: '123 Elm St, Anytown, ST 12345',
      insurance: 'Anthem',
      lastVisit: '01/03/2024',
      activeRx: 1,
      allergies: ['None known'],
      status: 'Active'
    },
    {
      id: 'PT009',
      name: 'Thomas Anderson',
      dob: '06/12/1990',
      phone: '(555) 109-8765',
      email: 'thomas.anderson@email.com',
      address: '789 Maple St, Anytown, ST 12345',
      insurance: 'Blue Cross',
      lastVisit: '12/28/2023',
      activeRx: 2,
      allergies: ['Sulfa'],
      status: 'Active'
    },
    {
      id: 'PT010',
      name: 'Emily Thompson',
      dob: '09/05/1988',
      phone: '(555) 987-0123',
      email: 'emily.thompson@email.com',
      address: '456 Birch St, Anytown, ST 12345',
      insurance: 'Aetna',
      lastVisit: '01/14/2024',
      activeRx: 0,
      allergies: ['None known'],
      status: 'Active'
    },
    {
      id: 'PT011',
      name: 'James Wilson',
      dob: '04/18/1972',
      phone: '(555) 876-0123',
      email: 'james.wilson@email.com',
      address: '789 Cedar St, Anytown, ST 12345',
      insurance: 'Humana',
      lastVisit: '12/10/2023',
      activeRx: 3,
      allergies: ['Penicillin', 'Tetracycline'],
      status: 'Active'
    },
    {
      id: 'PT012',
      name: 'Patricia Moore',
      dob: '07/29/1955',
      phone: '(555) 765-0123',
      email: 'patricia.moore@email.com',
      address: '123 Walnut St, Anytown, ST 12345',
      insurance: 'Medicare',
      lastVisit: '01/02/2024',
      activeRx: 6,
      allergies: ['Aspirin'],
      status: 'Active'
    }
  ]);

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
    navigate('/new-prescription', { state: { selectedPatient: patient } });
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
                <User className="w-6 h-6 mr-2 text-walgreens-red" />
                Patient Directory
              </CardTitle>
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

      {selectedPatient && (
        <>
          <PatientProfileDialog patient={selectedPatient} />
          <PatientHistoryDialog patient={selectedPatient} />
        </>
      )}
    </Layout>
  );
};

// Patient List Component
interface PatientListProps {
  patients: Patient[];
  onViewProfile: (patient: Patient) => void;
  onCreatePrescription: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onViewProfile, onCreatePrescription }) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="hover:shadow-md transition-all duration-200 border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-walgreens-red text-white">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {patient.id}
                    </Badge>
                    <Badge className={patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      DOB: {patient.dob}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.address.split(',')[0]}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm">
                      <Pill className="w-4 h-4 mr-1 text-walgreens-blue" />
                      <span className="font-medium">{patient.activeRx} active prescriptions</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1 text-gray-500" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                    {patient.allergies.length > 0 && patient.allergies[0] !== 'None known' && (
                      <div className="flex items-center text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span>{patient.allergies.length} allergies</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <PatientProfileDialog patient={patient} />
                <PatientHistoryDialog patient={patient} />
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue"
                  onClick={() => onCreatePrescription(patient)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Prescription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientLookup;