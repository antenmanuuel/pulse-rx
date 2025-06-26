import React, { useState } from 'react';
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
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@walgreens.com',
    phone: '(555) 123-4567',
    role: 'Pharmacy Technician',
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



  return (
    <Layout title="Settings" subtitle="Manage your profile and application preferences">
      <div className="space-y-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 shadow-sm">
              <TabsTrigger
                value="profile"
                className="flex items-center data-[state=active]:bg-walgreens-red data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="flex items-center data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <SettingsIcon className="w-4 h-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-walgreens-red" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        User Profile
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Manage your personal information and work details
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Profile Picture Section */}
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback className="bg-walgreens-red text-white text-xl">
                            {profileData.firstName[0]}{profileData.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                            <p className="text-sm text-gray-600">Update your profile photo</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-walgreens-red hover:text-white transition-colors"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Change Photo
                          </Button>
                          <p className="text-xs text-gray-500">JPG, PNG, max 2MB</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card className="bg-white border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-800">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Work Information */}
                  <Card className="bg-white border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-800">
                        <Badge className="bg-green-600 text-white mr-2">Work</Badge>
                        Employment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Employee ID</Label>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="font-semibold text-green-800">{profileData.employeeId}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Role</Label>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <Badge className="bg-green-500 text-white">{profileData.role}</Badge>
                          </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Store Location</Label>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="font-medium text-green-800">{profileData.storeLocation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-walgreens-red hover:bg-red-600 text-white shadow-lg">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-lg">
                      <SettingsIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Application Preferences
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Customize your application experience and interface
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Display Preferences */}
                  <Card className="bg-white border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-purple-800">
                        <Palette className="w-5 h-5 mr-2" />
                        Display Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="flex items-center text-sm font-medium text-gray-700">
                            <Palette className="w-4 h-4 mr-2" />
                            Theme
                          </Label>
                          <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                            <SelectTrigger className="bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500">
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
                          <Label className="flex items-center text-sm font-medium text-gray-700">
                            <Globe className="w-4 h-4 mr-2" />
                            Language
                          </Label>
                          <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                            <SelectTrigger className="bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500">
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
                    </CardContent>
                  </Card>

                  {/* System Preferences */}
                  <Card className="bg-white border-orange-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800">
                        <SettingsIcon className="w-5 h-5 mr-2" />
                        System Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Timezone</Label>
                          <Select value={preferences.timezone} onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}>
                            <SelectTrigger className="bg-white border-orange-300 focus:border-orange-500 focus:ring-orange-500">
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
                          <Select value={preferences.defaultView} onValueChange={(value) => setPreferences({ ...preferences, defaultView: value })}>
                            <SelectTrigger className="bg-white border-orange-300 focus:border-orange-500 focus:ring-orange-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dashboard">📊 Dashboard</SelectItem>
                              <SelectItem value="prescription-queue">💊 Prescription Queue</SelectItem>
                              <SelectItem value="patient-lookup">👤 Patient Lookup</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shadow-lg">
                      <Bell className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Notification Settings
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Configure how you receive alerts and updates
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <Card className="bg-white border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-800">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        {
                          key: 'emailAlerts',
                          label: 'Email Alerts',
                          description: 'Receive important updates via email',
                          icon: '📧'
                        },
                        {
                          key: 'pushNotifications',
                          label: 'Push Notifications',
                          description: 'Browser notifications for urgent matters',
                          icon: '🔔'
                        },
                        {
                          key: 'prescriptionAlerts',
                          label: 'Prescription Alerts',
                          description: 'New prescriptions and refill requests',
                          icon: '💊'
                        },
                        {
                          key: 'inventoryAlerts',
                          label: 'Inventory Alerts',
                          description: 'Low stock and expiration warnings',
                          icon: '📦'
                        },
                        {
                          key: 'deliveryUpdates',
                          label: 'Delivery Updates',
                          description: 'Status updates for prescription deliveries',
                          icon: '🚛'
                        }
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{notification.icon}</span>
                            <div>
                              <Label className="font-medium text-gray-900">{notification.label}</Label>
                              <p className="text-sm text-gray-600">{notification.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications[notification.key as keyof typeof notifications]}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, [notification.key]: checked })}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg">
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Security Settings
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Manage your account security and access controls
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Password Section */}
                  <Card className="bg-white border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-800">
                        <Lock className="w-5 h-5 mr-2" />
                        Password Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter current password"
                            className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">New Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Two-Factor Authentication */}
                  <Card className="bg-white border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-800">
                        <Smartphone className="w-5 h-5 mr-2" />
                        Two-Factor Authentication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Secure Your Account</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security with two-factor authentication</p>
                        </div>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Enable 2FA
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Data Management */}
                  <Card className="bg-white border-orange-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800">
                        <Download className="w-5 h-5 mr-2" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-orange-200">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                          <Download className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Export Your Data</h4>
                          <p className="text-sm text-gray-600">Download a copy of your account data and activity</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="bg-white border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-800">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-red-200">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                          <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Delete Account</h4>
                          <p className="text-sm text-gray-600">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        </div>
                      </div>
                      <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
