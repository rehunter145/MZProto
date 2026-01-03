import { TurnoverData } from '../../types/turnover'
import { Link2, Image, Camera } from 'lucide-react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function PhotoLinksStep({ formData, updateFormData }: Props) {
  const updatePhotoLink = (field: keyof typeof formData.photoLinks, value: string) => {
    updateFormData({
      photoLinks: {
        ...formData.photoLinks,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg mb-6">
        <p className="text-sm text-orange-900 dark:text-orange-200">
          Add links to inspection photos to help owners understand the turnover scope. Links will be included in the final report.
        </p>
      </div>

      {/* Inspection 1 - While Occupied */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Image className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Inspection #1 (While Occupied)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Photos from most recent occupied inspection
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={formData.photoLinks.inspection1}
            onChange={(e) => updatePhotoLink('inspection1', e.target.value)}
            placeholder="https://www.dropbox.com/..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {formData.photoLinks.inspection1 && (
          <a
            href={formData.photoLinks.inspection1}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            View Photos →
          </a>
        )}
      </div>

      {/* Inspection 2 - While Occupied */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Image className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Inspection #2 (While Occupied)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Photos from previous occupied inspection
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={formData.photoLinks.inspection2}
            onChange={(e) => updatePhotoLink('inspection2', e.target.value)}
            placeholder="https://www.dropbox.com/..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {formData.photoLinks.inspection2 && (
          <a
            href={formData.photoLinks.inspection2}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View Photos →
          </a>
        )}
      </div>

      {/* Move Out Inspection */}
      <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-teal-200 dark:border-teal-700">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
            <Camera className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Move Out Inspection Photos
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Photos documenting current condition after move-out
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={formData.photoLinks.moveOut}
            onChange={(e) => updatePhotoLink('moveOut', e.target.value)}
            placeholder="https://www.dropbox.com/..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        {formData.photoLinks.moveOut && (
          <a
            href={formData.photoLinks.moveOut}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            View Move-Out Photos →
          </a>
        )}
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Tip:</strong> All photo link fields are optional. Only sections with valid links will appear in the final report.
        </p>
      </div>
    </div>
  )
}

export default PhotoLinksStep
