'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Calendar,
  Users,
  PawPrint,
  Plane,
  Heart,
  Star,
  Clock,
  Shield,
  Wifi,
  Coffee,
  Volume2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '2 adults, 1 pet',
    class: 'Economy'
  });

  const flightOptions = [
    {
      id: 'FL001',
      airline: 'Pet Airways',
      route: 'New York → Los Angeles',
      departure: '08:30 AM',
      arrival: '11:45 AM',
      duration: '5h 15m',
      price: 450,
      currency: 'USD',
      petPolicy: 'In-cabin allowed',
      stops: 'Non-stop',
      aircraft: 'Boeing 737',
      amenities: ['Pet Relief Area', 'Climate Controlled', 'Pet Safety Kit'],
      rating: 4.8,
      cabinPetFee: 125,
      restrictions: ['Up to 20 lbs', 'Carrier must fit under seat']
    },
    {
      id: 'FL002',
      airline: 'SkyPet International',
      route: 'New York → Los Angeles',
      departure: '02:15 PM',
      arrival: '05:30 PM',
      duration: '5h 15m',
      price: 380,
      currency: 'USD',
      petPolicy: 'Cargo compartment',
      stops: 'Non-stop',
      aircraft: 'Airbus A320',
      amenities: ['Temperature Monitored', 'Professional Pet Handlers', 'Live Tracking'],
      rating: 4.6,
      cabinPetFee: 200,
      restrictions: ['Up to 100 lbs', 'Health certificate required']
    },
    {
      id: 'FL003',
      airline: 'Friendly Skies',
      route: 'New York → Los Angeles',
      departure: '06:45 PM',
      arrival: '10:10 PM',
      duration: '5h 25m',
      price: 320,
      currency: 'USD',
      petPolicy: 'In-cabin + Cargo options',
      stops: 'Non-stop',
      aircraft: 'Boeing 787',
      amenities: ['Pet Concierge Service', 'Pre-flight Pet Check', 'Emergency Vet Contact'],
      rating: 4.7,
      cabinPetFee: 150,
      restrictions: ['Various size options', 'Advance booking required']
    }
  ];

  const petTravelTips = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Health Documentation',
      description: 'Ensure your pet has current vaccinations and health certificates'
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Comfort Items',
      description: 'Pack familiar toys, blankets, and treats to keep your pet calm'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Arrival Early',
      description: 'Arrive 2+ hours early for domestic flights with pets'
    },
    {
      icon: <PawPrint className="h-5 w-5" />,
      title: 'Carrier Training',
      description: 'Acclimate your pet to their carrier weeks before travel'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">MAKU</div>
                <div className="text-xs text-gray-500">Pet-Friendly Travel</div>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/stays" className="text-gray-600 hover:text-gray-900">Stays</Link>
              <Link href="/flights" className="text-pink-600 font-medium">Flights</Link>
              <Link href="/cars" className="text-gray-600 hover:text-gray-900">Cars</Link>
              <Link href="/packages" className="text-gray-600 hover:text-gray-900">Packages</Link>
              <Link href="/inventory" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <span>⚡</span>
                <span>Live Inventory</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full">
              <Plane className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet-Friendly Flight Search
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect flights for you and your furry companions with comprehensive pet policies and comfort features.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Destination city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travelers & Pets</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>2 adults, 1 pet</option>
                    <option>1 adult, 1 pet</option>
                    <option>3 adults, 2 pets</option>
                    <option>4 adults, 1 pet</option>
                  </select>
                </div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white">
              <Plane className="h-4 w-4 mr-2" />
              Search Pet-Friendly Flights
            </Button>
          </CardContent>
        </Card>

        {/* Flight Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Flights</h2>
          <div className="space-y-4">
            {flightOptions.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Flight Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{flight.airline}</h3>
                          <p className="text-gray-600">{flight.aircraft}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{flight.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
                          <p className="text-sm text-gray-600">Departure</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <Plane className="h-4 w-4 text-gray-400" />
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{flight.duration}</p>
                          <p className="text-xs text-gray-500">{flight.stops}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
                          <p className="text-sm text-gray-600">Arrival</p>
                        </div>
                      </div>
                    </div>

                    {/* Pet Policy */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Pet Travel Options</h4>
                      <div className="space-y-2">
                        <Badge variant="outline" className="w-full justify-start">
                          <PawPrint className="h-3 w-3 mr-1" />
                          {flight.petPolicy}
                        </Badge>
                        <p className="text-sm text-gray-600">Pet Fee: ${flight.cabinPetFee}</p>
                        <div className="text-xs text-gray-500">
                          {flight.restrictions.map((restriction, idx) => (
                            <p key={idx}>• {restriction}</p>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Pet Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {flight.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="text-center lg:text-right">
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-gray-900">
                          ${flight.price}
                        </p>
                        <p className="text-sm text-gray-600">per person</p>
                        <p className="text-xs text-green-600">+ ${flight.cabinPetFee} pet fee</p>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Select Flight
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">Free cancellation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pet Travel Tips */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pet Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {petTravelTips.map((tip, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-blue-600">
                    {tip.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
