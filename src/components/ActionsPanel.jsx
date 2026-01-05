import { Bell, Calendar, CheckCircle, AlertCircle, X, MapPin } from 'lucide-react'
import { useEffect } from 'react'

function ActionsPanel({ isOpen, onClose, activeModule }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  const activities = [
    {
      id: 1,
      type: 'success',
      title: 'Script completed',
      description: 'Data Processing Script ran successfully',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled task',
      description: 'Report Generator will run at 9 PM',
      time: '4 hours',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Action required',
      description: 'Database Cleanup needs configuration',
      time: '1 day ago',
    },
  ]

  // Module-specific quick actions
  const getQuickActions = () => {
    if (activeModule === 'operations-schedule') {
      return [
        {
          id: 1,
          label: 'Route Builder',
          icon: MapPin,
          url: 'https://www.mapquest.com/routeplanner'
        },
      ]
    }

    // Default actions for other modules
    return [
      { id: 1, label: 'Run All Scripts', icon: CheckCircle },
      { id: 2, label: 'Schedule Task', icon: Calendar },
      { id: 3, label: 'View Notifications', icon: Bell },
    ]
  }

  const quickActions = getQuickActions()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed md:relative right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800
                   border-l border-gray-200 dark:border-gray-700 overflow-y-auto z-50
                   transform transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                   md:block`}
      >
        {/* Close button - only visible on mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Actions
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close actions panel"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              const Component = action.url ? 'a' : 'button'
              return (
                <Component
                  key={action.id}
                  href={action.url}
                  target={action.url ? '_blank' : undefined}
                  rel={action.url ? 'noopener noreferrer' : undefined}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {action.label}
                  </span>
                </Component>
              )
            })}
          </div>
        </div>

        {/* Route Builder for Operations Schedule */}
        {activeModule === 'operations-schedule' && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Route Builder
              </h3>
              <a
                href="https://www.mapquest.com/routeplanner/copy-paste"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                title="Open in new tab"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
            <iframe
              src="https://www.mapquest.com/routeplanner/copy-paste"
              width="100%"
              height="1200"
              frameBorder="0"
              className="w-full rounded border border-gray-200 dark:border-gray-600"
              title="MapQuest Route Builder"
            />
          </div>
        )}

        {activeModule !== 'operations-schedule' && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`mt-0.5 p-1 rounded-full ${
                    activity.type === 'success'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : activity.type === 'info'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}
                >
                  {activity.type === 'success' && (
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  )}
                  {activity.type === 'info' && (
                    <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  )}
                  {activity.type === 'warning' && (
                    <AlertCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default ActionsPanel
