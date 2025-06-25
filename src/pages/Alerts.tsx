
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
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

  const activeAlerts = getActiveAlerts().length;
  const criticalAlerts = getCriticalAlerts().length;
  const resolvedToday = getResolvedTodayCount();

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
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Layout title="System Alerts" subtitle="Monitor and manage pharmacy alerts and notifications">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold">{activeAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-walgreens-red" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`border-l-4 rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge className={getStatusColor(alert.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(alert.status)}
                              <span>{alert.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{alert.time}</p>
                          <p className="text-sm font-medium text-walgreens-blue">Action: {alert.action}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 space-x-2">
                      {alert.status === 'active' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-walgreens-red hover:bg-walgreens-red-dark"
                            onClick={() => handleTakeAction(alert)}
                          >
                            Take Action
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDismissClick(alert.id)}
                          >
                            Dismiss
                          </Button>
                        </>
                      )}
                      {alert.status === 'resolved' && (
                        <Button size="sm" variant="outline" disabled>
                          Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertActionDialog
        alert={selectedAlert}
        isOpen={isActionDialogOpen}
        onClose={() => {
          setIsActionDialogOpen(false);
          setSelectedAlert(null);
        }}
        onTakeAction={handleActionTaken}
      />

      <AlertDialog open={!!dismissAlertId} onOpenChange={() => setDismissAlertId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to dismiss this alert? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDismiss}>
              Dismiss Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AlertsPage;
