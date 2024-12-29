import React, { useState, useEffect } from 'react';
import { LineChart, BarChart } from 'recharts';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    leads: [],
    conversions: [],
    cityStats: {}
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Performance Dashboard</h1>
      
      {/* Lead Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Leads</h3>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.leads.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-green-600">
            {((metrics.conversions.length / metrics.leads.length) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Cities</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Object.keys(metrics.cityStats).length}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Lead Trends</h3>
          <LineChart data={metrics.leads} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">City Performance</h3>
          <BarChart data={Object.entries(metrics.cityStats)} />
        </div>
      </div>
    </div>
  );
}