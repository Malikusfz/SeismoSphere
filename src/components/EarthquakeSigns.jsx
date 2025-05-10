import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
  Container,
  Badge,
  Flex,
  Icon,
  Divider,
  useBreakpointValue,
  chakra,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import preparationSteps from '../utils/steps';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const ChakraMotion = chakra(motion.div);

const colorPalette = {
  background: '#F7FAFC',
  cardBackground: '#FFFFFF',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  lightGradient: 'linear-gradient(135deg, #E6FFFA 0%, #EBF8FF 100%)',
  darkGradient: 'linear-gradient(135deg, rgba(23, 25, 35, 0.9) 0%, rgba(27, 32, 44, 0.9) 100%)',
};

function EarthquakeSigns() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const bgColor = useColorModeValue(colorPalette.cardBackground, 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const cardShadow = useColorModeValue('lg', 'dark-lg');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const secondaryColor = useColorModeValue('blue.50', 'blue.900');
  const backgroundImage = useColorModeValue(
    'url("/images/Content/bg-pattern-light.png")',
    'url("/images/Content/bg-pattern-dark.png")'
  );
  
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });
  const titleSize = useBreakpointValue({ base: "md", md: "lg" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
      }
    },
    hover: {
      y: -15,
      boxShadow: "0 35px 60px -20px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.4,
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      filter: "brightness(1.1)",
      transition: { duration: 0.5 }
    }
  };

  const badgeVariants = {
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <Box
      py={{ base: 12, md: 20, lg: 28 }}
      px={{ base: 4, md: 8 }}
      bg={useColorModeValue(colorPalette.background, 'gray.900')}
      color={colorPalette.accent}
      overflow="hidden"
      position="relative"
      backgroundImage={backgroundImage}
      backgroundRepeat="repeat"
      backgroundSize="300px"
      backgroundBlendMode="overlay"
      backgroundOpacity={0.5}
    >
      {/* Decorative Element */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="400px"
        height="400px"
        borderRadius="full"
        background={useColorModeValue(
          "linear-gradient(135deg, rgba(191, 219, 254, 0.4) 0%, rgba(199, 238, 255, 0.2) 100%)",
          "linear-gradient(135deg, rgba(49, 130, 206, 0.2) 0%, rgba(44, 82, 130, 0.1) 100%)"
        )}
        filter="blur(60px)"
        zIndex="0"
      />
      
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        width="500px"
        height="500px"
        borderRadius="full"
        background={useColorModeValue(
          "linear-gradient(135deg, rgba(186, 230, 253, 0.4) 0%, rgba(125, 211, 252, 0.1) 100%)",
          "linear-gradient(135deg, rgba(36, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)"
        )}
        filter="blur(80px)"
        zIndex="0"
      />
      
      <Container maxW="1400px" position="relative" zIndex="1">
        <VStack spacing={{ base: 12, md: 16, lg: 20 }}>
          <ChakraMotion
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            textAlign="center"
            mb={{ base: 2, md: 4 }}
            width="full"
          >
            <Badge 
              colorScheme="blue" 
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 4, md: 6 }} 
              py={{ base: 1.5, md: 2 }} 
              borderRadius="full"
              mb={{ base: 3, md: 5 }}
              boxShadow="0 4px 15px rgba(0, 119, 192, 0.25)"
              textTransform="uppercase"
              letterSpacing="wider"
              transform="translateY(0)"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 119, 192, 0.35)"
              }}
            >
              Kesiapsiagaan
            </Badge>
            <Heading 
              as="h1"
              size={headingSize}
              fontWeight="extrabold" 
              color={headingColor}
              letterSpacing="tight"
              lineHeight={{ base: "1.2", md: "1.1" }}
              maxW={{ base: "100%", md: "80%", lg: "70%" }}
              mx="auto"
              mb={{ base: 4, md: 6 }}
              textShadow="0 1px 2px rgba(0,0,0,0.1)"
            >
              Cara Mempersiapkan Diri Dari Gempa Bumi
            </Heading>
            <Divider width={{ base: "60px", md: "100px" }} borderColor={accentColor} mx="auto" my={{ base: 4, md: 6 }} borderWidth="2px" opacity="0.8" />
            <Text 
              fontSize={{ base: "md", md: "lg", lg: "xl" }} 
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW={{ base: "100%", md: "90%", lg: "800px" }}
              mx="auto"
              lineHeight={{ base: "1.7", md: "1.8" }}
              fontWeight="normal"
            >
              Pengetahuan dan persiapan yang tepat dapat mengurangi risiko saat terjadi gempa bumi
            </Text>
          </ChakraMotion>
          
          <MotionFlex
            ref={ref}
            as={Grid}
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={{ base: 8, md: 8, lg: 10 }}
            w="100%"
            animate={controls}
            initial="hidden"
            variants={containerVariants}
          >
            {preparationSteps.map((step, index) => (
              <GridItem 
                key={step.id} 
                colSpan={index === 4 ? {base: 1, md: 2, lg: 3} : 1}
              >
                <MotionBox
                  bg={bgColor}
                  boxShadow={cardShadow}
                  p={0}
                  borderRadius={{ base: "xl", md: "2xl" }}
                  border="1px"
                  borderColor={borderColor}
                  height="100%"
                  overflow="hidden"
                  variants={cardVariants}
                  whileHover="hover"
                  position="relative"
                  role="group"
                  transition={{ duration: 0.3 }}
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 0,
                    borderRadius: { base: "xl", md: "2xl" },
                    background: useColorModeValue(
                      "linear-gradient(to top, rgba(226, 232, 240, 0) 0%, rgba(191, 219, 254, 0.1) 100%)",
                      "linear-gradient(to top, rgba(26, 32, 44, 0) 0%, rgba(49, 130, 206, 0.1) 100%)"
                    ),
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  _hover={{
                    _before: {
                      opacity: 1,
                    }
                  }}
                >
                  <Box 
                    position="absolute" 
                    top="10px" 
                    left="10px" 
                    zIndex="10"
                    bg={useColorModeValue("whiteAlpha.800", "blackAlpha.700")}
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    <Flex align="center">
                      <Icon 
                        as={FaCheckCircle} 
                        color={
                          index === 0 ? "green.500" : 
                          index === 1 ? "purple.500" : 
                          index === 2 ? "yellow.500" : 
                          index === 3 ? "red.500" : "blue.500"
                        }
                        mr={1}
                      />
                      <Text 
                        fontWeight="bold" 
                        fontSize="sm"
                        color={useColorModeValue("gray.700", "gray.200")}
                      >
                        Langkah {index + 1}
                      </Text>
                    </Flex>
                  </Box>
                  
                  <Box overflow="hidden" borderTopRadius={{ base: "xl", md: "2xl" }}>
                    <motion.div variants={imageVariants} whileHover="hover">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        w="100%"
                        h={{ base: "180px", sm: "200px", md: "220px", lg: "240px" }}
                        objectFit="cover"
                        transition="all 0.5s"
                        filter="auto"
                        brightness="95%"
                        _groupHover={{
                          brightness: "105%"
                        }}
                      />
                    </motion.div>
                  </Box>
                  
                  <VStack 
                    spacing={{ base: 4, md: 5 }} 
                    align="flex-start" 
                    p={{ base: 5, md: 6 }} 
                    pt={{ base: 4, md: 5 }}
                    bg={useColorModeValue("white", "gray.800")}
                    position="relative"
                    zIndex="1"
                  >
                    <Flex 
                      justify="space-between" 
                      align="center" 
                      width="100%"
                      mb={{ base: 0, md: 1 }}
                    >
                      <motion.div variants={badgeVariants} whileHover="hover">
                        <Badge 
                          colorScheme={
                            index === 0 ? "green" : 
                            index === 1 ? "purple" : 
                            index === 2 ? "yellow" : 
                            index === 3 ? "red" : "blue"
                          } 
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize={{ base: "xs", md: "sm" }}
                          textTransform="uppercase"
                          fontWeight="600"
                          bg={
                            index === 0 ? "green.50" : 
                            index === 1 ? "purple.50" : 
                            index === 2 ? "yellow.50" : 
                            index === 3 ? "red.50" : "blue.50"
                          }
                          color={
                            index === 0 ? "green.600" : 
                            index === 1 ? "purple.600" : 
                            index === 2 ? "yellow.600" : 
                            index === 3 ? "red.600" : "blue.600"
                          }
                          _dark={{
                            bg: index === 0 ? "green.900" : 
                            index === 1 ? "purple.900" : 
                            index === 2 ? "yellow.900" : 
                            index === 3 ? "red.900" : "blue.900",
                            color: index === 0 ? "green.200" : 
                            index === 1 ? "purple.200" : 
                            index === 2 ? "yellow.200" : 
                            index === 3 ? "red.200" : "blue.200"
                          }}
                        >
                          Langkah {index + 1}
                        </Badge>
                      </motion.div>
                      <motion.div whileHover={{ x: 3, transition: { duration: 0.2 } }}>
                        <Icon 
                          as={FaArrowRight} 
                          color={accentColor} 
                          boxSize={{ base: 3, md: 4 }} 
                          opacity="0.7"
                          _groupHover={{ opacity: 1 }}
                        />
                      </motion.div>
                    </Flex>
                    
                    <Heading 
                      as="h3" 
                      size={titleSize} 
                      mb={{ base: 2, md: 3 }}
                      color={useColorModeValue('gray.800', 'white')}
                      fontWeight="bold"
                      lineHeight="1.4"
                      transition="color 0.3s"
                      _groupHover={{ color: accentColor }}
                    >
                      {step.title}
                    </Heading>
                    
                    <Box 
                      bg={secondaryColor}
                      h="3px" 
                      w="40px" 
                      borderRadius="full" 
                      mb={{ base: 2, md: 3 }}
                      transition="width 0.3s ease"
                      _groupHover={{ width: "60px" }}
                    />
                    
                    <Text 
                      color={useColorModeValue('gray.600', 'gray.300')}
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="1.8"
                    >
                      {step.description}
                    </Text>
                  </VStack>
                </MotionBox>
              </GridItem>
            ))}
          </MotionFlex>
        </VStack>
      </Container>
    </Box>
  );
}

export default EarthquakeSigns;
