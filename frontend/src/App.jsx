import React from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ConnectionTest from './components/ConnectionTest'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PopupProvider } from './context/PopupContext'

function App() {
  return (
    <div className="app">
      <LandingPage />
      {/* Uncomment the line below to test the connection */}
      {/* <ConnectionTest /> */}
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <App />
    </PopupProvider>
  </StrictMode>,
)
