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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  AlertTriangle,
  Pill,
  Heart,
  Edit,
  Plus,
  Eye,
  Activity,
  Clock,
  FileText
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
}

interface PatientProfileDialogProps {
  patient: Patient;
}

export default function PatientProfileDialog({ patient }: PatientProfileDialogProps) {
  const prescriptions = [
    { name: 'Lisinopril 10mg', dosage: 'Once daily', prescriber: 'Dr. Smith', fillDate: '12/15/2023', status: 'Active' },
    { name: 'Metformin 500mg', dosage: 'Twice daily', prescriber: 'Dr. Johnson', fillDate: '12/10/2023', status: 'Active' },
    { name: 'Atorvastatin 20mg', dosage: 'Once daily', prescriber: 'Dr. Smith', fillDate: '12/05/2023', status: 'Active' }
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

  const profileStats = [
    { label: 'Active Rx', value: patient.activeRx, icon: Pill, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Age', value: `${getPatientAge(patient.dob)}`, icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Allergies', value: patient.allergies.filter(a => a !== 'None known').length, icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'Last Visit', value: patient.lastVisit.split('/')[1] + '/' + patient.lastVisit.split('/')[2], icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  {patient.name}
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {patient.id}
                  </Badge>
                </DialogTitle>
                <p className="text-gray-600 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Active Patient Profile</span>
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 hover:border-walgreens-red hover:text-walgreens-red"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
          </div>

          {/* Profile Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <Card key={index} className={`border-0 ${stat.bgColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-walgreens-blue" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-walgreens-blue" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Date of Birth</p>
                      <p className="text-sm font-semibold text-gray-900">{patient.dob}</p>
                      <p className="text-xs text-gray-500">Age: {getPatientAge(patient.dob)} years</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-walgreens-blue" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Phone Number</p>
                      <p className="text-sm font-semibold text-gray-900">{patient.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-walgreens-blue" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Email Address</p>
                      <p className="text-sm font-semibold text-gray-900">{patient.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-walgreens-blue mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Address</p>
                      <p className="text-sm font-semibold text-gray-900">{patient.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-walgreens-blue" />
                Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">Insurance Provider</p>
                      <p className="text-lg font-bold text-blue-900">{patient.insurance}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">Last Visit</p>
                      <p className="text-lg font-bold text-green-900">{patient.lastVisit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                Allergy Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.allergies.length === 1 && patient.allergies[0] === 'None known' ? (
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Heart className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">No Known Allergies</p>
                      <p className="text-sm text-green-600">Patient has no documented allergies</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-800">Known Allergies - Exercise Caution</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge
                          key={index}
                          className="bg-red-100 text-red-800 border-red-200 px-3 py-1 text-sm font-medium"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Active Prescriptions */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                <div className="flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Active Prescriptions ({patient.activeRx})
                </div>
                <Button
                  size="sm"
                  className="bg-walgreens-red hover:bg-red-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prescription
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptions.slice(0, patient.activeRx).map((rx, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg text-gray-900">{rx.name}</h4>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              {rx.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 font-medium">Dosage</p>
                              <p className="text-gray-900">{rx.dosage}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 font-medium">Prescriber</p>
                              <p className="text-gray-900">{rx.prescriber}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 font-medium">Last Fill</p>
                              <p className="text-gray-900">{rx.fillDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-1" />
                            Refill
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <FileText className="w-4 h-4 mr-2" />
              View History
            </Button>
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-walgreens-blue text-walgreens-blue hover:bg-walgreens-blue hover:text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
