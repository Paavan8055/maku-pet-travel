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
  Car,
  Heart,
  Star,
  Shield,
  Snowflake,
  Wifi,
  Settings,
  Fuel
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CarsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const carCategories = ['All', 'SUV', 'Minivan', 'Luxury', 'Electric'];

  const carRentals = [
    {
      id: 'CAR001',
      company: 'PetDrive Rentals',
      model: 'Honda Pilot',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1549399291-9b2ea7da84a1?w=400&h=250&fit=crop',
      seats: 8,
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: 89,
      currency: 'USD',
      rating: 4.8,
      petFeatures: [
        'Pet Barrier Included',
        'Waterproof Seat Covers',
        'Pet First Aid Kit',
        'Climate Control Zones'
      ],
      amenities: ['GPS Navigation', 'Bluetooth', 'USB Charging', 'Backup Camera'],
      petFee: 25,
      restrictions: ['No size limit', 'Up to 3 pets', 'Must be leashed'],
      location: 'Airport & Downtown'
    },
    {
      id: 'CAR002',
      company: 'FurryFriends Auto',
      model: 'Toyota Sienna',
      category: 'Minivan',
      image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&h=250&fit=crop',
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      price: 95,
      currency: 'USD',
      rating: 4.9,
      petFeatures: [
        'Built-in Pet Carrier',
        'Non-slip Floor Mats',
        'Pet Safety Harnesses',
        'Sliding Rear Doors'
      ],
      amenities: ['Entertainment System', 'Wi-Fi Hotspot', 'Power Outlets', 'Dual AC'],
      petFee: 30,
      restrictions: ['Medium to large pets', 'Up to 2 pets', 'Health certificate required'],
      location: 'Airport & City Centers'
    },
    {
      id: 'CAR003',
      company: 'Luxury Pet Rides',
      model: 'Mercedes GLS',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop',
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: 150,
      currency: 'USD',
      rating: 4.7,
      petFeatures: [
        'Premium Pet Bedding',
        'Temperature Monitoring',
        'Pet Concierge Service',
        'Custom Pet Accessories'
      ],
      amenities: ['Leather Interior', 'Premium Sound', 'Heated Seats', 'Panoramic Roof'],
      petFee: 50,
      restrictions: ['All sizes welcome', 'Professional grooming available', 'VIP pet services'],
      location: 'Premium Locations'
    },
    {
      id: 'CAR004',
      company: 'EcoPet Motors',
      model: 'Tesla Model Y',
      category: 'Electric',
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=400&h=250&fit=crop',
      seats: 5,
      transmission: 'Electric',
      fuel: 'Electric',
      price: 120,
      currency: 'USD',
      rating: 4.6,
      petFeatures: [
        'Dog Mode Climate Control',
        'Pet-Safe Materials',
        'Bio-Friendly Cleaning',
        'Silent Operation'
      ],
      amenities: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharging'],
      petFee: 35,
      restrictions: ['Eco-conscious pet owners', 'Quiet pets preferred', 'All sizes'],
      location: 'Tesla Centers'
    }
  ];

  const petSafetyFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safety Barriers',
      description: 'Professional-grade barriers to keep pets secure during travel'
    },
    {
      icon: <Snowflake className="h-6 w-6" />,
      title: 'Climate Control',
      description: 'Individual temperature zones for optimal pet comfort'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'First Aid Kits',
      description: 'Pet-specific emergency supplies and contact information'
    },
    {
      icon: <PawPrint className="h-6 w-6" />,
      title: 'Comfort Accessories',
      description: 'Premium bedding, toys, and travel accessories included'
    }
  ];

  const filteredCars = selectedCategory === 'All'
    ? carRentals
    : carRentals.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
              <Link href="/flights" className="text-gray-600 hover:text-gray-900">Flights</Link>
              <Link href="/cars" className="text-green-600 font-medium">Cars</Link>
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
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <Car className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet-Safe Car Rentals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Travel safely with your pets in specially equipped vehicles with professional pet amenities and safety features.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City or Airport"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers & Pets</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option>2 adults, 1 pet</option>
                    <option>1 adult, 1 pet</option>
                    <option>4 adults, 2 pets</option>
                    <option>3 adults, 1 pet</option>
                  </select>
                </div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
              <Car className="h-4 w-4 mr-2" />
              Search Pet-Safe Vehicles
            </Button>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {carCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-green-50"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Car Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Pet-Friendly Vehicles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-600">
                    {car.category}
                  </Badge>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">{car.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{car.model}</h3>
                      <p className="text-gray-600">{car.company}</p>
                      <p className="text-sm text-gray-500">{car.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${car.price}</p>
                      <p className="text-sm text-gray-600">per day</p>
                      <p className="text-xs text-green-600">+ ${car.petFee} pet fee</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                    <div>
                      <Users className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                      <p>{car.seats} seats</p>
                    </div>
                    <div>
                      <Settings className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                      <p>{car.transmission}</p>
                    </div>
                    <div>
                      <Fuel className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                      <p>{car.fuel}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pet Features</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {car.petFeatures.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs justify-start">
                          <PawPrint className="h-2 w-2 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Vehicle Amenities</h4>
                    <div className="flex flex-wrap gap-1">
                      {car.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pet Policy</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      {car.restrictions.map((restriction, idx) => (
                        <p key={idx}>• {restriction}</p>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Reserve Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pet Safety Features */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pet Safety & Comfort Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {petSafetyFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
