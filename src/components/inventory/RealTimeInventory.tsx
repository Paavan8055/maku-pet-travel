'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Wifi,
  MapPin,
  Star,
  PawPrint,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface HotelOffer {
  id: string;
  roomType: string;
  bedType: string;
  beds: number;
  price: number;
  currency: string;
  cancellationPolicy: string;
  paymentType: string;
}

interface Hotel {
  id: string;
  hotelId: string;
  name: string;
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
  offers: HotelOffer[];
}

interface Alert {
  id: string;
  hotelId: string;
  type: 'low_availability' | 'price_drop';
  message: string;
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
}

interface InventoryData {
  hotels: Hotel[];
  alerts: Alert[];
  lastUpdated: string;
  source: string;
  metadata: {
    searchParams: {
      hotelIds: string;
      checkInDate: string;
      adults: string;
      roomQuantity: string;
    };
    totalHotels: number;
    petFriendlyCount: number;
  };
}

export default function RealTimeInventory() {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventory/live?hotelIds=MCLONGHM,PAWSINN01&checkInDate=2024-02-15&adults=1&roomQuantity=1');

      if (!response.ok) {
        throw new Error('Failed to fetch inventory data');
      }

      const data: InventoryData = await response.json();
      setInventoryData(data);
      setLastRefresh(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchInventoryData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getTrendingIcon = (trending: string) => {
    switch (trending) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatTimeRemaining = (dealExpires: string) => {
    const now = new Date();
    const expires = new Date(dealExpires);
    const diff = expires.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading && !inventoryData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-gray-600">Loading real-time inventory...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card className="border-red-200">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <p className="text-red-600">Error: {error}</p>
              <Button onClick={fetchInventoryData} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-Time Hotel Inventory</h1>
          <p className="text-gray-600 mt-2">Live availability powered by Amadeus API</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Zap className="h-4 w-4" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          </div>

          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchInventoryData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {inventoryData?.alerts && inventoryData.alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Live Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inventoryData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getUrgencyColor(alert.urgency)}`} />
                    <span className="font-medium">{alert.message}</span>
                  </div>
                  <Badge variant="outline">{alert.type.replace('_', ' ')}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hotels</p>
                <p className="text-2xl font-bold">{inventoryData?.metadata.totalHotels || 0}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pet-Friendly</p>
                <p className="text-2xl font-bold">{inventoryData?.metadata.petFriendlyCount || 0}</p>
              </div>
              <PawPrint className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Source</p>
                <p className="text-lg font-semibold capitalize">{inventoryData?.source.replace('_', ' ') || 'API'}</p>
              </div>
              <Wifi className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Updates</p>
                <p className="text-lg font-semibold">Every 30s</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotel Listings */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Available Hotels</h2>

        {inventoryData?.hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>

                    {hotel.petFriendly && (
                      <Badge className="bg-green-100 text-green-800">
                        <PawPrint className="h-3 w-3 mr-1" />
                        Pet-Friendly
                      </Badge>
                    )}

                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({hotel.rating})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getUrgencyColor(hotel.urgencyLevel)}`} />
                      <span className="text-sm">
                        {hotel.roomsLeft} rooms left
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getTrendingIcon(hotel.trending)}
                      <span className="text-sm">Price trending {hotel.trending}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Deal expires in {formatTimeRemaining(hotel.dealExpires)}</span>
                    </div>
                  </div>

                  {hotel.amenities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Pet Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {hotel.offers.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Room Options</h4>
                      <div className="space-y-2">
                        {hotel.offers.map((offer) => (
                          <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{offer.roomType}</p>
                              <p className="text-sm text-gray-600">{offer.bedType} bed • {offer.beds} bed(s)</p>
                              <p className="text-xs text-gray-500">{offer.cancellationPolicy}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">${offer.price}</p>
                              <p className="text-sm text-gray-600">per night</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-6 text-right">
                  <div className="mb-4">
                    {hotel.originalPrice > hotel.price && (
                      <p className="text-lg text-gray-400 line-through">${hotel.originalPrice}</p>
                    )}
                    <p className="text-3xl font-bold text-green-600">${hotel.price}</p>
                    <p className="text-sm text-gray-600">per night</p>
                    {hotel.petFee > 0 && (
                      <p className="text-sm text-orange-600">+${hotel.petFee} pet fee</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Updated: {new Date(hotel.lastUpdated).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-sm text-gray-600">
            <p>Real-time inventory powered by Amadeus API • Data refreshes every 30 seconds</p>
            <p className="mt-1">Search parameters: Check-in {inventoryData?.metadata.searchParams.checkInDate} • {inventoryData?.metadata.searchParams.adults} adult(s) • {inventoryData?.metadata.searchParams.roomQuantity} room(s)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
