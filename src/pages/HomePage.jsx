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
  Divider,
  IconButton,
  Grid,
  GridItem,
  AspectRatio,
  useToken,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  ChevronDownIcon, 
  InfoIcon, 
  WarningIcon, 
  TimeIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons';
import { 
  FaFeather, 
  FaMountain, 
  FaLandmark, 
  FaMapMarkerAlt, 
  FaShieldAlt,
  FaRegLightbulb,
  FaChartLine,
  FaHeartbeat
} from 'react-icons/fa';
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
const MotionCard = motion(Card);
const MotionContainer = motion(Container);
const MotionBadge = motion(Badge);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSimpleGrid = motion(SimpleGrid);

// Enhanced color palette
const colorPalette = {
  background: 'linear-gradient(180deg, #F0F7FF 0%, #E6F0FF 100%)',
  darkBackground: 'linear-gradient(180deg, #1A202C 0%, #171923 100%)',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradient: 'linear-gradient(135deg, #4299E1, #0077C0)',
  cardGradient: 'linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.8) 100%)',
  darkCardGradient: 'linear-gradient(120deg, rgba(45,55,72,0.9) 0%, rgba(26,32,44,0.8) 100%)',
  glassLight: 'rgba(255, 255, 255, 0.6)',
  glassDark: 'rgba(26, 32, 44, 0.6)',
  glassBorderLight: '1px solid rgba(255, 255, 255, 0.2)',
  glassBorderDark: '1px solid rgba(255, 255, 255, 0.05)',
};

