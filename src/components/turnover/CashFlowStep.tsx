import { TurnoverData } from '../../types/turnover'
import { DollarSign, TrendingUp, Rocket } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function CashFlowStep({ formData, updateFormData }: Props) {
  const { cashFlow } = formData

  // Auto-calculate projected income (rental rate × lease length)
  useEffect(() => {
    if (cashFlow.estimatedRentalRate > 0) {
      const projectedIncome = cashFlow.estimatedRentalRate * formData.leaseLength
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
  }, [cashFlow.estimatedRentalRate, formData.leaseLength])

  const updateCashFlow = (field: keyof typeof cashFlow, value: number) => {
    updateFormData({
      cashFlow: {
        ...cashFlow,
        [field]: value,
      },
    })
  }

  const historicalNOI = cashFlow.historicalIncome - cashFlow.historicalExpense
  const projectedNOI = cashFlow.projectedIncome - cashFlow.projectedExpense
  const totalBudget = Object.values(formData.budgetCategories).reduce((sum, val) => sum + val, 0)
  const netGainAfterTurnover = projectedNOI - totalBudget

  return (
    <div className="space-y-8">
      {/* SECTION 1: Performance to Date */}
      <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance to Date
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Historical operating performance during current/past tenancy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                value={cashFlow.historicalIncome || ''}
                onChange={(e) => updateCashFlow('historicalIncome', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="77,373.27"
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
                value={cashFlow.historicalExpense || ''}
                onChange={(e) => updateCashFlow('historicalExpense', parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="12,369.48"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Net Operating Income (Historical)
            </span>
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${historicalNOI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Projected Future Performance */}
      <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <Rocket className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Projected Future Performance
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expected performance if you turnover and list (over {formData.leaseLength} months)
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estimated Monthly Rental Rate *
          </label>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              step="0.01"
              value={cashFlow.estimatedRentalRate || ''}
              onChange={(e) => updateCashFlow('estimatedRentalRate', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="2,500"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Projected over {formData.leaseLength} months (your specified lease term)
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Projected Gross Income ({formData.leaseLength} mo)
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${cashFlow.projectedIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Projected Operating Expense ({formData.leaseLength} mo)
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${cashFlow.projectedExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg border-2 border-teal-300 dark:border-teal-600">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-teal-900 dark:text-teal-200">
                Projected Net Operating Income
              </span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {totalBudget > 0 && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Less: Turnover Budget
                </span>
                <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                  -${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Net Gain After Turnover
                </span>
                <span className={`text-xl font-bold ${netGainAfterTurnover >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${netGainAfterTurnover.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> Projected expenses are calculated based on your historical expense percentage.
          This does not include owner-paid expenses such as taxes, insurance, or debt service.
        </p>
      </div>
    </div>
  )
}

export default CashFlowStep
