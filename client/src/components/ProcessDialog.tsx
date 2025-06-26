import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  FileCheck,
  DollarSign,
  User,
  Pill,
  Check
} from 'lucide-react';

interface ProcessDialogProps {
  prescription: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProcessDialog = ({ prescription, open, onOpenChange }: ProcessDialogProps) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const steps = [
    { number: 1, title: 'Verification', icon: Shield, description: 'Verify prescription and patient details' },
    { number: 2, title: 'Insurance & Billing', icon: DollarSign, description: 'Process insurance and billing information' },
    { number: 3, title: 'Final Review', icon: FileCheck, description: 'Final review and dispensing preparation' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        onOpenChange(false);
        setStep(1);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    setStep(Math.max(1, step - 1));
  };

  if (!prescription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Process Prescription
              </DialogTitle>
              <p className="text-gray-600 mt-1">Prescription ID: {prescription.id}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((stepInfo, index) => (
              <div key={stepInfo.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${stepInfo.number <= step
                    ? 'bg-gradient-to-br from-walgreens-red to-red-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600'
                    }`}>
                    {stepInfo.number < step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <stepInfo.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-sm font-medium ${stepInfo.number <= step ? 'text-walgreens-red' : 'text-gray-600'}`}>
                      {stepInfo.title}
                    </p>
                    <p className="text-xs text-gray-500 max-w-24">
                      {stepInfo.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 mt-6 rounded transition-all duration-300 ${stepInfo.number < step ? 'bg-walgreens-red' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-walgreens-red" />
                <h3 className="text-lg font-semibold text-gray-900">Verification Step</h3>
              </div>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-4 h-4 mr-2 text-walgreens-blue" />
                    Prescription Details
                  </h4>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Patient:</span>
                        <p className="font-semibold text-gray-900">{prescription.patient}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>
                        <p className="font-semibold text-gray-900">{prescription.dob}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Medication:</span>
                        <p className="font-semibold text-gray-900">{prescription.medication}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <p className="font-semibold text-gray-900">{prescription.quantity}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Prescriber:</span>
                        <p className="font-semibold text-gray-900">{prescription.prescriber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Insurance:</span>
                        <p className="font-semibold text-gray-900">{prescription.insurance}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={`ml-2 ${prescription.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {prescription.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Verification Checklist</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Patient identity verified</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Prescription authenticity confirmed</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Drug interaction check passed</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Allergies and contraindications reviewed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-walgreens-red" />
                <h3 className="text-lg font-semibold text-gray-900">Insurance & Billing</h3>
              </div>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="copay" className="text-sm font-medium text-gray-700">Patient Copay</Label>
                      <Input
                        id="copay"
                        defaultValue="$10.00"
                        className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance-status" className="text-sm font-medium text-gray-700">Insurance Status</Label>
                      <Select defaultValue="approved">
                        <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="denied">Denied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 text-green-800 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Insurance Approved</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Cost:</span>
                        <p className="font-semibold text-gray-900">$55.00</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Insurance Coverage:</span>
                        <p className="font-semibold text-green-700">$45.00</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Patient Responsibility:</span>
                        <p className="font-semibold text-gray-900">$10.00</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Savings:</span>
                        <p className="font-semibold text-green-700">$45.00 (82%)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-walgreens-red" />
                <h3 className="text-lg font-semibold text-gray-900">Final Review & Dispensing</h3>
              </div>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pharmacist" className="text-sm font-medium text-gray-700">Reviewing Pharmacist</Label>
                      <Select defaultValue="pharm1">
                        <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pharm1">Dr. Sarah Johnson, PharmD</SelectItem>
                          <SelectItem value="pharm2">Dr. Michael Chen, PharmD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickup-method" className="text-sm font-medium text-gray-700">Pickup Method</Label>
                      <Select defaultValue="in-store">
                        <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-store">In-Store Pickup</SelectItem>
                          <SelectItem value="drive-thru">Drive-Thru</SelectItem>
                          <SelectItem value="delivery">Home Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Ready for Dispensing
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-blue-800 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        All verifications complete
                      </div>
                      <div className="flex items-center text-blue-800 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Insurance processed
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-blue-800 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Medication prepared
                      </div>
                      <div className="flex items-center text-blue-800 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Labels printed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {processing && (
            <Card className="border-gray-200">
              <CardContent className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-walgreens-red mx-auto mb-6"></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Prescription...</h4>
                <p className="text-gray-600">Please wait while we finalize your prescription</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1 || processing}
            className="border-gray-300 hover:border-gray-400"
          >
            Previous Step
          </Button>

          <Button
            className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleNext}
            disabled={processing}
          >
            {step === 3 ? 'Complete Processing' : 'Next Step'}
            {step < 3 && <span className="ml-2">→</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDialog;
