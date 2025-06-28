import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pill,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const DashboardStats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Queue',
      value: '12',
      subtitle: 'Pending prescriptions',
      icon: Clock,
      bgColor: 'bg-orange-500',
      trend: '+2',
      route: '/prescription-queue',
      actionable: true
    },
    {
      title: 'Ready',
      value: '8',
      subtitle: 'For pickup',
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      trend: '+5',
      route: '/prescription-queue',
      actionable: false
    },
    {
      title: 'Alerts',
      value: '3',
      subtitle: 'Need attention',
      icon: AlertTriangle,
      bgColor: 'bg-red-500',
      trend: '-1',
      route: '/alerts',
      actionable: true
    }
  ];

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-green-600';
    if (trend.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
            stat.actionable ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
          }`}
          onClick={() => stat.actionable && navigate(stat.route)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  {stat.actionable && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className={`text-xs px-2 py-1 font-medium ${getTrendColor(stat.trend)} border-current`}>
                  {stat.trend}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
