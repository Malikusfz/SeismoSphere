import React from 'react';
import {
  Box, HStack, Text, Flex, useColorModeValue, Tooltip,
  keyframes, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Animasi berkedip untuk gempa besar
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(229, 62, 62, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0);
  }
`;

// Komponen motion dari Chakra UI
const MotionBox = motion(Box);

/**
 * Komponen Legend untuk menampilkan legenda warna gempa berdasarkan magnitudo
 * 
 * Menunjukkan skala warna untuk berbagai tingkat magnitudo gempa
 * 
 * @returns {JSX.Element} - Komponen legenda
 */
function Legend() {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(26, 32, 44, 0.85)');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');
  const hoverBgColor = useColorModeValue('white', 'gray.700');
  const isVertical = useBreakpointValue({ base: false, xs: false, sm: false, md: false });
  
  // Definisi ukuran dot untuk berbagai ukuran layar
  const dotSize = useBreakpointValue({ 
    base: '12px', 
    sm: '14px', 
    md: '16px' 
  });

  const legendItems = [
    { 
      color: 'red.500', 
      gradient: 'linear-gradient(135deg, #FF4D4D, #E53E3E)',
      label: '7.0+',
      hasPulse: true
    },
    { 
      color: 'orange.400', 
      gradient: 'linear-gradient(135deg, #F6AD55, #DD6B20)',
      label: '6.0-6.9'
    },
    { 
      color: 'yellow.400', 
      gradient: 'linear-gradient(135deg, #FFD767, #D69E2E)',
      label: '5.5-5.9'
    },
    { 
      color: 'green.500', 
      gradient: 'linear-gradient(135deg, #68D391, #38A169)',
      label: '4.5-5.4'
    },
    { 
      color: 'blue.500', 
      gradient: 'linear-gradient(135deg, #63B3ED, #3182CE)',
      label: '<4.5'
    },
  ];
  
  return (
    <MotionBox
      position="absolute"
      zIndex={1000}
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      bg={bgColor}
      p={{ base: 2, sm: 2.5, md: 3 }}
      borderRadius="xl"
      width="auto"      minWidth={{ base: 'auto', sm: '300px', md: '400px', lg: '460px' }}
      maxWidth={{ base: '95%', sm: '90%', md: '85%', lg: '550px' }}
      boxShadow={`0 4px 20px ${shadowColor}`}
      border="1px"
      borderColor={borderColor}
      backdropFilter="blur(12px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="auto"
      overflow="hidden"
      flexDirection={isVertical ? "column" : "row"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      _hover={{ boxShadow: `0 6px 28px ${shadowColor}` }}
      className="map-legend"
    >        <HStack 
        justify="space-around"
        spacing={{ base: 2, sm: 3, md: 4, lg: 4 }}
        align="center"
        py={{ base: 0.5, md: 1 }}
        width="100%"
        flexWrap="wrap"
      >
        {legendItems.map((item) => (
          <Tooltip 
            key={item.label}
            label={`Gempa Magnitudo ${item.label}`} 
            hasArrow 
            placement="top"
            borderRadius="md"
            px={2}
            py={1}
            bg={useColorModeValue('gray.700', 'gray.200')}
            color={useColorModeValue('white', 'gray.800')}
            fontSize="xs"
          >              <Flex 
              flexShrink={0}
              alignItems="center" 
              justifyContent="center"
              mx={{ base: 0.5, sm: 1, md: 1 }}
              py={{ base: 1, sm: 1, md: 1 }}
              px={{ base: 1.5, sm: 2, md: 2 }}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ 
                bg: hoverBgColor,
                transform: 'translateY(-2px)',
                boxShadow: 'md'
              }}
            >
              <Box
                bg={item.gradient}
                w={dotSize}
                h={dotSize}
                borderRadius="50%" 
                border="1.5px solid white" 
                boxShadow="0 0 4px rgba(0,0,0,0.2)"
                my="auto"
                animation={item.hasPulse ? `${pulse} 2s infinite` : 'none'}
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.15)' }}
              />              <Text 
                fontSize={{ base: 'xs', sm: 'sm', md: 'sm', lg: 'sm' }}
                ml={{ base: 1, sm: 1.5, md: 1.5 }}
                fontWeight="semibold"
                color={textColor}
                my="auto"
                noOfLines={1}
              >
                {item.label}
              </Text>
            </Flex>
          </Tooltip>
        ))}
      </HStack>
    </MotionBox>
  );
}

export default Legend;
