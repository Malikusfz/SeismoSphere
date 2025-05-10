/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import {
  Container, Heading, SimpleGrid, useColorModeValue, Box, Flex,
  Text, Select, InputGroup, Input, InputRightElement, IconButton,
  useBreakpointValue, VStack, Fade, ScaleFade, Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Article from '../components/Article';
import articles from '../utils/art';

/**
 * Renders the article page with a responsive grid layout and filtering options.
 *
 * This component displays a collection of articles about earthquakes with
 * features such as sorting, searching, and responsive layout adjustments.
 *
 * @returns {React.ReactElement} The rendered ArticlePage component
 */
function ArticlePage() {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic background and styling based on the theme (light or dark mode)
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('teal.600', 'teal.400');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Responsive column count based on screen size
  const columns = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sort selection changes
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Apply filtering and sorting whenever search or sort parameters change
  useEffect(() => {
    setIsLoading(true);

    // Filter by search query
    let result = articles;

    if (searchQuery) {
      result = articles.filter((article) => (
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
        || article.content.toLowerCase().includes(searchQuery.toLowerCase())
        || article.author.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }

    // Sort the articles
    switch (sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'titleAsc':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    // Add a small delay for loading animation effect
    setTimeout(() => {
      setFilteredArticles(result);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, sortBy]);

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <ScaleFade initialScale={0.9} in>
      <Container
        maxW="container.xl"
        py={10}
        px={{ base: 4, md: 8 }}
        bg={bgColor}
        boxShadow="xl"
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        w="full"
        my={12}
      >
        <VStack spacing={6} w="full">
          <Heading
            as="h1"
            mb={2}
            textAlign="center"
            fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}
            color={headingColor}
            fontWeight="bold"
          >
            Articles on Earthquakes
          </Heading>

          <Text
            textAlign="center"
            maxW="container.md"
            mx="auto"
            fontSize={{ base: 'sm', md: 'md' }}
            color={useColorModeValue('gray.600', 'gray.400')}
            mb={4}
          >
            Explore our collection of articles about earthquakes, preventions, and safety measures to stay informed and prepared.
          </Text>

          {/* Filter and Search Controls */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            w="full"
            mb={8}
            justify="space-between"
            align={{ base: 'stretch', md: 'center' }}
            gap={4}
          >
            <InputGroup size="md" maxW={{ base: 'full', md: 'md' }}>
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                borderRadius="md"
                _hover={{ borderColor: 'teal.300' }}
              />
              <InputRightElement>
                <IconButton
                  icon={<SearchIcon />}
                  variant="ghost"
                  aria-label="Search"
                  colorScheme="teal"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>

            <Select
              value={sortBy}
              onChange={handleSortChange}
              maxW={{ base: 'full', md: 'xs' }}
              borderRadius="md"
              _hover={{ borderColor: 'teal.300' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="titleAsc">Title (A-Z)</option>
              <option value="titleDesc">Title (Z-A)</option>
            </Select>
          </Flex>

          {/* Article Grid */}
          {filteredArticles.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg">No articles found matching your search.</Text>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => {
                  setSearchQuery('');
                  setSortBy('newest');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <SimpleGrid
              columns={columns}
              spacing={{ base: 6, md: 8 }}
              w="full"
            >
              {filteredArticles.map((article) => (
                <Fade in={!isLoading} key={article.id}>
                  <Article
                    title={article.title}
                    photo={article.photo}
                    content={article.content}
                    author={article.author}
                    date={article.date}
                    link={article.link}
                    bgColor={cardBg}
                  />
                </Fade>
              ))}
            </SimpleGrid>
          )}

          {/* Results count */}
          <Text fontSize="sm" color="gray.500" alignSelf="flex-start" mt={4}>
            {`Showing ${filteredArticles.length} of ${articles.length} articles`}
          </Text>
        </VStack>
      </Container>
    </ScaleFade>
  );
}

export default ArticlePage;
