import React, {
  useEffect, useState, useRef, lazy, Suspense,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'leaflet/dist/leaflet.css';
import {
  Box, VStack, Heading, HStack, Icon, Text, Badge, Grid, GridItem,
  Button, Spinner, useToast, useBreakpointValue, Flex, keyframes, 
  useColorModeValue, ScaleFade, Tooltip,
} from '@chakra-ui/react';
import {
  FaClock, FaCalendarAlt, FaMapMarkerAlt, FaRulerVertical, FaLayerGroup,
  FaSatellite, FaMap, FaLocationArrow, FaInfoCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CenterMapOnPopupOpen from './CenterMapOnPopupOpen';
import Legend from './Legend';

const MapControl = lazy(() => import('./MapControl'));
const LocationDetailModal = lazy(() => import('./LocationDetailModal'));
const MotionBox = motion(Box);

// Defining animation keyframes
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.6); }
  70% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  popupBg: 'rgba(255, 255, 255, 0.95)',
  buttonBg: 'linear-gradient(135deg, #0099f7, #0077C0)',
  buttonHover: 'linear-gradient(135deg, #0077C0, #005fa9)',
  buttonActive: 'linear-gradient(135deg, #005fa9, #004a85)',
  tsunami: '#E53E3E', // Red color for tsunami warnings
  tsunamiBg: 'linear-gradient(135deg, #FEB2B2, #E53E3E)', // Gradient red background
  lightOverlay: 'rgba(255, 255, 255, 0.12)',
};

// Custom CSS styles for the map
const mapStyles = {
  container: {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s ease-in-out',
    _hover: {
      boxShadow: '0 14px 36px rgba(0, 0, 0, 0.2)',
    },
  },
  popup: {
    '.leaflet-popup-content-wrapper': {
      backgroundColor: colorPalette.popupBg,
      borderRadius: '18px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      maxWidth: '90vw',
      width: 'auto',
      overflow: 'hidden',
    },
    '.leaflet-popup-tip': {
      backgroundColor: colorPalette.popupBg,
    },
    '.leaflet-popup-content': {
      margin: '14px',
      width: 'auto !important',
      minWidth: '220px',
      maxWidth: '100%',
      padding: '0',
    },
    '.leaflet-container a.leaflet-popup-close-button': {
      color: colorPalette.accent,
      transition: 'all 0.2s',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      width: '26px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '8px',
      right: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    '.leaflet-container a.leaflet-popup-close-button:hover': {
      color: colorPalette.highlight,
      background: 'white',
      transform: 'scale(1.1) rotate(90deg)',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    },
  },
  customIcon: {
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      transform: 'scale(1.3) translateY(-8px)',
      filter: 'drop-shadow(0 8px 8px rgba(0,0,0,0.4))',
    },
  },
};

/**
 * Returns a color code based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - Color hex code or gradient
 */
const getColor = (magnitude) => {
  if (magnitude >= 7) {
    return 'linear-gradient(135deg, #FF4D4D, #E53E3E)'; // Bright red gradient
  } if (magnitude >= 6) {
    return 'linear-gradient(135deg, #F6AD55, #DD6B20)'; // Bright orange gradient
  } if (magnitude >= 5.5) {
    return 'linear-gradient(135deg, #FFD767, #D69E2E)'; // Bright yellow gradient
  } if (magnitude >= 4.5) {
    return 'linear-gradient(135deg, #68D391, #38A169)'; // Bright green gradient
  }
  return 'linear-gradient(135deg, #63B3ED, #3182CE)'; // Bright blue gradient
};

/**
 * Returns a solid color code for map markers based on magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - Color hex code
 */
const getSolidColor = (magnitude) => {
  if (magnitude >= 7) {
    return '#E53E3E'; // Bright red
  } if (magnitude >= 6) {
    return '#DD6B20'; // Bright orange
  } if (magnitude >= 5.5) {
    return '#D69E2E'; // Bright yellow
  } if (magnitude >= 4.5) {
    return '#38A169'; // Bright green
  }
  return '#3182CE'; // Bright blue
};

/**
 * Creates a custom map marker icon based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @param {boolean} hasTsunami - Whether this earthquake has tsunami potential
 * @returns {L.divIcon} - Leaflet div icon instance
 */
