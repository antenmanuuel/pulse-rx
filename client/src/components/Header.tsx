import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Pill,
  Users,
  Package,
  Menu,
  X,
  Calendar,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simplified core navigation - 6 essential functions for modern pharmacy
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Pill, label: 'Prescriptions', path: '/prescription-queue' },
    { icon: Users, label: 'Patients', path: '/patient-lookup' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Truck, label: 'Deliveries', path: '/deliveries' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    });
    navigate('/landing');
    setIsMobileMenuOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate('/alerts');
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Modern Simplified Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    PulseRx
                  </h1>
                  <p className="text-sm text-gray-500">Pharmacy Management</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "text-walgreens-red bg-red-50 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 transition-colors duration-200",
                        isActive ? "text-walgreens-red" : "text-gray-500"
                      )} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Center Search (Desktop) */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients, prescriptions..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-walgreens-blue focus:ring-walgreens-blue focus:bg-white h-10 rounded-lg"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Toggle */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg hover:bg-gray-100"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative rounded-lg hover:bg-gray-100"
                onClick={handleNotificationsClick}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-walgreens-red border-2 border-white">
                  3
                </Badge>
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 h-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {user ? `${user.firstName} ${user.lastName}` : 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="text-sm font-medium">
                        {user ? `${user.firstName} ${user.lastName}` : 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search patients, prescriptions..."
                className="pl-10 bg-gray-50 border-gray-200 focus:border-walgreens-blue focus:ring-walgreens-blue focus:bg-white h-10 rounded-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 lg:hidden mt-20">
            <nav className="px-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "text-walgreens-red bg-red-50 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-walgreens-red" : "text-gray-500"
                      )} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
