import { Link } from 'react-router-dom';
import Proptypes from "prop-types";
import './ProfileList.css';

const ProfileList = ({ profiles }) => {
  return (
    <div className="profile-list">
      <h1>Who &apos; s watching?</h1>
      <div className="profiles">
        {profiles.map((profile, index) => (
          <Link key={index} to={`/movies/${index}`} className="profile-link">
          <div className="profile">
            <img src={profile.avatar} alt={`${profile.name}'s avatar`} />
            <span>{profile.name}</span>
          </div>
        </Link>
        ))}
        <div className="profile add-profile">
          <Link to="/addprofile">
            <div className="add-icon">+</div>
            <span>Add Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

ProfileList.propTypes = {
  profiles: Proptypes.array.isRequired,
};

export default ProfileList;
