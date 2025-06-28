import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Filter,
  Eye,
  Edit3,
  Save,
  X,
  RefreshCw,
  MessageSquare,
  History,
  Shield,
  Pill,
  Clock,
  Send
} from "lucide-react";
import AdvancedSearchDialog from "@/components/AdvancedSearchDialog";
import PatientProfileDialog from "@/components/PatientProfileDialog";
import PatientHistoryDialog from "@/components/PatientHistoryDialog";
import NewPatientDialog from "@/components/NewPatientDialog";

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
  emergencyContact: string;
  policyNumber: string;
  preferredPharmacy: string;
  medicalConditions: string[];
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
    refillsRemaining: number;
    lastFilled: string;
  }>;
  prescriptionHistory: Array<{
    id: string;
    medication: string;
    dosage: string;
    prescribedDate: string;
    filledDate: string;
    prescriber: string;
    status: string;
  }>;
  visitHistory: Array<{
    date: string;
    reason: string;
    pharmacist: string;
    notes: string;
  }>;
}

const PatientLookupPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Patient>>({});
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isRefillDialogOpen, setIsRefillDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
    type: "general" // general, appointment, prescription, refill
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize patients with default data
  React.useEffect(() => {
    if (patients.length === 0) {
      setPatients([
        {
          id: "PT001",
          name: "John Smith",
          dob: "03/15/1965",
          phone: "(555) 123-4567",
          email: "john.smith@email.com",
          address: "123 Main St, Anytown, ST 12345",
          insurance: "Blue Cross Blue Shield",
          lastVisit: "12/15/2023",
          activeRx: 3,
          allergies: ["Penicillin", "Sulfa"],
          status: "Active",
          emergencyContact: "Jane Smith",
          policyNumber: "BCBS-12345",
          preferredPharmacy: "Walgreens",
          medicalConditions: ["Hypertension"],
          currentMedications: [
            {
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Daily",
              prescribedDate: "01/01/2023",
              refillsRemaining: 5,
              lastFilled: "12/15/2023",
            },
          ],
          prescriptionHistory: [
            {
              id: "RX001",
              medication: "Lisinopril",
              dosage: "10mg",
              prescribedDate: "01/01/2023",
              filledDate: "12/15/2023",
              prescriber: "Dr. Smith",
              status: "Filled",
            },
          ],
          visitHistory: [
            {
              date: "12/15/2023",
              reason: "Annual Checkup",
              pharmacist: "Pharmacist Smith",
              notes: "No issues reported",
            },
          ],
        },
        {
          id: "PT002",
          name: "Maria Garcia",
          dob: "07/22/1978",
          phone: "(555) 987-6543",
          email: "maria.garcia@email.com",
          address: "456 Oak Ave, Anytown, ST 12345",
          insurance: "Aetna",
          lastVisit: "12/18/2023",
          activeRx: 1,
          allergies: ["None known"],
          status: "Active",
          emergencyContact: "Carlos Garcia",
          policyNumber: "AETNA-23456",
          preferredPharmacy: "CVS",
          medicalConditions: [],
          currentMedications: [],
          prescriptionHistory: [],
          visitHistory: [],
        },
        {
          id: "PT003",
          name: "Robert Davis",
          dob: "12/08/1945",
          phone: "(555) 456-7890",
          email: "robert.davis@email.com",
          address: "789 Pine St, Anytown, ST 12345",
          insurance: "Medicare",
          lastVisit: "12/20/2023",
          activeRx: 5,
          allergies: ["Aspirin", "Codeine"],
          status: "Active",
          emergencyContact: "Sarah Davis",
          policyNumber: "MEDICARE-34567",
          preferredPharmacy: "Walgreens",
          medicalConditions: ["Diabetes"],
          currentMedications: [
            {
              name: "Metformin",
              dosage: "500mg",
              frequency: "Twice Daily",
              prescribedDate: "01/01/2023",
              refillsRemaining: 3,
              lastFilled: "12/15/2023",
            },
          ],
          prescriptionHistory: [
            {
              id: "RX002",
              medication: "Metformin",
              dosage: "500mg",
              prescribedDate: "01/01/2023",
              filledDate: "12/15/2023",
              prescriber: "Dr. Davis",
              status: "Filled",
            },
          ],
          visitHistory: [
            {
              date: "12/20/2023",
              reason: "Annual Checkup",
              pharmacist: "Pharmacist Davis",
              notes: "Diabetes management plan discussed",
            },
          ],
        },
        {
          id: "PT004",
          name: "Sarah Johnson",
          dob: "09/03/1990",
          phone: "(555) 321-9876",
          email: "sarah.johnson@email.com",
          address: "321 Elm St, Anytown, ST 12345",
          insurance: "United Healthcare",
          lastVisit: "12/22/2023",
          activeRx: 2,
          allergies: ["None known"],
          status: "Active",
          emergencyContact: "Michael Johnson",
          policyNumber: "UNHC-45678",
          preferredPharmacy: "CVS",
          medicalConditions: ["Asthma"],
          currentMedications: [
            {
              name: "Albuterol",
              dosage: "0.083mg",
              frequency: "As needed",
              prescribedDate: "01/01/2023",
              refillsRemaining: 1,
              lastFilled: "12/15/2023",
            },
          ],
          prescriptionHistory: [
            {
              id: "RX003",
              medication: "Albuterol",
              dosage: "0.083mg",
              prescribedDate: "01/01/2023",
              filledDate: "12/15/2023",
              prescriber: "Dr. Johnson",
              status: "Filled",
            },
          ],
          visitHistory: [
            {
              date: "12/22/2023",
              reason: "Asthma exacerbation",
              pharmacist: "Pharmacist Johnson",
              notes: "Prescribed new inhaler",
            },
          ],
        },
      ]);
    }
  }, [patients]);

  // Handler functions for patient profile management
  const handleViewProfile = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsProfileDialogOpen(true);
    setIsEditMode(false);
  };

  const handleEditProfile = () => {
    if (selectedPatient) {
      setEditForm({ ...selectedPatient });
      setIsEditMode(true);
    }
  };

  const handleSaveProfile = () => {
    if (selectedPatient && editForm) {
      const updatedPatients = patients.map(patient =>
        patient.id === selectedPatient.id ? { ...patient, ...editForm } as Patient : patient
      );
      setPatients(updatedPatients);
      setSelectedPatient({ ...selectedPatient, ...editForm } as Patient);
      setIsEditMode(false);
      setEditForm({});

      toast({
        title: "Profile Updated",
        description: `${selectedPatient.name}'s profile has been updated successfully.`,
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: string | string[]) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsHistoryDialogOpen(true);
  };

  const handleRefillRequest = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsRefillDialogOpen(true);
  };

  const handleSendMessage = (patient: Patient) => {
    setSelectedPatient(patient);
    setMessageForm({
      subject: `Message for ${patient.name}`,
      message: "",
      type: "general"
    });
    setIsMessageDialogOpen(true);
  };

  const handleRequestRefill = (patientId: string, medication: Patient['currentMedications'][0]) => {
    // Create a refill request
    const refillRequest = {
      id: `RF${Date.now()}`,
      patientId: patientId,
      patientName: selectedPatient?.name,
      medicationName: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      lastFilled: medication.lastFilled,
      refillsRemaining: medication.refillsRemaining - 1,
      requestDate: new Date().toLocaleDateString(),
      status: 'Pending',
      priority: medication.refillsRemaining <= 1 ? 'High' : 'Normal'
    };

    // Update the patient's medication refill count
    if (selectedPatient) {
      const updatedPatients = patients.map(patient => {
        if (patient.id === patientId) {
          const updatedMedications = patient.currentMedications.map(med => {
            if (med.name === medication.name && med.dosage === medication.dosage) {
              return {
                ...med,
                refillsRemaining: med.refillsRemaining - 1
              };
            }
            return med;
          });
          return {
            ...patient,
            currentMedications: updatedMedications
          };
        }
        return patient;
      });

      setPatients(updatedPatients);

      // Update selected patient as well
      const updatedSelectedPatient = updatedPatients.find(p => p.id === patientId);
      if (updatedSelectedPatient) {
        setSelectedPatient(updatedSelectedPatient);
      }
    }

    // Show success notification
    toast({
      title: "Refill Request Submitted",
      description: `Refill request for ${medication.name} has been submitted successfully. Estimated ready time: 2-4 hours.`,
    });

    console.log("Refill request created:", refillRequest);
  };

  const handleSendEmail = () => {
    if (selectedPatient && messageForm.subject && messageForm.message) {
      // Simulate sending email
      toast({
        title: "Message Sent",
        description: `Email sent to ${selectedPatient.name} at ${selectedPatient.email}`,
      });

      setIsMessageDialogOpen(false);
      setMessageForm({ subject: "", message: "", type: "general" });

      console.log("Email sent:", {
        to: selectedPatient.email,
        subject: messageForm.subject,
        message: messageForm.message,
        type: messageForm.type
      });
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  );

  const searchStats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Search Results",
      value: filteredPatients.length,
      icon: Search,
      color: "text-purple-600",
    },
  ];

  const getPatientAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleAdvancedSearch = (criteria: { name?: string; dob?: string; phone?: string; insurance?: string }) => {
    console.log("Advanced search criteria:", criteria);
    // Implement advanced search logic here
  };

  const handleNewPrescription = (patient: Patient) => {
    // Navigate to new prescription page with patient data pre-filled
    navigate("/new-prescription", {
      state: {
        selectedPatient: patient,
      },
    });
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);

    // Show success notification
    toast({
      title: "Patient Added Successfully",
      description: `${newPatient.name} has been registered in the system.`,
    });

    console.log("New patient added:", newPatient);
  };

  return (
    <Layout
      title="Patient Lookup"
      subtitle="Search and manage patient information efficiently"
    >
      <div className="space-y-8">
        {/* Search Statistics */}
        <div className="grid grid-cols-2 gap-6">
          {searchStats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}
                  >
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
                  <p className="text-gray-600">
                    Find patients by name, ID, or contact information
                  </p>
                </div>
              </div>

              <NewPatientDialog onAddPatient={handleAddPatient} />
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No patients found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or use advanced search for
                      more options.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Patient Information */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left Column - Basic Info */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {patient.name}
                                  </h3>
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                    {patient.id}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    {patient.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Age: {getPatientAge(patient.dob)} years
                                </p>
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
                                <span className="truncate">
                                  {patient.email}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-walgreens-blue" />
                                <span className="truncate">
                                  {patient.address}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Medical Info */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">
                                  Insurance
                                </p>
                                <p className="font-semibold text-sm text-gray-900">
                                  {patient.insurance}
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">
                                  Last Visit
                                </p>
                                <p className="font-semibold text-sm text-gray-900">
                                  {patient.lastVisit}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  Active Prescriptions:
                                </span>
                                <Badge className="bg-walgreens-red text-white">
                                  {patient.activeRx}
                                </Badge>
                              </div>

                              <div>
                                <span className="text-sm font-medium text-gray-700 mb-2 block">
                                  Allergies:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {patient.allergies.map((allergy, index) => (
                                    <Badge
                                      key={index}
                                      className={
                                        allergy === "None known"
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-red-100 text-red-800 border-red-200"
                                      }
                                    >
                                      {allergy === "None known" ? (
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

                        {/* Enhanced Action Buttons */}
                        <div className="ml-6 flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600"
                            onClick={() => handleViewProfile(patient)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 hover:border-green-400 hover:bg-green-50 text-green-600"
                            onClick={() => handleViewHistory(patient)}
                          >
                            <History className="w-4 h-4 mr-1" />
                            View History
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-600"
                            onClick={() => handleRefillRequest(patient)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Refill
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-300 hover:border-orange-400 hover:bg-orange-50 text-orange-600"
                            onClick={() => handleSendMessage(patient)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Send Message
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:border-walgreens-red hover:text-walgreens-red"
                            onClick={() => handleNewPrescription(patient)}
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

        {/* Patient Profile Dialog */}
        <Dialog open={isProfileDialogOpen} onOpenChange={() => {
          setIsProfileDialogOpen(false);
          setIsEditMode(false);
          setEditForm({});
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <User className="w-6 h-6 mr-2 text-walgreens-blue" />
                Patient Profile
                {selectedPatient && (
                  <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
                    {selectedPatient.status}
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedPatient && (
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Patient ID: <span className="font-mono font-medium">{selectedPatient.id}</span>
                  </div>
                  <div className="flex space-x-2">
                    {!isEditMode ? (
                      <Button
                        onClick={handleEditProfile}
                        className="bg-walgreens-blue hover:bg-blue-700 text-white"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="border-gray-300 hover:bg-gray-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                      {isEditMode ? (
                        <Input
                          value={editForm.name || ''}
                          onChange={(e) => handleEditFormChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.name}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                      {isEditMode ? (
                        <Input
                          type="date"
                          value={editForm.dob || ''}
                          onChange={(e) => handleEditFormChange('dob', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.dob}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Phone</Label>
                      {isEditMode ? (
                        <Input
                          value={editForm.phone || ''}
                          onChange={(e) => handleEditFormChange('phone', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      {isEditMode ? (
                        <Input
                          type="email"
                          value={editForm.email || ''}
                          onChange={(e) => handleEditFormChange('email', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.email}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">Address</Label>
                      {isEditMode ? (
                        <Textarea
                          value={editForm.address || ''}
                          onChange={(e) => handleEditFormChange('address', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.address}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Emergency Contact</Label>
                      {isEditMode ? (
                        <Input
                          value={editForm.emergencyContact || ''}
                          onChange={(e) => handleEditFormChange('emergencyContact', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.emergencyContact}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                      {isEditMode ? (
                        <Select
                          value={editForm.status || ''}
                          onValueChange={(value) => handleEditFormChange('status', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.status}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Insurance Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-600" />
                    Insurance Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Insurance Provider</Label>
                      {isEditMode ? (
                        <Input
                          value={editForm.insurance || ''}
                          onChange={(e) => handleEditFormChange('insurance', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.insurance}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Policy Number</Label>
                      {isEditMode ? (
                        <Input
                          value={editForm.policyNumber || ''}
                          onChange={(e) => handleEditFormChange('policyNumber', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 font-mono">{selectedPatient.policyNumber}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Preferred Pharmacy</Label>
                      {isEditMode ? (
                        <Select
                          value={editForm.preferredPharmacy || ''}
                          onValueChange={(value) => handleEditFormChange('preferredPharmacy', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Walgreens">Walgreens</SelectItem>
                            <SelectItem value="CVS">CVS</SelectItem>
                            <SelectItem value="Rite Aid">Rite Aid</SelectItem>
                            <SelectItem value="Independent">Independent</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 text-gray-900">{selectedPatient.preferredPharmacy}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-600" />
                    Medical Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Allergies</Label>
                      <div className="mt-1 bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge
                              key={index}
                              className={
                                allergy === "None known"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {allergy === "None known" ? (
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
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Medical Conditions</Label>
                      <div className="mt-1 bg-gray-50 p-4 rounded-lg">
                        {selectedPatient.medicalConditions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.medicalConditions.map((condition, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600">No medical conditions on record</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Current Medications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-green-600" />
                    Current Medications
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.currentMedications.length > 0 ? (
                      selectedPatient.currentMedications.map((medication, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                              <p className="text-sm text-gray-600">
                                {medication.dosage} - {medication.frequency}
                              </p>
                              <p className="text-xs text-gray-500">
                                Prescribed: {medication.prescribedDate} | Last filled: {medication.lastFilled}
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {medication.refillsRemaining} refills left
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">No current medications</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Patient History Dialog */}
        <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <History className="w-6 h-6 mr-2 text-green-600" />
                Patient History
                {selectedPatient && (
                  <span className="ml-3 text-lg font-normal text-gray-600">
                    {selectedPatient.name}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedPatient && (
              <div className="space-y-6">
                {/* Prescription History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-blue-600" />
                    Prescription History
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.prescriptionHistory.length > 0 ? (
                      selectedPatient.prescriptionHistory.map((prescription, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{prescription.medication}</h4>
                              <p className="text-sm text-gray-600">{prescription.dosage}</p>
                              <p className="text-xs text-gray-500">
                                Prescribed by {prescription.prescriber} on {prescription.prescribedDate}
                              </p>
                              <p className="text-xs text-gray-500">
                                Filled: {prescription.filledDate}
                              </p>
                            </div>
                            <Badge className={
                              prescription.status === 'Filled'
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }>
                              {prescription.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">No prescription history available</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Visit History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Visit History
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.visitHistory.length > 0 ? (
                      selectedPatient.visitHistory.map((visit, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{visit.reason}</h4>
                              <p className="text-sm text-gray-600">Pharmacist: {visit.pharmacist}</p>
                              <p className="text-xs text-gray-500">Date: {visit.date}</p>
                              {visit.notes && (
                                <p className="text-sm text-gray-700 mt-2">{visit.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">No visit history available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Refill Request Dialog */}
        <Dialog open={isRefillDialogOpen} onOpenChange={setIsRefillDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <RefreshCw className="w-6 h-6 mr-2 text-purple-600" />
                Refill Request
                {selectedPatient && (
                  <span className="ml-3 text-lg font-normal text-gray-600">
                    {selectedPatient.name}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedPatient && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available for Refill</h3>
                  <div className="space-y-3">
                    {selectedPatient.currentMedications.filter(med => med.refillsRemaining > 0).length > 0 ? (
                      selectedPatient.currentMedications
                        .filter(med => med.refillsRemaining > 0)
                        .map((medication, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {medication.dosage} - {medication.frequency}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Last filled: {medication.lastFilled}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-blue-100 text-blue-800 mb-2">
                                  {medication.refillsRemaining} refills left
                                </Badge>
                                <br />
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleRequestRefill(selectedPatient.id, medication)}>
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Request Refill
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">No medications available for refill</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Send Message Dialog */}
        <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-orange-600" />
                Send Message
                {selectedPatient && (
                  <span className="ml-3 text-lg font-normal text-gray-600">
                    to {selectedPatient.name}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedPatient && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">To: {selectedPatient.email}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Message Type</Label>
                    <Select
                      value={messageForm.type}
                      onValueChange={(value) => setMessageForm(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Information</SelectItem>
                        <SelectItem value="appointment">Appointment Reminder</SelectItem>
                        <SelectItem value="prescription">Prescription Update</SelectItem>
                        <SelectItem value="refill">Refill Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Subject</Label>
                    <Input
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="mt-1"
                      placeholder="Enter message subject..."
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Message</Label>
                    <Textarea
                      value={messageForm.message}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, message: e.target.value }))}
                      className="mt-1"
                      rows={6}
                      placeholder="Enter your message..."
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsMessageDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendEmail}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={!messageForm.subject || !messageForm.message}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PatientLookupPage;
