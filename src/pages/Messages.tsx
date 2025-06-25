
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, User, Clock, Search, Plus, Users, UserPlus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: string;
  recipient?: string;
  groupName?: string;
  isGroup: boolean;
  subject: string;
  content: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'normal' | 'low';
}

interface User {
  id: number;
  name: string;
  role: string;
}

const MessagesPage = () => {
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Dr. Johnson',
      recipient: 'Sarah Johnson, PharmD',
      isGroup: false,
      subject: 'Patient Medication Query',
      content: 'Can you verify the dosage for John Smith\'s Lisinopril prescription? I want to make sure we have the correct strength.',
      time: '2:30 PM',
      unread: true,
      priority: 'high'
    },
    {
      id: 2,
      sender: 'Pharmacy Manager',
      groupName: 'Pharmacy Team',
      isGroup: true,
      subject: 'Inventory Alert',
      content: 'Low stock alert for Metformin 500mg - please review and reorder. Current count is below minimum threshold.',
      time: '1:45 PM',
      unread: true,
      priority: 'normal'
    },
    {
      id: 3,
      sender: 'IT Support',
      recipient: 'All Staff',
      isGroup: true,
      subject: 'System Maintenance',
      content: 'Scheduled maintenance window tonight from 2-4 AM EST. System will be temporarily unavailable.',
      time: '12:15 PM',
      unread: false,
      priority: 'low'
    }
  ]);

  const [users] = useState<User[]>([
    { id: 1, name: 'Dr. Johnson', role: 'Doctor' },
    { id: 2, name: 'Pharmacy Manager', role: 'Manager' },
    { id: 3, name: 'IT Support', role: 'IT' },
    { id: 4, name: 'Mike Wilson, PharmD', role: 'Pharmacist' },
    { id: 5, name: 'Lisa Chen, PharmTech', role: 'Technician' }
  ]);

  const [newMessage, setNewMessage] = useState({
    recipient: '',
    groupName: '',
    isGroup: false,
    subject: '',
    content: '',
    priority: 'normal' as 'high' | 'normal' | 'low'
  });

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.content) {
      toast({
        title: "Error",
        description: "Please fill in subject and message content",
        variant: "destructive"
      });
      return;
    }

    if (!newMessage.isGroup && !newMessage.recipient) {
      toast({
        title: "Error",
        description: "Please select a recipient",
        variant: "destructive"
      });
      return;
    }

    if (newMessage.isGroup && !newMessage.groupName) {
      toast({
        title: "Error",
        description: "Please specify group name",
        variant: "destructive"
      });
      return;
    }

    const message: Message = {
      id: Date.now(),
      sender: 'Sarah Johnson, PharmD',
      recipient: newMessage.isGroup ? undefined : newMessage.recipient,
      groupName: newMessage.isGroup ? newMessage.groupName : undefined,
      isGroup: newMessage.isGroup,
      subject: newMessage.subject,
      content: newMessage.content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true,
      priority: newMessage.priority
    };

    setMessages([message, ...messages]);
    setNewMessage({
      recipient: '',
      groupName: '',
      isGroup: false,
      subject: '',
      content: '',
      priority: 'normal'
    });
    setIsComposeOpen(false);

    toast({
      title: "Message Sent",
      description: `Message sent to ${newMessage.isGroup ? newMessage.groupName : newMessage.recipient}`
    });
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(m => m.id !== messageId));
    toast({
      title: "Message Deleted",
      description: "Message has been deleted successfully"
    });
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, unread: false } : m
    ));
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <p className="text-sm text-gray-600">Group Messages</p>
                  <p className="text-2xl font-bold text-green-600">{messages.filter(m => m.isGroup).length}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
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
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-walgreens-red hover:bg-walgreens-red-dark">
                      <Plus className="w-4 h-4 mr-2" />
                      Compose
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Compose New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={!newMessage.isGroup ? "default" : "outline"}
                          onClick={() => setNewMessage({ ...newMessage, isGroup: false, groupName: '' })}
                          className="flex items-center"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Individual
                        </Button>
                        <Button
                          variant={newMessage.isGroup ? "default" : "outline"}
                          onClick={() => setNewMessage({ ...newMessage, isGroup: true, recipient: '' })}
                          className="flex items-center"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Group
                        </Button>
                      </div>

                      {!newMessage.isGroup ? (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">To:</label>
                          <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({ ...newMessage, recipient: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select recipient" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.name}>
                                  <div className="flex items-center">
                                    <span>{user.name}</span>
                                    <Badge className="ml-2 text-xs">{user.role}</Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Group Name:</label>
                          <Input
                            placeholder="Enter group name (e.g., Pharmacy Team, All Staff)"
                            value={newMessage.groupName}
                            onChange={(e) => setNewMessage({ ...newMessage, groupName: e.target.value })}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Priority:</label>
                        <Select value={newMessage.priority} onValueChange={(value: 'high' | 'normal' | 'low') => setNewMessage({ ...newMessage, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="normal">Normal Priority</SelectItem>
                            <SelectItem value="low">Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject:</label>
                        <Input
                          placeholder="Message subject"
                          value={newMessage.subject}
                          onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message:</label>
                        <Textarea
                          placeholder="Type your message here..."
                          value={newMessage.content}
                          onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                          className="min-h-24"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSendMessage} className="bg-walgreens-red hover:bg-walgreens-red-dark">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {message.isGroup ? (
                        <Users className="w-8 h-8 text-gray-500 mt-1" />
                      ) : (
                        <User className="w-8 h-8 text-gray-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-semibold ${message.unread ? 'text-walgreens-blue' : 'text-gray-900'}`}>
                            {message.sender}
                          </span>
                          {message.isGroup && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              {message.groupName}
                            </Badge>
                          )}
                          {!message.isGroup && message.recipient && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              To: {message.recipient}
                            </Badge>
                          )}
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
                        <p className="text-gray-600 text-sm line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">{message.time}</div>
                      <div className="space-y-1">
                        {message.unread && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(message.id);
                            }}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    {selectedMessage.isGroup ? (
                      <Users className="w-5 h-5 mr-2 text-walgreens-red" />
                    ) : (
                      <User className="w-5 h-5 mr-2 text-walgreens-red" />
                    )}
                    {selectedMessage.subject}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">{selectedMessage.sender}</p>
                      <p className="text-sm text-gray-600">
                        {selectedMessage.isGroup 
                          ? `To: ${selectedMessage.groupName}` 
                          : `To: ${selectedMessage.recipient}`
                        }
                      </p>
                      <p className="text-sm text-gray-500">{selectedMessage.time}</p>
                    </div>
                    <Badge className={getPriorityColor(selectedMessage.priority)}>
                      {selectedMessage.priority}
                    </Badge>
                  </div>
                  
                  <div className="bg-white p-4 border rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                      Close
                    </Button>
                    <Button className="bg-walgreens-blue hover:bg-walgreens-blue/90">
                      Reply
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default MessagesPage;
