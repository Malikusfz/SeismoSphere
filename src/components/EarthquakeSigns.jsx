import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import preparationSteps from '../utils/steps';

const MotionBox = motion(Box);

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

function EarthquakeSigns() {
  return (
    <Box bg={colorPalette.background} color={colorPalette.accent} p={6} borderRadius="md">
      <Heading size="m" textAlign="center" color={colorPalette.highlight}>
        Cara Mempersiapkan Diri Dari Gempa Bumi
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mt="30px">
        {preparationSteps.map((step) => (
          <MotionBox
            key={step.id}
            bg="white"
            boxShadow="md"
            p={4}
            borderRadius="md"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <VStack spacing={4}>
              <Image src={step.image} alt={step.alt} boxSize="200px" objectFit="cover" borderRadius="20px" />
              <Heading as="h6" size="md" mb="2">
                {step.title}
              </Heading>
              <Text textAlign="justify" color={colorPalette.accent}>
                {step.description}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
}

export default EarthquakeSigns;
