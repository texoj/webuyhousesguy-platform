import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get total leads
    const totalLeads = await prisma.lead.count();

    // Get conversion rate
    const convertedLeads = await prisma.lead.count({
      where: { status: 'converted' }
    });
    const conversionRate = (convertedLeads / totalLeads * 100).toFixed(1);

    // Get average response time
    const leads = await prisma.lead.findMany({
      select: {
        createdAt: true,
        firstResponseAt: true
      },
      where: {
        firstResponseAt: { not: null }
      }
    });
    
    const avgResponseTime = leads.reduce((acc, lead) => {
      const diff = lead.firstResponseAt - lead.createdAt;
      return acc + diff;
    }, 0) / leads.length;

    // Get leads by city
    const leadsByCity = await prisma.lead.groupBy({
      by: ['city'],
      _count: true
    });

    // Get recent activity
    const recentActivity = await prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      totalLeads,
      conversionRate,
      avgResponseTime,
      leadsByCity,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}