export const dynamic = "force-dynamic";

import { getRepresentativesByZip } from '@/lib/representatives-data';

export async function GET(req) {
  const url = new URL(req.url);
  const zip = url.searchParams.get("zip")?.trim();
  const data = getRepresentativesByZip(zip || "");

  if (data.error) {
    return Response.json({ error: data.error }, { status: 400 });
  }

  return Response.json(data);
}