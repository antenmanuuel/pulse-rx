
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle, XCircle, Info } from 'lucide-react';

const AlertsPage = () => {
  const alerts = [
    {
      id: 'AL001',
      type: 'critical',
      title: 'Drug Interaction Alert',
      description: 'Patient John Smith (RX001234) - Potential interaction between Warfarin and Aspirin',
      time: '5 minutes ago',
      status: 'active',
      action: 'Contact prescriber'
    },
    {
      id: 'AL002',
      type: 'warning',
      title: 'Low Stock Alert',
      description: 'Metformin 500mg - Only 15 units remaining (Below minimum threshold of 50)',
      time: '15 minutes ago',
      status: 'active',
      action: 'Reorder medication'
    },
    {
      id: 'AL003',
      type: 'info',
      title: 'Insurance Authorization Required',
      description: 'Patient Maria Garcia (RX001235) - Prior authorization needed for Humira',
      time: '30 minutes ago',
      status: 'pending',
      action: 'Submit authorization'
    },
    {
      id: 'AL004',
      type: 'critical',
      title: 'Allergy Alert',
      description: 'Patient Robert Davis prescribed Penicillin - Known allergy on file',
      time: '1 hour ago',
      status: 'resolved',
      action: 'Alternative prescribed'
    },
    {
      id: 'AL005',
      type: 'warning',
      title: 'Expiring Medication',
      description: 'Atorvastatin 20mg (Lot: ABC123) expires in 30 days',
      time: '2 hours ago',
      status: 'active',
      action: 'Return to supplier'
    }
  ];

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

  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;
  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && alert.status === 'active').length;

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
                  <p className="text-2xl font-bold text-green-600">8</p>
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
                          <Button size="sm" className="bg-walgreens-red hover:bg-walgreens-red-dark">
                            Take Action
                          </Button>
                          <Button size="sm" variant="outline">
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
    </Layout>
  );
};

export default AlertsPage;
