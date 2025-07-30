import React, { useEffect, useState } from 'react'
import About from './pages/about/About';
import Service from './pages/service/Service';
import ServiceDetails from './component/serviceDetails/serviceDetails';
import Nav from './component/nav/Nav'
import {BrowserRouter, Routes, Route} from 'react-router';
import Footer from './component/footer/Footer'
import Contact from './pages/contact/Contact'
import Blog from './pages/blog/Blog'
import Home from './pages/home/Home'
import NotifySubscribers from "./pages/notifySubscribers/NotifySubscribers"
import AdminMessagePage from './pages/adminMessagePage/AdminMessagePage';

const App = () => {

  
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
       <Route path="" element={<Home/>}/>
       <Route path="/service" element={<Service/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/services/:serviceId" element={<ServiceDetails />}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/notify" element={<NotifySubscribers/>}/>
       <Route path="/admin/message" element={<AdminMessagePage/>}/>
       <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
