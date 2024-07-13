import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './client/Home'
import Navbar from "./client/Navbar";
import ProfileList from "./client/Profiles/ProfileList";
import AddProfile from "./client/Profiles/AddProfile"
import EditProfile from "./client/Profiles/EditProfile"
import Login from "./client/Logins/Login";
import './App.css'
import Registration from "./client/Logins/Registration";
// import Movies from "./client/Movies/Movies";
function App() {
  const [profiles, setProfiles] = useState([
    { name: 'User 1', avatar: '/path/to/avatar1.png' },
    { name: 'User 2', avatar: '/path/to/avatar2.png' },
  ]);

  const addProfile = (profile) => {
    if (profiles.length < 4){
      setProfiles([...profiles, profile]);
    } else {
      alert ("Maximum number of profiles reached");
    }
   
  };
  const updateProfile = (index, updatedProfile) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index] = updatedProfile;
    setProfiles(updatedProfiles);
  };

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
        <Route path="/profilelist" element={<ProfileList profiles={profiles} />} />
        <Route path="/addprofile" element={<AddProfile addProfile={addProfile} />} />
        <Route path="/edit-profile/:profileId" element={<EditProfile profiles={profiles} updateProfile={updateProfile} />} />
        {/* <Route
            path="/movies/:profileId"
            render={(props) => {
              const profile = profiles[props.match.params.profileId];
              return <Movies profile={profile} />;
            }}
          /> */}
      </Routes>
    </Router>
  )
}

export default App
