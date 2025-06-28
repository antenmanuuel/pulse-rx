import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddShiftDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staffMembers: any[];
    onAddShift: (shiftData: any) => void;
}

const AddShiftDialog = ({
    open,
    onOpenChange,
    staffMembers,
    onAddShift
}: AddShiftDialogProps) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        employeeId: '',
        day: '',
        startTime: '',
        endTime: '',
        status: 'scheduled'
    });

    const daysOfWeek = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.employeeId || !formData.day || !formData.startTime || !formData.endTime) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const selectedEmployee = staffMembers.find(emp => emp.id === formData.employeeId);
        if (!selectedEmployee) {
            toast({
                title: "Error",
                description: "Selected employee not found.",
                variant: "destructive"
            });
            return;
        }

        const shiftData = {
            employeeId: formData.employeeId,
            employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            role: selectedEmployee.role,
            day: formData.day,
            shift: {
                start: formData.startTime,
                end: formData.endTime,
                status: formData.status
            }
        };

        onAddShift(shiftData);

        // Reset form
        setFormData({
            employeeId: '',
            day: '',
            startTime: '',
            endTime: '',
            status: 'scheduled'
        });
        onOpenChange(false);

        toast({
            title: "Shift Added",
            description: `Shift added for ${selectedEmployee.firstName} ${selectedEmployee.lastName} on ${formData.day}.`
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Shift</DialogTitle>
                    <DialogDescription>
                        Schedule a new shift for a staff member
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="employee">Employee *</Label>
                        <Select value={formData.employeeId} onValueChange={(value) => handleInputChange('employeeId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {staffMembers.filter(staff => staff.status === 'active').map(staff => (
                                    <SelectItem key={staff.id} value={staff.id}>
                                        {staff.firstName} {staff.lastName} - {staff.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="day">Day *</Label>
                        <Select value={formData.day} onValueChange={(value) => handleInputChange('day', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                                {daysOfWeek.map(day => (
                                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Start Time *</Label>
                            <Input
                                id="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => handleInputChange('startTime', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endTime">End Time *</Label>
                            <Input
                                id="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => handleInputChange('endTime', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="tentative">Tentative</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                            Add Shift
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddShiftDialog; 