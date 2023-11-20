import React , { useState, useEffect } from 'react'
import axios from 'axios';
import { FaLinkedin } from "react-icons/fa"; 
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Hero() {

  const [user, setUser] = useState({
    id: 1,
    name: '',
    lastName: '',
  });


  const imageId = 1;

  const [positions, setPositions] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [isDropdown1Open, setDropdown1Open] = useState(false);
  const [isDropdown2Open, setDropdown2Open] = useState(false);
  const [isDropdown3Open, setDropdown3Open] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchPositions();
    fetchImage();
  }, []);

    const fetchUser = async () => {
    try {
        const response = await axios.get('http://localhost:8080/app/users/1');
        console.log('User data received:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    const toggleDropdown1 = () => {
    

    
  
      setDropdown1Open(!isDropdown1Open);
      // Close other dropdowns if open
      setDropdown2Open(false);
      setDropdown3Open(false);
    };
  
    const toggleDropdown2 = () => {
      setDropdown2Open(!isDropdown2Open);
      // Close other dropdowns if open
      setDropdown1Open(false);
      setDropdown3Open(false);
    };
  
    const toggleDropdown3 = () => {
      setDropdown3Open(!isDropdown3Open);
      // Close other dropdowns if open
      setDropdown1Open(false);
      setDropdown2Open(false);
    };
  
    const openLinkedInPage = () => {
      // Replace 'YOUR_LINKEDIN_PROFILE_URL' with the actual URL of your LinkedIn profile
      const linkedinUrl = 'https://www.linkedin.com/in/k-t-v-talele';
      window.open(linkedinUrl, '_blank');
    };

    const openTwitterPage = () => {
      // Replace 'YOUR_LINKEDIN_PROFILE_URL' with the actual URL of your LinkedIn profile
      const linkedinUrl = 'https://twitter.com/kiran_talele';
      window.open(linkedinUrl, '_blank');
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/images/${imageId}`);
        setImageData(response.data.data);
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };
    


  return (
    
        <>

        <div className='component hero' >
            <div className='desc'>
            <h3  className='name'>{user.name}<span></span></h3><br />
                <p>{user.description}</p><br />
                <button onClick={openLinkedInPage} className='icon'><FaLinkedin /></button>
                <button onClick={openTwitterPage} className='icon'><AiFillTwitterCircle /></button>
            </div>


            <div className='profile-img'>
              {imageData ? (
        <img src={`data:image/jpeg;base64,${imageData}`} alt="Latest Image" />
      ) : (
        <p>Loading latest image...</p>
      )}
            </div> 


        </div>

        <div className="collapse">

            <div className="component-past component">
            <button className='pastpos' onClick={toggleDropdown1} >Past Positions<IoIosArrowDropdownCircle /></button>
            {isDropdown1Open && (
            <div className="past-list">
            <ul>
        {positions.map((position) => (
          <li key={position.id}>{position.position}</li>
        ))}
      </ul>
            </div>
        )}
            </div>

            <div className="component-past component">
            <button className='pastpos' onClick={toggleDropdown2} >Current Position<IoIosArrowDropdownCircle /></button>
            {isDropdown2Open  && (
            <div className="past-list">
            <ul>
            <li className='li'>Associate Professor Electronics Engineering Department</li>
                    <li className='li'>Incharge, Innovation & Entrepreneurship Development Centre</li>
                    <li className='li'>Mentor,   Master of Computer Application</li>
                    <li className='li'>Head Academic Relations,   Sardar Patel Technology Business Incubator</li>
                    </ul>
            </div>
        )}
            </div>

            <div className="component-past component">
            <button className='pastpos' onClick={toggleDropdown3} >Educational Qualification<IoIosArrowDropdownCircle />
            </button>
            {isDropdown3Open  && (
            <div className="past-list">
            <ul>
                <li className='li'>B.E. ELECTRONICS (1989) First Class with Distinction from Shivaji University Kolhapur</li>
                <li className='li'>M.E. ELECTRONICS (1995) First Class with Distinction from Shivaji University Kolhapur</li>
                    </ul>
            </div>
        )}
            </div>
        </div>
    </>
  )
}

export default Hero
