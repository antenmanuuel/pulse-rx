import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Filter
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
    takeAction,
    dismissAlert,
    getActiveAlerts,
    getCriticalAlerts,
    getResolvedTodayCount
  } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [dismissAlertId, setDismissAlertId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const activeAlerts = getActiveAlerts().length;
  const criticalAlerts = getCriticalAlerts().length;
  const resolvedToday = getResolvedTodayCount();

  // Enhanced Stats Data
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
      label: 'Critical Alerts',
      value: criticalAlerts,
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: criticalAlerts > 0 ? 'Needs attention' : 'All clear'
    },
    {
      label: 'Resolved Today',
      value: resolvedToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+3 since morning'
    },
    {
      label: 'Response Time',
      value: '4.2m',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: 'Avg response time'
    }
  ];

  const handleTakeAction = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsActionDialogOpen(true);
  };

  const handleActionTaken = (alertId: string, notes?: string) => {
    takeAction(alertId);
    console.log(`Action taken on alert ${alertId}${notes ? ` with notes: ${notes}` : ''}`);
  };

  const handleDismissClick = (alertId: string) => {
    setDismissAlertId(alertId);
  };

  const handleConfirmDismiss = () => {
    if (dismissAlertId) {
      dismissAlert(dismissAlertId);
      setDismissAlertId(null);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'info': return <Info className="w-6 h-6 text-blue-600" />;
      default: return <Info className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'warning': return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
      case 'info': return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-600" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-green-600 rotate-180" />;
      default: return <Activity className="w-3 h-3 text-gray-600" />;
    }
  };

  // Filter alerts based on search and filter type
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || alert.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout title="System Alerts" subtitle="Monitor and manage pharmacy alerts and notifications">
      <div className="space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

        {/* Enhanced Main Alerts Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                    System Alerts
                  </CardTitle>
                  <p className="text-sm lg:text-base text-gray-600">
                    {filteredAlerts.length} alerts • {activeAlerts} active • {criticalAlerts} critical
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search alerts..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400 hover:bg-gray-50">
                    <Archive className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Archive</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'All alerts have been resolved.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`${getAlertTypeColor(alert.type)} border hover:shadow-md transition-all duration-200`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center shadow-sm">
                            {getAlertIcon(alert.type)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">{alert.title}</h3>

                              <Badge className={`${getStatusColor(alert.status)} border font-medium`}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(alert.status)}
                                  <span>{alert.status}</span>
                                </div>
                              </Badge>

                              <Badge className="bg-gray-100 text-gray-700 border-gray-200 border font-medium">
                                <span className="mr-1">{getPriorityIcon(alert.type)}</span>
                                {alert.type}
                              </Badge>
                            </div>

                            <p className="text-gray-700 mb-3 leading-relaxed">{alert.description}</p>

                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {alert.time}
                              </p>
                              <div className="bg-white/70 px-3 py-1 rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-walgreens-blue">
                                  <Target className="w-4 h-4 inline mr-1" />
                                  Action: {alert.action}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 space-y-2 flex flex-col">
                          {alert.status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                                onClick={() => handleTakeAction(alert)}
                              >
                                <Zap className="w-4 h-4 mr-1" />
                                Take Action
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => handleDismissClick(alert.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Dismiss
                              </Button>
                            </>
                          )}
                          {alert.status === 'pending' && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg"
                              onClick={() => handleTakeAction(alert)}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              Continue
                            </Button>
                          )}
                          {alert.status === 'resolved' && (
                            <Button size="sm" variant="outline" disabled className="opacity-60">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolved
                            </Button>
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
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">
                  Dismiss Alert
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Are you sure you want to dismiss this alert? This action cannot be undone.
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
                  Dismissing this alert will remove it permanently. Consider taking action instead if the issue requires resolution.
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
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Dismiss Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AlertsPage;
