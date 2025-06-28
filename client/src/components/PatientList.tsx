import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import PatientProfileDialog from '@/components/PatientProfileDialog';
import PatientHistoryDialog from '@/components/PatientHistoryDialog';
import NewPrescriptionDialog from '@/components/NewPrescriptionDialog';
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Pill,
  AlertTriangle,
  Clock
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

  const handleNewPrescription = (prescriptionData: any, patient: Patient) => {
    console.log('New prescription created for patient:', patient.id, prescriptionData);
    // In a real app, you would handle the new prescription
  };

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
                <NewPrescriptionDialog 
                  onSubmit={(prescriptionData) => handleNewPrescription(prescriptionData, patient)} 
                  selectedPatient={patient}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientList;