const PIXEL_ID = "1892564474801041";

module.exports = async function (context, req) {
  try {
    const token = process.env.META_CAPI_TOKEN;
    if (!token) {
      context.res = {
        status: 500,
        body: { ok: false, error: "META_CAPI_TOKEN not configured." },
      };
      return;
    }

    const body = req.body || {};
    const eventName = body.event_name || "Lead";
    const eventId = body.event_id || `evt_${Date.now()}`;
    const eventSourceUrl = body.event_source_url || "";
    const testEventCode = body.test_event_code || null;

    const clientIp =
      req.headers["x-forwarded-for"] ||
      req.headers["x-client-ip"] ||
      req.headers["cf-connecting-ip"] ||
      "";
    const userAgent = req.headers["user-agent"] || "";

    const userData = {
      client_ip_address: Array.isArray(clientIp)
        ? clientIp[0]
        : String(clientIp).split(",")[0].trim(),
      client_user_agent: userAgent,
      fbp: body.fbp || undefined,
      fbc: body.fbc || undefined,
    };

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: body.custom_data || {},
    };

    const payload = {
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
    context.res = {
      status: response.status,
      body: json,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { ok: false, error: error?.message || "Unknown error" },
    };
  }
};
