
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

interface ContactDialogProps {
  contact: any;
  onContact: (data: any) => void;
}

export default function ContactDialog({ contact, onContact }: ContactDialogProps) {
  const [contactData, setContactData] = useState({
    method: '',
    subject: '',
    message: '',
    followUpDate: '',
    priority: 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContact({ ...contactData, contactId: contact.id || contact.patient });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-walgreens-blue" />
            Contact {contact.patient || contact.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-sm">
            <div><strong>Phone:</strong> {contact.phone}</div>
            {contact.email && <div><strong>Email:</strong> {contact.email}</div>}
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
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject/Purpose</Label>
            <Select onValueChange={(value) => setContactData({ ...contactData, subject: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appointment-reminder">Appointment Reminder</SelectItem>
                <SelectItem value="appointment-confirmation">Appointment Confirmation</SelectItem>
                <SelectItem value="prescription-ready">Prescription Ready</SelectItem>
                <SelectItem value="insurance-issue">Insurance Issue</SelectItem>
                <SelectItem value="delivery-update">Delivery Update</SelectItem>
                <SelectItem value="follow-up">Follow-up Call</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={contactData.message}
              onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
              placeholder="Enter your message or notes about the conversation"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => setContactData({ ...contactData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Normal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={contactData.followUpDate}
                onChange={(e) => setContactData({ ...contactData, followUpDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              Send/Record Contact
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
