import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Plus,
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Heart,
    AlertTriangle,
    FileText,
    Shield,
    CheckCircle
} from 'lucide-react';

interface NewPatientDialogProps {
    onAddPatient: (patient: any) => void;
}

const NewPatientDialog = ({ onAddPatient }: NewPatientDialogProps) => {
    const [open, setOpen] = useState(false);
    const [patientData, setPatientData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        ssn: '',

        // Contact Information
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',

        // Insurance Information
        insuranceProvider: '',
        insuranceId: '',
        groupNumber: '',

        // Medical Information
        allergies: [''],
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',

        // Additional Notes
        notes: '',

        // Consent & Preferences
        emailNotifications: true,
        smsNotifications: false,
        marketingConsent: false
    });

    const stateOptions = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const insuranceProviders = [
        'Blue Cross Blue Shield',
        'Aetna',
        'Cigna',
        'United Healthcare',
        'Humana',
        'Anthem',
        'Kaiser Permanente',
        'Medicare',
        'Medicaid',
        'Other'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPatient = {
            id: `PT${Date.now().toString().slice(-3)}`,
            name: `${patientData.firstName} ${patientData.lastName}`,
            dob: patientData.dateOfBirth,
            phone: patientData.phone,
            email: patientData.email,
            address: `${patientData.address}, ${patientData.city}, ${patientData.state} ${patientData.zipCode}`,
            insurance: patientData.insuranceProvider,
            lastVisit: new Date().toLocaleDateString(),
            activeRx: 0,
            allergies: patientData.allergies.filter(allergy => allergy.trim() !== ''),
            status: 'Active',
            // Additional fields for comprehensive patient record
            fullData: patientData
        };

        onAddPatient(newPatient);

        // Reset form
        setPatientData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            ssn: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            insuranceProvider: '',
            insuranceId: '',
            groupNumber: '',
            allergies: [''],
            emergencyContactName: '',
            emergencyContactPhone: '',
            emergencyContactRelation: '',
            notes: '',
            emailNotifications: true,
            smsNotifications: false,
            marketingConsent: false
        });

        setOpen(false);
    };

    const handleAddAllergy = () => {
        setPatientData({
            ...patientData,
            allergies: [...patientData.allergies, '']
        });
    };

    const handleRemoveAllergy = (index: number) => {
        const newAllergies = patientData.allergies.filter((_, i) => i !== index);
        setPatientData({
            ...patientData,
            allergies: newAllergies.length > 0 ? newAllergies : ['']
        });
    };

    const handleAllergyChange = (index: number, value: string) => {
        const newAllergies = [...patientData.allergies];
        newAllergies[index] = value;
        setPatientData({
            ...patientData,
            allergies: newAllergies
        });
    };

    const isFormValid = () => {
        return patientData.firstName && patientData.lastName &&
            patientData.dateOfBirth && patientData.phone &&
            patientData.address && patientData.city &&
            patientData.state && patientData.zipCode;
    };

    const getAge = () => {
        if (!patientData.dateOfBirth) return '';
        const today = new Date();
        const birthDate = new Date(patientData.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Patient
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                Add New Patient
                            </DialogTitle>
                            <p className="text-gray-600">Register a new patient in the system</p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <User className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                        First Name *
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={patientData.firstName}
                                        onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                                        placeholder="Enter first name"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                        Last Name *
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={patientData.lastName}
                                        onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                                        placeholder="Enter last name"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                                        Date of Birth *
                                    </Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={patientData.dateOfBirth}
                                        onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                    {patientData.dateOfBirth && (
                                        <p className="text-xs text-gray-500">Age: {getAge()} years</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                                        Gender
                                    </Label>
                                    <Select value={patientData.gender} onValueChange={(value) => setPatientData({ ...patientData, gender: value })}>
                                        <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ssn" className="text-sm font-medium text-gray-700">
                                        SSN (Last 4 digits)
                                    </Label>
                                    <Input
                                        id="ssn"
                                        value={patientData.ssn}
                                        onChange={(e) => setPatientData({ ...patientData, ssn: e.target.value })}
                                        placeholder="####"
                                        maxLength={4}
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <Phone className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        value={patientData.phone}
                                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                                        placeholder="(555) 123-4567"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={patientData.email}
                                        onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                        placeholder="patient@example.com"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Street Address *
                                </Label>
                                <Input
                                    id="address"
                                    value={patientData.address}
                                    onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                                    placeholder="123 Main Street"
                                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                        City *
                                    </Label>
                                    <Input
                                        id="city"
                                        value={patientData.city}
                                        onChange={(e) => setPatientData({ ...patientData, city: e.target.value })}
                                        placeholder="Anytown"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                        State *
                                    </Label>
                                    <Select value={patientData.state} onValueChange={(value) => setPatientData({ ...patientData, state: value })}>
                                        <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stateOptions.map((state) => (
                                                <SelectItem key={state} value={state}>{state}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                                        ZIP Code *
                                    </Label>
                                    <Input
                                        id="zipCode"
                                        value={patientData.zipCode}
                                        onChange={(e) => setPatientData({ ...patientData, zipCode: e.target.value })}
                                        placeholder="12345"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Insurance Information */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <Shield className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Insurance Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="insuranceProvider" className="text-sm font-medium text-gray-700">
                                        Insurance Provider
                                    </Label>
                                    <Select value={patientData.insuranceProvider} onValueChange={(value) => setPatientData({ ...patientData, insuranceProvider: value })}>
                                        <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                            <SelectValue placeholder="Select provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {insuranceProviders.map((provider) => (
                                                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="insuranceId" className="text-sm font-medium text-gray-700">
                                        Insurance ID
                                    </Label>
                                    <Input
                                        id="insuranceId"
                                        value={patientData.insuranceId}
                                        onChange={(e) => setPatientData({ ...patientData, insuranceId: e.target.value })}
                                        placeholder="Insurance member ID"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="groupNumber" className="text-sm font-medium text-gray-700">
                                        Group Number
                                    </Label>
                                    <Input
                                        id="groupNumber"
                                        value={patientData.groupNumber}
                                        onChange={(e) => setPatientData({ ...patientData, groupNumber: e.target.value })}
                                        placeholder="Group number"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Medical Information */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <Heart className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Medical Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Known Allergies
                                </Label>
                                <div className="space-y-2">
                                    {patientData.allergies.map((allergy, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Input
                                                value={allergy}
                                                onChange={(e) => handleAllergyChange(index, e.target.value)}
                                                placeholder="Enter allergy or 'None known'"
                                                className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                            />
                                            {patientData.allergies.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRemoveAllergy(index)}
                                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddAllergy}
                                        className="border-green-200 text-green-600 hover:bg-green-50"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Another Allergy
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContactName" className="text-sm font-medium text-gray-700">
                                        Emergency Contact Name
                                    </Label>
                                    <Input
                                        id="emergencyContactName"
                                        value={patientData.emergencyContactName}
                                        onChange={(e) => setPatientData({ ...patientData, emergencyContactName: e.target.value })}
                                        placeholder="Full name"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContactPhone" className="text-sm font-medium text-gray-700">
                                        Emergency Contact Phone
                                    </Label>
                                    <Input
                                        id="emergencyContactPhone"
                                        value={patientData.emergencyContactPhone}
                                        onChange={(e) => setPatientData({ ...patientData, emergencyContactPhone: e.target.value })}
                                        placeholder="(555) 123-4567"
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="emergencyContactRelation" className="text-sm font-medium text-gray-700">
                                        Relationship
                                    </Label>
                                    <Select value={patientData.emergencyContactRelation} onValueChange={(value) => setPatientData({ ...patientData, emergencyContactRelation: value })}>
                                        <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                            <SelectValue placeholder="Select relationship" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="spouse">Spouse</SelectItem>
                                            <SelectItem value="parent">Parent</SelectItem>
                                            <SelectItem value="child">Child</SelectItem>
                                            <SelectItem value="sibling">Sibling</SelectItem>
                                            <SelectItem value="friend">Friend</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Notes */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Additional Notes & Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                    Notes
                                </Label>
                                <Textarea
                                    id="notes"
                                    value={patientData.notes}
                                    onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
                                    placeholder="Any additional notes about the patient"
                                    rows={3}
                                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700">Communication Preferences</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="emailNotifications"
                                            checked={patientData.emailNotifications}
                                            onCheckedChange={(checked) => setPatientData({ ...patientData, emailNotifications: checked as boolean })}
                                        />
                                        <Label htmlFor="emailNotifications" className="text-sm text-gray-700">
                                            Email notifications for prescription reminders
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="smsNotifications"
                                            checked={patientData.smsNotifications}
                                            onCheckedChange={(checked) => setPatientData({ ...patientData, smsNotifications: checked as boolean })}
                                        />
                                        <Label htmlFor="smsNotifications" className="text-sm text-gray-700">
                                            SMS notifications for prescription updates
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="marketingConsent"
                                            checked={patientData.marketingConsent}
                                            onCheckedChange={(checked) => setPatientData({ ...patientData, marketingConsent: checked as boolean })}
                                        />
                                        <Label htmlFor="marketingConsent" className="text-sm text-gray-700">
                                            Marketing communications and health tips
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Summary */}
                    {isFormValid() && (
                        <Card className="border border-green-200 bg-green-50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-green-900 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Patient Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <h4 className="font-semibold text-gray-900 mb-2">Patient Details</h4>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="text-gray-600">Name:</span> {patientData.firstName} {patientData.lastName}</p>
                                            <p><span className="text-gray-600">Age:</span> {getAge()} years</p>
                                            <p><span className="text-gray-600">Phone:</span> {patientData.phone}</p>
                                            <p><span className="text-gray-600">Email:</span> {patientData.email || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <h4 className="font-semibold text-gray-900 mb-2">Insurance & Address</h4>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="text-gray-600">Insurance:</span> {patientData.insuranceProvider || 'Not provided'}</p>
                                            <p><span className="text-gray-600">City:</span> {patientData.city}</p>
                                            <p><span className="text-gray-600">State:</span> {patientData.state}</p>
                                            <p><span className="text-gray-600">Allergies:</span> {patientData.allergies.filter(a => a.trim()).length || 'None specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Separator className="my-6" />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-gray-300 hover:border-gray-400"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={!isFormValid()}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Patient
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewPatientDialog; 