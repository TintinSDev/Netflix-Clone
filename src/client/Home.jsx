import { Link } from 'react-router-dom';
import back from '../assets/back.webp'
// import bck from './assets/bck.jpg'
function Home() {
  

    return (
      <>
        <div>
          <img className="back" src={back} />
        </div>
        <div className='home'>
        <h1>Unlimited Movies, TV <br /> Shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
        <form className='home-form'>
            <input type="email" placeholder="Email address" />
            <Link to="/login" className='btn'>GET STARTED &gt; </Link>
        </form>
        </div>
        
       
      </>
    )
  }
  
  export default Home;