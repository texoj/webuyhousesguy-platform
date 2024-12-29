import { sendLeadNotification } from '@/utils/notifications';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const lead = req.body;
    
    // Process the lead
    await sendLeadNotification(lead);

    res.status(200).json({ message: 'Lead notification sent successfully' });
  } catch (error) {
    console.error('Error processing lead webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}