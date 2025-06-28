import React, { useState, useEffect } from 'react';
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
import { CalendarIcon, Plus, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CreatePODialogProps {
    onCreatePO: (poData: any) => void;
    vendors?: any[];
    preSelectedVendor?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideStandardTrigger?: boolean;
}

const CreatePODialog = ({
    onCreatePO,
    vendors = [],
    preSelectedVendor,
    open: externalOpen,
    onOpenChange: externalOnOpenChange,
    hideStandardTrigger = false
}: CreatePODialogProps) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const setOpen = externalOnOpenChange || setInternalOpen;
    const [deliveryDate, setDeliveryDate] = useState<Date>();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        vendor: preSelectedVendor || '',
        priority: 'normal',
        department: '',
        requestedBy: '',
        deliveryAddress: '',
        notes: ''
    });

    const [items, setItems] = useState([
        { description: '', quantity: '', unitPrice: '', total: 0 }
    ]);

    const priorities = ['urgent', 'high', 'normal', 'low'];
    const departments = ['Pharmacy', 'Front Store', 'Management', 'Administration'];

    // Update vendor when preSelectedVendor prop changes
    useEffect(() => {
        if (preSelectedVendor) {
            setFormData(prev => ({ ...prev, vendor: preSelectedVendor }));
        }
    }, [preSelectedVendor]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };

        // Calculate total for this item
        if (field === 'quantity' || field === 'unitPrice') {
            const quantity = parseFloat(updatedItems[index].quantity) || 0;
            const unitPrice = parseFloat(updatedItems[index].unitPrice) || 0;
            updatedItems[index].total = quantity * unitPrice;
        }

        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: '', unitPrice: '', total: 0 }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const calculateTax = (subtotal: number) => {
        return subtotal * 0.08; // 8% tax rate
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        return subtotal + tax;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.vendor || !formData.requestedBy || items.some(item => !item.description)) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields and item descriptions.",
                variant: "destructive"
            });
            return;
        }

        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        const newPO = {
            id: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
            vendor: formData.vendor,
            priority: formData.priority,
            status: 'pending',
            department: formData.department,
            requestedBy: formData.requestedBy,
            createdDate: format(new Date(), 'yyyy-MM-dd'),
            deliveryDate: deliveryDate ? format(deliveryDate, 'yyyy-MM-dd') : '',
            deliveryAddress: formData.deliveryAddress,
            items: items.filter(item => item.description.trim() !== ''),
            financials: {
                subtotal,
                tax,
                total
            },
            notes: formData.notes,
            approvals: [],
            tracking: {
                created: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            }
        };

        onCreatePO(newPO);

        // Reset form
        setFormData({
            vendor: '',
            priority: 'normal',
            department: '',
            requestedBy: '',
            deliveryAddress: '',
            notes: ''
        });
        setItems([{ description: '', quantity: '', unitPrice: '', total: 0 }]);
        setDeliveryDate(undefined);
        setOpen(false);

        toast({
            title: "Purchase Order Created",
            description: `PO ${newPO.id} has been created successfully.`
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!hideStandardTrigger && (
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <FileText className="w-4 h-4 mr-2" />
                        Create PO
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Purchase Order</DialogTitle>
                    <DialogDescription>
                        Create a new purchase order for vendor supplies. Fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Order Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="vendor">Vendor *</Label>
                                <Select value={formData.vendor} onValueChange={(value) => handleInputChange('vendor', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select vendor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vendors.map(vendor => (
                                            <SelectItem key={vendor.id} value={vendor.name}>{vendor.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map(priority => (
                                            <SelectItem key={priority} value={priority}>
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </SelectItem>
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
                                <Label htmlFor="requestedBy">Requested By *</Label>
                                <Input
                                    id="requestedBy"
                                    value={formData.requestedBy}
                                    onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Delivery Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {deliveryDate ? format(deliveryDate, "PPP") : "Select delivery date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={deliveryDate} onSelect={setDeliveryDate} />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                                <Input
                                    id="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                                    placeholder="Delivery location"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
                            <Button type="button" onClick={addItem} variant="outline" size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Item
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 border border-gray-200 rounded-lg">
                                    <div className="col-span-5 space-y-2">
                                        <Label htmlFor={`description-${index}`}>Description *</Label>
                                        <Input
                                            id={`description-${index}`}
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                            placeholder="Item description"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                                        <Input
                                            id={`quantity-${index}`}
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            step="1"
                                        />
                                    </div>

                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                                        <Input
                                            id={`unitPrice-${index}`}
                                            type="number"
                                            value={item.unitPrice}
                                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="col-span-2 space-y-2">
                                        <Label>Total</Label>
                                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                                            ${item.total.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeItem(index)}
                                            disabled={items.length === 1}
                                            className="w-full"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (8%):</span>
                                <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
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
                            placeholder="Additional notes or special instructions"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Create Purchase Order
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePODialog; 