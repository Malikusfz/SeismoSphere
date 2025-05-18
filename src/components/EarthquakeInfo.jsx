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
  AspectRatio,
  Tooltip,
  Link,
  keyframes,
  CircularProgress,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaClock,
  FaRuler,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaSyncAlt,
  FaWaveSquare,
  FaExternalLinkAlt,
  FaInfoCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);
const MotionButton = motion(Button);

// Keyframes animations
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const wave = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Enhanced color palette with gradients
const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradientBlue: 'linear-gradient(135deg, #4299E1, #0077C0)',
  gradientOrange: 'linear-gradient(135deg, #F6AD55, #DD6B20)',
  gradientRed: 'linear-gradient(135deg, #FC8181, #E53E3E)',
  glassLight: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(26, 32, 44, 0.7)',
  glassBorderLight: '1px solid rgba(255, 255, 255, 0.2)',
  glassBorderDark: '1px solid rgba(255, 255, 255, 0.05)',
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
 * Returns a solid color based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - Chakra UI color string
 */
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

/**
 * Returns text description based on earthquake magnitude
 */
const getMagnitudeDescription = (magnitude) => {
  if (magnitude >= 7) {
    return "Berpotensi merusak parah";
  } if (magnitude >= 6) {
    return "Berpotensi merusak";
  } if (magnitude >= 5.5) {
    return "Berpotensi merusak ringan";
  } if (magnitude >= 4.5) {
    return "Terasa kuat";
  }
  return "Terasa ringan";
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
  const [showTooltip, setShowTooltip] = useState(false);

  // Dynamic color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const headerBg = useColorModeValue('blue.50', 'blue.900');
  const [blue400, blue600] = useToken('colors', ['blue.400', 'blue.600']);
  const glassBg = useColorModeValue(colorPalette.glassLight, colorPalette.glassDark);
  const glassBorder = useColorModeValue(colorPalette.glassBorderLight, colorPalette.glassBorderDark);
  const pulseAnimation = `${pulse} 2s infinite ease-in-out`;
  const waveAnimation = `${wave} 3s infinite ease-in-out`;
  
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
    hidden: { opacity: 0, y: 15 },
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
      <MotionCard 
        bg={cardBg} 
        boxShadow="xl" 
        borderRadius="2xl" 
        overflow="hidden"
        height="100%"
        border={glassBorder}
        backdropFilter="blur(10px)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="group"
      >
        <CardHeader 
          bgGradient={colorPalette.gradientBlue} 
          py={5}
          px={6}
          position="relative"
          overflow="hidden"
        >
          <HStack spacing={3}>
            <Icon as={FaWaveSquare} color="white" boxSize={5} />
            <Skeleton height="24px" width="200px" startColor="whiteAlpha.300" endColor="whiteAlpha.500" />
          </HStack>
          
          {/* Animated background wave */}
          <Box
            position="absolute"
            left="0"
            right="0"
            bottom="-1px"
            height="15px"
            bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyODAgMEw2NDAgNzAgMCAwdjE0MGgxMjgweiIvPjwvZz48L3N2Zz4=')"
            backgroundSize="100% 100%"
            opacity={0.6}
            zIndex={1}
          />
        </CardHeader>
        
        <CardBody p={6}>
          <VStack spacing={6} align="stretch">
            <HStack spacing={4} align="center">
              <Skeleton width="50px" height="50px" borderRadius="full" />
              <VStack align="flex-start" spacing={2} width="full">
                <Skeleton height="20px" width="40%" />
                <Skeleton height="16px" width="60%" />
              </VStack>
            </HStack>
            
            <Divider />
            
            <HStack spacing={4} align="center">
              <Skeleton width="50px" height="50px" borderRadius="full" />
              <VStack align="flex-start" spacing={2} width="full">
                <Skeleton height="20px" width="30%" />
                <Skeleton height="16px" width="40%" />
              </VStack>
            </HStack>
            
            <Divider />
            
            <HStack spacing={4} align="center">
              <Skeleton width="50px" height="50px" borderRadius="full" />
              <VStack align="flex-start" spacing={2} width="full">
                <Skeleton height="20px" width="35%" />
                <Skeleton height="24px" width="25%" borderRadius="full" />
              </VStack>
            </HStack>
            
            <Divider />
            
            <HStack spacing={4} align="flex-start">
              <Skeleton width="50px" height="50px" borderRadius="full" />
              <VStack align="flex-start" spacing={2} width="full">
                <Skeleton height="20px" width="25%" />
                <Skeleton height="16px" width="70%" />
              </VStack>
            </HStack>
            
            <Skeleton height="45px" width="full" borderRadius="xl" mt={2} />
          </VStack>
        </CardBody>
      </MotionCard>
    );
  }

  if (error) {
    return (
      <Alert 
        status="error" 
        variant="left-accent" 
        borderRadius="2xl" 
        boxShadow="xl"
        height="100%"
        p={6}
      >
        <VStack align="stretch" spacing={4} width="full">
          <Flex>
            <AlertIcon boxSize={6} />
            <Text ml={2} fontWeight="medium">{error}</Text>
          </Flex>
          <Button 
            size="md" 
            colorScheme="red" 
            onClick={() => fetchEarthquakes(true)}
            leftIcon={<FaSyncAlt />}
            borderRadius="xl"
            py={6}
            boxShadow="md"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'xl'
            }}
          >
            Coba Lagi
          </Button>
        </VStack>
      </Alert>
    );
  }

  if (!latestEarthquake) {
    return (
      <Alert 
        status="info" 
        variant="left-accent" 
        borderRadius="2xl" 
        boxShadow="xl"
        height="100%"
        p={6}
      >
        <AlertIcon />
        Belum ada data gempa tersedia.
      </Alert>
    );
  }

  const hasTsunami = latestEarthquake.Potensi === 'Tsunami';
  const magnitude = parseFloat(latestEarthquake.Magnitude);
  const magnitudeColor = getColor(magnitude);
  
  return (
    <ScaleFade initialScale={0.95} in={!loading}>
      <MotionCard
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        bg={cardBg}
        borderRadius="2xl"
        boxShadow="xl"
        overflow="hidden"
        height="100%"
        transition="all 0.3s"
        _hover={{ 
          transform: 'translateY(-8px)',
          boxShadow: '2xl'
        }}
        position="relative"
        role="group"
      >
        {/* Background wave decoration */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="100%"
          zIndex="0"
          opacity="0.05"
          backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMwMDc3QzAiPjxwYXRoIGQ9Ik0xMjgwIDMyTDY0MCA3NS45IDAgMzJWMGgxMjgweiIvPjwvZz48L3N2Zz4=')"
          backgroundSize="cover"
          backgroundPosition="center"
          transform="scaleY(5)"
          transition="opacity 0.5s ease"
          _groupHover={{ opacity: "0.1" }}
        />
        
        <Flex 
          bgGradient={`linear-gradient(to right, ${blue400}, ${blue600})`}
          p={6} 
          justifyContent="space-between" 
          alignItems="center"
          borderBottomWidth="1px"
          borderColor={borderColor}
          position="relative"
          zIndex="1"
        >
          <HStack spacing={3}>
            <Icon 
              as={FaWaveSquare} 
              color="white" 
              boxSize={5} 
              animation={waveAnimation}
              transformOrigin="center"
            />
            <Heading
              as="h3"
              size="md"
              color="white"
              fontWeight="bold"
            >
              Gempa Bumi Terkini
            </Heading>
          </HStack>
          
          {lastUpdated && (
            <MotionBadge
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              bg="whiteAlpha.300"
              color="white"
              fontSize="xs"
              fontWeight="medium"
              px={3}
              py={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              backdropFilter="blur(4px)"
            >
              <Icon as={FaClock} mr={1} boxSize={3} />
              {formatLastUpdated()}
            </MotionBadge>
          )}
          
          {/* Animated wave for visual effect */}
          <Box
            position="absolute"
            left="0"
            right="0"
            bottom="-1px"
            height="15px"
            bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyODAgMEw2NDAgNzAgMCAwdjE0MGgxMjgweiIvPjwvZz48L3N2Zz4=')"
            backgroundSize="100% 100%"
            opacity={0.6}
            zIndex={1}
          />
        </Flex>
        
        <Box p={6} position="relative" zIndex="1">
          {hasTsunami && (
            <MotionFlex
              mb={6}
              bgGradient={colorPalette.gradientRed}
              color="white"
              p={4}
              borderRadius="xl"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              boxShadow="md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              animation={pulseAnimation}
            >
              <Icon as={FaExclamationTriangle} mr={3} boxSize={5} />
              <Text fontSize="md">BERPOTENSI TSUNAMI</Text>
            </MotionFlex>
          )}
          
          <List spacing={5}>
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="center">
                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`blue.50`}
                    color={`blue.500`}
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.05)",
                      bg: "blue.100"
                    }}
                  >
                    <Icon as={FaCalendarAlt} boxSize={5} />
                  </Flex>
                  <VStack spacing={1} align="flex-start">
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
                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`purple.50`}
                    color={`purple.500`}
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.05)",
                      bg: "purple.100"
                    }}
                  >
                    <Icon as={FaClock} boxSize={5} />
                  </Flex>
                  <VStack spacing={1} align="flex-start">
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
                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`${magnitudeColor}.50`}
                    color={`${magnitudeColor}.500`}
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.05)",
                      bg: `${magnitudeColor}.100`
                    }}
                  >
                    <Icon as={FaRuler} boxSize={5} />
                  </Flex>
                  <VStack spacing={1} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Magnitudo
                    </Text>
                    <HStack>
                      <Tooltip
                        hasArrow
                        label={getMagnitudeDescription(magnitude)}
                        bg={`${magnitudeColor}.500`}
                        color="white"
                        placement="top"
                        fontSize="sm"
                        isOpen={showTooltip}
                        onClose={() => setShowTooltip(false)}
                      >
                        <Badge
                          bgGradient={getGradient(magnitude)}
                          color="white"
                          fontSize="md"
                          px={4}
                          py={1.5}
                          borderRadius="full"
                          fontWeight="bold"
                          boxShadow="md"
                          cursor="pointer"
                          onClick={() => setShowTooltip(!showTooltip)}
                          transition="all 0.2s"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg"
                          }}
                          position="relative"
                        >
                          {magnitude}
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            borderRadius="full"
                            bg="white"
                            opacity="0.2"
                            animation={pulseAnimation}
                          />
                        </Badge>
                      </Tooltip>
                      <Icon 
                        as={FaInfoCircle} 
                        color={`${magnitudeColor}.400`} 
                        boxSize={4} 
                        opacity={0.7}
                        cursor="pointer"
                        onClick={() => setShowTooltip(!showTooltip)}
                        _hover={{ opacity: 1 }}
                      />
                    </HStack>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
            
            <Divider />
            
            <MotionBox variants={itemVariants}>
              <ListItem>
                <HStack spacing={4} align="flex-start">
                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`green.50`}
                    color={`green.500`}
                    mt={1}
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.05)",
                      bg: "green.100"
                    }}
                  >
                    <Icon as={FaMapMarkerAlt} boxSize={5} />
                  </Flex>
                  <VStack spacing={1} align="flex-start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Lokasi
                    </Text>
                    <Text fontWeight="semibold" color={textColor} fontSize="md">
                      {latestEarthquake.Wilayah}
                    </Text>
                    <Link 
                      href={`https://www.google.com/maps/search/?api=1&query=${latestEarthquake.Coordinates}`} 
                      isExternal
                      color="blue.500"
                      fontSize="xs"
                      display="flex"
                      alignItems="center"
                      mt={1}
                      _hover={{ textDecoration: 'none', color: 'blue.600' }}
                    >
                      <Text>Lihat di peta</Text>
                      <Icon as={FaExternalLinkAlt} ml={1} boxSize={3} />
                    </Link>
                  </VStack>
                </HStack>
              </ListItem>
            </MotionBox>
          </List>
          
          <MotionButton
            as={motion.button}
            mt={8}
            size="lg"
            width="full"
            bgGradient={colorPalette.gradientBlue}
            color="white"
            fontWeight="bold"
            borderRadius="xl"
            py={6}
            boxShadow="0px 10px 25px -5px rgba(66, 153, 225, 0.4)"
            _hover={{ 
              bgGradient: 'linear-gradient(135deg, #3182CE, #2C5282)',
              transform: 'translateY(-2px)',
              boxShadow: '0px 20px 25px -5px rgba(66, 153, 225, 0.5)'
            }}
            leftIcon={<Icon as={FaSyncAlt} />}
            onClick={() => fetchEarthquakes(true)}
            isLoading={refreshing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            position="relative"
            overflow="hidden"
            transition="all 0.3s"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              bottom="0"
              width="30px"
              bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
              animation={`${pulse} 2s infinite linear`}
              transform="rotate(25deg)"
              transformOrigin="center"
            />
            Perbarui Data
          </MotionButton>
        </Box>
      </MotionCard>
    </ScaleFade>
  );
}

export default EarthquakeInfo;