function HomePage() {
  const [isLargeThan62] = useMediaQuery('(min-width: 62em)');
  const EarthquakeInfoRef = useRef(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardShadow = useColorModeValue('lg', 'dark-lg');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const glassBg = useColorModeValue(colorPalette.glassLight, colorPalette.glassDark);
  const glassBorder = useColorModeValue(colorPalette.glassBorderLight, colorPalette.glassBorderDark);
  const cardGradient = useColorModeValue(colorPalette.cardGradient, colorPalette.darkCardGradient);
  const mainBg = useColorModeValue(colorPalette.background, colorPalette.darkBackground);
  
  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3
      }
    }
  };

  const itemFadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      transition: { duration: 0.3 }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 30px 60px -10px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const handleScroll = () => {
    EarthquakeInfoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box overflow="hidden">
      {/* Hero Section - Modernized with glass effect */}
      <Box 
        as="section" 
        minHeight="100vh" 
        position="relative"
        bgGradient={mainBg}
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        {/* Background Decoration Elements */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          width="600px"
          height="600px"
          borderRadius="full"
          bgGradient="linear(to-br, blue.100, blue.50)"
          opacity={useColorModeValue("0.3", "0.05")}
          filter="blur(80px)"
          zIndex="0"
        />
        
        <Box
          position="absolute"
          bottom="-10%"
          left="-10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bgGradient="linear(to-tr, purple.100, blue.100)"
          opacity={useColorModeValue("0.2", "0.05")}
          filter="blur(70px)"
          zIndex="0"
        />
        
        <MotionContainer 
          maxW="1400px" 
          zIndex="1"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Flex
            alignItems="center"
            py={{ base: 16, md: 20 }}
            justifyContent="space-between"
            flexDirection={isLargeThan62 ? 'row' : 'column'}
            gap={{ base: 10, md: 12 }}
            position="relative"
          >
            <MotionFlex
              variants={fadeInUp}
              flexDirection="column"
              w={isLargeThan62 ? '50%' : 'full'}
              pr={isLargeThan62 ? 8 : 0}
            >
              <MotionBadge 
                variants={itemFadeInUp}
                colorScheme="blue" 
                fontSize={{ base: "sm", md: "md" }} 
                px={4} 
                py={2} 
                borderRadius="full"
                mb={5}
                boxShadow="0px 4px 12px rgba(0, 119, 192, 0.15)"
                alignSelf="flex-start"
                textTransform="uppercase"
                fontWeight="bold"
                letterSpacing="wider"
              >
                Informasi Gempa Indonesia
              </MotionBadge>

              <MotionHeading
                variants={itemFadeInUp}
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="extrabold"
                mb={5}
                bgGradient="linear(to-r, blue.400, blue.600, purple.500)"
                bgClip="text"
                letterSpacing="tight"
                lineHeight="1.1"
              >
                SeismoSphere
              </MotionHeading>

              <MotionText 
                variants={itemFadeInUp}
                mb={8} 
                fontSize={{ base: "lg", md: "xl" }}
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="540px"
                lineHeight="tall"
              >
                Jaringan Cerdas Untuk Kesiapsiagaan Gempa dan Pemantauan Aktivitas Seismik di Indonesia
              </MotionText>

              <MotionButton
                variants={itemFadeInUp}
                size="lg"
                bgGradient={colorPalette.gradient}
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                px={8}
                py={6}
                boxShadow="0px 10px 25px -5px rgba(66, 153, 225, 0.4)"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 20px 25px -5px rgba(66, 153, 225, 0.5)',
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
              variants={fadeInUp}
              w={isLargeThan62 ? '50%' : 'full'}
              justify="center"
              align="center"
            >
              <Box
                overflow="hidden"
                borderRadius="2xl"
                position="relative"
                boxShadow="2xl"
                width="100%"
                height={isLargeThan62 ? "480px" : "350px"}
              >
                <Image 
                  src={Seismosphere} 
                  alt="SeismoSphere" 
                  w="full" 
                  h="full"
                  objectFit="cover"
                  transform="scale(1.05)"
                  transition="transform 0.6s ease-out"
                  _hover={{ transform: "scale(1.1)" }}
                />
                
                {/* Glass overlay for image */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  p={6}
                  bg={glassBg}
                  backdropFilter="blur(10px)"
                  border={glassBorder}
                  borderTopRadius="2xl"
                  borderBottomRadius="2xl"
                  boxShadow="lg"
                  color={textColor}
                >
                  <Heading 
                    size="md"
                    fontWeight="semibold"
                    mb={2}
                    color={headingColor}
                  >
                    Data Realtime
                  </Heading>
                  <Text fontSize="sm">
                    Pemantauan langsung aktivitas gempa bumi di seluruh Indonesia
                  </Text>
                </Box>
              </Box>
            </MotionFlex>
          </Flex>
          
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
              y: [0, -10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }
            }}
          >
            <Text fontSize="sm" color="gray.500" mb={2}>Scroll Down</Text>
            <ChevronDownIcon boxSize={6} color="gray.500" />
          </MotionFlex>
        </MotionContainer>
      </Box>

      {/* Feature Highlights Section (New!) */}
      <Box 
        bg={useColorModeValue("gray.50", "gray.900")}
        py={14} 
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="50%"
          left="0"
          height="1px"
          width="100%"
          bg={useColorModeValue("gray.200", "gray.700")}
          zIndex="0"
        />
        
        <Container maxW="1400px" position="relative" zIndex="1">
          <MotionSimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={10}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: FaRegLightbulb,
                title: "Informasi Terkini",
                description: "Data gempa terbaru langsung dari sumber terpercaya",
                color: "blue"
              },
              {
                icon: FaChartLine,
                title: "Analisis Data",
                description: "Visualisasi dan interpretasi data gempa bumi",
                color: "purple"
              },
              {
                icon: FaShieldAlt,
                title: "Protokol Keselamatan",
                description: "Langkah-langkah perlindungan diri saat gempa",
                color: "orange"
              },
              {
                icon: FaHeartbeat,
                title: "Kesiapsiagaan",
                description: "Persiapan menghadapi bencana gempa bumi",
                color: "green"
              }
            ].map((feature, index) => (
              <MotionBox 
                key={index} 
                variants={itemFadeInUp}
                whileHover="hover"
              >
                <VStack
                  spacing={4}
                  bg={bgColor}
                  p={6}
                  borderRadius="xl"
                  boxShadow="md"
                  align="flex-start"
                  height="100%"
                  position="relative"
                  transition="all 0.3s"
                  _hover={{ 
                    transform: "translateY(-5px)",
                    boxShadow: "xl"
                  }}
                >
                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={`${feature.color}.50`}
                    color={`${feature.color}.500`}
                    mb={2}
                  >
                    <Icon as={feature.icon} boxSize={5} />
                  </Flex>
                  <Heading size="md" fontWeight="bold">
                    {feature.title}
                  </Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>
                    {feature.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </MotionSimpleGrid>
        </Container>
      </Box>

      {/* Main Content - Redesigned */}
      <Box 
        as="main" 
        bg={useColorModeValue("white", "gray.900")}
        py={{ base: 16, md: 20 }}
        ref={EarthquakeInfoRef}
        position="relative"
        overflow="hidden"
      >
        {/* Background elements */}
        <Box
          position="absolute"
          top="5%"
          right="5%"
          width="300px"
          height="300px"
          borderRadius="full"
          bgGradient="linear(to-br, blue.50, purple.50)"
          opacity={useColorModeValue("0.3", "0.05")}
          filter="blur(70px)"
          zIndex="0"
        />
        
        <MotionContainer 
          maxW="1400px"
          position="relative"
          zIndex="1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* First Section: Earthquake Info */}
          <MotionBox
            variants={fadeInUp}
            mb={{ base: 20, md: 28 }}
          >
            <Box textAlign="center" mb={12}>
              <MotionBadge 
                variants={itemFadeInUp}
                colorScheme="blue" 
                px={4} 
                py={2} 
                mb={4}
                borderRadius="full"
                boxShadow="0px 4px 12px rgba(0, 119, 192, 0.15)"
                fontSize="md"
              >
                Informasi
              </MotionBadge>
              <MotionHeading 
                variants={itemFadeInUp}
                as="h2" 
                fontSize={{ base: "3xl", md: "4xl" }}
                mb={5} 
                color={headingColor}
                fontWeight="bold"
              >
                Gempa Bumi & Data Terkini
              </MotionHeading>
              <MotionText 
                variants={itemFadeInUp}
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: "lg", md: "xl" }}
                maxW="700px"
                mx="auto"
                lineHeight="tall"
              >
                Informasi gempa terkini dan edukasi tentang jenis-jenis gempa bumi
              </MotionText>
            </Box>
            
            <Grid 
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 8, lg: 12 }}
            >
              <GridItem>
                <MotionCard
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  bg={bgColor}
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="xl"
                  height="100%"
                >
                  <CardBody p={0}>
                    <Box position="relative">
                      <AspectRatio ratio={16/9}>
                        <Image 
                          src={GempaImg} 
                          alt="Gempa" 
                          objectFit="cover"
                        />
                      </AspectRatio>
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="blackAlpha.300"
                        borderRadius="md"
                        transition="all 0.3s"
                        _hover={{ bg: "blackAlpha.100" }}
                      />
                    </Box>
                    <VStack spacing={5} align="start" p={7}>
                      <Badge 
                        colorScheme="blue"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                      >
                        Pengetahuan Dasar
                      </Badge>
                      <Heading size="lg" color={textColor} lineHeight="tight">
                        Apa itu Gempa Bumi?
                      </Heading>
                      <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="md" lineHeight="tall">
                        Gempa adalah getaran permukaan bumi akibat pelepasan energi
                        dari dalam bumi secara tiba-tiba yang menciptakan gelombang seismik.
                        Gempa bumi dapat menyebabkan kerusakan pada bangunan dan infrastruktur lainnya.
                      </Text>
                      <Button 
                        variant="ghost" 
                        colorScheme="blue" 
                        size="sm" 
                        rightIcon={<ExternalLinkIcon />}
                        alignSelf="flex-end"
                      >
                        Baca Selengkapnya
                      </Button>
                    </VStack>
                  </CardBody>
                </MotionCard>
              </GridItem>

              <GridItem>
                <MotionBox 
                  variants={itemFadeInUp}
                  height="100%"
                >
                  <EarthquakeInfo />
                </MotionBox>
              </GridItem>
            </Grid>
          </MotionBox>

          {/* Prevention Section - Redesigned */}
          <MotionBox
            variants={fadeInUp}
            mb={{ base: 20, md: 28 }}
          >
            <VStack spacing={12}>
              <Box textAlign="center" mb={8}>
                <MotionBadge 
                  variants={itemFadeInUp}
                  colorScheme="green" 
                  px={4} 
                  py={2} 
                  mb={4}
                  borderRadius="full"
                  boxShadow="0px 4px 12px rgba(56, 161, 105, 0.15)"
                  fontSize="md"
                >
                  Pencegahan
                </MotionBadge>
                <MotionHeading 
                  variants={itemFadeInUp}
                  as="h2" 
                  fontSize={{ base: "3xl", md: "4xl" }}
                  mb={5} 
                  color={headingColor}
                  fontWeight="bold"
                >
                  Langkah Perlindungan Diri
                </MotionHeading>
                <MotionText 
                  variants={itemFadeInUp}
                  color={useColorModeValue('gray.600', 'gray.400')}
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="700px"
                  mx="auto"
                  lineHeight="tall"
                >
                  Tindakan utama yang perlu dilakukan untuk melindungi diri ketika terjadi gempa
                </MotionText>
              </Box>
              
              <MotionBox variants={itemFadeInUp} width="100%">
                <EarthquakePrevention />
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* Second Section: Types of Earthquakes - Redesigned */}
          <MotionBox
            variants={fadeInUp}
            mb={{ base: 12, md: 16 }}
          >
            <Box textAlign="center" mb={12}>
              <MotionBadge 
                variants={itemFadeInUp}
                colorScheme="purple" 
                px={4} 
                py={2} 
                mb={4}
                borderRadius="full"
                boxShadow="0px 4px 12px rgba(159, 122, 234, 0.15)"
                fontSize="md"
              >
                Klasifikasi
              </MotionBadge>
              <MotionHeading 
                variants={itemFadeInUp}
                as="h2" 
                fontSize={{ base: "3xl", md: "4xl" }}
                mb={5} 
                fontWeight="bold"
                color={headingColor}
              >
                Jenis-Jenis Gempa Bumi
              </MotionHeading>
              <MotionText 
                variants={itemFadeInUp}
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: "lg", md: "xl" }}
                maxW="700px"
                mx="auto"
                lineHeight="tall"
              >
                Mengenal berbagai jenis gempa berdasarkan penyebab terjadinya
              </MotionText>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }}>
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
                  icon: FaMountain,
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
                <MotionCard
                  key={item.title}
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  bg={bgColor}
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="xl"
                  height="100%"
                  role="group"
                >
                  <Box position="relative">
                    <AspectRatio ratio={16/9}>
                      <Image
                        alt={item.title}
                        src={item.image}
                        objectFit="cover"
                        transition="transform 0.5s ease"
                        _groupHover={{ transform: "scale(1.05)" }}
                      />
                    </AspectRatio>
                    <Flex
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      bg="blackAlpha.400"
                      transition="all 0.3s"
                      _groupHover={{ bg: "blackAlpha.200" }}
                    />
                    <Flex
                      position="absolute"
                      top={4}
                      right={4}
                      width="50px"
                      height="50px"
                      bg={glassBg}
                      backdropFilter="blur(8px)"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      border={glassBorder}
                      color={`${item.color}.500`}
                      boxShadow="lg"
                      transition="all 0.3s"
                      _groupHover={{ 
                        transform: "scale(1.1)",
                        boxShadow: "xl"
                      }}
                    >
                      <Icon as={item.icon} boxSize={5} />
                    </Flex>
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      bg={`${item.color}.500`}
                      color="white"
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      px={3}
                      py={1}
                      boxShadow="md"
                    >
                      Tipe {i + 1}
                    </Box>
                  </Box>
                  <CardBody p={6}>
                    <VStack align="start" spacing={4}>
                      <Heading 
                        size="md" 
                        color={textColor}
                        _groupHover={{ color: `${item.color}.500` }}
                        transition="color 0.3s"
                      >
                        {item.title}
                      </Heading>
                      <Divider borderColor={`${item.color}.100`} />
                      <Text
                        color={useColorModeValue('gray.600', 'gray.300')}
                        fontSize="md"
                        lineHeight="tall"
                      >
                        {item.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </MotionBox>
        </MotionContainer>
      </Box>
      
      {/* Prevention Section */}
      <EarthquakeSigns />
    </Box>
  );
}

export default HomePage;
