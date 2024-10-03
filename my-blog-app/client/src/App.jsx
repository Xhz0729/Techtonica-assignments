import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage';
import Posts from './components/Posts';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
