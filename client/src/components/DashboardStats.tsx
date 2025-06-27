import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pill,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Queue',
      value: '12',
      subtitle: 'Pending',
      icon: Clock,
      bgColor: 'bg-orange-500',
      trend: '+2'
    },
    {
      title: 'Ready',
      value: '8',
      subtitle: 'For pickup',
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      trend: '+5'
    },
    {
      title: 'Alerts',
      value: '3',
      subtitle: 'Need attention',
      icon: AlertTriangle,
      bgColor: 'bg-red-500',
      trend: '-1'
    },
    {
      title: 'Today',
      value: '247',
      subtitle: 'Processed',
      icon: Pill,
      bgColor: 'bg-blue-500',
      trend: '+12'
    }
  ];

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-green-600';
    if (trend.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getTrendColor(stat.trend)}`}>
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
