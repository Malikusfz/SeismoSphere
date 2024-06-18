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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
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

function EarthquakePrevention() {
  return (
    <Fade in>
      <MotionBox
        p="4"
        bg={colorPalette.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading
          as="h5"
          size="lg"
          textAlign="center"
          mb="4"
          color={colorPalette.highlight}
        >
          Penanggulangan Gempa
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacing="4">
          {['Drop', 'Cover', 'Hold On'].map((action) => (
            <MotionCard
              key={action}
              boxShadow="md"
              borderRadius="md"
              overflow="hidden"
              color={colorPalette.accent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={getActionImage(action)} alt={action} />
              <CardBody>
                <Heading as="h6" size="md" mb="2">
                  {action}
                </Heading>
                <Text fontSize="sm" color={colorPalette.accent} mb="2">
                  {getActionSubtitle(action)}
                </Text>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
      </MotionBox>
    </Fade>
  );
}

export default EarthquakePrevention;
