import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  MessageCircle,
  Send,
  User,
  Clock,
  Search,
  Plus,
  Users,
  UserPlus,
  Trash2,
  TrendingUp,
  Activity,
  Mail,
  AlertCircle,
  Eye,
  Reply,
  Edit3,
  Archive
} from 'lucide-react';
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
  archived?: boolean;
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
      priority: 'high',
      archived: false
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
      priority: 'normal',
      archived: false
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
      priority: 'low',
      archived: false
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
  const [showArchived, setShowArchived] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  // Enhanced Stats Data
  const messageStats = [
    {
      label: 'Total Messages',
      value: messages.filter(m => !m.archived).length,
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      change: '+3 today',
      trend: 'up',
      percentage: 15
    },
    {
      label: 'Unread',
      value: messages.filter(m => m.unread && !m.archived).length,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      change: '+2 new',
      trend: 'up',
      percentage: 8
    },
    {
      label: 'High Priority',
      value: messages.filter(m => m.priority === 'high' && !m.archived).length,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      change: '-1 resolved',
      trend: 'down',
      percentage: 5
    },
    {
      label: 'Archived',
      value: messages.filter(m => m.archived).length,
      icon: Archive,
      color: 'text-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      change: '+1 today',
      trend: 'up',
      percentage: 12
    }
  ];

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
      priority: newMessage.priority,
      archived: false
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

  const handleArchiveMessage = (messageId: number) => {
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, archived: !m.archived } : m
    ));

    const message = messages.find(m => m.id === messageId);
    if (message) {
      toast({
        title: message.archived ? "Message Unarchived" : "Message Archived",
        description: `Message "${message.subject}" has been ${message.archived ? 'restored to inbox' : 'moved to archive'}`
      });
    }
  };

  const handleReplyToMessage = () => {
    if (selectedMessage) {
      // Pre-populate the compose form with reply data
      setNewMessage({
        recipient: selectedMessage.sender,
        groupName: selectedMessage.isGroup ? selectedMessage.groupName || '' : '',
        isGroup: selectedMessage.isGroup,
        subject: selectedMessage.subject.startsWith('Re:') ? selectedMessage.subject : `Re: ${selectedMessage.subject}`,
        content: `\n\n--- Original Message ---\nFrom: ${selectedMessage.sender}\nSubject: ${selectedMessage.subject}\nTime: ${selectedMessage.time}\n\n${selectedMessage.content}`,
        priority: 'normal'
      });

      // Close message detail dialog and open compose dialog
      setSelectedMessage(null);
      setIsComposeOpen(true);

      toast({
        title: "Reply Started",
        description: `Replying to "${selectedMessage.subject}"`
      });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArchiveFilter = showArchived ? message.archived : !message.archived;

    return matchesSearch && matchesArchiveFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🚨';
      case 'normal': return '📋';
      case 'low': return '⬇️';
      default: return '📋';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
      default: return <Activity className="w-3 h-3 text-gray-600" />;
    }
  };

  return (
    <Layout title="Messages" subtitle="Manage your pharmacy communications">
      <div className="space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {messageStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color} shadow-lg`}>
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{stat.change}</p>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' :
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                      {stat.percentage}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Messages Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                    {showArchived ? 'Archived Messages' : 'Inbox'}
                  </CardTitle>
                  <p className="text-sm lg:text-base text-gray-600">
                    {filteredMessages.length} messages{!showArchived && ` • ${messages.filter(m => m.unread && !m.archived).length} unread`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    onClick={() => setShowArchived(!showArchived)}
                  >
                    <Archive className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {showArchived ? 'Show Inbox' : 'Show Archived'}
                    </span>
                  </Button>

                  {/* Enhanced Compose Dialog */}
                  <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg h-10">
                        <Plus className="w-4 h-4 mr-2" />
                        Compose
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-walgreens-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Edit3 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <DialogTitle className="text-xl font-bold text-gray-900">
                              Compose New Message
                            </DialogTitle>
                            <p className="text-gray-600">Send a message to staff or teams</p>
                          </div>
                        </div>
                      </DialogHeader>

                      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="space-y-6">
                        {/* Message Type Selection */}
                        <Card className="border border-gray-200">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                              <Users className="w-5 h-5 mr-2 text-walgreens-blue" />
                              Message Type
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center space-x-4">
                              <Button
                                type="button"
                                variant={!newMessage.isGroup ? "default" : "outline"}
                                onClick={() => setNewMessage({ ...newMessage, isGroup: false, groupName: '' })}
                                className="flex items-center"
                              >
                                <User className="w-4 h-4 mr-2" />
                                Individual
                              </Button>
                              <Button
                                type="button"
                                variant={newMessage.isGroup ? "default" : "outline"}
                                onClick={() => setNewMessage({ ...newMessage, isGroup: true, recipient: '' })}
                                className="flex items-center"
                              >
                                <Users className="w-4 h-4 mr-2" />
                                Group
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Recipient Selection */}
                        <Card className="border border-gray-200">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                              <UserPlus className="w-5 h-5 mr-2 text-walgreens-blue" />
                              {newMessage.isGroup ? 'Group Details' : 'Recipient'}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {!newMessage.isGroup ? (
                              <div className="space-y-2">
                                <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">To:</Label>
                                <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({ ...newMessage, recipient: value })}>
                                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                    <SelectValue placeholder="Select recipient" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {users.map((user) => (
                                      <SelectItem key={user.id} value={user.name}>
                                        <div className="flex items-center">
                                          <span>{user.name}</span>
                                          <Badge className="ml-2 text-xs bg-blue-100 text-blue-800">{user.role}</Badge>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Label htmlFor="groupName" className="text-sm font-medium text-gray-700">Group Name:</Label>
                                <Input
                                  id="groupName"
                                  placeholder="Enter group name (e.g., Pharmacy Team, All Staff)"
                                  value={newMessage.groupName}
                                  onChange={(e) => setNewMessage({ ...newMessage, groupName: e.target.value })}
                                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Message Details */}
                        <Card className="border border-gray-200">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                              <MessageCircle className="w-5 h-5 mr-2 text-walgreens-blue" />
                              Message Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority:</Label>
                                <Select value={newMessage.priority} onValueChange={(value: 'high' | 'normal' | 'low') => setNewMessage({ ...newMessage, priority: value })}>
                                  <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="high">🚨 High Priority</SelectItem>
                                    <SelectItem value="normal">📋 Normal Priority</SelectItem>
                                    <SelectItem value="low">⬇️ Low Priority</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject:</Label>
                                <Input
                                  id="subject"
                                  placeholder="Message subject"
                                  value={newMessage.subject}
                                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                                  className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="content" className="text-sm font-medium text-gray-700">Message:</Label>
                              <Textarea
                                id="content"
                                placeholder="Type your message here..."
                                value={newMessage.content}
                                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                className="min-h-32 focus:border-walgreens-blue focus:ring-walgreens-blue"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsComposeOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Your inbox is empty.'}
                </p>
                <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Compose Message
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300 cursor-pointer ${message.unread ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' : ''
                      }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${message.isGroup ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                          {message.isGroup ? (
                            <Users className="w-6 h-6 text-green-600" />
                          ) : (
                            <User className="w-6 h-6 text-blue-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <h3 className={`font-semibold text-lg ${message.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                              {message.sender}
                            </h3>

                            {message.isGroup && message.groupName && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 border font-medium">
                                <Users className="w-3 h-3 mr-1" />
                                {message.groupName}
                              </Badge>
                            )}

                            {!message.isGroup && message.recipient && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200 border font-medium">
                                To: {message.recipient}
                              </Badge>
                            )}

                            <Badge className={`${getPriorityColor(message.priority)} border font-medium`}>
                              <span className="mr-1">{getPriorityIcon(message.priority)}</span>
                              {message.priority}
                            </Badge>

                            {message.unread && (
                              <Badge className="bg-walgreens-red text-white font-medium">
                                New
                              </Badge>
                            )}
                          </div>

                          <h4 className={`font-medium mb-2 ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.subject}
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>

                      <div className="ml-6 space-y-2 flex flex-col items-end">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {message.time}
                        </div>

                        <div className="flex items-center space-x-2">
                          {message.unread && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(message.id);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchiveMessage(message.id);
                            }}
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
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
            )}
          </CardContent>
        </Card>

        {/* Enhanced Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      {selectedMessage.isGroup ? (
                        <Users className="w-6 h-6 text-white" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        {selectedMessage.subject}
                      </DialogTitle>
                      <p className="text-gray-600">Message Details</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Message Header Info */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600">From:</p>
                            <p className="font-semibold text-gray-900">{selectedMessage.sender}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">To:</p>
                            <p className="font-semibold text-gray-900">
                              {selectedMessage.isGroup
                                ? selectedMessage.groupName
                                : selectedMessage.recipient
                              }
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Time:</p>
                            <p className="font-semibold text-gray-900">{selectedMessage.time}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Priority:</p>
                            <Badge className={`${getPriorityColor(selectedMessage.priority)} border font-medium`}>
                              <span className="mr-1">{getPriorityIcon(selectedMessage.priority)}</span>
                              {selectedMessage.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Message Content */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                          {selectedMessage.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={() => setSelectedMessage(null)} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      Close
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                      onClick={handleReplyToMessage}
                    >
                      <Reply className="w-4 h-4 mr-2" />
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
