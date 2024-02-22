import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import IPComponent from './Components/IpFetch/IPComponent';
import { ThemeProvider } from './ThemeContext';
import Imageblend from './Components/Image Splash/Imageblend';
import News from './Components/News/News';
import WeatherForecast from './Components/Weather Forecast/WeatherForecast';
import SearchEngine from './Components/SearchEngine/SearchEngine';
import Calculator from './Components/Calculator/Calculator';
import GitHubUserCard from './Components/Github Profile Card/GithubUserCard';
import About from './Components/About & Feedback/About';
import Form from './Components/Offer letter/Form';
import OfferLetterTemplate from './Components/Offer letter/OfferLetterTemplate';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getSavedUser());
  
  const handleLogin = (userData) => {
    setLoggedInUser(userData);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    clearLocalStorage();
    setLoggedInUser(null);
    return <Navigate to="/" replace={true} />;
  };
  
  // Redirect to home page if not localhost
  if (window.location.hostname !== 'localhost') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Home user={loggedInUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace={true} /> 
              )
            }
          />
          <Route path="/img" element={<Imageblend/>}/>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home user={loggedInUser} onLogout={handleLogout} />} />
          <Route path='/Ip' element={<IPComponent/>}/>  
          <Route path='/news' element={<News/>} />
          <Route path='/calculator' element={<Calculator/>} />
          <Route path='/weather' element={<WeatherForecast/>}/>
          <Route path='/search' element={<SearchEngine/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/form' element={<Form/>} />
          <Route path='/gitcard' element={<GitHubUserCard/>} />
          <Route path='/offerletter' element={<OfferLetterTemplate/>} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const clearLocalStorage = () => {
  localStorage.removeItem('loggedInUser');
};

const saveUserToLocalStorage = (userData) => {
  localStorage.setItem('loggedInUser', JSON.stringify(userData));
};

const getSavedUser = () => {
  const storedUser = localStorage.getItem('loggedInUser');
  return storedUser ? JSON.parse(storedUser) : null;
};
