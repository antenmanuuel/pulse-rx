import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Bell,
  User,
  MessageCircle,
  Settings,
  LogOut,
  LayoutDashboard,
  Pill,
  Users,
  Package,
  Calendar,
  Truck,
  AlertTriangle,
  Menu,
  X
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

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Pill, label: 'Prescriptions', path: '/prescription-queue' },
    { icon: Users, label: 'Patients', path: '/patient-lookup' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Truck, label: 'Deliveries', path: '/deliveries' },
  ];

  const handleMessagesClick = () => {
    navigate('/messages');
    setIsMobileMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsMobileMenuOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate('/alerts');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    });
    navigate('/landing');
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
      {/* Modern Single-Tier Header */}
      <header className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-lg">IC+</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    IC+ System
                  </h1>
                  <p className="text-sm text-gray-500">Walgreens Internal Platform</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1 ml-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 relative group",
                        isActive
                          ? "text-walgreens-red bg-gradient-to-r from-red-50 to-red-100 shadow-md border border-red-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 transition-colors duration-300",
                        isActive ? "text-walgreens-red" : "text-gray-500 group-hover:text-gray-700"
                      )} />
                      <span className="hidden xl:inline">{item.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-walgreens-red/5 to-red-600/5 rounded-xl"></div>
                      )}
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
                  placeholder="Search patients, prescriptions, NDCs..."
                  className="pl-10 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 focus:border-walgreens-blue focus:ring-walgreens-blue focus:bg-white h-10 rounded-xl shadow-sm transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Mobile Search Toggle */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                onClick={handleMessagesClick}
              >
                <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-gradient-to-r from-walgreens-red to-red-600 border-2 border-white shadow-lg animate-pulse">
                  3
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="relative rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                onClick={handleNotificationsClick}
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-gradient-to-r from-orange-500 to-orange-600 border-2 border-white shadow-lg animate-pulse">
                  7
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                onClick={handleSettingsClick}
              >
                <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-xl hover:from-gray-100 hover:to-gray-200 h-10 shadow-sm transition-all duration-300 border border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {user ? `${user.firstName} ${user.lastName}` : 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-xl border-gray-200 rounded-xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user ? `${user.firstName} ${user.lastName}` : 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || 'user@walgreens.com'}
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSettingsClick} className="rounded-lg transition-colors duration-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 rounded-lg transition-colors duration-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden rounded-xl hover:bg-gray-100 transition-colors duration-200"
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
                placeholder="Search patients, prescriptions, NDCs..."
                className="pl-10 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 focus:border-walgreens-blue focus:ring-walgreens-blue focus:bg-white h-10 rounded-xl shadow-sm transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
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
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300",
                        isActive
                          ? "text-walgreens-red bg-gradient-to-r from-red-50 to-red-100 shadow-md border border-red-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
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

              {/* Mobile Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleMessagesClick}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Messages</span>
                    <Badge className="ml-auto bg-walgreens-red text-white">3</Badge>
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
