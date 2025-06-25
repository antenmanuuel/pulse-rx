
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
import { AlertTriangle, CheckCircle } from 'lucide-react';
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
      default: return <CheckCircle className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getAlertIcon(alert.type)}
            <span>Take Action on Alert</span>
          </DialogTitle>
          <DialogDescription>
            Resolve this alert by taking the recommended action and adding any notes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            <p className="text-sm font-medium text-walgreens-blue mt-2">
              Recommended Action: {alert.action}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Action Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about the action taken..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleTakeAction}
            className="bg-walgreens-red hover:bg-walgreens-red-dark"
          >
            Mark as Resolved
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertActionDialog;
