import { CMAData } from '../../types/cma'
import { FileText, RefreshCw } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

const DEFAULT_SUMMARY = `Based on our analysis of comparable properties in the area and current market conditions, we recommend listing this property at the starting rate with systematic reductions every 7-10 days until it rents.

The local rental market has been competitive, with most properties in this price range seeing good activity when priced appropriately. Properties that check all the boxes - good condition, updated finishes, desirable location - tend to perform well.

We are confident in our ability to rent this property within the estimated rate range. Our marketing approach includes syndication to 30+ rental listing sites including Zillow (which accounts for 70%+ of rental searches), professional photos, and responsive showing coordination.`

function CMASummaryStep({ formData, updateFormData }: Props) {
  const resetSummary = () => {
    updateFormData({ summaryFindings: DEFAULT_SUMMARY })
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
        <p className="text-sm text-teal-900 dark:text-teal-200">
          Add your professional summary and findings about this property. This will appear on the final report
          and should provide context for your rental rate recommendation.
        </p>
      </div>

      {/* Quick Stats Recap */}
      <div className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
          Rate Estimate Recap
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Starting Rate</p>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
              ${formData.startingRate.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Low Rate</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              ${formData.lowRate.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">High Range Annual</p>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
              ${(formData.lowRate * 11).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Low Range Annual</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              ${(formData.startingRate * 9).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="w-4 h-4 text-teal-500" />
            Summary of Findings
          </label>
          <button
            onClick={resetSummary}
            className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            Use Default Template
          </button>
        </div>
        <textarea
          value={formData.summaryFindings}
          onChange={(e) => updateFormData({ summaryFindings: e.target.value })}
          rows={12}
          placeholder="Enter your professional assessment and summary of findings..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This summary will appear in the final report. Include any property-specific notes or market insights.
        </p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Tip:</strong> Mention specific property features, market conditions, or comparable properties
          that influenced your rate recommendation. Property owners appreciate detailed context.
        </p>
      </div>
    </div>
  )
}

export default CMASummaryStep
