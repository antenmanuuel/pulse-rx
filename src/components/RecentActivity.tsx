
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  User,
  Clock
} from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'prescription',
      icon: CheckCircle,
      title: 'Prescription Completed',
      description: 'RX001230 - Lisinopril for John Smith',
      time: '2 minutes ago',
      status: 'completed',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'inventory',
      icon: Package,
      title: 'Low Stock Alert',
      description: 'Metformin 500mg - Only 15 units remaining',
      time: '5 minutes ago',
      status: 'warning',
      color: 'text-orange-600'
    },
    {
      id: 3,
      type: 'patient',
      icon: User,
      title: 'New Patient Registration',
      description: 'Sarah Wilson - Profile created',
      time: '10 minutes ago',
      status: 'info',
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Drug Interaction Alert',
      description: 'RX001233 - Potential interaction detected',
      time: '15 minutes ago',
      status: 'alert',
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'prescription',
      icon: Clock,
      title: 'Prescription on Hold',
      description: 'RX001234 - Insurance authorization pending',
      time: '20 minutes ago',
      status: 'pending',
      color: 'text-yellow-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'warning':
        return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      case 'alert':
        return <Badge className="bg-red-100 text-red-800">Alert</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2 text-walgreens-red" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  {getStatusBadge(activity.status)}
                </div>
                
                <p className="text-sm text-gray-600 mb-1">
                  {activity.description}
                </p>
                
                <p className="text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
