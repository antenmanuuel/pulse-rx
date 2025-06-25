
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  status: 'active' | 'pending' | 'resolved';
  action: string;
}

const initialAlerts: Alert[] = [
  {
    id: 'AL001',
    type: 'critical',
    title: 'Drug Interaction Alert',
    description: 'Patient John Smith (RX001234) - Potential interaction between Warfarin and Aspirin',
    time: '5 minutes ago',
    status: 'active',
    action: 'Contact prescriber'
  },
  {
    id: 'AL002',
    type: 'warning',
    title: 'Low Stock Alert',
    description: 'Metformin 500mg - Only 15 units remaining (Below minimum threshold of 50)',
    time: '15 minutes ago',
    status: 'active',
    action: 'Reorder medication'
  },
  {
    id: 'AL003',
    type: 'info',
    title: 'Insurance Authorization Required',
    description: 'Patient Maria Garcia (RX001235) - Prior authorization needed for Humira',
    time: '30 minutes ago',
    status: 'pending',
    action: 'Submit authorization'
  },
  {
    id: 'AL004',
    type: 'critical',
    title: 'Allergy Alert',
    description: 'Patient Robert Davis prescribed Penicillin - Known allergy on file',
    time: '1 hour ago',
    status: 'resolved',
    action: 'Alternative prescribed'
  },
  {
    id: 'AL005',
    type: 'warning',
    title: 'Expiring Medication',
    description: 'Atorvastatin 20mg (Lot: ABC123) expires in 30 days',
    time: '2 hours ago',
    status: 'active',
    action: 'Return to supplier'
  }
];

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const { toast } = useToast();

  const takeAction = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
    
    const alert = alerts.find(a => a.id === alertId);
    toast({
      title: "Action Taken",
      description: `Alert "${alert?.title}" has been resolved.`,
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    
    const alert = alerts.find(a => a.id === alertId);
    toast({
      title: "Alert Dismissed",
      description: `Alert "${alert?.title}" has been dismissed.`,
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  const getActiveAlerts = () => alerts.filter(alert => alert.status === 'active');
  const getCriticalAlerts = () => alerts.filter(alert => alert.type === 'critical' && alert.status === 'active');
  const getResolvedTodayCount = () => alerts.filter(alert => alert.status === 'resolved').length;

  return {
    alerts,
    takeAction,
    dismissAlert,
    resolveAlert,
    getActiveAlerts,
    getCriticalAlerts,
    getResolvedTodayCount
  };
};
