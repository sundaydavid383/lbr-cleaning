import React from 'react';
import About from './pages/about/About';
import Service from './pages/service/Service';
import ServiceDetails from './component/serviceDetails/serviceDetails';
import Nav from './component/nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- small fix here
import Footer from './component/footer/Footer';
import Contact from './pages/contact/Contact';
import Blog from './pages/blog/Blog';
import Home from './pages/home/Home';
import NotifySubscribers from "./pages/notifySubscribers/NotifySubscribers";
import AdminMessagePage from './pages/adminMessagePage/AdminMessagePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ScrollToTop from './component/ScrollToTop'; // import it

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ensures scrolling back to top on navigation */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />   {/* small fix: "/" instead of "" */}
        <Route path="/service" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notify" element={<NotifySubscribers />} />
        <Route path="/admin/message" element={<AdminMessagePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;