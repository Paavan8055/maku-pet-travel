// Use Web Crypto API for better serverless compatibility
async function createSha256Hash(data: string): Promise<string> {
  // Try Web Crypto API first (modern environments)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback to Node.js crypto for local development
  try {
    const { createHash } = await import('crypto');
    return createHash('sha256').update(data).digest('hex');
  } catch (error) {
    throw new Error('Crypto API not available in this environment');
  }
}

// Hotel Beds API credentials from environment or fallback to provided keys
export const HOTELBEDS_CREDENTIALS = {
  hotels: {
    apiKey: process.env.HOTELBEDS_HOTELS_API_KEY || '07ad6808dc0e9fd6f3e58ca66431ccf9',
    secret: process.env.HOTELBEDS_HOTELS_SECRET || '31fed1f586',
    alias: 'MakuTravelTest1'
  },
  activities: {
    apiKey: process.env.HOTELBEDS_ACTIVITIES_API_KEY || '9d2f9a6d3282a7a777165b5eae2eefab',
    secret: process.env.HOTELBEDS_ACTIVITIES_SECRET || '19a40d9cbc',
    alias: 'MakuTravelActivities'
  },
  transfers: {
    apiKey: process.env.HOTELBEDS_TRANSFERS_API_KEY || 'e7f74c26f91d645c212aa04379f0792d',
    secret: process.env.HOTELBEDS_TRANSFERS_SECRET || 'c156a6adbd',
    alias: 'MakuTravelTransfers'
  }
};

export const HOTELBEDS_BASE_URLS = {
  hotels: 'https://api.test.hotelbeds.com',
  activities: 'https://api.test.hotelbeds.com',
  transfers: 'https://api.test.hotelbeds.com'
};

/**
 * Generate Hotel Beds API signature
 * Hotel Beds requires X-Signature header with SHA256 hash of: apiKey + secret + timestamp
 */
export async function generateHotelBedsSignature(apiKey: string, secret: string, timestamp: number): Promise<string> {
  const stringToSign = apiKey + secret + timestamp;
  return await createSha256Hash(stringToSign);
}

/**
 * Get Hotel Beds authentication headers for API requests
 */
export async function getHotelBedsAuthHeaders(service: 'hotels' | 'activities' | 'transfers'): Promise<Record<string, string>> {
  const credentials = HOTELBEDS_CREDENTIALS[service];
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateHotelBedsSignature(credentials.apiKey, credentials.secret, timestamp);

  return {
    'Api-key': credentials.apiKey,
    'X-Signature': signature,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

/**
 * Make authenticated request to Hotel Beds API
 */
export async function makeHotelBedsRequest(
  service: 'hotels' | 'activities' | 'transfers',
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const baseUrl = HOTELBEDS_BASE_URLS[service];
  const headers = await getHotelBedsAuthHeaders(service);

  const url = `${baseUrl}${endpoint}`;

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });
}

// Hotel Beds API response types
export interface HotelBedsHotel {
  code: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  destinationCode: string;
  destinationName: string;
  zoneCode: number;
  zoneName: string;
  latitude: string;
  longitude: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  license: string;
  phones: Array<{
    phoneNumber: string;
    phoneType: string;
  }>;
  rooms: Array<{
    roomCode: string;
    isParentRoom: boolean;
    minPax: number;
    maxPax: number;
    maxAdults: number;
    maxChildren: number;
    minAdults: number;
    description: string;
  }>;
  facilities: Array<{
    facilityCode: number;
    facilityGroupCode: number;
    order: number;
    indYesOrNo: boolean;
    number: number;
    voucher: boolean;
  }>;
}

export interface HotelBedsActivity {
  code: string;
  name: string;
  type: string;
  country: string;
  destination: string;
  category: string;
  modalityName: string;
  duration: string;
  language: string;
  currencyName: string;
  originalPrice: number;
  price: number;
  description: string;
  operatingDays: string[];
  minAge: number;
  maxAge: number;
  minPaxPerBooking: number;
  maxPaxPerBooking: number;
}

export interface HotelBedsTransfer {
  code: string;
  name: string;
  type: string;
  vehicle: string;
  category: string;
  minPaxCapacity: number;
  maxPaxCapacity: number;
  price: {
    currencyId: string;
    amount: number;
  };
  pickupTime: string;
  duration: string;
  direction: string;
  transferDetailInfo: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
  }>;
}
