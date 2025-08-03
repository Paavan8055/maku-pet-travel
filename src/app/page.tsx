import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  MapPin,
  Calendar,
  Users,
  PawPrint,
  Zap,
  Heart,
  Star,
  Clock,
  TrendingUp,
  Wifi,
  Bell,
  Shield,
  Search,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Plane,
  Car,
  Package,
  Hotel
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Enhanced Header with Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-xl">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  MAKU
                </h1>
                <p className="text-sm text-gray-600">Pet-Friendly Travel</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Travel</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href="/stays" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-50 to-pink-100 p-6 no-underline outline-none focus:shadow-md">
                            <Hotel className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Pet-Friendly Stays
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Hotels, B&Bs, and vacation rentals that welcome pets
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <NavigationMenuLink asChild>
                        <Link href="/flights" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Flights</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pet-friendly airline options and travel policies
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/cars" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Car Rentals</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pet-safe vehicles for road trips
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/packages" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Packages</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Complete pet-friendly vacation packages
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/inventory" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>Live Inventory</span>
                    </div>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* User Menu & Mobile Navigation */}
            <div className="flex items-center space-x-4">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hidden md:flex">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <Link href="/stays" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                      <Hotel className="h-5 w-5" />
                      <span>Stays</span>
                    </Link>
                    <Link href="/flights" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                      <Plane className="h-5 w-5" />
                      <span>Flights</span>
                    </Link>
                    <Link href="/cars" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                      <Car className="h-5 w-5" />
                      <span>Cars</span>
                    </Link>
                    <Link href="/packages" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                      <Package className="h-5 w-5" />
                      <span>Packages</span>
                    </Link>
                    <Separator />
                    <Link href="/inventory" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                      <Zap className="h-5 w-5" />
                      <span>Live Inventory</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Travel with Your
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                {" "}Best Friend
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover pet-friendly hotels, flights, and experiences with real-time availability
              and pricing powered by advanced booking technology.
            </p>
          </div>

          {/* Real-Time Inventory Banner */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Live Hotel Inventory</h3>
                      <p className="text-gray-600">Real-time availability and pricing updates every 30 seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800">
                      <Wifi className="h-3 w-3 mr-1" />
                      Live Updates
                    </Badge>
                    <Link href="/inventory">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Live Inventory
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Search Section with Tabs */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <Tabs defaultValue="stays" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="stays" className="flex items-center space-x-2">
                    <Hotel className="h-4 w-4" />
                    <span>Stays</span>
                  </TabsTrigger>
                  <TabsTrigger value="flights" className="flex items-center space-x-2">
                    <Plane className="h-4 w-4" />
                    <span>Flights</span>
                  </TabsTrigger>
                  <TabsTrigger value="cars" className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Cars</span>
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>Packages</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stays">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        Where to explore?
                      </Label>
                      <Input placeholder="Any amazing destination..." />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Check in
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Check out
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        Guests & Pets
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests & pets" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-guests-1-pet">2 guests, 1 pet</SelectItem>
                          <SelectItem value="1-guest-1-pet">1 guest, 1 pet</SelectItem>
                          <SelectItem value="2-guests-2-pets">2 guests, 2 pets</SelectItem>
                          <SelectItem value="4-guests-1-pet">4 guests, 1 pet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="flights">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        From
                      </Label>
                      <Input placeholder="Departure city" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        To
                      </Label>
                      <Input placeholder="Destination city" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Departure
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        Passengers & Pets
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers & pets" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-passenger-1-pet">1 passenger, 1 pet</SelectItem>
                          <SelectItem value="2-passengers-1-pet">2 passengers, 1 pet</SelectItem>
                          <SelectItem value="1-passenger-2-pets">1 passenger, 2 pets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cars">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        Pick-up location
                      </Label>
                      <Input placeholder="Where to pick up?" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Pick-up date
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Return date
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Car className="h-4 w-4 mr-2" />
                        Vehicle type
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact (Pet-friendly)</SelectItem>
                          <SelectItem value="suv">SUV (Large pets)</SelectItem>
                          <SelectItem value="van">Van (Multiple pets)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="packages">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        Destination
                      </Label>
                      <Input placeholder="Where to explore?" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Travel dates
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Package className="h-4 w-4 mr-2" />
                        Package type
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select package type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adventure">Adventure with pets</SelectItem>
                          <SelectItem value="relaxation">Relaxation retreat</SelectItem>
                          <SelectItem value="city-break">City break</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-4 text-lg font-semibold">
                  <Search className="h-5 w-5 mr-2" />
                  Search Awesome Pet-Friendly Travel!
                </Button>

                <Separator className="my-4" />

                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Everyone welcome
                  </span>
                  <span className="flex items-center">
                    <PawPrint className="h-4 w-4 mr-1" />
                    Pet-friendly options available
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Best prices guaranteed
                  </span>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real-Time Features Section, Quick Stats, and Footer */}
      {/* Real-Time Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Real-Time Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of pet-friendly travel with live inventory,
              instant pricing, and smart notifications.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="bg-blue-500 p-3 rounded-full w-fit">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Live Inventory Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Real-time hotel availability and pricing powered by Amadeus API.
                  See exactly what's available right now.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Updates every 30 seconds
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                    Price trend indicators
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Verified availability
                  </li>
                </ul>
                <div className="mt-4">
                  <Link href="/inventory">
                    <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                      View Live Inventory
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="bg-purple-500 p-3 rounded-full w-fit">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Smart Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Get instant alerts for price drops, low availability, and special
                  pet-friendly deals.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-purple-500" />
                    Push notifications
                  </li>
                  <li className="flex items-center">
                    <PawPrint className="h-4 w-4 mr-2 text-purple-500" />
                    Pet-specific alerts
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                    Price drop alerts
                  </li>
                </ul>
                <div className="mt-4">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                    Enable Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="bg-green-500 p-3 rounded-full w-fit">
                  <PawPrint className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Pet-Optimized Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Advanced filters for pet policies, amenities, and real-time
                  pet availability at hotels.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Search className="h-4 w-4 mr-2 text-green-500" />
                    Smart pet filters
                  </li>
                  <li className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-green-500" />
                    Pet amenity matching
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-green-500" />
                    Verified pet policies
                  </li>
                </ul>
                <div className="mt-4">
                  <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                    Try Pet Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-pink-600 mb-2">50,000+</div>
              <div className="text-gray-600">Pet-Friendly Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">Real-Time</div>
              <div className="text-gray-600">Live Inventory</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">30s</div>
              <div className="text-gray-600">Update Frequency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-xl">
                  <PawPrint className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MAKU</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for pet-friendly travel with real-time inventory and smart booking technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stays" className="hover:text-white">Pet-Friendly Hotels</Link></li>
                <li><Link href="/flights" className="hover:text-white">Pet Travel Flights</Link></li>
                <li><Link href="/cars" className="hover:text-white">Pet-Safe Car Rentals</Link></li>
                <li><Link href="/packages" className="hover:text-white">Travel Packages</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/inventory" className="hover:text-white">Live Inventory</Link></li>
                <li><Link href="#" className="hover:text-white">Smart Notifications</Link></li>
                <li><Link href="#" className="hover:text-white">API Integration</Link></li>
                <li><Link href="#" className="hover:text-white">Real-Time Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Pet Travel Guide</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Travel Insurance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 MAKU. All rights reserved. Powered by real-time technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
