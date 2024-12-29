import nodemailer from 'nodemailer';

class NotificationSystem {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendLeadNotification(leadData) {
    const html = `
      <h2>New Lead Notification</h2>
      <p><strong>Name:</strong> ${leadData.name}</p>
      <p><strong>Phone:</strong> ${leadData.phone}</p>
      <p><strong>Address:</strong> ${leadData.address}</p>
      <p><strong>City:</strong> ${leadData.city}</p>
      <p><strong>Source:</strong> ${leadData.source}</p>
    `;

    await this.transporter.sendMail({
      from: process.env.NOTIFICATION_FROM,
      to: process.env.NOTIFICATION_TO,
      subject: `New Lead: ${leadData.name} - ${leadData.city}`,
      html
    });
  }

  async sendDailyReport(metrics) {
    const html = `
      <h2>Daily Performance Report</h2>
      <h3>Overview</h3>
      <ul>
        <li>Total Leads: ${metrics.totalLeads}</li>
        <li>Conversion Rate: ${metrics.conversionRate}%</li>
        <li>Top Performing City: ${metrics.topCity}</li>
      </ul>
    `;

    await this.transporter.sendMail({
      from: process.env.NOTIFICATION_FROM,
      to: process.env.NOTIFICATION_TO,
      subject: 'Daily Performance Report',
      html
    });
  }
}

export const notifier = new NotificationSystem();