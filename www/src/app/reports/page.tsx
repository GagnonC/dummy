'use client'

import { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import ReportsList from '@/components/features/ReportsList'
import ReportFilters from '@/components/features/ReportFilters'

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    propertyType: 'all',
    minROI: '',
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold">Investment Reports</h1>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ReportFilters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="lg:col-span-8">
          <ReportsList filters={filters} />
        </div>
      </div>
    </div>
  )
} 