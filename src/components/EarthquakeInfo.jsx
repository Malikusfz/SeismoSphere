import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Flex,
  Skeleton,
  useColorModeValue,
  Icon,
  Divider,
  Card,
  CardHeader,
  CardBody,
  ScaleFade,
  Alert,
  AlertIcon,
  Button,
  useToken,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaRuler,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaSyncAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Enhanced color palette with gradients
const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradientBlue: 'linear-gradient(135deg, #4299E1, #0077C0)',
  gradientOrange: 'linear-gradient(135deg, #F6AD55, #DD6B20)',
  gradientRed: 'linear-gradient(135deg, #FC8181, #E53E3E)',
};

/**
 * Returns a gradient color based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - CSS gradient string
 */
const getGradient = (magnitude) => {
  if (magnitude >= 7) {
    return 'linear-gradient(135deg, #FC8181, #E53E3E)';
  } if (magnitude >= 6) {
    return 'linear-gradient(135deg, #F6AD55, #DD6B20)';
  } if (magnitude >= 5.5) {
    return 'linear-gradient(135deg, #FFD767, #D69E2E)';
  } if (magnitude >= 4.5) {
    return 'linear-gradient(135deg, #68D391, #38A169)';
  }
  return 'linear-gradient(135deg, #4299E1, #0077C0)';
};

/**
 * Komponen untuk menampilkan informasi gempa terkini dengan tampilan modern
 * 
 * @returns {JSX.Element} Komponen informasi gempa
 */
function EarthquakeInfo() {
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Dynamic color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const headerBg = useColorModeValue('blue.50', 'blue.900');
  const [blue400, blue600] = useToken('colors', ['blue.400', 'blue.600']);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const fetchEarthquakes = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      setError(null);
      
      const cachedData = JSON.parse(localStorage.getItem('earthquakes'));
      const now = new Date().getTime();

      if (cachedData && (now - cachedData.timestamp < 300000) && !showRefresh) {
        setLatestEarthquake(cachedData.data[0]);
        setLastUpdated(new Date(cachedData.timestamp));
        setLoading(false);
      } else {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
        const data = response.data.Infogempa.gempa;
        setLatestEarthquake(data[0]);
        localStorage.setItem('earthquakes', JSON.stringify({ data, timestamp: now }));
        setLastUpdated(new Date(now));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Tidak dapat memuat data gempa terkini.');
      setLoading(false);
    } finally {
      if (showRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);
  
  // Format the last updated time to locale string
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden">
        <CardHeader bg={headerBg} py={4}>
          <Skeleton height="24px" width="200px" />
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Skeleton height="24px" />
            <Skeleton height="24px" />
            <Skeleton height="24px" />
            <Skeleton height="24px" />
          </VStack>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert 
        status="error" 
        variant="left-accent" 
        borderRadius="xl" 
        mb={4}
        boxShadow="md"
      >
        <AlertIcon />
        {error}
        <Button 
          ml="auto" 
          size="sm" 
          colorScheme="red" 
          onClick={() => fetchEarthquakes(true)}
          leftIcon={<FaSyncAlt />}
          borderRadius="lg"
        >
          Coba Lagi
        </Button>
      </Alert>
    );
  }

  if (!latestEarthquake) {
    return (
      <Alert status="info" variant="left-accent" borderRadius="xl" boxShadow="md">
        <AlertIcon />
        Belum ada data gempa tersedia.
      </Alert>
    );
  }

  const hasTsunami = latestEarthquake.Potensi === 'Tsunami';
  return (
    <ScaleFade initialScale={0.95} in={!loading}>
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        bg={cardBg}
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        border="1px"
        borderColor={borderColor}
        transition="all 0.3s"
        _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }}
      >
        <Flex 
          bgGradient={`linear-gradient(to right, ${blue400}, ${blue600})`}
          p={4} 
          justifyContent="space-between" 
          alignItems="center"
          borderBottomWidth="1px"
          borderColor={borderColor}
        >
          <Heading
            as="h3"
            size="md"
            color="white"
            fontWeight="bold"
          >
            Gempa Bumi Terkini
          </Heading>
          {lastUpdated && (
            <Text fontSize="xs" color="white" fontWeight="medium">
              {formatLastUpdated()}
            </Text>
          )}
        </Flex>
        
        <Box p={5}>
          {hasTsunami && (
            <MotionFlex
              mb={5}
              bgGradient={colorPalette.gradientRed}
              color="white"
              p={4}
              borderRadius="lg"
              alignItems="center"
              fontWeight="bold"
              boxShadow="md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon as={FaExclamationTriangle} mr={3} boxSize={5} />
              <Text fontSize="md">BERPOTENSI TSUNAMI</Text>
            </MotionFlex>
          )}
          
          <List spacing={5}>
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="center">
                  <Icon as={FaCalendarAlt} color={iconColor} boxSize={6} />
                  <VStack spacing={0} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Tanggal
                    </Text>
                    <Text fontWeight="semibold" color={textColor} fontSize="md">
                      {latestEarthquake.Tanggal}
                    </Text>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
            
            <Divider />
            
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="center">
                  <Icon as={FaClock} color={iconColor} boxSize={6} />
                  <VStack spacing={0} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Waktu
                    </Text>
                    <Text fontWeight="semibold" color={textColor} fontSize="md">
                      {latestEarthquake.Jam}
                    </Text>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
            
            <Divider />
            
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="center">
                  <Icon as={FaRuler} color={iconColor} boxSize={6} />
                  <VStack spacing={0} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Magnitudo
                    </Text>
                    <Flex align="center">
                      <Badge
                        bgGradient={getGradient(latestEarthquake.Magnitude)}
                        color="white"
                        fontSize="md"
                        px={4}
                        py={1.5}
                        borderRadius="full"
                        fontWeight="bold"
                        boxShadow="md"
                      >
                        {latestEarthquake.Magnitude}
                      </Badge>
                    </Flex>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
            
            <Divider />
            
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="flex-start">
                  <Icon as={FaMapMarkerAlt} color={iconColor} boxSize={6} mt={1} />
                  <VStack spacing={0} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Lokasi
                    </Text>
                    <Text fontWeight="semibold" color={textColor} fontSize="md">
                      {latestEarthquake.Wilayah}
                    </Text>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
          </List>
          
          <Button
            mt={6}
            size="md"
            width="full"
            bgGradient={colorPalette.gradientBlue}
            color="white"
            fontWeight="bold"
            borderRadius="lg"
            py={6}
            _hover={{ 
              bgGradient: 'linear-gradient(135deg, #3182CE, #2C5282)',
              transform: 'translateY(-2px)',
              boxShadow: 'xl'
            }}
            leftIcon={<FaSyncAlt />}
            onClick={() => fetchEarthquakes(true)}
            isLoading={refreshing}
          >
            Perbarui Data
          </Button>
        </Box>
      </MotionBox>
    </ScaleFade>
  );
}

export default EarthquakeInfo;
