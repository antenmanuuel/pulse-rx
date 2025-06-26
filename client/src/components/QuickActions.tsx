import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Search,
  Truck,
  AlertCircle,
  Calendar,
  Package,
  Zap
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      label: 'New Prescription',
      description: 'Enter new Rx',
      gradient: 'from-walgreens-red to-red-600',
      route: '/prescription-queue'
    },
    {
      icon: Search,
      label: 'Patient Lookup',
      description: 'Find patient info',
      gradient: 'from-walgreens-blue to-blue-600',
      route: '/patient-lookup'
    },
    {
      icon: Package,
      label: 'Inventory Check',
      description: 'Stock levels',
      gradient: 'from-green-500 to-emerald-600',
      route: '/inventory'
    },
    {
      icon: Calendar,
      label: 'Appointments',
      description: 'View schedule',
      gradient: 'from-orange-500 to-amber-600',
      route: '/appointments'
    },
    {
      icon: Truck,
      label: 'Deliveries',
      description: 'Track orders',
      gradient: 'from-teal-500 to-cyan-600',
      route: '/deliveries'
    },
    {
      icon: AlertCircle,
      label: 'View Alerts',
      description: 'Check warnings',
      gradient: 'from-red-500 to-pink-600',
      route: '/alerts'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          <div className="w-8 h-8 bg-gradient-to-br from-walgreens-red to-red-600 rounded-lg flex items-center justify-center mr-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => navigate(action.route)}
              className={`bg-gradient-to-br ${action.gradient} hover:scale-105 text-white h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border-0 group`}
            >
              <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
