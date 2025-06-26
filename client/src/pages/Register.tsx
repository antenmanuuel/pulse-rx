import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield, Users, Briefcase, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    const success = await register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );

    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to IC+ System!"
      });
      navigate('/');
    } else {
      toast({
        title: "Registration Failed",
        description: "Email already exists. Please try a different email.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-walgreens-red to-red-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">IC+</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">IC+ System</h1>
                <p className="text-red-100">Walgreens Internal Platform</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Join Our Team
              <span className="block text-red-100">Access the Platform</span>
            </h2>
            <p className="text-xl text-red-100 leading-relaxed">
              Create your employee account to access comprehensive pharmacy management tools
              and join thousands of Walgreens professionals using IC+ System daily.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-red-200" />
              <span className="text-red-100">Join 1000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-red-200" />
              <span className="text-red-100">Professional Pharmacy Tools</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-red-200" />
              <span className="text-red-100">Secure Employee Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">IC+</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IC+ System</h1>
                <p className="text-sm text-gray-500">Walgreens Internal Platform</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-walgreens-red transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Register for IC+ System employee access
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="h-12 px-4 border-gray-300 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="h-12 px-4 border-gray-300 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Employee Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Walgreens email"
                    className="h-12 px-4 border-gray-300 focus:border-walgreens-red focus:ring-walgreens-red"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a secure password"
                    className="h-12 px-4 border-gray-300 focus:border-walgreens-red focus:ring-walgreens-red"
                  />
                  <p className="text-xs text-gray-500">Minimum 6 characters required</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="h-12 px-4 border-gray-300 focus:border-walgreens-red focus:ring-walgreens-red"
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Account Verification</p>
                    <p>Your account will be verified by IT before activation.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Employee Account'
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Already have an account?
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full h-12 px-6 border-2 border-gray-300 hover:border-walgreens-red text-gray-700 hover:text-walgreens-red font-medium rounded-lg transition-all duration-300 hover:bg-red-50"
                  >
                    Sign In to IC+ System
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Compliance Notice */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-900 mb-1">Security & Compliance</p>
                <p className="text-green-700">
                  All accounts are subject to Walgreens security policies and HIPAA compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
