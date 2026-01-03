import { CMAData } from '../../types/cma'
import { Image, Link2, ExternalLink } from 'lucide-react'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

const SCREENSHOT_FIELDS = [
  {
    key: 'zillowEstimate',
    title: 'Zillow Rent Estimate',
    description: 'Screenshot of the Zillow Rent Zestimate page for this property',
    placeholder: 'https://imgur.com/... or paste image URL',
    color: 'teal',
  },
  {
    key: 'zillowMap',
    title: 'Zillow Market Map',
    description: 'Screenshot showing the local rental marketplace from Zillow',
    placeholder: 'https://imgur.com/... or paste image URL',
    color: 'teal',
  },
  {
    key: 'comparison1',
    title: 'Comparison Home #1',
    description: 'Screenshot of a comparable rental listing',
    placeholder: 'https://imgur.com/... or paste image URL',
    color: 'orange',
  },
  {
    key: 'comparison2',
    title: 'Comparison Home #2',
    description: 'Screenshot of another comparable rental listing',
    placeholder: 'https://imgur.com/... or paste image URL',
    color: 'orange',
  },
  {
    key: 'comparison3',
    title: 'Comparison Home #3',
    description: 'Screenshot of a third comparable rental listing (optional)',
    placeholder: 'https://imgur.com/... or paste image URL',
    color: 'orange',
  },
] as const

function CMAScreenshotsStep({ formData, updateFormData }: Props) {
  const updateScreenshot = (field: keyof typeof formData.screenshots, value: string) => {
    updateFormData({
      screenshots: {
        ...formData.screenshots,
        [field]: value,
      },
    })
  }

  const getColorClasses = (color: string) => {
    if (color === 'teal') {
      return {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-700',
        icon: 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400',
        ring: 'focus:ring-teal-500',
        link: 'text-teal-600 dark:text-teal-400',
      }
    }
    return {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-700',
      icon: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
      ring: 'focus:ring-orange-500',
      link: 'text-orange-600 dark:text-orange-400',
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg mb-6">
        <p className="text-sm text-teal-900 dark:text-teal-200">
          Add links to screenshot images showing market data. These screenshots help property owners understand the competitive landscape.
          According to Tenant Turner, Zillow accounts for 70%+ of rental searches.
        </p>
      </div>

      <div className="space-y-4">
        {SCREENSHOT_FIELDS.map((field) => {
          const colors = getColorClasses(field.color)
          const value = formData.screenshots[field.key]

          return (
            <div
              key={field.key}
              className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colors.icon}`}>
                  <Image className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                    {field.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {field.description}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => updateScreenshot(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 ${colors.ring}`}
                />
              </div>

              {value && (
                <div className="mt-3 flex items-center gap-4">
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm ${colors.link} hover:underline`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Image
                  </a>
                  {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                    <img
                      src={value}
                      alt={field.title}
                      className="h-16 w-auto rounded border border-gray-200 dark:border-gray-600"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>Tip:</strong> Upload screenshots to a service like Imgur, Dropbox, or Google Drive and paste the direct image link here.
          Most homes need a dozen or more contacts each week to rent quickly.
        </p>
      </div>
    </div>
  )
}

export default CMAScreenshotsStep
