import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, Link, Image, VStack, useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

function Article({
  title, photo, content, author, date, link,
}) {
  const formattedDate = format(new Date(date), 'd MMMM yyyy', { locale: id });

  return (
    <Box
      p={4}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="md"
      boxShadow="md"
      maxW="sm"
      mx="auto"
      overflow="hidden"
      h="auto" // Set auto height to accommodate the content properly
    >
      <VStack align="start" spacing={4} h="full">
        <Box w="full" display="flex" justifyContent="center" borderRadius="md" overflow="hidden" h="150px">
          <Image
            src={photo}
            alt={title}
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>
        <VStack align="start" spacing={2} w="full" flex="1">
          <Heading as="h3" size="md" textAlign="center" w="full">{title}</Heading>
          <Box w="full" flex="1" overflow="hidden" position="relative">
            <Text
              fontSize="sm"
              textAlign="justify"
              w="full"
              height="auto" // Adjust height as needed
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 6, // Show 6 lines before truncating
                WebkitBoxOrient: 'vertical',
              }}
            >
              {content}
            </Text>
          </Box>
          <Text fontSize="xs" color="gray.500" w="full" textAlign="center">
            {author}
            {' '}
            -
            {' '}
            {formattedDate}
          </Text>
        </VStack>
        {link && (
          <Link href={link} color="teal.500" isExternal textAlign="center" w="full" fontSize="sm">
            Read more
          </Link>
        )}
      </VStack>
    </Box>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string,
};

Article.defaultProps = {
  link: null,
};

export default Article;
