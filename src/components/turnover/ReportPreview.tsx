import { TurnoverData, DISCLAIMER_TEXT, BUDGET_CATEGORIES } from '../../types/turnover'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, ExternalLink } from 'lucide-react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

function ReportPreview({ formData }: Props) {
  const totalBudget = Object.values(formData.budgetCategories).reduce((sum, val) => sum + val, 0)
  const netOperatingIncome = formData.cashFlow.historicalIncome - formData.cashFlow.historicalExpense
  const projectedNOI = formData.cashFlow.projectedIncome - formData.cashFlow.projectedExpense

  // Prepare chart data
  const cashFlowData = [
    {
      name: 'Income',
      Historical: formData.cashFlow.historicalIncome,
      Projected: formData.cashFlow.projectedIncome,
    },
    {
      name: 'Expense',
      Historical: formData.cashFlow.historicalExpense,
      Projected: formData.cashFlow.projectedExpense,
    },
  ]

  const budgetPieData = BUDGET_CATEGORIES.map(cat => ({
    name: cat.label,
    value: formData.budgetCategories[cat.key as keyof typeof formData.budgetCategories],
  })).filter(item => item.value > 0)

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Move-Out Turnover Report</h1>
        <p className="text-blue-100 text-lg">{formData.propertyAddress || 'Property Address'}</p>
        {formData.propertyName && (
          <p className="text-blue-200 mt-1">{formData.propertyName}</p>
        )}
      </div>

      {/* Property Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Property Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Turnover</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formData.estimatedTurnoverDays} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lease Length</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formData.leaseLength} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rent/SqFt</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formData.rentToSqftRatio.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rental Rate</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${formData.cashFlow.estimatedRentalRate.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Cash Flow Charts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cash Flow Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Historical" fill="#3b82f6" />
            <Bar dataKey="Projected" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Net Operating Income (Historical)</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Projected NOI (24 mo)</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Turnover Budget Estimate
        </h3>
        {budgetPieData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="mt-6 space-y-2">
          {BUDGET_CATEGORIES.map(cat => {
            const value = formData.budgetCategories[cat.key as keyof typeof formData.budgetCategories]
            if (value === 0) return null
            return (
              <div key={cat.key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">{cat.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )
          })}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300 dark:border-gray-600">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total Budget</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Inspection Photos */}
      {(formData.photoLinks.inspection1 || formData.photoLinks.inspection2 || formData.photoLinks.moveOut) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inspection Photos
          </h3>
          <div className="space-y-3">
            {formData.photoLinks.inspection1 && (
              <a
                href={formData.photoLinks.inspection1}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Inspection #1 (While Occupied)
              </a>
            )}
            {formData.photoLinks.inspection2 && (
              <a
                href={formData.photoLinks.inspection2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Inspection #2 (While Occupied)
              </a>
            )}
            {formData.photoLinks.moveOut && (
              <a
                href={formData.photoLinks.moveOut}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                Move-Out Inspection Photos
              </a>
            )}
          </div>
        </div>
      )}

      {/* Cover Letter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cover Letter
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {formData.coverLetter}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 p-6">
        <h4 className="text-md font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          Important Disclaimers
        </h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-300 whitespace-pre-wrap">
          {DISCLAIMER_TEXT}
        </p>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg
                   font-semibold transition-colors text-lg"
          onClick={() => alert('PDF export coming soon!')}
        >
          <Download className="w-5 h-5" />
          Export to PDF
        </button>
      </div>
    </div>
  )
}

export default ReportPreview
