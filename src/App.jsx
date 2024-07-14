import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./client/Home";
import Navbar from "./client/Navbar";
import ProfileList from "./client/Profiles/ProfileList";
import AddProfile from "./client/Profiles/AddProfile";
import EditProfile from "./client/Profiles/EditProfile";
import Login from "./client/Logins/Login";
import "./App.css";
import Registration from "./client/Logins/Registration";
// import Movies from "./client/Movies/Movies";
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, []);

  function checkStorage() {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  const handleSignOut = () => {
    // Logic to handle user sign out
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };



  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("profiles");
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = (profile) => {
    if (profiles.length < 4) {
      setProfiles([...profiles, profile]);
    } else {
      alert("Maximum number of profiles reached");
    }
  };
  const updateProfile = (index, updatedProfile) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index] = updatedProfile;
    setProfiles(updatedProfiles);
  };

  const deleteProfile = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete this profile?');
    if (confirmed) {
      const updatedProfiles = profiles.filter((_, i) => i !== index);
      setProfiles(updatedProfiles);
    }
  };

  return (
    <Router>
      <Navbar  isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />

      <Routes>
        <Route
          path="/registration"
          element={<Registration handleRegister={() => {}} />}
        />
        <Route path="/login" element={<Login handleSignIn={() => setIsLoggedIn (true)} />} />

        <Route path="/" element={<Home handleSignIn={() => setIsLoggedIn (true)} />} />
        <Route
          path="/profilelist"
          element={<ProfileList handleSignIn={() => setIsLoggedIn (true)} profiles={profiles} deleteProfile={deleteProfile} />}
        />
        <Route
          path="/addprofile"
          element={<AddProfile handleSignIn={() => setIsLoggedIn (true)} addProfile={addProfile} />}
        />
        <Route
          path="/edit-profile/:profileId"
          element={
            <EditProfile handleSignIn={() => setIsLoggedIn (true)} profiles={profiles} updateProfile={updateProfile} />
          }
        />
        {/* <Route
            path="/movies/:profileId"
            render={(props) => {
              const profile = profiles[props.match.params.profileId];
              return <Movies handleSignIn={() => setIsLoggedIn (true)} {...props} key={props.match.params.profileId}   profile={profile} />;
            }}
          /> */}
      </Routes>
    </Router>
  );
}

export default App;
