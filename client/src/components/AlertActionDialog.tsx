import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Target,
  FileText,
  Clock,
  Zap,
  Shield
} from 'lucide-react';
import { Alert } from '@/hooks/useAlerts';

interface AlertActionDialogProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onTakeAction: (alertId: string, notes?: string) => void;
}

const AlertActionDialog = ({ alert, isOpen, onClose, onTakeAction }: AlertActionDialogProps) => {
  const [notes, setNotes] = useState('');

  const handleTakeAction = () => {
    if (alert) {
      onTakeAction(alert.id, notes);
      setNotes('');
      onClose();
    }
  };

  if (!alert) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'info': return <Info className="w-6 h-6 text-blue-600" />;
      default: return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'warning': return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
      case 'info': return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
      default: return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getActionButtonStyle = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700';
      case 'warning': return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
      case 'info': return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      default: return 'bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-walgreens-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Take Action on Alert
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Resolve this alert by taking the recommended action and adding any notes.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Information */}
          <Card className={`${getAlertTypeColor(alert.type)} border`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                {getAlertIcon(alert.type)}
                <span className="ml-2">Alert Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <h4 className="font-semibold text-lg text-gray-900">{alert.title}</h4>

                  <Badge className={`${getStatusColor(alert.status)} border font-medium`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(alert.status)}
                      <span>{alert.status}</span>
                    </div>
                  </Badge>

                  <Badge className="bg-gray-100 text-gray-700 border-gray-200 border font-medium">
                    <span className="mr-1">{getPriorityIcon(alert.type)}</span>
                    {alert.type}
                  </Badge>
                </div>

                <p className="text-gray-700 leading-relaxed">{alert.description}</p>

                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-walgreens-blue" />
                    <span className="font-semibold text-gray-900">Recommended Action:</span>
                  </div>
                  <p className="text-walgreens-blue font-medium">{alert.action}</p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Alert triggered: {alert.time}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Notes */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                <FileText className="w-5 h-5 mr-2 text-walgreens-blue" />
                Action Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Notes about actions taken (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe the actions you took to resolve this alert. Include any relevant details, observations, or follow-up requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-32 border-gray-300 focus:border-walgreens-blue focus:ring-walgreens-blue"
                  />
                  <p className="text-xs text-gray-500">
                    These notes will be saved with the alert resolution for future reference.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Confirmation */}
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Ready to Resolve</h4>
                  <p className="text-sm text-green-700">
                    Clicking "Mark as Resolved" will change this alert's status to resolved and record the timestamp.
                    This action will help track response times and completion rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="pt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleTakeAction}
            className={`${getActionButtonStyle(alert.type)} text-white shadow-lg`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Resolved
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertActionDialog;
