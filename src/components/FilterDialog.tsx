
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

interface FilterDialogProps {
  onFilterChange: (filters: any) => void;
}

const FilterDialog = ({ onFilterChange }: FilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    expiryRange: '',
    lowStock: false,
    outOfStock: false
  });

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      location: '',
      expiryRange: '',
      lowStock: false,
      outOfStock: false
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
          <DialogTitle>Filter Inventory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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

export default FilterDialog;
