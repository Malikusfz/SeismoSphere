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
  AspectRatio,
  Button,
  HStack,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import preparationSteps from '../utils/steps';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaLightbulb, 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaBriefcase, 
  FaInfoCircle 
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionGrid = motion(Grid);
const MotionBadge = motion(Badge);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const ChakraMotion = chakra(motion.div);

const colorPalette = {
  background: 'linear-gradient(180deg, #F0F7FF 0%, #E6F0FF 100%)',
  darkBackground: 'linear-gradient(180deg, #1A202C 0%, #171923 100%)',
  cardBackground: '#FFFFFF',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  lightGradient: 'linear-gradient(135deg, #E6FFFA 0%, #EBF8FF 100%)',
  darkGradient: 'linear-gradient(135deg, rgba(23, 25, 35, 0.9) 0%, rgba(27, 32, 44, 0.9) 100%)',
  glassLight: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(26, 32, 44, 0.7)',
  glassBorderLight: '1px solid rgba(255, 255, 255, 0.2)',
  glassBorderDark: '1px solid rgba(255, 255, 255, 0.05)',
};

/**
 * Returns the icon component based on the step index.
 * @param {number} index - The index of the step.
 * @returns {React.ComponentType} The icon component for the step.
 */
const getStepIcon = (index) => {
  switch (index) {
    case 0:
      return FaShieldAlt;
    case 1:
      return FaBriefcase;
    case 2:
      return FaInfoCircle;
    case 3:
      return FaExclamationTriangle;
    case 4:
      return FaLightbulb;
    default:
      return FaCheckCircle;
  }
};

/**
 * Returns the Chakra UI color scheme for a given step index.
 * @param {number} index - The index of the step.
 * @returns {string} The color scheme name.
 */
const getStepColor = (index) => {
  switch (index) {
    case 0: return "green";
    case 1: return "purple";
    case 2: return "yellow";
    case 3: return "red";
    case 4: return "blue";
    default: return "teal";
  }
};

