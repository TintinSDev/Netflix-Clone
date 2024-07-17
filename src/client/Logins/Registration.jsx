import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

function Registration({ handleRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.role) {
    //   alert("Please select a role.");
    //   return;
    // }
    try {
      const response = await fetch("https://tinflix.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful 😁 ");
        handleRegister(); // Call the handleRegister function passed as a prop
        navigate("/login"); // Redirect to the login page after successful registration
      } else {
        alert(data.error || "An error occurred during registration 😣");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. 😵");
    }
  };

  return (
    <div className="wrapper">
      <form id="registration-form" onSubmit={handleSubmit}>
        <div>
          <h2>Registration</h2>
          <label>Username</label>
          <div className="reg-box">
            <input
              type="text"
              required
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
           
          </div>
          <label>Email</label>
          <div className="reg-box">
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
           
          </div>
          <label>Password</label>
          <div className="reg-box">
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            
          </div>
         <div>
         <label>
              Netflix member?
            </label>
            {/* <a href="/login" className="reg-pop"> Login here ! </a> */}
            <Link to="/login" className="reg-pop" > Login here ! </Link>

         </div>
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

Registration.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default Registration;