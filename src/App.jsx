import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MainCanvas from './components/MainCanvas'
import ActionsPanel from './components/ActionsPanel'
import Header from './components/Header'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Default to collapsed on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved !== null ? saved === 'true' : isMobile
  })

  const [isActionsPanelOpen, setIsActionsPanelOpen] = useState(false)
  const [activeModule, setActiveModule] = useState('county-search')

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed)
  }, [isSidebarCollapsed])

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onToggleActions={() => setIsActionsPanelOpen(!isActionsPanelOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />

        <MainCanvas activeModule={activeModule} />

        <ActionsPanel
          isOpen={isActionsPanelOpen}
          onClose={() => setIsActionsPanelOpen(false)}
          activeModule={activeModule}
        />
      </div>
    </div>
  )
}

export default App
