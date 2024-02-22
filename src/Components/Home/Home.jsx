import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]); // State to store fetched data

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://122.168.122.77:9090/login/jwt'); // Using provided API endpoint
        setApiData(response.data); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  if (!user) {
    return (
      <div className="Home-div">
        <p>User not logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="Home-div">
      <h1>Welcome, <span>{user.username || 'Guest'}!</span></h1>
      <button className='abt-btn' onClick={() => navigate('/about')}>About Us</button>

      <ul>
        {apiData.map((item) => (
          <li key={item.id}>{item.title}</li> 
        ))}
      </ul>

      {user.id && (
        <div className='elements1'>
          <label>ID: </label>
          <span>{user.id}</span>
        </div>
      )}

      {user.roles && (
        <div className='elements1'>
          <label>Roles:</label>
          <span>{user.roles.join(', ')}</span>
        </div>
      )}

      {user.tokenType && (
        <div className='elements1'>
          <label>Token Type: </label>
          <span>{user.tokenType}</span>
        </div>
      )}

      {user.accessToken && (
        <div className='elements1'>
          <label>Access Token:</label>
          <span className='jwt-display'>{user.accessToken}</span>
        </div>
      )}

      {onLogout && (
        <button onClick={() => { 
          // Logout and redirect to login page
          onLogout();
          navigate('/login');
        }}>
          Logout
        </button>
      )}
      <div className='btn-row'>
        <button onClick={() => navigate('/form')}>Offer Letter Generator</button>

        <button onClick={() => navigate('/Ip')}>IP Check</button>
        <button onClick={() => navigate('/news')}>News</button>
        <button onClick={() => navigate('/weather')}>Weather</button>
        <button onClick={() => navigate('/search')}>Search Engine</button>
        <button onClick={() => navigate('/calculator')}>Calculator</button>
        
        <button onClick={() => navigate('/gitcard')}>Git Card</button>
        </div>
    </div>
  );
};

export default Home;
