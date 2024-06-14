import React from 'react';
import {
  Box, HStack, Text, Flex,
} from '@chakra-ui/react';

function Legend() {
  return (
    <Box
      position="absolute"
      bottom="12px"
      left="50%"
      transform="translateX(-50%)"
      bg="white"
      p={2}
      borderRadius="lg"
      zIndex="1000"
      width="70%"
      maxWidth="500px"
    >
      <HStack justify="space-between" spacing={1}>
        <Flex alignItems="center">
          <Box bg="red" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" ml={1} lineHeight="short" mt={3}>7.0+</Text>
        </Flex>
        <Flex alignItems="center">
          <Box bg="orange" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" ml={1} lineHeight="short" mt={3}>6.0 - 6.9</Text>
        </Flex>
        <Flex alignItems="center">
          <Box bg="yellow" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" ml={1} lineHeight="short" mt={3}>5.5 - 5.9</Text>
        </Flex>
        <Flex alignItems="center">
          <Box bg="green" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" ml={1} lineHeight="short" mt={3}>4.5 - 5.4</Text>
        </Flex>
        <Flex alignItems="center">
          <Box bg="blue" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" ml={1} lineHeight="short" mt={3}>&lt; 4.5</Text>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Legend;
