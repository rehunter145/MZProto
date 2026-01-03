import { CMAData, DEFAULT_SEASONAL_DESCRIPTION } from '../../types/cma'
import { Calendar, RefreshCw, Leaf } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

function CMASeasonalStep({ formData, updateFormData }: Props) {
  const updateSeasonalAdjustment = (field: keyof typeof formData.seasonalAdjustment, value: string) => {
    updateFormData({
      seasonalAdjustment: {
        ...formData.seasonalAdjustment,
        [field]: value,
      },
    })
  }

  const resetDescription = () => {
    updateSeasonalAdjustment('description', DEFAULT_SEASONAL_DESCRIPTION)
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
            <Leaf className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Seasonal Adjustments
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Market conditions that affect rental pricing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-100 dark:border-teal-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Estimated Listing Date</p>
            <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {formatDate(formData.estimatedListingDate)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Next Major Seasonal Shift</p>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {formatDate(formData.seasonalAdjustment.nextShiftDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Next Shift Date Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            Next Major Seasonal Shift Date
          </div>
        </label>
        <input
          type="date"
          value={formData.seasonalAdjustment.nextShiftDate}
          onChange={(e) => updateSeasonalAdjustment('nextShiftDate', e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          When is the next significant market shift expected? (Usually mid-October or late February)
        </p>
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Seasonal Market Description
          </label>
          <button
            onClick={resetDescription}
            className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            Reset to Default
          </button>
        </div>
        <textarea
          value={formData.seasonalAdjustment.description}
          onChange={(e) => updateSeasonalAdjustment('description', e.target.value)}
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="Describe the current seasonal market conditions..."
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This description will appear in the report to explain market conditions to the property owner.
        </p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Note:</strong> Rental markets typically see peaks in late spring/early summer and troughs in winter.
          Adjust the description based on current market conditions and your listing timeline.
        </p>
      </div>
    </div>
  )
}

export default CMASeasonalStep
