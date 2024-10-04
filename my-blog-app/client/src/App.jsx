import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post-details/:postId" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
