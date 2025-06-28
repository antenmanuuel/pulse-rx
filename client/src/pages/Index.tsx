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
      <div className="space-y-8">
        {/* Essential Pharmacy Metrics */}
        <DashboardStats />

        {/* Main Workflow Section */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Primary Workflow - Prescription Queue */}
          <div className="xl:col-span-8">
            <PrescriptionQueue />
          </div>

          {/* Secondary Workflow - Actions & Activity */}
          <div className="xl:col-span-4 space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Index;
