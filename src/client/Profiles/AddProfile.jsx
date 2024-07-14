import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './AddProfile.css';


const avatars = [
  '/src/client/Profiles/icons/avatar1.png',
  '/src/client/Profiles/icons/avatar2.png',
  '/src/client/Profiles/icons/avatar3.png',
  '/src/client/Profiles/icons/avatar4.png',
  '/src/client/Profiles/icons/avatar5.png',
  '/src/client/Profiles/icons/avatar6.png',
  '/src/client/Profiles/icons/avatar7.png',
  '/src/client/Profiles/icons/avatar8.png',
];
const AddProfile = ({ addProfile }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name &&selectedAvatar) {
      addProfile({ name, avatar: selectedAvatar });
      setName('');
      setSelectedAvatar('');
      navigate("/profilelist");
    }
  };

  return (
    <div className="add-profile-container">
      <h2>Add Profile</h2>
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
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};
AddProfile.propTypes = {
    addProfile: PropTypes.func.isRequired,
  };

export default AddProfile;
