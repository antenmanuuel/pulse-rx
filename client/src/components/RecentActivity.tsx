import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Package,
  User,
  Clock,
  ArrowRight
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
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      dotColor: 'bg-green-500'
    },
    {
      id: 2,
      type: 'inventory',
      icon: Package,
      title: 'Low Stock Alert',
      description: 'Metformin 500mg - Only 15 units remaining',
      time: '5 minutes ago',
      status: 'warning',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      dotColor: 'bg-orange-500'
    },
    {
      id: 3,
      type: 'patient',
      icon: User,
      title: 'New Patient Registration',
      description: 'Sarah Wilson - Profile created',
      time: '10 minutes ago',
      status: 'info',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      dotColor: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Drug Interaction Alert',
      description: 'RX001233 - Potential interaction detected',
      time: '15 minutes ago',
      status: 'alert',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      dotColor: 'bg-red-500'
    },
    {
      id: 5,
      type: 'prescription',
      icon: Clock,
      title: 'Prescription on Hold',
      description: 'RX001234 - Insurance authorization pending',
      time: '20 minutes ago',
      status: 'pending',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      dotColor: 'bg-yellow-500'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">Warning</Badge>;
      case 'info':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>;
      case 'alert':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Alert</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <div className="w-8 h-8 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-4 h-4 text-white" />
            </div>
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-walgreens-blue hover:text-walgreens-red text-sm">
            View All
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative group">
              {/* Timeline Line */}
              {index < activities.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
              )}

              <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group-hover:shadow-md">
                {/* Icon with dot indicator */}
                <div className="relative">
                  <div className={`w-12 h-12 ${activity.bgColor} rounded-xl flex items-center justify-center`}>
                    <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 ${activity.dotColor} rounded-full border-2 border-white`}></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last updated: 30 seconds ago</span>
            <Button variant="ghost" size="sm" className="text-walgreens-blue hover:text-walgreens-red text-xs">
              Refresh
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
