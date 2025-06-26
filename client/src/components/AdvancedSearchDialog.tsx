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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, RotateCcw, UserCheck, Users, Calendar, CreditCard, MapPin } from 'lucide-react';

interface AdvancedSearchDialogProps {
  onSearch: (criteria: any) => void;
}

export default function AdvancedSearchDialog({ onSearch }: AdvancedSearchDialogProps) {
  const [searchCriteria, setSearchCriteria] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    insurance: '',
    patientId: '',
    address: '',
    ageRange: '',
    hasAllergies: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return Object.values(searchCriteria).filter(value => value !== '').length;
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSearchCriteria({
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      insurance: '',
      patientId: '',
      address: '',
      ageRange: '',
      hasAllergies: ''
    });
  };

  const getActiveFilters = () => {
    const filters = [];
    if (searchCriteria.firstName) filters.push(`First Name: ${searchCriteria.firstName}`);
    if (searchCriteria.lastName) filters.push(`Last Name: ${searchCriteria.lastName}`);
    if (searchCriteria.dob) filters.push(`DOB: ${searchCriteria.dob}`);
    if (searchCriteria.phone) filters.push(`Phone: ${searchCriteria.phone}`);
    if (searchCriteria.email) filters.push(`Email: ${searchCriteria.email}`);
    if (searchCriteria.insurance) filters.push(`Insurance: ${searchCriteria.insurance}`);
    if (searchCriteria.patientId) filters.push(`ID: ${searchCriteria.patientId}`);
    if (searchCriteria.address) filters.push(`Address: ${searchCriteria.address}`);
    if (searchCriteria.ageRange) filters.push(`Age: ${searchCriteria.ageRange}`);
    if (searchCriteria.hasAllergies) filters.push(`Allergies: ${searchCriteria.hasAllergies}`);
    return filters;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Search
          {getActiveFiltersCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-walgreens-blue text-white text-xs px-2 py-0.5 rounded-full">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Advanced Patient Search
              </DialogTitle>
              <p className="text-gray-600">Use multiple criteria to find specific patients</p>
            </div>
          </div>

          {/* Active Filters Summary */}
          {getActiveFiltersCount() > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-800 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Active Filters ({getActiveFiltersCount()})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {getActiveFilters().map((filter, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                      {filter}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-walgreens-blue" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={searchCriteria.firstName}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, firstName: e.target.value })}
                    placeholder="Enter first name"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={searchCriteria.lastName}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={searchCriteria.dob}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, dob: e.target.value })}
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRange" className="text-sm font-medium text-gray-700">
                    Age Range
                  </Label>
                  <Select onValueChange={(value) => setSearchCriteria({ ...searchCriteria, ageRange: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-18">0-18 years</SelectItem>
                      <SelectItem value="19-30">19-30 years</SelectItem>
                      <SelectItem value="31-50">31-50 years</SelectItem>
                      <SelectItem value="51-65">51-65 years</SelectItem>
                      <SelectItem value="65+">65+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-sm font-medium text-gray-700">
                    Patient ID
                  </Label>
                  <Input
                    id="patientId"
                    value={searchCriteria.patientId}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, patientId: e.target.value })}
                    placeholder="e.g. PT001"
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
                <MapPin className="w-5 h-5 mr-2 text-walgreens-blue" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={searchCriteria.phone}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={searchCriteria.email}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, email: e.target.value })}
                    placeholder="patient@email.com"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={searchCriteria.address}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, address: e.target.value })}
                    placeholder="123 Main St, City, State"
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
                <CreditCard className="w-5 h-5 mr-2 text-walgreens-blue" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance" className="text-sm font-medium text-gray-700">
                    Insurance Provider
                  </Label>
                  <Select onValueChange={(value) => setSearchCriteria({ ...searchCriteria, insurance: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="united">United Healthcare</SelectItem>
                      <SelectItem value="humana">Humana</SelectItem>
                      <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hasAllergies" className="text-sm font-medium text-gray-700">
                    Allergy Status
                  </Label>
                  <Select onValueChange={(value) => setSearchCriteria({ ...searchCriteria, hasAllergies: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select allergy status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="has-allergies">Has Known Allergies</SelectItem>
                      <SelectItem value="no-allergies">No Known Allergies</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center space-x-2 border-gray-300 hover:border-gray-400"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Patients
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
