import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleNotificationsClick = () => {
    navigate('/alerts');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-walgreens-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">IC+ System</h1>
              <p className="text-sm text-gray-500">Pharmacy Management</p>
            </div>
          </div>
          
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search patients, prescriptions, NDCs..." 
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={handleMessagesClick}
          >
            <MessageCircle className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-walgreens-red">3</Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={handleNotificationsClick}
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-walgreens-red">7</Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSettingsClick}
          >
            <Settings className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Sarah Johnson, PharmD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
