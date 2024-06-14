import React from 'react';
import {
  Box, Flex, Heading, Text, Link, Image, HStack, Divider,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

const teamMembers = [
  {
    name: 'Rina Parlina',
    job: 'Front End',
    photo: 'src/images/Profile/Rina.jpg',
    linkedin: 'https://www.linkedin.com/in/rina-parlina-86a8b130a',
    github: 'https://github.com/rinaparl',
  },
  {
    name: 'Malikus Syafaadi Nurfaza',
    job: 'Project Manager / Front End',
    photo: 'src/images/Profile/Malikus.jpeg',
    linkedin: 'https://www.linkedin.com/in/malikussyafaadinurfaza/',
    github: 'https://github.com/Malikusfz/',
  },
  {
    name: 'Bagus Viki Amalindo',
    job: 'FrontEnd',
    photo: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/bagus-viki-amalindo-903966268/',
    github: 'https://github.com/amalindouser ',
  },
];

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
  return (
    <Box p={6} bg={colorPalette.background} minH="100vh">
      <Flex justifyContent="center" alignItems="center" width="100%">
        <Heading as="h1" size="2xl" textAlign="center" mb={12} color={colorPalette.highlight}>
          Meet Our Team
        </Heading>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" minH="60vh" width="100%">
        <Flex wrap="wrap" justify="center" gap={8} maxW="1200px" width="100%">
          {teamMembers.map((member) => (
            <Box
              key={member.name}
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              p={6}
              maxW="md"
              textAlign="center"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
              m={4}
            >
              <Image
                borderRadius="full"
                boxSize="160px"
                src={member.photo}
                alt={member.name}
                mb={4}
                mx="auto"
              />
              <Heading as="h3" size="lg" mb={2} color={colorPalette.accent}>
                {formatName(member.name)}
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={4}>
                {member.job}
              </Text>
              <Divider my={4} />
              <HStack justify="center" spacing={4}>
                <Link href={member.linkedin} isExternal>
                  <FaLinkedin size="24" color={colorPalette.highlight} />
                </Link>
                <Link href={member.github} isExternal>
                  <FaGithub size="24" color={colorPalette.accent} />
                </Link>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default AboutUsPage;
