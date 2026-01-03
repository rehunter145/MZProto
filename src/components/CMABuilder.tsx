import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { CMAData, DEFAULT_SEASONAL_DESCRIPTION } from '../types/cma'
import CMAPropertyStep from './cma/CMAPropertyStep'
import CMASeasonalStep from './cma/CMASeasonalStep'
import CMAScreenshotsStep from './cma/CMAScreenshotsStep'
import CMARentEstimateStep from './cma/CMARentEstimateStep'
import CMANetIncomeStep from './cma/CMANetIncomeStep'
import CMASummaryStep from './cma/CMASummaryStep'
import CMAReportPreview from './cma/CMAReportPreview'

const STEPS = [
  { id: 1, title: 'Property Info', component: CMAPropertyStep },
  { id: 2, title: 'Seasonal Adjustments', component: CMASeasonalStep },
  { id: 3, title: 'Market Screenshots', component: CMAScreenshotsStep },
  { id: 4, title: 'Rent Estimate', component: CMARentEstimateStep },
  { id: 5, title: 'Net Income', component: CMANetIncomeStep },
  { id: 6, title: 'Summary', component: CMASummaryStep },
  { id: 7, title: 'Review & Export', component: CMAReportPreview },
]

// Get next seasonal shift date (approximately mid-October)
const getNextSeasonalShift = () => {
  const now = new Date()
  const year = now.getMonth() >= 10 ? now.getFullYear() + 1 : now.getFullYear()
  return `${year}-10-15`
}

// Get default listing date (today + 7 days)
const getDefaultListingDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
}

function CMABuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CMAData>({
    propertyAddress: '',
    propertyName: '',
    estimatedListingDate: getDefaultListingDate(),
    seasonalAdjustment: {
      nextShiftDate: getNextSeasonalShift(),
      description: DEFAULT_SEASONAL_DESCRIPTION,
    },
    screenshots: {
      zillowEstimate: '',
      zillowMap: '',
      comparison1: '',
      comparison2: '',
      comparison3: '',
    },
    startingRate: 0,
    lowRate: 0,
    summaryFindings: '',
  })

  const updateFormData = (updates: Partial<CMAData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Rental Estimate Builder
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Create professional rental estimates and net income projections for property owners
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep === step.id
                      ? 'bg-teal-500 text-white'
                      : currentStep > step.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step.id}
                </button>
                <span className="hidden md:block text-xs mt-2 text-gray-600 dark:text-gray-400 text-center whitespace-nowrap">
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.id
                      ? 'bg-orange-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {STEPS[currentStep - 1].title}
        </h3>

        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {STEPS.length}
        </div>

        {currentStep < STEPS.length ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600
                     text-white transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600
                     text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Generate PDF</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default CMABuilder
