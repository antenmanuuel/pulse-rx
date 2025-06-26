import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

interface FilterDialogProps {
  onFilterChange: (filters: any) => void;
  filterType?: 'inventory' | 'appointments';
}

const FilterDialog = ({ onFilterChange, filterType = 'inventory' }: FilterDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialInventoryFilters = {
    status: '',
    location: '',
    expiryRange: '',
    lowStock: false,
    outOfStock: false
  };

  const initialAppointmentFilters = {
    status: '',
    service: '',
    priority: '',
    timeRange: '',
    showCancelled: false,
    showCompleted: false
  };

  const [filters, setFilters] = useState(
    filterType === 'appointments' ? initialAppointmentFilters : initialInventoryFilters
  );

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = filterType === 'appointments' ? initialAppointmentFilters : initialInventoryFilters;
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setOpen(false);
  };

  const renderInventoryFilters = () => (
    <>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">Aisle A</SelectItem>
            <SelectItem value="B">Aisle B</SelectItem>
            <SelectItem value="C">Aisle C</SelectItem>
            <SelectItem value="D">Aisle D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="expiry">Expiry Range</Label>
        <Select value={filters.expiryRange} onValueChange={(value) => setFilters({ ...filters, expiryRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select expiry range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Expires in 30 days</SelectItem>
            <SelectItem value="60days">Expires in 60 days</SelectItem>
            <SelectItem value="90days">Expires in 90 days</SelectItem>
            <SelectItem value="expired">Already expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lowStock"
            checked={filters.lowStock}
            onCheckedChange={(checked) => setFilters({ ...filters, lowStock: checked as boolean })}
          />
          <Label htmlFor="lowStock">Show only low stock items</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="outOfStock"
            checked={filters.outOfStock}
            onCheckedChange={(checked) => setFilters({ ...filters, outOfStock: checked as boolean })}
          />
          <Label htmlFor="outOfStock">Show only out of stock items</Label>
        </div>
      </div>
    </>
  );

  const renderAppointmentFilters = () => (
    <>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confirmed">✅ Confirmed</SelectItem>
            <SelectItem value="pending">⏳ Pending</SelectItem>
            <SelectItem value="checked-in">👤 Checked In</SelectItem>
            <SelectItem value="completed">✔️ Completed</SelectItem>
            <SelectItem value="cancelled">❌ Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="service">Service Type</Label>
        <Select value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Medication Consultation">💊 Medication Consultation</SelectItem>
            <SelectItem value="Flu Vaccination">💉 Flu Vaccination</SelectItem>
            <SelectItem value="COVID Vaccination">💉 COVID Vaccination</SelectItem>
            <SelectItem value="Blood Pressure Check">🩺 Blood Pressure Check</SelectItem>
            <SelectItem value="Medication Synchronization">🔄 Medication Synchronization</SelectItem>
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
            <SelectItem value="high">🚨 High Priority</SelectItem>
            <SelectItem value="normal">📋 Normal Priority</SelectItem>
            <SelectItem value="low">⬇️ Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="timeRange">Time Range</Label>
        <Select value={filters.timeRange} onValueChange={(value) => setFilters({ ...filters, timeRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">🌅 Morning (6 AM - 12 PM)</SelectItem>
            <SelectItem value="afternoon">☀️ Afternoon (12 PM - 6 PM)</SelectItem>
            <SelectItem value="evening">🌆 Evening (6 PM - 10 PM)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showCancelled"
            checked={filters.showCancelled}
            onCheckedChange={(checked) => setFilters({ ...filters, showCancelled: checked as boolean })}
          />
          <Label htmlFor="showCancelled">Include cancelled appointments</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showCompleted"
            checked={filters.showCompleted}
            onCheckedChange={(checked) => setFilters({ ...filters, showCompleted: checked as boolean })}
          />
          <Label htmlFor="showCompleted">Include completed appointments</Label>
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-300 hover:border-gray-400 hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            Filter {filterType === 'appointments' ? 'Appointments' : 'Inventory'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {filterType === 'appointments' ? renderAppointmentFilters() : renderInventoryFilters()}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="bg-walgreens-red hover:bg-red-600 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
