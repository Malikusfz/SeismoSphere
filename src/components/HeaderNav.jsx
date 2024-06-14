import React from 'react';
import {
  Box, Flex, Heading, Spacer, IconButton, Link, HStack, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Image,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../images/logo.png'; // Adjust the import path if needed

function HeaderNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorPalette = {
    background: '#FFFFFF',
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: '#1D242B',
  };

  return (
    <Box bg={colorPalette.background} px={8} py={4} boxShadow="sm" borderBottom="1px" borderColor="gray.200">
      <Flex alignItems="center" maxW="1440px" mx="auto">
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }} display="flex" alignItems="center">
            <Image src={logo} alt="SeismoSphere Logo" boxSize="40px" mr={2} mb={1.5} />
            <Heading
              as="h1"
              size="lg"
              color={colorPalette.accent}
              fontFamily="'Poppins', sans-serif"
              fontWeight="600"
            >
              SeismoSphere
            </Heading>
          </Link>
        </HStack>
        <Spacer />
        <HStack display={{ base: 'none', md: 'flex' }} spacing={8}>
          <Link as={RouterLink} to="/" fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
            Home
          </Link>
          <Link as={RouterLink} to="/map" fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
            Map
          </Link>
          <Link as={RouterLink} to="/about" fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
            About Us
          </Link>
        </HStack>
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          colorScheme="teal"
          variant="outline"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
        />
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SeismoSphere</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <Link as={RouterLink} to="/" onClick={onClose} fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
                Home
              </Link>
              <Link as={RouterLink} to="/map" onClick={onClose} fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
                Map
              </Link>
              <Link as={RouterLink} to="/about" onClick={onClose} fontWeight="bold" color={colorPalette.accent} _hover={{ color: colorPalette.highlight }}>
                About Us
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default HeaderNav;
