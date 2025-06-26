import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Phone,
    Mail,
    MessageSquare,
    Calendar,
    User,
    Send,
    CheckCircle,
    FileText,
    PhoneCall,
    Smartphone,
    Voicemail,
    Bell
} from 'lucide-react';

interface ContactDialogProps {
    contact: any;
    onContact: (data: any) => void;
}

export default function ContactDialog({ contact, onContact }: ContactDialogProps) {
    const [open, setOpen] = useState(false);
    const [contactData, setContactData] = useState({
        method: '',
        subject: '',
        message: '',
        followUpDate: '',
        priority: 'normal'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContact({
            ...contactData,
            contactId: contact.id || contact.patient,
            timestamp: new Date().toISOString(),
            contactName: contact.patient || contact.name
        });
        setOpen(false);
    };

    const isFormValid = () => {
        return contactData.method && contactData.subject && contactData.message.trim();
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-gray-300 hover:border-walgreens-blue hover:text-walgreens-blue hover:bg-blue-50 transition-all duration-200">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                Contact Patient
                            </DialogTitle>
                            <p className="text-gray-600">{contact.patient || contact.name}</p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Patient Contact Information */}
                <Card className="border border-gray-200">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                            <User className="w-5 h-5 mr-2 text-walgreens-blue" />
                            Patient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">Phone Number</span>
                                </div>
                                <p className="text-lg font-bold text-blue-900">{contact.phone}</p>
                                <p className="text-xs text-blue-600 mt-1">Primary contact method</p>
                            </div>

                            {contact.email && (
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Mail className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-900">Email Address</span>
                                    </div>
                                    <p className="text-sm font-bold text-green-900">{contact.email}</p>
                                    <p className="text-xs text-green-600 mt-1">Secondary contact method</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Method */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <PhoneCall className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Contact Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="method" className="text-sm font-medium text-gray-700">
                                    Communication Channel *
                                </Label>
                                <Select value={contactData.method} onValueChange={(value) => setContactData({ ...contactData, method: value })}>
                                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                        <SelectValue placeholder="Select contact method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="phone">📞 Phone Call</SelectItem>
                                        <SelectItem value="sms">📱 Text Message</SelectItem>
                                        <SelectItem value="email">📧 Email</SelectItem>
                                        <SelectItem value="voicemail">🎵 Voicemail</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Purpose */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Contact Purpose
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                    Subject/Purpose *
                                </Label>
                                <Select value={contactData.subject} onValueChange={(value) => setContactData({ ...contactData, subject: value })}>
                                    <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                        <SelectValue placeholder="Select purpose" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="appointment-reminder">📅 Appointment Reminder</SelectItem>
                                        <SelectItem value="appointment-confirmation">✅ Appointment Confirmation</SelectItem>
                                        <SelectItem value="prescription-ready">💊 Prescription Ready</SelectItem>
                                        <SelectItem value="insurance-issue">🛡️ Insurance Issue</SelectItem>
                                        <SelectItem value="delivery-update">🚚 Delivery Update</SelectItem>
                                        <SelectItem value="follow-up">📋 Follow-up Call</SelectItem>
                                        <SelectItem value="other">📝 Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Message Content */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Message Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                    Message/Notes *
                                </Label>
                                <Textarea
                                    id="message"
                                    value={contactData.message}
                                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                                    placeholder="Enter your message or notes about the conversation..."
                                    rows={4}
                                    className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    required
                                />
                                <p className="text-xs text-gray-500">
                                    Character count: {contactData.message.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Priority and Follow-up */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-walgreens-blue" />
                                Priority & Follow-up
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                                        Priority Level
                                    </Label>
                                    <Select value={contactData.priority} onValueChange={(value) => setContactData({ ...contactData, priority: value })}>
                                        <SelectTrigger className="focus:border-walgreens-blue focus:ring-walgreens-blue">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">🔸 Low Priority</SelectItem>
                                            <SelectItem value="normal">🔹 Normal Priority</SelectItem>
                                            <SelectItem value="high">🔶 High Priority</SelectItem>
                                            <SelectItem value="urgent">🔴 Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="followUpDate" className="text-sm font-medium text-gray-700">
                                        Follow-up Date (Optional)
                                    </Label>
                                    <Input
                                        id="followUpDate"
                                        type="date"
                                        value={contactData.followUpDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setContactData({ ...contactData, followUpDate: e.target.value })}
                                        className="focus:border-walgreens-blue focus:ring-walgreens-blue"
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Selected Priority:</span>
                                    <Badge className={getPriorityColor(contactData.priority)}>
                                        {contactData.priority.charAt(0).toUpperCase() + contactData.priority.slice(1)}
                                    </Badge>
                                </div>
                                {contactData.followUpDate && (
                                    <div className="flex items-center justify-between text-sm mt-2">
                                        <span className="text-gray-600">Follow-up scheduled:</span>
                                        <span className="font-medium text-gray-900">
                                            {new Date(contactData.followUpDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Summary */}
                    {isFormValid() && (
                        <Card className="border border-green-200 bg-green-50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-green-900 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Contact Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-white p-4 rounded-lg border border-green-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Method:</span>
                                                <span className="font-medium">{contactData.method}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Purpose:</span>
                                                <span className="font-medium">{contactData.subject}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Priority:</span>
                                                <Badge className={getPriorityColor(contactData.priority)}>
                                                    {contactData.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Patient:</span>
                                                <span className="font-medium">{contact.patient || contact.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-green-800 font-medium">
                                            Contact will be logged and tracked
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-green-700">
                                        Communication record will be saved to patient history
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Separator className="my-6" />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-gray-300 hover:border-gray-400"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-walgreens-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={!isFormValid()}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Send/Record Contact
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 