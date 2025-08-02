"use server";

import { Resend } from "resend";

export default async function sendEmail({ to, subject, react }) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY not found in environment");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const resend = new Resend(resendApiKey);

  try {
    const data = await resend.emails.send({
      from: "Quickdesk <onboarding@resend.dev>", // Must be a verified domain in Resend
      to,
      subject,
      react,
    });

    console.log("✅ Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred while sending email",
    };
  }
}
