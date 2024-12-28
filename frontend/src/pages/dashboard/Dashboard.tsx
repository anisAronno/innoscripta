import React from 'react';
import PreferencesManager from '../PreferencesManager';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <PreferencesManager />
    </div>
  );
};

export default Dashboard;
