export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, address } = req.body;

    // Validate required fields
    if (!name || !phone || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // TODO: Add your lead processing logic here
    // For testing, we'll just log the lead
    console.log('New lead:', { name, phone, address });

    // Return success
    return res.status(200).json({ message: 'Lead received successfully' });
  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}