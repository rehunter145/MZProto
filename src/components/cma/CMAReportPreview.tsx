import { CMAData, calculateIncomeProjections, HELPFUL_LINKS } from '../../types/cma'
import { Download, ExternalLink, Calendar, DollarSign, TrendingUp, MapPin, Leaf } from 'lucide-react'
import { pdf, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'

interface Props {
  formData: CMAData
  updateFormData: (updates: Partial<CMAData>) => void
}

function CMAReportPreview({ formData }: Props) {
  const projections = calculateIncomeProjections(formData.startingRate, formData.lowRate)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">MoveZen Rental Estimate</h1>
        <p className="text-teal-100 text-lg">Details and Net Income Projections</p>
        <p className="text-teal-200 mt-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {formData.propertyAddress || 'Property Address'}
        </p>
      </div>

      {/* Seasonal Adjustments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Seasonal Adjustments
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Listing Date</p>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
              {formatDate(formData.estimatedListingDate)}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Next Major Seasonal Shift</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {formatDate(formData.seasonalAdjustment.nextShiftDate)}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
          {formData.seasonalAdjustment.description}
        </p>
      </div>

      {/* Net Income Big Picture */}
      <div className="bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-lg border border-orange-200 dark:border-orange-700 p-6">
        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">
          Net Income Big Picture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-teal-200 dark:border-teal-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">High Range Annual Income</p>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">
              ${projections.lowRangeIncome.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Low Rate (${formData.lowRate.toLocaleString()}) × 11 months
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-orange-200 dark:border-orange-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Low Range Annual Income</p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
              ${projections.highRangeIncome.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Starting Rate (${formData.startingRate.toLocaleString()}) × 9 months
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
            <span className="text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Starting Rate (9 mo occupancy)
            </span>
            <span className="font-bold text-teal-600 dark:text-teal-400">
              ${formData.startingRate.toLocaleString()} → ${projections.highRangeIncome.toLocaleString()} NOI
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
            <span className="text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Low Rate (11 mo occupancy)
            </span>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              ${formData.lowRate.toLocaleString()} → ${projections.lowRangeIncome.toLocaleString()} NOI
            </span>
          </div>
        </div>
      </div>

      {/* Screenshots Preview */}
      {Object.values(formData.screenshots).some(s => s) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Market Analysis Screenshots
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.screenshots.zillowEstimate && (
              <a href={formData.screenshots.zillowEstimate} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm">
                <ExternalLink className="w-4 h-4" /> Zillow Rent Estimate
              </a>
            )}
            {formData.screenshots.zillowMap && (
              <a href={formData.screenshots.zillowMap} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm">
                <ExternalLink className="w-4 h-4" /> Zillow Market Map
              </a>
            )}
            {formData.screenshots.comparison1 && (
              <a href={formData.screenshots.comparison1} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline text-sm">
                <ExternalLink className="w-4 h-4" /> Comparison Home #1
              </a>
            )}
            {formData.screenshots.comparison2 && (
              <a href={formData.screenshots.comparison2} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline text-sm">
                <ExternalLink className="w-4 h-4" /> Comparison Home #2
              </a>
            )}
            {formData.screenshots.comparison3 && (
              <a href={formData.screenshots.comparison3} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline text-sm">
                <ExternalLink className="w-4 h-4" /> Comparison Home #3
              </a>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {formData.summaryFindings && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Summary of Findings
          </h3>
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
            {formData.summaryFindings}
          </p>
        </div>
      )}

      {/* Resources */}
      <div className="bg-slate-600 dark:bg-slate-800 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Helpful Financial Calculators</h3>
        <div className="space-y-2">
          <a href={HELPFUL_LINKS.vacancyCalculator} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-orange-300 hover:underline text-sm">
            <ExternalLink className="w-4 h-4" /> Rental Vacancy Cost Calculator
          </a>
          <a href={HELPFUL_LINKS.cashFlowCalculator} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-orange-300 hover:underline text-sm">
            <ExternalLink className="w-4 h-4" /> Rental Investment Cash Flow Calculator
          </a>
        </div>
        <p className="text-slate-300 text-sm mt-4">
          Thanks for considering MoveZen!
        </p>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg
                   font-semibold transition-colors text-lg"
          onClick={() => generateCMAPDF(formData, projections)}
        >
          <Download className="w-5 h-5" />
          Export to PDF
        </button>
      </div>
    </div>
  )
}

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#14b8a6',
    padding: 25,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#99f6e4',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: '1 solid #e5e7eb',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d9488',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingBottom: 6,
    borderBottom: '1 solid #f3f4f6',
  },
  label: {
    color: '#6b7280',
  },
  value: {
    fontWeight: 'bold',
    color: '#111827',
  },
  highlightBox: {
    backgroundColor: '#f0fdfa',
    padding: 15,
    borderRadius: 4,
    marginBottom: 15,
    border: '1 solid #99f6e4',
  },
  orangeHighlightBox: {
    backgroundColor: '#fff7ed',
    padding: 15,
    borderRadius: 4,
    marginBottom: 15,
    border: '1 solid #fed7aa',
  },
  bigNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridItem: {
    width: '48%',
  },
  paragraph: {
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 10,
  },
  footer: {
    backgroundColor: '#475569',
    padding: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  footerText: {
    color: 'white',
    fontSize: 10,
  },
  link: {
    color: '#fdba74',
    fontSize: 10,
    marginTop: 5,
  },
})

// PDF Document Component
const CMAPDFDocument = ({ formData, projections }: {
  formData: CMAData
  projections: ReturnType<typeof calculateIncomeProjections>
}) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>MoveZen Rental Estimate</Text>
          <Text style={pdfStyles.headerSubtitle}>Details and Net Income Projections</Text>
          <Text style={{ ...pdfStyles.headerSubtitle, marginTop: 8 }}>
            {formData.propertyAddress || 'Property Address'}
          </Text>
        </View>

        {/* Seasonal Adjustments */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Seasonal Adjustments</Text>
          <View style={pdfStyles.gridContainer}>
            <View style={pdfStyles.gridItem}>
              <View style={pdfStyles.highlightBox}>
                <Text style={pdfStyles.smallLabel}>Estimated Listing Date</Text>
                <Text style={{ ...pdfStyles.bigNumber, color: '#0d9488', fontSize: 16 }}>
                  {formatDate(formData.estimatedListingDate)}
                </Text>
              </View>
            </View>
            <View style={pdfStyles.gridItem}>
              <View style={pdfStyles.orangeHighlightBox}>
                <Text style={pdfStyles.smallLabel}>Next Seasonal Shift</Text>
                <Text style={{ ...pdfStyles.bigNumber, color: '#ea580c', fontSize: 16 }}>
                  {formatDate(formData.seasonalAdjustment.nextShiftDate)}
                </Text>
              </View>
            </View>
          </View>
          <Text style={pdfStyles.paragraph}>{formData.seasonalAdjustment.description}</Text>
        </View>

        {/* Net Income */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Net Income Big Picture</Text>
          <View style={pdfStyles.gridContainer}>
            <View style={pdfStyles.gridItem}>
              <View style={pdfStyles.highlightBox}>
                <Text style={pdfStyles.smallLabel}>High Range Annual Income</Text>
                <Text style={{ ...pdfStyles.bigNumber, color: '#0d9488' }}>
                  ${projections.lowRangeIncome.toLocaleString()}
                </Text>
                <Text style={pdfStyles.smallLabel}>
                  ${formData.lowRate.toLocaleString()} × 11 months
                </Text>
              </View>
            </View>
            <View style={pdfStyles.gridItem}>
              <View style={pdfStyles.orangeHighlightBox}>
                <Text style={pdfStyles.smallLabel}>Low Range Annual Income</Text>
                <Text style={{ ...pdfStyles.bigNumber, color: '#ea580c' }}>
                  ${projections.highRangeIncome.toLocaleString()}
                </Text>
                <Text style={pdfStyles.smallLabel}>
                  ${formData.startingRate.toLocaleString()} × 9 months
                </Text>
              </View>
            </View>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Starting Rate (${formData.startingRate.toLocaleString()}/mo)</Text>
            <Text style={{ ...pdfStyles.value, color: '#0d9488' }}>
              ${projections.highRangeIncome.toLocaleString()} NOI (9 mo)
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Low Rate (${formData.lowRate.toLocaleString()}/mo)</Text>
            <Text style={{ ...pdfStyles.value, color: '#ea580c' }}>
              ${projections.lowRangeIncome.toLocaleString()} NOI (11 mo)
            </Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        {/* Summary */}
        {formData.summaryFindings && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Summary of Findings</Text>
            <Text style={pdfStyles.paragraph}>{formData.summaryFindings}</Text>
          </View>
        )}

        {/* Screenshot Links */}
        {Object.values(formData.screenshots).some(s => s) && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Market Analysis Screenshots</Text>
            {formData.screenshots.zillowEstimate && (
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Zillow Rent Estimate</Text>
                <Link src={formData.screenshots.zillowEstimate} style={{ color: '#0d9488' }}>
                  <Text>View</Text>
                </Link>
              </View>
            )}
            {formData.screenshots.zillowMap && (
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Zillow Market Map</Text>
                <Link src={formData.screenshots.zillowMap} style={{ color: '#0d9488' }}>
                  <Text>View</Text>
                </Link>
              </View>
            )}
            {formData.screenshots.comparison1 && (
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Comparison Home #1</Text>
                <Link src={formData.screenshots.comparison1} style={{ color: '#ea580c' }}>
                  <Text>View</Text>
                </Link>
              </View>
            )}
            {formData.screenshots.comparison2 && (
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Comparison Home #2</Text>
                <Link src={formData.screenshots.comparison2} style={{ color: '#ea580c' }}>
                  <Text>View</Text>
                </Link>
              </View>
            )}
            {formData.screenshots.comparison3 && (
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Comparison Home #3</Text>
                <Link src={formData.screenshots.comparison3} style={{ color: '#ea580c' }}>
                  <Text>View</Text>
                </Link>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text style={{ ...pdfStyles.footerText, fontWeight: 'bold', marginBottom: 8 }}>
            Helpful Financial Calculators
          </Text>
          <Link src={HELPFUL_LINKS.vacancyCalculator}>
            <Text style={pdfStyles.link}>Rental Vacancy Cost Calculator</Text>
          </Link>
          <Link src={HELPFUL_LINKS.cashFlowCalculator}>
            <Text style={pdfStyles.link}>Rental Investment Cash Flow Calculator</Text>
          </Link>
          <Text style={{ ...pdfStyles.footerText, marginTop: 15 }}>
            Thanks for considering MoveZen! - MoveZen360.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// Generate and download PDF
const generateCMAPDF = async (formData: CMAData, projections: ReturnType<typeof calculateIncomeProjections>) => {
  const blob = await pdf(
    <CMAPDFDocument formData={formData} projections={projections} />
  ).toBlob()

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `rental-estimate-${formData.propertyAddress.replace(/\s+/g, '-') || 'property'}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default CMAReportPreview
