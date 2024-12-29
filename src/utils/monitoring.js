import pino from 'pino';

class MonitoringSystem {
  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty'
      }
    });

    this.metrics = {
      pageViews: new Map(),
      errors: new Map(),
      performance: new Map()
    };
  }

  trackPageView(path) {
    const count = this.metrics.pageViews.get(path) || 0;
    this.metrics.pageViews.set(path, count + 1);
    this.logger.info({ type: 'pageview', path });
  }

  trackError(error, context = {}) {
    const errorKey = `${error.name}:${error.message}`;
    const count = this.metrics.errors.get(errorKey) || 0;
    this.metrics.errors.set(errorKey, count + 1);

    this.logger.error({
      type: 'error',
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context
    });
  }

  trackPerformance(metric) {
    const { name, value, path } = metric;
    const key = `${path}:${name}`;
    
    if (!this.metrics.performance.has(key)) {
      this.metrics.performance.set(key, {
        count: 0,
        total: 0,
        min: value,
        max: value
      });
    }

    const stats = this.metrics.performance.get(key);
    stats.count += 1;
    stats.total += value;
    stats.min = Math.min(stats.min, value);
    stats.max = Math.max(stats.max, value);

    this.logger.info({ type: 'performance', metric });
  }

  getMetrics() {
    return {
      pageViews: Object.fromEntries(this.metrics.pageViews),
      errors: Object.fromEntries(this.metrics.errors),
      performance: Object.fromEntries(this.metrics.performance)
    };
  }

  clearMetrics() {
    this.metrics.pageViews.clear();
    this.metrics.errors.clear();
    this.metrics.performance.clear();
  }
}

export const monitor = new MonitoringSystem();