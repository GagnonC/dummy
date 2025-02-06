import jsPDF from 'jspdf'
import { Property } from '@/app/map/page'

interface GeneratePDFProps {
  property: Property
  financials: {
    purchasePrice: number
    downPayment: number
    monthlyRent: number
    roi: number
    expenses: {
      mortgage: number
      taxes: number
      insurance: number
      maintenance: number
    }
  }
}

export function generatePropertyReport({ property, financials }: GeneratePDFProps) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(20)
  doc.text('Property Investment Report', pageWidth / 2, 20, { align: 'center' })
  
  // Property Details
  doc.setFontSize(16)
  doc.text('Property Details', 20, 40)
  doc.setFontSize(12)
  doc.text(`Property: ${property.title}`, 20, 55)
  doc.text(`Address: ${property.address}`, 20, 65)
  doc.text(`Price: $${financials.purchasePrice.toLocaleString()}`, 20, 75)
  
  // Financial Summary
  doc.setFontSize(16)
  doc.text('Financial Summary', 20, 95)
  doc.setFontSize(12)
  doc.text(`Down Payment: $${financials.downPayment.toLocaleString()}`, 20, 110)
  doc.text(`Monthly Rent: $${financials.monthlyRent.toLocaleString()}`, 20, 120)
  doc.text(`ROI: ${financials.roi}%`, 20, 130)
  
  // Monthly Expenses
  doc.setFontSize(16)
  doc.text('Monthly Expenses', 20, 150)
  doc.setFontSize(12)
  doc.text(`Mortgage: $${financials.expenses.mortgage.toLocaleString()}`, 20, 165)
  doc.text(`Property Taxes: $${financials.expenses.taxes.toLocaleString()}`, 20, 175)
  doc.text(`Insurance: $${financials.expenses.insurance.toLocaleString()}`, 20, 185)
  doc.text(`Maintenance: $${financials.expenses.maintenance.toLocaleString()}`, 20, 195)
  
  // Footer
  doc.setFontSize(10)
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  )
  
  return doc
} 