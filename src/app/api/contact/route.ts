import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    
    // Extract form fields
    const name = data.get("Name")?.toString();
    const phone = data.get("Phone")?.toString();
    const email = data.get("Email")?.toString();
    const address = data.get("Address")?.toString();
    const topic = data.get("Topic")?.toString();
    const message = data.get("Message")?.toString();

    // Basic Validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, Phone, and Email are required fields." },
        { status: 400 }
      );
    }

    // SMTP Configuration
    const smtpEmail = process.env.EMAIL_USER;
    const smtpPassword = process.env.EMAIL_PASS;

    if (!smtpEmail || !smtpPassword) {
      console.error("SMTP credentials not configured in .env.local");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter for GoDaddy SMTP
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // 1. Email to the Business (Indian Solar Green Energy)
    const mailToBusiness = {
      from: `"Indian Solar Green Energy" <${smtpEmail}>`,
      to: smtpEmail, // Send to yourself
      replyTo: email,
      subject: `New Website Lead: ${topic || "General Inquiry"} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1b3022;">New Lead Received!</h2>
          <p>You have received a new message from the contact form on your website.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Name:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Phone:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${phone}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Address:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${address || "N/A"}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Topic:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${topic || "N/A"}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Message:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${message || "No message provided."}</td></tr>
          </table>
        </div>
      `,
    };

    // 2. Email to the Customer (Auto-reply)
    const mailToCustomer = {
      from: `"Indian Solar Green Energy" <${smtpEmail}>`,
      to: email,
      subject: "We received your inquiry! - Indian Solar Green Energy",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaec; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #18291c; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Indian Solar Green Energy</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #2A2A2A; margin-top: 0;">Hello ${name},</h2>
            <p>Thank you for reaching out to <strong>Indian Solar Green Energy</strong>! We have successfully received your inquiry regarding <em>${topic || "our services"}</em>.</p>
            <p>Our solar experts are reviewing your details and will get back to you shortly at <strong>${phone}</strong>.</p>
            <p style="background-color: #f4f8f5; padding: 15px; border-left: 4px solid #4a7a53; border-radius: 4px; margin: 25px 0;">
              <strong>Why Choose Us?</strong><br/>
              We are dedicated to providing the highest quality solar installations to help you reduce electricity bills and power a greener future.
            </p>
            <p>If you have any urgent questions, feel free to reply directly to this email or call us at <strong>+91 9918450324</strong>.</p>
            <br/>
            <p style="margin-bottom: 0;">Best Regards,</p>
            <p style="font-weight: bold; margin-top: 5px;">The Team at Indian Solar Green Energy</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #eaeaec; font-size: 12px; color: #888;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Indian Solar Green Energy. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send emails simultaneously
    await Promise.all([
      transporter.sendMail(mailToBusiness),
      transporter.sendMail(mailToCustomer)
    ]);

    // Forward to Google Sheets Webhook
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    
    if (sheetsWebhookUrl) {
      const forwardData = new FormData();
      forwardData.append("Name", name as string);
      forwardData.append("Phone", phone as string);
      forwardData.append("Email", email as string);
      forwardData.append("Address", (address as string) || "");
      forwardData.append("Topic", (topic as string) || "");
      forwardData.append("Message", (message as string) || "No message");

      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          body: forwardData,
        });
      } catch (sheetsError) {
        console.error("Failed to forward contact to Google Sheets:", sheetsError);
        // We don't throw here because emails were sent successfully
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
