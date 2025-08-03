import { NextRequest, NextResponse } from 'next/server';
import { makeHotelBedsRequest, HotelBedsHotel } from '@/lib/hotelbeds-auth';

// Helper function to get formatted future date
function getFormattedFutureDate(daysInFuture: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

interface HotelBedsHotelsResponse {
  hotels: {
    checkIn: string;
    checkOut: string;
    total: number;
    currency: string;
    hotels: Array<{
      code: string;
      name: string;
      categoryCode: string;
      categoryName: string;
      destinationCode: string;
      zoneCode: number;
      latitude: string;
      longitude: string;
      rooms: Array<{
        code: string;
        name: string;
        rates: Array<{
          rateKey: string;
          rateClass: string;
          rateType: string;
          net: number;
          discount: number;
          discountPCT: number;
          sellingRate: number;
          hotelSellingRate: number;
          amount: number;
          hotelCurrency: string;
          hotelMandatory: boolean;
          allotment: number;
          commission: number;
          commissionVAT: number;
          commissionPCT: number;
          cost: {
            amount: number;
            currency: string;
          };
          rateCommentsId: string;
          rateComments: string;
          paymentType: string;
          packaging: boolean;
          boardCode: string;
          boardName: string;
          cancellationPolicies: Array<{
            amount: number;
            hotelAmount: number;
            hotelCurrency: string;
            from: string;
          }>;
          rooms: number;
          adults: number;
          children: number;
        }>;
      }>;
      minRate: number;
      maxRate: number;
      totalSellingRate: number;
      totalNet: number;
    }>;
  };
}

// Enhanced hotel data for MAKU platform
interface EnhancedHotelBedsHotel {
  code: string;
  name: string;
  category: string;
  destination: string;
  location: {
    latitude: number;
    longitude: number;
    zone: string;
  };
  pricing: {
    minRate: number;
    maxRate: number;
    currency: string;
    totalNet: number;
    sellingRate: number;
  };
  rooms: Array<{
    code: string;
    name: string;
    maxOccupancy: number;
    rates: Array<{
      rateKey: string;
      amount: number;
      boardType: string;
      cancellationPolicy: string;
      paymentType: string;
    }>;
  }>;
  petFriendly: boolean;
  petFee: number;
  rating: number;
  amenities: string[];
  lastUpdated: string;
}

// Generate fallback hotel data
function getFallbackHotelData(): EnhancedHotelBedsHotel[] {
  return [
    {
      code: 'HTB001',
      name: 'Hotel Beds Pet Paradise Madrid',
      category: 'Premium',
      destination: 'Madrid',
      location: {
        latitude: 40.4168,
        longitude: -3.7038,
        zone: 'City Center'
      },
      pricing: {
        minRate: 120,
        maxRate: 250,
        currency: 'EUR',
        totalNet: 180,
        sellingRate: 200
      },
      rooms: [{
        code: 'DBL',
        name: 'Double Room with Pet Amenities',
        maxOccupancy: 3,
        rates: [{
          rateKey: 'HTB001_DBL_001',
          amount: 180,
          boardType: 'Bed & Breakfast',
          cancellationPolicy: 'Free cancellation until 24h before arrival',
          paymentType: 'AT_HOTEL'
        }]
      }],
      petFriendly: true,
      petFee: 15,
      rating: 4.3,
      amenities: ['Pet Beds', 'Dog Walking Area', 'Pet Sitting Service', 'Free WiFi', 'Restaurant'],
      lastUpdated: new Date().toISOString()
    },
    {
      code: 'HTB002',
      name: 'Barcelona Paws Hotel',
      category: 'Luxury',
      destination: 'Barcelona',
      location: {
        latitude: 41.3851,
        longitude: 2.1734,
        zone: 'Gothic Quarter'
      },
      pricing: {
        minRate: 200,
        maxRate: 400,
        currency: 'EUR',
        totalNet: 280,
        sellingRate: 320
      },
      rooms: [{
        code: 'SUI',
        name: 'Pet-Friendly Suite',
        maxOccupancy: 4,
        rates: [{
          rateKey: 'HTB002_SUI_001',
          amount: 280,
          boardType: 'Half Board',
          cancellationPolicy: 'Free cancellation until 48h before arrival',
          paymentType: 'AT_WEB'
        }]
      }],
      petFriendly: true,
      petFee: 25,
      rating: 4.7,
      amenities: ['Pet Spa', 'Grooming Service', 'Pet Food Menu', 'Balcony', 'Pool Access'],
      lastUpdated: new Date().toISOString()
    }
  ];
}

// Enhance Hotel Beds data with MAKU features
function enhanceHotelBedsData(hotelData: any): EnhancedHotelBedsHotel[] {
  if (!hotelData?.hotels?.hotels) {
    return getFallbackHotelData();
  }

  return hotelData.hotels.hotels.map((hotel: any) => {
    const petFriendly = Math.random() > 0.25; // 75% chance pet-friendly for Hotel Beds
    const rating = 3.8 + Math.random() * 1.2; // 3.8-5.0 rating range

    return {
      code: hotel.code,
      name: hotel.name,
      category: hotel.categoryName || 'Standard',
      destination: hotel.destinationCode,
      location: {
        latitude: parseFloat(hotel.latitude) || 0,
        longitude: parseFloat(hotel.longitude) || 0,
        zone: hotel.zoneCode?.toString() || 'City'
      },
      pricing: {
        minRate: hotel.minRate || 100,
        maxRate: hotel.maxRate || 300,
        currency: hotelData.hotels.currency || 'EUR',
        totalNet: hotel.totalNet || hotel.minRate || 100,
        sellingRate: hotel.totalSellingRate || hotel.maxRate || 300
      },
      rooms: hotel.rooms?.map((room: any) => ({
        code: room.code,
        name: room.name,
        maxOccupancy: (room.rates?.[0]?.adults || 2) + (room.rates?.[0]?.children || 0),
        rates: room.rates?.slice(0, 3).map((rate: any) => ({
          rateKey: rate.rateKey,
          amount: rate.amount || rate.net || rate.sellingRate,
          boardType: rate.boardName || 'Room Only',
          cancellationPolicy: rate.cancellationPolicies?.[0] ?
            `Cancellation fee: ${rate.cancellationPolicies[0].amount} ${rate.cancellationPolicies[0].hotelCurrency}` :
            'Standard cancellation policy',
          paymentType: rate.paymentType || 'AT_HOTEL'
        })) || []
      })) || [],
      petFriendly,
      petFee: petFriendly ? Math.floor(Math.random() * 30) + 10 : 0,
      rating: Math.round(rating * 10) / 10,
      amenities: [
        ...(petFriendly ? ['Pet Beds Available', 'Pet Walking Service'] : []),
        'Free WiFi',
        'Restaurant',
        'Room Service',
        ...(Math.random() > 0.5 ? ['Swimming Pool', 'Fitness Center'] : []),
        ...(Math.random() > 0.6 ? ['Spa Services', 'Business Center'] : [])
      ].slice(0, 6),
      lastUpdated: new Date().toISOString()
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Hotel Beds API parameters
    const destination = searchParams.get('destination') || 'MAD'; // Madrid default
    const checkIn = searchParams.get('checkIn') || getFormattedFutureDate(7); // 7 days from now
    const checkOut = searchParams.get('checkOut') || getFormattedFutureDate(9); // 9 days from now
    const adults = searchParams.get('adults') || '2';
    const children = searchParams.get('children') || '0';
    const rooms = searchParams.get('rooms') || '1';

    let hotelData: any = null;
    let source = 'fallback';

    try {
      // Construct Hotel Beds API request
      const searchPayload = {
        stay: {
          checkIn,
          checkOut
        },
        occupancies: [
          {
            rooms: parseInt(rooms),
            adults: parseInt(adults),
            children: parseInt(children)
          }
        ],
        destination: {
          code: destination
        }
      };

      console.log('Hotel Beds API Request:', JSON.stringify(searchPayload, null, 2));

      // Make request to Hotel Beds API
      const response = await makeHotelBedsRequest(
        'hotels',
        '/hotel-api/1.0/hotels',
        {
          method: 'POST',
          body: JSON.stringify(searchPayload)
        }
      );

      if (response.ok) {
        hotelData = await response.json();
        source = 'hotelbeds_api';
        console.log('Hotel Beds API success:', hotelData);
      } else {
        const errorText = await response.text();
        console.log('Hotel Beds API error:', response.status, errorText);
        hotelData = null;
      }
    } catch (apiError) {
      console.log('Hotel Beds API request failed:', apiError);
      hotelData = null;
    }

    // Enhance data with MAKU features
    const enhancedHotels = enhanceHotelBedsData(hotelData);

    const responseData = {
      meta: {
        count: enhancedHotels.length,
        source,
        searchParams: {
          destination,
          checkIn,
          checkOut,
          adults,
          children,
          rooms
        },
        provider: 'hotelbeds'
      },
      data: enhancedHotels,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Hotel Beds Hotels API error:', error);

    // Return fallback data on error
    const fallbackHotels = getFallbackHotelData();

    return NextResponse.json({
      meta: {
        count: fallbackHotels.length,
        source: 'fallback_error',
        provider: 'hotelbeds'
      },
      data: fallbackHotels,
      lastUpdated: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
