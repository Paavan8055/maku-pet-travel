import { NextRequest, NextResponse } from 'next/server';

// Unified hotel data structure
interface UnifiedHotel {
  id: string;
  name: string;
  provider: 'amadeus' | 'hotelbeds';
  category: string;
  destination: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  pricing: {
    from: number;
    to: number;
    currency: string;
    perNight: boolean;
  };
  petPolicy: {
    allowed: boolean;
    fee: number;
    restrictions: string[];
    maxPets: number;
  };
  rating: number;
  amenities: string[];
  images: string[];
  availability: {
    roomsLeft: number;
    urgencyLevel: 'high' | 'medium' | 'low';
  };
  lastUpdated: string;
}

// Helper function to get formatted future date
function getFormattedFutureDate(daysInFuture: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Normalize Amadeus hotel data to unified format
function normalizeAmadeusHotels(amadeusData: any): UnifiedHotel[] {
  if (!amadeusData?.data) return [];

  return amadeusData.data.map((hotel: any) => ({
    id: `amadeus_${hotel.hotelId || hotel.id}`,
    name: hotel.name,
    provider: 'amadeus' as const,
    category: hotel.priceRange || 'Standard',
    destination: hotel.address?.cityName || 'Unknown',
    location: {
      latitude: hotel.geoCode?.latitude || hotel.address?.latitude || 0,
      longitude: hotel.geoCode?.longitude || hotel.address?.longitude || 0,
      address: hotel.address?.lines?.[0] || hotel.address?.cityName
    },
    pricing: {
      from: hotel.price || 100,
      to: hotel.originalPrice || hotel.price * 1.2 || 120,
      currency: hotel.currency || 'EUR',
      perNight: true
    },
    petPolicy: {
      allowed: hotel.petFriendly || false,
      fee: hotel.petFee || 0,
      restrictions: hotel.petFriendly ? ['Advance booking required', 'Vaccinations required'] : ['Pets not allowed'],
      maxPets: hotel.petFriendly ? 2 : 0
    },
    rating: hotel.rating || 4.0,
    amenities: hotel.amenities || ['Free WiFi', 'Restaurant'],
    images: hotel.images || ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
    availability: {
      roomsLeft: hotel.availability?.roomsAvailable || hotel.roomsLeft || 10,
      urgencyLevel: hotel.availability?.urgencyLevel || hotel.urgencyLevel || 'medium'
    },
    lastUpdated: new Date().toISOString()
  }));
}

// Normalize Hotel Beds hotel data to unified format
function normalizeHotelBedsHotels(hotelBedsData: any): UnifiedHotel[] {
  if (!hotelBedsData?.data) return [];

  return hotelBedsData.data.map((hotel: any) => ({
    id: `hotelbeds_${hotel.code}`,
    name: hotel.name,
    provider: 'hotelbeds' as const,
    category: hotel.category || 'Standard',
    destination: hotel.destination,
    location: {
      latitude: hotel.location?.latitude || 0,
      longitude: hotel.location?.longitude || 0,
      address: hotel.location?.zone
    },
    pricing: {
      from: hotel.pricing?.minRate || hotel.pricing?.totalNet || 80,
      to: hotel.pricing?.maxRate || hotel.pricing?.sellingRate || 150,
      currency: hotel.pricing?.currency || 'EUR',
      perNight: true
    },
    petPolicy: {
      allowed: hotel.petFriendly || false,
      fee: hotel.petFee || 0,
      restrictions: hotel.petFriendly ? ['Advance booking required', 'Pet carrier available'] : ['Pets not allowed'],
      maxPets: hotel.petFriendly ? 2 : 0
    },
    rating: hotel.rating || 4.2,
    amenities: hotel.amenities || ['Free WiFi', 'Restaurant', 'Pet Services'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'],
    availability: {
      roomsLeft: Math.floor(Math.random() * 15) + 1,
      urgencyLevel: Math.floor(Math.random() * 15) < 5 ? 'high' : 'medium'
    },
    lastUpdated: hotel.lastUpdated || new Date().toISOString()
  }));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Search parameters
    const destination = searchParams.get('destination') || 'MAD';
    const checkIn = searchParams.get('checkIn') || getFormattedFutureDate(7);
    const checkOut = searchParams.get('checkOut') || getFormattedFutureDate(9);
    const adults = searchParams.get('adults') || '2';
    const children = searchParams.get('children') || '0';
    const rooms = searchParams.get('rooms') || '1';
    const petFriendly = searchParams.get('petFriendly') === 'true';
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');

    console.log('Unified Search Parameters:', { destination, checkIn, checkOut, adults, petFriendly });

    // Dynamic base URL detection for deployment
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL ||
        (process.env.NODE_ENV === 'production' ? request.nextUrl.origin : 'http://localhost:3000');

    // Parallel API calls
    const [amadeusResults, hotelBedsResults] = await Promise.all([
      // Amadeus Hotels API
      fetch(`${baseUrl}/api/hotels/list?hotelIds=ACPAR419,MCLONGHM,PARPET01`)
        .then(res => res.json())
        .catch(error => {
          console.log('Amadeus API error:', error);
          return { data: [] };
        }),

      // Hotel Beds Hotels API
      fetch(`${baseUrl}/api/hotelbeds/hotels?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`)
        .then(res => res.json())
        .catch(error => {
          console.log('Hotel Beds API error:', error);
          return { data: [] };
        })
    ]);

    console.log('API Results:', {
      amadeus: amadeusResults?.meta?.count || 0,
      hotelbeds: hotelBedsResults?.meta?.count || 0
    });

    // Normalize data from both providers
    const amadeusHotels = normalizeAmadeusHotels(amadeusResults);
    const hotelBedsHotels = normalizeHotelBedsHotels(hotelBedsResults);

    // Combine all results
    let allHotels = [...amadeusHotels, ...hotelBedsHotels];

    // Apply filters
    if (petFriendly) {
      allHotels = allHotels.filter(hotel => hotel.petPolicy.allowed);
    }

    if (maxPrice) {
      const maxPriceNum = parseFloat(maxPrice);
      allHotels = allHotels.filter(hotel => hotel.pricing.from <= maxPriceNum);
    }

    if (minRating) {
      const minRatingNum = parseFloat(minRating);
      allHotels = allHotels.filter(hotel => hotel.rating >= minRatingNum);
    }

    // Sort by price (ascending) and then by rating (descending)
    allHotels.sort((a, b) => {
      const priceDiff = a.pricing.from - b.pricing.from;
      if (priceDiff !== 0) return priceDiff;
      return b.rating - a.rating;
    });

    // Calculate statistics
    const stats = {
      totalHotels: allHotels.length,
      petFriendlyCount: allHotels.filter(h => h.petPolicy.allowed).length,
      averagePrice: allHotels.length > 0 ?
        allHotels.reduce((sum, h) => sum + h.pricing.from, 0) / allHotels.length : 0,
      providers: {
        amadeus: amadeusHotels.length,
        hotelbeds: hotelBedsHotels.length
      },
      priceRange: allHotels.length > 0 ? {
        min: Math.min(...allHotels.map(h => h.pricing.from)),
        max: Math.max(...allHotels.map(h => h.pricing.from))
      } : { min: 0, max: 0 }
    };

    const response = {
      meta: {
        searchParams: {
          destination,
          checkIn,
          checkOut,
          adults,
          children,
          rooms,
          petFriendly,
          maxPrice,
          minRating
        },
        stats,
        providers: ['amadeus', 'hotelbeds'],
        lastUpdated: new Date().toISOString()
      },
      data: allHotels,
      totalCount: allHotels.length
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Unified Search API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to perform unified search',
        message: error instanceof Error ? error.message : 'Unknown error',
        meta: {
          providers: ['amadeus', 'hotelbeds'],
          lastUpdated: new Date().toISOString()
        },
        data: [],
        totalCount: 0
      },
      { status: 500 }
    );
  }
}
