import React from 'react';
import { Box } from '@chakra-ui/react';
import EarthquakeMap from '../components/EarthquakeMap';
import EarthquakeTable from '../components/EarthquakeTable';

function MapPage() {
  return (
    <Box p={4} bg="white" maxW="1200px" mx="auto" borderRadius="md" boxShadow="lg" mt={2}>
      <EarthquakeMap />
      <EarthquakeTable />
    </Box>
  );
}

export default MapPage;
