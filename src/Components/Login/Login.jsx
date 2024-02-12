import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://122.168.122.77:9090/login/jwt', {
        username,
        password,
      });

      onLogin(response.data);
       navigate('/home'); // Redirect to home page after successful login

    } catch (error) {

      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className='Login-div'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='elements'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='elements'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
