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
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Pill,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
}

interface PatientHistoryDialogProps {
  patient: Patient;
}

export default function PatientHistoryDialog({ patient }: PatientHistoryDialogProps) {
  const [activeTab, setActiveTab] = useState('prescriptions');

  const prescriptionHistory = [
    {
      id: 'RX001',
      medication: 'Lisinopril 10mg',
      prescriber: 'Dr. Smith',
      fillDate: '12/15/2023',
      quantity: '30 tablets',
      status: 'Completed',
      cost: '$15.99',
      refills: '5 remaining'
    },
    {
      id: 'RX002',
      medication: 'Metformin 500mg',
      prescriber: 'Dr. Johnson',
      fillDate: '12/10/2023',
      quantity: '60 tablets',
      status: 'Completed',
      cost: '$12.50',
      refills: '3 remaining'
    },
    {
      id: 'RX003',
      medication: 'Atorvastatin 20mg',
      prescriber: 'Dr. Smith',
      fillDate: '12/05/2023',
      quantity: '30 tablets',
      status: 'Completed',
      cost: '$25.75',
      refills: '2 remaining'
    },
    {
      id: 'RX004',
      medication: 'Ibuprofen 400mg',
      prescriber: 'Dr. Wilson',
      fillDate: '11/28/2023',
      quantity: '20 tablets',
      status: 'Expired',
      cost: '$8.99',
      refills: '0 remaining'
    }
  ];

  const visitHistory = [
    {
      date: '12/15/2023',
      type: 'Prescription Pickup',
      pharmacist: 'John Doe, PharmD',
      notes: 'Medication counseling provided for new prescription',
      duration: '15 minutes',
      status: 'Completed'
    },
    {
      date: '12/10/2023',
      type: 'Consultation',
      pharmacist: 'Jane Smith, PharmD',
      notes: 'Blood pressure monitoring and medication review',
      duration: '25 minutes',
      status: 'Completed'
    },
    {
      date: '12/05/2023',
      type: 'Prescription Pickup',
      pharmacist: 'Mike Johnson, PharmD',
      notes: 'Regular refill, no issues reported',
      duration: '5 minutes',
      status: 'Completed'
    },
    {
      date: '11/28/2023',
      type: 'Medication Review',
      pharmacist: 'Sarah Davis, PharmD',
      notes: 'Annual medication therapy management session',
      duration: '45 minutes',
      status: 'Completed'
    }
  ];

  const billingHistory = [
    {
      date: '12/15/2023',
      description: 'Lisinopril 10mg - 30 tablets',
      amount: '$15.99',
      insurance: 'Blue Cross Blue Shield',
      copay: '$5.00',
      status: 'Paid',
      method: 'Credit Card'
    },
    {
      date: '12/10/2023',
      description: 'Metformin 500mg - 60 tablets',
      amount: '$12.50',
      insurance: 'Blue Cross Blue Shield',
      copay: '$5.00',
      status: 'Paid',
      method: 'Insurance'
    },
    {
      date: '12/05/2023',
      description: 'Atorvastatin 20mg - 30 tablets',
      amount: '$25.75',
      insurance: 'Blue Cross Blue Shield',
      copay: '$10.00',
      status: 'Paid',
      method: 'Cash'
    },
    {
      date: '11/28/2023',
      description: 'Consultation Fee',
      amount: '$35.00',
      insurance: 'Blue Cross Blue Shield',
      copay: '$15.00',
      status: 'Pending',
      method: 'Credit Card'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'expired':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const historyStats = [
    { label: 'Total Prescriptions', value: prescriptionHistory.length, icon: Pill, color: 'text-blue-600' },
    { label: 'Total Visits', value: visitHistory.length, icon: Calendar, color: 'text-green-600' },
    { label: 'Total Spent', value: `$${billingHistory.reduce((sum, bill) => sum + parseFloat(bill.amount.slice(1)), 0).toFixed(2)}`, icon: DollarSign, color: 'text-purple-600' },
    { label: 'Active Medications', value: prescriptionHistory.filter(rx => rx.status === 'Completed').length, icon: Activity, color: 'text-red-600' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue shadow-sm hover:shadow-md transition-all duration-300"
        >
          <FileText className="w-4 h-4 mr-1" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-walgreens-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Patient History - {patient.name}
                </DialogTitle>
                <p className="text-gray-600 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Complete medical and billing history</span>
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          {/* History Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {historyStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="prescriptions"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Pill className="w-4 h-4" />
              <span>Prescriptions</span>
            </TabsTrigger>
            <TabsTrigger
              value="visits"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Visits</span>
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <DollarSign className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4 mt-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Prescription History ({prescriptionHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptionHistory.map((rx) => (
                    <Card key={rx.id} className="border border-gray-200 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="font-semibold text-lg text-gray-900">{rx.medication}</h4>
                              <Badge variant="outline" className="font-medium">{rx.id}</Badge>
                              <Badge className={getStatusColor(rx.status)}>
                                {getStatusIcon(rx.status)}
                                <span className="ml-1">{rx.status}</span>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 font-medium">Prescriber</p>
                                <p className="text-gray-900">{rx.prescriber}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Quantity</p>
                                <p className="text-gray-900">{rx.quantity}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Fill Date</p>
                                <p className="text-gray-900">{rx.fillDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Refills</p>
                                <p className="text-gray-900">{rx.refills}</p>
                              </div>
                            </div>
                          </div>

                          <div className="ml-4 text-right">
                            <p className="text-sm text-gray-500">Cost</p>
                            <p className="text-lg font-semibold text-green-600">{rx.cost}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits" className="space-y-4 mt-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-walgreens-blue" />
                  Visit Timeline ({visitHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visitHistory.map((visit, index) => (
                    <div key={index} className="relative">
                      {/* Timeline connector */}
                      {index < visitHistory.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-walgreens-blue to-blue-300"></div>
                      )}

                      <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 ml-12">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="absolute left-4 w-4 h-4 bg-walgreens-blue rounded-full border-2 border-white shadow-md"></div>
                                <h4 className="font-semibold text-lg text-gray-900">{visit.type}</h4>
                                <Badge className={getStatusColor(visit.status)}>
                                  {getStatusIcon(visit.status)}
                                  <span className="ml-1">{visit.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600 font-medium">Date</p>
                                  <p className="text-gray-900">{visit.date}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium">Pharmacist</p>
                                  <p className="text-gray-900">{visit.pharmacist}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium">Duration</p>
                                  <p className="text-gray-900">{visit.duration}</p>
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-700 font-medium">Notes:</p>
                                <p className="text-sm text-gray-900 mt-1">{visit.notes}</p>
                              </div>
                            </div>

                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-walgreens-blue" />
                    Billing History ({billingHistory.length})
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      Total: ${billingHistory.reduce((sum, bill) => sum + parseFloat(bill.amount.slice(1)), 0).toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((bill, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="font-semibold text-lg text-gray-900">{bill.description}</h4>
                              <Badge className={getStatusColor(bill.status)}>
                                {getStatusIcon(bill.status)}
                                <span className="ml-1">{bill.status}</span>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 font-medium">Date</p>
                                <p className="text-gray-900">{bill.date}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Insurance</p>
                                <p className="text-gray-900">{bill.insurance}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Payment Method</p>
                                <p className="text-gray-900">{bill.method}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Copay</p>
                                <p className="text-gray-900">{bill.copay}</p>
                              </div>
                            </div>
                          </div>

                          <div className="ml-4 text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-green-600">{bill.amount}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              <Download className="w-3 h-3 mr-1" />
                              Receipt
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <Download className="w-4 h-4 mr-2" />
              Export Full History
            </Button>
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
