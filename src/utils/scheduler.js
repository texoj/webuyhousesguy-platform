import cron from 'node-cron';
import { notifier } from './notifications';
import { leadTracker } from './leadTracking';

class Scheduler {
  constructor() {
    this.initializeSchedules();
  }

  initializeSchedules() {
    // Daily report at 9 AM
    cron.schedule('0 9 * * *', async () => {
      const metrics = await leadTracker.getAnalytics(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date()
      );
      await notifier.sendDailyReport(metrics);
    });

    // Hourly health check
    cron.schedule('0 * * * *', async () => {
      await this.performHealthCheck();
    });
  }

  async performHealthCheck() {
    try {
      // Check API health
      const apiHealth = await fetch(process.env.NEXT_PUBLIC_API_URL + '/health');
      if (!apiHealth.ok) {
        await notifier.sendAlertNotification({
          type: 'API_HEALTH_CHECK_FAILED',
          message: 'API health check failed',
          details: await apiHealth.text()
        });
      }

      // Check lead processing
      const leadStats = await leadTracker.getRecentStats();
      if (leadStats.failureRate > 0.1) { // Alert if >10% failure rate
        await notifier.sendAlertNotification({
          type: 'HIGH_LEAD_FAILURE_RATE',
          message: 'Lead processing failure rate is high',
          details: leadStats
        });
      }
    } catch (error) {
      await notifier.sendAlertNotification({
        type: 'HEALTH_CHECK_ERROR',
        message: 'Error performing health check',
        details: error.message
      });
    }
  }
}

export const scheduler = new Scheduler();