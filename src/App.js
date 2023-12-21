import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import Home from './pages/home/home';
import { LogIn } from './pages/logIn/LogIn';
import './App.css';
import { Header } from './components/header/Header';
import { UpBar } from './components/upBar/UpBar';
import { Footer } from './components/footer/Footer';
import { AboutUs } from './pages/aboutUs/AboutUs';
import { AdminPage } from './pages/adminPage/adminPage';

const App = () => {
  return (
    <Router>
      <main>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <UpBar />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route index element={<Home />} />
            </Route>
            <Route
              path="/about-us"
              element={
                <>
                  <Header />
                  <UpBar />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route index element={<AboutUs />} />
            </Route>
            <Route
              path="/admin-page"
              element={
                <>
                  <Header />
                  <UpBar />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route index element={<AdminPage />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
