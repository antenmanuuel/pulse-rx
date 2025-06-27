import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  time: string;
  status: "active" | "pending" | "resolved";
  action: string;
  archived?: boolean;
  category?: "alert" | "activity";
}

export interface Activity {
  id: string;
  type: "prescription" | "delivery" | "inventory" | "appointment" | "system";
  title: string;
  description: string;
  time: string;
  status: "completed" | "in-progress" | "pending" | "failed";
  user: string;
  archived?: boolean;
  category: "activity";
}

const initialAlerts: Alert[] = [
  {
    id: "AL001",
    type: "critical",
    title: "Drug Interaction Alert",
    description:
      "Patient John Smith (RX001234) - Potential interaction between Warfarin and Aspirin",
    time: "5 minutes ago",
    status: "active",
    action: "Contact prescriber",
    archived: false,
    category: "alert",
  },
  {
    id: "AL002",
    type: "warning",
    title: "Low Stock Alert",
    description:
      "Metformin 500mg - Only 15 units remaining (Below minimum threshold of 50)",
    time: "15 minutes ago",
    status: "active",
    action: "Reorder medication",
    archived: false,
    category: "alert",
  },
  {
    id: "AL003",
    type: "info",
    title: "Insurance Authorization Required",
    description:
      "Patient Maria Garcia (RX001235) - Prior authorization needed for Humira",
    time: "30 minutes ago",
    status: "pending",
    action: "Submit authorization",
    archived: false,
    category: "alert",
  },
  {
    id: "AL004",
    type: "critical",
    title: "Allergy Alert",
    description:
      "Patient Robert Davis prescribed Penicillin - Known allergy on file",
    time: "1 hour ago",
    status: "resolved",
    action: "Alternative prescribed",
    archived: false,
    category: "alert",
  },
  {
    id: "AL005",
    type: "warning",
    title: "Expiring Medication",
    description: "Atorvastatin 20mg (Lot: ABC123) expires in 30 days",
    time: "2 hours ago",
    status: "active",
    action: "Return to supplier",
    archived: false,
    category: "alert",
  },
];

const initialActivities: Activity[] = [
  {
    id: "AC001",
    type: "prescription",
    title: "Prescription Processed",
    description: "Lisinopril 10mg for Sarah Johnson completed verification",
    time: "2 minutes ago",
    status: "completed",
    user: "Dr. Smith",
    archived: false,
    category: "activity",
  },
  {
    id: "AC002",
    type: "delivery",
    title: "Delivery Assigned",
    description: "Mike Johnson assigned for delivery to downtown area",
    time: "5 minutes ago",
    status: "in-progress",
    user: "Pharmacy",
    archived: false,
    category: "activity",
  },
  {
    id: "AC003",
    type: "inventory",
    title: "Low Stock Alert",
    description: "Metformin 500mg below minimum threshold (12 units)",
    time: "8 minutes ago",
    status: "pending",
    user: "System",
    archived: false,
    category: "activity",
  },
  {
    id: "AC004",
    type: "appointment",
    title: "Patient Check-in",
    description: "Michael Brown checked in for medication consultation",
    time: "12 minutes ago",
    status: "completed",
    user: "Reception",
    archived: false,
    category: "activity",
  },
  {
    id: "AC005",
    type: "inventory",
    title: "Stock Updated",
    description: "Ibuprofen 200mg inventory updated (+150 units)",
    time: "15 minutes ago",
    status: "completed",
    user: "J. Wilson",
    archived: false,
    category: "activity",
  },
  {
    id: "AC006",
    type: "prescription",
    title: "New Prescription Received",
    description: "Amoxicillin 500mg prescribed for patient Emily Davis",
    time: "20 minutes ago",
    status: "pending",
    user: "Dr. Brown",
    archived: false,
    category: "activity",
  },
  {
    id: "AC007",
    type: "system",
    title: "System Backup Completed",
    description: "Daily backup process completed successfully",
    time: "1 hour ago",
    status: "completed",
    user: "System",
    archived: false,
    category: "activity",
  },
];

