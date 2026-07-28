import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import Loading from './component/loading/Loading';
import { AuthProvider } from './context/AuthContext';

const Home = lazy(() => import('./pages/home/Home'));
const Service = lazy(() => import('./pages/service/Service'));
const ServiceDetails = lazy(() => import('./component/serviceDetails/serviceDetails'));
const Nav = lazy(() => import('./component/nav/Nav'));
const Footer = lazy(() => import('./component/footer/Footer'));
const Contact = lazy(() => import('./component/contact/Contact'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const About = lazy(() => import('./pages/about/About'));
const NotifySubscribers = lazy(() => import('./pages/notifySubscribers/NotifySubscribers'));
const AdminMessagePage = lazy(() => import('./pages/adminMessagePage/AdminMessagePage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage/NotFoundPage'));
const Apply = lazy(() => import('./pages/apply/Apply'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));

const PageLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#fafafa'
  }}>
    <Loading message="Loading..." />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notify" element={<NotifySubscribers />} />
            <Route path="/admin/message" element={<AdminMessagePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
