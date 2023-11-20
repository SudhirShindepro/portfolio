import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
      // Hardcoded user credentials
      const validUsername = 'sudhir';
      const validPassword = '9819';
  
      if (username === validUsername && password === validPassword) {
        // Successful login
        console.log('User logged in successfully');
        // Redirect user or perform additional actions based on authentication result
        navigate('/edit')
      } else {
        // Handle authentication error
        setError('Invalid username or password');
      }
    };


  return (
    <div className="login-container">
  <form>
    <label>
      Username:
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <br />
    <button type="submit" onClick={handleLogin}>
      Login
    </button>
    {error && <p className="error-message">{error}</p>}
  </form>
</div>

  );
};

export default Signin
