import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, User, MessageSquare, AlertCircle, Clock, FileText } from 'lucide-react';

interface ContactPatientDialogProps {
    delivery: any;
    onContact: (data: any) => void;
}

export default function ContactPatientDialog({ delivery, onContact }: ContactPatientDialogProps) {
    const [contactData, setContactData] = useState({
        method: '',
        purpose: '',
        message: '',
        outcome: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContact({ ...contactData, deliveryId: delivery.id });
        setContactData({
            method: '',
            purpose: '',
            message: '',
            outcome: ''
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Out for Delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 shadow-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Patient
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
                <DialogHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
                    <DialogTitle className="flex items-center text-xl">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                        Contact Patient - {delivery.patient}
                    </DialogTitle>
                </DialogHeader>

                {/* Patient Information */}
                <Card className="border-0 shadow-sm bg-white mb-6">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                        <CardTitle className="flex items-center text-blue-800">
                            <User className="w-5 h-5 mr-2" />
                            Patient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-blue-700">Phone:</span>
                                </div>
                                <p className="font-medium text-blue-900">{delivery.phone}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <AlertCircle className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-semibold text-purple-700">Status:</span>
                                </div>
                                <Badge className={`${getStatusColor(delivery.status)} border font-medium`}>
                                    {delivery.status}
                                </Badge>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-semibold text-orange-700">Estimated Time:</span>
                                </div>
                                <p className="font-medium text-orange-900">{delivery.estimatedTime}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Method */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
                            <CardTitle className="flex items-center text-purple-800">
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Contact Method & Purpose
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="method" className="text-sm font-semibold text-gray-700">Contact Method</Label>
                                    <Select onValueChange={(value) => setContactData({ ...contactData, method: value })}>
                                        <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-200">
                                            <SelectValue placeholder="Select contact method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phone">📞 Phone Call</SelectItem>
                                            <SelectItem value="sms">💬 Text Message</SelectItem>
                                            <SelectItem value="voicemail">🎙️ Voicemail</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="purpose" className="text-sm font-semibold text-gray-700">Contact Purpose</Label>
                                    <Select onValueChange={(value) => setContactData({ ...contactData, purpose: value })}>
                                        <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-200">
                                            <SelectValue placeholder="Select purpose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="delivery-notification">🚚 Delivery Notification</SelectItem>
                                            <SelectItem value="delivery-delay">⏰ Delivery Delay</SelectItem>
                                            <SelectItem value="address-verification">📍 Address Verification</SelectItem>
                                            <SelectItem value="delivery-instructions">📝 Special Delivery Instructions</SelectItem>
                                            <SelectItem value="delivery-attempt">🚫 Failed Delivery Attempt</SelectItem>
                                            <SelectItem value="other">❓ Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Message Content */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
                            <CardTitle className="flex items-center text-orange-800">
                                <FileText className="w-5 h-5 mr-2" />
                                Message Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message/Notes</Label>
                                <Textarea
                                    id="message"
                                    value={contactData.message}
                                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                                    placeholder="Enter message content or conversation notes. Include any specific information discussed with the patient."
                                    rows={4}
                                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Outcome */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
                            <CardTitle className="flex items-center text-green-800">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                Contact Outcome
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <Label htmlFor="outcome" className="text-sm font-semibold text-gray-700">Contact Result</Label>
                                <Select onValueChange={(value) => setContactData({ ...contactData, outcome: value })}>
                                    <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-200">
                                        <SelectValue placeholder="Select outcome" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="answered-confirmed">✅ Patient Answered - Confirmed</SelectItem>
                                        <SelectItem value="answered-rescheduled">📅 Patient Answered - Rescheduled</SelectItem>
                                        <SelectItem value="voicemail-left">🎙️ Voicemail Left</SelectItem>
                                        <SelectItem value="no-answer">📵 No Answer</SelectItem>
                                        <SelectItem value="number-disconnected">❌ Number Disconnected</SelectItem>
                                        <SelectItem value="call-back-requested">📞 Call Back Requested</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Record Contact
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 