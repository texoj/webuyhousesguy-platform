import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendLeadNotification(lead) {
  const emailContent = `
    New Lead Received!
    
    Name: ${lead.name}
    Phone: ${lead.phone}
    Address: ${lead.address}
    City: ${lead.city}
    Source: ${lead.source}
    Timestamp: ${new Date().toLocaleString()}
  `;

  try {
    await transporter.sendMail({
      from: process.env.NOTIFICATION_FROM,
      to: process.env.NOTIFICATION_TO,
      subject: `New Lead: ${lead.city} - ${lead.name}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    });

    console.log('Lead notification sent successfully');
  } catch (error) {
    console.error('Error sending lead notification:', error);
  }
}

export async function sendDailyReport(metrics) {
  const reportContent = `
    Daily Performance Report
    
    Total Leads Today: ${metrics.dailyLeads}
    Conversion Rate: ${metrics.conversionRate}%
    Average Response Time: ${metrics.avgResponseTime}min
    
    Top Performing Cities:
    ${metrics.topCities.map(city => `${city.name}: ${city.leads} leads`).join('\n')}
    
    Recent Activity:
    ${metrics.recentActivity.map(activity => `- ${activity.description}`).join('\n')}
  `;

  try {
    await transporter.sendMail({
      from: process.env.NOTIFICATION_FROM,
      to: process.env.REPORT_RECIPIENTS,
      subject: `Daily Performance Report - ${new Date().toLocaleDateString()}`,
      text: reportContent,
      html: reportContent.replace(/\n/g, '<br>')
    });

    console.log('Daily report sent successfully');
  } catch (error) {
    console.error('Error sending daily report:', error);
  }
}