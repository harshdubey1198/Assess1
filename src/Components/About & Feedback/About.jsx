import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>Welcome to our application! We're excited to have you here.</p>
      <p>
        Our application aims to provide users with [brief description of your application's purpose or mission].
      </p>
      <p>
        Here are some key features of our application:
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          {/* Add more features as needed */}
        </ul>
      </p>
      <p>
        We're constantly working to improve and enhance our application. If you have any feedback or suggestions, please feel free to <Link to="/feedback">contact us</Link>.
      </p>
      <p>Thank you for using our application!</p>
    </div>
  );
};

export default About;
