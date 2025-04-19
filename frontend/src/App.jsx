import React from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ConnectionTest from './components/ConnectionTest'

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
