import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('text');
  const navigate=useNavigate();

  const handleSearch = async () => {
    let url;
    if (searchType === 'text') {
      url = `https://google-search72.p.rapidapi.com/search?q=${encodeURIComponent(query)}&gl=us&lr=lang_en&num=10&start=0`;
    } else {
      url = `https://google-search72.p.rapidapi.com/imagesearch?q=${encodeURIComponent(query)}&gl=us&lr=lang_en&num=10&start=0`;
    }

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a40b97d3bemsh26765923310d239p1859c0jsn7ee983ccc2a1',
        'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.get(url, options);
      const items = response.data.items || [];

      let searchResults;
      if (searchType === 'text') {
        searchResults = items.map(item => ({
          title: item.title,
          snippet: item.snippet,
          link: item.link
        }));
      } else {
        searchResults = items.map(item => ({
          title: item.title,
          imageUrl: (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) ? item.pagemap.cse_image[0].src : null
        }));
      }

      setResults(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const toggleSearchType = () => {
    setSearchType(searchType === 'text' ? 'image' : 'text');
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={toggleSearchType}>Toggle Search Type</button>
      <button onClick={() => navigate('/')}>Home</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {searchType === 'text' ? (
              <>
                <a href={result.link}>{result.title}</a>
                <p>{result.snippet}</p>
              </>
            ) : (
              <>
                <p>{result.title}</p>
                {result.imageUrl && <img src={result.imageUrl} alt="Search result" />}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchEngine;
