/*eslint-disable*/
import React from 'react';
import './upBar.css';
import { Link } from 'react-router-dom';

const isAdmin = localStorage.getItem('isAdmin');

export const UpBar = () => {
  return (
    <div className="bar">
      <Link to={'/juvenili'} className="link">
        <h5>Handbal Juvenili</h5>
      </Link>
      <Link to={'/about-us'} className="link">
        <h5>Detalii Club</h5>
      </Link>
      <Link to={'/'} className="link">
        <h5>Calendar Meciuri</h5>
      </Link>
      <Link to={'/'} className="link">
        <h5>Noutăți</h5>
      </Link>
      <Link to={'/personal'} className="link">
        <h5>Personal</h5>
      </Link>
      <Link to={'/sponsori'} className="link">
        <h5>Sponsori</h5>
      </Link>
      <a href={'https://www.sofascore.ro/ro/echipa/handbal/csu-suceava/117656'} className="link" target="_blank" rel="noopener noreferrer">
        <h5>Clasament</h5>
      </a>
      {isAdmin === 'true' ? (
        <Link to={'/admin-page'} className="link">
          <h5>Administrare</h5>
        </Link>
      ) : (
        <h5 style={{ color: 'gray' }}>Administrare</h5>
      )}
    </div>
  );
};
