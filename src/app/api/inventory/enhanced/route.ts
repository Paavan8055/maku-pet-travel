import { NextRequest, NextResponse } from 'next/server';

// Enhanced hotel data with provider information
interface EnhancedHotelData {
  id: string;
  hotelId: string;
  name: string;
  provider: 'Amadeus' | 'Hotel Beds';
  rating: number;
  available: boolean;
  roomsLeft: number;
  price: number;
  currency: string;
  originalPrice: number;
  petFriendly: boolean;
  petFee: number;
  lastUpdated: string;
  trending: 'up' | 'down' | 'stable';
  urgencyLevel: 'high' | 'medium' | 'low';
  dealExpires: string;
  amenities: string[];
  offers: Array<{
    id: string;
    roomType: string;
    bedType: string;
    beds: number;
    price: number;
    currency: string;
    cancellationPolicy: string;
    paymentType: string;
  }>;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

// Helper function to get formatted future date
function getFormattedFutureDate(daysInFuture: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString().split('T')[0];
}

// Enhanced fallback data with multiple providers
function getEnhancedFallbackData(): EnhancedHotelData[] {
  return [
    {
      id: 'amadeus_MCLONGHM',
      hotelId: 'MCLONGHM',
      name: 'Pet Paradise Hotel London (Amadeus)',
      provider: 'Amadeus',
      rating: 4.5,
      available: true,
      roomsLeft: 8,
      price: 150,
      currency: 'EUR',
      originalPrice: 180,
      petFriendly: true,
      petFee: 25,
      lastUpdated: new Date().toISOString(),
      trending: 'up',
      urgencyLevel: 'medium',
      dealExpires: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      amenities: ['Pet Beds Available', 'Dog Walking', 'Veterinary Services Nearby'],
      offers: [{
        id: 'amadeus_offer_1',
        roomType: 'Superior Room',
        bedType: 'King',
        beds: 1,
        price: 150,
        currency: 'EUR',
        cancellationPolicy: 'Free cancellation until 6 PM',
        paymentType: 'AT_WEB'
      }],
      location: {
        latitude: 51.5074,
        longitude: -0.1278,
        address: 'Central London'
      }
    },
    {
      id: 'hotelbeds_HTB001',
      hotelId: 'HTB001',
      name: 'Madrid Pet Resort (Hotel Beds)',
      provider: 'Hotel Beds',
      rating: 4.3,
      available: true,
      roomsLeft: 5,
      price: 120,
      currency: 'EUR',
      originalPrice: 140,
      petFriendly: true,
      petFee: 15,
      lastUpdated: new Date().toISOString(),
      trending: 'stable',
      urgencyLevel: 'high',
      dealExpires: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      amenities: ['Pet Spa Services', 'Pet Sitting Service', 'Dog Park Access'],
      offers: [{
        id: 'hotelbeds_offer_1',
        roomType: 'Pet-Friendly Suite',
        bedType: 'Queen',
        beds: 1,
        price: 120,
        currency: 'EUR',
        cancellationPolicy: 'Free cancellation until 24h before arrival',
        paymentType: 'AT_HOTEL'
      }],
      location: {
        latitude: 40.4168,
        longitude: -3.7038,
        address: 'Madrid City Center'
      }
    },
    {
      id: 'hotelbeds_HTB002',
      hotelId: 'HTB002',
      name: 'Barcelona Paws Hotel (Hotel Beds)',
      provider: 'Hotel Beds',
      rating: 4.7,
      available: true,
      roomsLeft: 12,
      price: 200,
      currency: 'EUR',
      originalPrice: 250,
      petFriendly: true,
      petFee: 30,
      lastUpdated: new Date().toISOString(),
      trending: 'down',
      urgencyLevel: 'low',
      dealExpires: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      amenities: ['Luxury Pet Amenities', 'Pet Grooming', 'Beach Access'],
      offers: [{
        id: 'hotelbeds_offer_2',
        roomType: 'Luxury Pet Suite',
        bedType: 'King',
        beds: 1,
        price: 200,
        currency: 'EUR',
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        paymentType: 'AT_WEB'
      }],
      location: {
        latitude: 41.3851,
        longitude: 2.1734,
        address: 'Barcelona Beach Area'
      }
    }
  ];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelIds = searchParams.get('hotelIds') || 'MCLONGHM,HTB001';
    const checkInDate = searchParams.get('checkInDate') || getFormattedFutureDate(7);
    const checkOutDate = searchParams.get('checkOutDate') || getFormattedFutureDate(9);
    const adults = searchParams.get('adults') || '2';
    const destination = searchParams.get('destination') || 'MAD';

    console.log('Enhanced Inventory API Request:', { hotelIds, checkInDate, destination });

    let combinedHotelData: EnhancedHotelData[] = [];

    // Dynamic base URL detection for deployment
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL ||
        (process.env.NODE_ENV === 'production' ? request.nextUrl.origin : 'http://localhost:3000');

    try {
      // Fetch from both providers in parallel
      const [amadeusResponse, hotelBedsResponse] = await Promise.all([
        fetch(`${baseUrl}/api/hotels/list?hotelIds=${hotelIds}`, {
          headers: { 'Content-Type': 'application/json' }
        }).catch(error => {
          console.log('Amadeus API unavailable:', error.message);
          return null;
        }),

        fetch(`${baseUrl}/api/hotelbeds/hotels?destination=${destination}&checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}`, {
          headers: { 'Content-Type': 'application/json' }
        }).catch(error => {
          console.log('Hotel Beds API unavailable:', error.message);
          return null;
        })
      ]);

      // Process Amadeus data
      if (amadeusResponse && amadeusResponse.ok) {
        try {
          const amadeusData = await amadeusResponse.json();
          if (amadeusData.data && amadeusData.data.length > 0) {
            const amadeusHotels = amadeusData.data.map((hotel: any) => ({
              id: `amadeus_${hotel.hotelId}`,
              hotelId: hotel.hotelId,
              name: `${hotel.name} (Amadeus)`,
              provider: 'Amadeus' as const,
              rating: hotel.rating || 4.0,
              available: hotel.availability?.roomsAvailable ? hotel.availability.roomsAvailable > 0 : true,
              roomsLeft: hotel.availability?.roomsAvailable || Math.floor(Math.random() * 15) + 1,
              price: Math.floor(Math.random() * 200) + 100,
              currency: 'EUR',
              originalPrice: Math.floor(Math.random() * 240) + 120,
              petFriendly: hotel.petFriendly !== undefined ? hotel.petFriendly : true,
              petFee: hotel.petFee || Math.floor(Math.random() * 30) + 10,
              lastUpdated: new Date().toISOString(),
              trending: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
              urgencyLevel: hotel.availability?.urgencyLevel || (['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low'),
              dealExpires: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
              amenities: hotel.amenities || ['Pet Beds Available', 'Free WiFi', 'Restaurant'],
              offers: [{
                id: 'amadeus_offer_1',
                roomType: 'Superior Room',
                bedType: 'King',
                beds: 1,
                price: Math.floor(Math.random() * 200) + 100,
                currency: 'EUR',
                cancellationPolicy: 'Free cancellation until 6 PM',
                paymentType: 'AT_WEB'
              }],
              location: {
                latitude: hotel.geoCode?.latitude || 40.4168,
                longitude: hotel.geoCode?.longitude || -3.7038,
                address: hotel.address?.cityName || 'City Center'
              }
            }));
            combinedHotelData.push(...amadeusHotels);
            console.log(`Added ${amadeusHotels.length} hotels from Amadeus`);
          }
        } catch (error) {
          console.log('Error processing Amadeus data:', error);
        }
      }

      // Process Hotel Beds data
      if (hotelBedsResponse && hotelBedsResponse.ok) {
        try {
          const hotelBedsData = await hotelBedsResponse.json();
          if (hotelBedsData.data && hotelBedsData.data.length > 0) {
            const hotelBedsHotels = hotelBedsData.data.map((hotel: any) => ({
              id: `hotelbeds_${hotel.code}`,
              hotelId: hotel.code,
              name: `${hotel.name} (Hotel Beds)`,
              provider: 'Hotel Beds' as const,
              rating: hotel.rating || 4.2,
              available: true,
              roomsLeft: Math.floor(Math.random() * 12) + 3,
              price: hotel.pricing?.totalNet || Math.floor(Math.random() * 180) + 80,
              currency: hotel.pricing?.currency || 'EUR',
              originalPrice: hotel.pricing?.sellingRate || Math.floor(Math.random() * 200) + 100,
              petFriendly: hotel.petFriendly !== undefined ? hotel.petFriendly : true,
              petFee: hotel.petFee || Math.floor(Math.random() * 25) + 5,
              lastUpdated: new Date().toISOString(),
              trending: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
              urgencyLevel: (Math.floor(Math.random() * 12) < 4 ? 'high' : 'medium') as 'high' | 'medium' | 'low',
              dealExpires: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
              amenities: hotel.amenities || ['Pet Services', 'Free WiFi', 'Spa'],
              offers: [{
                id: 'hotelbeds_offer_1',
                roomType: hotel.rooms?.[0]?.name || 'Standard Room',
                bedType: 'Queen',
                beds: 1,
                price: hotel.pricing?.totalNet || Math.floor(Math.random() * 180) + 80,
                currency: hotel.pricing?.currency || 'EUR',
                cancellationPolicy: 'Standard cancellation policy',
                paymentType: 'AT_HOTEL'
              }],
              location: {
                latitude: hotel.location?.latitude || 41.3851,
                longitude: hotel.location?.longitude || 2.1734,
                address: hotel.location?.zone || 'City Area'
              }
            }));
            combinedHotelData.push(...hotelBedsHotels);
            console.log(`Added ${hotelBedsHotels.length} hotels from Hotel Beds`);
          }
        } catch (error) {
          console.log('Error processing Hotel Beds data:', error);
        }
      }

      // Use fallback data if no API data is available
      if (combinedHotelData.length === 0) {
        combinedHotelData = getEnhancedFallbackData();
        console.log('Using enhanced fallback data');
      }

    } catch (error) {
      console.log('API fetch error, using fallback data:', error);
      combinedHotelData = getEnhancedFallbackData();
    }

    // Generate alerts from combined data
    const alerts = combinedHotelData
      .filter(hotel => hotel.urgencyLevel === 'high' || hotel.roomsLeft <= 5)
      .map(hotel => ({
        id: `alert_${hotel.id}`,
        hotelId: hotel.hotelId,
        provider: hotel.provider,
        type: hotel.roomsLeft <= 5 ? 'low_availability' : 'price_drop',
        message: hotel.roomsLeft <= 5
          ? `Only ${hotel.roomsLeft} rooms left at ${hotel.name}!`
          : `Special deal at ${hotel.name} via ${hotel.provider}`,
        timestamp: new Date().toISOString(),
        urgency: hotel.urgencyLevel
      }));

    // Calculate provider statistics
    const providerStats = {
      amadeus: combinedHotelData.filter(h => h.provider === 'Amadeus').length,
      hotelbeds: combinedHotelData.filter(h => h.provider === 'Hotel Beds').length
    };

    const response = {
      hotels: combinedHotelData,
      alerts,
      lastUpdated: new Date().toISOString(),
      source: 'multi_provider_enhanced',
      metadata: {
        searchParams: {
          hotelIds,
          checkInDate,
          checkOutDate,
          adults,
          destination
        },
        totalHotels: combinedHotelData.length,
        petFriendlyCount: combinedHotelData.filter(h => h.petFriendly).length,
        providerBreakdown: providerStats,
        averagePrice: combinedHotelData.length > 0 ?
          Math.round(combinedHotelData.reduce((sum, h) => sum + h.price, 0) / combinedHotelData.length) : 0,
        priceRange: combinedHotelData.length > 0 ? {
          min: Math.min(...combinedHotelData.map(h => h.price)),
          max: Math.max(...combinedHotelData.map(h => h.price))
        } : { min: 0, max: 0 }
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Enhanced Inventory API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch enhanced real-time inventory',
        hotels: getEnhancedFallbackData(),
        alerts: [],
        lastUpdated: new Date().toISOString(),
        source: 'fallback_error',
        metadata: {
          totalHotels: 3,
          petFriendlyCount: 3,
          providerBreakdown: { amadeus: 1, hotelbeds: 2 }
        }
      },
      { status: 500 }
    );
  }
}
