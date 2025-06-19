
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  FileText, 
  Truck, 
  BarChart3, 
  AlertCircle,
  Calendar,
  Package
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      label: 'New Prescription',
      description: 'Enter new Rx',
      color: 'bg-walgreens-red hover:bg-walgreens-red-dark text-white',
      route: '/prescription-queue'
    },
    {
      icon: Search,
      label: 'Patient Lookup',
      description: 'Find patient info',
      color: 'bg-walgreens-blue hover:bg-walgreens-blue/90 text-white',
      route: '/patient-lookup'
    },
    {
      icon: Package,
      label: 'Inventory Check',
      description: 'Stock levels',
      color: 'bg-green-600 hover:bg-green-700 text-white',
      route: '/inventory'
    },
    {
      icon: FileText,
      label: 'Generate Report',
      description: 'Daily summary',
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      route: '/reports'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      description: 'View appointments',
      color: 'bg-orange-600 hover:bg-orange-700 text-white',
      route: '/appointments'
    },
    {
      icon: Truck,
      label: 'Deliveries',
      description: 'Track orders',
      color: 'bg-teal-600 hover:bg-teal-700 text-white',
      route: '/deliveries'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-walgreens-red" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => navigate(action.route)}
              className={`${action.color} h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:scale-105 cursor-pointer`}
            >
              <action.icon className="w-6 h-6" />
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
