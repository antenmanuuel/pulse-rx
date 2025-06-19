
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User, Clock, Search } from 'lucide-react';

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      sender: 'Dr. Johnson',
      subject: 'Patient Medication Query',
      preview: 'Can you verify the dosage for John Smith\'s Lisinopril prescription?',
      time: '2:30 PM',
      unread: true,
      priority: 'high'
    },
    {
      id: 2,
      sender: 'Pharmacy Manager',
      subject: 'Inventory Alert',
      preview: 'Low stock alert for Metformin 500mg - please review and reorder',
      time: '1:45 PM',
      unread: true,
      priority: 'normal'
    },
    {
      id: 3,
      sender: 'IT Support',
      subject: 'System Maintenance',
      preview: 'Scheduled maintenance window tonight from 2-4 AM EST',
      time: '12:15 PM',
      unread: false,
      priority: 'low'
    },
    {
      id: 4,
      sender: 'Dr. Wilson',
      subject: 'Prescription Clarification',
      preview: 'Please confirm the generic substitution for Maria Garcia\'s prescription',
      time: '11:30 AM',
      unread: true,
      priority: 'high'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Messages" subtitle="Manage your pharmacy communications">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold">{messages.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-walgreens-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-red-600">{messages.filter(m => m.unread).length}</p>
                </div>
                <Badge className="bg-red-100 text-red-800">New</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-orange-600">{messages.filter(m => m.priority === 'high').length}</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">!</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-green-600">{messages.length}</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-walgreens-red" />
                Inbox
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search messages..." className="pl-10 w-64" />
                </div>
                <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
                  <Send className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <User className="w-8 h-8 text-gray-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-semibold ${message.unread ? 'text-walgreens-blue' : 'text-gray-900'}`}>
                            {message.sender}
                          </span>
                          {message.unread && (
                            <Badge className="bg-walgreens-red text-white text-xs">New</Badge>
                          )}
                          <Badge className={getPriorityColor(message.priority)}>
                            {message.priority}
                          </Badge>
                        </div>
                        <h3 className={`font-medium mb-1 ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.subject}
                        </h3>
                        <p className="text-gray-600 text-sm">{message.preview}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">{message.time}</div>
                      <div className="space-y-1">
                        <Button size="sm" className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MessagesPage;
