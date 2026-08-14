import { NextResponse } from "next/server";
import { getEducationNews } from "@/lib/news";

export const revalidate = 300; // 5 minutes ISR-style caching on the route

export async function GET() {
  try {
    const data = await getEducationNews();
    return NextResponse.json(
      {
        ok: true,
        ...data,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load news";
    return NextResponse.json(
      { ok: false, error: message, items: [], updatedAt: new Date().toISOString(), sources: [] },
      { status: 502 },
    );
  }
}
