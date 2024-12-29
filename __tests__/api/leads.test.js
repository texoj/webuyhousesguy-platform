import { createMocks } from 'node-mocks-http';
import handleLead from '../../src/pages/api/leads';

describe('Leads API', () => {
  it('creates a new lead successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        phone: '555-555-5555',
        address: '123 Test St',
        city: 'Dallas'
      }
    });

    await handleLead(req, res);

    expect(res._getStatusCode()).toBe(200);
    const response = JSON.parse(res._getData());
    expect(response.message).toBe('Lead received successfully');
  });
});