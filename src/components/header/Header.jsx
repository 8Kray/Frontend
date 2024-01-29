import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonIcon from '@mui/icons-material/Person';
import { common } from '@mui/material/colors';
import { useAuth } from '../AuthProvider';

export const Header = () => {
  const navigate = useNavigate();
  const { isAdmin, isMedia } = useAuth();

  const instagramLink = 'https://www.instagram.com/csusuceava/?hl=ro';
  const facebookLink = 'https://www.facebook.com/CSUSuceava/?locale=ro_RO';

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handlePersonalInfoClick = () => {
    navigate('/admin-page/personal');
  };
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <div className="header">
      <div className="links_container">
        <div className="links">
          <Link to={instagramLink} target="_blank">
            <InstagramIcon sx={{ fontSize: 45, color: common.white }} />
          </Link>
        </div>
        <div className="links">
          <Link to={facebookLink} target="_blank">
            <FacebookIcon sx={{ fontSize: 45, color: common.white }} />
          </Link>
        </div>
      </div>
      <img
        src="/logo.png"
        alt="Logo CSU Suceava"
        className="logo"
        onClick={handleLogoClick}
      />

      <div className="auth_container">
        {isAdmin || isMedia ? (
          <div className="login" onClick={handlePersonalInfoClick}>
            <PersonIcon sx={{ color: common.white }} />
          </div>
        ) : (
          <div className="login" onClick={handleLoginClick}>
            <h3>LOGIN</h3>
            <PersonIcon sx={{ color: common.white }} />
          </div>
        )}
      </div>
    </div>
  );
};
