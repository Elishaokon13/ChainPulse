import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signals from './pages/Signals'
import Metrics from './pages/Metrics'
import Api from './pages/Api'
import About from './pages/About'
import ProjectDetails from './pages/ProjectDetails'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/signals" element={<Signals />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
