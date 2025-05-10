import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Badge,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  useBreakpointValue,
  Flex,
  Icon,
  useColorModeValue,
  Heading,
  Divider,
  ScaleFade,
  Button,
  Tooltip,
  keyframes,
  ButtonGroup,
  Skeleton,
  Stack,
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import {
  BsTsunami,
  BsCalendar,
  BsClock,
  BsGeoAlt,
  BsLayersHalf,
  BsGraphUp,
  BsArrowClockwise,
  BsExclamationTriangle,
  BsArrowsFullscreen,
  BsFilter,
} from 'react-icons/bs';
import { FaSortAmountDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion(Box);
const MotionTr = motion(Tr);

// Keyframes animation
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(229, 62, 62, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

/**
 * Returns a color code based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - Chakra UI color code
 */
const getColor = (magnitude) => {
  if (magnitude >= 7) {
    return 'red.500';
  } if (magnitude >= 6) {
    return 'orange.400';
  } if (magnitude >= 5.5) {
    return 'yellow.400';
  } if (magnitude >= 4.5) {
    return 'green.500';
  }
  return 'blue.500';
};

/**
 * Returns a gradient color code based on earthquake magnitude
 * 
 * @param {number} magnitude - The earthquake magnitude
 * @returns {string} - CSS gradient string
 */
const getGradient = (magnitude) => {
  if (magnitude >= 7) {
    return 'linear-gradient(135deg, #FF4D4D, #E53E3E)';
  } if (magnitude >= 6) {
    return 'linear-gradient(135deg, #F6AD55, #DD6B20)';
  } if (magnitude >= 5.5) {
    return 'linear-gradient(135deg, #FFD767, #D69E2E)';
  } if (magnitude >= 4.5) {
    return 'linear-gradient(135deg, #68D391, #38A169)';
  }
  return 'linear-gradient(135deg, #63B3ED, #3182CE)';
};

/**
 * Komponen tabel untuk menampilkan data gempa dengan gaya modern dan responsif
 * 
 * @returns {JSX.Element} Komponen tabel gempa
 */
function EarthquakeTable() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEarthquakes = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      setError(null);
      
      const cachedData = JSON.parse(localStorage.getItem('earthquakes'));
      const now = new Date().getTime();

      if (cachedData && (now - cachedData.timestamp < 300000) && !showRefreshing) {
        setEarthquakes(cachedData.data);
        setLastUpdated(new Date(cachedData.timestamp));
        setLoading(false);
      } else {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
        const data = response.data.Infogempa.gempa;
        setEarthquakes(data);
        localStorage.setItem('earthquakes', JSON.stringify({ data, timestamp: now }));
        setLastUpdated(new Date(now));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Gagal memuat data gempa. Silakan coba lagi.');
      setLoading(false);
    } finally {
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
    const intervalId = setInterval(() => fetchEarthquakes(), 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Dynamic color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  const rowSelectedBgColor = useColorModeValue('blue.50', 'blue.900');
  const refreshIconColor = useColorModeValue('blue.500', 'blue.300');
  const cardShadow = useColorModeValue('sm', 'md');
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const loadingBgColor = useColorModeValue('white', 'gray.800');
  const loadingEmptyColor = useColorModeValue("gray.200", "gray.600");
  const animationPulse = `${pulse} 2s infinite`;
  
  const tableContainerStyle = {
    transition: 'all 0.3s ease',
    borderRadius: 'xl',
    boxShadow: 'md',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: 'lg',
    }
  };

  // Format the last updated time to locale string
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render loading state with skeletons
  if (loading) {
    return (
      <MotionBox 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        h="auto" 
        px={4}
        py={5}
        bg={loadingBgColor}
        borderRadius="xl"
        boxShadow="md"
      >
        <Stack spacing={4}>
          <Skeleton height="40px" width="200px" mx="auto" />
          <Skeleton height="20px" width="90%" />
          
          <Stack spacing={3}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height="60px" borderRadius="md" />
            ))}
          </Stack>
        </Stack>
      </MotionBox>
    );
  }

  // Render error state
  if (error) {
    return (
      <Alert status="error" variant="left-accent" borderRadius="md" my={4}>
        <AlertIcon />
        {error}
        <Button 
          ml="auto" 
          size="sm" 
          colorScheme="red" 
          onClick={() => fetchEarthquakes(true)}
          leftIcon={<BsArrowClockwise />}
        >
          Coba Lagi
        </Button>
      </Alert>
    );
  }

  // Mobile view rendering
  if (isMobile) {
    return (
      <ScaleFade initialScale={0.95} in={!loading}>
        <Box px={{ base: 2, sm: 4 }} py={4}>
          <Flex 
            direction="row"
            justify="space-between"
            align="center" 
            mb={4}
            flexWrap="wrap"
            gap={2}
          >
            <Heading 
              size="md" 
              color={textColor} 
              fontWeight="bold"
            >
              Gempa Terkini
            </Heading>
            
            <ButtonGroup size="sm" variant="outline" isAttached>
              <Tooltip label="Segarkan data" hasArrow>
                <Button 
                  leftIcon={<BsArrowClockwise />}
                  isLoading={refreshing}
                  onClick={() => fetchEarthquakes(true)}
                  colorScheme="blue"
                >
                  Segarkan
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Flex>
          
          {lastUpdated && (
            <Text fontSize="xs" color="gray.500" mb={4} textAlign="right">
              Diperbarui: {formatLastUpdated()}
            </Text>
          )}
          
          <VStack spacing={4} align="stretch">
            {earthquakes.map((gempa, index) => (
              <MotionBox
                key={gempa.DateTime}
                p={4}
                borderWidth="1px"
                borderRadius="xl"
                borderColor={borderColor}
                bg={selectedRow === index ? rowSelectedBgColor : cardBgColor}
                boxShadow={cardShadow}
                transition="all 0.3s"
                position="relative"
                overflow="hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05 // Stagger effect
                }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: 'lg',
                  borderColor: 'blue.300'
                }}
                onClick={() => setSelectedRow(index)}
              >
                {gempa.Potensi === 'Tsunami' && (
                  <Box 
                    position="absolute" 
                    top={0} 
                    right={0}
                    bgGradient="linear-gradient(135deg, #FEB2B2, #E53E3E)"
                    color="white"
                    py={1}
                    px={3}
                    fontSize="xs"
                    fontWeight="bold"
                    borderBottomLeftRadius="md"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    boxShadow="md"
                    animation={animationPulse}
                  >
                    <Icon as={BsTsunami} color="white" boxSize={3} />
                    TSUNAMI
                  </Box>
                )}
                
                <VStack spacing={3} align="stretch">
                  <Flex justifyContent="space-between" alignItems="center">
                    <HStack spacing={2}>
                      <Icon as={BsCalendar} color="blue.500" boxSize={4} />
                      <Text color={textColor} fontWeight="medium">{gempa.Tanggal}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={BsClock} color="blue.500" boxSize={4} />
                      <Text color={textColor}>{gempa.Jam}</Text>
                    </HStack>
                  </Flex>
                  
                  <Flex justifyContent="space-between" alignItems="center">
                    <HStack spacing={2}>
                      <Icon as={BsGraphUp} color="blue.500" boxSize={4} />
                      <Badge
                        px={3}
                        py={1.5}
                        borderRadius="full"
                        bgGradient={getGradient(gempa.Magnitude)}
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                        boxShadow="0 2px 5px rgba(0,0,0,0.2)"
                      >
                        {gempa.Magnitude}
                      </Badge>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={BsLayersHalf} color="blue.500" boxSize={4} />
                      <Text color={textColor}>{gempa.Kedalaman}</Text>
                    </HStack>
                  </Flex>
                  
                  <HStack spacing={2} alignItems="flex-start">
                    <Icon as={BsGeoAlt} color="blue.500" boxSize={4} mt={1} />
                    <Text color={textColor} fontSize="sm" fontWeight="medium">{gempa.Wilayah}</Text>
                  </HStack>
                </VStack>
              </MotionBox>
            ))}
          </VStack>
        </Box>
      </ScaleFade>
    );
  }

  // Desktop view rendering
  return (
    <ScaleFade initialScale={0.95} in={!loading}>
      <Box px={{ base: 2, md: 4 }} py={4} width="100%">
        <Flex 
          direction="row"
          justify="space-between"
          align="center" 
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Heading 
            size="md" 
            color={textColor} 
            fontWeight="bold"
          >
            Gempa Terkini
          </Heading>
          
          <HStack spacing={3}>
            {lastUpdated && (
              <Text fontSize="sm" color="gray.500">
                Diperbarui: {formatLastUpdated()}
              </Text>
            )}
            
            <ButtonGroup size="sm" variant="outline" isAttached>
              <Tooltip label="Segarkan data" hasArrow>
                <Button 
                  leftIcon={<BsArrowClockwise />}
                  isLoading={refreshing}
                  onClick={() => fetchEarthquakes(true)}
                  colorScheme="blue"
                  borderRadius="md"
                >
                  Segarkan
                </Button>
              </Tooltip>
            </ButtonGroup>
          </HStack>
        </Flex>
        
        <Divider mb={4} borderColor={borderColor} />
      
        <Box
          borderRadius="xl"
          overflow="hidden"
          borderWidth="1px"
          borderColor={borderColor}
          bg={bgColor}
          boxShadow="md"
          position="relative"
          sx={tableContainerStyle}
        >
          <Box overflowX="auto" css={{
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: borderColor,
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: headerBgColor,
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'blue.400',
            },
          }}>
            <Table variant="simple">
              <Thead bg={headerBgColor}>
                <Tr>
                  <Th color={textColor} textAlign="center" fontWeight="bold" fontSize="sm">Tanggal</Th>
                  <Th color={textColor} textAlign="center" fontWeight="bold" fontSize="sm">Waktu</Th>
                  <Th color={textColor} textAlign="center" fontWeight="bold" fontSize="sm">Magnitudo</Th>
                  <Th color={textColor} textAlign="center" fontWeight="bold" fontSize="sm">Kedalaman</Th>
                  <Th color={textColor} textAlign="center" fontWeight="bold" fontSize="sm">Lokasi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {earthquakes.map((gempa, index) => (
                  <MotionTr
                    key={gempa.DateTime}
                    _hover={{ bg: hoverBgColor, transform: 'scale(1.01)' }}
                    transition="all 0.2s"
                    cursor="pointer"
                    bg={selectedRow === index ? (rowSelectedBgColor) : 'transparent'}
                    onClick={() => setSelectedRow(index)}
                    position="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.03 // Stagger effect
                    }}
                    sx={{
                      transformOrigin: 'center',
                      '&:after': selectedRow === index ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        width: '4px',
                        height: '100%',
                        bgGradient: getGradient(gempa.Magnitude),
                      } : {}
                    }}
                  >
                    <Td color={textColor} textAlign="center" fontSize="sm">{gempa.Tanggal}</Td>
                    <Td color={textColor} textAlign="center" fontSize="sm">{gempa.Jam}</Td>
                    <Td textAlign="center">
                      <HStack justify="center" spacing={2}>
                        <Badge
                          px={3}
                          py={1}
                          borderRadius="full"
                          bgGradient={getGradient(gempa.Magnitude)}
                          color="white"
                          fontSize="sm"
                          fontWeight="bold"
                          boxShadow="0 2px 5px rgba(0,0,0,0.2)"
                          transition="all 0.3s"
                          _hover={{
                            transform: 'scale(1.1)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                          }}
                        >
                          {gempa.Magnitude}
                        </Badge>
                        {gempa.Potensi === 'Tsunami' && (
                          <Tag 
                            size="sm" 
                            variant="subtle" 
                            colorScheme="red"
                            borderRadius="full"
                            boxShadow="sm"
                            animation={animationPulse}
                          >
                            <TagLeftIcon as={BsTsunami} />
                            <TagLabel fontWeight="bold">TSUNAMI</TagLabel>
                          </Tag>
                        )}
                      </HStack>
                    </Td>
                    <Td color={textColor} textAlign="center" fontSize="sm">{gempa.Kedalaman}</Td>
                    <Td color={textColor} textAlign="center" fontSize="sm" maxW="300px" isTruncated>{gempa.Wilayah}</Td>
                  </MotionTr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </ScaleFade>  );
}

export default EarthquakeTable;
