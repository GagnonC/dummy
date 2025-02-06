'use client'

import { Download, Calendar, Building, TrendingUp } from 'lucide-react'
import { generatePropertyReport } from '@/utils/pdfGenerator'

interface Report {
  id: string
  title: string
  date: string
  propertyType: string
  roi: number
  status: 'completed' | 'pending'
}

interface ReportsListProps {
  filters: {
    dateRange: string
    propertyType: string
    minROI: string
  }
}

export default function ReportsList({ filters }: ReportsListProps) {
  const filteredReports = sampleReports.filter(report => {
    if (filters.propertyType !== 'all' && report.propertyType !== filters.propertyType) {
      return false
    }
    if (filters.minROI && report.roi < parseFloat(filters.minROI)) {
      return false
    }
    return true
  })

  const handleDownload = (report: Report) => {
    const financials = {
      purchasePrice: 500000,
      downPayment: 100000,
      monthlyRent: 3000,
      roi: report.roi,
      expenses: {
        mortgage: 2000,
        taxes: 500,
        insurance: 200,
        maintenance: 300,
      },
    }
    
    const property = {
      id: report.id,
      title: report.title,
      address: '123 Main St',
      price: 500000,
      coordinates: { lat: 40.7128, lng: -74.0060 },
      roi: report.roi,
    }

    const doc = generatePropertyReport({ property, financials })
    doc.save(`${report.title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
  }

  return (
    <div className="space-y-4">
      {filteredReports.map(report => (
        <div
          key={report.id}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{report.title}</h3>
            <button 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => handleDownload(report)}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{report.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="capitalize">{report.propertyType}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{report.roi}% ROI</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Modern Apartment Investment Analysis',
    date: '2024-02-15',
    propertyType: 'apartment',
    roi: 8.5,
    status: 'completed',
  },
  {
    id: '2',
    title: 'Downtown Condo ROI Report',
    date: '2024-02-10',
    propertyType: 'condo',
    roi: 7.2,
    status: 'completed',
  },
  {
    id: '3',
    title: 'Suburban House Evaluation',
    date: '2024-02-05',
    propertyType: 'house',
    roi: 6.8,
    status: 'completed',
  },
] 