import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Scan,
  CheckCircle,
  AlertTriangle,
  Pill
} from 'lucide-react';

interface AddItemDialogProps {
  onAddItem: (item: any) => void;
}

const AddItemDialog = ({ onAddItem }: AddItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ndc: '',
    name: '',
    brand: '',
    quantity: '',
    minStock: '',
    location: '',
    expiry: '',
    cost: '',
    category: ''
  });

  const categories = [
    'Cardiovascular',
    'Diabetes',
    'Antibiotic',
    'Cholesterol',
    'Gastrointestinal',
    'Pain Relief',
    'Respiratory',
    'Mental Health',
    'Dermatology',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      quantity: parseInt(formData.quantity),
      minStock: parseInt(formData.minStock),
      status: parseInt(formData.quantity) > parseInt(formData.minStock) ? 'In Stock' :
        parseInt(formData.quantity) === 0 ? 'Out of Stock' : 'Low Stock',
      lastUpdated: new Date().toLocaleDateString()
    };
    onAddItem(newItem);
    setFormData({
      ndc: '',
      name: '',
      brand: '',
      quantity: '',
      minStock: '',
      location: '',
      expiry: '',
      cost: '',
      category: ''
    });
    setOpen(false);
  };

  const getPreviewStatus = () => {
    const qty = parseInt(formData.quantity) || 0;
    const minQty = parseInt(formData.minStock) || 0;
    if (qty === 0) return 'Out of Stock';
    if (qty <= minQty) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Cardiovascular': 'bg-red-100 text-red-700',
      'Diabetes': 'bg-blue-100 text-blue-700',
      'Antibiotic': 'bg-green-100 text-green-700',
      'Cholesterol': 'bg-purple-100 text-purple-700',
      'Gastrointestinal': 'bg-orange-100 text-orange-700',
      'Pain Relief': 'bg-yellow-100 text-yellow-700',
      'Respiratory': 'bg-cyan-100 text-cyan-700',
      'Mental Health': 'bg-pink-100 text-pink-700',
      'Dermatology': 'bg-indigo-100 text-indigo-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const isFormValid = () => {
    return formData.ndc && formData.name && formData.brand &&
      formData.quantity && formData.minStock && formData.location &&
      formData.expiry && formData.cost && formData.category;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Add New Inventory Item
              </DialogTitle>
              <p className="text-gray-600">Add a new medication to your inventory system</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-walgreens-blue" />
                Medication Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ndc" className="text-sm font-medium text-gray-700">
                    NDC Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="ndc"
                      value={formData.ndc}
                      onChange={(e) => setFormData({ ...formData, ndc: e.target.value })}
                      placeholder="0000-0000-00"
                      className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                      required
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-1 top-1 h-8 px-2"
                    >
                      <Scan className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Generic Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Lisinopril 10mg"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
                    Brand Name *
                  </Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., Prinivil"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock & Location Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-walgreens-blue" />
                Stock & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Initial Quantity *
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock" className="text-sm font-medium text-gray-700">
                    Minimum Stock *
                  </Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    placeholder="50"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Storage Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="A-12"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial & Expiry Information */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-walgreens-blue" />
                Financial & Expiry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-sm font-medium text-gray-700">
                    Unit Cost *
                  </Label>
                  <Input
                    id="cost"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    placeholder="$0.25"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                    Expiry Date *
                  </Label>
                  <Input
                    id="expiry"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    placeholder="MM/YYYY"
                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                    required
                  />
                </div>
              </div>

              {formData.quantity && formData.cost && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    Total Inventory Value: ${(parseInt(formData.quantity || '0') * parseFloat(formData.cost.replace('$', '') || '0')).toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          {isFormValid() && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Preview New Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{formData.name}</h4>
                        <p className="text-sm text-gray-600">{formData.brand}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">NDC:</span>
                        <span className="font-medium">{formData.ndc}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {formData.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Expiry:</span>
                        <span className="font-medium flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formData.expiry}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Initial Stock:</span>
                        <span className="text-lg font-bold text-gray-900">{formData.quantity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Min Stock:</span>
                        <span className="text-sm font-medium text-gray-900">{formData.minStock}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Unit Cost:</span>
                        <span className="text-sm font-medium text-gray-900">{formData.cost}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(getPreviewStatus())}>
                          {getPreviewStatus()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Category:</span>
                        <Badge className={getCategoryColor(formData.category)}>
                          {formData.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {getPreviewStatus() !== 'In Stock' && (
                  <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-orange-800 font-medium">
                      {getPreviewStatus() === 'Out of Stock'
                        ? 'Item will be added with zero stock'
                        : 'Item will be added below minimum stock level'}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isFormValid()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Inventory
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
