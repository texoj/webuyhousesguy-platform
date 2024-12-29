const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require('../lighthouse.config.js');

async function runPerformanceTest() {
  const chrome = await chromeLauncher.launch();
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
    onlyCategories: ['performance']
  };

  try {
    const urls = [
      'http://localhost:3000',
      'http://localhost:3000/dallas',
      'http://localhost:3000/houston'
    ];

    for (const url of urls) {
      console.log(`Testing ${url}...`);
      const result = await lighthouse(url, options);
      
      // Check performance score
      const score = result.lhr.categories.performance.score * 100;
      console.log(`Performance score: ${score}`);
      
      if (score < 90) {
        throw new Error(`Performance score too low: ${score}`);
      }
    }

    return 0;
  } catch (error) {
    console.error('Performance test failed:', error);
    return 1;
  } finally {
    await chrome.kill();
  }
}

runPerformanceTest();