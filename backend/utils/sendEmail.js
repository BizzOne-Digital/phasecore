const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendContactNotification = async (contact) => {
  const serviceLabels = {
    cybersecurity: 'Cybersecurity, Risk & Compliance',
    'it-digital': 'IT & Digital Solutions',
    'management-professional': 'Management & Professional Services',
    healthcare: 'Healthcare Technology & Compliance',
    'workforce-training': 'Workforce, Training & Administrative Support',
    facilities: 'Facilities & Operational Services',
    other: 'Other / General Inquiry',
  };

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission — ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1f2e; padding: 24px; border-bottom: 3px solid #C9962C;">
          <h2 style="color: #C9962C; margin: 0;">PhaseCore — New Inquiry</h2>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${contact.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${contact.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Organization:</strong></td><td style="padding: 8px 0;">${contact.organization || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td><td style="padding: 8px 0;">${serviceLabels[contact.service] || contact.service}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <strong style="color: #666;">Message:</strong>
            <div style="background: #fff; border-left: 3px solid #C9962C; padding: 16px; margin-top: 8px; border-radius: 4px;">
              ${contact.message}
            </div>
          </div>
          <div style="margin-top: 24px; font-size: 12px; color: #999;">
            Submitted: ${new Date(contact.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
          </div>
        </div>
      </div>
    `,
  });
  console.log(`[email] Notification sent to ${process.env.ADMIN_EMAIL} — messageId: ${info.messageId}`);
};

const sendAutoReply = async (contact) => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: contact.email,
    subject: 'We received your message — PhaseCore Consulting LLC',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1f2e; padding: 24px; border-bottom: 3px solid #C9962C;">
          <h2 style="color: #C9962C; margin: 0;">PhaseCore Consulting LLC</h2>
          <p style="color: #ccc; margin: 8px 0 0;">Integrity. Security. Performance.</p>
        </div>
        <div style="padding: 32px; background: #fff;">
          <p style="color: #333; font-size: 16px;">Dear ${contact.name},</p>
          <p style="color: #555; line-height: 1.6;">
            Thank you for reaching out to PhaseCore Consulting LLC. We have received your inquiry and a member of our team will review your message and respond within <strong>1–2 business days</strong>.
          </p>
          <p style="color: #555; line-height: 1.6;">
            If your matter is urgent, please contact us directly at <a href="mailto:contracts@phasecoreconsulting.com" style="color: #C9962C;">contracts@phasecoreconsulting.com</a>.
          </p>
          <div style="background: #f5f5f5; border-left: 3px solid #C9962C; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <p style="margin: 0; color: #333; font-size: 14px;"><strong>Your message summary:</strong></p>
            <p style="margin: 8px 0 0; color: #555; font-size: 14px;">${contact.message.substring(0, 200)}${contact.message.length > 200 ? '...' : ''}</p>
          </div>
          <p style="color: #555; line-height: 1.6;">We appreciate your interest in our services.</p>
          <p style="color: #333;"><strong>PhaseCore Consulting LLC</strong><br>
          <span style="color: #C9962C;">Strategy. Technology. Execution.</span></p>
        </div>
        <div style="background: #1a1f2e; padding: 16px; text-align: center;">
          <p style="color: #888; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} PhaseCore Consulting LLC. All rights reserved.</p>
        </div>
      </div>
    `,
  });
  console.log(`[email] Auto-reply sent to ${contact.email} — messageId: ${info.messageId}`);
};

module.exports = { sendContactNotification, sendAutoReply };
