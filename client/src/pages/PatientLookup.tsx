import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Activity,
  FileText,
  Heart,
  AlertTriangle,
  Plus,
  Filter
} from 'lucide-react';
import AdvancedSearchDialog from '@/components/AdvancedSearchDialog';
import PatientProfileDialog from '@/components/PatientProfileDialog';
import PatientHistoryDialog from '@/components/PatientHistoryDialog';

const PatientLookupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 'PT001',
      name: 'John Smith',
      dob: '03/15/1965',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, Anytown, ST 12345',
      insurance: 'Blue Cross Blue Shield',
      lastVisit: '12/15/2023',
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
      lastVisit: '12/18/2023',
      activeRx: 1,
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
      allergies: ['Aspirin', 'Codeine'],
      status: 'Active'
    },
    {
      id: 'PT004',
      name: 'Sarah Johnson',
      dob: '09/03/1990',
      phone: '(555) 321-9876',
      email: 'sarah.johnson@email.com',
      address: '321 Elm St, Anytown, ST 12345',
      insurance: 'United Healthcare',
      lastVisit: '12/22/2023',
      activeRx: 2,
      allergies: ['None known'],
      status: 'Active'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const searchStats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Today', value: patients.filter(p => p.lastVisit === '12/22/2023').length, icon: Activity, color: 'text-green-600' },
    { label: 'With Allergies', value: patients.filter(p => p.allergies.length > 0 && !p.allergies.includes('None known')).length, icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Search Results', value: filteredPatients.length, icon: Search, color: 'text-purple-600' }
  ];

  const getPatientAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAdvancedSearch = (criteria: any) => {
    console.log('Advanced search criteria:', criteria);
    // Implement advanced search logic here
  };

  return (
    <Layout title="Patient Lookup" subtitle="Search and manage patient information efficiently">
      <div className="space-y-8">
        {/* Search Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {searchStats.map((stat, index) => (
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

        {/* Search Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Patient Search
                  </CardTitle>
                  <p className="text-gray-600">Find patients by name, ID, or contact information</p>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Patient
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, patient ID, or phone number..."
                  className="pl-12 h-12 text-lg border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <AdvancedSearchDialog onSearch={handleAdvancedSearch} />
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              {filteredPatients.length === 0 ? (
                <Card className="border-gray-200">
                  <CardContent className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or use advanced search for more options.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredPatients.map((patient) => (
                  <Card key={patient.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Patient Information */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left Column - Basic Info */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                    {patient.id}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    {patient.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">Age: {getPatientAge(patient.dob)} years</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-walgreens-blue" />
                                <span>DOB: {patient.dob}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4 text-walgreens-blue" />
                                <span>{patient.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4 text-walgreens-blue" />
                                <span className="truncate">{patient.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-walgreens-blue" />
                                <span className="truncate">{patient.address}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Medical Info */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Insurance</p>
                                <p className="font-semibold text-sm text-gray-900">{patient.insurance}</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Last Visit</p>
                                <p className="font-semibold text-sm text-gray-900">{patient.lastVisit}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Active Prescriptions:</span>
                                <Badge className="bg-walgreens-red text-white">
                                  {patient.activeRx}
                                </Badge>
                              </div>

                              <div>
                                <span className="text-sm font-medium text-gray-700 mb-2 block">Allergies:</span>
                                <div className="flex flex-wrap gap-2">
                                  {patient.allergies.map((allergy, index) => (
                                    <Badge
                                      key={index}
                                      className={
                                        allergy === 'None known'
                                          ? 'bg-green-100 text-green-800 border-green-200'
                                          : 'bg-red-100 text-red-800 border-red-200'
                                      }
                                    >
                                      {allergy === 'None known' ? (
                                        <>
                                          <Heart className="w-3 h-3 mr-1" />
                                          {allergy}
                                        </>
                                      ) : (
                                        <>
                                          <AlertTriangle className="w-3 h-3 mr-1" />
                                          {allergy}
                                        </>
                                      )}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="ml-6 flex flex-col space-y-2">
                          <PatientProfileDialog patient={patient} />
                          <PatientHistoryDialog patient={patient} />
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:border-walgreens-red hover:text-walgreens-red"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            New Rx
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientLookupPage;