/**
 * EarthquakeSigns component displays earthquake preparedness steps with animations and visuals.
 *
 * @component
 * @returns {JSX.Element} The rendered EarthquakeSigns section.
 */
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
  const mainBg = useColorModeValue(colorPalette.background, colorPalette.darkBackground);
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const cardShadow = useColorModeValue('xl', 'dark-lg');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const secondaryColor = useColorModeValue('blue.50', 'blue.900');
  const glassBg = useColorModeValue(colorPalette.glassLight, colorPalette.glassDark);
  const glassBorder = useColorModeValue(colorPalette.glassBorderLight, colorPalette.glassBorderDark);
  
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
      scale: 1.05,
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
      py={{ base: 16, md: 24, lg: 28 }}
      px={{ base: 4, md: 8 }}
      bgGradient={mainBg}
      color={colorPalette.accent}
      overflow="hidden"
      position="relative"
    >
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="500px"
        height="500px"
        borderRadius="full"
        bgGradient={useColorModeValue(
          "linear(to-br, blue.100, blue.50)",
          "linear(to-br, blue.900, blue.800)"
        )}
        opacity={useColorModeValue("0.3", "0.05")}
        filter="blur(80px)"
        zIndex="0"
      />
      
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bgGradient={useColorModeValue(
          "linear(to-tr, purple.100, blue.100)",
          "linear(to-tr, purple.900, blue.800)"
        )}
        opacity={useColorModeValue("0.2", "0.05")}
        filter="blur(100px)"
        zIndex="0"
      />
      
      <Container maxW="1400px" position="relative" zIndex="1">
        <VStack spacing={{ base: 12, md: 20 }}>
          <MotionFlex
            direction="column"
            align="center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            width="full"
            textAlign="center"
          >
            <MotionBadge 
              colorScheme="blue" 
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 4, md: 6 }} 
              py={{ base: 1.5, md: 2 }} 
              borderRadius="full"
              mb={{ base: 5, md: 6 }}
              boxShadow="0px 4px 15px rgba(0, 119, 192, 0.25)"
              textTransform="uppercase"
              letterSpacing="wider"
              fontWeight="bold"
              whileHover={{ y: -2, boxShadow: "0px 6px 20px rgba(0, 119, 192, 0.35)" }}
            >
              Kesiapsiagaan
            </MotionBadge>
            
            <MotionHeading 
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold" 
              color={headingColor}
              letterSpacing="tight"
              lineHeight={{ base: "1.2", md: "1.1" }}
              maxW={{ base: "100%", md: "80%", lg: "70%" }}
              mx="auto"
              mb={{ base: 5, md: 6 }}
              textShadow="0 1px 2px rgba(0,0,0,0.1)"
              bgGradient="linear(to-r, blue.400, blue.600, purple.500)"
              bgClip="text"
            >
              Cara Mempersiapkan Diri Dari Gempa Bumi
            </MotionHeading>
            
            <Divider width={{ base: "60px", md: "100px" }} borderColor={accentColor} mx="auto" my={{ base: 4, md: 6 }} borderWidth="2px" opacity="0.8" />
            
            <MotionText 
              fontSize={{ base: "md", md: "lg", lg: "xl" }} 
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW={{ base: "100%", md: "90%", lg: "800px" }}
              mx="auto"
              lineHeight={{ base: "1.7", md: "1.8" }}
              fontWeight="normal"
            >
              Pengetahuan dan persiapan yang tepat dapat mengurangi risiko saat terjadi gempa bumi
            </MotionText>
          </MotionFlex>
          
          <MotionGrid
            ref={ref}
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={{ base: 8, md: 10 }}
            w="100%"
            animate={controls}
            initial="hidden"
            variants={containerVariants}
          >
            {preparationSteps.map((step, index) => (
              <GridItem 
                key={step.id} 
                colSpan={index === 4 ? {base: 1, md: 2, lg: 1} : 1}
              >
                <MotionBox
                  bg={bgColor}
                  boxShadow={cardShadow}
                  borderRadius="2xl"
                  height="100%"
                  overflow="hidden"
                  variants={cardVariants}
                  whileHover="hover"
                  position="relative"
                  role="group"
                  transition="all 0.3s"
                >
                  {/* Top image with overlay */}
                  <Box position="relative" overflow="hidden">
                    <motion.div variants={imageVariants} whileHover="hover">
                      <AspectRatio ratio={16/9}>
                        <Image
                          src={step.image}
                          alt={step.alt}
                          objectFit="cover"
                          transition="all 0.5s"
                          filter="auto"
                          brightness="95%"
                          _groupHover={{
                            brightness: "105%"
                          }}
                        />
                      </AspectRatio>
                    </motion.div>
                    
                    {/* Glass overlay with step number */}
                    <Flex
                      position="absolute"
                      top={4}
                      left={4}
                      w={10}
                      h={10}
                      bg={glassBg}
                      backdropFilter="blur(8px)"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      border={glassBorder}
                      fontWeight="bold"
                      fontSize="lg"
                      boxShadow="lg"
                      color={`${getStepColor(index)}.500`}
                    >
                      {index + 1}
                    </Flex>
                    
                    {/* Icon badge */}
                    <Flex
                      position="absolute"
                      top={4}
                      right={4}
                      w={12}
                      h={12}
                      bg={`${getStepColor(index)}.500`}
                      color="white"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      boxShadow="md"
                      transition="all 0.3s ease"
                      _groupHover={{ 
                        transform: "scale(1.1) rotate(5deg)",
                        boxShadow: "lg"
                      }}
                    >
                      <Icon as={getStepIcon(index)} boxSize={5} />
                    </Flex>
                  </Box>
                  
                  {/* Content */}  
                  <VStack 
                    spacing={4} 
                    align="flex-start" 
                    p={6} 
                    bg={useColorModeValue("white", "gray.800")}
                    position="relative"
                    zIndex="1"
                  >
                    <Flex 
                      justify="space-between" 
                      align="center" 
                      width="100%"
                      mb={1}
                    >
                      <motion.div variants={badgeVariants} whileHover="hover">
                        <Badge 
                          colorScheme={getStepColor(index)} 
                          px={3}
                          py={1.5}
                          borderRadius="full"
                          fontSize="sm"
                          textTransform="uppercase"
                          fontWeight="600"
                          letterSpacing="wide"
                          boxShadow="sm"
                        >
                          Langkah {index + 1}
                        </Badge>
                      </motion.div>
                      <motion.div whileHover={{ x: 3, transition: { duration: 0.2 } }}>
                        <Icon 
                          as={FaArrowRight} 
                          color={`${getStepColor(index)}.500`} 
                          boxSize={4} 
                          opacity="0.7"
                          _groupHover={{ opacity: 1 }}
                        />
                      </motion.div>
                    </Flex>
                    
                    <Heading 
                      as="h3" 
                      size="md" 
                      mb={2}
                      color={useColorModeValue('gray.800', 'white')}
                      fontWeight="bold"
                      lineHeight="1.4"
                      transition="color 0.3s"
                      _groupHover={{ color: `${getStepColor(index)}.500` }}
                    >
                      {step.title}
                    </Heading>
                    
                    <Divider borderColor={`${getStepColor(index)}.100`} my={2} />
                    
                    <Text 
                      color={useColorModeValue('gray.600', 'gray.300')}
                      fontSize="sm"
                      lineHeight="1.8"
                    >
                      {step.description}
                    </Text>
                  </VStack>
                </MotionBox>
              </GridItem>
            ))}
          </MotionGrid>
          
          {/* Call to action button */}
          <MotionButton
            size="lg"
            bgGradient="linear(to-r, blue.400, blue.600)"
            color="white"
            fontWeight="bold"
            borderRadius="xl"
            px={10}
            py={7}
            mt={6}
            boxShadow="0px 10px 25px -5px rgba(66, 153, 225, 0.4)"
            _hover={{
              bgGradient: "linear(to-r, blue.500, blue.700)",
              transform: "translateY(-2px)",
              boxShadow: "0px 20px 25px -5px rgba(66, 153, 225, 0.5)",
            }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            rightIcon={<FaArrowRight />}
          >
            Pelajari Lebih Lanjut
          </MotionButton>
        </VStack>
      </Container>
    </Box>
  );
}

export default EarthquakeSigns;
