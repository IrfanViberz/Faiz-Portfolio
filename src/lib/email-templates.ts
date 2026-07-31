import type { ContactFormData } from '@/types';

export function getOwnerEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Inquiry</title>
</head>
<body style="font-family: 'Courier New', monospace; background: #09090B; color: #F4F4F5; padding: 32px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; border: 1px solid #27272A; border-radius: 8px; overflow: hidden;">
    <div style="background: #18181B; padding: 20px 24px; border-bottom: 1px solid #27272A;">
      <p style="margin: 0; font-size: 11px; color: #71717A; text-transform: uppercase; letter-spacing: 0.1em;">NEW TRANSMISSION RECEIVED</p>
      <p style="margin: 6px 0 0; font-size: 18px; font-weight: 500; color: #F4F4F5;">Portfolio Inquiry</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 100px;">From</td>
          <td style="padding: 10px 0; color: #F4F4F5; font-size: 14px;">${data.name}</td>
        </tr>
        <tr style="border-top: 1px solid #27272A;">
          <td style="padding: 10px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
          <td style="padding: 10px 0; color: #10B981; font-size: 14px;"><a href="mailto:${data.email}" style="color: #10B981;">${data.email}</a></td>
        </tr>
        <tr style="border-top: 1px solid #27272A;">
          <td style="padding: 10px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; color: #F4F4F5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</td>
        </tr>
      </table>
    </div>
    <div style="background: #18181B; padding: 16px 24px; border-top: 1px solid #27272A;">
      <p style="margin: 0; font-size: 11px; color: #52525B;">Received from faiz-portfolio · Reply directly to ${data.email}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getConfirmationEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Message Received</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background: #FAFAFA; color: #09090B; padding: 32px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; border: 1px solid #E4E4E7; border-radius: 8px; overflow: hidden;">
    <div style="background: #F4F4F5; padding: 20px 24px; border-bottom: 1px solid #E4E4E7;">
      <p style="margin: 0; font-size: 11px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Courier New', monospace;">TRANSMISSION CONFIRMED</p>
      <p style="margin: 6px 0 0; font-size: 18px; font-weight: 500; color: #09090B;">Message Received</p>
    </div>
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #52525B;">Hi <strong style="color: #09090B;">${data.name}</strong>,</p>
      <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #52525B;">
        Your message has been received and routed to my inbox. I typically respond within <strong style="color: #09090B;">24–48 hours</strong> for email inquiries.
      </p>
      <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #52525B;">
        For immediate response, reach me on <a href="https://wa.me/601156329034" style="color: #059669;">WhatsApp</a>.
      </p>
      <div style="margin: 24px 0; padding: 16px; background: #F4F4F5; border-radius: 6px; border-left: 3px solid #09090B;">
        <p style="margin: 0 0 6px; font-size: 11px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', monospace;">Your message</p>
        <p style="margin: 0; font-size: 13px; color: #52525B; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #52525B;">— Faiz Irfan</p>
    </div>
    <div style="background: #F4F4F5; padding: 16px 24px; border-top: 1px solid #E4E4E7;">
      <p style="margin: 0; font-size: 11px; color: #A1A1AA; font-family: 'Courier New', monospace;">faiz_irfan/portfolio · Engineered for Scale & Business ROI.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
