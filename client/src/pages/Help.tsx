import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  LayoutDashboard,
  Pill,
  Users,
  Package,
  Calendar,
  Truck,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Video,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      articles: [
        {
          title: 'Welcome to PulseRx',
          content: 'PulseRx is your comprehensive pharmacy management system designed to streamline operations, improve patient care, and enhance workflow efficiency.'
        },
        {
          title: 'First Time Login',
          content: 'Use your employee credentials provided by your pharmacy manager. Your username is typically your employee ID, and you\'ll be prompted to set up a secure password on first login.'
        },
        {
          title: 'Dashboard Overview',
          content: 'The dashboard provides real-time insights into your pharmacy operations including prescription queue status, patient appointments, alerts, and quick access to essential functions.'
        }
      ]
    },
    {
      id: 'prescriptions',
      title: 'Prescription Management',
      icon: Pill,
      articles: [
        {
          title: 'Processing New Prescriptions',
          content: 'Navigate to the Prescription Queue to view incoming prescriptions. Each prescription shows patient information, medication details, priority level, and prescriber information. Click "Process" to begin fulfillment.'
        },
        {
          title: 'Prescription Statuses',
          content: 'Prescriptions move through several statuses: "Ready for Review" (needs pharmacist verification), "In Progress" (being prepared), "Verification" (final quality check), and "Ready for Pickup".'
        },
        {
          title: 'Priority Levels',
          content: 'Urgent (red) - Immediate attention required. High (orange) - Process within 2 hours. Normal (blue) - Standard processing time. Priority is determined by patient condition and medication type.'
        }
      ]
    },
    {
      id: 'patients',
      title: 'Patient Management',
      icon: Users,
      articles: [
        {
          title: 'Patient Lookup',
          content: 'Use the search bar to find patients by name, phone number, or date of birth. The system will show matching results with basic information and prescription history.'
        },
        {
          title: 'Patient Profiles',
          content: 'Each patient profile contains contact information, insurance details, prescription history, allergies, and preferences. Always verify patient identity before dispensing medications.'
        },
        {
          title: 'Insurance Verification',
          content: 'Check insurance coverage before processing prescriptions. The system shows coverage status, copay amounts, and any prior authorization requirements.'
        }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      articles: [
        {
          title: 'Stock Monitoring',
          content: 'Monitor medication stock levels in real-time. The system automatically flags low stock items and provides reorder suggestions based on usage patterns.'
        },
        {
          title: 'Expiration Tracking',
          content: 'Track medication expiration dates and receive alerts for items nearing expiration. Follow pharmacy protocols for handling expired medications.'
        },
        {
          title: 'Receiving Shipments',
          content: 'Process incoming shipments by scanning barcodes and updating inventory levels. Verify quantities and expiration dates match shipping documentation.'
        }
      ]
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: Calendar,
      articles: [
        {
          title: 'Scheduling Consultations',
          content: 'Schedule patient consultations for medication therapy management, vaccinations, or health screenings. Select available time slots and confirm patient contact information.'
        },
        {
          title: 'Managing Today\'s Schedule',
          content: 'View today\'s appointments on the dashboard and appointments page. Check patients in upon arrival and update appointment status as needed.'
        },
        {
          title: 'Appointment Types',
          content: 'Consultation - Medication reviews. Vaccination - Immunization services. Screening - Health checks like blood pressure or cholesterol testing.'
        }
      ]
    },
    {
      id: 'deliveries',
      title: 'Delivery Management',
      icon: Truck,
      articles: [
        {
          title: 'Processing Deliveries',
          content: 'Assign prescriptions to delivery routes based on patient location and delivery preferences. Update delivery status as orders are dispatched and completed.'
        },
        {
          title: 'Delivery Tracking',
          content: 'Track active deliveries in real-time and provide patients with estimated delivery times. Handle delivery exceptions and rescheduling as needed.'
        },
        {
          title: 'Delivery Areas',
          content: 'Standard delivery areas include downtown, residential zones, and senior living facilities. Check coverage maps for specific addresses.'
        }
      ]
    },
    {
      id: 'alerts',
      title: 'Alerts & Notifications',
      icon: Bell,
      articles: [
        {
          title: 'Alert Types',
          content: 'Critical alerts require immediate action (drug interactions, allergies). Warnings need attention (low stock, expiring medications). Info alerts provide updates (delivery confirmations).'
        },
        {
          title: 'Managing Notifications',
          content: 'Configure notification preferences in Settings. Choose to receive alerts via email, in-app notifications, or both. Set quiet hours for non-urgent notifications.'
        },
        {
          title: 'Alert Response',
          content: 'Acknowledge alerts promptly and take appropriate action. Document any actions taken for compliance and quality assurance purposes.'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Profile',
      icon: Settings,
      articles: [
        {
          title: 'Profile Management',
          content: 'Keep your profile information current including contact details and professional credentials. Upload a professional photo for patient recognition.'
        },
        {
          title: 'Notification Preferences',
          content: 'Customize which notifications you receive and how. Enable email alerts for critical issues and browser notifications for real-time updates.'
        },
        {
          title: 'Security Settings',
          content: 'Change your password regularly and enable two-factor authentication for enhanced security. Review login activity and report any suspicious access.'
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Process Prescription',
      description: 'Step-by-step guide to process a new prescription',
      icon: Pill,
      steps: ['Open Prescription Queue', 'Select prescription', 'Verify patient info', 'Check drug interactions', 'Prepare medication', 'Get pharmacist approval', 'Mark ready for pickup']
    },
    {
      title: 'Find Patient',
      description: 'How to quickly locate patient information',
      icon: Search,
      steps: ['Use search bar in header', 'Enter name, phone, or DOB', 'Select correct patient', 'Review profile information']
    },
    {
      title: 'Check Inventory',
      description: 'Monitor stock levels and reorder items',
      icon: Package,
      steps: ['Go to Inventory page', 'Review stock levels', 'Check low stock alerts', 'Place reorders as needed']
    },
    {
      title: 'Handle Alert',
      description: 'Respond to system alerts appropriately',
      icon: Bell,
      steps: ['Click notification icon', 'Review alert details', 'Take required action', 'Document resolution']
    }
  ];

  const contactOptions = [
    {
      title: 'Technical Support',
      description: 'System issues, login problems, or bugs',
      icon: HelpCircle,
      contact: 'support@pulserx.com',
      hours: '24/7 Emergency Support'
    },
    {
      title: 'Training',
      description: 'Feature tutorials and best practices',
      icon: Video,
      contact: 'training@pulserx.com',
      hours: 'Mon-Fri 8AM-6PM EST'
    },
    {
      title: 'Phone Support',
      description: 'Urgent issues requiring immediate assistance',
      icon: Phone,
      contact: '1-800-PULSERX',
      hours: '24/7 Available'
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Layout title="Help & Support" subtitle="Find answers and get assistance with PulseRx">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Search */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-base focus:border-walgreens-red focus:ring-walgreens-red"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-walgreens-red/10 rounded-lg flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-walgreens-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="space-y-1">
                    {action.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {stepIndex + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Sections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <Card key={section.id} className="border border-gray-200">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-walgreens-red/10 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-walgreens-red" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {section.title}
                      </CardTitle>
                    </div>
                    {expandedSection === section.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                
                {expandedSection === section.id && (
                  <CardContent className="pt-0 pb-6">
                    <div className="space-y-4">
                      {section.articles.map((article, index) => (
                        <div key={index} className="pl-4 border-l-2 border-gray-100">
                          <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{article.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-walgreens-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-walgreens-red" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="space-y-1">
                    <p className="font-medium text-walgreens-red">{option.contact}</p>
                    <p className="text-xs text-gray-500">{option.hours}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Issue Tracking */}
            <Card className="border border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-walgreens-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-walgreens-red" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Issue Tracking</h3>
                <p className="text-sm text-gray-600 mb-3">Submit and track bugs, feature requests, and system issues</p>
                <Button 
                  onClick={() => navigate('/issues')}
                  className="bg-walgreens-red hover:bg-red-600 text-white text-sm"
                >
                  Submit Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">System Status: Operational</span>
                </div>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All Services Online
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HelpPage;