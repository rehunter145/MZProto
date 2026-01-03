import { TurnoverData } from '../../types/turnover'
import { DollarSign, TrendingUp, Calculator } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function CashFlowStep({ formData, updateFormData }: Props) {
  const { cashFlow } = formData

  // Auto-calculate projected income (rental rate × 24 months for 2-year lease)
  useEffect(() => {
    if (cashFlow.estimatedRentalRate > 0) {
      const projectedIncome = cashFlow.estimatedRentalRate * 24
      // Calculate projected expense as historical percentage
      const historicalExpensePercent = cashFlow.historicalIncome > 0
        ? cashFlow.historicalExpense / cashFlow.historicalIncome
        : 0.15 // Default to 15% if no historical data

      const projectedExpense = projectedIncome * historicalExpensePercent

      updateFormData({
        cashFlow: {
          ...cashFlow,
          projectedIncome,
          projectedExpense,
        },
      })
    }
  }, [cashFlow.estimatedRentalRate])

  const updateCashFlow = (field: keyof typeof cashFlow, value: number) => {
    updateFormData({
      cashFlow: {
        ...cashFlow,
        [field]: value,
      },
    })
  }

  const netOperatingIncome = cashFlow.historicalIncome - cashFlow.historicalExpense
  const projectedNOI = cashFlow.projectedIncome - cashFlow.projectedExpense

  return (
    <div className="space-y-8">
      {/* Historical Performance */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Historical Performance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Operating Income *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                value={cashFlow.historicalIncome}
                onChange={(e) => updateCashFlow('historicalIncome', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Operating Expense *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                value={cashFlow.historicalExpense}
                onChange={(e) => updateCashFlow('historicalExpense', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Net Operating Income (Historical)
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Projected Performance */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Projected Performance
        </h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estimated Rental Rate (Monthly) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              step="0.01"
              value={cashFlow.estimatedRentalRate}
              onChange={(e) => updateCashFlow('estimatedRentalRate', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Projected over 24 months (average 2-year lease term)
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                Projected Gross Income (24 mo)
              </span>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-200">
                ${cashFlow.projectedIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
                Projected Operating Expense (24 mo)
              </span>
              <span className="text-lg font-bold text-orange-900 dark:text-orange-200">
                ${cashFlow.projectedExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-900 dark:text-green-200">
                Projected Net Operating Income
              </span>
              <span className="text-2xl font-bold text-green-900 dark:text-green-200">
                ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>Note:</strong> Projected expenses are calculated based on your historical expense percentage.
          This does not include owner-paid expenses such as taxes, insurance, or debt service.
        </p>
      </div>
    </div>
  )
}

export default CashFlowStep
