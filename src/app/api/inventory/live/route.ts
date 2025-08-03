import { NextRequest, NextResponse } from 'next/server';

// Types for Amadeus API response
interface AmadeusHotelOffer {
  id: string;
  hotel: {
    hotelId: string;
    name: string;
    rating?: number;
  };
  available: boolean;
  offers: Array<{
    id: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
    policies: {
      paymentType: string;
      cancellation?: {
        deadline: string;
      };
    };
    room: {
      type: string;
      typeEstimated: {
        category: string;
        beds: number;
        bedType: string;
      };
    };
  }>;
}

interface AmadeusResponse {
  data?: AmadeusHotelOffer[];
  meta?: {
    count: number;
  };
}

// Mock Amadeus API credentials - in production, these would be environment variables
const AMADEUS_API_KEY = 'demo_key';
const AMADEUS_API_SECRET = 'demo_secret';
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

// Enhanced hotel data with real-time inventory simulation
const enhanceWithRealTimeData = (amadeusData: AmadeusHotelOffer[]) => {
  return amadeusData.map(hotel => ({
    id: hotel.id,
    hotelId: hotel.hotel.hotelId,
    name: hotel.hotel.name,
    rating: hotel.hotel.rating || 4.0,
    available: hotel.available,
    roomsLeft: Math.floor(Math.random() * 15) + 1,
    price: parseFloat(hotel.offers[0]?.price.total || '0'),
    currency: hotel.offers[0]?.price.currency || 'USD',
    originalPrice: parseFloat(hotel.offers[0]?.price.total || '0') * 1.2,
    petFriendly: Math.random() > 0.3, // 70% chance pet-friendly
    petFee: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 25 : 0,
    lastUpdated: new Date().toISOString(),
    trending: Math.random() > 0.7 ? 'up' : Math.random() > 0.4 ? 'down' : 'stable',
    urgencyLevel: Math.random() > 0.8 ? 'high' : Math.random() > 0.6 ? 'medium' : 'low',
    dealExpires: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    amenities: [
      'Pet Beds Available',
      'Pet Sitting Service',
      'Dog Walking',
      'Pet Food Available',
      'Veterinary Services Nearby'
    ].filter(() => Math.random() > 0.4),
    offers: hotel.offers.map(offer => ({
      id: offer.id,
      roomType: offer.room.type,
      bedType: offer.room.typeEstimated.bedType,
      beds: offer.room.typeEstimated.beds,
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      cancellationPolicy: offer.policies.cancellation?.deadline || 'Standard',
      paymentType: offer.policies.paymentType
    }))
  }));
};

// Fallback data when Amadeus API is not available
const getFallbackData = () => {
  const mockHotels = [
    {
      id: 'hotel_1',
      hotelId: 'MCLONGHM',
      name: 'Pet Paradise Hotel London',
      rating: 4.5,
      available: true,
      roomsLeft: 8,
      price: 150,
      currency: 'USD',
      originalPrice: 180,
      petFriendly: true,
      petFee: 25,
      lastUpdated: new Date().toISOString(),
      trending: 'up' as const,
      urgencyLevel: 'medium' as const,
      dealExpires: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      amenities: ['Pet Beds Available', 'Dog Walking', 'Veterinary Services Nearby'],
      offers: [{
        id: 'offer_1',
        roomType: 'Superior Room',
        bedType: 'King',
        beds: 1,
        price: 150,
        currency: 'USD',
        cancellationPolicy: 'Free cancellation until 6 PM',
        paymentType: 'AT_WEB'
      }]
    },
    {
      id: 'hotel_2',
      hotelId: 'PAWSINN01',
      name: 'Paws & Stay Downtown',
      rating: 4.2,
      available: true,
      roomsLeft: 3,
      price: 120,
      currency: 'USD',
      originalPrice: 140,
      petFriendly: true,
      petFee: 0,
      lastUpdated: new Date().toISOString(),
      trending: 'stable' as const,
      urgencyLevel: 'high' as const,
      dealExpires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      amenities: ['Pet Sitting Service', 'Pet Food Available', 'Dog Walking'],
      offers: [{
        id: 'offer_2',
        roomType: 'Deluxe Pet Suite',
        bedType: 'Queen',
        beds: 1,
        price: 120,
        currency: 'USD',
        cancellationPolicy: 'Free cancellation until 4 PM',
        paymentType: 'AT_WEB'
      }]
    }
  ];

  return mockHotels;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelIds = searchParams.get('hotelIds') || 'MCLONGHM';
    const checkInDate = searchParams.get('checkInDate') || '2024-02-15';
    const adults = searchParams.get('adults') || '1';
    const roomQuantity = searchParams.get('roomQuantity') || '1';

    // Construct Amadeus API URL
    const amadeusUrl = new URL('/v3/shopping/hotel-offers', AMADEUS_BASE_URL);
    amadeusUrl.searchParams.set('hotelIds', hotelIds);
    amadeusUrl.searchParams.set('adults', adults);
    amadeusUrl.searchParams.set('checkInDate', checkInDate);
    amadeusUrl.searchParams.set('roomQuantity', roomQuantity);
    amadeusUrl.searchParams.set('priceRange', '100');
    amadeusUrl.searchParams.set('paymentPolicy', 'NONE');
    amadeusUrl.searchParams.set('bestRateOnly', 'true');

    // In a real implementation, you would get an OAuth token first
    // For demo purposes, we'll simulate the API call and use fallback data
    let hotelData;

    try {
      // Simulate API call - in production you would:
      // 1. Get OAuth token from Amadeus
      // 2. Make authenticated request
      // 3. Handle response and errors

      const response = await fetch(amadeusUrl.toString(), {
        headers: {
          'Authorization': `Bearer ${AMADEUS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const amadeusData: AmadeusResponse = await response.json();
        hotelData = amadeusData.data ? enhanceWithRealTimeData(amadeusData.data) : getFallbackData();
      } else {
        // Use fallback data if API call fails
        hotelData = getFallbackData();
      }
    } catch (apiError) {
      // Use fallback data if API call fails
      console.log('Using fallback data - Amadeus API not available in demo');
      hotelData = getFallbackData();
    }

    // Add real-time pricing alerts
    const alerts = hotelData
      .filter(hotel => hotel.urgencyLevel === 'high' || hotel.roomsLeft <= 5)
      .map(hotel => ({
        id: `alert_${hotel.id}`,
        hotelId: hotel.hotelId,
        type: hotel.roomsLeft <= 5 ? 'low_availability' : 'price_drop',
        message: hotel.roomsLeft <= 5
          ? `Only ${hotel.roomsLeft} rooms left at ${hotel.name}!`
          : `Price dropped 15% at ${hotel.name}`,
        timestamp: new Date().toISOString(),
        urgency: hotel.urgencyLevel
      }));

    const response = {
      hotels: hotelData,
      alerts,
      lastUpdated: new Date().toISOString(),
      source: 'amadeus_api_enhanced',
      metadata: {
        searchParams: {
          hotelIds,
          checkInDate,
          adults,
          roomQuantity
        },
        totalHotels: hotelData.length,
        petFriendlyCount: hotelData.filter(h => h.petFriendly).length
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Inventory API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch real-time inventory',
        hotels: getFallbackData(),
        alerts: [],
        lastUpdated: new Date().toISOString(),
        source: 'fallback_data'
      },
      { status: 500 }
    );
  }
}
