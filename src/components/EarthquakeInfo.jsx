import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListIcon,
  Box,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaRuler,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

function EarthquakeInfo() {
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          const earthquakes = JSON.parse(cachedData);
          setLatestEarthquake(earthquakes[0]);
          setLoading(false);
        } else {
          const response = await axios.get(
            'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json',
          );
          const earthquakes = response.data.Infogempa.gempa;
          setLatestEarthquake(earthquakes[0]);
          localStorage.setItem('earthquakes', JSON.stringify(earthquakes));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!latestEarthquake) {
    return <Text>No earthquake data available.</Text>;
  }

  return (
    <Box bg={colorPalette.background}>
      <Heading
        size="m"
        mb="4"
        textAlign="center"
        color={colorPalette.highlight}
      >
        Gempa Bumi Terkini
      </Heading>
      <List spacing={3}>
        <ListItem>
          <HStack>
            <ListIcon as={FaCalendarAlt} color="teal.500" />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {latestEarthquake.Tanggal}
              </Heading>
            </Box>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack>
            <ListIcon as={FaClock} color="teal.500" />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {latestEarthquake.Jam}
              </Heading>
            </Box>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack>
            <ListIcon as={FaRuler} color="teal.500" />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {latestEarthquake.Magnitude}
              </Heading>
            </Box>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack>
            <ListIcon as={FaMapMarkerAlt} color="teal.500" />
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {latestEarthquake.Wilayah}
              </Heading>
            </Box>
          </HStack>
        </ListItem>
      </List>
    </Box>
  );
}

export default EarthquakeInfo;
