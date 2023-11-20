import React , { useState, useEffect } from 'react'
import axios from 'axios';
import { FaLinkedin } from "react-icons/fa"; 
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function EditContent() {

    const [isDropdown1Open, setDropdown1Open] = useState(false);
    const [isDropdown2Open, setDropdown2Open] = useState(false);
    const [isDropdown3Open, setDropdown3Open] = useState(false);
    const [positions, setPositions] = useState([]);
    const [pastPosition, setPastPosition] = useState({position: '',});
    const [file, setFile] = useState(null);
    const [imageId, setImageId] = useState(null);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(['']); 
    const [imageData, setImageData] = useState(null);
    const [user, setUser] = useState({
        id: 1,
        name: '',
        description: '',
      });

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
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };

      const handlePositionChange = (e) => {
        const { name, value } = e.target;
        setPastPosition((prevPosition) => ({
          ...prevPosition,
          [name]: value,
        }));
      };

      const fetchPositions = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/positions');
          setPositions(response.data);
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
      };

      const handleUpdatePastPosition = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/positions', {
            method: 'POST', // Assuming your update endpoint is a PUT request
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pastPosition),
          });
    
          if (response.ok) {
            console.log('Past position updated successfully');
          } else {
            console.error('Error updating past position');
          }
        } catch (error) {
          console.error('Error updating past position:', error);
        }
      };

      const handleRefresh = () => {
        window.location.reload();
      };
      
      const handleUpdateUser = async () => {
        try {
          const response = await axios.put(
            `http://localhost:8080/app/users/${user.id}`,
            user
          );
          navigate("/")
          console.log('User updated:', response.data);
        } catch (error) {
          console.error('Error updating user:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
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
    
      const handleInputChangenew = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
      };
  
      const handleAddInput = () => {
        setInputs([...inputs, '']); // Add a new empty input
      };
  
      const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1); // Remove input at the specified index
        setInputs(newInputs);
      };

      const handleDeletePosition = async (positionId) => {
        try {
          await axios.delete(`http://localhost:8080/api/positions/${positionId}`);
          // Assuming successful deletion, update the local state or refetch positions
          setPositions((prevPositions) => prevPositions.filter((position) => position.id !== positionId));
          console.log(`Position with ID ${positionId} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting position with ID ${positionId}:`, error);
        }
      };

      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await axios.put('http://localhost:8080/api/images/update/1', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          setImageId(response.data);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };

      const fetchImage = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/images/1`);
          setImageData(response.data.data);
        } catch (error) {
          console.error('Error fetching image:', error.message);
        }
      };
      

  return (
    
        <>
        
        

      <button type="button" onClick={handleUpdateUser}>Update User</button>
      <div className='component hero' style={{marginTop: 10}}>
      
            <div className='desc'>

            <input className='name'
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        /><br />
        
        <textarea className='editDescription'
         overflow="scroll"
          type="text"
          name="description"
          value={user.description}
          onChange={handleInputChange}
        /><br /><br />  
                <button className='icon' ><FaLinkedin /></button>
                <button className='icon'><AiFillTwitterCircle /></button>
        </div>

            
            <div className='profile-img'>
            {imageData ? (
        <img src={`data:image/jpeg;base64,${imageData}`} alt="Latest Image" />
      ) : (
        <p>Loading latest image...</p>
      )}
                <div className='upload-btn'>
                <input type="file" onChange={handleFileChange} />
                <button className='upload-bt'
                onClick={() =>{
                  handleUpload()
                  handleRefresh();
                }}>Upload Image</button>
                </div>
                
            </div> 

            
        </div>

        <div className="collapse">

            <div className="component-past component">
            <button className='pastpos' onClick={toggleDropdown1} >Past Positions<IoIosArrowDropdownCircle /></button>
            {isDropdown1Open && (
            <div className="past-list">
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.id}>
                      <td>{position.position}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeletePosition(position.id)}>
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {inputs.map((input, index) => (
            <div key={index} >
          <input
              className='li'
              type="text"
              name="position"
              value={pastPosition.position}
              onChange={handlePositionChange}
          />
          
          <div className="button-container">
          <button class="btn" 
          onClick={() =>{
            handleUpdatePastPosition();
            handleAddInput();
            handleInputChangenew();
            handleRefresh();
          }}>
            Add <IoMdAdd /></button>

          <button class="btn" onClick={() => 
            handleRemoveInput()}>Remove<CiCircleRemove /></button>
          </div>
            
          
          
        </div>
      ))}
      
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
            <li className='li'>Associate Professor Electronics Engineering Department</li>
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
export default EditContent
