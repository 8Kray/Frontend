import React from 'react';
import './news_page_panel.css';

const NewsPanel = ({newsItem}) => {
  console.log('News Item:', newsItem); // Log the newsItem object
  return (
    <div className="newsPanel" id={`news-${newsItem.date}`}>
      <div className="newsContent">
        <h2 className="newsTitle">{newsItem.newsTitle}</h2>
        <p className="newsText">{newsItem.news}</p>
      </div>
    </div>
  );
};

export default NewsPanel;
