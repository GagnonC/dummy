'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ROIChartProps {
  monthlyData: {
    income: number[]
    expenses: number[]
  }
}

export default function ROIChart({ monthlyData }: ROIChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Cash Flow',
      },
    },
  }

  const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      },
      {
        label: 'Expenses',
        data: monthlyData.expenses,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  }

  return <Line options={options} data={data} />
} 