
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Search, AlertTriangle, TrendingDown, Plus, Filter } from 'lucide-react';

const InventoryPage = () => {
  const inventory = [
    {
      ndc: '0071-0156-23',
      name: 'Lisinopril 10mg',
      brand: 'Prinivil',
      quantity: 150,
      minStock: 50,
      location: 'A-12',
      expiry: '06/2025',
      cost: '$0.15',
      status: 'In Stock'
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
      status: 'Low Stock'
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
      status: 'Out of Stock'
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
      status: 'Expiring Soon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-orange-100 text-orange-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Low Stock' || status === 'Out of Stock') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    if (status === 'Expiring Soon') {
      return <TrendingDown className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <Layout title="Inventory Management" subtitle="Monitor stock levels and manage pharmaceutical inventory">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Package className="w-8 h-8 text-walgreens-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">23</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <TrendingDown className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-walgreens-red" />
                Inventory Items
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search medications..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-walgreens-red hover:bg-walgreens-red-dark" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-4 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          {getStatusIcon(item.status)}
                        </div>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-xs text-gray-500">NDC: {item.ndc}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm">
                          <div className="font-medium">Quantity: {item.quantity}</div>
                          <div className="text-gray-600">Min Stock: {item.minStock}</div>
                          <div className="text-gray-600">Location: {item.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm">
                          <div className="font-medium">Cost: {item.cost}</div>
                          <div className="text-gray-600">Expiry: {item.expiry}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="ml-4 space-y-2">
                      <Button size="sm" variant="outline">
                        Update Stock
                      </Button>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InventoryPage;
