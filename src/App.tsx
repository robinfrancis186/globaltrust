import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Teams from './pages/Teams';
import Guidelines from './pages/Guidelines';
import Details from './pages/Details';
import People from './pages/People';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/details" element={<Details />} />
          <Route path="/people" element={<People />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;