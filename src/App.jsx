import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './client/Home'
import Navbar from "./client/Navbar";
import Profile from "./client/Profile";
import './App.css'

function App() {
  

  return (
    <Router>
      <Home />
      <Navbar />
      <Profile/>
      <Routes>
        
      </Routes>
    </Router>
  )
}

export default App
