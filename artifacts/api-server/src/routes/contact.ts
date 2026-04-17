import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, date, type, venue, details } = req.body as {
    name?: string;
    email?: string;
    date?: string;
    type?: string;
    venue?: string;
    details?: string;
  };

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required." });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  const contactTo = process.env["CONTACT_TO"] ?? "info@mcbanduk.co.uk";

  if (!apiKey) {
    res.status(503).json({ error: "Email service not configured." });
    return;
  }

  const resend = new Resend(apiKey);

  const subject = `Booking Enquiry — ${type ?? "Event"}${date ? ` on ${date}` : ""}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
        New Booking Enquiry — Midnight Culture
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Name</td><td style="padding: 8px;">${name}</td></tr>
        <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Event Date</td><td style="padding: 8px;">${date ?? "Not specified"}</td></tr>
        <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">Event Type</td><td style="padding: 8px;">${type ?? "Not specified"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Venue</td><td style="padding: 8px;">${venue ?? "Not specified"}</td></tr>
      </table>
      ${details ? `<div style="margin: 16px 0;"><h3 style="color: #1a1a2e;">Additional Details</h3><p style="background: #f5f5f5; padding: 12px; border-left: 4px solid #2563eb;">${details.replace(/\n/g, "<br>")}</p></div>` : ""}
      <p style="color: #666; font-size: 12px; margin-top: 24px;">Reply directly to this email to respond to ${name}.</p>
    </div>
  `;

  try {
    const fromAddress = process.env["RESEND_FROM"] ?? "Midnight Culture <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [contactTo],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      res.status(500).json({ error: "Failed to send email. Please try again." });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
