import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AddProfile.css';

const AddProfile = ({ addProfile }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && avatar) {
      addProfile({ name, avatar });
      setName('');
      setAvatar('');
      history.push('/');
    }
  };

  return (
    <div className="add-profile">
      <h2>Add Profile</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Avatar URL" 
          value={avatar} 
          onChange={(e) => setAvatar(e.target.value)} 
          required 
        />
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};
AddProfile.propTypes = {
    addProfile: PropTypes.func.isRequired,
  };

export default AddProfile;
