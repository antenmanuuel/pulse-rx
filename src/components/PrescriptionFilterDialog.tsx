
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

interface PrescriptionFilterDialogProps {
  onFilterChange: (filters: any) => void;
}

const PrescriptionFilterDialog = ({ onFilterChange }: PrescriptionFilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    prescriber: '',
    insurance: '',
    todayOnly: false,
    urgentOnly: false
  });

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      priority: '',
      prescriber: '',
      insurance: '',
      todayOnly: false,
      urgentOnly: false
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Filter Prescriptions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ready for Review">Ready for Review</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Verification">Verification</SelectItem>
                <SelectItem value="Pending Insurance">Pending Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="prescriber">Prescriber</Label>
            <Select value={filters.prescriber} onValueChange={(value) => setFilters({ ...filters, prescriber: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select prescriber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                <SelectItem value="Dr. Taylor">Dr. Taylor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="insurance">Insurance</Label>
            <Select value={filters.insurance} onValueChange={(value) => setFilters({ ...filters, insurance: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select insurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCBS">BCBS</SelectItem>
                <SelectItem value="Aetna">Aetna</SelectItem>
                <SelectItem value="Humana">Humana</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="todayOnly"
                checked={filters.todayOnly}
                onCheckedChange={(checked) => setFilters({ ...filters, todayOnly: checked as boolean })}
              />
              <Label htmlFor="todayOnly">Today's prescriptions only</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgentOnly"
                checked={filters.urgentOnly}
                onCheckedChange={(checked) => setFilters({ ...filters, urgentOnly: checked as boolean })}
              />
              <Label htmlFor="urgentOnly">Urgent prescriptions only</Label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="bg-walgreens-red hover:bg-walgreens-red-dark">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionFilterDialog;
