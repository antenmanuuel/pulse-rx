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
import { InventoryItem, inventoryData } from '@/data/inventoryData';

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(inventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [updateStockItem, setUpdateStockItem] = useState<InventoryItem | null>(null);
  const [reorderItem, setReorderItem] = useState<InventoryItem | null>(null);
  const [detailsItem, setDetailsItem] = useState<InventoryItem | null>(null);
  
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