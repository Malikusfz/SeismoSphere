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
  useMediaQuery
} from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../Public/images/logo.png'; // Adjust the import path if needed

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

  // Color palette for theming
  const colorPalette = {
    background: useColorModeValue('#FFFFFF', '#1A202C'),
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: useColorModeValue('#1D242B', '#E2E8F0'),
    navShadow: useColorModeValue(
      '0 4px 6px rgba(0, 0, 0, 0.05)',
      '0 4px 6px rgba(0, 0, 0, 0.3)'
    ),
    buttonBg: useColorModeValue('#0077C0', '#63B3ED')
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
  // Custom styling for navigation links
  const NavLink = ({ to, children }) => {
    const active = isActive(to);
    return (
      <Link
        as={RouterLink}
        to={to}
        onClick={onClose}
        position="relative"
        fontWeight={active ? '700' : '600'}
        color={active ? colorPalette.highlight : colorPalette.accent}
        px={2}
        py={1}
        transition="all 0.3s ease"
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            width: active ? '100%' : '0%',
            height: '2px',
            bottom: '-2px',
            left: 0,
            backgroundColor: colorPalette.highlight,
            transition: 'width 0.3s ease'
          },
          '&:hover': {
            color: colorPalette.highlight,
            textDecoration: 'none'
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        {children}
      </Link>
    );
  };
  return (    <Box
      bg={colorPalette.background}
      position="sticky"
      top="0"
      zIndex={9000}
      transition="all 0.3s ease"
      boxShadow={scrolled ? colorPalette.navShadow : 'none'}
      borderBottom={scrolled ? 'none' : '1px'}
      borderColor="gray.200"
    >
      <Container maxW="1440px" px={{ base: 4, md: 8 }}>
        <Flex alignItems="center" height={{ base: '70px', md: '80px' }}>
          <HStack spacing={3}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }} display="flex" alignItems="center">
              <Image
                src={logo}
                alt="SeismoSphere Logo"
                boxSize={{ base: '35px', md: '40px' }}
                mr={2}
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.05)' }}
              />
              <Heading
                as="h1"
                fontSize={{ base: 'xl', md: '2xl' }}
                color={colorPalette.accent}
                fontFamily="'Poppins', sans-serif"
                fontWeight="600"
                transition="color 0.3s ease"
                _hover={{ color: colorPalette.highlight }}
              >
                SeismoSphere
              </Heading>
            </Link>
          </HStack>
          
          <Spacer />
          
          <HStack display={{ base: 'none', md: 'flex' }} spacing={{ md: 6, lg: 8 }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/article">Article</NavLink>
          </HStack>
          
          <IconButton
            aria-label="Menu"
            icon={<FaBars />}
            variant="ghost"
            color={colorPalette.accent}
            fontSize="20px"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            _hover={{ bg: colorPalette.secondary, color: colorPalette.highlight }}
          />
        </Flex>
      </Container>

      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size={isLargerThanMd ? 'xs' : 'full'}
      >
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent>
          <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
            <Flex alignItems="center">
              <Image
                src={logo}
                alt="SeismoSphere Logo"
                boxSize="40px"
                mr={3}
              />
              <Heading
                as="h1"
                size="lg"
                color={colorPalette.accent}
                fontFamily="'Poppins', sans-serif"
              >
                SeismoSphere
              </Heading>
            </Flex>
            <IconButton
              icon={<FaTimes />}
              variant="ghost"
              onClick={onClose}
              aria-label="Close Menu"
              color={colorPalette.accent}
              _hover={{ bg: colorPalette.secondary }}
            />
          </Flex>
          
          <Divider mb={4} />
          
          <DrawerBody px={6}>
            <VStack spacing={6} align="start">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/map">Map</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/article">Article</NavLink>
              
              <Divider my={4} />
              
              <Button
                w="full"
                bg={colorPalette.buttonBg}
                color="white"
                _hover={{
                  bg: 'blue.500',
                  transform: 'translateY(-2px)',
                  boxShadow: 'md'
                }}
                transition="all 0.3s ease"
                borderRadius="md"
                mt={4}
                as={RouterLink}
                to="/map"
                onClick={onClose}
              >
                Explore Earthquake Map
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default HeaderNav;
