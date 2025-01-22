import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Teams from './pages/Teams';
import Guidelines from './pages/Guidelines';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/details" element={<Details />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;