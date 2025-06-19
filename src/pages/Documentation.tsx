
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Book, Video, HelpCircle, Search, Download, ExternalLink } from 'lucide-react';

const DocumentationPage = () => {
  const categories = [
    {
      title: 'System Guides',
      icon: Book,
      color: 'text-blue-600',
      documents: [
        { name: 'IC+ System Overview', type: 'PDF', size: '2.1 MB', updated: '2 days ago' },
        { name: 'Getting Started Guide', type: 'PDF', size: '1.8 MB', updated: '1 week ago' },
        { name: 'User Manual v3.2', type: 'PDF', size: '5.4 MB', updated: '3 days ago' },
        { name: 'System Requirements', type: 'DOC', size: '245 KB', updated: '1 month ago' }
      ]
    },
    {
      title: 'Training Materials',
      icon: Video,
      color: 'text-green-600',
      documents: [
        { name: 'New User Training Video', type: 'VIDEO', size: '120 MB', updated: '1 week ago' },
        { name: 'Prescription Processing', type: 'VIDEO', size: '85 MB', updated: '5 days ago' },
        { name: 'Inventory Management Training', type: 'PDF', size: '3.2 MB', updated: '1 week ago' },
        { name: 'Patient Lookup Tutorial', type: 'VIDEO', size: '45 MB', updated: '3 days ago' }
      ]
    },
    {
      title: 'Policies & Procedures',
      icon: FileText,
      color: 'text-orange-600',
      documents: [
        { name: 'HIPAA Compliance Guidelines', type: 'PDF', size: '1.2 MB', updated: '2 weeks ago' },
        { name: 'Emergency Procedures', type: 'PDF', size: '987 KB', updated: '1 month ago' },
        { name: 'Quality Control Standards', type: 'DOC', size: '656 KB', updated: '3 weeks ago' },
        { name: 'Data Backup Procedures', type: 'PDF', size: '423 KB', updated: '1 week ago' }
      ]
    },
    {
      title: 'Technical Support',
      icon: HelpCircle,
      color: 'text-purple-600',
      documents: [
        { name: 'Troubleshooting Guide', type: 'PDF', size: '2.8 MB', updated: '4 days ago' },
        { name: 'Error Code Reference', type: 'PDF', size: '1.1 MB', updated: '1 week ago' },
        { name: 'System Maintenance Guide', type: 'DOC', size: '892 KB', updated: '2 weeks ago' },
        { name: 'Hardware Setup Guide', type: 'PDF', size: '3.4 MB', updated: '1 month ago' }
      ]
    }
  ];

  const quickLinks = [
    { name: 'Contact IT Support', icon: HelpCircle, action: 'Contact' },
    { name: 'Submit Feedback', icon: FileText, action: 'Submit' },
    { name: 'Request Training', icon: Video, action: 'Request' },
    { name: 'System Status', icon: ExternalLink, action: 'View' }
  ];

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'DOC': return 'bg-blue-100 text-blue-800';
      case 'VIDEO': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Documentation & Support" subtitle="Access training materials, guides, and technical documentation">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2 text-walgreens-red" />
                Search Documentation
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search for guides, procedures, or training materials..." 
                  className="pl-10"
                />
              </div>
              <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {categories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <category.icon className={`w-5 h-5 mr-2 ${category.color}`} />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className={`px-2 py-1 rounded text-xs ${getFileTypeColor(doc.type)}`}>
                                  {doc.type}
                                </span>
                                <span>{doc.size}</span>
                                <span>Updated {doc.updated}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start">
                      <link.icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="font-medium">System Update v3.2</div>
                    <div className="text-gray-600">New features and bug fixes</div>
                    <div className="text-xs text-gray-500 mt-1">3 days ago</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <div className="font-medium">Training Materials Updated</div>
                    <div className="text-gray-600">New video tutorials added</div>
                    <div className="text-xs text-gray-500 mt-1">1 week ago</div>
                  </div>
                  <div className="p-2 bg-orange-50 rounded">
                    <div className="font-medium">Policy Changes</div>
                    <div className="text-gray-600">Updated HIPAA guidelines</div>
                    <div className="text-xs text-gray-500 mt-1">2 weeks ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">IT Support</div>
                    <div className="text-gray-600">Phone: (555) 123-HELP</div>
                    <div className="text-gray-600">Email: support@walgreens.com</div>
                  </div>
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-gray-600">Mon-Fri: 7 AM - 7 PM</div>
                    <div className="text-gray-600">Sat-Sun: 9 AM - 5 PM</div>
                  </div>
                  <Button size="sm" className="w-full bg-walgreens-red hover:bg-walgreens-red-dark mt-3">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentationPage;
