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
  Truck,
  HelpCircle,
  Moon,
  Sun,
  AlertTriangle,
  Shield
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
  const { user, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/patient-lookup?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would implement actual dark mode logic
    toast({
      title: `${isDarkMode ? 'Light' : 'Dark'} mode ${isDarkMode ? 'disabled' : 'enabled'}`,
      description: "Theme preference saved"
    });
  };

  return (
    <>
      {/* Clean Navigation Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-6 py-2">
          <div className="flex items-center w-full">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-walgreens-red to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pulse RX</h1>
              </div>
            </div>

            {/* Full Width Navigation - Hidden for admin users */}
            {!isAdmin() && (
              <nav className="hidden lg:flex flex-1 items-center justify-center px-8">
                <div className="flex items-center justify-between w-full max-w-4xl">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePage(item.path);

                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 min-w-0",
                          isActive
                            ? "text-walgreens-red bg-red-50 border border-red-100"
                            : "text-gray-700 hover:text-walgreens-red hover:bg-gray-50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}

            {/* Admin Navigation - Only shown for admin users */}
            {isAdmin() && (
              <nav className="hidden lg:flex flex-1 items-center justify-center px-8">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => navigate('/admin-dashboard')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      isActivePage('/admin-dashboard')
                        ? "text-walgreens-red bg-red-50 border border-red-100"
                        : "text-gray-700 hover:text-walgreens-red hover:bg-gray-50"
                    )}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate('/staff-management')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      isActivePage('/staff-management')
                        ? "text-walgreens-red bg-red-50 border border-red-100"
                        : "text-gray-700 hover:text-walgreens-red hover:bg-gray-50"
                    )}
                  >
                    <Users className="w-4 h-4" />
                    <span>Staff Management</span>
                  </button>
                  <button
                    onClick={() => navigate('/vendor-management')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      isActivePage('/vendor-management')
                        ? "text-walgreens-red bg-red-50 border border-red-100"
                        : "text-gray-700 hover:text-walgreens-red hover:bg-gray-50"
                    )}
                  >
                    <Package className="w-4 h-4" />
                    <span>Vendor Management</span>
                  </button>
                </div>
              </nav>
            )}

            {/* Search Bar */}
            <div className="hidden md:flex items-center min-w-0 max-w-sm mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search patients, prescriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-walgreens-red focus:ring-walgreens-red rounded-md text-sm"
                  />
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 min-w-0">
              {/* Quick Search (Mobile) */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden rounded-md hover:bg-gray-100 h-9 w-9"
                onClick={() => navigate('/patient-lookup')}
              >
                <Search className="w-5 h-5 text-gray-600" />
              </Button>

              {/* System Status */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center space-x-1 px-2 py-1 bg-green-50 rounded-md hover:bg-green-100 h-9"
                onClick={() => navigate('/issues')}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 font-medium">Online</span>
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md hover:bg-gray-100 h-9 w-9"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </Button>

              {/* Help */}
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md hover:bg-gray-100 h-9 w-9"
                onClick={() => navigate('/help')}
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative rounded-md hover:bg-gray-100 h-9 w-9"
                onClick={handleNotificationsClick}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-walgreens-red border-2 border-white flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 h-9">
                    <div className="w-7 h-7 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-full flex items-center justify-center">
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
                  {isAdmin() && (
                    <DropdownMenuItem onClick={() => navigate('/admin-dashboard')} className="hover:bg-gray-50">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
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
                className="lg:hidden rounded-md hover:bg-gray-100 h-9 w-9"
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
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 lg:hidden mt-[72px]">
            <nav className="px-4 py-6">
              {!isAdmin() ? (
                <div className="grid grid-cols-2 gap-3">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePage(item.path);

                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          "flex flex-col items-center space-y-2 px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200",
                          isActive
                            ? "text-white bg-gradient-to-r from-walgreens-red to-red-600 shadow-lg"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation('/admin-dashboard')}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 w-full",
                      isActivePage('/admin-dashboard')
                        ? "text-white bg-gradient-to-r from-walgreens-red to-red-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/staff-management')}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 w-full",
                      isActivePage('/staff-management')
                        ? "text-white bg-gradient-to-r from-walgreens-red to-red-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Users className="w-5 h-5" />
                    <span>Staff Management</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/vendor-management')}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 w-full",
                      isActivePage('/vendor-management')
                        ? "text-white bg-gradient-to-r from-walgreens-red to-red-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Package className="w-5 h-5" />
                    <span>Vendor Management</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;