
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, User, Pill, FileText, Search } from 'lucide-react';

const NewPrescriptionPage = () => {
  const [step, setStep] = useState(1);

  return (
    <Layout title="New Prescription Entry" subtitle="Enter and process new prescription orders">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-walgreens-red" />
              Prescription Entry - Step {step} of 4
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    num <= step ? 'bg-walgreens-red text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Patient Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search by name, DOB, or phone..." className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <Input placeholder="Enter patient ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input placeholder="Last name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input placeholder="(555) 123-4567" />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Patient Found</h4>
                  <div className="text-sm text-blue-800">
                    <p><strong>John Smith</strong> - DOB: 03/15/1965</p>
                    <p>Phone: (555) 123-4567 | Insurance: BCBS</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">Verified</Badge>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Prescription Details
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                    <Input placeholder="Search medication..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NDC Number</label>
                    <Input placeholder="Enter NDC" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
                    <Input placeholder="e.g., 10mg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="capsule">Capsule</SelectItem>
                        <SelectItem value="liquid">Liquid</SelectItem>
                        <SelectItem value="cream">Cream</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input placeholder="30" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Days Supply</label>
                    <Input placeholder="30" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                    <Input placeholder="3" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <Select>
                      <SelectTrigger>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Directions for Use</label>
                  <Input placeholder="Take 1 tablet by mouth daily" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Prescriber & Insurance
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prescriber Name</label>
                    <Input placeholder="Dr. John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DEA Number</label>
                    <Input placeholder="DEA123456789" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NPI</label>
                    <Input placeholder="1234567890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prescriber Phone</label>
                    <Input placeholder="(555) 123-4567" />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Insurance Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Plan</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select insurance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="aetna">Aetna</SelectItem>
                          <SelectItem value="humana">Humana</SelectItem>
                          <SelectItem value="cash">Cash Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                      <Input placeholder="Insurance member ID" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
                      <Input placeholder="Group number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Copay</label>
                      <Input placeholder="$10.00" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Review & Submit</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Prescription Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Patient:</strong> John Smith</p>
                      <p><strong>DOB:</strong> 03/15/1965</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                    </div>
                    <div>
                      <p><strong>Medication:</strong> Lisinopril 10mg Tablets</p>
                      <p><strong>Quantity:</strong> 30 tablets</p>
                      <p><strong>Refills:</strong> 3</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm"><strong>Prescriber:</strong> Dr. Johnson | <strong>Insurance:</strong> BCBS</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Drug Interaction Check</h4>
                  <p className="text-sm text-yellow-700">No major interactions found. Patient allergies verified.</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button 
                  className="bg-walgreens-red hover:bg-walgreens-red-dark"
                  onClick={() => setStep(step + 1)}
                >
                  Next Step
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  Submit Prescription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewPrescriptionPage;
