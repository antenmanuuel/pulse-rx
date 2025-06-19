
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';

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
      allergies: ['Penicillin', 'Sulfa']
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
      allergies: ['None known']
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
      allergies: ['Aspirin', 'Codeine']
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Patient Lookup" subtitle="Search and manage patient information">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-walgreens-red" />
              Patient Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search by name, patient ID, or phone number..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
                Advanced Search
              </Button>
            </div>

            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{patient.name}</h3>
                          <Badge variant="outline">{patient.id}</Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            DOB: {patient.dob}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {patient.email}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {patient.address}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Insurance:</span> {patient.insurance}
                          </div>
                          <div>
                            <span className="font-medium">Last Visit:</span> {patient.lastVisit}
                          </div>
                          <div>
                            <span className="font-medium">Active Prescriptions:</span>
                            <Badge className="ml-2 bg-walgreens-red">{patient.activeRx}</Badge>
                          </div>
                          <div>
                            <span className="font-medium">Allergies:</span> {patient.allergies.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 space-y-2">
                      <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        History
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

export default PatientLookupPage;
