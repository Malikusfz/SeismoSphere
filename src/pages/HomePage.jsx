import React, { useRef } from 'react';
import {
  Image,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Seismosphere from '../images/Seismosphere.png';
import VulkanikImg from '../images/GempaVulkanik.png';
import TektonikImg from '../images/GempaTektonik.png';
import ReruntuhanImg from '../images/GempaReruntuhan.png';
import GempaImg from '../images/Gempa.png';
import EarthquakeInfo from '../components/EarthquakeInfo';
import EarthquakePrevention from '../components/EarthquakePrevention';

const MotionBox = motion(Box);

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
};

function HomePage() {
  const [isLargeThan62] = useMediaQuery('(min-width: 62em)');
  const EarthquakeInfoRef = useRef(null);

  const handleScroll = () => {
    EarthquakeInfoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Flex
        bg={colorPalette.background}
        alignItems="center"
        w="full"
        px={isLargeThan62 ? '16' : '6'}
        py="16"
        minHeight="90vh" // eslint-disable-line spellcheck/spell-checker
        justifyContent="space-between"
        flexDirection={isLargeThan62 ? 'row' : 'column'}
      >
        <Flex
          mr={isLargeThan62 ? '7' : '0'}
          flexDirection="column"
          w={isLargeThan62 ? '60%' : 'full'}
        >
          <Text fontSize="xl" fontWeight="bold">
            Aplikasi Informasi Gempa Indonesia
          </Text>

          <Text
            fontSize={isLargeThan62 ? '5xl' : '4xl'} // eslint-disable-line spellcheck/spell-checker
            fontWeight="bold"
            mb="4"
            color={colorPalette.highlight}
          >
            SeismoSphere
          </Text>

          <Text mb="6" fontSize={isLargeThan62 ? 'lg' : 'base'}>
            Jaringan Cerdas Untuk Kesiapsiagaan Gempa
          </Text>

          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargeThan62 ? 'lg' : 'md'}
            mb={isLargeThan62 ? '0' : '10'}
            onClick={handleScroll}
          >
            Selanjutnya
          </Button>
        </Flex>

        <Flex
          w={isLargeThan62 ? '40%' : 'full'}
          mb={isLargeThan62 ? '0' : '6'}
          alignItems="center"
          justifyContent="center"
        >
          <Image src={Seismosphere} alt="SeismoSphere" w="full" />
        </Flex>
      </Flex>

      <Box
        bg={colorPalette.background}
        color={colorPalette.accent}
        ref={EarthquakeInfoRef}
      >
        <Box as="main" bg={colorPalette.background} p={2}>
          <SimpleGrid columns={[1, null, 2]} spacing="20px">
            <MotionBox
              as={Card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardBody bg={colorPalette.background}>
                <Image src={GempaImg} alt="Gempa" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Gempa</Heading>
                  <Text>
                    Gempa adalah getaran permukaan bumi akibat pelepasan energi
                    dari dalam bumi secara tiba-tiba.
                  </Text>
                </Stack>
              </CardBody>
            </MotionBox>

            <Flex flexDirection="column" gap="20px">
              <MotionBox
                as={Card}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EarthquakeInfo />
              </MotionBox>

              <MotionBox
                as={Card}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EarthquakePrevention />
              </MotionBox>
            </Flex>
          </SimpleGrid>

          <Box color={colorPalette.accent} my="30px">
            <Card bg={colorPalette.background}>
              <CardBody>
                <Heading
                  size="m"
                  textAlign="center"
                  color={colorPalette.highlight}
                >
                  Jenis Jenis Gempa
                </Heading>
                <SimpleGrid columns={[1, null, 3]} spacing="20px" mt="4">
                  <MotionBox
                    as={Card}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      position="relative"
                      width="80%"
                      paddingTop="45%"
                      margin="20px auto 0"
                      overflow="hidden"
                    >
                      <Image
                        alt="Gempa Tektonik"
                        src={TektonikImg}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <CardBody>
                      <Heading size="sm">Gempa Tektonik</Heading>
                      <Text>
                        Gempa ini disebabkan oleh pergerakan lempeng tektonik di
                        kerak bumi. Ini adalah jenis gempa yang paling umum dan
                        sering kali paling merusak.
                      </Text>
                    </CardBody>
                  </MotionBox>
                  <MotionBox
                    as={Card}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      position="relative"
                      width="80%"
                      paddingTop="45%"
                      margin="20px auto 0"
                      overflow="hidden"
                    >
                      <Image
                        alt="Gempa Vulkanik"
                        src={VulkanikImg}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <CardBody>
                      <Heading size="sm">Gempa Vulkanik</Heading>
                      <Text>
                        Gempa ini terjadi akibat aktivitas vulkanik, seperti
                        letusan gunung berapi atau pergerakan magma di dalam
                        bumi.
                      </Text>
                    </CardBody>
                  </MotionBox>
                  <MotionBox
                    as={Card}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      position="relative"
                      width="80%"
                      paddingTop="45%"
                      margin="20px auto 0"
                      overflow="hidden"
                    >
                      <Image
                        alt="Gempa Reruntuhan"
                        src={ReruntuhanImg}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <CardBody>
                      <Heading size="sm">Gempa Reruntuhan</Heading>
                      <Text>
                        Gempa ini disebabkan oleh runtuhan tanah atau batuan di
                        daerah karst atau tambang. Mereka biasanya lebih kecil
                        dan lokal.
                      </Text>
                    </CardBody>
                  </MotionBox>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
