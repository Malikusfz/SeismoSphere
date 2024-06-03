import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { EarthquakeProvider } from './state/EarthquakeContext';
import MapPage from './pages/MapPage';
import HeaderNav from './components/HeaderNav';
import AboutUsPage from './pages/AboutUsPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider>
      <EarthquakeProvider>
        <HeaderNav />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </div>
        <Footer />
      </EarthquakeProvider>
    </ChakraProvider>
  );
}

export default App;
