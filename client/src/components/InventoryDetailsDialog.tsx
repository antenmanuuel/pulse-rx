import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  RotateCcw,
  Building,
  Truck,
  FileText,
  CheckCircle,
  Eye,
  Edit3
} from 'lucide-react';

interface InventoryDetailsDialogProps {
  item: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStock: (item: any) => void;
  onReorder: (item: any) => void;
}

const InventoryDetailsDialog = ({
  item,
  open,
  onOpenChange,
  onUpdateStock,
  onReorder
}: InventoryDetailsDialogProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const handleStartEdit = () => {
    if (item) {
      setEditForm({ ...item });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (item && editForm) {
      onOpenChange(false);
      // Pass the updated item back to the parent component
      // This would typically update the inventory state in the parent
      console.log('Item updated:', editForm);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({});
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {item.name}
                </DialogTitle>
                <p className="text-gray-600 mt-1">NDC: {item.ndc}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <Package className="w-5 h-5 mr-2 text-walgreens-blue" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Medication Name</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.name || ''}
                        onChange={(e) => handleEditFormChange('name', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.name}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Brand Name</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.brand || ''}
                        onChange={(e) => handleEditFormChange('brand', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.brand}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Strength</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.strength || ''}
                        onChange={(e) => handleEditFormChange('strength', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.strength}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dosage Form</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.dosageForm || ''}
                        onChange={(e) => handleEditFormChange('dosageForm', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.dosageForm}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">NDC Number</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.ndc || ''}
                        onChange={(e) => handleEditFormChange('ndc', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.ndc}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Category</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.category || ''}
                        onChange={(e) => handleEditFormChange('category', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{item.category}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Manufacturer</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.manufacturer || ''}
                        onChange={(e) => handleEditFormChange('manufacturer', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900 flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        {item.manufacturer}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Supplier</span>
                    {isEditMode ? (
                      <Input
                        value={editForm.supplier || ''}
                        onChange={(e) => handleEditFormChange('supplier', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900 flex items-center">
                        <Truck className="w-4 h-4 mr-2 text-gray-500" />
                        {item.supplier}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <span className="text-sm text-gray-600">Description</span>
                {isEditMode ? (
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => handleEditFormChange('description', e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:border-walgreens-blue focus:ring-walgreens-blue"
                    rows={3}
                  />
                ) : (
                  <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <BarChart3 className="w-5 h-5 mr-2 text-walgreens-blue" />
                Stock Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <span className="text-sm text-blue-600">Current Stock</span>
                  <p className="text-3xl font-bold text-blue-900">{item.quantity}</p>
                  <p className="text-sm text-blue-700">units available</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <span className="text-sm text-orange-600">Minimum Stock</span>
                  <p className="text-3xl font-bold text-orange-900">{item.minStock}</p>
                  <p className="text-sm text-orange-700">reorder threshold</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <span className="text-sm text-green-600">Total Value</span>
                  <p className="text-3xl font-bold text-green-900">
                    ${(item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2)}
                  </p>
                  <p className="text-sm text-green-700">inventory value</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <span className="text-sm text-gray-600">Unit Cost</span>
                  {isEditMode ? (
                    <Input
                      value={editForm.cost || ''}
                      onChange={(e) => handleEditFormChange('cost', e.target.value)}
                      className="mt-1"
                      placeholder="$0.00"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                      {item.cost}
                    </p>
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-600">Location</span>
                  {isEditMode ? (
                    <Input
                      value={editForm.location || ''}
                      onChange={(e) => handleEditFormChange('location', e.target.value)}
                      className="mt-1"
                      placeholder="A-12"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {item.location}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Batch and Expiry Information */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                <Calendar className="w-5 h-5 mr-2 text-walgreens-blue" />
                Batch & Expiry Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Lot Number</span>
                    <p className="font-semibold text-gray-900">{item.lotNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Batch Date</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {item.batchDate}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Expiry Date</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {item.expiry}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <RotateCcw className="w-4 h-4 mr-2 text-gray-500" />
                      {item.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <span className="text-sm text-gray-600">Storage Conditions</span>
                <p className="font-medium text-gray-900 bg-blue-50 p-3 rounded-lg mt-1 flex items-start">
                  <FileText className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                  {item.storageConditions}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>

            {isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleStartEdit}
                  className="border-walgreens-blue text-walgreens-blue hover:bg-blue-50"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <Button
                  className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  onClick={() => {
                    onOpenChange(false);
                    onUpdateStock(item);
                  }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Update Stock
                </Button>
                <Button
                  className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  onClick={() => {
                    onOpenChange(false);
                    onReorder(item);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Reorder
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDetailsDialog;