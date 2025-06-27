import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Filter,
  Download,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Package2,
  Eye,
  RotateCcw,
  Clock,
  Building,
  Truck,
  FileText,
  CheckCircle
} from 'lucide-react';
import AddItemDialog from '@/components/AddItemDialog';
import FilterDialog from '@/components/FilterDialog';
import UpdateStockDialog from '@/components/UpdateStockDialog';
import ReorderDialog from '@/components/ReorderDialog';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([
    {
      ndc: '0071-0156-23',
      name: 'Lisinopril 10mg',
      brand: 'Prinivil',
      quantity: 150,
      minStock: 50,
      location: 'A-12',
      expiry: '06/2025',
      cost: '$0.15',
      status: 'In Stock',
      category: 'Cardiovascular',
      lastUpdated: '12/20/2023',
      manufacturer: 'Merck & Co',
      supplier: 'Cardinal Health',
      lotNumber: 'MK2023A567',
      batchDate: '11/15/2023',
      description: 'ACE inhibitor used to treat high blood pressure and heart failure',
      dosageForm: 'Tablet',
      strength: '10mg',
      storageConditions: 'Store at room temperature, away from moisture'
    },
    {
      ndc: '0093-0058-01',
      name: 'Metformin 500mg',
      brand: 'Glucophage',
      quantity: 15,
      minStock: 50,
      location: 'B-08',
      expiry: '03/2025',
      cost: '$0.08',
      status: 'Low Stock',
      category: 'Diabetes',
      lastUpdated: '12/19/2023',
      manufacturer: 'Teva Pharmaceuticals',
      supplier: 'McKesson Corporation',
      lotNumber: 'TV2023B892',
      batchDate: '10/22/2023',
      description: 'Type 2 diabetes medication that helps control blood sugar',
      dosageForm: 'Tablet',
      strength: '500mg',
      storageConditions: 'Store at room temperature, protect from light'
    },
    {
      ndc: '0781-1506-01',
      name: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      quantity: 0,
      minStock: 30,
      location: 'C-15',
      expiry: 'N/A',
      cost: '$0.12',
      status: 'Out of Stock',
      category: 'Antibiotic',
      lastUpdated: '12/18/2023',
      manufacturer: 'GlaxoSmithKline',
      supplier: 'AmerisourceBergen',
      lotNumber: 'N/A',
      batchDate: 'N/A',
      description: 'Penicillin antibiotic used to treat bacterial infections',
      dosageForm: 'Capsule',
      strength: '500mg',
      storageConditions: 'Store at room temperature, keep dry'
    },
    {
      ndc: '0071-0222-23',
      name: 'Atorvastatin 20mg',
      brand: 'Lipitor',
      quantity: 85,
      minStock: 40,
      location: 'A-25',
      expiry: '09/2024',
      cost: '$0.25',
      status: 'Expiring Soon',
      category: 'Cholesterol',
      lastUpdated: '12/21/2023',
      manufacturer: 'Pfizer Inc',
      supplier: 'Cardinal Health',
      lotNumber: 'PF2023C445',
      batchDate: '08/30/2023',
      description: 'Statin medication used to lower cholesterol and reduce cardiovascular risk',
      dosageForm: 'Tablet',
      strength: '20mg',
      storageConditions: 'Store at room temperature, protect from moisture'
    },
    {
      ndc: '0378-3891-93',
      name: 'Omeprazole 20mg',
      brand: 'Prilosec',
      quantity: 200,
      minStock: 75,
      location: 'D-03',
      expiry: '11/2025',
      cost: '$0.18',
      status: 'In Stock',
      category: 'Gastrointestinal',
      lastUpdated: '12/22/2023',
      manufacturer: 'Procter & Gamble',
      supplier: 'McKesson Corporation',
      lotNumber: 'PG2023D778',
      batchDate: '09/12/2023',
      description: 'Proton pump inhibitor used to treat acid reflux and stomach ulcers',
      dosageForm: 'Delayed Release Capsule',
      strength: '20mg',
      storageConditions: 'Store at room temperature, keep container tightly closed'
    }
  ]);

  const [filteredInventory, setFilteredInventory] = useState(inventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [updateStockItem, setUpdateStockItem] = useState(null);
  const [reorderItem, setReorderItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

  const inventoryStats = [
    {
      label: 'Total Items',
      value: inventory.length,
      icon: Package2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this week'
    },
    {
      label: 'Low Stock',
      value: inventory.filter(item => item.quantity <= item.minStock && item.quantity > 0).length,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-1 since yesterday'
    },
    {
      label: 'Out of Stock',
      value: inventory.filter(item => item.quantity === 0).length,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'Same as yesterday'
    },
    {
      label: 'Expiring Soon',
      value: inventory.filter(item => item.status === 'Expiring Soon').length,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '+1 this month'
    }
  ];

  // Filter and search functionality
  const handleFilterChange = (filters: any) => {
    let filtered = [...inventory];

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.location) {
      filtered = filtered.filter(item => item.location.startsWith(filters.location));
    }

    if (filters.lowStock) {
      filtered = filtered.filter(item => item.quantity <= item.minStock);
    }

    if (filters.outOfStock) {
      filtered = filtered.filter(item => item.quantity === 0);
    }

    setFilteredInventory(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.brand.toLowerCase().includes(term.toLowerCase()) ||
      item.ndc.includes(term) ||
      item.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  const handleAddItem = (newItem: any) => {
    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory);
    console.log('Added new item:', newItem);
  };

  const handleUpdateStock = (itemNdc: string, newQuantity: number, reason: string) => {
    const updatedInventory = inventory.map(item => {
      if (item.ndc === itemNdc) {
        const updatedItem = {
          ...item,
          quantity: newQuantity,
          status: newQuantity > item.minStock ? 'In Stock' : newQuantity > 0 ? 'Low Stock' : 'Out of Stock',
          lastUpdated: new Date().toLocaleDateString()
        };
        return updatedItem;
      }
      return item;
    });

    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory);
    console.log('Updated stock for', itemNdc, 'to', newQuantity, 'reason:', reason);
  };

  const handleReorder = (orderData: any) => {
    console.log('Reorder placed:', orderData);
    // In a real app, this would send the order to a supplier system
  };

  const handleStartEdit = () => {
    if (detailsItem) {
      setEditForm({ ...detailsItem });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (detailsItem && editForm) {
      const updatedInventory = inventory.map(item =>
        item.ndc === detailsItem.ndc ? { ...editForm } : item
      );
      setInventory(updatedInventory);
      setFilteredInventory(updatedInventory);
      setDetailsItem({ ...editForm });
      setIsEditMode(false);
      setEditForm({});

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border-red-200';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <Package className="w-4 h-4" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <TrendingDown className="w-4 h-4" />;
      case 'Expiring Soon': return <Calendar className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Cardiovascular': 'bg-red-100 text-red-700',
      'Diabetes': 'bg-blue-100 text-blue-700',
      'Antibiotic': 'bg-green-100 text-green-700',
      'Cholesterol': 'bg-purple-100 text-purple-700',
      'Gastrointestinal': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Layout title="Inventory Management" subtitle="Monitor stock levels and manage pharmaceutical inventory efficiently">
      <div className="space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {inventoryStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Inventory Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Inventory Items
                  </CardTitle>
                  <p className="text-gray-600">{filteredInventory.length} of {inventory.length} items displayed</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search medications, NDC, category..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <FilterDialog onFilterChange={handleFilterChange} />
                  <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <AddItemDialog onAddItem={handleAddItem} />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {filteredInventory.length === 0 ? (
              <Card className="border-gray-200">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredInventory.map((item, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Main Item Information */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Left Column - Basic Info */}
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                  {getStatusIcon(item.status)}
                                </div>
                                <p className="text-sm text-gray-600 font-medium">{item.brand}</p>
                                <p className="text-xs text-gray-500">NDC: {item.ndc}</p>
                                <Badge className={`mt-2 ${getCategoryColor(item.category)}`}>
                                  {item.category}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Middle Column - Stock & Location */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Current Stock</p>
                                <p className="text-2xl font-bold text-gray-900">{item.quantity}</p>
                                <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Location</p>
                                <p className="text-lg font-semibold text-gray-900 flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {item.location}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Status:</span>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1">{item.status}</span>
                              </Badge>
                            </div>
                          </div>

                          {/* Right Column - Financial & Dates */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <p className="text-xs text-green-600 mb-1">Unit Cost</p>
                                <p className="text-lg font-bold text-green-900 flex items-center">
                                  <DollarSign className="w-4 h-4" />
                                  {item.cost.replace('$', '')}
                                </p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-600 mb-1">Total Value</p>
                                <p className="text-lg font-bold text-blue-900">
                                  ${(item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">Expires: {item.expiry}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RotateCcw className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">Updated: {item.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="ml-6 flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setUpdateStockItem(item)}
                            className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue"
                          >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Update Stock
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setReorderItem(item)}
                            className="border-gray-300 hover:border-walgreens-red hover:text-walgreens-red"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Reorder
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:border-gray-400"
                            onClick={() => setDetailsItem(item)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialogs */}
        <UpdateStockDialog
          item={updateStockItem}
          open={!!updateStockItem}
          onOpenChange={(open) => !open && setUpdateStockItem(null)}
          onUpdateStock={handleUpdateStock}
        />

        <ReorderDialog
          item={reorderItem}
          open={!!reorderItem}
          onOpenChange={(open) => !open && setReorderItem(null)}
          onReorder={handleReorder}
        />

        {/* Inventory Details Dialog */}
        <Dialog open={!!detailsItem} onOpenChange={() => setDetailsItem(null)}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            {detailsItem && (
              <>
                <DialogHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          {detailsItem.name}
                        </DialogTitle>
                        <p className="text-gray-600 mt-1">NDC: {detailsItem.ndc}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={`${getCategoryColor(detailsItem.category)} font-medium`}>
                        {detailsItem.category}
                      </Badge>
                      <Badge className={`${getStatusColor(detailsItem.status)} font-medium`}>
                        {getStatusIcon(detailsItem.status)}
                        <span className="ml-1">{detailsItem.status}</span>
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 flex items-center mb-4">
                        <Package2 className="w-5 h-5 mr-2 text-walgreens-blue" />
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
                              <p className="font-semibold text-gray-900">{detailsItem.name}</p>
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
                              <p className="font-semibold text-gray-900">{detailsItem.brand}</p>
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
                              <p className="font-semibold text-gray-900">{detailsItem.strength}</p>
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
                              <p className="font-semibold text-gray-900">{detailsItem.dosageForm}</p>
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
                              <p className="font-semibold text-gray-900">{detailsItem.ndc}</p>
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
                              <p className="font-semibold text-gray-900">{detailsItem.category}</p>
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
                                {detailsItem.manufacturer}
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
                                {detailsItem.supplier}
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
                            {detailsItem.description}
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
                          <p className="text-3xl font-bold text-blue-900">{detailsItem.quantity}</p>
                          <p className="text-sm text-blue-700">units available</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <span className="text-sm text-orange-600">Minimum Stock</span>
                          <p className="text-3xl font-bold text-orange-900">{detailsItem.minStock}</p>
                          <p className="text-sm text-orange-700">reorder threshold</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <span className="text-sm text-green-600">Total Value</span>
                          <p className="text-3xl font-bold text-green-900">
                            ${(detailsItem.quantity * parseFloat(detailsItem.cost.replace('$', ''))).toFixed(2)}
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
                              {detailsItem.cost}
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
                              {detailsItem.location}
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
                            <p className="font-semibold text-gray-900">{detailsItem.lotNumber}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Batch Date</span>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-500" />
                              {detailsItem.batchDate}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-gray-600">Expiry Date</span>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              {detailsItem.expiry}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Last Updated</span>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <RotateCcw className="w-4 h-4 mr-2 text-gray-500" />
                              {detailsItem.lastUpdated}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <span className="text-sm text-gray-600">Storage Conditions</span>
                        <p className="font-medium text-gray-900 bg-blue-50 p-3 rounded-lg mt-1 flex items-start">
                          <FileText className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          {detailsItem.storageConditions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDetailsItem(null);
                        setIsEditMode(false);
                        setEditForm({});
                      }}
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
                          <Eye className="w-4 h-4 mr-2" />
                          Edit Details
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                          onClick={() => {
                            setDetailsItem(null);
                            setUpdateStockItem(detailsItem);
                          }}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Update Stock
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                          onClick={() => {
                            setDetailsItem(null);
                            setReorderItem(detailsItem);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default InventoryPage;
