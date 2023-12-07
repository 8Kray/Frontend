/*eslint-disable*/
import React from 'react';
import './Footer.css'


const sponsors = [
  {
    id: 1,
    name: 'Celestin',
    logo: process.env.PUBLIC_URL + '/Celestin.png',
    link: 'https://www.tipografiacelestin.ro/',
  },
  {
    id: 2,
    name: 'USV',
    logo: process.env.PUBLIC_URL + '/Sigla-USV-scroll.png',
    link: 'https://www.usv.ro/',
  },
  {
    id: 3,
    name: 'Pepenero',
    logo: process.env.PUBLIC_URL + '/pepenero.png',
    link: 'https://pepeneropizza.ro/',
  },
  {
    id: 4,
    name: 'Vivendi',
    logo: process.env.PUBLIC_URL + '/vivendi.png',
    link: 'https://restaurantvivendi.ro/',
  },
  {
    id: 4,
    name: 'Fiterman',
    logo: process.env.PUBLIC_URL + '/fiterman.png',
    link: 'https://www.fitermanpharma.ro/',
  },
  {
    id: 5,
    name: 'Mihu',
    logo: process.env.PUBLIC_URL + '/mihu.png',
    link: 'https://mihushop.ro/firma/',
  },
  {
    id: 6,
    name: 'IuliuMoll',
    logo: process.env.PUBLIC_URL + '/im.png',
    link: 'https://suceava.iuliusmall.com/',
  },
  {
    id: 7,
    name: 'Suceava',
    logo: process.env.PUBLIC_URL + '/suceava.png',
    link: 'https://ro.wikipedia.org/wiki/Suceava',
  },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="sponsors-container">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-circle">
            <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
              <img src={sponsor.logo} alt={sponsor.name} />
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
};

