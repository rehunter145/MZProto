import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Search, Users, ArrowLeft, Download } from 'lucide-react'

function CompanyCalendar({ onBack, employees }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 3)) // Jan 3, 2026
  const [viewMode, setViewMode] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewAbsenceModal, setShowNewAbsenceModal] = useState(false)

  // Generate calendar dates for the current view
  const generateCalendarDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    if (viewMode === 'month') {
      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()

      // Start from the first Saturday before the month starts
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())

      const dates = []
      for (let i = 0; i < 35; i++) {
        // 5 weeks
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        dates.push(date)
      }
      return dates
    } else {
      // Week view - show 7 days starting from current date
      const dates = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate)
        date.setDate(date.getDate() - currentDate.getDay() + i)
        dates.push(date)
      }
      return dates
    }
  }

  const calendarDates = generateCalendarDates()

  // Mock absence data
  const absences = [
    {
      employeeId: '1',
      employeeName: 'Alisha Robbins',
      startDate: new Date(2026, 0, 3),
      endDate: new Date(2026, 0, 6),
      type: 'vacation'
    },
    {
      employeeId: '8',
      employeeName: 'Cat Worlds',
      startDate: new Date(2026, 0, 9),
      endDate: new Date(2026, 0, 9),
      type: 'sick'
    },
    {
      employeeId: '8',
      employeeName: 'Cat Worlds',
      startDate: new Date(2026, 0, 19),
      endDate: new Date(2026, 0, 22),
      type: 'vacation'
    },
    {
      employeeId: '5',
      employeeName: 'Catherine Pitney',
      startDate: new Date(2026, 0, 5),
      endDate: new Date(2026, 0, 5),
      type: 'halfday'
    }
  ]

  const getAbsenceForEmployeeAndDate = (employeeId, date) => {
    return absences.find((absence) => {
      const absenceStart = new Date(absence.startDate)
      const absenceEnd = new Date(absence.endDate)
      const checkDate = new Date(date)

      absenceStart.setHours(0, 0, 0, 0)
      absenceEnd.setHours(0, 0, 0, 0)
      checkDate.setHours(0, 0, 0, 0)

      return (
        absence.employeeId === employeeId &&
        checkDate >= absenceStart &&
        checkDate <= absenceEnd
      )
    })
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction)
    } else {
      newDate.setDate(newDate.getDate() + direction * 7)
    }
    setCurrentDate(newDate)
  }

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Generate ICS calendar feed URL (mock)
  const generateICSLink = () => {
    return 'webcal://example.com/absences.ics'
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Company Calendar
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View all team member absences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href={generateICSLink()}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Subscribe to Outlook Calendar"
          >
            <Download className="w-4 h-4" />
            <span>ICS Calendar Feed</span>
          </a>
          <button
            onClick={() => setShowNewAbsenceModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Absence</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Find users and teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Weeks
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'year'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Year
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="text-sm font-medium text-gray-900 dark:text-white min-w-[150px] text-center">
            {formatMonthYear()}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header Row */}
            <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Advanced Filter
                  </span>
                </div>
              </div>
              {calendarDates.slice(0, 7).map((date, index) => (
                <div
                  key={index}
                  className={`p-2 text-center border-r border-gray-200 dark:border-gray-600 ${
                    isWeekend(date)
                      ? 'bg-blue-50 dark:bg-blue-900/10'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isToday(date)
                        ? 'bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Employee Rows */}
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Employee Info */}
                <div className="p-3 border-r border-gray-200 dark:border-gray-600 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {employee.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {employee.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {employee.vacationLeft} days
                    </p>
                  </div>
                </div>

                {/* Calendar Cells */}
                {calendarDates.slice(0, 7).map((date, index) => {
                  const absence = getAbsenceForEmployeeAndDate(employee.id, date)
                  return (
                    <div
                      key={index}
                      className={`p-1 border-r border-gray-200 dark:border-gray-600 ${
                        isWeekend(date)
                          ? 'bg-blue-50 dark:bg-blue-900/10'
                          : ''
                      }`}
                    >
                      {absence && (
                        <div
                          className={`h-6 rounded text-xs font-medium flex items-center justify-center text-white ${
                            absence.type === 'vacation'
                              ? 'bg-teal-600'
                              : absence.type === 'sick'
                              ? 'bg-red-500'
                              : 'bg-orange-500'
                          }`}
                          title={`${employee.name} - ${absence.type}`}
                        >
                          {absence.type === 'halfday' ? '½' : ''}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Absence Modal */}
      {showNewAbsenceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Absence
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employee
                </label>
                <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">
                  <option>Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAbsenceModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewAbsenceModal(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Create Absence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyCalendar
