import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Filter, X, CheckCircle } from 'lucide-react';

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

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.priority) count++;
    if (filters.prescriber) count++;
    if (filters.insurance) count++;
    if (filters.todayOnly) count++;
    if (filters.urgentOnly) count++;
    return count;
  };

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
  };

  const activeCount = getActiveFilterCount();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative border-gray-300 hover:border-walgreens-blue h-10">
          <Filter className="w-4 h-4 mr-2" />
          Filter
          {activeCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-walgreens-red text-white border-2 border-white">
              {activeCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-xl font-semibold">
              <div className="w-8 h-8 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Filter className="w-4 h-4 text-white" />
              </div>
              Filter Prescriptions
            </DialogTitle>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filter Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ready for Review">Ready for Review</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Verification">Verification</SelectItem>
                  <SelectItem value="Pending Insurance">Pending Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</Label>
              <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
                <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prescriber" className="text-sm font-medium text-gray-700">Prescriber</Label>
              <Select value={filters.prescriber} onValueChange={(value) => setFilters({ ...filters, prescriber: value })}>
                <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                  <SelectValue placeholder="All prescribers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                  <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                  <SelectItem value="Dr. Taylor">Dr. Taylor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance" className="text-sm font-medium text-gray-700">Insurance</Label>
              <Select value={filters.insurance} onValueChange={(value) => setFilters({ ...filters, insurance: value })}>
                <SelectTrigger className="border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue">
                  <SelectValue placeholder="All insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCBS">BCBS</SelectItem>
                  <SelectItem value="Aetna">Aetna</SelectItem>
                  <SelectItem value="Humana">Humana</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Quick Filters</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox
                  id="todayOnly"
                  checked={filters.todayOnly}
                  onCheckedChange={(checked) => setFilters({ ...filters, todayOnly: checked as boolean })}
                  className="border-gray-300"
                />
                <Label htmlFor="todayOnly" className="text-sm text-gray-700 cursor-pointer flex-1">
                  Today's prescriptions only
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox
                  id="urgentOnly"
                  checked={filters.urgentOnly}
                  onCheckedChange={(checked) => setFilters({ ...filters, urgentOnly: checked as boolean })}
                  className="border-gray-300"
                />
                <Label htmlFor="urgentOnly" className="text-sm text-gray-700 cursor-pointer flex-1">
                  Urgent prescriptions only
                </Label>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">
                  {activeCount} filter{activeCount !== 1 ? 's' : ''} active
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.status && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Status: {filters.status}
                  </Badge>
                )}
                {filters.priority && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Priority: {filters.priority}
                  </Badge>
                )}
                {filters.prescriber && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {filters.prescriber}
                  </Badge>
                )}
                {filters.insurance && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {filters.insurance}
                  </Badge>
                )}
                {filters.todayOnly && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Today Only
                  </Badge>
                )}
                {filters.urgentOnly && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Urgent Only
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionFilterDialog;
