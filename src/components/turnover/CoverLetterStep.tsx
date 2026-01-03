import { TurnoverData, DEFAULT_COVER_LETTER } from '../../types/turnover'
import { FileText, RotateCcw } from 'lucide-react'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

function CoverLetterStep({ formData, updateFormData }: Props) {
  const resetToDefault = () => {
    updateFormData({ coverLetter: DEFAULT_COVER_LETTER })
  }

  const wordCount = formData.coverLetter.trim().split(/\s+/).length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Cover Letter Message
            </h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            This message will appear at the beginning of your turnover report.
          </p>
        </div>
        <button
          onClick={resetToDefault}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                   transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </button>
      </div>

      <div>
        <textarea
          value={formData.coverLetter}
          onChange={(e) => updateFormData({ coverLetter: e.target.value })}
          rows={18}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   font-mono text-sm leading-relaxed"
          placeholder="Enter your cover letter message..."
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {wordCount} words
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tip: Keep it professional and concise
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
            What to Include
          </h5>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Property condition summary</li>
            <li>• Turnover budget overview</li>
            <li>• Request for approval</li>
            <li>• Next steps</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h5 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">
            Best Practices
          </h5>
          <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
            <li>• Be clear and direct</li>
            <li>• Focus on value & ROI</li>
            <li>• Set expectations</li>
            <li>• Provide transparency</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
        <p className="text-sm text-purple-900 dark:text-purple-200">
          <strong>Remember:</strong> This message helps frame the conversation with the property owner.
          Emphasize the investment value and long-term cash flow benefits of proper turnover maintenance.
        </p>
      </div>
    </div>
  )
}

export default CoverLetterStep
