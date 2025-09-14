import { NextRequest, NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/utils";
import playwright from "playwright";

export async function POST(req: NextRequest) {
  try {
    const { url, width, height } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: width || 1280, height: height || 720 },
    });

    await page.goto(normalizeUrl(url), { waitUntil: "networkidle" });

    const screenshotBuffer = await page.screenshot({ type: "png", fullPage: true });
    await browser.close();

    return new NextResponse(screenshotBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=screenshot.png",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to take screenshot" }, { status: 500 });
  }
}
