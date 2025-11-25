import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from "./components/ScrollToTop";
import LoadingFallback from './components/LoadingFallback';

// Home page - loaded immediately (main entry point)
import Home from './pages/Home';

// Lazy load all other route pages for code splitting
const PinnedZoomPage = lazy(() => import('./pages/PinnedZoomPage'));
const Parallax3DPage = lazy(() => import('./pages/Parallax3DPage'));
const CinematicHome = lazy(() => import('./pages/CinematicHome'));
const Partners = lazy(() => import('./pages/Partners'));
const Teams = lazy(() => import('./pages/Teams'));
const Guidelines = lazy(() => import('./pages/Guidelines'));
const Details = lazy(() => import('./pages/Details'));
const People = lazy(() => import('./pages/People'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail')); 

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <ErrorBoundary>
          <ScrollToTop /> 
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pinned" element={<PinnedZoomPage />} />
              <Route path="/parallax" element={<Parallax3DPage />} />
              <Route path="/cinematic" element={<CinematicHome />} />
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
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </Router>
  );
}

export default App;