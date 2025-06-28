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
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddVendorDialogProps {
    onAddVendor: (vendorData: any) => void;
}

const AddVendorDialog = ({ onAddVendor }: AddVendorDialogProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        taxId: '',
        paymentTerms: '',
        creditLimit: '',
        notes: ''
    });

    const categories = [
        'Pharmaceuticals',
        'Medical Supplies',
        'Equipment',
        'Technology',
        'Cleaning Supplies',
        'Office Supplies',
        'Food & Beverages',
        'Other'
    ];

    const paymentTermsOptions = [
        'Net 30',
        'Net 60',
        'Net 90',
        '2/10 Net 30',
        'Cash on Delivery',
        'Prepaid'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.contactPerson || !formData.email) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        const newVendor = {
            id: `VEN${Date.now().toString().slice(-6)}`,
            name: formData.name,
            category: formData.category,
            status: 'active',
            contact: {
                contactPerson: formData.contactPerson,
                email: formData.email,
                phone: formData.phone,
                website: formData.website
            },
            address: {
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode
            },
            business: {
                taxId: formData.taxId,
                paymentTerms: formData.paymentTerms,
                creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : 0
            },
            performance: {
                rating: 0,
                totalOrders: 0,
                totalSpent: 0,
                onTimeDelivery: 100
            },
            notes: formData.notes,
            contracts: [],
            orders: []
        };

        onAddVendor(newVendor);

        // Reset form
        setFormData({
            name: '',
            category: '',
            contactPerson: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            taxId: '',
            paymentTerms: '',
            creditLimit: '',
            notes: ''
        });
        setOpen(false);

        toast({
            title: "Vendor Added",
            description: `${newVendor.name} has been added successfully.`
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-walgreens-red hover:bg-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vendor
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Vendor</DialogTitle>
                    <DialogDescription>
                        Enter the vendor details. Fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactPerson">Contact Person *</Label>
                                <Input
                                    id="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                    placeholder="Primary contact name"
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
                                    placeholder="contact@vendor.com"
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
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                    placeholder="https://vendor.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Address</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="123 Main Street"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        placeholder="City"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                        placeholder="State"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                        placeholder="12345"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax ID</Label>
                                <Input
                                    id="taxId"
                                    value={formData.taxId}
                                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                                    placeholder="12-3456789"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="paymentTerms">Payment Terms</Label>
                                <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select terms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentTermsOptions.map(term => (
                                            <SelectItem key={term} value={term}>{term}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="creditLimit">Credit Limit</Label>
                                <Input
                                    id="creditLimit"
                                    type="number"
                                    value={formData.creditLimit}
                                    onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                                    placeholder="50000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Additional notes about the vendor"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-walgreens-red hover:bg-red-600">
                            Add Vendor
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddVendorDialog; 