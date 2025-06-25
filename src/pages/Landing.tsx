
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Users, Package, AlertTriangle, Calendar, Truck } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Pill,
      title: 'Prescription Management',
      description: 'Efficiently manage prescription queues and processing'
    },
    {
      icon: Users,
      title: 'Patient Lookup',
      description: 'Quick access to patient information and history'
    },
    {
      icon: Package,
      title: 'Inventory Control',
      description: 'Real-time inventory tracking and management'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Automated alerts for critical pharmacy operations'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Streamlined appointment management system'
    },
    {
      icon: Truck,
      title: 'Delivery Tracking',
      description: 'Complete delivery management and tracking'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-walgreens-blue to-blue-700">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-walgreens-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IC+</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IC+ System</h1>
                <p className="text-sm text-gray-500">Pharmacy Management Platform</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="bg-walgreens-red hover:bg-walgreens-red-dark"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Streamline Your Pharmacy Operations
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              IC+ System is the comprehensive pharmacy management platform designed to optimize 
              workflow, enhance patient care, and boost operational efficiency.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                className="bg-walgreens-red hover:bg-walgreens-red-dark text-lg px-8 py-3"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-walgreens-blue text-lg px-8 py-3"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Pharmacy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From prescription processing to inventory management, IC+ System provides 
              all the tools you need in one integrated platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-8 h-8 text-walgreens-red" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Pharmacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of pharmacies already using IC+ System to improve their operations.
          </p>
          <Button 
            size="lg"
            className="bg-walgreens-red hover:bg-walgreens-red-dark text-lg px-8 py-3"
            onClick={() => navigate('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-walgreens-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-walgreens-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IC+</span>
              </div>
              <span className="text-lg font-semibold">IC+ System</span>
            </div>
          </div>
          <div className="text-center mt-4 text-blue-200">
            <p>&copy; 2024 IC+ System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
