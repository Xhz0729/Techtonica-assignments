import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Login />
        <Register />
      </div>
    </>
  )
}

export default App
