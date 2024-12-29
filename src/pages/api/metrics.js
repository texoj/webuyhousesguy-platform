import { leadTracker } from '../../utils/leadTracking';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    const metrics = leadTracker.getAnalytics(startDate, endDate);

    return res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}