const http = require('http');
const logger = require('../src/utils/logger').default;

const ENDPOINTS = [
  { url: '/', name: 'Home Page' },
  { url: '/api/leads', name: 'Leads API' },
];

async function checkEndpoint(endpoint) {
  try {
    const startTime = Date.now();
    const response = await fetch(`${process.env.BASE_URL}${endpoint.url}`);
    const duration = Date.now() - startTime;

    logger.info({
      endpoint: endpoint.name,
      status: response.status,
      duration,
      timestamp: new Date().toISOString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    logger.error({
      endpoint: endpoint.name,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

function startMonitoring() {
  setInterval(() => {
    ENDPOINTS.forEach(checkEndpoint);
  }, 5 * 60 * 1000); // Check every 5 minutes
}

startMonitoring();