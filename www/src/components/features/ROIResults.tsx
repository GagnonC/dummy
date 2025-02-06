'use client'

import { PieChart, DollarSign, TrendingUp, Building } from 'lucide-react'

interface ROIResultsProps {
  results: {
    cashOnCashReturn: string
    monthlyIncome: number
    totalInvestment: number
    downPayment: number
  } | null
}

export default function ROIResults({ results }: ROIResultsProps) {
  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Enter investment details to see ROI calculations
        </p>
      </div>
    )
  }

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Cash on Cash Return',
      value: `${results.cashOnCashReturn}%`,
      color: 'text-green-600',
    },
    {
      icon: DollarSign,
      label: 'Monthly Income',
      value: `$${results.monthlyIncome.toLocaleString()}`,
      color: 'text-blue-600',
    },
    {
      icon: Building,
      label: 'Total Investment',
      value: `$${results.totalInvestment.toLocaleString()}`,
      color: 'text-purple-600',
    },
    {
      icon: PieChart,
      label: 'Down Payment',
      value: `$${results.downPayment.toLocaleString()}`,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Investment Analysis</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <p className="text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 