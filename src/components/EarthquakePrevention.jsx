import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  SimpleGrid,
  Fade,
  Card,
  CardBody,
  useColorModeValue,
  Badge,
  Flex,
  VStack,
  Container,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaShieldAlt, FaHandPaper } from 'react-icons/fa';
import DropImg from '../../Public/images/Drop.png';
import CoverImg from '../../Public/images/Cover.png';
import HoldOnImg from '../../Public/images/HoldOn.png';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradient: 'linear-gradient(to right, #4299E1, #0077C0)',
};

const getActionImage = (action) => {
  switch (action) {
    case 'Drop':
      return DropImg;
    case 'Cover':
      return CoverImg;
    case 'Hold On':
      return HoldOnImg;
    default:
      return '';
  }
};

const getActionIcon = (action) => {
  switch (action) {
    case 'Drop':
      return FaArrowDown;
    case 'Cover':
      return FaShieldAlt;
    case 'Hold On':
      return FaHandPaper;
    default:
      return FaArrowDown;
  }
};

const getActionSubtitle = (action) => {
  switch (action) {
    case 'Drop':
      return 'Segera jatuhkan diri Anda ke lantai atau tanah';
    case 'Cover':
      return 'Berlindung di bawah furnitur yang kokoh melindungi Anda';
    case 'Hold On':
      return 'Pegang kuat pada furnitur yang Anda gunakan sebagai perlindungan';
    default:
      return '';
  }
};

const getActionColor = (action) => {
  switch (action) {
    case 'Drop':
      return 'red';
    case 'Cover':
      return 'blue';
    case 'Hold On':
      return 'green';
    default:
      return 'blue';
  }
};

function EarthquakePrevention() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <Fade in>
      <Box py={14} bg={useColorModeValue(colorPalette.background, 'gray.900')}>
        <Container maxW="1200px">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Badge 
                colorScheme="blue" 
                fontSize="md" 
                px={4} 
                py={2} 
                borderRadius="full"
                mb={3}
              >
                Protokol Keselamatan
              </Badge>
              <Heading
                as="h2"
                size="xl"
                fontWeight="bold"
                color={headingColor}
                letterSpacing="tight"
                mb={4}
              >
                Penanggulangan Gempa
              </Heading>
              <Text 
                fontSize="lg" 
                maxW="700px" 
                mx="auto" 
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Tiga langkah penting yang harus Anda lakukan ketika terjadi gempa bumi
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {['Drop', 'Cover', 'Hold On'].map((action, i) => (
                <MotionCard
                  key={action}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  bg={bgColor}
                  boxShadow="lg"
                  borderRadius="xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  h="100%"
                >
                  <Box position="relative">
                    <Image 
                      src={getActionImage(action)} 
                      alt={action} 
                      w="full"
                      h={{ base: "200px", md: "220px" }}
                      objectFit="cover"
                      transition="transform 0.3s ease"
                      _groupHover={{ transform: 'scale(1.05)' }}
                    />
                    <Flex
                      position="absolute"
                      top={4}
                      right={4}
                      bgColor={`${getActionColor(action)}.500`}
                      color="white"
                      borderRadius="full"
                      w={12}
                      h={12}
                      justifyContent="center"
                      alignItems="center"
                      boxShadow="md"
                    >
                      <Icon as={getActionIcon(action)} boxSize={5} />
                    </Flex>
                  </Box>
                  <CardBody p={6}>
                    <VStack align="start" spacing={3}>
                      <Badge colorScheme={getActionColor(action)} fontSize="sm" px={2} py={1}>
                        Langkah {i + 1}
                      </Badge>
                      <Heading 
                        as="h3" 
                        size="md" 
                        color={useColorModeValue('gray.800', 'white')}
                      >
                        {action}
                      </Heading>
                      <Text 
                        fontSize="md" 
                        color={useColorModeValue('gray.600', 'gray.300')}
                        lineHeight="tall"
                      >
                        {getActionSubtitle(action)}
                      </Text>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Fade>
  );
}

export default EarthquakePrevention;
