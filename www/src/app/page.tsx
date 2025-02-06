import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, Map, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real Estate ROI Calculator
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Make informed investment decisions with our comprehensive ROI calculator and interactive map visualization.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/800/600"
            alt="Real Estate Investment"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: Calculator,
    title: 'ROI Calculator',
    description: 'Calculate potential returns on your real estate investments with our comprehensive tool.',
  },
  {
    icon: Map,
    title: 'Interactive Map',
    description: 'Visualize property locations and market data with our interactive map interface.',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Generate detailed PDF reports with complete analysis of your investment calculations.',
  },
];
