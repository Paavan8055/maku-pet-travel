import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    data: {
      hotelId: "TELONMFS",
      overallRating: 81,
      sentiments: {
        staff: 80,
        location: 89,
        service: 80,
        roomComforts: 87,
        valueForMoney: 75
      }
    }
  });
}
