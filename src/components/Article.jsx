import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, Image, Link, VStack,
} from '@chakra-ui/react';

function Article({
  title, photo, content, author, date, link,
}) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      {photo && <Image src={photo} alt={title} mb={4} />}
      <VStack align="start">
        <Heading as="h3" size="lg">{title}</Heading>
        <Text fontSize="sm" color="gray.500">
          By
          {' '}
          {author}
          {' '}
          on
          {' '}
          {date}
        </Text>
        <Text>{content}</Text>
        {link && (
          <Link href={link} color="teal.500" isExternal>
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
  link: PropTypes.string.isRequired,
};

export default Article;
