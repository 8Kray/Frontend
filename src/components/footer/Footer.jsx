/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import './Footer.css'
import axios from 'axios';


const sponsorImages = {
  Celestin: process.env.PUBLIC_URL + '/sponsors/Celestin.png',
  USV: process.env.PUBLIC_URL + '/sponsors/Sigla-USV-scroll.png',
  Pepenero: process.env.PUBLIC_URL + '/sponsors/pepenero.png',
  Vivendi: process.env.PUBLIC_URL + '/sponsors/vivendi.png',
  Fiterman: process.env.PUBLIC_URL + '/sponsors/fiterman.png',
  Mihu: process.env.PUBLIC_URL + '/sponsors/mihu.png',
  IuliusMall: process.env.PUBLIC_URL + '/sponsors/im.png',
  Suceava: process.env.PUBLIC_URL + '/sponsors/suceava.png',
};


export const Footer = () => {

  const [sponsorsData, setSponsorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sponsors/all');
        setSponsorsData(response.data);
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <footer className="footer">
      <div className="sponsors-container">
        {sponsorsData.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-circle">
            <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">
              <img src={sponsorImages[sponsor.sponsor]} alt={`${sponsor.sponsor}`} />
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
};

