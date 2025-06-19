
import React from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import PrescriptionQueue from '@/components/PrescriptionQueue';
import RecentActivity from '@/components/RecentActivity';
import QuickActions from '@/components/QuickActions';

const Index = () => {
  return (
    <Layout title="Dashboard Overview" subtitle="Welcome back, Sarah. Here's what's happening at your pharmacy today.">
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PrescriptionQueue />
        </div>
        
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
