import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuProvider } from "./context/MenuContext";
import { AuthProvider } from './context/AuthContext';
import { AuthOtpProvider } from './context/AuthOtpContext';

import Header from './components/Header';
import Footer from './components/Footer';

import CheckTokenMiddleware from "./components/middleware/CheckTokenMiddleware";
import routes from "./routes"; // Import danh sách route


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MenuProvider>
          <AuthOtpProvider>
            <CheckTokenMiddleware>
              <Header />
              <Routes>
                {/*Danh sách url */}
                {routes.map(({ path, component: Component }, index) => (
                  <Route key={index} path={path} element={<Component />} />
                ))}
              </Routes>
              <Footer />
            </CheckTokenMiddleware>
          </AuthOtpProvider>
        </MenuProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
