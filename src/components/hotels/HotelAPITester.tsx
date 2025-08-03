'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Hotel, CreditCard, Info, MapPin, Zap, Plane } from 'lucide-react';

export default function HotelAPITester() {
  const [testResults, setTestResults] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async (endpoint: string, method: 'GET' | 'POST' = 'GET') => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, { method });
      const data = await response.json();
      setTestResults(prev => prev + `\n=== ${endpoint} ===\n${JSON.stringify(data, null, 2)}\n\n`);
    } catch (error) {
      setTestResults(prev => prev + `\n=== ${endpoint} ===\nERROR: ${error}\n\n`);
    }
    setLoading(false);
  };

  const clearResults = () => setTestResults('');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hotel APIs Integration Testing
        </h1>
        <p className="text-gray-600">
          Test both Amadeus and Hotel Beds APIs for hotels, activities, and transfers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Available APIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

            {/* Amadeus APIs */}
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Hotel className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Amadeus Hotels</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Hotel search and details via Amadeus</p>
                <Button
                  onClick={() => testAPI('/api/hotels/list?hotelIds=ACPAR419,MCLONGHM')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Amadeus Hotels
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Search className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Amadeus Search</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Hotel search and autocomplete</p>
                <Button
                  onClick={() => testAPI('/api/hotels/search?keyword=PARI')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Amadeus Search
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold">Live Inventory</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Real-time hotel availability</p>
                <Button
                  onClick={() => testAPI('/api/inventory/live?hotelIds=MCLONGHM,PAWSINN01')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Live Inventory
                </Button>
              </CardContent>
            </Card>

            {/* Hotel Beds APIs */}
            <Card className="border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Hotel className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Hotel Beds Hotels</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Hotel search via Hotel Beds</p>
                <Button
                  onClick={() => testAPI('/api/hotelbeds/hotels?destination=MAD&checkIn=2024-03-15&checkOut=2024-03-17')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Hotel Beds
                </Button>
              </CardContent>
            </Card>

            <Card className="border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-teal-500" />
                  <h3 className="font-semibold">Activities</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Pet-friendly activities</p>
                <Button
                  onClick={() => testAPI('/api/hotelbeds/activities?destination=BCN&petFriendly=true')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Activities
                </Button>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Plane className="h-5 w-5 text-indigo-500" />
                  <h3 className="font-semibold">Transfers</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Airport and hotel transfers</p>
                <Button
                  onClick={() => testAPI('/api/hotelbeds/transfers?from=MAD&to=madrid&petFriendly=true')}
                  disabled={loading}
                  className="w-full"
                  size="sm"
                >
                  Test Transfers
                </Button>
              </CardContent>
            </Card>

          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                // Test all APIs sequentially
                const apis = [
                  '/api/hotels/list?hotelIds=ACPAR419',
                  '/api/hotels/search?keyword=PARI',
                  '/api/hotelbeds/hotels?destination=MAD',
                  '/api/hotelbeds/activities?destination=BCN&petFriendly=true',
                  '/api/hotelbeds/transfers?from=MAD&to=madrid'
                ];
                apis.forEach((api, index) => {
                  setTimeout(() => testAPI(api), index * 1000);
                });
              }}
              disabled={loading}
              variant="outline"
            >
              Test All APIs
            </Button>

            <Button onClick={clearResults} variant="outline">
              Clear Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle>API Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96 whitespace-pre-wrap font-mono">
              {testResults}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* API Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Amadeus APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Hotel List API - Detailed hotel information</li>
              <li>• Hotel Search API - Location-based search</li>
              <li>• Hotel Ratings API - Guest reviews and ratings</li>
              <li>• Real-time Inventory - Live availability</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hotel Beds APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Hotels API - Hotel search and booking</li>
              <li>• Activities API - Tourist activities (5000 quota)</li>
              <li>• Transfers API - Airport transfers (50000 quota)</li>
              <li>• All APIs support pet-friendly filtering</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
