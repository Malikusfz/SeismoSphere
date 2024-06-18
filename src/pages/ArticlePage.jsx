/* eslint-disable linebreak-style */
import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import Article from '../components/Article';
import articles from '../utils/art';

function ArticlePage() {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>
        Article Gempa
      </Heading>
      <VStack spacing={6}>
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
