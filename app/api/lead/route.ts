import { NextResponse } from "next/server";

export async function GET() {
  // Simple health check
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const phone = formData.get("phone");
  const boutique = formData.get("boutique");
  const city = formData.get("city");
  const note = formData.get("note");

  console.log("New PurpleSeam lead:", {
    name,
    phone,
    boutique,
    city,
    note,
  });

//   return NextResponse.json({
//     success: true,
//     message: "Lead received. We will contact you soon.",
//   });
// After processing, redirect to thank-you page
  const redirectUrl = new URL("/thank-you", request.url);
  return NextResponse.redirect(redirectUrl);
}
