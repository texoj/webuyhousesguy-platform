import logger from './logger';

export class ErrorHandler {
  static async handleError(error, req = null) {
    logger.error({
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      request: req ? {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
      } : null,
      timestamp: new Date().toISOString()
    });

    // Add monitoring service notification here if needed
    if (process.env.NODE_ENV === 'production') {
      // Example: notify monitoring service
      try {
        await notifyMonitoringService(error);
      } catch (notifyError) {
        logger.error('Failed to notify monitoring service:', notifyError);
      }
    }
  }
}

async function notifyMonitoringService(error) {
  // Implement your monitoring service integration
  // Example: Sentry, LogRocket, etc.
  if (process.env.SENTRY_DSN) {
    // Sentry integration
  }
}