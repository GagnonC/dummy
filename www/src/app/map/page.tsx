'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import PropertyList from '@/components/features/PropertyList'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/features/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function MapPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold">Property Map</h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <PropertyList
            onSelectProperty={setSelectedProperty}
            selectedProperty={selectedProperty}
          />
        </div>
        <div className="lg:col-span-8">
          <MapComponent
            selectedProperty={selectedProperty}
            onSelectProperty={setSelectedProperty}
          />
        </div>
      </div>
    </div>
  )
}

export interface Property {
  id: string
  title: string
  address: string
  price: number
  coordinates: {
    lat: number
    lng: number
  }
  roi: number
} 