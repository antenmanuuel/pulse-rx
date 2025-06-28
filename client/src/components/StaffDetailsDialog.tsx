import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Briefcase,
  Calendar,
  Clock,
  Activity,
  Star,
  GraduationCap,
  Edit
} from 'lucide-react';
import { StaffMember } from '@/data/staffData';

interface StaffDetailsDialogProps {
  staff: StaffMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (staff: StaffMember) => void;
  getStatusColor: (status: string) => string;
  getPerformanceColor: (score: number) => string;
}

const StaffDetailsDialog = ({
  staff,
  open,
  onOpenChange,
  onEdit,
  getStatusColor,
  getPerformanceColor
}: StaffDetailsDialogProps) => {
  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Staff Member Details</DialogTitle>
          <DialogDescription>
            Complete information for staff member
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-20 h-20">
              <AvatarImage src={staff.avatar || undefined} alt={`${staff.firstName} ${staff.lastName}`} />
              <AvatarFallback className="bg-walgreens-red text-white text-xl">
                {staff.firstName[0]}{staff.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {staff.firstName} {staff.lastName}
              </h3>
              <p className="text-lg text-gray-600">{staff.role}</p>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className={getStatusColor(staff.status)}>
                  {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">ID: {staff.id}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className={`text-lg font-semibold ${getPerformanceColor(staff.performance)}`}>
                  {staff.performance}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Performance Score</p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{staff.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{staff.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    <p className="font-medium">{staff.emergencyContact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{staff.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Hire Date</p>
                    <p className="font-medium">{staff.hireDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Schedule</p>
                    <p className="font-medium">{staff.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Last Login</p>
                    <p className="font-medium">{staff.lastLogin}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Certifications & Qualifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {staff.certifications.map((cert: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => {
              onOpenChange(false);
              onEdit(staff);
            }} className="bg-walgreens-red hover:bg-red-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff Member
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDetailsDialog;