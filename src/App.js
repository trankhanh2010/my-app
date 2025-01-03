import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Info401 from './pages/error/Info401';
import Info403 from './pages/error/Info403';
import Info500 from './pages/error/Info500';

import CheckTokenMiddleware from "./components/middleware/CheckTokenMiddleware";

import BedList from './pages/category/bed/BedList';
import TestServiceReqList from './pages/data/treatmentFeeListVView/TreatmentFeeList';
import TestServiceReqListNoLogin from './pages/data/treatmentFeeListVView/TreatmentFeeListNoLogin';
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

          <Route path="/info-401" element={<Info401 />} />
          <Route path="/info-403" element={<Info403 />} />
          <Route path="/info-500" element={<Info500 />} />

        </Routes>
        <Footer />
      </CheckTokenMiddleware>
    </Router>
  );
};

export default App;
