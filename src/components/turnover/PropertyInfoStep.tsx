import { TurnoverData } from '../../types/turnover'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function PropertyInfoStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Property Address *
        </label>
        <input
          type="text"
          value={formData.propertyAddress}
          onChange={(e) => updateFormData({ propertyAddress: e.target.value })}
          placeholder="1109 King Charles First"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Property Name (Optional)
        </label>
        <input
          type="text"
          value={formData.propertyName}
          onChange={(e) => updateFormData({ propertyName: e.target.value })}
          placeholder="King Charles Property"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estimated Turnover Days *
          </label>
          <input
            type="number"
            value={formData.estimatedTurnoverDays}
            onChange={(e) => updateFormData({ estimatedTurnoverDays: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lease Length (months) *
          </label>
          <input
            type="number"
            value={formData.leaseLength}
            onChange={(e) => updateFormData({ leaseLength: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Turnover Date
          </label>
          <input
            type="date"
            value={formData.lastTurnoverDate}
            onChange={(e) => updateFormData({ lastTurnoverDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rent to SqFt Ratio
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.rentToSqftRatio}
            onChange={(e) => updateFormData({ rentToSqftRatio: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>Tip:</strong> Fill in all required fields (*) to ensure an accurate turnover report.
        </p>
      </div>
    </div>
  )
}

export default PropertyInfoStep
