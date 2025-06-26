import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Activity
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Prescriptions Today',
      value: '247',
      change: '+12%',
      changeLabel: 'from yesterday',
      trending: 'up',
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
      lightBg: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Queue Status',
      value: '12',
      subtitle: 'Pending',
      change: '-3',
      changeLabel: 'from yesterday',
      trending: 'down',
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-orange-500 to-amber-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Patients Served',
      value: '189',
      change: '+8%',
      changeLabel: 'from yesterday',
      trending: 'up',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Critical Alerts',
      value: '5',
      subtitle: 'Need attention',
      change: '+2',
      changeLabel: 'new alerts',
      trending: 'up',
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-br from-red-500 to-pink-600',
      lightBg: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const quickMetrics = [
    { label: 'Avg. Processing Time', value: '4.2 min', icon: Activity },
    { label: 'Customer Satisfaction', value: '94%', icon: TrendingUp },
    { label: 'System Uptime', value: '99.9%', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {stat.title}
              </h3>

              {/* Value */}
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                {stat.subtitle && (
                  <span className="text-sm text-gray-500">{stat.subtitle}</span>
                )}
              </div>

              {/* Change Indicator */}
              <div className="flex items-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.trending === 'up'
                    ? 'bg-green-100 text-green-800'
                    : stat.trending === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                  {stat.trending === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : stat.trending === 'down' ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : null}
                  <span>{stat.change}</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">{stat.changeLabel}</span>
              </div>

              {/* Background Pattern */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${stat.lightBg} rounded-full -mr-10 -mt-10 opacity-50`}></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Metrics Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Today's Performance</h3>
              <p className="text-sm text-gray-600">Real-time operational metrics</p>
            </div>

            <div className="flex items-center space-x-8">
              {quickMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <metric.icon className="w-4 h-4 text-walgreens-blue" />
                    <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
