import { CMAData, calculateIncomeProjections, NET_INCOME_EXPLANATION, HELPFUL_LINKS } from '../../types/cma'
import { DollarSign, TrendingUp, Calculator, ExternalLink } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

function CMANetIncomeStep({ formData }: Props) {
  const projections = calculateIncomeProjections(formData.startingRate, formData.lowRate)

  return (
    <div className="space-y-6">
      {/* Big Picture Header */}
      <div className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
        <h4 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">
          Net Income Big Picture
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Estimated Annual Potential Rent Range
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">High Range</p>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              ${projections.lowRangeIncome.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              (Low Rate × 11 months)
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Low Range</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              ${projections.highRangeIncome.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              (Starting Rate × 9 months)
            </p>
          </div>
        </div>
      </div>

      {/* Income Calculations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-teal-500" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Income Calculations
          </h4>
        </div>

        <div className="space-y-4">
          {/* Starting Rate Calculation */}
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                ${formData.startingRate.toLocaleString()}
              </span>
              <span className="text-gray-600 dark:text-gray-400">Starting Rate</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Income if Occupied 9 out of 12 Months =
              </p>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                ${projections.highRangeIncome.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">NOI</span>
              </p>
            </div>
            <p className="text-xs text-teal-700 dark:text-teal-300 mt-2">
              We recommend reducing if even just $25, systematically every 7-14 days
            </p>
          </div>

          {/* Low Rate Calculation */}
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                ${formData.lowRate.toLocaleString()}
              </span>
              <span className="text-gray-600 dark:text-gray-400">Low Rate</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Income if Occupied 11 out of 12 Months =
              </p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                ${projections.lowRangeIncome.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">NOI</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            <TrendingUp className="w-4 h-4 inline mr-1 text-teal-500" />
            Maximum Net Operating Income (NOI) is the Target
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            NOI is based on costs we cover only, excluding taxes, HOA dues, etc.
          </p>
        </div>
      </div>

      {/* Cash Flow Equation */}
      <div className="bg-slate-600 dark:bg-slate-800 rounded-lg p-6 text-white">
        <h4 className="text-lg font-semibold text-orange-300 mb-3">
          Customer Cash Flow Equation (Bottom-Line Results)
        </h4>
        <p className="text-slate-200 font-mono text-sm">
          Cash in Hand = Rent Collected − Unrented Days (Vacancy) − Repair & Upkeep Costs − Fees
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {NET_INCOME_EXPLANATION}
        </p>
      </div>

      {/* Helpful Links */}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 border border-teal-200 dark:border-teal-700">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Helpful Financial Calculators
        </h4>
        <div className="space-y-2">
          <a
            href={HELPFUL_LINKS.vacancyCalculator}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Rental Vacancy Cost Calculator: Annual Rental Cash Flow & Multi-Year Analysis
          </a>
          <a
            href={HELPFUL_LINKS.cashFlowCalculator}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Rental Investment Cash Flow Calculator: Quick Monthly Income & Expense Analysis
          </a>
        </div>
      </div>
    </div>
  )
}

export default CMANetIncomeStep