const createIcon = (magnitude, hasTsunami = false) => {
  const color = getSolidColor(magnitude);
  const size = magnitude >= 7 ? 28 : magnitude >= 6 ? 24 : magnitude >= 5 ? 20 : 16;
  const pulseEffect = magnitude >= 6 ? 
    'box-shadow: 0 0 0 rgba(229, 62, 62, 0.4); animation: pulse 2s infinite;' : '';
    
  const tsunamiMarker = hasTsunami ?
    `<div style="position:absolute; top:-10px; right:-10px; background-color:#E53E3E; border: 2px solid white; width: 18px; height: 18px; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>` : '';
    
  const style = `
    background-color: ${color}; 
    width: ${size}px; 
    height: ${size}px; 
    border-radius: 50%; 
    border: 2.5px solid white;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    ${pulseEffect}
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  `;
  
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="${style}">${tsunamiMarker}</div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size],
  });
};

/**
 * Komponen utama untuk menampilkan peta gempa
 * 
 * @returns {JSX.Element} Komponen peta interaktif
 */
function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const [mapStyle, setMapStyle] = useState('default');
  const [loading, setLoading] = useState(true);
  const [isMobileDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedQuake, setSelectedQuake] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const toast = useToast();
  const mapRef = useRef();
  
  // Make the map more responsive with dynamic heights
  const mapHeight = useBreakpointValue({ 
    base: '400px', 
    sm: '450px',
    md: '550px',
    lg: '650px',
    xl: '750px' 
  });
  
  const popupWidth = useBreakpointValue({ base: '240px', md: '280px' });
  
  // Dynamic color modes
  const loadingBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
  const loadingTextColor = useColorModeValue('gray.700', 'gray.200');
  const boxBgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const headerText = useColorModeValue('gray.700', 'white');
  const buttonTextColor = useColorModeValue('white', 'white');
  
  // Animated pulse for tsunami markers
  const animationPulse = `${pulse} 2s infinite`;

  const fetchEarthquakes = async () => {
    try {
      nprogress.start();
      const cachedData = JSON.parse(localStorage.getItem('earthquakes'));
      const now = new Date().getTime();
      
      if (cachedData && (now - cachedData.timestamp < 300000)) { // 5 minutes in milliseconds
        setEarthquakes(cachedData.data);
        setLoading(false);
      } else {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
        const data = response.data.Infogempa.gempa;
        setEarthquakes(data);
        localStorage.setItem('earthquakes', JSON.stringify({ data, timestamp: now }));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      
      // Show error toast
      toast({
        title: 'Gagal memuat data',
        description: 'Tidak dapat mengambil data gempa terbaru. Silakan coba lagi nanti.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      nprogress.done();
    }
  };

  useEffect(() => {
    fetchEarthquakes();

    // Set an interval to fetch data periodically
    const intervalId = setInterval(fetchEarthquakes, 60000); // Fetch every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [earthquakes]);
  
  // Effect to handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        // Fix map invalidation issues when resizing
        setTimeout(() => {
          mapRef.current.invalidateSize();
          
          // Recenter map when resizing
          if (popupPosition) {
            mapRef.current.setView(popupPosition);
          } else {
            mapRef.current.setView([-2.5489, 118.0149]);
          }
        }, 300);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial invalidation
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapHeight, popupPosition]);

  // Function to calculate coordinates from location string
  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    return [latitude, longitude];
  };

  // Define Indonesia bounds to restrict map panning
  const indonesiaBounds = [
    [-16, 87],
    [16, 150],
  ];

  // Map tile layer sources
  const mapTileLayers = {
    default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  // Toggle between default and satellite map styles
  const switchMapStyle = () => {
    setMapStyle(mapStyle === 'default' ? 'satellite' : 'default');
    
    // Show feedback toast
/*     toast({
      title: `Tampilan peta diubah`,
      description: `Beralih ke tampilan ${mapStyle === 'default' ? 'satelit' : 'normal'}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    }); */
  };

  // Add custom CSS for the popup styling
  useEffect(() => {
    // Add custom CSS to head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.6); }
        70% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
        100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes slideUp {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      .custom-popup .leaflet-popup-content-wrapper {
        background-color: ${colorPalette.popupBg};
        border-radius: 18px;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.18);
        overflow: hidden;
        animation: fadeIn 0.3s ease-out, slideUp 0.3s ease-out;
      }
      
      .custom-popup .leaflet-popup-tip {
        background-color: ${colorPalette.popupBg};
      }
      
      .custom-popup .leaflet-popup-content {
        margin: 0;
        padding: 0;
      }
      
      .custom-popup .leaflet-container a.leaflet-popup-close-button {
        color: ${colorPalette.accent};
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 8px;
        right: 8px;
        transition: all 0.3s;
        z-index: 900;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .custom-popup .leaflet-container a.leaflet-popup-close-button:hover {
        color: ${colorPalette.highlight};
        background: white;
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
      }

      .custom-icon div {
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }
      
      .custom-icon:hover div {
        transform: scale(1.3) translateY(-8px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.35);
      }
      
      /* Custom styles for zoom controls */
      .leaflet-control-zoom {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        border: none;
        margin: 15px !important;
      }
      
      .leaflet-control-zoom-in, 
      .leaflet-control-zoom-out {
        background-color: white !important;
        color: #333 !important;
        width: 40px !important;
        height: 40px !important;
        line-height: 40px !important;
        font-size: 20px !important;
        font-weight: bold !important;
        transition: all 0.3s ease;
      }
      
      .leaflet-control-zoom-in:hover, 
      .leaflet-control-zoom-out:hover {
        background-color: #f0f0f0 !important;
        color: #0077C0 !important;
        transform: scale(1.05);
      }
      
      /* Menetapkan posisi kontrol zoom selalu di kanan atas */
      .leaflet-control-zoom {
        top: 10px !important;
        right: 10px !important;
        left: auto !important;
        bottom: auto !important;
      }
      
      /* Mobile-specific adjustments */
      @media (max-width: 768px) {
        .leaflet-control-zoom {
          margin: 10px !important;
        }
        
        .leaflet-control-zoom-in, 
        .leaflet-control-zoom-out {
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
        }
      }
      
      /* Custom Legend Positioning */
      .map-legend {
        position: absolute !important;
        bottom: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 1000 !important;
        pointer-events: auto !important;
      }
      
      /* Make sure legend appears above map controls */
      .leaflet-control {
        z-index: 800;
      }
      
      /* Make the legend responsive */
      @media (max-width: 480px) {
        .map-legend {
          width: 90% !important;
          max-width: 90% !important;
        }
      }
      
      /* Ensure all legend items are visible */
      .map-legend .chakra-stack > div {
        flex-shrink: 1;
        min-width: auto !important;
      }
      
      /* Desktop optimization */
      @media (min-width: 992px) {
        .map-legend .chakra-stack {
          justify-content: center !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height={mapHeight}
        width="100%"
        maxW={{ base: "100%", xl: "1200px" }}
        mx="auto"
        bg={loadingBgColor}
        borderRadius="xl"
        boxShadow="lg"
        backdropFilter="blur(8px)"
      >
        <VStack spacing={5}>
          <Spinner 
            size="xl" 
            color={colorPalette.highlight} 
            thickness="4px" 
            speed="0.65s" 
            emptyColor="gray.200" 
            role="status"
            sx={{
              '--spinner-size': '70px',
              width: 'var(--spinner-size)',
              height: 'var(--spinner-size)',
            }}
          />
          <Text 
            color={loadingTextColor} 
            fontWeight="medium" 
            fontSize="lg"
            textShadow="0 1px 2px rgba(0,0,0,0.1)"
          >
            Memuat data gempa...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <ScaleFade initialScale={0.95} in={!loading}>
      <MotionBox 
        p={{ base: 3, md: 4 }} 
        bg={boxBgColor}
        borderRadius="xl" 
        boxShadow="xl" 
        position="relative"
        overflow="hidden"
        width="100%"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={{ base: 3, md: 4 }} align="stretch" width="100%">
          <Flex 
            direction={{ base: 'column', sm: 'row' }} 
            justify="space-between" 
            align={{ base: 'center', sm: 'center' }}
            wrap="wrap"
            gap={3}
          >
            <Heading
              as="h2"
              size={{ base: 'md', md: 'lg' }}
              textAlign={{ base: 'center', sm: 'left' }}
              color={headerText}
              px={2}
              fontWeight="bold"
            >
              Gempa Terbaru di Indonesia
            </Heading>

            <HStack spacing={3} justify="center" mb={{ base: 1, md: 1 }}>
              <Tooltip 
                label={`Beralih ke tampilan ${mapStyle === 'default' ? 'satelit' : 'normal'}`} 
                placement="top" 
                hasArrow
              >
                <Button
                  leftIcon={mapStyle === 'default' ? <FaSatellite /> : <FaMap />}
                  onClick={switchMapStyle}
                  size={{ base: 'md', md: 'md' }}
                  bgGradient={colorPalette.buttonBg}
                  color={buttonTextColor}
                  _hover={{ 
                    bgGradient: colorPalette.buttonHover,
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  _active={{ 
                    bgGradient: colorPalette.buttonActive,
                    transform: 'translateY(0)'
                  }}
                  px={4}
                  py={6}
                  borderRadius="full"
                  boxShadow="md"
                  transition="all 0.3s"
                  fontWeight="bold"
                >
                  {mapStyle === 'default' ? 'Tampilan Satelit' : 'Tampilan Normal'}
                </Button>
              </Tooltip>
            </HStack>
          </Flex>
          
          <Box
            sx={mapStyles.container} 
            height={mapHeight}
            width="100%"
            maxW={{ base: "100%", xl: "1200px" }}
            mx="auto"
            position="relative"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)'
            }}
          >
            <MapContainer
              center={[-2.5489, 118.0149]}
              zoom={5}
              minZoom={5}
              maxZoom={18}
              style={{ height: '100%', width: '100%' }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
                mapInstance.invalidateSize();
              }}
              maxBounds={indonesiaBounds}
              maxBoundsViscosity={1.0}
              zoomControl={false}
              attributionControl={false}
              className="earthquake-map"
            >
              <TileLayer
                url={mapTileLayers[mapStyle]}
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              
              <Suspense fallback={<Spinner size="xl" color={colorPalette.highlight} />}>
                <MapControl 
                  toast={toast} 
                  showZoomControl={true}
                />
              </Suspense>
              
              {earthquakes.map((gempa) => {
                const coordinates = getCoordinates(gempa.Coordinates);
                if (coordinates[0] === 0 && coordinates[1] === 0) return null;
                const hasTsunami = gempa.Potensi === 'Tsunami';
                const icon = createIcon(gempa.Magnitude, hasTsunami);
                
                return (
                  <Marker
                    key={gempa.DateTime}
                    position={coordinates}
                    icon={icon}
                    eventHandlers={{
                      click: () => {
                        if (mapRef.current) {
                          mapRef.current.flyTo(coordinates, 7, {
                            animate: true,
                            duration: 1
                          });
                        }
                      }
                    }}
                  >
                    <Popup
                      className="custom-popup"
                      maxWidth={popupWidth}
                      minWidth={240}
                      autoPan={false}
                      keepInView={false}
                      onOpen={() => setTimeout(() => setPopupPosition(coordinates), 50)}
                      onClose={() => setPopupPosition(null)}
                    >
                      <MotionBox
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        p={0}
                      >
                        <VStack
                          align="stretch"
                          spacing={{ base: 3, md: 4 }}
                          p={{ base: 3, md: 4 }}
                          borderRadius="xl"
                          bg={cardBg}
                          backdropFilter="blur(10px)"
                          color={colorPalette.accent}
                        >
                          {hasTsunami && (
                            <Box 
                              p={2} 
                              bgGradient={colorPalette.tsunamiBg}
                              color="white" 
                              borderRadius="md"
                              fontWeight="bold"
                              textAlign="center"
                              boxShadow="md"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              gap={2}
                              animation={animationPulse}
                            >
                              <Icon as={FaInfoCircle} /> 
                              POTENSI TSUNAMI
                            </Box>
                          )}
                          
                          <Heading
                            as="h4"
                            size={{ base: 'xs', md: 'sm' }}
                            textAlign="center"
                            color={colorPalette.highlight}
                            borderBottom="2px solid"
                            borderColor={colorPalette.secondary}
                            pb={{ base: 2, md: 2 }}
                            fontWeight="bold"
                          >
                            {gempa.Wilayah}
                          </Heading>

                          <Grid
                            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                            gap={{ base: 3, md: 4 }}
                            w="100%"
                            px={{ base: 1, md: 2 }}
                          >
                            <GridItem>
                              <VStack spacing={{ base: 1, md: 1.5 }}>
                                <HStack spacing={{ base: 1, md: 2 }}>
                                  <Icon as={FaCalendarAlt} color={colorPalette.highlight} boxSize={{ base: '14px', md: '16px' }} />
                                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold">Tanggal</Text>
                                </HStack>
                                <Badge
                                  fontSize={{ base: 'xs', md: 'sm' }}
                                  py={{ base: 1, md: 1.5 }}
                                  px={{ base: 2, md: 3 }}
                                  borderRadius="full"
                                  bg={colorPalette.secondary}
                                  color={colorPalette.accent}
                                  boxShadow="sm"
                                >
                                  {gempa.Tanggal}
                                </Badge>
                              </VStack>
                            </GridItem>

                            <GridItem>
                              <VStack spacing={{ base: 1, md: 1.5 }}>
                                <HStack spacing={{ base: 1, md: 2 }}>
                                  <Icon as={FaClock} color={colorPalette.highlight} boxSize={{ base: '14px', md: '16px' }} />
                                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold">Waktu</Text>
                                </HStack>
                                <Badge
                                  fontSize={{ base: 'xs', md: 'sm' }}
                                  py={{ base: 1, md: 1.5 }}
                                  px={{ base: 2, md: 3 }}
                                  borderRadius="full"
                                  bg={colorPalette.secondary}
                                  color={colorPalette.accent}
                                  boxShadow="sm"
                                >
                                  {gempa.Jam}
                                </Badge>
                              </VStack>
                            </GridItem>

                            <GridItem>
                              <VStack spacing={{ base: 1, md: 1.5 }}>
                                <HStack spacing={{ base: 1, md: 2 }}>
                                  <Icon as={FaMapMarkerAlt} color={colorPalette.highlight} boxSize={{ base: '14px', md: '16px' }} />
                                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold">Magnitudo</Text>
                                </HStack>
                                <Badge
                                  py={{ base: 1, md: 1.5 }}
                                  px={{ base: 2, md: 3 }}
                                  borderRadius="full"
                                  bgGradient={getColor(gempa.Magnitude)}
                                  color="white"
                                  fontSize={{ base: 'xs', md: 'sm' }}
                                  fontWeight="bold"
                                  boxShadow="md"
                                >
                                  {gempa.Magnitude} M
                                </Badge>
                              </VStack>
                            </GridItem>

                            <GridItem>
                              <VStack spacing={{ base: 1, md: 1.5 }}>
                                <HStack spacing={{ base: 1, md: 2 }}>
                                  <Icon as={FaRulerVertical} color={colorPalette.highlight} boxSize={{ base: '14px', md: '16px' }} />
                                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold">Kedalaman</Text>
                                </HStack>
                                <Badge
                                  fontSize={{ base: 'xs', md: 'sm' }}
                                  py={{ base: 1, md: 1.5 }}
                                  px={{ base: 2, md: 3 }}
                                  borderRadius="full"
                                  bg={colorPalette.secondary}
                                  color={colorPalette.accent}
                                  boxShadow="sm"
                                >
                                  {gempa.Kedalaman}
                                </Badge>
                              </VStack>
                            </GridItem>
                          </Grid>
                          
                          <Box 
                            as={Button}
                            size="sm"
                            variant="ghost" 
                            colorScheme="blue" 
                            mt={2} 
                            w="full" 
                            leftIcon={<FaLocationArrow />} 
                            onClick={() => {
                              // Tetap zoom ke lokasi gempa
                              if (mapRef.current) {
                                mapRef.current.flyTo(coordinates, 8);
                              }
                              
                              // Buka modal detail lokasi dengan info gempa
                              setSelectedQuake(gempa);
                              setSelectedCoordinates(coordinates);
                              setIsDetailModalOpen(true);
                            }}
                            _hover={{
                              bg: colorPalette.lightOverlay
                            }}
                          >
                            Lihat Detail Lokasi
                          </Box>
                        </VStack>
                      </MotionBox>
                    </Popup>
                  </Marker>
                );
              })}
              <CenterMapOnPopupOpen position={popupPosition || [-2.5489, 118.0149]} />
              <Legend />
            </MapContainer>
          </Box>
        </VStack>
      </MotionBox>
      
      {/* Modal detail lokasi gempa */}
      <Suspense fallback={null}>
        <LocationDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          earthquake={selectedQuake}
          coordinates={selectedCoordinates}
        />
      </Suspense>
    </ScaleFade>
  );
}

export default EarthquakeMap;
