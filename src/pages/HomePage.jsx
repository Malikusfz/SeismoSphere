import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Image,
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import EarthquakeContext from '../state/EarthquakeContext';
import { actions } from '../state/earthquake';
import Seismosphere from '../images/Seismosphere.png';
import VulkanikImg from '../images/GempaVulkanik.png';
import TektonikImg from '../images/GempaTektonik.png';
import ReruntuhanImg from '../images/GempaReruntuhan.png';
import GempaImg from '../images/Gempa.png';

function HomePage() {
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(EarthquakeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          const earthquakes = JSON.parse(cachedData);
          setLatestEarthquake(earthquakes[0]);
          setLoading(false);
        } else {
          const response = await axios.get(
            'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json',
          );
          const earthquakes = response.data.Infogempa.gempa;
          setLatestEarthquake(earthquakes[0]);
          localStorage.setItem('earthquakes', JSON.stringify(earthquakes));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const handleRowClick = (gempa) => {
    dispatch(actions.setSelectedEarthquake(gempa));
    navigate('/map');
  };

  return (
    <>
      <Box bg="#FAFAFA" mx="6" as="section" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box
          w="100%"
          borderRadius="xl"
          overflow="hidden"
          textAlign="center"
        >
          <Flex direction={['column', 'column', 'row']} alignItems="center" justifyContent="center">
            <Box bg="white" p={['28px', '60px', '60px']} w={['100%', '100%', '50%']}>
              {/* eslint-disable-next-line */}
              <Text fontSize="xl" fontWeight="extrabold">
                Aplikasi Informasi Gempa Indonesia
              </Text>
              {/* eslint-disable-next-line */}
              <Heading as="h3" fontSize={['5xl', '5xl', '6xl']} mt="4">
                SeismoSphere
              </Heading>
              <Text color="gray.900" fontSize="lg" fontWeight="medium" mt="2">
                Jaringan Cerdas Untuk Kesiapsiagaan Gempa
              </Text>
            </Box>
            <Box w={['100%', '100%', '50%']} display="flex" alignItems="center" justifyContent="center" p="4">
              <Image src={Seismosphere} maxH="400px" maxW="100%" objectFit="contain" />
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box bg="#FAFAFA" color="#1D242B">
        <Box as="main">
          <SimpleGrid columns={[1, null, 2]} spacing="40px">
            <Box>
              <Card>
                <CardHeader>
                  <Heading size="md">Gempa</Heading>
                </CardHeader>
                <CardBody>
                  <Image
                    alt="Gempa"
                    src={GempaImg}
                    boxSize="40%"
                    mx="auto"
                  />
                  <Text mt="4">
                    Gempa adalah getaran permukaan bumi akibat pelepasan energi
                    dari dalam bumi secara tiba-tiba.
                  </Text>
                </CardBody>
              </Card>
            </Box>
            <Box>
              <Card>
                <CardHeader>
                  <Heading size="md">Gempa Bumi Terkini</Heading>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <Text>Loading...</Text>
                  ) : (
                    latestEarthquake && (
                      <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                      >
                        <Text onClick={() => handleRowClick(latestEarthquake)}>
                          <strong>Tanggal:</strong>
                          {latestEarthquake.Tanggal}
                        </Text>
                        <Text>
                          <strong>Waktu:</strong>
                          {latestEarthquake.Jam}
                        </Text>
                        <Text>
                          <strong>Magnitude:</strong>
                          {latestEarthquake.Magnitude}
                        </Text>
                        <Text>
                          <strong>Kedalaman:</strong>
                          {latestEarthquake.Kedalaman}
                        </Text>
                        <Text>
                          <strong>Wilayah:</strong>
                          {latestEarthquake.Wilayah}
                        </Text>
                      </VStack>
                    )
                  )}
                </CardBody>
              </Card>
            </Box>
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
                        letusan gunung berapi atau pergerakan magma di dalam bumi.
                      </Text>
                    </CardBody>
                  </Card>
                  <Card>
                    <Image alt="Gempa Reruntuhan" src={ReruntuhanImg} />
                    <CardBody>
                      <Heading size="sm">Gempa Reruntuhan</Heading>
                      <Text>
                        Gempa ini disebabkan oleh runtuhan tanah atau batuan di
                        daerah karst atau tambang. Mereka biasanya lebih kecil dan
                        lokal.
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
