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
import DropImg from '../images/Drop.png';
import CoverImg from '../images/Cover.png';
import HoldOnImg from '../images/HoldOn.png';

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

const getActionText = (action) => {
  switch (action) {
    case 'Drop':
      return 'Ini membantu Anda mengurangi risiko jatuh selama gempa, yang bisa menyebabkan cedera.';
    case 'Cover':
      return 'Berlindung di bawah meja atau furnitur yang kokoh. Jika tidak ada meja atau furnitur, gunakan lengan Anda untuk melindungi kepala dan leher dan cari perlindungan di dekat dinding dalam jauhi jendela, kaca, atau benda yang dapat jatuh.';
    case 'Hold On':
      return 'Menggenggam furnitur membantu menjaga perlindungan Anda tetap stabil di atas Anda. Jika Anda tidak berada di bawah furnitur, tetap di tempat dan melindungi kepala dan leher meminimalkan risiko bergerak ke daerah yang lebih berbahaya.';
    default:
      return '';
  }
};

function EarthquakePrevention() {
  return (
    <Fade in>
      <Box my="2" p="4" boxShadow="md" borderRadius="md">
        <Heading as="h5" size="lg" textAlign="center" mb="4">
          Penanggulangan Gempa
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacing="4">
          {['Drop', 'Cover', 'Hold On'].map((action) => (
            <Card key={action} boxShadow="md" borderRadius="md" overflow="hidden">
              <Image src={getActionImage(action)} alt={action} />
              <CardBody>
                <Heading as="h6" size="md" mb="2">{action}</Heading>
                <Text fontSize="sm" color="gray.500" mb="2">
                  {getActionSubtitle(action)}
                </Text>
                <Text>{getActionText(action)}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Fade>
  );
}

export default EarthquakePrevention;
