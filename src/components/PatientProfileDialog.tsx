
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, MapPin, Calendar, CreditCard, AlertTriangle, Pill } from 'lucide-react';

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
}

interface PatientProfileDialogProps {
  patient: Patient;
}

export default function PatientProfileDialog({ patient }: PatientProfileDialogProps) {
  const prescriptions = [
    { name: 'Lisinopril 10mg', dosage: 'Once daily', prescriber: 'Dr. Smith', fillDate: '12/15/2023' },
    { name: 'Metformin 500mg', dosage: 'Twice daily', prescriber: 'Dr. Johnson', fillDate: '12/10/2023' },
    { name: 'Atorvastatin 20mg', dosage: 'Once daily', prescriber: 'Dr. Smith', fillDate: '12/05/2023' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-walgreens-red" />
            Patient Profile - {patient.name}
            <Badge variant="outline" className="ml-2">{patient.id}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm"><strong>DOB:</strong> {patient.dob}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm"><strong>Phone:</strong> {patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm"><strong>Email:</strong> {patient.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm"><strong>Address:</strong> {patient.address}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Insurance Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Insurance Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm"><strong>Provider:</strong> {patient.insurance}</p>
              <p className="text-sm mt-1"><strong>Last Visit:</strong> {patient.lastVisit}</p>
            </div>
          </div>

          <Separator />

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Allergies
            </h3>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Active Prescriptions */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
              Active Prescriptions ({patient.activeRx})
            </h3>
            <div className="space-y-3">
              {prescriptions.slice(0, patient.activeRx).map((rx, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{rx.name}</p>
                      <p className="text-sm text-gray-600">Dosage: {rx.dosage}</p>
                      <p className="text-sm text-gray-600">Prescriber: {rx.prescriber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Fill Date</p>
                      <p className="text-sm font-medium">{rx.fillDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">Edit Profile</Button>
          <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
            New Prescription
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
