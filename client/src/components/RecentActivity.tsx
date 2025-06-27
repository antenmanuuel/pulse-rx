import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
  RefreshCw,
  MoreHorizontal,
  Truck,
  Users,
  Pill
} from 'lucide-react';

const RecentActivity = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      type: 'prescription',
      icon: Pill,
      title: 'Prescription Processed',
      description: 'Lisinopril 10mg for Sarah Johnson completed verification',
      time: '2 minutes ago',
      status: 'completed',
      user: 'Dr. Smith',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      iconColor: 'text-white',
      dotColor: 'bg-green-400'
    },
    {
      id: 2,
      type: 'delivery',
      icon: Truck,
      title: 'Delivery Assigned',
      description: 'Mike Johnson assigned for delivery to downtown area',
      time: '5 minutes ago',
      status: 'in-progress',
      user: 'Pharmacy',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconColor: 'text-white',
      dotColor: 'bg-blue-400'
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Low Stock Alert',
      description: 'Metformin 500mg below minimum threshold (12 units)',
      time: '8 minutes ago',
      status: 'pending',
      user: 'System',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      iconColor: 'text-white',
      dotColor: 'bg-orange-400'
    },
    {
      id: 4,
      type: 'appointment',
      icon: Users,
      title: 'Patient Check-in',
      description: 'Michael Brown checked in for medication consultation',
      time: '12 minutes ago',
      status: 'completed',
      user: 'Reception',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconColor: 'text-white',
      dotColor: 'bg-purple-400'
    },
    {
      id: 5,
      type: 'inventory',
      icon: Package,
      title: 'Stock Updated',
      description: 'Ibuprofen 200mg inventory updated (+150 units)',
      time: '15 minutes ago',
      status: 'completed',
      user: 'J. Wilson',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      iconColor: 'text-white',
      dotColor: 'bg-indigo-400'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { bg: 'bg-green-100', text: 'text-green-700', label: 'Done' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Active' },
      'pending': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Pending' },
      'failed': { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Badge className={`${config.bg} ${config.text} border-0 text-xs px-2 py-0.5`}>
        {config.label}
      </Badge>
    );
  };

  const handleViewAllActivity = () => {
    navigate('/alerts');
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg font-bold text-gray-900">
              <div className="w-10 h-10 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Recent Activity
            </CardTitle>
            <p className="text-sm text-gray-600">Live updates from your pharmacy</p>
          </div>
          <Button variant="ghost" size="sm" className="text-walgreens-blue hover:text-walgreens-red text-xs hover:bg-blue-50 transition-colors duration-200">
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group relative bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-all duration-200 hover:shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between space-x-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.bgColor} shadow-sm`}>
                    <activity.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.user}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-center text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-8"
            onClick={handleViewAllActivity}
          >
            <Activity className="w-4 h-4 mr-1" />
            View All Activity & Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
