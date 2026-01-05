import { useState } from 'react'
import { ExternalLink, X } from 'lucide-react'

function OperationsSchedule() {
  const [zoomedReport, setZoomedReport] = useState(null)

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Operations Schedule
        </h1>

        {/* Main Content - 60/40 Split */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Left Column - 60% */}
          <div className="flex-[60] space-y-6">
            {/* Operations Requests Daily Agenda */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-orange-600">
              <div className="bg-gradient-to-r from-orange-700 to-orange-800 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Operations Requests Daily Agenda
                </h2>
              </div>
              <div className="p-4 bg-orange-50/30 dark:bg-gray-700">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Static preview - Click button to view live list
                  </p>
                  <a
                    href="https://movezen.sharepoint.com/:l:/s/mzit/JAC2xA38JwVFSr1FJDqXTCoVAbgA7MNO9KxfjvLr6EurZaQ?e=6faIVM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-700 hover:bg-orange-800 text-white text-sm rounded-lg transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live List
                  </a>
                </div>
                <img
                  src="/daily-agenda.png"
                  alt="Operations Requests Daily Agenda Preview"
                  className="w-full rounded border border-gray-200 dark:border-gray-600 shadow-sm"
                />
              </div>
            </div>

            {/* Route Lookup */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-teal-700">
              <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Route Lookup
                </h2>
              </div>
              <div className="p-4 bg-teal-50/30 dark:bg-gray-700">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Static preview - Click button to view live list
                  </p>
                  <a
                    href="https://movezen.sharepoint.com/:l:/s/mzit/JABvXGqbCuQORIN4ynGELRdEAUdaksxU8F6kAPyh0WV6zz0?e=YdvMYT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm rounded-lg transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live List
                  </a>
                </div>
                <img
                  src="/route-lookup.png"
                  alt="Route Lookup Preview"
                  className="w-full rounded border border-gray-200 dark:border-gray-600 shadow-sm"
                />
              </div>
            </div>

            {/* Filter Tracking - Moved under Route Lookup */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-orange-400">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Filter Tracking
                </h2>
              </div>
              <div className="p-4 bg-orange-50/20 dark:bg-gray-700">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Static preview - Click button to view live list
                  </p>
                  <a
                    href="https://movezen.sharepoint.com/:l:/s/mzit/JABCfwwUXXXeS6bKsHSBoD9mATW2fvwan31WG7MNbshVArM?e=2pSDt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live List
                  </a>
                </div>
                <img
                  src="/filter-tracking.png"
                  alt="Filter Tracking Preview"
                  className="w-full rounded border border-gray-200 dark:border-gray-600 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="flex-[40] space-y-6">
            {/* Google Maps */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-teal-600">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Google Map Search
                </h2>
              </div>
              <div className="p-4">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1A5GV6M_vVWKEHp_TJSL9FwE-H_qgxTQ&ehbc=2E312F"
                  width="100%"
                  height="480"
                  frameBorder="0"
                  className="w-full rounded"
                  title="Google Map Search"
                />
              </div>
            </div>

            {/* Operations Management Report */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-orange-700">
              <div className="bg-gradient-to-r from-orange-700 to-orange-800 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Operations Management Report
                </h2>
                <p className="text-xs text-orange-100 mt-1">Click to enlarge</p>
              </div>
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => setZoomedReport('ops')}
              >
                <iframe
                  src="https://app.powerbi.com/view?r=eyJrIjoiZjQ0NjcwZDctYjY4NS00YTJlLWIwMDctY2FjODI5NGNlMWZlIiwidCI6IjJkNThjYzdlLWRiODAtNDk2Ni1iMzYyLTYxYmZmODk1MmEyMCIsImMiOjF9"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="w-full rounded pointer-events-none"
                  title="Operations Management Report"
                />
              </div>
            </div>

            {/* Filter Management Report */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 border-teal-700">
              <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Filter Management Report
                </h2>
                <p className="text-xs text-teal-100 mt-1">Click to enlarge</p>
              </div>
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => setZoomedReport('filter')}
              >
                <iframe
                  src="https://app.powerbi.com/view?r=eyJrIjoiYWQxZjc4N2QtYjc3ZC00ZmZiLWIzNTMtYmRiNmJiNDEwNTQzIiwidCI6IjJkNThjYzdlLWRiODAtNDk2Ni1iMzYyLTYxYmZmODk1MmEyMCIsImMiOjF9"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="w-full rounded pointer-events-none"
                  title="Filter Management Report"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal for Power BI Reports */}
      {zoomedReport && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedReport(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-7xl h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${zoomedReport === 'ops' ? 'bg-gradient-to-r from-orange-700 to-orange-800' : 'bg-gradient-to-r from-teal-700 to-teal-800'} px-6 py-4 flex items-center justify-between rounded-t-lg`}>
              <h2 className="text-xl font-semibold text-white">
                {zoomedReport === 'ops' ? 'Operations Management Report' : 'Filter Management Report'}
              </h2>
              <button
                onClick={() => setZoomedReport(null)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 h-[calc(90vh-4rem)]">
              <iframe
                src={zoomedReport === 'ops'
                  ? "https://app.powerbi.com/view?r=eyJrIjoiZjQ0NjcwZDctYjY4NS00YTJlLWIwMDctY2FjODI5NGNlMWZlIiwidCI6IjJkNThjYzdlLWRiODAtNDk2Ni1iMzYyLTYxYmZmODk1MmEyMCIsImMiOjF9"
                  : "https://app.powerbi.com/view?r=eyJrIjoiYWQxZjc4N2QtYjc3ZC00ZmZiLWIzNTMtYmRiNmJiNDEwNTQzIiwidCI6IjJkNThjYzdlLWRiODAtNDk2Ni1iMzYyLTYxYmZmODk1MmEyMCIsImMiOjF9"
                }
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full rounded"
                title={zoomedReport === 'ops' ? 'Operations Management Report' : 'Filter Management Report'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OperationsSchedule
