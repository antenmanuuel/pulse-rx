import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Building2,
    TrendingUp,
    TrendingDown,
    DollarSign,
    UserPlus,
    Plus,
    Calendar,
    Clock,
    CheckCircle,
    AlertTriangle,
    Star,
    Package,
    FileText,
    Award,
    Shield,
    Activity,
    Target,
    BarChart3,
    PieChart,
    ArrowRight,
    ExternalLink,
    RefreshCw,
    Download,
    Bell
} from 'lucide-react';

const AdminDashboard = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data for dashboard metrics
    const dashboardMetrics = {
        staff: {
            total: 12,
            active: 10,
            onLeave: 2,
            avgPerformance: 91.5,
            trainingDue: 5,
            newHires: 2,
            pendingReviews: 3,
            turnoverRate: 8.5
        },
        vendors: {
            total: 8,
            active: 7,
            pending: 1,
            totalSpent: 245320,
            avgRating: 4.4,
            contractsExpiring: 2,
            pendingPOs: 4,
            onTimeDelivery: 94.2
        },
        financial: {
            monthlyStaffCosts: 85420,
            monthlyVendorSpend: 62180,
            totalBudget: 180000,
            costSavings: 12500,
            budgetUtilization: 82
        }
    };

    // Mock recent activities
    const recentActivities = [
        {
            id: 1,
            type: 'staff',
            action: 'New employee onboarded',
            detail: 'Emily Rodriguez joined as Pharmacy Intern',
            time: '2 hours ago',
            status: 'success'
        },
        {
            id: 2,
            type: 'vendor',
            action: 'Purchase order approved',
            detail: 'PO-2024-015 for McKesson Corporation - $8,450',
            time: '4 hours ago',
            status: 'success'
        },
        {
            id: 3,
            type: 'staff',
            action: 'Training completed',
            detail: 'Sarah Johnson completed Advanced Clinical Pharmacy',
            time: '6 hours ago',
            status: 'success'
        },
        {
            id: 4,
            type: 'vendor',
            action: 'Contract renewal needed',
            detail: 'Local Medical Supply Co. contract expires in 30 days',
            time: '1 day ago',
            status: 'warning'
        },
        {
            id: 5,
            type: 'staff',
            action: 'Performance review due',
            detail: 'Mike Chen quarterly review scheduled',
            time: '1 day ago',
            status: 'info'
        }
    ];

    // Mock staff performance data
    const topPerformers = [
        { name: 'Dr. Sarah Johnson', role: 'Pharmacist', score: 96, trend: 'up' },
        { name: 'Emily Rodriguez', role: 'Pharmacy Intern', score: 94, trend: 'up' },
        { name: 'Mike Chen', role: 'Pharmacy Technician', score: 91, trend: 'stable' },
        { name: 'James Wilson', role: 'Store Manager', score: 89, trend: 'down' }
    ];

    // Mock vendor performance data
    const topVendors = [
        { name: 'McKesson Corporation', rating: 4.8, spent: 125450, trend: 'up' },
        { name: 'AmerisourceBergen', rating: 4.6, spent: 89320, trend: 'up' },
        { name: 'Cardinal Health', rating: 4.4, spent: 45680, trend: 'stable' },
        { name: 'Local Medical Supply', rating: 4.2, spent: 12850, trend: 'stable' }
    ];

    // Mock alerts and notifications
    const alerts = [
        {
            id: 1,
            type: 'urgent',
            title: 'Training Certifications Expiring',
            message: '3 staff members have certifications expiring within 30 days',
            action: 'Review Training Records'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Vendor Contract Renewal',
            message: '2 vendor contracts require renewal within 60 days',
            action: 'Review Contracts'
        },
        {
            id: 3,
            type: 'info',
            title: 'Budget Performance',
            message: 'Monthly spending is 15% under budget',
            action: 'View Financial Report'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'text-green-600';
            case 'warning': return 'text-yellow-600';
            case 'info': return 'text-blue-600';
            case 'urgent': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getAlertColor = (type: string) => {
        switch (type) {
            case 'urgent': return 'border-red-200 bg-red-50';
            case 'warning': return 'border-yellow-200 bg-yellow-50';
            case 'info': return 'border-blue-200 bg-blue-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
            default: return <div className="w-4 h-4" />;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleNavigateToStaff = () => {
        navigate('/staff-management');
    };

    const handleNavigateToVendors = () => {
        navigate('/vendor-management');
    };



    const handleAlertAction = (alertId: number) => {
        switch (alertId) {
            case 1: // Training Certifications Expiring
                navigate('/staff-management');
                toast({
                    title: "Navigating to Staff Management",
                    description: "Review staff training records and certifications."
                });
                break;
            case 2: // Vendor Contract Renewal
                navigate('/vendor-management');
                toast({
                    title: "Navigating to Vendor Management",
                    description: "Review vendor contracts requiring renewal."
                });
                break;
            case 3: // Budget Performance
                toast({
                    title: "Exporting Financial Report",
                    description: "Budget performance report is being generated and will be downloaded."
                });
                break;
            default:
                toast({
                    title: "Feature Coming Soon",
                    description: "This functionality will be available in a future update."
                });
        }
    };

    const handleRefreshActivity = () => {
        toast({
            title: "Activity Refreshed",
            description: "Recent activity data has been updated."
        });
        // In a real app, this would refetch the activity data
    };

    return (
        <Layout title="Admin Dashboard" subtitle="Comprehensive staff and vendor management overview">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleNavigateToStaff} className="bg-walgreens-red hover:bg-red-600">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Staff
                    </Button>
                    <Button onClick={handleNavigateToVendors} className="bg-blue-600 hover:bg-blue-700">
                        <Building2 className="w-4 h-4 mr-2" />
                        Manage Vendors
                    </Button>
                    <Button
                        onClick={() => toast({
                            title: "Export Started",
                            description: "Dashboard data is being exported to PDF."
                        })}
                        variant="outline"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Staff</p>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.staff.total}</p>
                                    <p className="text-xs text-green-600">+2 this month</p>
                                </div>
                                <Users className="w-8 h-8 text-walgreens-red" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active Vendors</p>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.vendors.active}</p>
                                    <p className="text-xs text-blue-600">94.2% on-time delivery</p>
                                </div>
                                <Building2 className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Monthly Spend</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardMetrics.financial.monthlyVendorSpend)}</p>
                                    <p className="text-xs text-green-600">-15% vs budget</p>
                                </div>
                                <DollarSign className="w-8 h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Avg Performance</p>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.staff.avgPerformance}%</p>
                                    <p className="text-xs text-green-600">+2.5% vs last month</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Alerts Section */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Bell className="w-5 h-5 text-walgreens-red" />
                            <span>Important Alerts</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAlertAction(alert.id)}
                                        className="hover:bg-walgreens-red hover:text-white hover:border-walgreens-red"
                                    >
                                        {alert.action}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Main Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="staff" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
                            <Users className="w-4 h-4 mr-2" />
                            Staff Analytics
                        </TabsTrigger>
                        <TabsTrigger value="vendors" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
                            <Building2 className="w-4 h-4 mr-2" />
                            Vendor Analytics
                        </TabsTrigger>
                        <TabsTrigger value="activity" className="data-[state=active]:bg-walgreens-red data-[state=active]:text-white">
                            <Activity className="w-4 h-4 mr-2" />
                            Recent Activity
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Budget Overview */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Budget Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Staff Costs</span>
                                            <span>{formatCurrency(dashboardMetrics.financial.monthlyStaffCosts)}</span>
                                        </div>
                                        <Progress value={47} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Vendor Spend</span>
                                            <span>{formatCurrency(dashboardMetrics.financial.monthlyVendorSpend)}</span>
                                        </div>
                                        <Progress value={35} className="h-2" />
                                    </div>
                                    <div className="pt-2 border-t">
                                        <div className="flex justify-between font-medium">
                                            <span>Total Utilization</span>
                                            <span>{dashboardMetrics.financial.budgetUtilization}%</span>
                                        </div>
                                        <Progress value={dashboardMetrics.financial.budgetUtilization} className="h-3 mt-2" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-3 bg-green-50 rounded-lg">
                                            <p className="text-2xl font-bold text-green-600">{dashboardMetrics.staff.active}</p>
                                            <p className="text-sm text-green-700">Staff On Duty</p>
                                        </div>
                                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                                            <p className="text-2xl font-bold text-blue-600">{dashboardMetrics.vendors.pendingPOs}</p>
                                            <p className="text-sm text-blue-700">Pending Orders</p>
                                        </div>
                                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                            <p className="text-2xl font-bold text-yellow-600">{dashboardMetrics.staff.trainingDue}</p>
                                            <p className="text-sm text-yellow-700">Training Due</p>
                                        </div>
                                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                                            <p className="text-2xl font-bold text-purple-600">{dashboardMetrics.vendors.contractsExpiring}</p>
                                            <p className="text-sm text-purple-700">Contracts Expiring</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Staff Analytics Tab */}
                    <TabsContent value="staff" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Top Performers */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Top Performers</CardTitle>
                                        <Button variant="outline" size="sm" onClick={handleNavigateToStaff}>
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {topPerformers.map((performer, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarFallback className="bg-walgreens-red text-white">
                                                        {performer.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-gray-900">{performer.name}</p>
                                                    <p className="text-sm text-gray-600">{performer.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">{performer.score}%</span>
                                                {getTrendIcon(performer.trend)}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Staff Distribution */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Staff Distribution</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Active Staff</span>
                                            <span className="font-medium">{dashboardMetrics.staff.active}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">On Leave</span>
                                            <span className="font-medium">{dashboardMetrics.staff.onLeave}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">New Hires (30 days)</span>
                                            <span className="font-medium text-green-600">{dashboardMetrics.staff.newHires}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Pending Reviews</span>
                                            <span className="font-medium text-yellow-600">{dashboardMetrics.staff.pendingReviews}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Turnover Rate</span>
                                            <span className="font-medium text-red-600">{dashboardMetrics.staff.turnoverRate}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Vendors Analytics Tab */}
                    <TabsContent value="vendors" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Top Vendors */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Top Vendors by Spend</CardTitle>
                                        <Button variant="outline" size="sm" onClick={handleNavigateToVendors}>
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {topVendors.map((vendor, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Building2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{vendor.name}</p>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="text-sm text-gray-600">{vendor.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">{formatCurrency(vendor.spent)}</span>
                                                {getTrendIcon(vendor.trend)}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Vendor Performance */}
                            <Card className="border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Vendor Performance</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Average Rating</span>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-medium">{dashboardMetrics.vendors.avgRating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">On-Time Delivery</span>
                                            <span className="font-medium text-green-600">{dashboardMetrics.vendors.onTimeDelivery}%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Total Spent (YTD)</span>
                                            <span className="font-medium">{formatCurrency(dashboardMetrics.vendors.totalSpent)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Pending Orders</span>
                                            <span className="font-medium text-blue-600">{dashboardMetrics.vendors.pendingPOs}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Contracts Expiring</span>
                                            <span className="font-medium text-orange-600">{dashboardMetrics.vendors.contractsExpiring}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Recent Activity Tab */}
                    <TabsContent value="activity" className="space-y-6">
                        <Card className="border border-gray-200">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Activities</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRefreshActivity}
                                        className="hover:bg-blue-50 hover:border-blue-300"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Refresh
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'staff' ? 'bg-walgreens-red' : 'bg-blue-500'
                                                }`} />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-sm text-gray-600">{activity.detail}</p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                            <Badge className={`${getStatusColor(activity.status)} bg-white border`}>
                                                {activity.type === 'staff' ? 'Staff' : 'Vendor'}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminDashboard; 