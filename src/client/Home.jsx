import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import back from "../assets/back.webp";
import { sendEmail } from "../actions/Reply";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const name = "User";
    const message = "Welcome to Tinflix 😁";

    if (!email) {
      alert("Please enter your email");
      return;
    }
    
    try {
      await sendEmail( email, message);
      alert("Email sent successfully!");

      // Clear the input field
      setEmail("");
       // Record email sending event in the backend
      //  const response = await fetch('http://localhost:5000/send-email', {
      const response = await fetch('https://tinflix.vercel.app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Email event recorded successfully!');
      } else {
        throw new Error('Failed to record email event.');
      }
      // Navigate to /login
      navigate("/login");
      
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <>
      <div>
        <img className="back" src={back} />
      </div>
      <div className="home">
        <h1>
          Unlimited Movies, TV <br /> Shows, and more.
        </h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <form className="home-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            GET STARTED &gt;{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
