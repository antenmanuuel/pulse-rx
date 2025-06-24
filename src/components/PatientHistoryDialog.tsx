
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Pill, Calendar, DollarSign } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
}

interface PatientHistoryDialogProps {
  patient: Patient;
}

export default function PatientHistoryDialog({ patient }: PatientHistoryDialogProps) {
  const prescriptionHistory = [
    {
      id: 'RX001',
      medication: 'Lisinopril 10mg',
      prescriber: 'Dr. Smith',
      fillDate: '12/15/2023',
      quantity: '30 tablets',
      status: 'Completed',
      cost: '$15.99'
    },
    {
      id: 'RX002',
      medication: 'Metformin 500mg',
      prescriber: 'Dr. Johnson',
      fillDate: '12/10/2023',
      quantity: '60 tablets',
      status: 'Completed',
      cost: '$12.50'
    },
    {
      id: 'RX003',
      medication: 'Atorvastatin 20mg',
      prescriber: 'Dr. Smith',
      fillDate: '12/05/2023',
      quantity: '30 tablets',
      status: 'Completed',
      cost: '$25.75'
    }
  ];

  const visitHistory = [
    {
      date: '12/15/2023',
      type: 'Prescription Pickup',
      pharmacist: 'John Doe, PharmD',
      notes: 'Medication counseling provided for new prescription'
    },
    {
      date: '12/10/2023',
      type: 'Consultation',
      pharmacist: 'Jane Smith, PharmD',
      notes: 'Blood pressure monitoring and medication review'
    },
    {
      date: '12/05/2023',
      type: 'Prescription Pickup',
      pharmacist: 'Mike Johnson, PharmD',
      notes: 'Regular refill, no issues reported'
    }
  ];

  const billingHistory = [
    {
      date: '12/15/2023',
      description: 'Lisinopril 10mg - 30 tablets',
      amount: '$15.99',
      insurance: 'Blue Cross Blue Shield',
      copay: '$5.00',
      status: 'Paid'
    },
    {
      date: '12/10/2023',
      description: 'Metformin 500mg - 60 tablets',
      amount: '$12.50',
      insurance: 'Blue Cross Blue Shield',
      copay: '$5.00',
      status: 'Paid'
    },
    {
      date: '12/05/2023',
      description: 'Atorvastatin 20mg - 30 tablets',
      amount: '$25.75',
      insurance: 'Blue Cross Blue Shield',
      copay: '$10.00',
      status: 'Paid'
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <FileText className="w-4 h-4 mr-1" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-walgreens-red" />
            Patient History - {patient.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="prescriptions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Prescription History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptionHistory.map((rx) => (
                    <div key={rx.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{rx.medication}</h4>
                            <Badge variant="outline">{rx.id}</Badge>
                            <Badge 
                              className={rx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {rx.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Prescriber: {rx.prescriber}</p>
                          <p className="text-sm text-gray-600">Quantity: {rx.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Fill Date</p>
                          <p className="font-medium">{rx.fillDate}</p>
                          <p className="text-sm font-medium text-green-600">{rx.cost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Visit History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visitHistory.map((visit, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{visit.type}</h4>
                            <Badge variant="outline">{visit.date}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Pharmacist: {visit.pharmacist}</p>
                          <p className="text-sm text-gray-700 mt-1">{visit.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((bill, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{bill.description}</h4>
                            <Badge 
                              className={bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              {bill.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Insurance: {bill.insurance}</p>
                          <p className="text-sm text-gray-600">Copay: {bill.copay}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{bill.date}</p>
                          <p className="text-lg font-semibold text-green-600">{bill.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
