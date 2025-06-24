
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
import { Search } from 'lucide-react';

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
    address: ''
  });

  const handleSearch = () => {
    onSearch(searchCriteria);
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
      address: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
          Advanced Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-walgreens-red" />
            Advanced Patient Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={searchCriteria.firstName}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, firstName: e.target.value })}
              placeholder="Enter first name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={searchCriteria.lastName}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, lastName: e.target.value })}
              placeholder="Enter last name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={searchCriteria.dob}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, dob: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={searchCriteria.phone}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={searchCriteria.email}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, email: e.target.value })}
              placeholder="patient@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              value={searchCriteria.patientId}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, patientId: e.target.value })}
              placeholder="PT001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="insurance">Insurance Provider</Label>
            <Select onValueChange={(value) => setSearchCriteria({ ...searchCriteria, insurance: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select insurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                <SelectItem value="aetna">Aetna</SelectItem>
                <SelectItem value="medicare">Medicare</SelectItem>
                <SelectItem value="medicaid">Medicaid</SelectItem>
                <SelectItem value="cigna">Cigna</SelectItem>
                <SelectItem value="united">United Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={searchCriteria.address}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, address: e.target.value })}
              placeholder="123 Main St, City, State"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSearch} className="bg-walgreens-blue hover:bg-walgreens-blue/90">
            Search Patients
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
