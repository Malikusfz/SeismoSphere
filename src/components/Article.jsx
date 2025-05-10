import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, Link, Image, VStack, useColorModeValue,
  Badge, HStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ExternalLinkIcon } from '@chakra-ui/icons';

/**
 * Renders an article card with image, title, content, author information and links.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The article title
 * @param {string} props.photo - URL of the article image
 * @param {string} props.content - The article content text
 * @param {string} props.author - The article author's name
 * @param {string} props.date - The publication date in ISO format
 * @param {string} [props.link] - Optional URL to the full article
 * @param {string} [props.bgColor] - Optional background color for the card
 * @returns {React.ReactElement} The rendered Article component
 */
function Article({
  title, photo, content, author, date, link, bgColor,
}) {
  const formattedDate = format(new Date(date), 'd MMMM yyyy', { locale: id });
  const boxBg = bgColor || useColorModeValue('white', 'gray.700');
  const titleColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Calculate how long ago the article was published
  const getTimeAgo = () => {
    const now = new Date();
    const pubDate = new Date(date);
    const diffTime = Math.abs(now - pubDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return 'New';
    }
    return '';
  };

  const timeAgo = getTimeAgo();

  return (
    <Box
      p={0}
      bg={boxBg}
      borderRadius="lg"
      boxShadow="md"
      maxW="sm"
      mx="auto"
      overflow="hidden"
      h="100%"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'teal.400',
      }}
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
    >
      {timeAgo && (
        <Badge
          colorScheme="teal"
          position="absolute"
          top={2}
          right={2}
          zIndex={1}
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="full"
        >
          {timeAgo}
        </Badge>
      )}

      <Box h="200px" w="100%" position="relative" overflow="hidden">
        <Image
          src={photo}
          alt={title}
          objectFit="cover"
          w="100%"
          h="100%"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }}
        />
      </Box>

      <VStack
        align="start"
        spacing={3}
        p={5}
        flex="1"
        justify="space-between"
        h="100%"
      >
        <VStack align="start" spacing={3} w="100%">
          <Heading
            as="h3"
            size="md"
            color={titleColor}
            lineHeight="1.4"
            noOfLines={2}
          >
            {title}
          </Heading>

          <Text
            fontSize="sm"
            textAlign="justify"
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={4}
            lineHeight="1.6"
          >
            {content}
          </Text>
        </VStack>

        <VStack align="start" w="100%" spacing={2}>
          <HStack fontSize="xs" color="gray.500" w="100%" spacing={1} mt={2}>
            <Text fontWeight="medium">{author}</Text>
            <Text>•</Text>
            <Text>{formattedDate}</Text>
          </HStack>

          {link && (
            <Link
              href={link}
              isExternal
              color="teal.500"
              fontSize="sm"
              fontWeight="medium"
              _hover={{ textDecoration: 'underline', color: 'teal.600' }}
              display="flex"
              alignItems="center"
            >
              Read more
              <ExternalLinkIcon mx={1} />
            </Link>
          )}
        </VStack>
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
  bgColor: PropTypes.string,
};

Article.defaultProps = {
  link: null,
  bgColor: null,
};

export default Article;
