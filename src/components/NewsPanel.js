// src/components/NewsPanel.js
import React from 'react';
import Slider from 'react-slick';
import './NewsPanel.css';

const NewsPanel = () => {
  // Mock news data for testing
  const mockNewsData = [
    {
      id: 1,
      title: 'Mock News 1',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Mock News 2',
      summary:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      title: 'Mock News 3',
      summary:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      id: 4,
      title: 'Mock News 4',
      summary:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    // Add more mock news items as needed
  ];

  // Slick settings for the carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll
  };

  return (
    <div className="NewsCarousel">
      <h2>Știri</h2>
      <Slider {...slickSettings}>
        {mockNewsData.map((newsItem) => (
          <div key={newsItem.id} className="NewsItem">
            <h3>{newsItem.title}</h3>
            <p>{newsItem.summary}</p>
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
