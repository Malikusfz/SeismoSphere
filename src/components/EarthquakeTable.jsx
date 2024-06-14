import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Tbody, Td, Th, Thead, Tr, Spinner, Box, Badge, HStack,
} from '@chakra-ui/react';
import { BsTsunami } from 'react-icons/bs';

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

function EarthquakeTable() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
        setEarthquakes(response.data.Infogempa.gempa);
        localStorage.setItem('earthquakes', JSON.stringify(response.data.Infogempa.gempa));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Fetch data on component mount
    fetchEarthquakes();

    // Set an interval to fetch data periodically
    const intervalId = setInterval(fetchEarthquakes, 60000); // Fetch every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const colorPalette = {
    background: '#FAFAFA',
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: '#1D242B',
  };

  return (
    <Box p={4}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" color={colorPalette.accent} label="Loading..." />
        </Box>
      ) : (
        <Table variant="simple" size="sm">
          <Thead bg={colorPalette.secondary}>
            <Tr>
              <Th color={colorPalette.accent} textAlign="center">Tanggal</Th>
              <Th color={colorPalette.accent} textAlign="center">Waktu</Th>
              <Th color={colorPalette.accent} textAlign="center">Magnitude</Th>
              <Th color={colorPalette.accent} textAlign="center">Kedalaman</Th>
              <Th color={colorPalette.accent} textAlign="center">Lokasi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {earthquakes.map((gempa) => (
              <Tr key={gempa.DateTime}>
                <Td color={colorPalette.accent} textAlign="center">{gempa.Tanggal}</Td>
                <Td color={colorPalette.accent} textAlign="center">{gempa.Jam}</Td>
                <Td textAlign="center">
                  <HStack justify="center">
                    <Badge style={{ backgroundColor: getColor(gempa.Magnitude), color: 'white' }}>
                      {gempa.Magnitude}
                    </Badge>
                    {gempa.Potensi === 'Tsunami' && (
                      <BsTsunami color={colorPalette.highlight} size="20px" />
                    )}
                  </HStack>
                </Td>
                <Td color={colorPalette.accent} textAlign="center">{gempa.Kedalaman}</Td>
                <Td color={colorPalette.accent} textAlign="center">{gempa.Wilayah}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default EarthquakeTable;
