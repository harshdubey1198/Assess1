import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './News.css';

const News = () => {
    const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState('in'); // Default country set to India
  const [language, setLanguage] = useState('en'); // Set language to Hindi

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: country,
            language: language,
            apiKey: 'eedec9628a3d47459df2bbd0636da075'
          }
        });
        setArticles(response.data.articles.slice(0, 20));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [country, language]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="news-container">
      <h1>Top 20 News of the Day</h1>
      <button onClick={() => navigate('/home')}>Home</button>
      <div className="filter-container">
        <label htmlFor="country-select">Select Country:</label>
        <select id="country-select" value={country} onChange={handleChangeCountry}>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="in">India</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="language-select">Select Language:</label>
        <select id="language-select" value={language} onChange={handleChangeLanguage}>
          <option value="en">English</option>
          <option value="hi">Hindi</option> {/* Change value to 'hi' for Hindi */}
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article">
            {article.urlToImage && <img src={article.urlToImage} alt="Article" />}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
