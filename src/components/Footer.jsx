import React from 'react';
import {
  Box, Flex, Text, VStack,
} from '@chakra-ui/react';

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

function Footer() {
  return (
    <Box bg={colorPalette.background} py={3} px={8} boxShadow="sm" borderTop="1px" borderColor="gray.200">
      <Flex direction={{ base: 'column', md: 'row' }} maxW="1200px" mx="auto" justifyContent="center" alignItems="center">
        <VStack align="center" spacing={1} mb={{ base: 4, md: 0 }}>
          <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            SeismoSphere. All rights reserved.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Footer;
