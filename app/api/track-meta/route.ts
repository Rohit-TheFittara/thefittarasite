import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = "1892564474801041";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.META_CAPI_TOKEN;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "META_CAPI_TOKEN not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const eventName = body?.event_name || "Lead";
    const eventId = body?.event_id || `evt_${Date.now()}`;
    const eventSourceUrl = body?.event_source_url || "";
    const testEventCode = body?.test_event_code || null;

    const clientIp =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-client-ip") ||
      req.headers.get("cf-connecting-ip") ||
      "";
    const userAgent = req.headers.get("user-agent") || "";

    const userData = {
      client_ip_address: clientIp.split(",")[0]?.trim(),
      client_user_agent: userAgent,
      fbp: body?.fbp || undefined,
      fbc: body?.fbc || undefined,
    };

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: body?.custom_data || {},
    };

    const payload: Record<string, unknown> = {
      data: [event],
    };
    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const json = await response.json();
    return NextResponse.json(json, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error)?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
