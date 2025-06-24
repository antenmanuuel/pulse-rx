
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Clock } from 'lucide-react';

interface CheckInDialogProps {
  appointment: any;
  onCheckIn: (data: any) => void;
}

export default function CheckInDialog({ appointment, onCheckIn }: CheckInDialogProps) {
  const [checkInData, setCheckInData] = useState({
    arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    symptoms: '',
    medications: '',
    insuranceVerified: false,
    consentSigned: false,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckIn({ ...checkInData, appointmentId: appointment.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-walgreens-red hover:bg-walgreens-red-dark">
          Check In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-walgreens-red" />
            Check In Patient - {appointment.patient}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center justify-between text-sm">
            <span><strong>Service:</strong> {appointment.service}</span>
            <span><strong>Scheduled:</strong> {appointment.time}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="arrivalTime">Actual Arrival Time</Label>
            <Input
              id="arrivalTime"
              type="time"
              value={checkInData.arrivalTime}
              onChange={(e) => setCheckInData({ ...checkInData, arrivalTime: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptoms">Current Symptoms/Concerns</Label>
            <Textarea
              id="symptoms"
              value={checkInData.symptoms}
              onChange={(e) => setCheckInData({ ...checkInData, symptoms: e.target.value })}
              placeholder="Any symptoms or concerns the patient mentions"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              value={checkInData.medications}
              onChange={(e) => setCheckInData({ ...checkInData, medications: e.target.value })}
              placeholder="List current medications or 'None'"
              rows={2}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="insurance"
                checked={checkInData.insuranceVerified}
                onCheckedChange={(checked) => setCheckInData({ ...checkInData, insuranceVerified: checked as boolean })}
              />
              <Label htmlFor="insurance">Insurance information verified</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={checkInData.consentSigned}
                onCheckedChange={(checked) => setCheckInData({ ...checkInData, consentSigned: checked as boolean })}
              />
              <Label htmlFor="consent">Consent forms signed</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={checkInData.notes}
              onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
              placeholder="Any additional notes for the pharmacist"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Complete Check-In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
