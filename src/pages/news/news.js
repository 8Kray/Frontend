// News.jsx
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NewsPanel from '../../components/news_page_panel';
import './news.css';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/news/all');
        console.log('Fetched data:', response.data);
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="NewsContainer">
      <img
        src={
          process.env.PUBLIC_URL +
          '/374772816_874937010658932_698494937274974792_n.png'
        }
        alt="Echipa CSU Suceava"
        className="Image"
      />
      {newsData.map((newsItem) => (
        <NewsPanel key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default News;
