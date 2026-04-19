import { Resend } from 'resend';

// Helper to safely get the Resend instance
const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("⚠️  RESEND_API_KEY is missing. Email features will be disabled.");
    return null;
  }
  return new Resend(key);
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  const resend = getResend();

  if (!resend) {
    console.error("❌ Cannot send email: Resend is not configured.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Recruitt <notifications@recruitt.yvesdc.site>',
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error };
  }
};
