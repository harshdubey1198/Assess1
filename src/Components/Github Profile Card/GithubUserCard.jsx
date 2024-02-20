import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const GitHubUserCard = () => {
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${inputValue}`);
      setUserData(response.data);
      setError('');
    } catch (error) {
      setUserData(null);
      setError('User not found');
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="github-user-card">
      <h2>GitHub User Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username or email"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Fetch User</button>
      </form>
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={userData.login} />
          <h3>{userData.login}</h3>
          <p>ID: {userData.id}</p>
          <p>Type: {userData.type}</p>
          <p>Profile: <a href={userData.html_url}>{userData.html_url}</a></p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
        
        </div>
      )}
      <button onClick={() => navigate('/home')}>Go to Home</button>
    </div>
  );
};

export default GitHubUserCard;
