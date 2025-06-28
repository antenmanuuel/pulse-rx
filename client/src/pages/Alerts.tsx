import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Search,
  TrendingUp,
  Activity,
  Shield,
  Target,
  Zap,
  Archive,
  Filter,
  Trash2,
  Pill,
  Truck,
  Users,
  Package
} from 'lucide-react';
import { useAlerts, Alert } from '@/hooks/useAlerts';
import AlertActionDialog from '@/components/AlertActionDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AlertsPage = () => {
  const {
    alerts,
    activities,
    getAllItems,
    takeAction,
    dismissAlert,
    deleteItem,
    archiveAlert,
    archiveMultipleAlerts,
    deleteMultipleItems,
    getActiveAlerts,
    getActiveActivities,
    getCriticalAlerts,
    getResolvedTodayCount,
    getArchivedAlerts
  } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [dismissAlertId, setDismissAlertId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info' | 'activity'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'resolved' | 'completed'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'alert' | 'activity'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const activeAlerts = getActiveAlerts().length;
  const activeActivities = getActiveActivities().length;
  const criticalAlerts = getCriticalAlerts().length;
  const resolvedToday = getResolvedTodayCount();
  const archivedItems = getArchivedAlerts().length;

  // Simplified Stats Data
  const alertStats = [
    {
      label: 'Active Alerts',
      value: activeAlerts,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: activeAlerts > 5 ? 'High volume' : 'Normal levels'
    },
    {
      label: 'Critical Items',
      value: criticalAlerts,
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: criticalAlerts > 0 ? 'Needs attention' : 'All clear'
    }
  ];

  const handleTakeAction = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsActionDialogOpen(true);
  };

  const handleActionTaken = (itemId: string, notes?: string) => {
    takeAction(itemId);
    console.log(`Action taken on item ${itemId}${notes ? ` with notes: ${notes}` : ''}`);
  };

  const handleDismissClick = (itemId: string) => {
    setDismissAlertId(itemId);
  };

  const handleDeleteClick = (itemId: string) => {
    setDeleteItemId(itemId);
  };

  const handleConfirmDismiss = () => {
    if (dismissAlertId) {
      dismissAlert(dismissAlertId);
      setDismissAlertId(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deleteItem(deleteItemId);
      setDeleteItemId(null);
    }
  };

  const handleArchiveToggle = () => {
    setShowArchived(!showArchived);
  };

  const handleBulkArchive = () => {
    if (selectedItems.length > 0) {
      archiveMultipleAlerts(selectedItems);
      setSelectedItems([]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length > 0) {
      deleteMultipleItems(selectedItems);
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAllItems = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleApplyFilters = () => {
    setIsFilterDialogOpen(false);
  };

  const handleClearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setFilterCategory('all');
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filterType !== 'all') count++;
    if (filterStatus !== 'all') count++;
    if (filterCategory !== 'all') count++;
    if (searchTerm) count++;
    return count;
  };

  const getItemIcon = (item: any) => {
    if (item.category === 'alert') {
      switch (item.type) {
        case 'critical': return <AlertTriangle className="w-6 h-6 text-red-600" />;
        case 'warning': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
        case 'info': return <Info className="w-6 h-6 text-blue-600" />;
        default: return <Info className="w-6 h-6 text-gray-600" />;
      }
    } else {
      // Activity icons
      switch (item.type) {
        case 'prescription': return <Pill className="w-6 h-6 text-green-600" />;
        case 'delivery': return <Truck className="w-6 h-6 text-blue-600" />;
        case 'appointment': return <Users className="w-6 h-6 text-purple-600" />;
        case 'inventory': return <Package className="w-6 h-6 text-indigo-600" />;
        default: return <Activity className="w-6 h-6 text-gray-600" />;
      }
    }
  };

  const getItemTypeColor = (item: any) => {
    if (item.category === 'alert') {
      switch (item.type) {
        case 'critical': return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
        case 'warning': return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
        case 'info': return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
        default: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      }
    } else {
      // Activity colors
      switch (item.type) {
        case 'prescription': return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200';
        case 'delivery': return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
        case 'appointment': return 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200';
        case 'inventory': return 'bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200';
        default: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Activity className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (item: any) => {
    if (item.category === 'alert') {
      switch (item.type) {
        case 'critical': return '🚨';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
        default: return 'ℹ️';
      }
    } else {
      // Activity type icons
      switch (item.type) {
        case 'prescription': return '💊';
        case 'delivery': return '🚚';
        case 'appointment': return '👥';
        case 'inventory': return '📦';
        case 'system': return '⚙️';
        default: return '📋';
      }
    }
  };

  // Filter all items (alerts and activities) based on search and filter criteria
  const allItems = getAllItems();
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category === 'alert' ? (item as Alert).action.toLowerCase().includes(searchTerm.toLowerCase()) :
        (item as any).user.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'all' ||
      (filterType === 'activity' ? item.category === 'activity' :
        (item.category === 'alert' && (item as Alert).type === filterType));

    const matchesStatus = filterStatus === 'all' ||
      (item.category === 'alert' ? (item as Alert).status === filterStatus :
        (item as any).status === filterStatus);

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesArchive = showArchived ? item.archived : !item.archived;

    return matchesSearch && matchesType && matchesStatus && matchesCategory && matchesArchive;
  });

  return (
    <Layout title="System Alerts & Activity" subtitle="Monitor and manage pharmacy alerts, notifications, and activities">
      <div className="space-y-8">
        {/* Simplified Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {alertStats.map((stat, index) => (
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

        {/* Enhanced Main Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                    {showArchived ? 'Archived Items' : 'Alerts & Activity'}
                  </CardTitle>
                  <p className="text-sm lg:text-base text-gray-600">
                    {filteredItems.length} items • {activeAlerts} alerts • {activeActivities} activities
                    {getActiveFilterCount() > 0 && ` • ${getActiveFilterCount()} filter(s) applied`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search alerts & activities..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  {/* Filter Dialog */}
                  <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 relative"
                      >
                        <Filter className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Filter</span>
                        {getActiveFilterCount() > 0 && (
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-walgreens-red text-white text-xs p-0 flex items-center justify-center">
                            {getActiveFilterCount()}
                          </Badge>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 flex items-center">
                          <Filter className="w-5 h-5 mr-2 text-walgreens-blue" />
                          Filter Items
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="itemCategory" className="text-sm font-medium text-gray-700">
                            Category
                          </Label>
                          <Select value={filterCategory} onValueChange={(value: 'all' | 'alert' | 'activity') => setFilterCategory(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="alert">🚨 Alerts</SelectItem>
                              <SelectItem value="activity">📋 Activities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="itemType" className="text-sm font-medium text-gray-700">
                            Type
                          </Label>
                          <Select value={filterType} onValueChange={(value: 'all' | 'critical' | 'warning' | 'info' | 'activity') => setFilterType(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="critical">🚨 Critical</SelectItem>
                              <SelectItem value="warning">⚠️ Warning</SelectItem>
                              <SelectItem value="info">ℹ️ Info</SelectItem>
                              <SelectItem value="activity">📋 Activity</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="itemStatus" className="text-sm font-medium text-gray-700">
                            Status
                          </Label>
                          <Select value={filterStatus} onValueChange={(value: 'all' | 'active' | 'pending' | 'resolved' | 'completed') => setFilterStatus(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="active">🔴 Active</SelectItem>
                              <SelectItem value="pending">🟡 Pending</SelectItem>
                              <SelectItem value="resolved">🟢 Resolved</SelectItem>
                              <SelectItem value="completed">✅ Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Clear Filters
                          </Button>
                          <Button
                            onClick={handleApplyFilters}
                            className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Archive Toggle Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    onClick={handleArchiveToggle}
                  >
                    <Archive className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {showArchived ? 'Show Active' : 'Show Archived'}
                    </span>
                  </Button>

                  {/* Bulk Action Buttons */}
                  {selectedItems.length > 0 && !showArchived && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white"
                        onClick={handleBulkArchive}
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        Archive ({selectedItems.length})
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        onClick={handleBulkDelete}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete ({selectedItems.length})
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'All items have been processed.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Bulk Actions Header */}
                {!showArchived && filteredItems.length > 0 && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onCheckedChange={handleSelectAllItems}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedItems.length > 0
                          ? `${selectedItems.length} item(s) selected`
                          : 'Select all items'
                        }
                      </span>
                    </div>
                    {selectedItems.length > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedItems([])}
                        className="border-gray-300 text-gray-700 hover:bg-white"
                      >
                        Clear Selection
                      </Button>
                    )}
                  </div>
                )}

                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`${getItemTypeColor(item)} border hover:shadow-md transition-all duration-200 ${selectedItems.includes(item.id) ? 'ring-2 ring-walgreens-blue' : ''
                      }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Selection Checkbox */}
                          {!showArchived && (
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                              className="mt-1"
                            />
                          )}

                          <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center shadow-sm">
                            {getItemIcon(item)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>

                              <Badge className={`${getStatusColor(item.category === 'alert' ? (item as Alert).status : (item as any).status)} border font-medium`}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(item.category === 'alert' ? (item as Alert).status : (item as any).status)}
                                  <span>{item.category === 'alert' ? (item as Alert).status : (item as any).status}</span>
                                </div>
                              </Badge>

                              <Badge className="bg-gray-100 text-gray-700 border-gray-200 border font-medium">
                                <span className="mr-1">{getPriorityIcon(item)}</span>
                                {item.category === 'alert' ? (item as Alert).type : item.category}
                              </Badge>

                              {item.archived && (
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200 border font-medium">
                                  <Archive className="w-3 h-3 mr-1" />
                                  Archived
                                </Badge>
                              )}
                            </div>

                            <p className="text-gray-700 mb-3 leading-relaxed">{item.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <p className="text-sm text-gray-500 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {item.time}
                                </p>
                                {item.category === 'activity' && (
                                  <p className="text-sm text-gray-500 flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {(item as any).user}
                                  </p>
                                )}
                              </div>
                              {item.category === 'alert' && (
                                <div className="bg-white/70 px-3 py-1 rounded-lg border border-gray-200">
                                  <p className="text-sm font-medium text-walgreens-blue">
                                    <Target className="w-4 h-4 inline mr-1" />
                                    Action: {(item as Alert).action}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 space-y-2 flex flex-col">
                          {/* Archive/Unarchive Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={() => archiveAlert(item.id)}
                          >
                            <Archive className="w-4 h-4 mr-1" />
                            {item.archived ? 'Unarchive' : 'Archive'}
                          </Button>

                          {/* Action Buttons for Active Items */}
                          {!item.archived && (
                            <>
                              {/* Take Action Button (for alerts and pending activities) */}
                              {(item.category === 'alert' && (item as Alert).status === 'active') ||
                                (item.category === 'activity' && (item as any).status === 'pending') && (
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                                    onClick={() => handleTakeAction(item as Alert)}
                                  >
                                    <Zap className="w-4 h-4 mr-1" />
                                    Take Action
                                  </Button>
                                )}

                              {/* Dismiss Button */}
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => handleDismissClick(item.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Dismiss
                              </Button>

                              {/* Delete Button */}
                              <Button
                                size="sm"
                                variant="destructive"
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Alert Action Dialog */}
      <AlertActionDialog
        alert={selectedAlert}
        isOpen={isActionDialogOpen}
        onClose={() => {
          setIsActionDialogOpen(false);
          setSelectedAlert(null);
        }}
        onTakeAction={handleActionTaken}
      />

      {/* Enhanced Dismiss Confirmation Dialog */}
      <AlertDialog open={!!dismissAlertId} onOpenChange={() => setDismissAlertId(null)}>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">
                  Dismiss Item
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Are you sure you want to dismiss this item? This action cannot be undone.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Warning</h4>
                <p className="text-sm text-yellow-700">
                  Dismissing this item will remove it permanently from your view. Consider archiving instead if you might need to reference it later.
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDismiss}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Dismiss Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteItemId} onOpenChange={() => setDeleteItemId(null)}>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">
                  Delete Item Permanently
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Are you sure you want to permanently delete this item? This action cannot be undone.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Permanent Deletion</h4>
                <p className="text-sm text-red-700">
                  This item will be permanently removed from the system and cannot be recovered. Consider archiving instead if you might need to reference it later.
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AlertsPage;
