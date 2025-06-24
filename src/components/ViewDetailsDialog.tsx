
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Pill, FileText, Clock, Phone, MapPin } from 'lucide-react';

interface ViewDetailsDialogProps {
  prescription: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewDetailsDialog = ({ prescription, open, onOpenChange }: ViewDetailsDialogProps) => {
  if (!prescription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prescription Details - {prescription.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center space-x-2">
            <Badge className={
              prescription.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
              prescription.priority === 'High' ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            }>
              {prescription.priority}
            </Badge>
            <Badge className={
              prescription.status === 'Ready for Review' ? 'bg-green-100 text-green-800' :
              prescription.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
              prescription.status === 'Verification' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }>
              {prescription.status}
            </Badge>
          </div>

          {/* Patient Information */}
          <div>
            <h3 className="font-semibold flex items-center mb-3">
              <User className="w-5 h-5 mr-2" />
              Patient Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {prescription.patient}</p>
                  <p><strong>Date of Birth:</strong> {prescription.dob}</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
                <div>
                  <p><strong>Address:</strong> 123 Main St, City, ST 12345</p>
                  <p><strong>Insurance:</strong> {prescription.insurance}</p>
                  <p><strong>Member ID:</strong> ABC123456789</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Medication Information */}
          <div>
            <h3 className="font-semibold flex items-center mb-3">
              <Pill className="w-5 h-5 mr-2" />
              Medication Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Medication:</strong> {prescription.medication}</p>
                  <p><strong>Quantity:</strong> {prescription.quantity}</p>
                  <p><strong>NDC:</strong> 12345-678-90</p>
                  <p><strong>Lot Number:</strong> AB123CD</p>
                </div>
                <div>
                  <p><strong>Days Supply:</strong> 30 days</p>
                  <p><strong>Refills Remaining:</strong> 3</p>
                  <p><strong>Generic Available:</strong> Yes</p>
                  <p><strong>Expiry Date:</strong> 12/2025</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p><strong>Directions:</strong> Take 1 tablet by mouth daily with food</p>
                <p><strong>Warnings:</strong> May cause dizziness. Do not drive while taking this medication.</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Prescriber Information */}
          <div>
            <h3 className="font-semibold flex items-center mb-3">
              <FileText className="w-5 h-5 mr-2" />
              Prescriber Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Prescriber:</strong> {prescription.prescriber}</p>
                  <p><strong>NPI:</strong> 1234567890</p>
                  <p><strong>DEA:</strong> AB1234567</p>
                </div>
                <div>
                  <p><strong>Phone:</strong> (555) 987-6543</p>
                  <p><strong>Fax:</strong> (555) 987-6544</p>
                  <p><strong>Specialty:</strong> Internal Medicine</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <strong>Address:</strong> 456 Medical Center Dr, Suite 200, City, ST 12345
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Processing History */}
          <div>
            <h3 className="font-semibold flex items-center mb-3">
              <Clock className="w-5 h-5 mr-2" />
              Processing History
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span>Prescription received</span>
                <span className="text-gray-500">{prescription.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-blue-50 rounded">
                <span>Insurance verification started</span>
                <span className="text-gray-500">2:35 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-yellow-50 rounded">
                <span>Drug interaction check completed</span>
                <span className="text-gray-500">2:40 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-green-50 rounded">
                <span>Ready for final review</span>
                <span className="text-gray-500">Current</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
              Process Prescription
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
