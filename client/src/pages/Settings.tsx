import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Camera,
  AlertTriangle,
  Save,
  Lock,
  Smartphone
} from 'lucide-react';

const SettingsPage = () => {
  const { user, isAdmin } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '(555) 123-4567',
    role: '',
    employeeId: 'WT-12345',
    storeLocation: 'Store #001 - Main Street'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    prescriptionAlerts: true,
    inventoryAlerts: false,
    deliveryUpdates: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'EST',
    defaultView: 'dashboard'
  });

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '(555) 123-4567', // Example data
        role: user.role || 'user',
        employeeId: 'WT-12345', // Example data
        storeLocation: 'Store #001 - Main Street' // Example data
      });
    }
  }, [user]);

  return (
    <Layout title="Settings" subtitle="Manage your profile and application preferences">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">

          {/* Profile Section */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <User className="w-5 h-5 mr-2" />
                Profile
              </CardTitle>
              <p className="text-sm text-gray-600">Manage your personal information and work details</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Profile Picture */}
              <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
                <Avatar className="w-24 h-24 border-4 border-gray-200 shadow-lg">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="bg-walgreens-red text-white text-2xl font-semibold">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-600 mt-1">Update your profile photo to personalize your account</p>
                  <p className="text-xs text-gray-500 mt-2">Recommended: Square image, JPG or PNG, max 2MB</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Remove
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900">Employment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Employee ID</Label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-medium text-gray-900">{profileData.employeeId}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Role</Label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-medium text-gray-900">
                        {isAdmin() ? 'Administrator' : profileData.role || 'Staff Member'}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Store Location</Label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-medium text-gray-900">{profileData.storeLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button className="bg-walgreens-red hover:bg-red-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <SettingsIcon className="w-5 h-5 mr-2" />
                Preferences
              </CardTitle>
              <p className="text-sm text-gray-600">Customize your application experience and interface</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Display Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                      <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">🌞 Light</SelectItem>
                        <SelectItem value="dark">🌙 Dark</SelectItem>
                        <SelectItem value="auto">🔄 Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Language</Label>
                    <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                      <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                        <SelectItem value="fr">🇫🇷 French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900">System Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}>
                      <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EST">🕐 Eastern (EST)</SelectItem>
                        <SelectItem value="CST">🕑 Central (CST)</SelectItem>
                        <SelectItem value="MST">🕒 Mountain (MST)</SelectItem>
                        <SelectItem value="PST">🕓 Pacific (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Default View</Label>
                    <Select 
                      value={preferences.defaultView} 
                      onValueChange={(value) => setPreferences({ ...preferences, defaultView: value })}
                    >
                      <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isAdmin() ? (
                          <>
                            <SelectItem value="admin-dashboard">📊 Admin Dashboard</SelectItem>
                            <SelectItem value="staff-management">👥 Staff Management</SelectItem>
                            <SelectItem value="vendor-management">🏢 Vendor Management</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="dashboard">📊 Dashboard</SelectItem>
                            <SelectItem value="prescription-queue">💊 Prescription Queue</SelectItem>
                            <SelectItem value="patient-lookup">👤 Patient Lookup</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button className="bg-walgreens-red hover:bg-red-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <p className="text-sm text-gray-600">Configure how you receive alerts and updates</p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📧</span>
                  <div>
                    <Label className="font-medium text-gray-900">Email Alerts</Label>
                    <p className="text-sm text-gray-600">Receive important updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                  className="data-[state=checked]:bg-walgreens-red"
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔔</span>
                  <div>
                    <Label className="font-medium text-gray-900">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Browser notifications for urgent matters</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  className="data-[state=checked]:bg-walgreens-red"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💊</span>
                  <div>
                    <Label className="font-medium text-gray-900">Prescription Alerts</Label>
                    <p className="text-sm text-gray-600">New prescriptions and refill requests</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.prescriptionAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, prescriptionAlerts: checked })}
                  className="data-[state=checked]:bg-walgreens-red"
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📦</span>
                  <div>
                    <Label className="font-medium text-gray-900">Inventory Alerts</Label>
                    <p className="text-sm text-gray-600">Low stock and expiration warnings</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.inventoryAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, inventoryAlerts: checked })}
                  className="data-[state=checked]:bg-walgreens-red"
                />
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚛</span>
                  <div>
                    <Label className="font-medium text-gray-900">Delivery Updates</Label>
                    <p className="text-sm text-gray-600">Status updates for prescription deliveries</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.deliveryUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, deliveryUpdates: checked })}
                  className="data-[state=checked]:bg-walgreens-red"
                />
              </div>
              
              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button className="bg-walgreens-red hover:bg-red-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
              <p className="text-sm text-gray-600">Manage your account security and access controls</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Password Management */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Password Management</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <Button className="bg-walgreens-red hover:bg-red-600">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-walgreens-red" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Secure Your Account</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-walgreens-red hover:bg-red-600">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>

              {/* Data Management */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900">Data Management</h3>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Download className="w-5 h-5 text-walgreens-red" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Export Your Data</h4>
                      <p className="text-sm text-gray-600">Download account data and activity</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="space-y-4 pt-4 border-t border-red-200">
                <h3 className="font-medium text-red-800">Danger Zone</h3>
                <div className="flex items-center justify-between py-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-600">Permanently delete your account and data</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;