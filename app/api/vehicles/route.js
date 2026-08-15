import { NextResponse } from "next/server";
import { getVehicles } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let data = await getVehicles();

  if (category && category !== "All") {
    data = data.filter((v) => v.category === category);
  }

  if (q) {
    data = data.filter((v) => v.name.toLowerCase().includes(q));
  }

  return NextResponse.json({ vehicles: data });
}
