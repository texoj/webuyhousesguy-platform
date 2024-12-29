const axios = require('axios');
const chalk = require('chalk');

async function verifyFunctionality() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const tests = [
    // Homepage test
    async () => {
      console.log(chalk.blue('Testing Homepage...'));
      const response = await axios.get(baseUrl);
      if (response.status !== 200) throw new Error('Homepage not accessible');
      console.log(chalk.green('✓ Homepage accessible'));
    },

    // City pages test
    async () => {
      console.log(chalk.blue('Testing City Pages...'));
      const cities = ['dallas', 'houston', 'austin'];
      for (const city of cities) {
        const response = await axios.get(`${baseUrl}/${city}`);
        if (response.status !== 200) throw new Error(`${city} page not accessible`);
      }
      console.log(chalk.green('✓ City pages accessible'));
    },

    // Lead form test
    async () => {
      console.log(chalk.blue('Testing Lead Form...'));
      const testLead = {
        name: 'Test User',
        phone: '555-555-5555',
        address: '123 Test St',
        city: 'Dallas'
      };
      const response = await axios.post(`${baseUrl}/api/leads`, testLead);
      if (response.status !== 200) throw new Error('Lead form submission failed');
      console.log(chalk.green('✓ Lead form working'));
    },

    // Dashboard test
    async () => {
      console.log(chalk.blue('Testing Dashboard...'));
      const response = await axios.get(`${baseUrl}/dashboard`);
      if (response.status !== 200) throw new Error('Dashboard not accessible');
      console.log(chalk.green('✓ Dashboard accessible'));
    },

    // Analytics test
    async () => {
      console.log(chalk.blue('Testing Analytics...'));
      const response = await axios.get(`${baseUrl}/api/metrics`);
      if (response.status !== 200) throw new Error('Analytics not working');
      console.log(chalk.green('✓ Analytics working'));
    }
  ];

  try {
    for (const test of tests) {
      await test();
    }
    console.log(chalk.green.bold('\n✓ All functionality tests passed!'));
  } catch (error) {
    console.error(chalk.red(`\n✗ Test failed: ${error.message}`));
    process.exit(1);
  }
}

verifyFunctionality();