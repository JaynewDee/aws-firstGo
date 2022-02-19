import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
    <div className="flex-column justify-flex-start min-100-vh">
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profile/:username" element={<Profile/>} />
          <Route element={<NoMatch/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
