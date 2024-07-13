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
      <Navbar />

      <Routes>
        <Route
          path="/registration"
          element={<Registration handleRegister={() => {}} />}
        />
        <Route path="/login" element={<Login handleSignIn={() => {}} />} />

        <Route path="/" element={<Home />} />
        <Route
          path="/profilelist"
          element={<ProfileList profiles={profiles} deleteProfile={deleteProfile} />}
        />
        <Route
          path="/addprofile"
          element={<AddProfile addProfile={addProfile} />}
        />
        <Route
          path="/edit-profile/:profileId"
          element={
            <EditProfile profiles={profiles} updateProfile={updateProfile} />
          }
        />
        {/* <Route
            path="/movies/:profileId"
            render={(props) => {
              const profile = profiles[props.match.params.profileId];
              return <Movies profile={profile} />;
            }}
          /> */}
      </Routes>
    </Router>
  );
}

export default App;
