import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const token = data.get("cf-turnstile-response");
    const name = data.get("Name");
    const phone = data.get("Phone");
    const pincode = data.get("Pincode");
    const billAmount = data.get("BillAmount");

    // Basic Validation
    if (!name || !phone || !pincode || !billAmount) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Turnstile Validation
    if (!token) {
      return NextResponse.json(
        { error: "Turnstile token is required." },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Fallback to test key if not set

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token.toString())}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error("Turnstile verification failed:", verifyData);
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Forward to Google Sheets Webhook
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    
    if (!sheetsWebhookUrl) {
      console.warn("Google Sheets URL not configured in environment variables.");
      // If no webhook URL is configured, simulate success for testing purposes
      return NextResponse.json({ success: true, simulated: true });
    }

    // Forward the original formData to Google Sheets (excluding the turnstile token)
    const forwardData = new FormData();
    forwardData.append("Name", name as string);
    forwardData.append("Phone", phone as string);
    forwardData.append("Pincode", pincode as string);
    forwardData.append("BillAmount", billAmount as string);

    const sheetsResponse = await fetch(sheetsWebhookUrl, {
      method: "POST",
      body: forwardData,
    });

    if (!sheetsResponse.ok) {
      throw new Error(`Google Sheets responded with status: ${sheetsResponse.status}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
