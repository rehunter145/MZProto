import { TurnoverData, DISCLAIMER_TEXT, BUDGET_CATEGORIES } from '../../types/turnover'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, ExternalLink, TrendingUp, DollarSign, Calendar, Zap } from 'lucide-react'
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface Props {
  formData: TurnoverData
  updateFormData: (updates: Partial<TurnoverData>) => void
}

const COLORS = ['#f97316', '#14b8a6', '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#10b981']

function ReportPreview({ formData }: Props) {
  const totalBudget = Object.values(formData.budgetCategories).reduce((sum, val) => sum + val, 0)
  const netOperatingIncome = formData.cashFlow.historicalIncome - formData.cashFlow.historicalExpense
  const projectedNOI = formData.cashFlow.projectedIncome - formData.cashFlow.projectedExpense

  // Prepare chart data
  const cashFlowData = [
    {
      name: 'Income',
      Historical: formData.cashFlow.historicalIncome,
      Projected: formData.cashFlow.projectedIncome,
    },
    {
      name: 'Expense',
      Historical: formData.cashFlow.historicalExpense,
      Projected: formData.cashFlow.projectedExpense,
    },
  ]

  const budgetPieData = BUDGET_CATEGORIES.map(cat => ({
    name: cat.label,
    value: formData.budgetCategories[cat.key as keyof typeof formData.budgetCategories],
  })).filter(item => item.value > 0)

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Move-Out Turnover Report</h1>
        <p className="text-orange-100 text-lg">{formData.propertyAddress || 'Property Address'}</p>
        {formData.propertyName && (
          <p className="text-orange-200 mt-1">{formData.propertyName}</p>
        )}
      </div>

      {/* Property Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Property Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Turnover</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formData.estimatedTurnoverDays} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lease Length</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formData.leaseLength} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Rental Rate</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${formData.cashFlow.estimatedRentalRate.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Report Highlights */}
      <div className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/20 dark:to-orange-900/20 rounded-lg border border-teal-200 dark:border-teal-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Report Highlights
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-100 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-orange-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Budget</p>
            </div>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-100 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Historical NOI</p>
            </div>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              ${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-100 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-teal-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Projected NOI</p>
            </div>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
              ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-100 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-teal-500" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Net After Turnover</p>
            </div>
            <p className={`text-xl font-bold ${(projectedNOI - totalBudget) >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'}`}>
              ${(projectedNOI - totalBudget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Cash Flow Charts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cash Flow Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Historical" fill="#f97316" />
            <Bar dataKey="Projected" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Net Operating Income (Historical)</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Projected NOI ({formData.leaseLength} mo)</p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Turnover Budget Estimate
        </h3>
        {budgetPieData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="mt-6 space-y-2">
          {BUDGET_CATEGORIES.map(cat => {
            const value = formData.budgetCategories[cat.key as keyof typeof formData.budgetCategories]
            if (value === 0) return null
            return (
              <div key={cat.key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">{cat.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )
          })}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300 dark:border-gray-600">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total Budget</span>
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Inspection Photos */}
      {(formData.photoLinks.inspection1 || formData.photoLinks.inspection2 || formData.photoLinks.moveOut) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inspection Photos
          </h3>
          <div className="space-y-3">
            {formData.photoLinks.inspection1 && (
              <a
                href={formData.photoLinks.inspection1}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Inspection #1 (While Occupied)
              </a>
            )}
            {formData.photoLinks.inspection2 && (
              <a
                href={formData.photoLinks.inspection2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Inspection #2 (While Occupied)
              </a>
            )}
            {formData.photoLinks.moveOut && (
              <a
                href={formData.photoLinks.moveOut}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                Move-Out Inspection Photos
              </a>
            )}
          </div>
        </div>
      )}

      {/* Cover Letter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cover Letter
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {formData.coverLetter}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 p-6">
        <h4 className="text-md font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          Important Disclaimers
        </h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-300 whitespace-pre-wrap">
          {DISCLAIMER_TEXT}
        </p>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg
                   font-semibold transition-colors text-lg"
          onClick={() => generatePDF(formData, totalBudget, netOperatingIncome, projectedNOI)}
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
    backgroundColor: '#f97316',
    padding: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fed7aa',
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
    color: '#111827',
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
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
    border: '1 solid #99f6e4',
  },
  highlightLabel: {
    fontSize: 10,
    color: '#0d9488',
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d9488',
  },
  orangeHighlightBox: {
    backgroundColor: '#fff7ed',
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
    border: '1 solid #fed7aa',
  },
  orangeHighlightLabel: {
    fontSize: 10,
    color: '#ea580c',
  },
  orangeHighlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ea580c',
  },
  disclaimer: {
    backgroundColor: '#fefce8',
    padding: 15,
    borderRadius: 4,
    border: '1 solid #fef08a',
    marginTop: 20,
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#854d0e',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 9,
    color: '#a16207',
    lineHeight: 1.4,
  },
  coverLetter: {
    lineHeight: 1.5,
    color: '#374151',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '2 solid #d1d5db',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gridItem: {
    width: '50%',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 9,
    color: '#6b7280',
  },
  gridValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
})

// PDF Document Component
const TurnoverPDFDocument = ({ formData, totalBudget, netOperatingIncome, projectedNOI }: {
  formData: TurnoverData
  totalBudget: number
  netOperatingIncome: number
  projectedNOI: number
}) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.headerTitle}>Move-Out Turnover Report</Text>
        <Text style={pdfStyles.headerSubtitle}>{formData.propertyAddress || 'Property Address'}</Text>
        {formData.propertyName && (
          <Text style={pdfStyles.headerSubtitle}>{formData.propertyName}</Text>
        )}
      </View>

      {/* Property Overview */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Property Overview</Text>
        <View style={pdfStyles.gridContainer}>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Estimated Turnover</Text>
            <Text style={pdfStyles.gridValue}>{formData.estimatedTurnoverDays} days</Text>
          </View>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Lease Length</Text>
            <Text style={pdfStyles.gridValue}>{formData.leaseLength} months</Text>
          </View>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Monthly Rental Rate</Text>
            <Text style={pdfStyles.gridValue}>${formData.cashFlow.estimatedRentalRate.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Report Highlights */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Report Highlights</Text>
        <View style={pdfStyles.gridContainer}>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Total Budget</Text>
            <Text style={{ ...pdfStyles.gridValue, color: '#f97316' }}>
              ${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Historical NOI</Text>
            <Text style={{ ...pdfStyles.gridValue, color: '#f97316' }}>
              ${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Projected NOI ({formData.leaseLength} mo)</Text>
            <Text style={{ ...pdfStyles.gridValue, color: '#0d9488' }}>
              ${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={pdfStyles.gridItem}>
            <Text style={pdfStyles.gridLabel}>Net After Turnover</Text>
            <Text style={{ ...pdfStyles.gridValue, color: (projectedNOI - totalBudget) >= 0 ? '#0d9488' : '#dc2626' }}>
              ${(projectedNOI - totalBudget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </View>

      {/* Cash Flow */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Cash Flow Performance</Text>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Historical Income</Text>
          <Text style={pdfStyles.value}>${formData.cashFlow.historicalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Historical Expense</Text>
          <Text style={pdfStyles.value}>${formData.cashFlow.historicalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={pdfStyles.orangeHighlightBox}>
          <Text style={pdfStyles.orangeHighlightLabel}>Net Operating Income (Historical)</Text>
          <Text style={pdfStyles.orangeHighlightValue}>${netOperatingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={{ ...pdfStyles.row, marginTop: 15 }}>
          <Text style={pdfStyles.label}>Projected Income ({formData.leaseLength} mo)</Text>
          <Text style={pdfStyles.value}>${formData.cashFlow.projectedIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Projected Expense ({formData.leaseLength} mo)</Text>
          <Text style={pdfStyles.value}>${formData.cashFlow.projectedExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={pdfStyles.highlightBox}>
          <Text style={pdfStyles.highlightLabel}>Projected Net Operating Income</Text>
          <Text style={pdfStyles.highlightValue}>${projectedNOI.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
      </View>

      {/* Budget Breakdown */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Turnover Budget Estimate</Text>
        {BUDGET_CATEGORIES.map(cat => {
          const value = formData.budgetCategories[cat.key as keyof typeof formData.budgetCategories]
          if (value === 0) return null
          return (
            <View key={cat.key} style={pdfStyles.row}>
              <Text style={pdfStyles.label}>{cat.label}</Text>
              <Text style={pdfStyles.value}>${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
            </View>
          )
        })}
        <View style={pdfStyles.totalRow}>
          <Text style={pdfStyles.totalLabel}>Total Budget</Text>
          <Text style={pdfStyles.totalValue}>${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={pdfStyles.page}>
      {/* Cover Letter */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Cover Letter</Text>
        <Text style={pdfStyles.coverLetter}>{formData.coverLetter}</Text>
      </View>

      {/* Photo Links */}
      {(formData.photoLinks.inspection1 || formData.photoLinks.inspection2 || formData.photoLinks.moveOut) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Inspection Photo Links</Text>
          {formData.photoLinks.inspection1 && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Inspection #1 (While Occupied)</Text>
              <Text style={{ color: '#f97316' }}>{formData.photoLinks.inspection1}</Text>
            </View>
          )}
          {formData.photoLinks.inspection2 && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Inspection #2 (While Occupied)</Text>
              <Text style={{ color: '#f97316' }}>{formData.photoLinks.inspection2}</Text>
            </View>
          )}
          {formData.photoLinks.moveOut && (
            <View style={pdfStyles.row}>
              <Text style={{ ...pdfStyles.label, fontWeight: 'bold' }}>Move-Out Inspection Photos</Text>
              <Text style={{ color: '#0d9488', fontWeight: 'bold' }}>{formData.photoLinks.moveOut}</Text>
            </View>
          )}
        </View>
      )}

      {/* Disclaimer */}
      <View style={pdfStyles.disclaimer}>
        <Text style={pdfStyles.disclaimerTitle}>Important Disclaimers</Text>
        <Text style={pdfStyles.disclaimerText}>{DISCLAIMER_TEXT}</Text>
      </View>
    </Page>
  </Document>
)

// Generate and download PDF
const generatePDF = async (formData: TurnoverData, totalBudget: number, netOperatingIncome: number, projectedNOI: number) => {
  const blob = await pdf(
    <TurnoverPDFDocument
      formData={formData}
      totalBudget={totalBudget}
      netOperatingIncome={netOperatingIncome}
      projectedNOI={projectedNOI}
    />
  ).toBlob()

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `turnover-report-${formData.propertyAddress.replace(/\s+/g, '-') || 'property'}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default ReportPreview
