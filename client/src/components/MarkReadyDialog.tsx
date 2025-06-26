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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Check, User, Clock, CheckCircle, FileText, AlertTriangle } from 'lucide-react';

interface MarkReadyDialogProps {
  delivery: any;
  onMarkReady: (data: any) => void;
}

export default function MarkReadyDialog({ delivery, onMarkReady }: MarkReadyDialogProps) {
  const [readyData, setReadyData] = useState({
    preparedBy: '',
    preparationTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    qualityCheck: false,
    packagingComplete: false,
    labelVerified: false,
    temperatureControlled: false,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMarkReady({ ...readyData, deliveryId: delivery.id });
  };

  const allChecksComplete = readyData.qualityCheck && readyData.packagingComplete && readyData.labelVerified;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-walgreens-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md">
          <Package className="w-4 h-4 mr-2" />
          Mark Ready
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
        <DialogHeader className="bg-gradient-to-r from-walgreens-red to-red-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="flex items-center text-xl">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Package className="w-6 h-6 text-white" />
            </div>
            Mark Ready for Delivery - {delivery.patient}
          </DialogTitle>
        </DialogHeader>

        {/* Delivery Summary */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
            <CardTitle className="flex items-center text-blue-800">
              <Package className="w-5 h-5 mr-2" />
              Delivery Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-semibold text-gray-700">Delivery ID:</span>
                <p className="font-mono text-purple-700 font-medium">{delivery.id}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">Patient:</span>
                <p className="font-medium text-gray-900">{delivery.patient}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-semibold text-gray-700 block mb-2">Medications:</span>
              <div className="space-y-2">
                {delivery.medications.map((med: string, index: number) => (
                  <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-walgreens-blue rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-blue-900">{med}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preparation Details */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="flex items-center text-green-800">
                <User className="w-5 h-5 mr-2" />
                Preparation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preparedBy" className="text-sm font-semibold text-gray-700">Prepared By</Label>
                  <Input
                    id="preparedBy"
                    value={readyData.preparedBy}
                    onChange={(e) => setReadyData({ ...readyData, preparedBy: e.target.value })}
                    placeholder="Enter pharmacist name"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preparationTime" className="text-sm font-semibold text-gray-700">Preparation Time</Label>
                  <Input
                    id="preparationTime"
                    type="time"
                    value={readyData.preparationTime}
                    onChange={(e) => setReadyData({ ...readyData, preparationTime: e.target.value })}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Checklist */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
              <CardTitle className="flex items-center text-purple-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                Quality Checklist
                {allChecksComplete && (
                  <div className="ml-3 flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${readyData.qualityCheck
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}>
                  <Checkbox
                    id="qualityCheck"
                    checked={readyData.qualityCheck}
                    onCheckedChange={(checked) => setReadyData({ ...readyData, qualityCheck: checked as boolean })}
                    className="border-purple-300"
                  />
                  <Label htmlFor="qualityCheck" className="font-medium text-gray-900 cursor-pointer">
                    ✅ Quality check completed
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${readyData.packagingComplete
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}>
                  <Checkbox
                    id="packagingComplete"
                    checked={readyData.packagingComplete}
                    onCheckedChange={(checked) => setReadyData({ ...readyData, packagingComplete: checked as boolean })}
                    className="border-purple-300"
                  />
                  <Label htmlFor="packagingComplete" className="font-medium text-gray-900 cursor-pointer">
                    📦 Packaging complete and secure
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${readyData.labelVerified
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}>
                  <Checkbox
                    id="labelVerified"
                    checked={readyData.labelVerified}
                    onCheckedChange={(checked) => setReadyData({ ...readyData, labelVerified: checked as boolean })}
                    className="border-purple-300"
                  />
                  <Label htmlFor="labelVerified" className="font-medium text-gray-900 cursor-pointer">
                    🏷️ Labels verified for accuracy
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${readyData.temperatureControlled
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}>
                  <Checkbox
                    id="temperatureControlled"
                    checked={readyData.temperatureControlled}
                    onCheckedChange={(checked) => setReadyData({ ...readyData, temperatureControlled: checked as boolean })}
                    className="border-purple-300"
                  />
                  <Label htmlFor="temperatureControlled" className="font-medium text-gray-900 cursor-pointer">
                    ❄️ Temperature-controlled items properly handled
                  </Label>
                </div>
              </div>

              {!allChecksComplete && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      Please complete all required quality checks before marking ready
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preparation Notes */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
              <CardTitle className="flex items-center text-orange-800">
                <FileText className="w-5 h-5 mr-2" />
                Preparation Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={readyData.notes}
                  onChange={(e) => setReadyData({ ...readyData, notes: e.target.value })}
                  placeholder="Any special notes about the preparation or handling requirements"
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                />
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
              disabled={!allChecksComplete}
            >
              <Check className="w-4 h-4 mr-2" />
              Mark Ready for Delivery
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
