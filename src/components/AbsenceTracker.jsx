import { useState } from 'react'
import { Calendar, CalendarCheck, Plus, User } from 'lucide-react'
import HolidayManager from './HolidayManager'
import CompanyCalendar from './CompanyCalendar'

function AbsenceTracker() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedApprover, setSelectedApprover] = useState('all')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)

  // Mock data - in real app would come from API/database
  const absenceRequests = []

  const todayAbsences = [
    {
      id: '1',
      employeeName: 'Alisha Robbins',
      employeeInitials: 'AR',
      startDate: '2025-12-29',
      endDate: '2026-01-06',
      daysRemaining: 5
    }
  ]

  const employees = [
    { id: '1', name: 'Alisha Robbins', initials: 'AR', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '2', name: 'Ashlee Malone', initials: 'AM', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '3', name: 'June Harris', initials: 'JH', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '4', name: 'Amber Reavis', initials: 'AR', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '5', name: 'Catherine Pitney', initials: 'CP', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '6', name: 'Sasha McDonald', initials: 'SM', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '7', name: 'Lisa Scott', initials: 'LS', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '8', name: 'Will Hall', initials: 'WH', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '9', name: 'RE Hunter', initials: 'RH', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '10', name: 'Hayli Mace', initials: 'HM', vacationLeft: 5, lastUpdated: '01/01/2027' },
    { id: '11', name: 'Jacob Baptista', initials: 'JB', vacationLeft: 5, lastUpdated: '01/01/2027' },
  ]

  const deleteRequests = []

  if (activeView === 'holidays') {
    return <HolidayManager onBack={() => setActiveView('dashboard')} />
  }

  if (activeView === 'calendar') {
    return <CompanyCalendar onBack={() => setActiveView('dashboard')} employees={employees} />
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Welcome */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">RH</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">WELCOME</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RE Hunter</h1>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'dashboard'
              ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          DASHBOARD
        </button>
        <button
          onClick={() => setActiveView('calendar')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'calendar'
              ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          COMPANY CALENDAR
        </button>
        <button
          onClick={() => setActiveView('holidays')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'holidays'
              ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          HOLIDAYS
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Absence Requests Card */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {absenceRequests.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ABSENCE REQUESTS</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <CalendarCheck className="w-4 h-4" />
            <span>SHOW IN CALENDAR</span>
          </button>
        </div>

        {/* Absence Today Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {todayAbsences.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ABSENCE TODAY</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <CalendarCheck className="w-4 h-4" />
            <span>SHOW IN CALENDAR</span>
          </button>
        </div>

        {/* Vacation Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Plus className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">VACATION</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="p-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative pt-2">
            <select
              value="vacation"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="vacation">VACATION</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Absence Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Absence Requests
              </h2>
              <div className="mt-3">
                <select
                  value={selectedApprover}
                  onChange={(e) => setSelectedApprover(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
                >
                  <option value="all">Approver</option>
                </select>
              </div>
            </div>
            <div className="p-8">
              <p className="text-center text-gray-500 dark:text-gray-400 italic">No entries</p>
            </div>
          </div>

          {/* Delete Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Requests
              </h2>
            </div>
            <div className="p-8">
              <p className="text-center text-gray-500 dark:text-gray-400 italic">No entries</p>
            </div>
          </div>

          {/* Today's Absences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Today&apos;s Absences
              </h2>
            </div>
            <div className="p-4">
              {todayAbsences.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 italic py-4">
                  No entries
                </p>
              ) : (
                <div className="space-y-3">
                  {todayAbsences.map((absence) => (
                    <div
                      key={absence.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {absence.employeeInitials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {absence.employeeName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {absence.employeeName} • Vacation • {absence.daysRemaining} days
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Mon. {new Date(absence.startDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}-Tue.{' '}
                          {new Date(absence.endDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Vacation Left & Residual */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Vacation Left & Residual
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {employee.initials}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {employee.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {employee.vacationLeft}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Absence Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Absence Request
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                  placeholder="Optional notes..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AbsenceTracker
