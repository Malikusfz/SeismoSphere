import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
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
    <Box
      bg={colorPalette.background}
      color={colorPalette.accent}
      p={6}
      borderRadius="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box>
        <Heading size="m" textAlign="center" color={colorPalette.highlight}>
          Cara Mempersiapkan Diri Dari Gempa Bumi
        </Heading>
        <Grid
          templateAreas={{
            base: '\'step1\' \'step2\' \'step3\' \'step4\' \'step5\'',
            md: '\'step1 step2\' \'step3 step4\' \'step5 step5\'',
          }}
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          gap={6}
          mt="30px"
          justifyContent="center"
        >
          {preparationSteps.map((step, index) => (
            <GridItem
              key={step.id}
              area={`step${index + 1}`}
              display="flex"
              justifyContent="center"
            >
              <MotionBox
                bg="white"
                boxShadow="md"
                p={4}
                borderRadius="md"
                textAlign="center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                width="100%"
                maxWidth={index === 4 ? '800px' : 'none'} // Apply maxWidth only to step 5
              >
                <VStack spacing={4}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="20px"
                  />
                  <Heading as="h6" size="md" mb="2">
                    {step.title}
                  </Heading>
                  <Text textAlign="justify" color={colorPalette.accent}>
                    {step.description}
                  </Text>
                </VStack>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default EarthquakeSigns;
