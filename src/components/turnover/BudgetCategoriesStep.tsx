import { TurnoverData, BUDGET_CATEGORIES } from '../../types/turnover'
import { DollarSign } from 'lucide-react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function BudgetCategoriesStep({ formData, updateFormData }: Props) {
  const updateCategory = (key: string, value: number) => {
    updateFormData({
      budgetCategories: {
        ...formData.budgetCategories,
        [key]: value,
      },
    })
  }

  const totalBudget = Object.values(formData.budgetCategories).reduce((sum, val) => sum + val, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BUDGET_CATEGORIES.map((category) => (
          <div key={category.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {category.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                value={formData.budgetCategories[category.key as keyof typeof formData.budgetCategories]}
                onChange={(e) => updateCategory(category.key, parseFloat(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Estimated Budget
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Sum of all category estimates
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Note:</strong> This is a rough estimate. Actual costs may vary based on move-out inspection findings.
          Enter $0 for categories that don't apply.
        </p>
      </div>
    </div>
  )
}

export default BudgetCategoriesStep
