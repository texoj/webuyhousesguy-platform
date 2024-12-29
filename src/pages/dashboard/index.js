import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    leads: [],
    conversions: [],
    performance: {}
  });

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          
          {/* Overview Cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Leads
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {metrics.performance.totalLeads || 0}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Conversion Rate
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {(metrics.performance.conversionRate || 0).toFixed(1)}%
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Cities
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {metrics.performance.activeCities || 0}
                </dd>
              </div>
            </div>
          </div>

          {/* Lead Trend Chart */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">Lead Trends</h2>
            <div className="mt-4" style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.leads}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* City Performance */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">City Performance</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Object.entries(metrics.performance.byCity || {}).map(([city, data]) => (
                <div key={city} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{city}</h3>
                  <dl className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Leads</dt>
                      <dd className="text-lg font-medium">{data.leads}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Conversion Rate</dt>
                      <dd className="text-lg font-medium">
                        {data.conversionRate.toFixed(1)}%
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}