// Combine alerts and activities into a single list
type CombinedItem = Alert | Activity;

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const { toast } = useToast();

  // Get combined list of alerts and activities
  const getAllItems = (): CombinedItem[] => {
    return [...alerts, ...activities].sort((a, b) => {
      // Sort by time (newest first) - simplified sorting
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  };

  const takeAction = (itemId: string) => {
    // Handle alerts
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === itemId ? { ...alert, status: "resolved" as const } : alert
      )
    );

    // Handle activities (mark as completed)
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === itemId
          ? { ...activity, status: "completed" as const }
          : activity
      )
    );

    const item = getAllItems().find((i) => i.id === itemId);
    toast({
      title: "Action Taken",
      description: `"${item?.title}" has been resolved.`,
    });
  };

  const dismissAlert = (itemId: string) => {
    // Remove from alerts
    setAlerts((prev) => prev.filter((alert) => alert.id !== itemId));

    // Remove from activities
    setActivities((prev) => prev.filter((activity) => activity.id !== itemId));

    const item = getAllItems().find((i) => i.id === itemId);
    toast({
      title: "Item Dismissed",
      description: `"${item?.title}" has been dismissed permanently.`,
    });
  };

  const deleteItem = (itemId: string) => {
    // Permanently delete from alerts
    setAlerts((prev) => prev.filter((alert) => alert.id !== itemId));

    // Permanently delete from activities
    setActivities((prev) => prev.filter((activity) => activity.id !== itemId));

    const item = getAllItems().find((i) => i.id === itemId);
    toast({
      title: "Item Deleted",
      description: `"${item?.title}" has been permanently deleted.`,
      variant: "destructive",
    });
  };

  const resolveAlert = (itemId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === itemId ? { ...alert, status: "resolved" as const } : alert
      )
    );

    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === itemId
          ? { ...activity, status: "completed" as const }
          : activity
      )
    );
  };

  const archiveAlert = (itemId: string) => {
    // Archive alerts
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === itemId ? { ...alert, archived: !alert.archived } : alert
      )
    );

    // Archive activities
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === itemId
          ? { ...activity, archived: !activity.archived }
          : activity
      )
    );

    const item = getAllItems().find((i) => i.id === itemId);
    toast({
      title: item?.archived ? "Item Unarchived" : "Item Archived",
      description: `"${item?.title}" has been ${
        item?.archived ? "restored to active items" : "moved to archive"
      }.`,
    });
  };

  const archiveMultipleAlerts = (itemIds: string[]) => {
    // Archive multiple alerts
    setAlerts((prev) =>
      prev.map((alert) =>
        itemIds.includes(alert.id) ? { ...alert, archived: true } : alert
      )
    );

    // Archive multiple activities
    setActivities((prev) =>
      prev.map((activity) =>
        itemIds.includes(activity.id)
          ? { ...activity, archived: true }
          : activity
      )
    );

    toast({
      title: "Items Archived",
      description: `${itemIds.length} item(s) have been archived.`,
    });
  };

  const deleteMultipleItems = (itemIds: string[]) => {
    // Delete multiple alerts
    setAlerts((prev) => prev.filter((alert) => !itemIds.includes(alert.id)));

    // Delete multiple activities
    setActivities((prev) =>
      prev.filter((activity) => !itemIds.includes(activity.id))
    );

    toast({
      title: "Items Deleted",
      description: `${itemIds.length} item(s) have been permanently deleted.`,
      variant: "destructive",
    });
  };

  // Get specific filtered lists
  const getActiveAlerts = () =>
    alerts.filter((alert) => alert.status === "active" && !alert.archived);

  const getActiveActivities = () =>
    activities.filter(
      (activity) => activity.status !== "completed" && !activity.archived
    );

  const getCriticalAlerts = () =>
    alerts.filter(
      (alert) =>
        alert.type === "critical" &&
        alert.status === "active" &&
        !alert.archived
    );

  const getResolvedTodayCount = () =>
    [...alerts, ...activities].filter(
      (item) =>
        (item.category === "alert"
          ? (item as Alert).status === "resolved"
          : (item as Activity).status === "completed") && !item.archived
    ).length;

  const getArchivedAlerts = () =>
    [...alerts, ...activities].filter((item) => item.archived);

  const getActivitiesByType = (type: Activity["type"]) =>
    activities.filter(
      (activity) => activity.type === type && !activity.archived
    );

  return {
    alerts,
    activities,
    getAllItems,
    takeAction,
    dismissAlert,
    deleteItem,
    resolveAlert,
    archiveAlert,
    archiveMultipleAlerts,
    deleteMultipleItems,
    getActiveAlerts,
    getActiveActivities,
    getCriticalAlerts,
    getResolvedTodayCount,
    getArchivedAlerts,
    getActivitiesByType,
  };
};
