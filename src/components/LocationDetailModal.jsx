import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Box,
  Divider,
  Link,
  Spinner,
  useColorModeValue,
  Icon,
  Flex,
  Tooltip,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react';
import { 
  FaMapMarkerAlt, 
  FaCity, 
  FaExternalLinkAlt, 
  FaHistory, 
  FaExclamationTriangle,
  FaMountain,
  FaWater,
  FaBuilding,
  FaInfoCircle
} from 'react-icons/fa';
import axios from 'axios';

/**
 * Modal komponen untuk menampilkan detail lokasi gempa bumi
 * 
 * @param {Object} props - Properti komponen
 * @param {boolean} props.isOpen - Status apakah modal terbuka
 * @param {function} props.onClose - Fungsi untuk menutup modal
 * @param {Object} props.earthquake - Data gempa bumi yang dipilih
 * @param {Array<number>} props.coordinates - Koordinat lokasi gempa [latitude, longitude]
 * @returns {JSX.Element} Komponen modal detail lokasi
 */
function LocationDetailModal({ isOpen, onClose, earthquake, coordinates }) {
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historicalEvents, setHistoricalEvents] = useState([]);
  const [historicalLoading, setHistoricalLoading] = useState(true);
  
  const toast = useToast();
  
  // Responsif sizing berdasarkan breakpoint
  const modalSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const badgeBg = useColorModeValue('blue.50', 'blue.900');
  const badgeColor = useColorModeValue('blue.600', 'blue.200');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');
  
  // Fetch data lokasi menggunakan API Nominatim OpenStreetMap untuk reverse geocoding
  useEffect(() => {
    if (isOpen && coordinates && coordinates.length === 2) {
      setLoading(true);
      fetchLocationDetails(coordinates)
        .then(data => {
          setLocationDetails(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching location details:', err);
          setError('Gagal memuat detail lokasi. Silakan coba lagi nanti.');
          setLoading(false);
          toast({
            title: 'Error',
            description: 'Gagal memuat detail lokasi',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
      
      // Fetch data historis gempa di area tersebut
      fetchHistoricalEarthquakes(coordinates)
        .then(events => {
          setHistoricalEvents(events);
          setHistoricalLoading(false);
        })
        .catch(err => {
          console.error('Error fetching historical data:', err);
          setHistoricalEvents([]);
          setHistoricalLoading(false);
        });
    }
  }, [isOpen, coordinates, toast]);
  
  /**
   * Mendapatkan detail lokasi berdasarkan koordinat menggunakan Nominatim API
   * 
   * @param {Array<number>} coords - Koordinat [latitude, longitude]
   * @returns {Promise<Object>} - Promise yang mengembalikan data detail lokasi
   */
  const fetchLocationDetails = async (coords) => {
    const [lat, lng] = coords;
    
    try {
      // Menggunakan Nominatim OpenStreetMap API untuk reverse geocoding
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat: lat,
          lon: lng,
          zoom: 10,
          addressdetails: 1,
          'accept-language': 'id'
        },
        headers: {
          'User-Agent': 'SeismoSphere Application'
        }
      });
      
      const data = response.data;
      
      // Menentukan provinsi dan kota terdekat dari hasil reverse geocoding
      let province = '';
      let nearestCity = '';
      
      if (data.address) {
        province = data.address.state || data.address.province || data.address.region || '';
        nearestCity = data.address.city || data.address.town || data.address.village || data.address.hamlet || '';
      }
      
      // Menghitung jarak ke kota terdekat (jika ada data kota terdekat)
      let distance = 0;
      if (nearestCity) {
        // Coba dapatkan koordinat kota terdekat untuk perhitungan jarak
        try {
          const cityResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              city: nearestCity,
              format: 'json',
              limit: 1,
              'accept-language': 'id'
            },
            headers: {
              'User-Agent': 'SeismoSphere Application'
            }
          });
          
          if (cityResponse.data && cityResponse.data.length > 0) {
            const cityData = cityResponse.data[0];
            // Hitung jarak menggunakan Haversine formula
            distance = calculateDistance(
              lat, 
              lng, 
              parseFloat(cityData.lat), 
              parseFloat(cityData.lon)
            );
          }
        } catch (err) {
          console.error('Error calculating distance:', err);
          distance = 0;
        }
      }
      
      // Analisis risiko berdasarkan kedalaman, magnitudo dan lokasi
      const riskLevel = analyzeRiskLevel(earthquake?.Magnitude, earthquake?.Kedalaman, data.address);
      
      // Mendapatkan informasi geografis
      const geographicInfo = getGeographicInfo(data);
      
      return {
        province,
        nearestCity,
        distance: Math.round(distance),
        riskLevel,
        geographicInfo,
        exactLocation: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        bmkgUrl: `https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg`
      };
    } catch (error) {
      console.error('Error in fetchLocationDetails:', error);
      throw new Error('Gagal mendapatkan data lokasi');
    }
  };
  
  /**
   * Mendapatkan data gempa historis di area sekitar koordinat
   * 
   * @param {Array<number>} coords - Koordinat [latitude, longitude]
   * @returns {Promise<Array>} - Promise yang mengembalikan array data gempa historis
   */
  const fetchHistoricalEarthquakes = async (coords) => {
    const [lat, lng] = coords;
    
    try {
      // API BMKG untuk data gempa terkini (dari feed RSS-nya atau diformat ke JSON melalui proxy)
      // Catatan: Dalam implementasi sebenarnya, sebaiknya gunakan proxy server atau API khusus
      // Karena BMKG tidak menyediakan API terbuka dengan format JSON dan CORS
      const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
      
      // Filter untuk gempa dalam radius tertentu dari lokasi
      // dan urutkan berdasarkan tanggal terbaru
      const allEarthquakes = response.data.Infogempa.gempa || [];
      
      // Filter gempa dalam radius 100km dan terjadi dalam 1 tahun terakhir
      const nearbyEarthquakes = allEarthquakes
        .filter(quake => {
          const quakeLat = parseFloat(quake.Lintang.replace('°', '').replace(' LU', '').replace(' LS', ''));
          const quakeLng = parseFloat(quake.Bujur.replace('°', '').replace(' BT', ''));
          const distance = calculateDistance(lat, lng, quakeLat, quakeLng);
          
          // Cek apakah gempa berada dalam radius 100km
          return distance <= 100;
        })
        .map(quake => ({
          date: formatBMKGDate(quake.Tanggal, quake.Jam),
          magnitude: parseFloat(quake.Magnitude),
          depth: quake.Kedalaman,
          location: quake.Wilayah
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Ambil 5 gempa terbaru
      
      return nearbyEarthquakes;
    } catch (error) {
      console.error('Error fetching historical earthquakes:', error);
      // Jika ada kesalahan, coba gunakan API alternatif (USGS)
      try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        const usgsResponse = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
          params: {
            format: 'geojson',
            starttime: oneYearAgo.toISOString(),
            latitude: lat,
            longitude: lng,
            maxradiuskm: 100,
            minmagnitude: 5,
            orderby: 'time'
          }
        });
        
        return usgsResponse.data.features.map(feature => ({
          date: new Date(feature.properties.time).toLocaleDateString('id-ID'),
          magnitude: feature.properties.mag,
          depth: `${(feature.geometry.coordinates[2]).toFixed(1)} km`,
          location: feature.properties.place
        })).slice(0, 5);
      } catch (usgsError) {
        console.error('Error fetching from USGS as backup:', usgsError);
        return [];
      }
    }
  };
  
  /**
   * Menghitung jarak antara dua koordinat menggunakan formula Haversine
   * 
   * @param {number} lat1 - Latitude titik pertama
   * @param {number} lon1 - Longitude titik pertama 
   * @param {number} lat2 - Latitude titik kedua
   * @param {number} lon2 - Longitude titik kedua
   * @returns {number} - Jarak dalam kilometer
   */
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius bumi dalam km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Jarak dalam km
    return distance;
  };
  
  /**
   * Mengkonversi derajat ke radian
   * 
   * @param {number} deg - Nilai dalam derajat
   * @returns {number} - Nilai dalam radian
   */
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };
  
  /**
   * Format tanggal dari format BMKG ke format yang lebih baik
   * 
   * @param {string} date - Tanggal dalam format BMKG
   * @param {string} time - Waktu dalam format BMKG
   * @returns {string} - Tanggal dan waktu yang sudah diformat
   */
  const formatBMKGDate = (date, time) => {
    try {
      const dateParts = date.split('-');
      if (dateParts.length === 3) {
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        return `${formattedDate} ${time}`;
      }
      return `${date} ${time}`;
    } catch (error) {
      return `${date} ${time}`;
    }
  };
  
  /**
   * Menganalisis tingkat risiko berdasarkan magnitudo dan kedalaman gempa
   * 
   * @param {string|number} magnitude - Magnitudo gempa
   * @param {string} depth - Kedalaman gempa
   * @param {Object} address - Informasi alamat dari geocoding
   * @returns {string} - Level risiko (Sangat Tinggi, Tinggi, Sedang, Rendah)
   */
  const analyzeRiskLevel = (magnitude, depth, address) => {
    const mag = parseFloat(magnitude || 0);
    // Ekstrak angka dari string kedalaman
    const depthValue = parseFloat(depth ? depth.replace(/[^\d.]/g, '') : 0);
    
    // Analisis berdasarkan kedalaman dan magnitudo
    if (mag >= 7) {
      return 'Sangat Tinggi';
    } else if (mag >= 6 || (mag >= 5 && depthValue < 60)) {
      return 'Tinggi';
    } else if (mag >= 5 || (mag >= 4 && depthValue < 30)) {
      return 'Sedang';
    } else {
      return 'Rendah';
    }
  };
  
  /**
   * Mendapatkan informasi geografis berdasarkan data geocoding
   * 
   * @param {Object} geoData - Data hasil geocoding
   * @returns {string} - Deskripsi geografis area
   */
  const getGeographicInfo = (geoData) => {
    let description = '';
    
    if (!geoData.address) {
      if (geoData.display_name) {
        return `Area: ${geoData.display_name}`;
      }
      return 'Informasi geografis tidak tersedia';
    }
    
    const address = geoData.address;
    
    // Periksa tipe geografis
    if (address.sea || address.ocean) {
      description = `Wilayah perairan ${address.sea || address.ocean}`;
    } else if (address.island) {
      description = `Pulau ${address.island}`;
      if (address.state) {
        description += `, wilayah ${address.state}`;
      }
    } else if (address.mountain || address.peak) {
      description = `Area pegunungan ${address.mountain || address.peak}`;
    } else if (address.volcano) {
      description = `Dekat gunung berapi ${address.volcano}`;
    } else if (address.state) {
      description = `Wilayah ${address.state}`;
      if (address.city) {
        description += `, dekat kota ${address.city}`;
      }
    } else if (address.county || address.district) {
      description = `Area ${address.county || address.district}`;
    } else {
      description = geoData.display_name || 'Area tidak teridentifikasi secara spesifik';
    }
    
    return description;
  };
  
  // Menentukan warna badge berdasarkan tingkat risiko
  const getRiskBadgeColor = (risk) => {
    switch(risk) {
      case 'Sangat Tinggi':
        return 'red';
      case 'Tinggi':
        return 'orange';
      case 'Sedang':
        return 'yellow';
      case 'Rendah':
        return 'green';
      default:
        return 'blue';
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={modalSize} 
      motionPreset="slideInBottom"
      isCentered
      closeOnOverlayClick
      closeOnEsc
      scrollBehavior="inside"
    >
      <ModalOverlay 
        backdropFilter="blur(4px)" 
        bg="blackAlpha.600"
      />
      <ModalContent 
        bg={bgColor} 
        color={textColor} 
        borderRadius="xl" 
        boxShadow="2xl"
        mx={{ base: 4, md: 'auto' }}
        my={{ base: 4, md: 'auto' }}
        maxH={{ base: "90vh", md: "85vh" }}
        overflow="hidden"
        transition="all 0.2s ease-in-out"
        _hover={{ boxShadow: "3xl" }}
      >
        <ModalHeader 
          borderBottomWidth="2px" 
          borderColor={borderColor}
          py={4}
          px={6}
          bg={useColorModeValue('blue.50', 'blue.900')}
          color={useColorModeValue('blue.700', 'blue.100')}
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={3}
          fontSize={{ base: "lg", md: "xl" }}
        >
          <Icon as={FaMapMarkerAlt} color="red.500" boxSize={{ base: 5, md: 6 }} />
          Detail Lokasi Gempa
        </ModalHeader>
        <ModalCloseButton 
          size="lg" 
          top={3} 
          right={3}
          color={useColorModeValue('blue.700', 'blue.100')}
          _hover={{
            bg: useColorModeValue('blue.100', 'blue.700'),
            color: useColorModeValue('blue.800', 'white')
          }}
        />
        <ModalBody py={6} px={{ base: 4, md: 6 }}>
          {loading ? (
            <VStack spacing={4} py={12}>
              <Spinner color="blue.500" size="xl" thickness="4px" speed="0.65s" />
              <Text fontSize="lg">Memuat detail lokasi...</Text>
            </VStack>
          ) : error ? (
            <VStack spacing={5} py={10}>
              <Icon as={FaExclamationTriangle} color="orange.500" boxSize={10} />
              <Text fontSize="lg" fontWeight="medium">{error}</Text>
              <Button 
                onClick={onClose} 
                colorScheme="blue" 
                variant="outline"
                size="lg"
                _hover={{ bg: 'blue.50' }}
              >
                Tutup
              </Button>
            </VStack>
          ) : locationDetails && (
            <VStack spacing={6} align="stretch">
              <Box 
                p={5} 
                borderWidth="1px" 
                borderColor={borderColor} 
                borderRadius="lg"
                bg={badgeBg}
                color={badgeColor}
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                transition="all 0.2s"
              >
                <Flex 
                  direction={{ base: "column", md: "row" }} 
                  spacing={{ base: 3, md: 4 }}
                  gap={{ base: 3, md: 4 }}
                >
                  <VStack spacing={1} align="flex-start" flex="1">
                    <Text fontSize="sm" opacity={0.8}>Koordinat Gempa</Text>
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {locationDetails.exactLocation}
                    </Text>
                  </VStack>
                  
                  <VStack spacing={1} align="flex-start" flex="1">
                    <Text fontSize="sm" opacity={0.8}>Magnitudo</Text>
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {earthquake?.Magnitude || '-'} SR
                    </Text>
                  </VStack>

                  <VStack spacing={1} align="flex-start" flex="1">
                    <Text fontSize="sm" opacity={0.8}>Kedalaman</Text>
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {earthquake?.Kedalaman || '-'}
                    </Text>
                  </VStack>
                </Flex>
              </Box>

              {/* Informasi Wilayah */}
              <Box 
                as="section" 
                bg={sectionBg} 
                p={4} 
                borderRadius="lg"
                borderLeft="4px solid"
                borderColor="blue.400"
              >
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={2} align="center">
                    <Icon as={FaCity} color="blue.500" boxSize={5} />
                    <Text fontWeight="bold" fontSize="lg">Informasi Wilayah</Text>
                  </HStack>
                  
                  <Flex 
                    direction={{ base: "column", md: "row" }} 
                    spacing={{ base: 3, md: 0 }}
                    gap={{ base: 3, md: 0 }}
                  >
                    <VStack spacing={1} align="flex-start" flex="1" mb={{ base: 2, md: 0 }}>
                      <Text fontSize="sm" opacity={0.8}>Provinsi</Text>
                      <Text fontWeight="semibold">{locationDetails.province || 'Tidak tersedia'}</Text>
                    </VStack>
                    
                    <VStack spacing={1} align="flex-start" flex="1" mb={{ base: 2, md: 0 }}>
                      <Text fontSize="sm" opacity={0.8}>Kota Terdekat</Text>
                      <Text fontWeight="semibold">{locationDetails.nearestCity || 'Tidak tersedia'}</Text>
                    </VStack>

                    <VStack spacing={1} align="flex-start" flex="1">
                      <Text fontSize="sm" opacity={0.8}>Jarak</Text>
                      <Text fontWeight="semibold">
                        {locationDetails.distance > 0 
                          ? `${locationDetails.distance} km` 
                          : 'Tidak tersedia'}
                      </Text>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>

              {/* Potensi Dampak */}
              <Box 
                as="section" 
                bg={sectionBg} 
                p={4} 
                borderRadius="lg"
                borderLeft="4px solid"
                borderColor="orange.400"
              >
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={2} align="center">
                    <Icon as={FaExclamationTriangle} color="orange.500" boxSize={5} />
                    <Text fontWeight="bold" fontSize="lg">Potensi Dampak</Text>
                  </HStack>
                  
                  <Flex 
                    direction={{ base: "column", md: "row" }} 
                    spacing={{ base: 3, md: 0 }}
                    gap={{ base: 3, md: 0 }}
                  >
                    <VStack spacing={1} align="flex-start" flex="1" mb={{ base: 2, md: 0 }}>
                      <Text fontSize="sm" opacity={0.8}>Tingkat Risiko</Text>
                      <Badge 
                        colorScheme={getRiskBadgeColor(locationDetails.riskLevel)} 
                        px={2} py={1} 
                        borderRadius="md"
                        fontSize="sm"
                      >
                        {locationDetails.riskLevel}
                      </Badge>
                    </VStack>

                    <VStack spacing={1} align="flex-start" flex="1">
                      <Text fontSize="sm" opacity={0.8}>Potensi Tsunami</Text>
                      <Badge 
                        colorScheme={earthquake?.Potensi === 'Tsunami' ? 'red' : 'green'} 
                        px={2} py={1} 
                        borderRadius="md"
                        fontSize="sm"
                      >
                        {earthquake?.Potensi === 'Tsunami' ? 'Ya' : 'Tidak'}
                      </Badge>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>

              {/* Informasi Geografis */}
              <Box 
                as="section" 
                bg={sectionBg} 
                p={4} 
                borderRadius="lg"
                borderLeft="4px solid"
                borderColor="green.400"
              >
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={2} align="center">
                    <Icon as={FaMountain} color="green.500" boxSize={5} />
                    <Text fontWeight="bold" fontSize="lg">Informasi Geografis</Text>
                  </HStack>
                  
                  <Box px={2}>
                    <Text>{locationDetails.geographicInfo}</Text>
                  </Box>
                </VStack>
              </Box>

              {/* Riwayat Seismik */}
              <Box 
                as="section" 
                bg={sectionBg} 
                p={4} 
                borderRadius="lg"
                borderLeft="4px solid"
                borderColor="purple.400"
              >
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={2} align="center">
                    <Icon as={FaHistory} color="purple.500" boxSize={5} />
                    <Text fontWeight="bold" fontSize="lg">Riwayat Seismik</Text>
                  </HStack>
                  
                  <Box>
                    {historicalLoading ? (
                      <VStack py={4} spacing={4}>
                        <Spinner size="md" color="purple.500" />
                        <Text>Memuat data historis...</Text>
                      </VStack>
                    ) : historicalEvents.length > 0 ? (
                      <VStack align="stretch" spacing={2}>
                        {historicalEvents.map((event, idx) => (
                          <HStack 
                            key={idx} 
                            justify="space-between" 
                            p={3} 
                            bg={useColorModeValue('white', 'gray.800')}
                            borderRadius="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            transition="all 0.2s"
                          >
                            <VStack align="flex-start" spacing={0}>
                              <Text fontWeight="medium">{event.date}</Text>
                              <Text fontSize="sm" opacity={0.8}>{event.location}</Text>
                            </VStack>
                            <Badge 
                              colorScheme={event.magnitude >= 7 ? "red" : event.magnitude >= 6 ? "orange" : "yellow"}
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {event.magnitude} SR
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text>Tidak ada data gempa historis yang tersedia untuk area ini</Text>
                    )}
                  </Box>
                </VStack>
              </Box>
              
              {/* Tombol Link BMKG */}
              <Tooltip label="Membuka situs resmi BMKG di tab baru" hasArrow placement="top">
                <Flex justifyContent="center" pt={4}>
                  <Link href={locationDetails.bmkgUrl} isExternal _hover={{ textDecoration: 'none' }}>
                    <Button 
                      rightIcon={<FaExternalLinkAlt />} 
                      colorScheme="blue" 
                      variant="outline"
                      size={isMobile ? "md" : "lg"}
                      fontWeight="medium"
                      px={6}
                      _hover={{
                        bg: 'blue.50',
                        transform: 'translateY(-2px)',
                        boxShadow: 'md'
                      }}
                      transition="all 0.2s"
                    >
                      Lihat Data BMKG
                    </Button>
                  </Link>
                </Flex>
              </Tooltip>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter 
          borderTopWidth="1px" 
          borderColor={borderColor}
          py={4}
          px={{ base: 4, md: 6 }}
          bg={useColorModeValue('gray.50', 'gray.700')}
          justifyContent="space-between"
        >
          <Button 
            variant="ghost" 
            onClick={onClose}
            size={isMobile ? "md" : "lg"}
            _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
          >
            Tutup
          </Button>
          {!loading && !error && (
            <Button 
              colorScheme="blue"
              onClick={() => {
                window.open(`https://www.google.com/maps?q=${coordinates[0]},${coordinates[1]}`, '_blank');
              }}
              leftIcon={<FaExternalLinkAlt />}
              size={isMobile ? "md" : "lg"}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s"
            >
              Lihat di Google Maps
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LocationDetailModal;
