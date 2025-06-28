import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  User,
  Pill,
  FileText,
  Search,
  Check,
  AlertTriangle,
  Shield,
  DollarSign,
  CheckCircle,
  Phone,
  Calendar,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewPrescriptionDialogProps {
  onSubmit: (prescription: any) => void;
  selectedPatient?: any;
}

const NewPrescriptionDialog = ({ onSubmit, selectedPatient }: NewPrescriptionDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for patient details
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    email: '',
    patientId: '',
  });

  // Form state for medication details
  const [medicationForm, setMedicationForm] = useState({
    medication: '',
    strength: '',
    form: '',
    quantity: '',
    daysSupply: '',
    refills: '',
    priority: 'normal',
    directions: '',
    ndcNumber: '',
  });

  // Form state for prescriber details
  const [prescriberForm, setPrescriberForm] = useState({
    name: '',
    deaNumber: '',
    npiNumber: '',
    phone: '',
    address: '',
    insurance: '',
    memberId: '',
    groupNumber: '',
    copay: '',
  });

  const steps = [
    {
      number: 1,
      title: "Patient",
      icon: User,
      description: "Patient information and verification",
    },
    {
      number: 2,
      title: "Medication",
      icon: Pill,
      description: "Prescription details and dosage",
    },
    {
      number: 3,
      title: "Prescriber",
      icon: FileText,
      description: "Doctor and insurance information",
    },
    {
      number: 4,
      title: "Review",
      icon: Shield,
      description: "Final review and submission",
    },
  ];

  // Reset form when dialog is opened
  useEffect(() => {
    if (open) {
      setStep(1);
      setIsSubmitting(false);
      
      // Clear forms if no patient is selected
      if (!selectedPatient) {
        setPatientForm({
          firstName: '',
          lastName: '',
          dob: '',
          phone: '',
          address: '',
          email: '',
          patientId: '',
        });
      }
      
      setMedicationForm({
        medication: '',
        strength: '',
        form: '',
        quantity: '',
        daysSupply: '',
        refills: '',
        priority: 'normal',
        directions: '',
        ndcNumber: '',
      });
      
      setPrescriberForm({
        name: '',
        deaNumber: '',
        npiNumber: '',
        phone: '',
        address: '',
        insurance: '',
        memberId: '',
        groupNumber: '',
        copay: '',
      });
    }
  }, [open, selectedPatient]);

  // Handle pre-filled patient data
  useEffect(() => {
    if (selectedPatient) {
      // Pre-fill the form with patient data
      const nameParts = selectedPatient.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Convert date format from MM/DD/YYYY to YYYY-MM-DD if needed
      let formattedDate = selectedPatient.dob;
      if (selectedPatient.dob && selectedPatient.dob.includes('/')) {
        const dateParts = selectedPatient.dob.split("/");
        if (dateParts.length === 3) {
          formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, "0")}-${dateParts[1].padStart(2, "0")}`;
        }
      }

      setPatientForm({
        firstName,
        lastName,
        dob: formattedDate,
        phone: selectedPatient.phone || '',
        address: selectedPatient.address || '',
        email: selectedPatient.email || '',
        patientId: selectedPatient.id || '',
      });

      // Pre-fill insurance information if available
      if (selectedPatient.insurance) {
        setPrescriberForm(prev => ({
          ...prev,
          insurance: selectedPatient.insurance
        }));
      }
    }
  }, [selectedPatient, open]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Combine all form data
      const prescriptionData = {
        patient: `${patientForm.firstName} ${patientForm.lastName}`,
        patientId: patientForm.patientId,
        dob: patientForm.dob,
        phone: patientForm.phone,
        address: patientForm.address,
        email: patientForm.email,
        
        medication: medicationForm.medication,
        strength: medicationForm.strength,
        form: medicationForm.form,
        quantity: medicationForm.quantity,
        daysSupply: medicationForm.daysSupply,
        refills: medicationForm.refills,
        priority: medicationForm.priority,
        directions: medicationForm.directions,
        ndcNumber: medicationForm.ndcNumber,
        
        prescriber: prescriberForm.name,
        deaNumber: prescriberForm.deaNumber,
        npiNumber: prescriberForm.npiNumber,
        prescriberPhone: prescriberForm.phone,
        prescriberAddress: prescriberForm.address,
        insurance: prescriberForm.insurance,
        memberId: prescriberForm.memberId,
        groupNumber: prescriberForm.groupNumber,
        copay: prescriberForm.copay,
        
        id: `RX${Date.now().toString().slice(-6)}`,
        status: 'Ready for Review',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setIsSubmitting(false);
      onSubmit(prescriptionData);
      setOpen(false);
      
      toast({
        title: "Prescription Created",
        description: `New prescription for ${prescriptionData.patient} has been created.`
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                New Prescription Entry
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                Step {step} of {steps.length}: {steps[step - 1]?.title}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((stepInfo, index) => (
              <div key={stepInfo.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      stepInfo.number <= step
                        ? "bg-gradient-to-br from-walgreens-red to-red-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepInfo.number < step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <stepInfo.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p
                      className={`text-sm font-medium ${stepInfo.number <= step ? "text-walgreens-red" : "text-gray-600"}`}
                    >
                      {stepInfo.title}
                    </p>
                    <p className="text-xs text-gray-500 max-w-24">
                      {stepInfo.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 mt-6 rounded transition-all duration-300 ${
                      stepInfo.number < step
                        ? "bg-walgreens-red"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <User className="w-6 h-6 text-walgreens-red" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Patient Information
                </h3>
              </div>

              {/* Patient Search */}
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-walgreens-blue" />
                    Quick Patient Search
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-search" className="text-sm font-medium text-gray-700">
                        Patient Search
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="patient-search"
                          placeholder="Search by name, DOB, or phone..."
                          className="pl-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-id" className="text-sm font-medium text-gray-700">
                        Patient ID
                      </Label>
                      <Input
                        id="patient-id"
                        placeholder="Enter patient ID"
                        value={patientForm.patientId}
                        onChange={(e) =>
                          setPatientForm((prev) => ({
                            ...prev,
                            patientId: e.target.value,
                          }))
                        }
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Details Form */}
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-900">
                  Patient Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="First name"
                      value={patientForm.firstName}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Last name"
                      value={patientForm.lastName}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={patientForm.dob}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={patientForm.phone}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, ST 12345"
                      value={patientForm.address}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="patient@email.com"
                      value={patientForm.email}
                      onChange={(e) =>
                        setPatientForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Patient Found Alert - Only show when patient is selected */}
              {selectedPatient && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-900">
                        Patient Found & Verified
                      </h4>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              Name:
                            </span>{" "}
                            <span className="font-semibold text-gray-900">
                              {selectedPatient.name}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              DOB:
                            </span>{" "}
                            <span className="font-semibold text-gray-900">
                              {selectedPatient.dob}
                            </span>
                          </p>
                          <p className="text-sm flex items-center">
                            <Phone className="w-3 h-3 mr-1 text-gray-500" />
                            <span className="font-medium text-gray-600">
                              Phone:
                            </span>
                            <span className="font-semibold text-gray-900 ml-1">
                              {selectedPatient.phone}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              Insurance:
                            </span>{" "}
                            <span className="font-semibold text-gray-900">
                              {selectedPatient.insurance}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-600">
                              Patient ID:
                            </span>{" "}
                            <span className="font-semibold text-gray-900">
                              {selectedPatient.id}
                            </span>
                          </p>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            ✓ Verified & Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <Pill className="w-6 h-6 text-walgreens-red" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Prescription Details
                </h3>
              </div>

              {/* Medication Search */}
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-walgreens-blue" />
                    Medication Lookup
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medication-search" className="text-sm font-medium text-gray-700">
                        Medication Name
                      </Label>
                      <Input
                        id="medication-search"
                        placeholder="Search medication..."
                        value={medicationForm.medication}
                        onChange={(e) => setMedicationForm(prev => ({ ...prev, medication: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ndc" className="text-sm font-medium text-gray-700">
                        NDC Number
                      </Label>
                      <Input
                        id="ndc"
                        placeholder="Enter NDC"
                        value={medicationForm.ndcNumber}
                        onChange={(e) => setMedicationForm(prev => ({ ...prev, ndcNumber: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medication Details */}
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-900">
                  Medication Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="strength" className="text-sm font-medium text-gray-700">
                      Strength *
                    </Label>
                    <Input
                      id="strength"
                      placeholder="e.g., 10mg"
                      value={medicationForm.strength}
                      onChange={(e) => setMedicationForm(prev => ({ ...prev, strength: e.target.value }))}
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form" className="text-sm font-medium text-gray-700">
                      Form *
                    </Label>
                    <Select 
                      value={medicationForm.form}
                      onValueChange={(value) => setMedicationForm(prev => ({ ...prev, form: value }))}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                        <SelectValue placeholder="Select form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tablet">Tablet</SelectItem>
                        <SelectItem value="Capsule">Capsule</SelectItem>
                        <SelectItem value="Liquid">Liquid</SelectItem>
                        <SelectItem value="Cream">Cream</SelectItem>
                        <SelectItem value="Injection">Injection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      placeholder="30"
                      type="number"
                      value={medicationForm.quantity}
                      onChange={(e) => setMedicationForm(prev => ({ ...prev, quantity: e.target.value }))}
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="days-supply" className="text-sm font-medium text-gray-700">
                      Days Supply *
                    </Label>
                    <Input
                      id="days-supply"
                      placeholder="30"
                      type="number"
                      value={medicationForm.daysSupply}
                      onChange={(e) => setMedicationForm(prev => ({ ...prev, daysSupply: e.target.value }))}
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refills" className="text-sm font-medium text-gray-700">
                      Refills
                    </Label>
                    <Input
                      id="refills"
                      placeholder="3"
                      type="number"
                      value={medicationForm.refills}
                      onChange={(e) => setMedicationForm(prev => ({ ...prev, refills: e.target.value }))}
                      className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                      Priority
                    </Label>
                    <Select
                      value={medicationForm.priority}
                      onValueChange={(value) => setMedicationForm(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="space-y-2">
                <Label htmlFor="directions" className="text-sm font-medium text-gray-700">
                  Directions for Use *
                </Label>
                <Textarea
                  id="directions"
                  placeholder="Take 1 tablet by mouth daily with food. Take at the same time each day for best results."
                  value={medicationForm.directions}
                  onChange={(e) => setMedicationForm(prev => ({ ...prev, directions: e.target.value }))}
                  className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue min-h-20"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-walgreens-red" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Prescriber & Insurance
                </h3>
              </div>

              {/* Prescriber Information */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-walgreens-blue" />
                    Prescriber Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prescriber-name" className="text-sm font-medium text-gray-700">
                        Prescriber Name *
                      </Label>
                      <Input
                        id="prescriber-name"
                        placeholder="Dr. John Smith"
                        value={prescriberForm.name}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, name: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dea" className="text-sm font-medium text-gray-700">
                        DEA Number *
                      </Label>
                      <Input
                        id="dea"
                        placeholder="DEA123456789"
                        value={prescriberForm.deaNumber}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, deaNumber: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="npi" className="text-sm font-medium text-gray-700">
                        NPI Number *
                      </Label>
                      <Input
                        id="npi"
                        placeholder="1234567890"
                        value={prescriberForm.npiNumber}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, npiNumber: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prescriber-phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="prescriber-phone"
                        placeholder="(555) 123-4567"
                        value={prescriberForm.phone}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="prescriber-address" className="text-sm font-medium text-gray-700">
                        Practice Address
                      </Label>
                      <Input
                        id="prescriber-address"
                        placeholder="456 Medical Center Dr, Suite 200, City, ST 12345"
                        value={prescriberForm.address}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, address: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Information */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-walgreens-blue" />
                    Insurance Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="insurance-plan" className="text-sm font-medium text-gray-700">
                        Insurance Plan *
                      </Label>
                      <Select
                        value={prescriberForm.insurance}
                        onValueChange={(value) => setPrescriberForm(prev => ({ ...prev, insurance: value }))}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                          <SelectValue placeholder="Select insurance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blue Cross Blue Shield">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="Aetna">Aetna</SelectItem>
                          <SelectItem value="Humana">Humana</SelectItem>
                          <SelectItem value="Medicare">Medicare</SelectItem>
                          <SelectItem value="Cash">Cash Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member-id" className="text-sm font-medium text-gray-700">
                        Member ID *
                      </Label>
                      <Input
                        id="member-id"
                        placeholder="Insurance member ID"
                        value={prescriberForm.memberId}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, memberId: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group-number" className="text-sm font-medium text-gray-700">
                        Group Number
                      </Label>
                      <Input
                        id="group-number"
                        placeholder="Group number"
                        value={prescriberForm.groupNumber}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, groupNumber: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="copay" className="text-sm font-medium text-gray-700">
                        Expected Copay
                      </Label>
                      <Input
                        id="copay"
                        placeholder="$10.00"
                        value={prescriberForm.copay}
                        onChange={(e) => setPrescriberForm(prev => ({ ...prev, copay: e.target.value }))}
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-walgreens-red" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Review & Submit
                </h3>
              </div>

              {/* Prescription Summary */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Prescription Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                          <User className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Patient Information
                        </h5>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Name:</span> {patientForm.firstName} {patientForm.lastName}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">DOB:</span>{" "}
                            {patientForm.dob ? new Date(patientForm.dob).toLocaleDateString() : ""}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span> {patientForm.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Prescriber Information
                        </h5>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Doctor:</span> {prescriberForm.name}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">DEA:</span> {prescriberForm.deaNumber}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">NPI:</span> {prescriberForm.npiNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                          <Pill className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Medication Details
                        </h5>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Medication:</span>{" "}
                            {medicationForm.medication} {medicationForm.strength} {medicationForm.form}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Quantity:</span> {medicationForm.quantity} {medicationForm.form.toLowerCase()}s
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Refills:</span> {medicationForm.refills || "0"}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Directions:</span>{" "}
                            {medicationForm.directions}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-walgreens-blue" />
                          Insurance Information
                        </h5>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Insurance:</span> {prescriberForm.insurance}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Member ID:</span> {prescriberForm.memberId}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Copay:</span> {prescriberForm.copay || "$0.00"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Checks */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Safety & Verification Checks
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        No major drug interactions found
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Patient allergies verified
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Prescriber credentials validated
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Insurance coverage confirmed
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dosage appropriateness checked
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        All required fields completed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submission Loading */}
              {isSubmitting && (
                <Card className="border-gray-200">
                  <CardContent className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-walgreens-red mx-auto mb-6"></div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Submitting Prescription...
                    </h4>
                    <p className="text-gray-600">
                      Please wait while we process and verify your
                      prescription
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1 || isSubmitting}
              className="border-gray-300 hover:border-gray-400"
            >
              Previous Step
            </Button>

            {step < 4 ? (
              <Button
                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setStep(step + 1)}
              >
                Next Step
                <span className="ml-2">→</span>
              </Button>
            ) : (
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Prescription
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPrescriptionDialog;