// src/components/NewsPanel.js
import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import './NewsPanel.css';

const NewsPanel = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news data from the backend using Axios
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/news/all');
        console.log(response.data);
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // Slick settings for the carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="NewsCarousel">
      <h2>Știri</h2>
      <Slider {...slickSettings}>
        {newsData.map((newsItem, index) => (
          <div key={index} className="NewsItem">
            {' '}
            {/* Use index as the key */}
            <h3>{newsItem.newsTitle}</h3>
            <p>{newsItem.news}</p>
            <button
              className="Button"
              onClick={() => console.log('Read more clicked')}
            >
              Read more
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsPanel;
