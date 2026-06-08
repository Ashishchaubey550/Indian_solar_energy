import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pin = req.nextUrl.searchParams.get("pin");

  if (!pin || !/^\d{6}$/.test(pin)) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 86400 }, // cache for 24 h
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }

    const data = await res.json();

    if (
      !data ||
      data[0]?.Status !== "Success" ||
      !data[0]?.PostOffice?.length
    ) {
      return NextResponse.json({ error: "PIN not found" }, { status: 404 });
    }

    const po = data[0].PostOffice[0];
    return NextResponse.json({
      district: po.District,
      state: po.State,
      label: `${po.Name}, ${po.District} (${po.State})`,
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
