import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddTrainingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staffMembers: any[];
    onAddTraining: (trainingData: any) => void;
}

const AddTrainingDialog = ({
    open,
    onOpenChange,
    staffMembers,
    onAddTraining
}: AddTrainingDialogProps) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        employeeId: '',
        course: '',
        description: '',
        startDate: '',
        completionDate: '',
        expiryDate: '',
        status: 'pending',
        provider: '',
        notes: ''
    });

    const trainingStatuses = [
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'expired', label: 'Expired' }
    ];

    const commonCourses = [
        'HIPAA Compliance',
        'Pharmacy Safety',
        'Customer Service Excellence',
        'Emergency Procedures',
        'Sterile Compounding',
        'Immunization Certification',
        'MTM Certification',
        'CPR Certification',
        'Leadership Training',
        'Pharmacy Technology Updates'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.employeeId || !formData.course) {
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

        const trainingData = {
            employeeId: formData.employeeId,
            employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            training: {
                course: formData.course,
                description: formData.description,
                startDate: formData.startDate,
                completed: formData.status === 'completed' ? formData.completionDate : null,
                expiry: formData.expiryDate || null,
                status: formData.status,
                provider: formData.provider,
                notes: formData.notes
            }
        };

        onAddTraining(trainingData);

        // Reset form
        setFormData({
            employeeId: '',
            course: '',
            description: '',
            startDate: '',
            completionDate: '',
            expiryDate: '',
            status: 'pending',
            provider: '',
            notes: ''
        });
        onOpenChange(false);

        toast({
            title: "Training Added",
            description: `Training record added for ${selectedEmployee.firstName} ${selectedEmployee.lastName}.`
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Training Record</DialogTitle>
                    <DialogDescription>
                        Add a new training record for a staff member
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Employee and Course Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Training Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="employee">Employee *</Label>
                                <Select value={formData.employeeId} onValueChange={(value) => handleInputChange('employeeId', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {staffMembers.map(staff => (
                                            <SelectItem key={staff.id} value={staff.id}>
                                                {staff.firstName} {staff.lastName} - {staff.role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="course">Course Name *</Label>
                                <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select or type course name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {commonCourses.map(course => (
                                            <SelectItem key={course} value={course}>{course}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Course Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Brief description of the training course"
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dates and Status */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Schedule & Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {trainingStatuses.map(status => (
                                            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="provider">Training Provider</Label>
                                <Input
                                    id="provider"
                                    value={formData.provider}
                                    onChange={(e) => handleInputChange('provider', e.target.value)}
                                    placeholder="Training organization or provider"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="completionDate">Completion Date</Label>
                                <Input
                                    id="completionDate"
                                    type="date"
                                    value={formData.completionDate}
                                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                                    disabled={formData.status !== 'completed'}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                                <Input
                                    id="expiryDate"
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Any additional notes or requirements"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                            Add Training Record
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTrainingDialog; 