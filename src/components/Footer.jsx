import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Icon,
  Divider,
  Container,
  useColorModeValue,
  Link,
  SimpleGrid,
  Badge,
  IconButton,
  Tooltip,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaArrowUp,
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.4); }
  50% { box-shadow: 0 0 20px rgba(66, 153, 225, 0.8); }
  100% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.4); }
`;

const colorPalette = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  darkBackground: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: '1px solid rgba(255, 255, 255, 0.2)',
};

function Footer() {
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.600, purple.600)',
    'linear(135deg, gray.800, gray.900)'
  );
  const textColor = useColorModeValue('white', 'gray.100');
  const glassColor = useColorModeValue(
    'rgba(255, 255, 255, 0.1)',
    'rgba(255, 255, 255, 0.05)'
  );
  const borderColor = useColorModeValue(
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.1)'
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub', color: 'gray.400' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'twitter.400' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'linkedin.400' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'pink.400' },
  ];

  const quickLinks = [
    { title: 'Peta Gempa', href: '/map', icon: FaMapMarkerAlt },
    { title: 'Tentang Kami', href: '/about', icon: FaRocket },
    { title: 'Artikel', href: '/article', icon: FaGlobe },
    { title: 'Keselamatan', href: '/safety', icon: FaShieldAlt },
  ];

  return (
    <MotionBox
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="whiteAlpha.100"
        filter="blur(80px)"
        animation={`${float} 8s ease-in-out infinite`}
      />
      
      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        width="250px"
        height="250px"
        borderRadius="full"
        bg="whiteAlpha.50"
        filter="blur(60px)"
        animation={`${float} 6s ease-in-out infinite 2s`}
      />

      {/* Scroll to top button */}
      <MotionIconButton
        position="absolute"
        top={6}
        right={6}
        size="lg"
        borderRadius="full"
        bg={glassColor}
        backdropFilter="blur(10px)"
        border={`1px solid ${borderColor}`}
        color="white"
        icon={<FaArrowUp />}
        onClick={scrollToTop}
        boxShadow="xl"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: '2xl',
          bg: 'whiteAlpha.200',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animation={`${glow} 3s ease-in-out infinite`}
        zIndex="2"
      />

      <Container maxW="1200px" py={16} position="relative" zIndex="1">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {/* Brand Section */}
          <MotionBox variants={itemVariants}>
            <VStack align="flex-start" spacing={6}>
              <MotionFlex
                align="center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  w={12}
                  h={12}
                  borderRadius="xl"
                  bgGradient="linear(45deg, blue.400, purple.400)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={3}
                  boxShadow="lg"
                  animation={`${pulse} 2s infinite`}
                >
                  <Icon as={FaGlobe} color="white" boxSize={6} />
                </Box>
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, blue.100)"
                  bgClip="text"
                >
                  SeismoSphere
                </Heading>
              </MotionFlex>

              <Text fontSize="md" opacity="0.9" lineHeight="tall">
                Jaringan Cerdas untuk Kesiapsiagaan Gempa dan Pemantauan Aktivitas Seismik di Indonesia
              </Text>

              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                bg={glassColor}
                backdropFilter="blur(10px)"
                border={`1px solid ${borderColor}`}
              >
                Real-time Data
              </Badge>
            </VStack>
          </MotionBox>

          {/* Quick Links */}
          <MotionBox variants={itemVariants}>
            <VStack align="flex-start" spacing={4}>
              <Heading as="h4" size="md" fontWeight="semibold">
                Menu Cepat
              </Heading>
              <VStack align="flex-start" spacing={3}>
                {quickLinks.map((link, index) => (
                  <MotionFlex
                    key={index}
                    as={Link}
                    href={link.href}
                    align="center"
                    color="whiteAlpha.800"
                    _hover={{
                      color: 'white',
                      textDecoration: 'none',
                      transform: 'translateX(5px)',
                    }}
                    transition="all 0.3s"
                    whileHover={{ x: 5 }}
                  >
                    <Icon as={link.icon} mr={2} boxSize={4} />
                    <Text>{link.title}</Text>
                  </MotionFlex>
                ))}
              </VStack>
            </VStack>
          </MotionBox>

          {/* Contact Info */}
          <MotionBox variants={itemVariants}>
            <VStack align="flex-start" spacing={4}>
              <Heading as="h4" size="md" fontWeight="semibold">
                Kontak
              </Heading>
              <VStack align="flex-start" spacing={3}>
                <Flex align="center" color="whiteAlpha.800">
                  <Icon as={FaMapMarkerAlt} mr={3} boxSize={4} />
                  <Text fontSize="sm">Jakarta, Indonesia</Text>
                </Flex>
                <Flex align="center" color="whiteAlpha.800">
                  <Icon as={FaEnvelope} mr={3} boxSize={4} />
                  <Text fontSize="sm">info@seismosphere.id</Text>
                </Flex>
                <Flex align="center" color="whiteAlpha.800">
                  <Icon as={FaPhone} mr={3} boxSize={4} />
                  <Text fontSize="sm">+62 21 1234 5678</Text>
                </Flex>
              </VStack>
            </VStack>
          </MotionBox>

          {/* Social Media */}
          <MotionBox variants={itemVariants}>
            <VStack align="flex-start" spacing={4}>
              <Heading as="h4" size="md" fontWeight="semibold">
                Ikuti Kami
              </Heading>
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <Tooltip
                    key={index}
                    label={social.label}
                    placement="top"
                    hasArrow
                  >
                    <MotionIconButton
                      as={Link}
                      href={social.href}
                      icon={<Icon as={social.icon} />}
                      size="lg"
                      borderRadius="full"
                      bg={glassColor}
                      backdropFilter="blur(10px)"
                      border={`1px solid ${borderColor}`}
                      color="white"
                      _hover={{
                        bg: 'whiteAlpha.200',
                        transform: 'translateY(-2px)',
                        boxShadow: 'xl',
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      boxShadow="lg"
                    />
                  </Tooltip>
                ))}
              </HStack>
              
              <MotionButton
                size="sm"
                variant="outline"
                colorScheme="whiteAlpha"
                borderColor="whiteAlpha.300"
                color="white"
                _hover={{
                  bg: 'whiteAlpha.200',
                  borderColor: 'whiteAlpha.400',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                mt={4}
              >
                Newsletter
              </MotionButton>
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Divider
          my={10}
          borderColor="whiteAlpha.300"
          opacity="0.6"
        />

        {/* Bottom Section */}
        <MotionFlex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          variants={itemVariants}
        >
          <MotionFlex
            align="center"
            mb={{ base: 4, md: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Text fontSize="sm" opacity="0.8" mr={2}>
              &copy; {new Date().getFullYear()} SeismoSphere. All rights reserved.
            </Text>
            <Text fontSize="sm" opacity="0.8" mr={1}>
              Made with
            </Text>
            <Icon
              as={FaHeart}
              color="red.400"
              animation={`${pulse} 1.5s infinite`}
              mr={1}
            />
            <Text fontSize="sm" opacity="0.8">
              in Indonesia
            </Text>
          </MotionFlex>

          <HStack spacing={6} fontSize="sm" opacity="0.8">
            <Link _hover={{ color: 'white', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link _hover={{ color: 'white', textDecoration: 'none' }}>
              Terms of Service
            </Link>
            <Link _hover={{ color: 'white', textDecoration: 'none' }}>
              Cookies
            </Link>
          </HStack>
        </MotionFlex>
      </Container>
    </MotionBox>
  );
}

export default Footer;
