import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NewPrescriptionDialog from '@/components/NewPrescriptionDialog';
import {
  Search,
  AlertTriangle,
  Package,
  ArrowRight,
  Activity,
  Clock,
  Calendar,
  Truck,
  Bug,
  HelpCircle,
  Pill
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Pill,
      label: 'Prescriptions',
      description: 'Manage and process prescriptions',
      gradient: 'from-walgreens-red to-red-600',
      route: '/prescription-queue',
      stats: '12 in queue',
      urgency: 'normal',
      priority: 1
    },
    {
      icon: Search,
      label: 'Patient Lookup',
      description: 'Search patient records',
      gradient: 'from-walgreens-blue to-blue-600',
      route: '/patient-lookup',
      stats: '1,247 patients',
      urgency: 'normal',
      priority: 2
    },
    {
      icon: Calendar,
      label: 'Appointments',
      description: 'Schedule & manage visits',
      gradient: 'from-purple-500 to-violet-600',
      route: '/appointments',
      stats: '8 today',
      urgency: 'normal',
      priority: 3
    },
    {
      icon: Truck,
      label: 'Deliveries',
      description: 'Track & manage deliveries',
      gradient: 'from-indigo-500 to-blue-600',
      route: '/deliveries',
      stats: '5 active',
      urgency: 'warning',
      priority: 4
    },
    {
      icon: Package,
      label: 'Inventory',
      description: 'Check stock levels',
      gradient: 'from-green-500 to-emerald-600',
      route: '/inventory',
      stats: '5 low stock',
      urgency: 'warning',
      priority: 5
    },
    {
      icon: AlertTriangle,
      label: 'Alerts',
      description: 'View urgent notifications',
      gradient: 'from-red-500 to-pink-600',
      route: '/alerts',
      stats: '3 active',
      urgency: 'urgent',
      priority: 6
    },
    {
      icon: Bug,
      label: 'Report Issue',
      description: 'Submit bugs & requests',
      gradient: 'from-orange-500 to-red-500',
      route: '/issues',
      stats: 'System: Online',
      urgency: 'normal',
      priority: 7
    },
    {
      icon: HelpCircle,
      label: 'Help Center',
      description: 'Documentation & guides',
      gradient: 'from-gray-500 to-slate-600',
      route: '/help',
      stats: 'Get support',
      urgency: 'normal',
      priority: 8
    }
  ];

  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>;
      case 'warning':
        return <div className="w-2 h-2 bg-orange-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
    }
  };

  const handleNewPrescription = (prescriptionData: any) => {
    console.log('New prescription created:', prescriptionData);
    // Navigate to prescription queue after creating
    navigate('/prescription-queue');
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg font-bold text-gray-900">
              <Activity className="w-5 h-5 mr-2 text-walgreens-blue" />
              Quick Actions
            </CardTitle>
            <p className="text-sm text-gray-600">Essential pharmacy functions</p>
          </div>
          <Badge variant="outline" className="border-gray-300 text-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {/* New Prescription Button */}
          <NewPrescriptionDialog onSubmit={handleNewPrescription} />
          
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => navigate(action.route)}
              className={`group relative overflow-hidden bg-gradient-to-r ${action.gradient} hover:scale-[1.01] text-white h-auto p-4 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md border-0 rounded-lg`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{action.label}</div>
                  <div className="text-xs text-white/80">{action.description}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 relative z-10">
                <div className="text-right">
                  <div className="text-xs text-white/90 font-medium">{action.stats}</div>
                  <div className="flex items-center space-x-1 justify-end">
                    {getUrgencyIndicator(action.urgency)}
                    <span className="text-xs text-white/70">
                      {action.urgency === 'urgent' ? 'Urgent' :
                        action.urgency === 'warning' ? 'Attention' : 'Normal'}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Button>
          ))}
        </div>

        {/* Quick Status */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;