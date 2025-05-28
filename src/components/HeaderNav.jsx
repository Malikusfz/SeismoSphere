import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Link,
  HStack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  Image,
  useColorModeValue,
  Container,
  Button,
  Divider,
  useMediaQuery,
  Badge,
  Icon,
  keyframes,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaRocket, FaMapMarkerAlt, FaShieldAlt, FaHome } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../Public/images/logo.png';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionContainer = motion(Container);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);
const MotionVStack = motion(VStack);

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(66, 153, 225, 0.3); }
  50% { box-shadow: 0 0 20px rgba(66, 153, 225, 0.6); }
  100% { box-shadow: 0 0 10px rgba(66, 153, 225, 0.3); }
`;

/**
 * HeaderNav component providing navigation for the SeismoSphere application.
 * Includes responsive design with a mobile drawer navigation and desktop navbar.
 *
 * @returns {JSX.Element} The rendered HeaderNav component
 */
function HeaderNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  // Enhanced color palette for theming
  const colorPalette = {
    background: useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)'),
    backgroundScrolled: useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)'),
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: useColorModeValue('#1D242B', '#E2E8F0'),
    navShadow: useColorModeValue(
      '0 8px 32px rgba(0, 0, 0, 0.1)',
      '0 8px 32px rgba(0, 0, 0, 0.4)',
    ),
    buttonBg: useColorModeValue('#0077C0', '#63B3ED'),
    glassBorder: useColorModeValue(
      '1px solid rgba(255, 255, 255, 0.2)',
      '1px solid rgba(255, 255, 255, 0.1)'
    ),
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if the given path is the current active route
  const isActive = (path) => location.pathname === path;

  // Navigation items with icons
  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/map', label: 'Map', icon: FaMapMarkerAlt },
    { path: '/about', label: 'About Us', icon: FaRocket },
    { path: '/article', label: 'Article', icon: FaShieldAlt },
  ];

  // Custom styling for navigation links
  function NavLink({ to, children, icon, isMobile = false }) {
    const active = isActive(to);
    return (
      <Link
        as={RouterLink}
        to={to}
        onClick={onClose}
        position="relative"
        fontWeight={active ? '700' : '600'}
        color={active ? colorPalette.highlight : colorPalette.accent}
        px={isMobile ? 4 : 3}
        py={2}
        borderRadius="xl"
        transition="all 0.3s ease"
        display="flex"
        alignItems="center"
        bg={active && isMobile ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
        _hover={{
          color: colorPalette.highlight,
          textDecoration: 'none',
          bg: isMobile ? useColorModeValue('blue.50', 'blue.900') : 'transparent',
          transform: isMobile ? 'translateX(5px)' : 'translateY(-2px)',
        }}
        sx={!isMobile ? {
          '&::after': {
            content: '""',
            position: 'absolute',
            width: active ? '100%' : '0%',
            height: '3px',
            bottom: '-8px',
            left: 0,
            backgroundColor: colorPalette.highlight,
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        } : {}}
      >
        {icon && isMobile && (
          <Icon as={icon} mr={3} boxSize={4} />
        )}
        {children}
        {active && isMobile && (
          <Badge
            ml="auto"
            colorScheme="blue"
            borderRadius="full"
            px={2}
            py={0.5}
            fontSize="xs"
          >
            Active
          </Badge>
        )}
      </Link>
    );
  }

  return (
    <MotionBox
      bg={scrolled ? colorPalette.backgroundScrolled : colorPalette.background}
      position="sticky"
      top="0"
      zIndex={9000}
      transition="all 0.3s ease"
      boxShadow={scrolled ? colorPalette.navShadow : 'none'}
      backdropFilter="blur(20px)"
      border={colorPalette.glassBorder}
      borderTop="none"
      borderLeft="none"
      borderRight="none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <MotionContainer 
        maxW="1440px" 
        px={{ base: 4, md: 8 }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MotionFlex 
          alignItems="center" 
          height={{ base: '70px', md: '80px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <HStack spacing={3}>
            <Link 
              as={RouterLink} 
              to="/" 
              _hover={{ textDecoration: 'none' }} 
              display="flex" 
              alignItems="center"
            >
              <MotionBox
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={logo}
                  alt="SeismoSphere Logo"
                  boxSize={{ base: '35px', md: '40px' }}
                  mr={3}
                  animation={`${float} 4s ease-in-out infinite`}
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                />
              </MotionBox>
              <MotionBox
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Heading
                  as="h1"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  color={colorPalette.accent}
                  fontFamily="'Poppins', sans-serif"
                  fontWeight="700"
                  bgGradient={useColorModeValue(
                    'linear(to-r, blue.600, purple.600)',
                    'linear(to-r, blue.300, purple.300)'
                  )}
                  bgClip="text"
                  transition="all 0.3s ease"
                  _hover={{ 
                    bgGradient: useColorModeValue(
                      'linear(to-r, blue.500, purple.500)',
                      'linear(to-r, blue.400, purple.400)'
                    )
                  }}
                >
                  SeismoSphere
                </Heading>
              </MotionBox>
            </Link>
          </HStack>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack 
            display={{ base: 'none', md: 'flex' }} 
            spacing={{ md: 6, lg: 8 }}
          >
            {navItems.map((item, index) => (
              <MotionBox
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <NavLink to={item.path}>{item.label}</NavLink>
              </MotionBox>
            ))}
          </HStack>

          {/* Mobile Menu Button */}
          <MotionIconButton
            aria-label="Menu"
            icon={<FaBars />}
            variant="ghost"
            color={colorPalette.accent}
            fontSize="20px"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            borderRadius="xl"
            size="lg"
            _hover={{ 
              bg: useColorModeValue('blue.50', 'blue.900'),
              color: colorPalette.highlight,
              transform: 'scale(1.05)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        </MotionFlex>
      </MotionContainer>

      {/* Mobile Drawer */}
      <AnimatePresence>
        <Drawer
          placement="right"
          onClose={onClose}
          isOpen={isOpen}
          size={isLargerThanMd ? 'xs' : 'full'}
        >
          <DrawerOverlay 
            backdropFilter="blur(8px)" 
            bg="blackAlpha.300"
          />
          <DrawerContent
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="2xl"
            borderLeft={colorPalette.glassBorder}
          >
            {/* Drawer Header */}
            <MotionFlex 
              justifyContent="space-between" 
              alignItems="center" 
              px={6} 
              py={4}
              borderBottom="1px"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex alignItems="center">
                <MotionBox
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={logo}
                    alt="SeismoSphere Logo"
                    boxSize="40px"
                    mr={3}
                    animation={`${pulse} 2s infinite`}
                  />
                </MotionBox>
                <VStack align="flex-start" spacing={0}>
                  <Heading
                    as="h1"
                    size="lg"
                    color={colorPalette.accent}
                    fontFamily="'Poppins', sans-serif"
                    fontWeight="bold"
                  >
                    SeismoSphere
                  </Heading>
                  <Text fontSize="xs" color="gray.500">
                    Earthquake Monitoring
                  </Text>
                </VStack>
              </Flex>
              <MotionIconButton
                icon={<FaTimes />}
                variant="ghost"
                onClick={onClose}
                aria-label="Close Menu"
                color={colorPalette.accent}
                borderRadius="xl"
                size="lg"
                _hover={{ 
                  bg: useColorModeValue('red.50', 'red.900'),
                  color: 'red.500'
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            </MotionFlex>

            <DrawerBody px={6} py={6}>
              <MotionVStack 
                spacing={4} 
                align="stretch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {/* Navigation Links */}
                <VStack spacing={2} align="stretch">
                  {navItems.map((item, index) => (
                    <MotionBox
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <NavLink to={item.path} icon={item.icon} isMobile>
                        {item.label}
                      </NavLink>
                    </MotionBox>
                  ))}
                </VStack>

                <Divider my={4} borderColor={useColorModeValue('gray.200', 'gray.600')} />

                {/* Call to Action Button */}
                <MotionButton
                  w="full"
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="bold"
                  boxShadow="0 8px 32px rgba(66, 153, 225, 0.3)"
                  _hover={{
                    bgGradient: "linear(to-r, blue.600, purple.600)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(66, 153, 225, 0.4)',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  as={RouterLink}
                  to="/map"
                  onClick={onClose}
                  leftIcon={<Icon as={FaMapMarkerAlt} />}
                  animation={`${glow} 3s ease-in-out infinite`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Explore Earthquake Map
                </MotionButton>

                {/* Additional Info */}
                <MotionBox
                  mt={8}
                  p={4}
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  borderRadius="xl"
                  border="1px"
                  borderColor={useColorModeValue('blue.100', 'blue.700')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <VStack spacing={2} align="flex-start">
                    <Flex align="center">
                      <Icon as={FaShieldAlt} color="blue.500" mr={2} />
                      <Text fontSize="sm" fontWeight="semibold" color="blue.700">
                        Real-time Monitoring
                      </Text>
                    </Flex>
                    <Text fontSize="xs" color="blue.600">
                      Stay updated with the latest earthquake data and safety information
                    </Text>
                  </VStack>
                </MotionBox>
              </MotionVStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </AnimatePresence>
    </MotionBox>
  );
}

export default HeaderNav;
