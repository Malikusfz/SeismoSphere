import React, {
  useEffect, useState, useRef, lazy, Suspense,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'leaflet/dist/leaflet.css';
import {
  Box, VStack, Heading, HStack, Icon, Text, Badge, Grid, GridItem, Button, Spinner, useToast,
} from '@chakra-ui/react';
import {
  FaClock, FaCalendarAlt, FaMapMarkerAlt, FaRulerVertical,
} from 'react-icons/fa';
import CenterMapOnPopupOpen from './CenterMapOnPopupOpen';
import Legend from './Legend';

const MapControl = lazy(() => import('./MapControl'));

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

const getColor = (magnitude) => {
  if (magnitude >= 7) {
    return 'red';
  } if (magnitude >= 6) {
    return 'orange';
  } if (magnitude >= 5.5) {
    return 'yellow';
  } if (magnitude >= 4.5) {
    return 'green';
  }
  return 'blue';
};

const createIcon = (magnitude) => {
  const color = getColor(magnitude);
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });
};

function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const [mapStyle, setMapStyle] = useState('default');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const mapRef = useRef();

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

  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    return [latitude, longitude];
  };

  const indonesiaBounds = [
    [-16, 87],
    [16, 150],
  ];

  const mapTileLayers = {
    default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const switchMapStyle = () => {
    setMapStyle(mapStyle === 'default' ? 'satellite' : 'default');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color={colorPalette.highlight} thickness="4px" speed="0.65s" emptyColor="gray.200" role="status" />
      </Box>
    );
  }

  return (
    <Box p={4} mb={4} bg={colorPalette.background} borderRadius="md" boxShadow="lg" position="relative">
      <Heading as="h2" size="lg" textAlign="center" mb={4} color={colorPalette.accent}>Gempa Terbaru di Indonesia</Heading>
      <Button onClick={switchMapStyle} mb={4}>
        Switch to
        {' '}
        {mapStyle === 'default' ? 'Satellite' : 'Default'}
        {' '}
        View
      </Button>
      <Box style={{
        height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden',
      }}
      >
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          minZoom={5}
          maxZoom={15}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            mapInstance.invalidateSize();
            mapInstance.scrollWheelZoom.disable();
          }}
          maxBounds={indonesiaBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url={mapTileLayers[mapStyle]}
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Suspense fallback={<Spinner size="xl" color={colorPalette.highlight} />}>
            <MapControl toast={toast} />
          </Suspense>
          {earthquakes.map((gempa) => {
            const coordinates = getCoordinates(gempa.Coordinates);
            if (coordinates[0] === 0 && coordinates[1] === 0) return null;
            const icon = createIcon(gempa.Magnitude);
            return (
              <Marker
                key={gempa.DateTime}
                position={coordinates}
                icon={icon}
              >
                <Popup
                  className="custom-popup"
                  maxWidth={250}
                  minWidth={150}
                  autoPan
                  autoPanPadding={L.point(30, 30)}
                  autoPanPaddingTopLeft={L.point(20, 20)}
                  autoPanPaddingBottomRight={L.point(20, 20)}
                  keepInView
                  onOpen={() => setPopupPosition(coordinates)}
                  onClose={() => setPopupPosition(null)}
                >
                  <VStack align="start" spacing={2} p={2} borderRadius="md" boxShadow="md" bg={colorPalette.background} color={colorPalette.accent}>
                    <Heading as="h4" size="sm" textAlign="center" mb={1}>{gempa.Wilayah}</Heading>
                    <Grid templateColumns="repeat(2, 1fr)" gap={1} textAlign="center" ml={6}>
                      <GridItem>
                        <HStack spacing={1} justifyContent="center">
                          <Icon as={FaCalendarAlt} color={colorPalette.highlight} />
                          <Text fontSize="xs">
                            <strong>Tanggal:</strong>
                          </Text>
                        </HStack>
                        <Badge fontSize="xs" variant="subtle" colorScheme="gray">{gempa.Tanggal}</Badge>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1} justifyContent="center">
                          <Icon as={FaClock} color={colorPalette.highlight} />
                          <Text fontSize="xs">
                            <strong>Waktu:</strong>
                          </Text>
                        </HStack>
                        <Badge fontSize="xs" variant="subtle" colorScheme="gray">{gempa.Jam}</Badge>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1} justifyContent="center">
                          <Icon as={FaMapMarkerAlt} color={colorPalette.highlight} />
                          <Text fontSize="xs">
                            <strong>Magnitude:</strong>
                          </Text>
                        </HStack>
                        <Badge style={{ backgroundColor: getColor(gempa.Magnitude), color: 'white' }} variant="subtle">
                          {gempa.Magnitude}
                          {' '}
                          M
                        </Badge>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1} justifyContent="center">
                          <Icon as={FaRulerVertical} color={colorPalette.highlight} />
                          <Text fontSize="xs">
                            <strong>Kedalaman:</strong>
                          </Text>
                        </HStack>
                        <Badge fontSize="xs" variant="subtle" colorScheme="gray">{gempa.Kedalaman}</Badge>
                      </GridItem>
                    </Grid>
                  </VStack>
                </Popup>
              </Marker>
            );
          })}
          <CenterMapOnPopupOpen position={popupPosition || [-2.5489, 118.0149]} />
        </MapContainer>
      </Box>
      <Legend />
    </Box>
  );
}

export default EarthquakeMap;
