import React from 'react';
import Layout from '@/components/Layout';
import PrescriptionQueue from '@/components/PrescriptionQueue';
import RecentActivity from '@/components/RecentActivity';
import QuickActions from '@/components/QuickActions';

const Index = () => {
  return (
    <Layout
      title="Dashboard Overview"
      subtitle="Welcome back, Sarah. Here's what's happening at your pharmacy today."
    >
      <div className="space-y-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Content - Prescription Queue */}
          <div className="lg:col-span-2">
            <PrescriptionQueue />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
