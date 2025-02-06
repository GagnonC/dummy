'use client'

import { Filter } from 'lucide-react'

interface ReportFiltersProps {
  filters: {
    dateRange: string
    propertyType: string
    minROI: string
  }
  onFilterChange: (filters: any) => void
}

export default function ReportFilters({ filters, onFilterChange }: ReportFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    onFilterChange({
      ...filters,
      [name]: value,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="input-field"
          >
            <option value="all">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum ROI (%)
          </label>
          <input
            type="number"
            name="minROI"
            value={filters.minROI}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter minimum ROI"
          />
        </div>
      </div>
    </div>
  )
} 