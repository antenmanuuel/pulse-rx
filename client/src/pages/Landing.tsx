import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Users, Package, AlertTriangle, Calendar, Truck, CheckCircle, Shield, Zap } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Pill,
      title: 'Prescription Management',
      description: 'Efficiently manage prescription queues and processing with advanced workflow automation',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Patient Lookup',
      description: 'Quick access to comprehensive patient information and medical history',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Package,
      title: 'Inventory Control',
      description: 'Real-time inventory tracking with smart reorder points and expiration alerts',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Intelligent automated alerts for critical pharmacy operations and compliance',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Streamlined appointment management with automated reminders and confirmations',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Truck,
      title: 'Delivery Tracking',
      description: 'Complete delivery management with real-time tracking and customer notifications',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Streamlined Operations',
      description: 'Optimize daily workflows and reduce processing time across all pharmacy functions'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Built-in compliance checks and regulatory reporting for industry standards'
    },
    {
      icon: Zap,
      title: 'Enhanced Efficiency',
      description: 'Integrated tools to improve productivity and patient care quality'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">IC+</span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">IC+ System</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Internal Pharmacy Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => navigate('/login')}
              >
                Employee Login
              </Button>
              <Button
                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => navigate('/register')}
              >
                Register Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                🏥 Walgreens Internal System
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              IC+ System
              <span className="block bg-gradient-to-r from-walgreens-red to-red-600 bg-clip-text text-transparent">
                Pharmacy Management
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The comprehensive internal platform for Walgreens pharmacy operations.
              Streamline workflows, enhance patient care, and optimize daily operations.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate('/login')}
              >
                Access System
                <span className="ml-2">→</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-walgreens-blue text-walgreens-blue hover:bg-walgreens-blue hover:text-white text-lg px-8 py-4 h-auto transition-all duration-300"
                onClick={() => navigate('/register')}
              >
                New User Registration
              </Button>
            </div>

            <div className="mt-16 flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Secure Access
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Designed for Walgreens Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built tools to support our pharmacy professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Pharmacy Management Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the tools you need for efficient pharmacy operations,
              integrated into one secure, user-friendly platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-walgreens-blue to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Supporting Walgreens Operations
            </h2>
            <p className="text-xl text-blue-100">
              System performance and usage across our network
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">2M+</div>
              <div className="text-blue-200">Prescriptions Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Access the IC+ System to begin managing your pharmacy operations
              or register for a new account if you're a new team member.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Employee Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-walgreens-blue text-gray-700 hover:text-walgreens-blue text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/register')}
              >
                Register Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-8 lg:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">IC+</span>
              </div>
              <div>
                <span className="text-2xl font-bold">IC+ System</span>
                <p className="text-gray-400">Walgreens Internal Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">IT Support</a>
              <a href="#" className="hover:text-white transition-colors">User Guide</a>
              <a href="#" className="hover:text-white transition-colors">Contact Help Desk</a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Walgreens IC+ System. Internal Use Only. | Secure • Reliable • Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
