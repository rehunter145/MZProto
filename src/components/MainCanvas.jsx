import { Play, Edit, Trash2, Plus } from 'lucide-react'
import CountySearch from './CountySearch'
import TurnoverBuilder from './TurnoverBuilder'

function MainCanvas({ activeModule }) {
  const renderModule = () => {
    switch (activeModule) {
      case 'county-search':
        return <CountySearch />
      case 'turnover-builder':
        return <TurnoverBuilder />
      case 'scripts':
        return <ScriptManager />
      case 'automation':
        return <AutomationModule />
      case 'data':
        return <DataHub />
      default:
        return <CountySearch />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {renderModule()}
    </main>
  )
}

function ScriptManager() {
  const scripts = [
    {
      id: 1,
      title: 'Data Processing Script',
      description: 'Processes incoming data feeds and transforms them for analytics',
      status: 'Active',
      lastRun: '2 hours ago',
    },
    {
      id: 2,
      title: 'Report Generator',
      description: 'Generates weekly reports and sends them to stakeholders',
      status: 'Scheduled',
      lastRun: '1 day ago',
    },
    {
      id: 3,
      title: 'Database Cleanup',
      description: 'Removes old records and optimizes database performance',
      status: 'Inactive',
      lastRun: '5 days ago',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Script Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and execute your automation scripts
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Script</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {script.title}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  script.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : script.status === 'Scheduled'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {script.status}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {script.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Last run: {script.lastRun}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Run script"
                >
                  <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Edit script"
                >
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Delete script"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AutomationModule() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Automation
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Automation module content goes here. This is a placeholder for your automation workflows.
        </p>
      </div>
    </div>
  )
}

function DataHub() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Data Hub
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Data Hub module content goes here. This is a placeholder for your data management tools.
        </p>
      </div>
    </div>
  )
}

export default MainCanvas
