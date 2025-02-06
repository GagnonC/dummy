'use client'

import { DollarSign, MapPin, TrendingUp } from 'lucide-react'
import type { Property } from '@/app/map/page'

interface PropertyListProps {
  selectedProperty: Property | null
  onSelectProperty: (property: Property) => void
}

export default function PropertyList({
  selectedProperty,
  onSelectProperty,
}: PropertyListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        {sampleProperties.map(property => (
          <div
            key={property.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedProperty?.id === property.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => onSelectProperty(property)}
          >
            <h3 className="font-semibold mb-2">{property.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{property.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>${property.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{property.roi}% ROI</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    address: '123 Main St, New York, NY',
    price: 500000,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    roi: 8.5,
  },
  {
    id: '2',
    title: 'Downtown Condo',
    address: '456 Park Ave, New York, NY',
    price: 750000,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    roi: 7.2,
  },
  // Add more sample properties as needed
] 