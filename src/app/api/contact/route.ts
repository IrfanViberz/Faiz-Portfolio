import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { getOwnerEmailHtml, getConfirmationEmailHtml } from '@/lib/email-templates';
import { OWNER_EMAIL } from '@/lib/data';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function POST(request: NextRequest) {
  const transporter = createTransporter();

  if (!transporter) {
    return NextResponse.json(
      {
        success: false,
        error: 'Email service is not configured. Please contact me directly.',
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Send notification email to owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — Portfolio`,
      html: getOwnerEmailHtml(data),
    });

    // Send auto-reply confirmation to visitor (non-blocking)
    transporter
      .sendMail({
        from: `"Faiz Irfan" <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: 'Message received — faiz_irfan/portfolio',
        html: getConfirmationEmailHtml(data),
      })
      .catch((err) => console.error('Confirmation email error:', err));

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
