import React from 'react';
import './UltimulMeci.css';

const UltimulMeci = () => {
  return (
    <div className="MeciContainer">
      <img
        src="https://placekitten.com/300/200" // Replace with your actual image source
        alt="Next Game"
        className="GameImage"
      />
      <div className="NextGameText">
        <h3>Ultimul meci</h3>
        <p>Placeholder text for the next game details.</p>
      </div>
    </div>
  );
};

export default UltimulMeci;
