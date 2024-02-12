import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';

const IPComponent = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);

  const getLocalIpAddress = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      setIpAddress(ipData.ip);

      const geoResponse = await axios.get(`https://ipapi.co/${ipData.ip}/json/`);
      setGeoLocation(geoResponse.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='Ip-main'>
      <div>
        <h3>IP Address & Geolocation Checker</h3>
        <button onClick={getLocalIpAddress}>Get My Local IP Address and Geolocation</button>

        {ipAddress && <p>Your local IP address is: {ipAddress}</p>}

        {geoLocation && (
          <div>
            <h4>Geolocation Details:</h4>
            <p>City: {geoLocation.city}</p>
            <p>Region: {geoLocation.region}</p>
            <p>Country: {geoLocation.country_name}</p>
            <p>Latitude: {geoLocation.latitude}</p>
            <p>Longitude: {geoLocation.longitude}</p>
          </div>
        )}
        <Link to='/'>
        <button className='btn'>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default IPComponent;
