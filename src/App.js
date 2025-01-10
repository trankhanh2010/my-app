import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuProvider } from "./context/MenuContext";
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Info401 from './pages/error/Info401';
import Info403 from './pages/error/Info403';
import Info500 from './pages/error/Info500';

import CheckTokenMiddleware from "./components/middleware/CheckTokenMiddleware";

import BedList from './pages/category/bed/BedList';
import TreatmentFeeList from './pages/data/treatmentFeeListVView/TreatmentFeeList';
import TreatmentFeeListNoLogin from './pages/data/treatmentFeeListVView/TreatmentFeeListNoLogin';
import ResultPayment from './pages/transaction/ResultPayment'
import TransactionList from './pages/data/transactionListVView/TransactionList';
import TransactionTamUng from './pages/transaction/TransactionTamUng';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MenuProvider>
          <CheckTokenMiddleware>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />

              <Route path="/bed" element={<BedList />} />

              <Route path="/treatment-fee-list" element={<TreatmentFeeList />} />
              <Route path="/treatment-fee-list-no-login" element={<TreatmentFeeListNoLogin />} />
              <Route path="/result-payment" element={<ResultPayment />} />

              <Route path="/transaction-list" element={<TransactionList />} />
              <Route path="/transaction-tam-ung" element={<TransactionTamUng />} />

              <Route path="/info-401" element={<Info401 />} />
              <Route path="/info-403" element={<Info403 />} />
              <Route path="/info-500" element={<Info500 />} />

            </Routes>
            <Footer />
          </CheckTokenMiddleware>
        </MenuProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
