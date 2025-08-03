import { NextRequest, NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({
    booking: { id: "HTB12345", status: "CONFIRMED" }
  });
}
