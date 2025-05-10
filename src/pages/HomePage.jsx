import React, { useRef } from 'react';
import {
  Image,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  useMediaQuery,
  useColorModeValue,
  Container,
  VStack,
  Badge,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaFeather, FaVolcano, FaLandmark } from 'react-icons/fa6';
import GempaImg from '../../Public/images/Gempa.png';
import TektonikImg from '../../Public/images/GempaTektonik.png';
import VulkanikImg from '../../Public/images/GempaVulkanik.png';
import ReruntuhanImg from '../../Public/images/GempaReruntuhan.png';
import Seismosphere from '../../Public/images/Seismosphere.png';
import EarthquakeInfo from '../components/EarthquakeInfo';
import EarthquakePrevention from '../components/EarthquakePrevention';
import EarthquakeSigns from '../components/EarthquakeSigns';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradient: 'linear-gradient(135deg, #4299E1, #0077C0)',
};

function HomePage() {
  const [isLargeThan62] = useMediaQuery('(min-width: 62em)');
  const EarthquakeInfoRef = useRef(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardShadow = useColorModeValue('lg', 'dark-lg');
  const headingColor = useColorModeValue('blue.600', 'blue.300');

  const handleScroll = () => {
    EarthquakeInfoRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      transition: { duration: 0.3 }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const staggerChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Box 
        bg={useColorModeValue(colorPalette.background, 'gray.900')}
        position="relative"
        overflow="hidden"
      >
        {/* Hero Section */}
        <Box 
          as="section" 
          minHeight="90vh" 
          position="relative"
          display="flex"
          alignItems="center"
        >
          <Container maxW="1400px">
            <Flex
              alignItems="center"
              py={{ base: 12, md: 16 }}
              justifyContent="space-between"
              flexDirection={isLargeThan62 ? 'row' : 'column'}
              gap={{ base: 6, md: 8 }}
            >
              <MotionFlex
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                flexDirection="column"
                w={isLargeThan62 ? '50%' : 'full'}
              >
                <Badge 
                  colorScheme="blue" 
                  fontSize={{ base: "sm", md: "md" }} 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  mb={3}
                >
                  Informasi Gempa Indonesia
                </Badge>

                <Heading
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  mb={4}
                  bgGradient="linear(to-r, blue.400, blue.600)"
                  bgClip="text"
                  letterSpacing="tight"
                >
                  SeismoSphere
                </Heading>

                <Text 
                  mb={6} 
                  fontSize={{ base: "lg", md: "xl" }}
                  color={useColorModeValue('gray.600', 'gray.300')}
                  maxW="540px"
                >
                  Jaringan Cerdas Untuk Kesiapsiagaan Gempa dan Pemantauan Aktivitas Seismik di Indonesia
                </Text>

                <MotionButton
                  size="lg"
                  bgGradient={colorPalette.gradient}
                  color="white"
                  fontWeight="bold"
                  borderRadius="lg"
                  px={8}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl',
                  }}
                  rightIcon={<ChevronDownIcon boxSize={5} />}
                  onClick={handleScroll}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pelajari Lebih Lanjut
                </MotionButton>
              </MotionFlex>

              <MotionFlex
                w={isLargeThan62 ? '45%' : 'full'}
                justify="center"
                align="center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image 
                  src={Seismosphere} 
                  alt="SeismoSphere" 
                  w="full" 
                  objectFit="contain"
                  borderRadius="2xl"
                  boxShadow="2xl"
                />
              </MotionFlex>
            </Flex>
          </Container>
          
          {/* Scroll indicator */}
          <MotionFlex
            position="absolute"
            bottom="5"
            left="50%"
            transform="translateX(-50%)"
            flexDirection="column"
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <Text fontSize="sm" color="gray.500" mb={2}>Scroll Down</Text>
            <ChevronDownIcon boxSize={6} color="gray.500" />
          </MotionFlex>
        </Box>

        {/* Main Content */}
        <Box 
          as="main" 
          bg={useColorModeValue(colorPalette.background, 'gray.900')}
          py={{ base: 12, md: 16 }}
          ref={EarthquakeInfoRef}
        >
          <Container maxW="1400px">
            {/* First Section: Earthquake Info */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              mb={{ base: 16, md: 24 }}
            >
              <Box textAlign="center" mb={12}>
                <Badge colorScheme="blue" px={3} py={1} mb={3}>
                  Informasi
                </Badge>
                <Heading 
                  as="h2" 
                  size="xl" 
                  mb={4} 
                  color={headingColor}
                  fontWeight="bold"
                >
                  Gempa Bumi & Data Terkini
                </Heading>
                <Text 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  fontSize="lg"
                  maxW="700px"
                  mx="auto"
                >
                  Informasi gempa terkini dan edukasi tentang jenis-jenis gempa bumi
                </Text>
              </Box>
              
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: "20px" }}>
                <MotionBox
                  as={Card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  variants={cardVariants}
                  bg={bgColor}
                  boxShadow={cardShadow}
                  borderRadius="xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <CardBody bg={useColorModeValue('white', 'gray.800')} p={6}>
                    <VStack spacing={5} align="start">
                      <Image 
                        src={GempaImg} 
                        alt="Gempa" 
                        borderRadius="lg"
                        boxShadow="md" 
                        w="full"
                        h={{ base: "200px", md: "300px" }}
                        objectFit="cover"
                      />
                      <VStack spacing={3} align="start">
                        <Badge colorScheme="blue">Pengetahuan Dasar</Badge>
                        <Heading size="md" color={textColor}>Apa itu Gempa Bumi?</Heading>
                        <Text color={useColorModeValue('gray.600', 'gray.300')}>
                          Gempa adalah getaran permukaan bumi akibat pelepasan energi
                          dari dalam bumi secara tiba-tiba yang menciptakan gelombang seismik.
                          Gempa bumi dapat menyebabkan kerusakan pada bangunan dan infrastruktur lainnya.
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </MotionBox>

                <Flex flexDirection="column" gap={{ base: 4, md: "20px" }}>
                  <MotionBox
                    variants={staggerChildVariants}
                    whileHover={{ y: -5 }}
                  >
                    <EarthquakeInfo />
                  </MotionBox>

                  <MotionBox
                    variants={staggerChildVariants}
                    whileHover={{ y: -5 }}
                  >
                    <EarthquakePrevention />
                  </MotionBox>
                </Flex>
              </SimpleGrid>
            </MotionBox>

            {/* Second Section: Types of Earthquakes */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              mb={{ base: 12, md: 16 }}
            >
              <Box textAlign="center" mb={12}>
                <Badge colorScheme="purple" px={3} py={1} mb={3}>
                  Klasifikasi
                </Badge>
                <Heading 
                  as="h2" 
                  size="xl" 
                  mb={4} 
                  fontWeight="bold"
                  color={headingColor}
                >
                  Jenis-Jenis Gempa Bumi
                </Heading>
                <Text 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  fontSize="lg"
                  maxW="700px"
                  mx="auto"
                >
                  Mengenal berbagai jenis gempa berdasarkan penyebab terjadinya
                </Text>
              </Box>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
                {[
                  {
                    title: "Gempa Tektonik",
                    description: "Gempa ini disebabkan oleh pergerakan lempeng tektonik di kerak bumi. Ini adalah jenis gempa yang paling umum dan sering kali paling merusak.",
                    image: TektonikImg,
                    icon: FaFeather,
                    color: "blue"
                  },
                  {
                    title: "Gempa Vulkanik",
                    description: "Gempa ini terjadi akibat aktivitas vulkanik, seperti letusan gunung berapi atau pergerakan magma di dalam bumi.",
                    image: VulkanikImg,
                    icon: FaVolcano,
                    color: "orange"
                  },
                  {
                    title: "Gempa Reruntuhan",
                    description: "Gempa ini disebabkan oleh runtuhan tanah atau batuan di daerah karst atau tambang. Mereka biasanya lebih kecil dan lokal.",
                    image: ReruntuhanImg,
                    icon: FaLandmark,
                    color: "green"
                  }
                ].map((item, i) => (
                  <MotionBox
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <Card
                      bg={bgColor}
                      boxShadow={cardShadow}
                      borderRadius="xl"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor={borderColor}
                      h="100%"
                      transition="all 0.3s ease"
                      _hover={{ transform: "translateY(-5px)" }}
                    >
                      <Box position="relative">
                        <Image
                          alt={item.title}
                          src={item.image}
                          h="240px"
                          w="full"
                          objectFit="cover"
                        />
                        <HStack
                          position="absolute"
                          top={4}
                          left={4}
                          bg={`${item.color}.500`}
                          color="white"
                          borderRadius="full"
                          px={3}
                          py={1}
                          boxShadow="md"
                        >
                          <Icon as={item.icon} boxSize={4} />
                          <Text fontWeight="medium" fontSize="sm">Tipe {i + 1}</Text>
                        </HStack>
                      </Box>
                      <CardBody p={6}>
                        <VStack align="start" spacing={3}>
                          <Heading size="md" color={textColor}>
                            {item.title}
                          </Heading>
                          <Text
                            color={useColorModeValue('gray.600', 'gray.300')}
                            fontSize="md"
                            lineHeight="tall"
                          >
                            {item.description}
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          </Container>
        </Box>
      </Box>
      
      {/* Prevention Section */}
      <EarthquakeSigns />
    </>
  );
}

export default HomePage;
