import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Home = ({ onLogout }) => {
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

  return (
    <div className="Home-div">
      <h1>Welcome!</h1>
      <button className='abt-btn' onClick={() => navigate('/about')}>About Us</button>

      <ul>
        {apiData.map((item) => (
          <li key={item.id}>{item.title}</li> 
        ))}
      </ul>

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
        <button onClick={()=>navigate('/xl2json')}>XLSX to Json</button>
        <button onClick={() => navigate('/gitcard')}>Git Card</button>
      </div>
    </div>
  );
};

export default Home;
