import Proptypes from "prop-types";

const Movies = ({ profile }) => {
  return (
    <div>
      <h2>Welcome, {profile.name}</h2>
      <p>Here are some movies for you, {profile.name}!</p>
      {/* Add movie listings or any other content here */}
    </div>
  );
};
Movies.propTypes = {
    profile: Proptypes.array.isRequired,
  };

export default Movies;
