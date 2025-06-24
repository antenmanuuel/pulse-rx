
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
import { Phone } from 'lucide-react';

interface ContactPatientDialogProps {
  delivery: any;
  onContact: (data: any) => void;
}

export default function ContactPatientDialog({ delivery, onContact }: ContactPatientDialogProps) {
  const [contactData, setContactData] = useState({
    method: '',
    purpose: '',
    message: '',
    outcome: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContact({ ...contactData, deliveryId: delivery.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Contact Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-walgreens-blue" />
            Contact Patient - {delivery.patient}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-sm">
            <div><strong>Phone:</strong> {delivery.phone}</div>
            <div><strong>Delivery Status:</strong> {delivery.status}</div>
            <div><strong>Estimated Time:</strong> {delivery.estimatedTime}</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="method">Contact Method</Label>
            <Select onValueChange={(value) => setContactData({ ...contactData, method: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="sms">Text Message</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Select onValueChange={(value) => setContactData({ ...contactData, purpose: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery-notification">Delivery Notification</SelectItem>
                <SelectItem value="delivery-delay">Delivery Delay</SelectItem>
                <SelectItem value="address-verification">Address Verification</SelectItem>
                <SelectItem value="delivery-instructions">Special Delivery Instructions</SelectItem>
                <SelectItem value="delivery-attempt">Failed Delivery Attempt</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message/Notes</Label>
            <Textarea
              id="message"
              value={contactData.message}
              onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
              placeholder="Enter message or conversation notes"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="outcome">Contact Outcome</Label>
            <Select onValueChange={(value) => setContactData({ ...contactData, outcome: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="answered-confirmed">Patient Answered - Confirmed</SelectItem>
                <SelectItem value="answered-rescheduled">Patient Answered - Rescheduled</SelectItem>
                <SelectItem value="voicemail-left">Voicemail Left</SelectItem>
                <SelectItem value="no-answer">No Answer</SelectItem>
                <SelectItem value="number-disconnected">Number Disconnected</SelectItem>
                <SelectItem value="call-back-requested">Call Back Requested</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              Record Contact
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
