import React from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import PrescriptionQueue from '@/components/PrescriptionQueue';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';

const Index = () => {
  return (
    <Layout
      title="PulseRx Dashboard"
      subtitle="Modern pharmacy management and workflow system"
    >
      <div className="space-y-6">
        {/* Compact Stats Overview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">System Overview</h2>
              <p className="text-sm text-gray-600">Real-time pharmacy metrics</p>
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          <DashboardStats />
        </section>

        {/* Main Workflow Section - Improved Grid Layout */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Primary Workflow - Prescription Queue */}
          <div className="xl:col-span-7">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Active Prescriptions</h2>
              <p className="text-sm text-gray-600">Current prescription queue</p>
            </div>
            <PrescriptionQueue />
          </div>

          {/* Secondary Workflow - Actions & Activity */}
          <div className="xl:col-span-5 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <QuickActions />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <RecentActivity />
            </div>
          </div>
        </section>

        {/* Simple Status Summary */}
        <section className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Pharmacy Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-lg font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Prescriptions</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-lg font-bold text-purple-600">8</div>
                <div className="text-xs text-gray-600">Appointments</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-lg font-bold text-green-600">5</div>
                <div className="text-xs text-gray-600">Deliveries</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-lg font-bold text-red-600">3</div>
                <div className="text-xs text-gray-600">Alerts</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
