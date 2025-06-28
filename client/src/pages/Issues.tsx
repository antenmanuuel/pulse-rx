import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Bug,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Upload,
  X,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Tag,
  MessageSquare,
  TrendingDown,
  Activity,
  AlertCircle,
  Info,
  Search,
  Filter,
  Eye,
  ExternalLink
} from 'lucide-react';

const IssuesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'submit' | 'status' | 'my-issues'>('submit');
  const [issueForm, setIssueForm] = useState({
    title: '',
    type: '',
    priority: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    browserInfo: navigator.userAgent,
    url: window.location.href,
    attachments: [] as File[]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data for system status and user issues
  const systemStatus = {
    overall: 'operational',
    lastIncident: '2 days ago',
    uptime: '99.9%',
    responseTime: '120ms',
    services: [
      { name: 'Prescription Queue', status: 'operational', uptime: '100%' },
      { name: 'Patient Lookup', status: 'operational', uptime: '99.8%' },
      { name: 'Inventory System', status: 'maintenance', uptime: '98.5%', note: 'Scheduled maintenance 2:00-4:00 AM EST' },
      { name: 'Notifications', status: 'operational', uptime: '99.9%' },
      { name: 'Delivery Tracking', status: 'degraded', uptime: '97.2%', note: 'Investigating slower response times' },
      { name: 'User Authentication', status: 'operational', uptime: '100%' }
    ]
  };

  const userIssues = [
    {
      id: 'ISS-2024-001',
      title: 'Prescription queue not loading patient information',
      type: 'bug',
      priority: 'high',
      status: 'in-progress',
      created: '2024-01-15',
      updated: '2024-01-16',
      assignee: 'Tech Support',
      description: 'When clicking on a prescription in the queue, patient details panel remains blank.',
      responses: 3
    },
    {
      id: 'ISS-2024-002',
      title: 'Add bulk inventory update feature',
      type: 'feature',
      priority: 'medium',
      status: 'planned',
      created: '2024-01-14',
      updated: '2024-01-15',
      assignee: 'Product Team',
      description: 'Request to add ability to update multiple inventory items at once via CSV upload.',
      responses: 1
    },
    {
      id: 'ISS-2024-003',
      title: 'Dark mode toggle not working in Safari',
      type: 'bug',
      priority: 'low',
      status: 'resolved',
      created: '2024-01-12',
      updated: '2024-01-14',
      assignee: 'Frontend Team',
      description: 'Dark mode toggle button appears but does not change theme in Safari browser.',
      responses: 5
    }
  ];

  const issueTypes = [
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-600', bgColor: 'bg-red-50' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { value: 'question', label: 'Question', icon: HelpCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { value: 'improvement', label: 'Improvement', icon: TrendingDown, color: 'text-green-600', bgColor: 'bg-green-50' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'text-gray-600', bgColor: 'bg-gray-50' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { value: 'high', label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { value: 'critical', label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const statusTypes = [
    { value: 'open', label: 'Open', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { value: 'in-progress', label: 'In Progress', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { value: 'planned', label: 'Planned', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { value: 'resolved', label: 'Resolved', color: 'text-green-600', bgColor: 'bg-green-50' },
    { value: 'closed', label: 'Closed', color: 'text-gray-600', bgColor: 'bg-gray-50' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'maintenance': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'outage': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50';
      case 'degraded': return 'text-yellow-600 bg-yellow-50';
      case 'maintenance': return 'text-blue-600 bg-blue-50';
      case 'outage': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIssueForm(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setIssueForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueForm.title || !issueForm.type || !issueForm.priority || !issueForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate a mock issue ID
    const issueId = `ISS-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    
    toast({
      title: "Issue Submitted Successfully",
      description: `Your issue has been submitted with ID: ${issueId}. You'll receive updates via email.`
    });

    // Reset form
    setIssueForm({
      title: '',
      type: '',
      priority: '',
      description: '',
      stepsToReproduce: '',
      expectedBehavior: '',
      actualBehavior: '',
      browserInfo: navigator.userAgent,
      url: window.location.href,
      attachments: []
    });
  };

  const filteredIssues = userIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesType = filterType === 'all' || issue.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout title="Issues & Support" subtitle="Report issues, track status, and get help">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'submit'
                ? 'bg-white text-walgreens-red shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Submit Issue
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'status'
                ? 'bg-white text-walgreens-red shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            System Status
          </button>
          <button
            onClick={() => setActiveTab('my-issues')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'my-issues'
                ? 'bg-white text-walgreens-red shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Issues
          </button>
        </div>

        {/* Submit Issue Tab */}
        {activeTab === 'submit' && (
          <div className="space-y-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-walgreens-red" />
                  <span>Submit New Issue</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Help us improve PulseRx by reporting bugs, requesting features, or asking questions.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title *</Label>
                      <Input
                        id="title"
                        value={issueForm.title}
                        onChange={(e) => setIssueForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Brief description of the issue"
                        className="focus:border-walgreens-red focus:ring-walgreens-red"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Issue Type *</Label>
                      <Select value={issueForm.type} onValueChange={(value) => setIssueForm(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          {issueTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <type.icon className={`w-4 h-4 ${type.color}`} />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select value={issueForm.priority} onValueChange={(value) => setIssueForm(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger className="focus:border-walgreens-red focus:ring-walgreens-red">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${priority.bgColor} border ${priority.color.replace('text-', 'border-')}`}></div>
                              <span>{priority.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={issueForm.description}
                      onChange={(e) => setIssueForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide a detailed description of the issue"
                      rows={4}
                      className="focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>

                  {/* Bug-specific fields */}
                  {issueForm.type === 'bug' && (
                    <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <h3 className="font-medium text-red-900">Bug Report Details</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="steps">Steps to Reproduce</Label>
                        <Textarea
                          id="steps"
                          value={issueForm.stepsToReproduce}
                          onChange={(e) => setIssueForm(prev => ({ ...prev, stepsToReproduce: e.target.value }))}
                          placeholder="1. Go to... 2. Click on... 3. See error..."
                          rows={3}
                          className="focus:border-red-400 focus:ring-red-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expected">Expected Behavior</Label>
                          <Textarea
                            id="expected"
                            value={issueForm.expectedBehavior}
                            onChange={(e) => setIssueForm(prev => ({ ...prev, expectedBehavior: e.target.value }))}
                            placeholder="What should happen?"
                            rows={2}
                            className="focus:border-red-400 focus:ring-red-400"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="actual">Actual Behavior</Label>
                          <Textarea
                            id="actual"
                            value={issueForm.actualBehavior}
                            onChange={(e) => setIssueForm(prev => ({ ...prev, actualBehavior: e.target.value }))}
                            placeholder="What actually happens?"
                            rows={2}
                            className="focus:border-red-400 focus:ring-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* System Information */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">System Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-gray-600">Browser:</Label>
                        <p className="text-gray-800 mt-1 p-2 bg-white rounded border text-xs">{navigator.userAgent}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Current Page:</Label>
                        <p className="text-gray-800 mt-1 p-2 bg-white rounded border text-xs">{window.location.href}</p>
                      </div>
                    </div>
                  </div>

                  {/* File Attachments */}
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="focus:border-walgreens-red focus:ring-walgreens-red"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    {issueForm.attachments.length > 0 && (
                      <div className="space-y-2">
                        {issueForm.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-walgreens-red hover:bg-red-600"
                  >
                    Submit Issue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Status Tab */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            
            {/* Overall Status */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">All Systems Operational</h2>
                      <p className="text-gray-600">PulseRx services are running smoothly</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">Uptime: <span className="font-medium text-green-600">{systemStatus.uptime}</span></div>
                    <div className="text-sm text-gray-600">Response: <span className="font-medium">{systemStatus.responseTime}</span></div>
                    <div className="text-sm text-gray-600">Last incident: <span className="font-medium">{systemStatus.lastIncident}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Status */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-walgreens-red" />
                  <span>Service Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemStatus.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        {service.note && (
                          <p className="text-sm text-gray-600">{service.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Uptime</div>
                        <div className="font-medium">{service.uptime}</div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Issues Tab */}
        {activeTab === 'my-issues' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search issues..."
                      className="pl-10 focus:border-walgreens-red focus:ring-walgreens-red"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {statusTypes.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Issues List */}
            <div className="space-y-4">
              {filteredIssues.map((issue) => {
                const issueType = issueTypes.find(t => t.value === issue.type);
                const priority = priorityLevels.find(p => p.value === issue.priority);
                const status = statusTypes.find(s => s.value === issue.status);

                return (
                  <Card key={issue.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {issue.id}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Created: {issue.created}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Updated: {issue.updated}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>Assigned: {issue.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{issue.responses} responses</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {issueType && (
                              <Badge className={`${issueType.bgColor} ${issueType.color} border-0`}>
                                <issueType.icon className="w-3 h-3 mr-1" />
                                {issueType.label}
                              </Badge>
                            )}
                            {priority && (
                              <Badge className={`${priority.bgColor} ${priority.color} border-0`}>
                                {priority.label}
                              </Badge>
                            )}
                            {status && (
                              <Badge className={`${status.bgColor} ${status.color} border-0`}>
                                {status.label}
                              </Badge>
                            )}
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredIssues.length === 0 && (
              <Card className="border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No issues found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IssuesPage;