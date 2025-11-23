import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, Car as CarIcon, MapPin, Users, Fuel, Settings } from 'lucide-react';
import useStore from '../store/useStore';
import logo from '../assets/logos/final logo EliteDrive.png';

const CarListing = () => {
  const { cars } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    transmission: '',
    fuelType: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'featured',
  });

  const filteredCars = cars.filter(car => {
    if (car.status !== 'approved' || !car.available) return false;
    
    if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.type && car.type !== filters.type) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minPrice && car.dailyRate < Number(filters.minPrice)) return false;
    if (filters.maxPrice && car.dailyRate > Number(filters.maxPrice)) return false;
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.dailyRate - b.dailyRate;
      case 'price-high':
        return b.dailyRate - a.dailyRate;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-2">
            Browse <span className="text-coral">Cars</span>
          </h1>
          <p className="text-gray-600">Find the perfect vehicle for your journey in Biliran</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by car name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Car Type */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="MPV">MPV</option>
                <option value="Van">Van</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Transmission</label>
              <select
                value={filters.transmission}
                onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              >
                <option value="">All</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Fuel Type</label>
              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              >
                <option value="">All</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Location</label>
              <input
                type="text"
                placeholder="e.g. Naval"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Min Price</label>
              <input
                type="number"
                placeholder="₱0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-charcoal">{filteredCars.length}</span> cars
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <Link
              key={car.id}
              to={`/cars/${car.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-charcoal shadow-lg">
                  ₱{car.dailyRate}/day
                </div>
                <div className="absolute top-4 left-4 bg-charcoal text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {car.type}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-poppins text-xl font-semibold text-charcoal">{car.name}</h3>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-coral" />
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-coral" />
                    <span>{car.capacity} seats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-coral" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-coral" />
                    <span>{car.fuelType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-coral text-coral" />
                    <span className="font-semibold text-charcoal">{car.rating}</span>
                    <span className="text-gray-500 text-sm">({car.totalReviews})</span>
                  </div>
                  <span className="text-coral font-semibold hover:underline">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <img src={logo} alt="no cars" className="w-20 h-20 rounded-full object-contain mx-auto mb-4" />
            <h3 className="font-poppins text-2xl font-semibold text-charcoal mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your filters to find more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListing;
