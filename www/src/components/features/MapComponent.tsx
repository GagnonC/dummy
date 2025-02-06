'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import type { Property } from '@/app/map/page'

/// <reference types="@types/google.maps" />

interface MapComponentProps {
  selectedProperty: Property | null
  onSelectProperty: (property: Property) => void
}

export default function MapComponent({
  selectedProperty,
  onSelectProperty,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({})

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    })

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
          zoom: 12,
          styles: mapStyles,
        })
        mapInstanceRef.current = map

        // Add markers for sample properties
        sampleProperties.forEach(property => {
          const marker = new google.maps.Marker({
            position: property.coordinates,
            map,
            title: property.title,
          })

          marker.addListener('click', () => {
            onSelectProperty(property)
          })

          markersRef.current[property.id] = marker
        })
      }
    })
  }, [onSelectProperty])

  // Update marker styles when a property is selected
  useEffect(() => {
    Object.values(markersRef.current).forEach(marker => {
      marker.setIcon(undefined)
    })

    if (selectedProperty && markersRef.current[selectedProperty.id]) {
      markersRef.current[selectedProperty.id].setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#2563EB',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      })
    }
  }, [selectedProperty])

  return (
    <div ref={mapRef} className="h-[600px] rounded-lg overflow-hidden" />
  )
}

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9c9c9' }],
  },
  // Add more custom styles as needed
]

const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    address: '123 Main St, New York, NY',
    price: 500000,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    roi: 8.5,
  },
  // Add more sample properties
] 