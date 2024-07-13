import { Link } from 'react-router-dom';
import Proptypes from "prop-types";
import "./AddProfile";
import deleteIcon from "./icons/delete.ico";
import './ProfileList.css';

const ProfileList = ({ profiles, deleteProfile }) => {
  return (
    <div className="profile-list">
      <h1 className="profile-title">Who&apos;s watching?</h1>
      <div className="profiles">
      {profiles.map((profile, index) => (
          <div key={index} className="profile">
            <Link to={`/movies/${index}`} className="profile-link">
              <img src={profile.avatar} alt={`${profile.name}'s avatar`} /> <br/>
              <span className='profile-name'>{profile.name}</span>
            </Link>
            <Link to={`/edit-profile/${index}`} className="edit-link">Edit Profile</Link>
            <button className="delete-button" onClick={() => deleteProfile(index)}>
              <img src={deleteIcon} alt="Delete" className="delete-icon" />
            </button>
          </div>
        ))}
        {profiles.length < 4 && (
          <div className="profile add-profile">
            <Link to="/addprofile">
              <div className="add-icon">+</div>
              <span>Add Profile</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileList.propTypes = {
  profiles: Proptypes.array.isRequired,
  deleteProfile: Proptypes.func.isRequired,
};

export default ProfileList;
