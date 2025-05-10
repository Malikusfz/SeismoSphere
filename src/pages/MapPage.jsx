import React from 'react';
import { Box, useColorModeValue, VStack, Heading } from '@chakra-ui/react';
import EarthquakeMap from '../components/EarthquakeMap';
import EarthquakeTable from '../components/EarthquakeTable';

function MapPage() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  
  return (
    <Box
      p={{ base: 2, md: 4 }}
      bg={bgColor}
      maxW={{ base: '100%', xl: '1500px' }}
      mx="auto"
      borderRadius={{ base: 'md', md: 'xl' }}
      mt={{ base: 2, md: 4 }}
      mb={{ base: 2, md: 4 }}
      border="1px"
      borderColor={borderColor}
      boxShadow={{ base: 'sm', md: 'lg' }}
      overflow="hidden"
      animation="fadeIn 0.8s ease-in-out"
    >
      <VStack spacing={{ base: 4, md: 6 }} width="100%">
        <Heading
          as="h1"
          size={{ base: 'lg', md: 'xl' }}
          textAlign="center"
          color={headingColor}
          pt={{ base: 2, md: 4 }}
        >
          SeismoSphere
        </Heading>          {/* Container untuk EarthquakeMap dengan pengaturan responsif */}
        <Box 
          width="100%" 
          maxW={{ base: "100%", xl: "1400px" }}
          mx="auto"
        >
          <EarthquakeMap />
        </Box>
        
        <Box
          width="100%"
          px={{ base: 1, md: 3 }}
          py={{ base: 1, md: 2 }}
        >
          <EarthquakeTable />
        </Box>
      </VStack>
    </Box>
  );
}

export default MapPage;
