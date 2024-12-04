import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BedList from './pages/category/bed/BedList/BedList.js';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bed" element={<BedList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
