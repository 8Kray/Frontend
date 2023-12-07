/*eslint-disable*/
import React from 'react';
import './upBar.css';
import { Link } from 'react-router-dom';


export const UpBar = () => {
  return (
    <div className='bar'>
      <Link to={'/'} className='link'>
        <h5>Handbal Juvenili</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Detalii Club</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Calendar Meciuri</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Noutăți</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Personal</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Sponsori</h5>
      </Link>
      <Link to={'/'} className='link'>
        <h5>Administrare</h5>
      </Link>
    </div>
  );
};
