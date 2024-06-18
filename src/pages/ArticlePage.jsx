/* eslint-disable linebreak-style */
import React from 'react';
import {
  Container, Heading, VStack, useColorModeValue,
} from '@chakra-ui/react';
import Article from '../components/Article';
import articles from '../utils/art';

function ArticlePage() {
  // Dynamic background color based on the theme (light or dark mode)
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.md" py={8} bg={bgColor} boxShadow="xl" borderRadius="lg" border="1px solid" borderColor={borderColor}>
      <Heading as="h1" mb={6} textAlign="center" fontSize="2xl" color="teal.500">
        Articles on Earthquakes
      </Heading>
      <VStack spacing={6} align="stretch">
        {articles.map((article) => (
          <Article
            key={article.id}
            title={article.title}
            photo={article.photo}
            content={article.content}
            author={article.author}
            date={article.date}
            link={article.link}
          />
        ))}
      </VStack>
    </Container>
  );
}

export default ArticlePage;
