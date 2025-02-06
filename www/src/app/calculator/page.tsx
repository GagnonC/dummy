'use client'

import { useState } from 'react'
import InputForm from '@/components/features/InputForm'
import ROIResults from '@/components/features/ROIResults'

export default function CalculatorPage() {
  const [results, setResults] = useState(null)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <InputForm onCalculate={setResults} />
        </div>
        <div className="lg:col-span-7">
          <ROIResults results={results} />
        </div>
      </div>
    </div>
  )
} 