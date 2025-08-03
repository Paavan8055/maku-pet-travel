import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    bookingId: "BOOKING123",
    status: "confirmed",
    hotelId: body.hotelId || "ACPAR419",
    guestName: body.guestName || "John Doe",
    petDetails: body.petDetails || { name: "Buddy", type: "dog" }
  });
}
