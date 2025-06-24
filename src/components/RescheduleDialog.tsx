
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
import { Calendar, Clock } from 'lucide-react';

interface RescheduleDialogProps {
  appointment: any;
  onReschedule: (data: any) => void;
}

export default function RescheduleDialog({ appointment, onReschedule }: RescheduleDialogProps) {
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: '',
    reason: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReschedule({ ...rescheduleData, appointmentId: appointment.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-walgreens-blue" />
            Reschedule Appointment - {appointment.patient}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-sm">
            <div><strong>Current Date:</strong> {appointment.time}</div>
            <div><strong>Service:</strong> {appointment.service}</div>
            <div><strong>Duration:</strong> {appointment.duration}</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newDate">New Date</Label>
              <Input
                id="newDate"
                type="date"
                value={rescheduleData.newDate}
                onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newTime">New Time</Label>
              <Input
                id="newTime"
                type="time"
                value={rescheduleData.newTime}
                onChange={(e) => setRescheduleData({ ...rescheduleData, newTime: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rescheduling</Label>
            <Select onValueChange={(value) => setRescheduleData({ ...rescheduleData, reason: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient-request">Patient Request</SelectItem>
                <SelectItem value="pharmacist-unavailable">Pharmacist Unavailable</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="equipment-issue">Equipment Issue</SelectItem>
                <SelectItem value="scheduling-conflict">Scheduling Conflict</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={rescheduleData.notes}
              onChange={(e) => setRescheduleData({ ...rescheduleData, notes: e.target.value })}
              placeholder="Any additional notes about the rescheduling"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              Reschedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
