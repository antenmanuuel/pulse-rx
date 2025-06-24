
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
import { Plus, Calendar, Clock } from 'lucide-react';

interface NewAppointmentDialogProps {
  onSubmit: (appointment: any) => void;
}

export default function NewAppointmentDialog({ onSubmit }: NewAppointmentDialogProps) {
  const [appointment, setAppointment] = useState({
    patientName: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    duration: '15',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(appointment);
    setAppointment({
      patientName: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      duration: '15',
      notes: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-walgreens-red" />
            Schedule New Appointment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={appointment.patientName}
                onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
                placeholder="Enter patient name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={appointment.phone}
                onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <Select onValueChange={(value) => setAppointment({ ...appointment, service: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medication-consultation">Medication Consultation</SelectItem>
                <SelectItem value="flu-vaccination">Flu Vaccination</SelectItem>
                <SelectItem value="blood-pressure-check">Blood Pressure Check</SelectItem>
                <SelectItem value="medication-sync">Medication Synchronization</SelectItem>
                <SelectItem value="covid-vaccination">COVID Vaccination</SelectItem>
                <SelectItem value="wellness-screening">Wellness Screening</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={appointment.date}
                onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={appointment.time}
                onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Select onValueChange={(value) => setAppointment({ ...appointment, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="15" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={appointment.notes}
              onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
              placeholder="Additional notes about the appointment"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
