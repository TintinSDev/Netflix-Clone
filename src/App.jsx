import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './client/Home'
import Navbar from "./client/Navbar";
import Profiles from "./client/Profile/Profiles";
import Login from "./client/Profile/Login";
import './App.css'
import Registration from "./client/Profile/Registration";

function App() {
  

  return (
    <Router>
      
      <Navbar />
     
      <Routes>
      <Route
            path="/registration"
            element={<Registration handleRegister={() => {}} />}
          />
          <Route
            path="/login"
            element={<Login handleSignIn={() => {}} />}
          />

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profiles />} />
      </Routes>
    </Router>
  )
}

export default App
