import { CMAData, RATE_ESTIMATE_EXPLANATION } from '../../types/cma'
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

function CMARentEstimateStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      {/* Rate Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Starting Rate */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Starting Rate
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Initial asking rent
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <DollarSign className="h-6 w-6 text-teal-500" />
            </div>
            <input
              type="number"
              step="25"
              value={formData.startingRate || ''}
              onChange={(e) => updateFormData({ startingRate: parseFloat(e.target.value) || 0 })}
              placeholder="3,000"
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-teal-300 dark:border-teal-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-xs text-teal-700 dark:text-teal-300 mt-2">
            The higher rate we start with. We recommend reducing systematically.
          </p>
        </div>

        {/* Low Rate */}
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Low Rate
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Floor/minimum rent
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <DollarSign className="h-6 w-6 text-orange-500" />
            </div>
            <input
              type="number"
              step="25"
              value={formData.lowRate || ''}
              onChange={(e) => updateFormData({ lowRate: parseFloat(e.target.value) || 0 })}
              placeholder="2,750"
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-orange-300 dark:border-orange-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
            The lowest we'd recommend going before reassessing.
          </p>
        </div>
      </div>

      {/* Reduction Strategy Info */}
      <div className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/10 dark:to-orange-900/10 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Our Recommended Strategy
        </h4>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
            Reduce 3% every 7-10 days
          </span>
          <span className="text-gray-500 dark:text-gray-400">or</span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
            $25 every 7-14 days
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This method moves the listing to the top of most searches, emails hundreds of people to let them know,
          and dramatically boosts traffic in most cases. It's a professional and highly effective method that
          rarely fails to perfectly balance rate and vacancy.
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          About This Estimate
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
          {RATE_ESTIMATE_EXPLANATION}
        </p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Quote Validity:</strong> This estimate expires after 30 days. If you opt for our recommendation,
          we guarantee we can achieve this rate range, or you can leave with no penalty after allowing us at least
          30 days to market at the low range rate.
        </p>
      </div>
    </div>
  )
}

export default CMARentEstimateStep
