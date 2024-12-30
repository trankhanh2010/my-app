import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/login';
import CheckTokenMiddleware from "./components/middleware/CheckTokenMiddleware";

import BedList from './pages/category/bed/BedList';
import TestServiceReqList from './pages/data/testServiceReqListVView/TestServiceReqList';
import TestServiceReqListNoLogin from './pages/data/testServiceReqListVView/TestServiceReqListNoLogin';
import ResultPayment from './pages/transaction/ResultPayment'

const App = () => {
  return (
    <Router>
      <CheckTokenMiddleware>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/bed" element={<BedList />} />

          <Route path="/test-service-req-list" element={<TestServiceReqList />} />
          <Route path="/test-service-req-list-no-login" element={<TestServiceReqListNoLogin />} />

          <Route path="/result-payment" element={<ResultPayment />} />

        </Routes>
        <Footer />
      </CheckTokenMiddleware>
    </Router>
  );
};

export default App;
