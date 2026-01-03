import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { TurnoverData, DEFAULT_COVER_LETTER } from '../types/turnover'
import CoverLetterStep from './turnover/CoverLetterStep'
import PropertyInfoStep from './turnover/PropertyInfoStep'
import BudgetCategoriesStep from './turnover/BudgetCategoriesStep'
import CashFlowStep from './turnover/CashFlowStep'
import PhotoLinksStep from './turnover/PhotoLinksStep'
import ReportPreview from './turnover/ReportPreview'

const STEPS = [
  { id: 1, title: 'Cover Letter', component: CoverLetterStep },
  { id: 2, title: 'Property Info', component: PropertyInfoStep },
  { id: 3, title: 'Budget Categories', component: BudgetCategoriesStep },
  { id: 4, title: 'Cash Flow Data', component: CashFlowStep },
  { id: 5, title: 'Photo Links', component: PhotoLinksStep },
  { id: 6, title: 'Review & Export', component: ReportPreview },
]

function TurnoverBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TurnoverData>({
    propertyAddress: '',
    propertyName: '',
    budgetCategories: {
      maintenanceRepair: 0,
      paint: 0,
      appliances: 0,
      floorsCarpets: 0,
      housekeeping: 0,
      landscapingExterior: 0,
      keysLocks: 0,
      other: 0,
      smokeFireVerification: 0,
    },
    cashFlow: {
      historicalIncome: 0,
      historicalExpense: 0,
      estimatedRentalRate: 0,
      projectedIncome: 0,
      projectedExpense: 0,
    },
    photoLinks: {
      inspection1: '',
      inspection2: '',
      moveOut: '',
    },
    coverLetter: DEFAULT_COVER_LETTER,
    estimatedTurnoverDays: 14,
    leaseLength: 24,
  })

  const updateFormData = (updates: Partial<TurnoverData>) => {
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
          Turnover Budget Builder
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Create professional move-out turnover plans and budget reports
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep === step.id
                      ? 'bg-orange-500 text-white'
                      : currentStep > step.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step.id}
                </button>
                <span className="hidden md:block text-xs mt-2 text-gray-600 dark:text-gray-400 text-center">
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.id
                      ? 'bg-teal-500'
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600
                     text-white transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600
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

export default TurnoverBuilder
