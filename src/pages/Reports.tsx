
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, FileText, Download, Calendar, DollarSign } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    {
      name: 'Daily Sales Summary',
      description: 'Complete overview of daily prescription sales and revenue',
      type: 'Financial',
      lastGenerated: '2 hours ago',
      icon: DollarSign
    },
    {
      name: 'Prescription Volume Report',
      description: 'Analysis of prescription volumes by medication and category',
      type: 'Operations',
      lastGenerated: '4 hours ago',
      icon: BarChart3
    },
    {
      name: 'Inventory Status Report',
      description: 'Current stock levels, low stock alerts, and reorder recommendations',
      type: 'Inventory',
      lastGenerated: '1 hour ago',
      icon: FileText
    },
    {
      name: 'Patient Compliance Report',
      description: 'Analysis of patient medication adherence and refill patterns',
      type: 'Clinical',
      lastGenerated: '6 hours ago',
      icon: TrendingUp
    },
    {
      name: 'Insurance Claims Report',
      description: 'Status of insurance claims, rejections, and pending authorizations',
      type: 'Financial',
      lastGenerated: '3 hours ago',
      icon: FileText
    },
    {
      name: 'Staff Productivity Report',
      description: 'Analysis of staff performance and prescription processing times',
      type: 'Operations',
      lastGenerated: '5 hours ago',
      icon: BarChart3
    }
  ];

  const quickStats = [
    {
      title: 'Today\'s Revenue',
      value: '$12,847',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Prescriptions Filled',
      value: '247',
      change: '+12%',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Average Wait Time',
      value: '8.5 min',
      change: '-2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Customer Satisfaction',
      value: '94.2%',
      change: '+1.8%',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Financial': return 'bg-green-100 text-green-800';
      case 'Operations': return 'bg-blue-100 text-blue-800';
      case 'Inventory': return 'bg-orange-100 text-orange-800';
      case 'Clinical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Reports & Analytics" subtitle="Generate and view pharmacy performance reports">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-walgreens-red" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-walgreens-red hover:bg-walgreens-red-dark">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Daily Summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Weekly Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Custom Report Builder
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Daily Sales Summary</span>
                  <span className="text-gray-600">Every day at 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Weekly Inventory Report</span>
                  <span className="text-gray-600">Mondays at 8:00 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Monthly Compliance Report</span>
                  <span className="text-gray-600">1st of each month</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4">
                  Manage Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-walgreens-red" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <report.icon className="w-8 h-8 text-walgreens-blue mt-1" />
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                      <span className="text-xs text-gray-500">Last: {report.lastGenerated}</span>
                    </div>
                    
                    <div className="space-x-2">
                      <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                        Generate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
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

export default ReportsPage;
