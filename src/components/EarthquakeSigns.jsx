import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Fade,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
} from '@chakra-ui/react';

const getStageItems = (stage) => {
  switch (stage) {
    case 'Sebelum Gempa':
      return ['Perubahan perilaku hewan', 'Kenaikan air tanah', 'Perubahan medan magnet bumi', 'Gas yang keluar dari tanah'];
    case 'Selama Gempa':
      return ['Getaran tanah', 'Suara gemuruh', 'Pergerakan objek dan bangunan', 'Perubahan permukaan tanah'];
    case 'Setelah Gempa':
      return ['Gempa bumi susulan', 'Perubahan dalam sumber air', 'Kerusakan infrastruktur', 'Tsunami'];
    default:
      return [];
  }
};

function EarthquakeSigns() {
  return (
    <Fade in>
      <Box my="2" p="4" bg="white" shadow="md" borderRadius="md">
        <Heading as="h5" size="md" textAlign="center" mb="4">
          Tanda Tanda Gempa
        </Heading>
        <HStack spacing="4" justify="center">
          {['Sebelum Gempa', 'Selama Gempa', 'Setelah Gempa'].map((stage) => (
            <Card key={stage} maxW="sm">
              <CardHeader>
                <Heading size="md">{stage}</Heading>
              </CardHeader>
              <CardBody>
                <VStack divider={<StackDivider />} spacing="4">
                  {getStageItems(stage).map((item) => (
                    <Text key={item}>{item}</Text>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          ))}
        </HStack>
      </Box>
    </Fade>
  );
}

export default EarthquakeSigns;
