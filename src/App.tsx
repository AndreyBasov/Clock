import React from 'react'
import Clock from './components/Clock'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="clocks-container">
      <Clock
        twelveFormat={true}
        showSeconds={false}
        steps={{
          hours: 2,
          minutes: 3,
          seconds: 1
        }}
      />
      <Clock
        steps={{
          hours: 1,
          minutes: 1,
          seconds: 5
        }}
        initialTime="22:16:45" />
      <Clock
        twelveFormat={true}
        steps={{
          hours: 1,
          minutes: 4,
          seconds: 15
        }}
        initialTime="18:28:15" />
      <Clock
        steps={{
          hours: 2,
          minutes: 5,
          seconds: 10
        }}
        initialTime="6:10:00" />
    </div>
  )
}

export default App
