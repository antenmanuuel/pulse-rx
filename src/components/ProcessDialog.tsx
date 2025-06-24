
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ProcessDialogProps {
  prescription: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProcessDialog = ({ prescription, open, onOpenChange }: ProcessDialogProps) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Process Prescription - {prescription.id}</DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            {[1, 2, 3].map((num) => (
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
        </DialogHeader>
        
        <div className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Verification Step</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Prescription Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Patient:</strong> {prescription.patient}</p>
                    <p><strong>DOB:</strong> {prescription.dob}</p>
                    <p><strong>Medication:</strong> {prescription.medication}</p>
                    <p><strong>Quantity:</strong> {prescription.quantity}</p>
                  </div>
                  <div>
                    <p><strong>Prescriber:</strong> {prescription.prescriber}</p>
                    <p><strong>Insurance:</strong> {prescription.insurance}</p>
                    <p><strong>Priority:</strong> 
                      <Badge className={prescription.priority === 'Urgent' ? 'bg-red-100 text-red-800 ml-1' : 'bg-blue-100 text-blue-800 ml-1'}>
                        {prescription.priority}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Patient identity verified</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Prescription authenticity confirmed</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Drug interaction check passed</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Insurance & Billing</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="copay">Patient Copay</Label>
                  <Input id="copay" defaultValue="$10.00" />
                </div>
                <div>
                  <Label htmlFor="insurance-status">Insurance Status</Label>
                  <Select defaultValue="approved">
                    <SelectTrigger>
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
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Insurance Approved</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Coverage: $45.00 | Patient pays: $10.00
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Final Review & Dispensing</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pharmacist">Pharmacist</Label>
                  <Select defaultValue="pharm1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pharm1">Dr. Sarah Johnson, PharmD</SelectItem>
                      <SelectItem value="pharm2">Dr. Michael Chen, PharmD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pickup-method">Pickup Method</Label>
                  <Select defaultValue="in-store">
                    <SelectTrigger>
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
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Ready for Dispensing</h4>
                <div className="text-sm text-blue-800">
                  <p>✓ All verifications complete</p>
                  <p>✓ Insurance processed</p>
                  <p>✓ Medication prepared</p>
                  <p>✓ Labels printed</p>
                </div>
              </div>
            </div>
          )}

          {processing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walgreens-red mx-auto mb-4"></div>
              <p className="text-gray-600">Processing prescription...</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={step === 1 || processing}
          >
            Previous
          </Button>
          
          <Button 
            className="bg-walgreens-red hover:bg-walgreens-red-dark"
            onClick={handleNext}
            disabled={processing}
          >
            {step === 3 ? 'Complete Processing' : 'Next Step'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDialog;
