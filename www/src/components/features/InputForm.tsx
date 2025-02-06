'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

interface InputFormProps {
  onCalculate: (results: any) => void
}

export default function InputForm({ onCalculate }: InputFormProps) {
  const [formData, setFormData] = useState({
    purchasePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '',
    monthlyRent: '',
    propertyTax: '',
    insurance: '',
    maintenance: '',
    vacancy: '',
    propertyManagement: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Calculate ROI
    const results = calculateROI(formData)
    onCalculate(results)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Investment Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Price
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter purchase price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment (%)
          </label>
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter down payment percentage"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter interest rate"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Rent
          </label>
          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter expected monthly rent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Calculate ROI
        </button>
      </form>
    </div>
  )
}

function calculateROI(data: any) {
  // Implement ROI calculation logic here
  // This is a placeholder implementation
  const purchasePrice = parseFloat(data.purchasePrice)
  const downPayment = (parseFloat(data.downPayment) / 100) * purchasePrice
  const monthlyRent = parseFloat(data.monthlyRent)
  
  const annualIncome = monthlyRent * 12
  const cashInvestment = downPayment
  const roi = (annualIncome / cashInvestment) * 100

  return {
    cashOnCashReturn: roi.toFixed(2),
    monthlyIncome: monthlyRent,
    totalInvestment: purchasePrice,
    downPayment: downPayment,
  }
} 