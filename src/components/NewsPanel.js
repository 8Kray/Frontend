/* eslint-disable */
import React, {useState, useEffect} from 'react';
import './NewsPanel.css';

const NewsPanel = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news data from your database/API
    // Update the state with the fetched data
    // Example: Fetching from a hypothetical API endpoint
    fetch('https://api.example.com/news')
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  //   return (
  //     <div className='NewsPanel'>
  //       {newsData.map((newsItem) => (
  //         <div key={newsItem.id} className='news-item'>
  //           <h3>{newsItem.title}</h3>
  //           <p>{newsItem.summary}</p>
  //           <button onClick={() => console.log('Read more clicked')}>
  //             Read more
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <div className="NewsPanel">
      <h3>Titlu articol Lorem ipsum dolor sit amet....</h3>
      <button>Vezi mai mult</button>
    </div>
  );
};

export default NewsPanel;
