import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/login';

import BedList from './pages/category/bed/BedList';
import TestServiceReqList from './pages/data/testServiceReqListVView/TestServiceReqList';
import ResultPayment from './pages/transaction/ResultPayment'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/bed" element={<BedList />} />

        <Route path="/test-service-req-list" element={<TestServiceReqList />} />

        <Route path="/result-payment" element={<ResultPayment />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
