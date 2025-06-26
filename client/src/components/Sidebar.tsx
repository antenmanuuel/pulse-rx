
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Pill, 
  Package, 
  AlertTriangle,
  Calendar,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', count: null },
    { icon: Pill, label: 'Prescription Queue', path: '/prescription-queue', count: 12 },
    { icon: Users, label: 'Patient Lookup', path: '/patient-lookup', count: null },
    { icon: Package, label: 'Inventory', path: '/inventory', count: 3 },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts', count: 5 },
    { icon: Calendar, label: 'Appointments', path: '/appointments', count: 8 },
    { icon: Truck, label: 'Deliveries', path: '/deliveries', count: null },
  ];

  return (
    <aside className="w-64 bg-walgreens-blue text-white min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-walgreens-red rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">IC+</span>
            </div>
            <p className="text-sm text-blue-200">Store #4521</p>
            <p className="text-xs text-blue-300">Main Street Pharmacy</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={index} to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive 
                      ? 'bg-white text-walgreens-blue hover:bg-gray-100' 
                      : 'text-blue-100 hover:bg-walgreens-blue/80 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <Badge 
                      className={`ml-2 ${
                        isActive 
                          ? 'bg-walgreens-red text-white' 
                          : 'bg-walgreens-red/80 text-white'
                      }`}
                    >
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
