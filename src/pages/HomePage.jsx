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
import Seismosphere from '../images/Seismosphere.png';
import VulkanikImg from '../images/GempaVulkanik.png';
import TektonikImg from '../images/GempaTektonik.png';
import ReruntuhanImg from '../images/GempaReruntuhan.png';
import GempaImg from '../images/Gempa.png';
import EarthquakeInfo from '../components/EarthquakeInfo';

function HomePage() {
  const [isLargeThan62] = useMediaQuery('(min-width: 62em)');
  const EarthquakeInfoRef = useRef(null);

  const handleScroll = () => {
    EarthquakeInfoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Flex
        bg="white"
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
          >
            {' '}
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

      <Box bg="#FAFAFA" color="#1D242B" mt="10px" ref={EarthquakeInfoRef}>
        <Box as="main" py="20px">
          <SimpleGrid columns={[1, null, 2]} spacing="10px">
            <Card>
              <CardBody>
                <Image src={GempaImg} alt="Gempa" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Gempa</Heading>
                  <Text>
                    Gempa adalah getaran permukaan bumi akibat pelepasan energi
                    dari dalam bumi secara tiba-tiba.
                  </Text>
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <EarthquakeInfo />
            </Card>
          </SimpleGrid>

          <Box py="20px" color="#1D242B">
            <Card>
              <CardBody>
                <Heading size="md" textAlign="center">
                  Jenis Jenis Gempa
                </Heading>
                <SimpleGrid columns={[1, null, 3]} spacing="20px" mt="4">
                  <Card>
                    <Image alt="Gempa Tektonik" src={TektonikImg} />
                    <CardBody>
                      <Heading size="sm">Gempa Tektonik</Heading>
                      <Text>
                        Gempa ini disebabkan oleh pergerakan lempeng tektonik di
                        kerak bumi. Ini adalah jenis gempa yang paling umum dan
                        sering kali paling merusak.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <Image alt="Gempa Vulkanik" src={VulkanikImg} />
                    <CardBody>
                      <Heading size="sm">Gempa Vulkanik</Heading>
                      <Text>
                        Gempa ini terjadi akibat aktivitas vulkanik, seperti
                        letusan gunung berapi atau pergerakan magma di dalam
                        bumi.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <Image alt="Gempa Reruntuhan" src={ReruntuhanImg} />
                    <CardBody>
                      <Heading size="sm">Gempa Reruntuhan</Heading>
                      <Text>
                        Gempa ini disebabkan oleh runtuhan tanah atau batuan di
                        daerah karst atau tambang. Mereka biasanya lebih kecil
                        dan lokal.
                      </Text>
                    </CardBody>
                  </Card>
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
