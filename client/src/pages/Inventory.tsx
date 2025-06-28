import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PaginationControls from '@/components/ui/pagination-controls';
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
  Clock
} from 'lucide-react';
import AddItemDialog from '@/components/AddItemDialog';
import FilterDialog from '@/components/FilterDialog';
import UpdateStockDialog from '@/components/UpdateStockDialog';
import ReorderDialog from '@/components/ReorderDialog';
import InventoryDetailsDialog from '@/components/InventoryDetailsDialog';

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
    },
    {
      ndc: '0310-0751-30',
      name: 'Sertraline 50mg',
      brand: 'Zoloft',
      quantity: 120,
      minStock: 60,
      location: 'B-14',
      expiry: '10/2025',
      cost: '$0.22',
      status: 'In Stock',
      category: 'Mental Health',
      lastUpdated: '12/23/2023',
      manufacturer: 'Pfizer Inc',
      supplier: 'Cardinal Health',
      lotNumber: 'PF2023E556',
      batchDate: '09/05/2023',
      description: 'SSRI antidepressant used to treat depression, anxiety, and other mental health conditions',
      dosageForm: 'Tablet',
      strength: '50mg',
      storageConditions: 'Store at room temperature, protect from light and moisture'
    },
    {
      ndc: '0173-0519-00',
      name: 'Fluticasone Propionate Inhaler',
      brand: 'Flovent',
      quantity: 25,
      minStock: 30,
      location: 'C-08',
      expiry: '08/2024',
      cost: '$45.75',
      status: 'Low Stock',
      category: 'Respiratory',
      lastUpdated: '12/20/2023',
      manufacturer: 'GlaxoSmithKline',
      supplier: 'AmerisourceBergen',
      lotNumber: 'GS2023F667',
      batchDate: '07/15/2023',
      description: 'Corticosteroid inhaler used to prevent asthma attacks',
      dosageForm: 'Inhaler',
      strength: '110mcg/actuation',
      storageConditions: 'Store at room temperature, away from heat and direct light'
    },
    {
      ndc: '0006-0074-31',
      name: 'Simvastatin 40mg',
      brand: 'Zocor',
      quantity: 90,
      minStock: 45,
      location: 'A-18',
      expiry: '07/2025',
      cost: '$0.20',
      status: 'In Stock',
      category: 'Cholesterol',
      lastUpdated: '12/21/2023',
      manufacturer: 'Merck & Co',
      supplier: 'Cardinal Health',
      lotNumber: 'MK2023G778',
      batchDate: '06/30/2023',
      description: 'Statin medication used to lower cholesterol and reduce risk of heart disease',
      dosageForm: 'Tablet',
      strength: '40mg',
      storageConditions: 'Store at room temperature, protect from moisture'
    },
    {
      ndc: '0069-4200-30',
      name: 'Amlodipine 5mg',
      brand: 'Norvasc',
      quantity: 180,
      minStock: 60,
      location: 'B-22',
      expiry: '05/2025',
      cost: '$0.15',
      status: 'In Stock',
      category: 'Cardiovascular',
      lastUpdated: '12/19/2023',
      manufacturer: 'Pfizer Inc',
      supplier: 'McKesson Corporation',
      lotNumber: 'PF2023H889',
      batchDate: '05/15/2023',
      description: 'Calcium channel blocker used to treat high blood pressure and angina',
      dosageForm: 'Tablet',
      strength: '5mg',
      storageConditions: 'Store at room temperature, protect from light'
    },
    {
      ndc: '0093-7192-56',
      name: 'Albuterol Sulfate Inhaler',
      brand: 'ProAir HFA',
      quantity: 5,
      minStock: 20,
      location: 'C-05',
      expiry: '04/2024',
      cost: '$25.50',
      status: 'Low Stock',
      category: 'Respiratory',
      lastUpdated: '12/18/2023',
      manufacturer: 'Teva Pharmaceuticals',
      supplier: 'AmerisourceBergen',
      lotNumber: 'TV2023I990',
      batchDate: '04/10/2023',
      description: 'Bronchodilator used to treat or prevent bronchospasm in people with asthma or COPD',
      dosageForm: 'Inhaler',
      strength: '90mcg/actuation',
      storageConditions: 'Store at room temperature, away from heat and open flame'
    },
    {
      ndc: '0007-4200-20',
      name: 'Levothyroxine 50mcg',
      brand: 'Synthroid',
      quantity: 100,
      minStock: 50,
      location: 'D-12',
      expiry: '12/2025',
      cost: '$0.30',
      status: 'In Stock',
      category: 'Endocrine',
      lastUpdated: '12/22/2023',
      manufacturer: 'AbbVie Inc',
      supplier: 'Cardinal Health',
      lotNumber: 'AB2023J101',
      batchDate: '11/01/2023',
      description: 'Synthetic thyroid hormone used to treat hypothyroidism',
      dosageForm: 'Tablet',
      strength: '50mcg',
      storageConditions: 'Store at room temperature, protect from light and moisture'
    },
    {
      ndc: '0074-3799-13',
      name: 'Insulin Glargine',
      brand: 'Lantus',
      quantity: 10,
      minStock: 15,
      location: 'E-01',
      expiry: '03/2024',
      cost: '$125.00',
      status: 'Low Stock',
      category: 'Diabetes',
      lastUpdated: '12/20/2023',
      manufacturer: 'Sanofi',
      supplier: 'McKesson Corporation',
      lotNumber: 'SA2023K212',
      batchDate: '03/15/2023',
      description: 'Long-acting insulin used to treat diabetes',
      dosageForm: 'Solution',
      strength: '100 units/mL',
      storageConditions: 'Refrigerate until opened, then can be kept at room temperature for up to 28 days'
    }
  ]);

  const [filteredInventory, setFilteredInventory] = useState(inventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [updateStockItem, setUpdateStockItem] = useState(null);
  const [reorderItem, setReorderItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
    setCurrentPage(1); // Reset to first page when filtering
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
    setCurrentPage(1); // Reset to first page when searching
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
      'Gastrointestinal': 'bg-orange-100 text-orange-700',
      'Mental Health': 'bg-pink-100 text-pink-700',
      'Respiratory': 'bg-cyan-100 text-cyan-700',
      'Endocrine': 'bg-indigo-100 text-indigo-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
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
                  <p className="text-gray-600">
                    {filteredInventory.length} of {inventory.length} items displayed • 
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length}
                  </p>
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
                {currentItems.map((item, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
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
                                <Clock className="w-4 h-4 text-gray-500" />
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

            {/* Pagination Controls */}
            {filteredInventory.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md text-sm p-1 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                
                <PaginationControls 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length}
                </div>
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

        {/* Inventory Details Dialog - Now using the separate component */}
        <InventoryDetailsDialog
          item={detailsItem}
          open={!!detailsItem}
          onOpenChange={(open) => !open && setDetailsItem(null)}
          onUpdateStock={setUpdateStockItem}
          onReorder={setReorderItem}
        />
      </div>
    </Layout>
  );
};

export default InventoryPage;