import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './EditProfile.css';

const avatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
];

const EditProfile = ({ profiles, updateProfile }) => {
  const { profileId } = useParams();
  const profile = profiles[profileId];
  const [name, setName] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedAvatar) {
      updateProfile(profileId, { name, avatar: selectedAvatar });
      navigate('/');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="avatar-selection">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default EditProfile;
