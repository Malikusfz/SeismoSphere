import React from 'react';
import {
  Box, Flex, Heading, Text, Link, Image, HStack, Divider,
  Container, VStack, useColorModeValue, Badge, SimpleGrid, Icon,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Rina from '../../Public/images/Profile/Rina.jpg';
import Faza from '../../Public/images/Profile/Malikus.jpeg';
import Viki from '../../Public/images/Profile/Viki.jpg';

// Improved color palette with light/dark mode support
const colorPalette = {
  background: '#F7FAFC',
  cardBg: '#FFFFFF',
  primary: '#2B6CB0',
  secondary: '#C7EEFF',
  highlight: '#3182CE',
  accent: '#1A365D',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
};

// Enhanced team member data with descriptions
const teamMembers = [
  {
    name: 'Rina Parlina',
    job: 'Front End Developer',
    description: 'Mengkhususkan diri dalam pengembangan antarmuka yang responsif dan intuitif dengan fokus pada pengalaman pengguna.',
    photo: Rina,
    linkedin: 'https://www.linkedin.com/in/rina-parlina-86a8b130a',
    github: 'https://github.com/rinaparl',
  },
  {
    name: 'Malikus Syafaadi Nurfaza',
    job: 'Project Manager / Front End',
    description: 'Mengelola alur kerja proyek dan berkontribusi pada pengembangan front-end dengan pengalaman dalam manajemen tim teknologi.',
    photo: Faza,
    linkedin: 'https://www.linkedin.com/in/malikussyafaadinurfaza/',
    github: 'https://github.com/Malikusfz/',
  },
  {
    name: 'Bagus Viki Amalindo',
    job: 'Front End Developer',
    description: 'Berfokus pada implementasi komponen UI yang interaktif dan memastikan kompatibilitas lintas browser.',
    photo: Viki,
    linkedin: 'https://www.linkedin.com/in/bagus-viki-amalindo-903966268/',
    github: 'https://github.com/amalindouser',
  },
];

// Motion components for smooth animations
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

// Format long names to display properly
function formatName(name) {
  const nameParts = name.split(' ');
  if (nameParts.length > 2) {
    return (
      <>
        {nameParts.slice(0, 2).join(' ')}
        <br />
        {nameParts.slice(2).join(' ')}
      </>
    );
  }
  return name;
}

function AboutUsPage() {
  // Use Chakra's color mode values for light/dark theme support
  const bgColor = useColorModeValue(colorPalette.background, 'gray.800');
  const cardBgColor = useColorModeValue(colorPalette.cardBg, 'gray.700');
  const textColor = useColorModeValue(colorPalette.textPrimary, 'gray.100');
  const secondaryTextColor = useColorModeValue(colorPalette.textSecondary, 'gray.300');
  const accentColor = useColorModeValue(colorPalette.highlight, 'blue.300');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box py={12} px={4} bg={bgColor} minH="100vh">
      <Container maxW="container.xl">
        {/* Hero Section */}
        <MotionFlex
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          direction="column"
          align="center"
          textAlign="center"
          mb={16}
        >
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            color={accentColor}
            bgGradient={`linear(to-r, ${colorPalette.highlight}, ${colorPalette.primary})`}
            bgClip="text"
          >
            Tim SeismoSphere
          </Heading>
          <Text fontSize="xl" maxW="800px" color={secondaryTextColor} mb={8}>
            Kami adalah sekelompok pengembang yang berdedikasi untuk membangun solusi teknologi
            terkait informasi dan edukasi gempa bumi. Bersama-sama, kami berusaha menciptakan
            platform yang dapat membantu masyarakat memahami dan siap menghadapi bencana alam.
          </Text>

          <Box position="relative" mb={8} mt={4}>
            <Icon
              as={FaQuoteLeft}
              w={8}
              h={8}
              color={accentColor}
              opacity={0.4}
              position="absolute"
              top="-15px"
              left="-15px"
            />
            <Text
              fontSize="lg"
              fontStyle="italic"
              maxW="600px"
              color={textColor}
            >
              "Memahami dan berbagi pengetahuan tentang gempa bumi adalah langkah pertama untuk
              meningkatkan kesiapsiagaan dan mengurangi dampak bencana."
            </Text>
          </Box>
        </MotionFlex>

        {/* Team Section */}
        <Heading as="h2" size="xl" textAlign="center" mb={12} color={textColor}>
          Kenali Tim Kami
        </Heading>

        <MotionFlex
          as={SimpleGrid}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          justifyContent="center"
          alignItems="stretch"
        >
          {teamMembers.map((member) => (
            <MotionBox
              key={member.name}
              variants={itemVariants}
              bg={cardBgColor}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              height="100%"
              transition="all 0.3s ease"
              _hover={{
                transform: 'translateY(-8px)',
                boxShadow: '2xl',
              }}
            >
              <Box position="relative" overflow="hidden" height="260px">
                <MotionImage
                  src={member.photo}
                  alt={member.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg="rgba(0,0,0,0.6)"
                  px={4}
                  py={2}
                >
                  <Badge colorScheme="blue" fontSize="0.8em">
                    {member.job}
                  </Badge>
                </Box>
              </Box>

              <VStack spacing={4} p={6} align="start" height="calc(100% - 260px)">
                <Heading as="h3" size="md" color={textColor}>
                  {formatName(member.name)}
                </Heading>

                <Text fontSize="md" color={secondaryTextColor} flexGrow={1}>
                  {member.description}
                </Text>

                <Divider />

                <HStack spacing={4} width="100%" justify="center">
                  <Link
                    href={member.linkedin}
                    isExternal
                    _hover={{ color: accentColor }}
                  >
                    <MotionBox whileHover={{ y: -3 }}>
                      <FaLinkedin size="24" />
                    </MotionBox>
                  </Link>
                  <Link
                    href={member.github}
                    isExternal
                    _hover={{ color: accentColor }}
                  >
                    <MotionBox whileHover={{ y: -3 }}>
                      <FaGithub size="24" />
                    </MotionBox>
                  </Link>
                </HStack>
              </VStack>
            </MotionBox>
          ))}
        </MotionFlex>

        {/* Mission Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          mt={20}
          p={8}
          borderRadius="xl"
          bg={useColorModeValue('blue.50', 'gray.700')}
          boxShadow="md"
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center" color={accentColor}>
            Misi Kami
          </Heading>
          <Text fontSize="lg" textAlign="center" color={textColor}>
            Membangun platform terpercaya untuk pendidikan dan informasi tentang gempa bumi,
            yang dapat diakses oleh semua orang untuk meningkatkan kesiapsiagaan dan
            keselamatan masyarakat dalam menghadapi bencana alam.
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default AboutUsPage;
