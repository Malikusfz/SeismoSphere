import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

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
    <Card>
      <CardHeader>
        <Heading size="md">Gempa Bumi Terkini</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Tanggal :
            </Heading>
            <Text pt="1" fontSize="md">
              {latestEarthquake.Tanggal}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Waktu :
            </Heading>
            <Text pt="1" fontSize="md">
              {latestEarthquake.Jam}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Magnitude :
            </Heading>
            <Text pt="1" fontSize="md">
              {latestEarthquake.Magnitude}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Kedalaman :
            </Heading>
            <Text pt="1" fontSize="md">
              {latestEarthquake.Kedalaman}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Wilayah :
            </Heading>
            <Text pt="1" fontSize="md">
              {latestEarthquake.Wilayah}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default EarthquakeInfo;
