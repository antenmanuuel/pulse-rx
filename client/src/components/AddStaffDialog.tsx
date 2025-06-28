import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface AddStaffDialogProps {
    onAddStaff: (staffData: any) => void;
}

const AddStaffDialog = ({ onAddStaff }: AddStaffDialogProps) => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        emergencyContact: '',
        emergencyPhone: '',
        address: '',
        salary: '',
        notes: ''
    });

    const roles = [
        'Pharmacist',
        'Pharmacy Technician',
        'Pharmacy Intern',
        'Store Manager',
        'Assistant Manager',
        'Cashier'
    ];

    const departments = [
        'Pharmacy',
        'Front Store',
        'Management',
        'Customer Service'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const newStaff = {
            id: `EMP${Date.now().toString().slice(-6)}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            department: formData.department,
            status: 'active',
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
            address: formData.address,
            salary: formData.salary,
            notes: formData.notes,
            performance: {
                score: 0,
                reviews: 0
            },
            training: {
                status: 'pending',
                courses: [],
                certifications: []
            },
            avatar: '',
            shifts: []
        };

        onAddStaff(newStaff);

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            emergencyContact: '',
            emergencyPhone: '',
            address: '',
            salary: '',
            notes: ''
        });
        setStartDate(undefined);
        setOpen(false);

        toast({
            title: "Staff Member Added",
            description: `${newStaff.firstName} ${newStaff.lastName} has been added successfully.`
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-walgreens-red hover:bg-red-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Staff
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new staff member. Fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                placeholder="Enter last name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="employee@walgreens.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="(555) 123-4567"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Select start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                value={formData.salary}
                                onChange={(e) => handleInputChange('salary', e.target.value)}
                                placeholder="$45,000"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Enter full address"
                                rows={2}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                                <Input
                                    id="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                    placeholder="Contact name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                                <Input
                                    id="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="Additional notes about the employee"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                            Add Staff Member
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddStaffDialog; 