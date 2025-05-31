// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import AllProduct from './pages/AllProduct';
import Header from './component/Header';
import Footer from './component/Footer';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import HowItWorks from './pages/HowItWorks';
import { AuthContext } from './pages/AuthContext';
import ForgottenPassword from './pages/ForgottenPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooterOn = ['/login', '/signup'];
  const hideUI = hideHeaderFooterOn.includes(location.pathname);
  const { user } = useContext(AuthContext);

  return (
    <>
      {!hideUI && <Header isLoggedIn={!!user} />}
      <main>{children}</main>
      {!hideUI && <Footer />}
    </>
  );
}

function App() {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {!isLoggedIn ? <LandingPage /> : <Navigate to="/home" />}
          </Layout>
        }
      />
      <Route
        path="/home"
        element={
          <Layout>
            {isLoggedIn ? <Home /> : <Navigate to="/login" />}
          </Layout>
        }
      />
      <Route
        path="/addProduct"
        element={
          <Layout>
            {isLoggedIn ? <AddProduct /> : <Navigate to="/login" />}
          </Layout>
        }
      />
      <Route
        path="/allProduct"
        element={
          <Layout>
            <AllProduct />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/termsOfUse"
        element={
          <Layout>
            <TermsOfUse />
          </Layout>
        }
      />
      <Route
        path="/privacyPolicy"
        element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        }
      />
      

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ForgottenPassword" element={<ForgottenPassword />} />
      <Route
        path="/howItWorks"
        element={
          <Layout>
            <HowItWorks />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
