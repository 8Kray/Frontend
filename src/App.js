import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './pages/home';
import './App.css';

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />{' '}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
