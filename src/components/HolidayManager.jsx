import { useState } from 'react'
import { Search, Plus, Calendar, Info, Check, X, ArrowLeft } from 'lucide-react'

function HolidayManager({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [hidePastYears, setHidePastYears] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    date: '',
    everyYear: true,
    halfDay: false,
    mandatoryLeave: false
  })

  const holidays = [
    {
      id: '1',
      name: 'Christmas Eve - All Day',
      date: '24. December',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: false,
      usedInLocations: 4
    },
    {
      id: '2',
      name: 'Christmas Eve 2024 - 1PM',
      date: '12/24/2024',
      everyYear: false,
      halfDay: true,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '3',
      name: 'Christmas- All Day',
      date: '25. December',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: false,
      usedInLocations: 4
    },
    {
      id: '4',
      name: 'Columbus Day 2022- 3PM',
      date: '10/10/2022',
      everyYear: false,
      halfDay: true,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '5',
      name: 'Columbus Day 2023- 3PM',
      date: '10/09/2023',
      everyYear: false,
      halfDay: true,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '6',
      name: 'Independence Day',
      date: '4. July',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '7',
      name: 'Labor Day',
      date: '1. Monday in September',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '8',
      name: 'Memorial Day',
      date: 'Last Monday in May',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '9',
      name: 'New Year\'s Day',
      date: '1. January',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: true,
      usedInLocations: 4
    },
    {
      id: '10',
      name: 'Thanksgiving',
      date: '4. Thursday in November',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: true,
      usedInLocations: 4
    }
  ]

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
    if (hidePastYears) {
      // Filter out holidays with specific years in the past
      const year = holiday.date.match(/\d{4}/)
      if (year && parseInt(year[0]) < new Date().getFullYear()) {
        return false
      }
    }
    return matchesSearch
  })

  const handleAddHoliday = () => {
    // In real app, would save to database
    console.log('Adding holiday:', newHoliday)
    setShowAddModal(false)
    setNewHoliday({
      name: '',
      date: '',
      everyYear: true,
      halfDay: false,
      mandatoryLeave: false
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Custom Holidays / Mandatory Leave
              </h1>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Info className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Holiday</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for holidays"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hidePastYears}
              onChange={(e) => setHidePastYears(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hide holidays from past years
            </span>
          </label>
        </div>
      </div>

      {/* Holidays Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  EVERY YEAR
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  HALF DAY
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MANDATORY LEAVE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHolidays.map((holiday) => (
                <tr
                  key={holiday.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {holiday.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Used in {holiday.usedInLocations} locations
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {holiday.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {holiday.everyYear && (
                      <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {holiday.halfDay && (
                      <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {holiday.mandatoryLeave && (
                      <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Holiday Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Holiday
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Holiday Name
                </label>
                <input
                  type="text"
                  value={newHoliday.name}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                  placeholder="e.g., New Year's Day"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={newHoliday.date}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, date: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
                  placeholder="e.g., 1. January or 01/01/2026"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newHoliday.everyYear}
                    onChange={(e) =>
                      setNewHoliday({ ...newHoliday, everyYear: e.target.checked })
                    }
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Repeats every year
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newHoliday.halfDay}
                    onChange={(e) =>
                      setNewHoliday({ ...newHoliday, halfDay: e.target.checked })
                    }
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Half day
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newHoliday.mandatoryLeave}
                    onChange={(e) =>
                      setNewHoliday({
                        ...newHoliday,
                        mandatoryLeave: e.target.checked
                      })
                    }
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Mandatory leave
                  </span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHoliday}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HolidayManager
