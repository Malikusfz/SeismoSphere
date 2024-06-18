// eslint-disable-next-line spellcheck/spell-checker
/* eslint-disable linebreak-style */
/* eslint-disable spellcheck/spell-checker */
// eslint-disable-next-line linebreak-style
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable linebreak-style */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Grid,
  Image,
  VStack,
} from '@chakra-ui/react';
import EarthquakeContext from '../state/EarthquakeContext';
import { actions } from '../state/earthquake';
import GempaImg from '../images/Gempa.png';
import TektonikImg from '../images/GempaTektonik.png';
import VulkanikImg from '../images/GempaVulkanik.png';
import ReruntuhanImg from '../images/GempaReruntuhan.png';
import preparationSteps from '../utils/steps';

const CircleIcon = (props) => (
  <svg viewBox="0 0 200 200" {...props}>
    <circle cx="100" cy="100" r="75" fill="currentColor" />
  </svg>
);

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
    <Box bg="#FAFAFA" color="#1D242B" minH="100vh">
      <Box textAlign="center" py={20}>
        <Heading as="h1" size="xl">
          SeismoSphere
        </Heading>
        <Text>Lacak Gempa Secara Real-Time dan Selalu Siaga!</Text>
      </Box>
      <Box px={10}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          <Box>
            <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={6}>
              <Heading as="h5" size="md" textAlign="center" mb={4}>
                Gempa
              </Heading>
              <Image src={GempaImg} alt="Gempa" mx="auto" mb={4} />
              <Text textAlign="justify">
                Gempa bumi adalah fenomena alam yang terjadi ketika terjadi pelepasan energi secara tiba-tiba di dalam bumi, menyebabkan getaran atau goncangan di permukaan. Penyebabnya dapat beragam, termasuk pergerakan lempeng tektonik, aktivitas vulkanik, atau proses geologi lainnya. Getaran yang dihasilkan dapat berpotensi menyebabkan kerusakan pada struktur bangunan dan infrastruktur, serta berbagai dampak lain seperti tsunami atau tanah longsor tergantung pada lokasi dan karakteristik gempa tersebut.
              </Text>
            </Box>
          </Box>
          <Box>
            <Box bg="white" boxShadow="md" p={4} borderRadius="md" mb={6}>
              <CircleIcon style={{ marginLeft: '5px', width: '20px', height: '20px' }} color="red" />
              <Heading as="h5" size="md" textAlign="center" mb={4}>
                Gempa Bumi Terkini
                {' '}
              </Heading>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                latestEarthquake && (
                  <Box>
                    <Text onClick={() => handleRowClick(latestEarthquake)} cursor="pointer">
                      <strong>Tanggal:</strong>
                      {' '}
                      {latestEarthquake.Tanggal}
                    </Text>
                    <Text>
                      <strong>Waktu:</strong>
                      {' '}
                      {latestEarthquake.Jam}
                    </Text>
                    <Text>
                      <strong>Magnitude:</strong>
                      {' '}
                      {latestEarthquake.Magnitude}
                    </Text>
                    <Text>
                      <strong>Kedalaman:</strong>
                      {' '}
                      {latestEarthquake.Kedalaman}
                    </Text>
                    <Text>
                      <strong>Wilayah:</strong>
                      {' '}
                      {latestEarthquake.Wilayah}
                    </Text>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Grid>

        <Box bg="gray.800" color="white" p={6} borderRadius="md" mt={6}>
          <Heading as="h5" size="md" textAlign="center" mb={4}>
            Jenis Jenis Gempa
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <Box>
              <Image src={TektonikImg} alt="Gempa Tektonik" mx="auto" mb={4} />
              <Heading as="h5" size="md" textAlign="center" mb={2}>
                Gempa Tektonik
              </Heading>
              <Text textAlign="center">
                Gempa ini disebabkan oleh pergerakan lempeng tektonik di kerak bumi. Ini adalah jenis gempa yang paling umum dan sering kali paling merusak.
              </Text>
            </Box>
            <Box>
              <Image src={VulkanikImg} alt="Gempa Vulkanik" mx="auto" mb={4} />
              <Heading as="h5" size="md" textAlign="center" mb={2}>
                Gempa Vulkanik
              </Heading>
              <Text textAlign="center">
                Gempa ini terjadi akibat aktivitas vulkanik, seperti letusan gunung berapi atau pergerakan magma di dalam bumi.
              </Text>
            </Box>
            <Box>
              <Image src={ReruntuhanImg} alt="Gempa Reruntuhan" mx="auto" mb={4} />
              <Heading as="h5" size="md" textAlign="center" mb={2}>
                Gempa Reruntuhan
              </Heading>
              <Text textAlign="center">
                Gempa ini disebabkan oleh runtuhan tanah atau batuan di daerah karst atau tambang. Mereka biasanya lebih kecil dan lokal.
              </Text>
            </Box>
          </Grid>
        </Box>

        <Box bg="gray.800" color="white" p={6} borderRadius="md" mt={6}>
          <Heading as="h5" size="md" textAlign="center" mb={4}>
            Cara Mempersiapkan Diri Dari Gempa Bumi
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {preparationSteps.map((step) => (
              <Box key={step.id} bg="gray.800" boxShadow="md" p={4} borderRadius="md" textAlign="center">
                <VStack spacing={4}>
                  <Image src={step.image} alt={step.alt} boxSize="200px" objectFit="cover" borderRadius="20px" />
                  <Text fontWeight="bold" textAlign="justify">{step.title}</Text>
                  <Text textAlign="justify">{step.description}</Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
