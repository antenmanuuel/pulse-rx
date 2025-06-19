
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Prescriptions Today',
      value: '247',
      change: '+12%',
      trending: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Queue Status',
      value: '12',
      subtitle: 'Pending',
      change: '-3 from yesterday',
      trending: 'down',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Patients Served',
      value: '189',
      change: '+8%',
      trending: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Critical Alerts',
      value: '5',
      subtitle: 'Need attention',
      change: '+2 new',
      trending: 'up',
      icon: AlertCircle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            {stat.subtitle && (
              <p className="text-sm text-gray-500 mb-1">{stat.subtitle}</p>
            )}
            <div className="flex items-center text-sm">
              {stat.trending === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={
                stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
