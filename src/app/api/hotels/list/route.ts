
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hotelData = {
    meta: { count: 1, source: "amadeus_enhanced" },
    data: [{
      hotelId: "ACPAR419",
      name: "LE NOTRE DAME",
      address: { cityName: "PARIS", countryCode: "FR" },
      petFriendly: true,
      rating: 4.2
    }]
  };
  return NextResponse.json(hotelData);
}

