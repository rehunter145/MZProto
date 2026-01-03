import { CMAData } from '../../types/cma'
import { MapPin, Calendar, Home } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

function CMAPropertyStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg mb-6">
        <p className="text-sm text-teal-900 dark:text-teal-200">
          Enter the property details and your estimated listing date. This information will appear on the rental estimate report.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-500" />
            Property Address *
          </div>
        </label>
        <input
          type="text"
          value={formData.propertyAddress}
          onChange={(e) => updateFormData({ propertyAddress: e.target.value })}
          placeholder="1112 Baileys Chapel Rd, Advance, NC 27006"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-teal-500" />
            Property Name (Optional)
          </div>
        </label>
        <input
          type="text"
          value={formData.propertyName}
          onChange={(e) => updateFormData({ propertyName: e.target.value })}
          placeholder="Baileys Chapel Property"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            Estimated Listing Date *
          </div>
        </label>
        <input
          type="date"
          value={formData.estimatedListingDate}
          onChange={(e) => updateFormData({ estimatedListingDate: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          When do you expect to list this property for rent?
        </p>
      </div>

      <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <p className="text-sm text-orange-900 dark:text-orange-200">
          <strong>Tip:</strong> The listing date helps us factor in seasonal market conditions for your rental estimate.
        </p>
      </div>
    </div>
  )
}

export default CMAPropertyStep
