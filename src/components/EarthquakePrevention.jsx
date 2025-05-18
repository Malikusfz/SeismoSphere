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
  useColorModeValue,
  Badge,
  Flex,
  VStack,
  Container,
  Icon,
  AspectRatio,
  Divider,
  HStack,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Wrap,
  WrapItem,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaArrowDown, 
  FaShieldAlt, 
  FaHandPaper,
  FaInfo,
  FaExternalLinkAlt,
  FaBookOpen,
  FaExclamationTriangle,
  FaHeadSideMask,
  FaRunning,
  FaHandsHelping,
  FaFirstAid,
  FaMobileAlt,
  FaSun,
} from 'react-icons/fa';
import DropImg from '../../Public/images/Drop.png';
import CoverImg from '../../Public/images/Cover.png';
import HoldOnImg from '../../Public/images/HoldOn.png';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionContainer = motion(Container);
const MotionImage = motion(Image);

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: -100px; }
  40%, 100% { background-position: 300px; }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const colorPalette = {
  background: '#FAFAFA',
  secondary: '#C7EEFF',
  highlight: '#0077C0',
  accent: '#1D242B',
  gradient: 'linear-gradient(to right, #4299E1, #0077C0)',
  glassLight: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(26, 32, 44, 0.7)',
  glassBorderLight: '1px solid rgba(255, 255, 255, 0.2)',
  glassBorderDark: '1px solid rgba(255, 255, 255, 0.05)',
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

const getActionIcon = (action) => {
  switch (action) {
    case 'Drop':
      return FaArrowDown;
    case 'Cover':
      return FaShieldAlt;
    case 'Hold On':
      return FaHandPaper;
    default:
      return FaArrowDown;
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

const getActionDescription = (action) => {
  switch (action) {
    case 'Drop':
      return 'Menjatuhkan diri ke lantai membantu mengurangi risiko terjatuh akibat guncangan. Ini adalah langkah pertama yang kritis dalam mengurangi cedera saat gempa.';
    case 'Cover':
      return 'Cari perlindungan di bawah meja yang kokoh atau perabotan lain yang dapat melindungi dari benda jatuh. Lindungi bagian vital tubuh Anda, terutama kepala dan leher.';
    case 'Hold On':
      return 'Pertahankan posisi Anda dengan memegang kuat pada furnitur pelindung hingga guncangan berhenti. Ini mencegah Anda terpental ke arah lain selama gempa.';
    default:
      return '';
  }
};

const getActionTips = (action) => {
  switch (action) {
    case 'Drop':
      return [
        { text: 'Jatuhkan diri secepatnya ketika guncangan terasa', icon: FaExclamationTriangle },
        { text: 'Jangan mencoba berlari keluar bangunan', icon: FaRunning },
        { text: 'Lindungi kepala dengan tangan', icon: FaHeadSideMask },
      ];
    case 'Cover':
      return [
        { text: 'Pilih furnitur yang kokoh seperti meja', icon: FaShieldAlt },
        { text: 'Jauhkan dari kaca dan benda yang bisa jatuh', icon: FaExclamationTriangle },
        { text: 'Posisikan diri di bawah pelindung dengan benar', icon: FaHandsHelping },
      ];
    case 'Hold On':
      return [
        { text: 'Tetap bertahan dalam posisi hingga guncangan berhenti', icon: FaHandPaper },
        { text: 'Bergeraklah bersama furnitur jika bergeser', icon: FaMobileAlt },
        { text: 'Siapkan diri untuk guncangan susulan', icon: FaSun },
      ];
    default:
      return [];
  }
};

const getActionColor = (action) => {
  switch (action) {
    case 'Drop':
      return 'red';
    case 'Cover':
      return 'blue';
    case 'Hold On':
      return 'green';
    default:
      return 'blue';
  }
};

function ActionDetailModal({ isOpen, onClose, action, color }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  if (!action) return null;
  
  const tips = getActionTips(action);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent 
        bg={bgColor} 
        borderRadius="2xl" 
        overflow="hidden"
        boxShadow="2xl"
      >
        <ModalHeader 
          bgGradient={`linear(to-r, ${color}.400, ${color}.600)`} 
          color="white" 
          py={4}
          position="relative"
          overflow="hidden"
        >
          <HStack>
            <Icon as={getActionIcon(action)} boxSize={5} />
            <Heading size="md">{action}</Heading>
          </HStack>
          
          {/* Background wave */}
          <Box
            position="absolute"
            left="0"
            right="0"
            bottom="-1px"
            height="15px"
            bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyODAgMEw2NDAgNzAgMCAwdjE0MGgxMjgweiIvPjwvZz48L3N2Zz4=')"
            backgroundSize="100% 100%"
            opacity={0.6}
            zIndex={1}
          />
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody py={6}>
          <VStack spacing={5} align="start">
            <AspectRatio ratio={16/9} width="full" borderRadius="xl" overflow="hidden">
              <Image
                src={getActionImage(action)}
                alt={action}
                objectFit="cover"
              />
            </AspectRatio>
            
            <Heading size="md" color={`${color}.500`}>{getActionSubtitle(action)}</Heading>
            
            <Text fontSize="md" color="gray.600" lineHeight="tall">
              {getActionDescription(action)}
            </Text>
            
            <Divider />
            
            <Box width="full">
              <Heading size="sm" mb={4} color="gray.700">Tips Penting:</Heading>
              <VStack spacing={3} align="stretch">
                {tips.map((tip, index) => (
                  <HStack key={index} spacing={3} p={3} bg={`${color}.50`} borderRadius="md">
                    <Flex
                      w={10}
                      h={10}
                      align="center"
                      justify="center"
                      borderRadius="full"
                      bg={`${color}.100`}
                      color={`${color}.500`}
                    >
                      <Icon as={tip.icon} boxSize={5} />
                    </Flex>
                    <Text fontWeight="medium">{tip.text}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
            
            <Button 
              leftIcon={<FaExternalLinkAlt />} 
              colorScheme={color} 
              size="md" 
              borderRadius="lg"
              alignSelf="flex-end"
              mt={2}
              onClick={onClose}
            >
              Tutup
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function EarthquakePrevention() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const glassBg = useColorModeValue(colorPalette.glassLight, colorPalette.glassDark);
  const glassBorder = useColorModeValue(colorPalette.glassBorderLight, colorPalette.glassBorderDark);
  const floatAnimation = `${float} 6s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 2s infinite ease-in-out`;
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAction, setSelectedAction] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState('blue');
  
  const handleOpenModal = (action, color) => {
    setSelectedAction(action);
    setSelectedColor(color);
    onOpen();
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      transition: { duration: 0.4 },
      boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Box 
      py={12} 
      bg={useColorModeValue('white', 'gray.900')} 
      borderRadius="2xl" 
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        width="50%"
        bgGradient="linear(to-b, blue.50, transparent)"
        opacity={useColorModeValue("0.4", "0.05")}
        zIndex="0"
      />
      
      {/* 3D Floating Shapes */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="100px"
        height="100px"
        borderRadius="lg"
        transform="rotate(15deg)"
        bgGradient="linear(to-br, red.100, red.50)"
        opacity="0.5"
        zIndex="0"
        animation={floatAnimation}
        boxShadow="xl"
        display={{ base: "none", md: "block" }}
      />
      
      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        width="70px"
        height="70px"
        borderRadius="full"
        bgGradient="linear(to-br, blue.100, blue.50)"
        opacity="0.6"
        zIndex="0"
        animation={`${float} 4s ease-in-out infinite`}
        boxShadow="md"
        display={{ base: "none", md: "block" }}
      />
      
      <Box
        position="absolute"
        top="60%"
        left="15%"
        width="50px"
        height="50px"
        borderRadius="lg"
        transform="rotate(45deg)"
        bgGradient="linear(to-br, green.100, green.50)"
        opacity="0.4"
        zIndex="0"
        animation={`${float} 5s ease-in-out infinite 1s`}
        boxShadow="sm"
        display={{ base: "none", md: "block" }}
      />
      
      <MotionContainer 
        maxW="1200px" 
        position="relative" 
        zIndex="1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <MotionFlex
          direction="column"
          align="center"
          mb={16}
        >
          <MotionBadge 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
            colorScheme="green" 
            fontSize="md" 
            px={4} 
            py={2} 
            borderRadius="full"
            mb={5}
            boxShadow="0px 4px 12px rgba(56, 161, 105, 0.15)"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="-150%"
              width="40%"
              height="100%"
              bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
              transform="skewX(-20deg)"
              animation={`${shine} 4s ease-in-out infinite`}
              zIndex="1"
            />
            Protokol Keselamatan
          </MotionBadge>
          
          <MotionHeading
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, delay: 0.1, ease: "easeOut" }
              }
            }}
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color={headingColor}
            letterSpacing="tight"
            mb={4}
            textAlign="center"
            bgGradient="linear(to-r, green.400, blue.500)"
            bgClip="text"
          >
            Langkah Perlindungan Diri
          </MotionHeading>
          
          <MotionText 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
              }
            }}
            fontSize={{ base: "lg", md: "xl" }}
            maxW="700px" 
            mx="auto" 
            color={useColorModeValue('gray.600', 'gray.400')}
            textAlign="center"
            lineHeight="tall"
          >
            Tiga langkah penting yang harus Anda lakukan ketika terjadi gempa bumi
          </MotionText>
        </MotionFlex>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }} w="full">
          {['Drop', 'Cover', 'Hold On'].map((action, i) => (
            <MotionCard
              key={action}
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              bg={bgColor}
              boxShadow="xl"
              borderRadius="2xl"
              overflow="hidden"
              height="100%"
              transition="all 0.4s ease"
              role="group"
              position="relative"
              transform={{ md: `perspective(1000px) rotateY(${(i-1)*5}deg)` }}
              transformStyle="preserve-3d"
            >
              {/* Shine effect overlay */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                opacity="0"
                bg="linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)"
                zIndex="2"
                pointerEvents="none"
                transition="all 0.6s ease"
                _groupHover={{ opacity: 1, transform: "translateX(100%)" }}
              />
              
              <Box position="relative" overflow="hidden">
                <motion.div variants={imageVariants} whileHover="hover">
                  <AspectRatio ratio={16/9}>
                    <Image 
                      src={getActionImage(action)} 
                      alt={action} 
                      objectFit="cover"
                      transition="all 0.5s ease"
                      filter="auto"
                      brightness="95%"
                      _groupHover={{ 
                        brightness: "105%",
                        transform: "scale(1.05)" 
                      }}
                    />
                  </AspectRatio>
                </motion.div>
                
                {/* Glass overlay with step number */}
                <Flex
                  position="absolute"
                  top={4}
                  left={4}
                  w={10}
                  h={10}
                  bg={glassBg}
                  backdropFilter="blur(8px)"
                  borderRadius="full"
                  justify="center"
                  align="center"
                  border={glassBorder}
                  fontWeight="bold"
                  fontSize="lg"
                  boxShadow="lg"
                  color={`${getActionColor(action)}.500`}
                  zIndex="2"
                  transition="all 0.3s ease"
                  _groupHover={{
                    transform: "scale(1.1)",
                    boxShadow: "xl"
                  }}
                >
                  {i + 1}
                </Flex>
                
                {/* Info button */}
                <Tooltip 
                  label="Lihat detail" 
                  placement="top" 
                  hasArrow
                  bg={`${getActionColor(action)}.500`}
                >
                  <IconButton
                    aria-label="Detail informasi"
                    icon={<FaInfo />}
                    position="absolute"
                    top={4}
                    right={4}
                    colorScheme={getActionColor(action)}
                    borderRadius="full"
                    size="sm"
                    zIndex="2"
                    onClick={() => handleOpenModal(action, getActionColor(action))}
                    opacity="0.8"
                    _groupHover={{ opacity: 1 }}
                  />
                </Tooltip>
                
                {/* Top right icon */}
                <Flex
                  position="absolute"
                  top="50%"
                  right="-20px"
                  transform="translateY(-50%)"
                  bg={`${getActionColor(action)}.500`}
                  color="white"
                  borderRadius="full"
                  w={12}
                  h={12}
                  justifyContent="center"
                  alignItems="center"
                  boxShadow="md"
                  transition="all 0.3s ease"
                  _groupHover={{ 
                    transform: "translateY(-50%) translateX(-10px)",
                    boxShadow: "lg"
                  }}
                  zIndex="1"
                >
                  <Icon as={getActionIcon(action)} boxSize={5} />
                </Flex>
              </Box>
              
              <CardBody p={6} pt={5}>
                <VStack align="start" spacing={4}>
                  <Badge 
                    colorScheme={getActionColor(action)} 
                    fontSize="sm" 
                    px={3} 
                    py={1.5}
                    borderRadius="full"
                    boxShadow="sm"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      borderRadius="full"
                      bg="white"
                      opacity="0.2"
                      animation={pulseAnimation}
                    />
                    Langkah {i + 1}
                  </Badge>
                  
                  <Heading 
                    as="h3" 
                    size="lg" 
                    color={useColorModeValue('gray.800', 'white')}
                    _groupHover={{ color: `${getActionColor(action)}.500` }}
                    transition="color 0.3s ease"
                  >
                    {action}
                  </Heading>
                  
                  <Divider borderColor={`${getActionColor(action)}.100`} />
                  
                  <Text 
                    fontSize="md" 
                    color={useColorModeValue('gray.700', 'gray.300')}
                    fontWeight="medium"
                    lineHeight="tall"
                  >
                    {getActionSubtitle(action)}
                  </Text>
                  
                  <Text 
                    fontSize="sm" 
                    color={useColorModeValue('gray.600', 'gray.400')}
                    lineHeight="tall"
                  >
                    {getActionDescription(action)}
                  </Text>
                  
                  <Flex 
                    mt={2} 
                    alignSelf="flex-end"
                    alignItems="center"
                    color={`${getActionColor(action)}.500`}
                    fontSize="sm"
                    fontWeight="medium"
                    cursor="pointer"
                    onClick={() => handleOpenModal(action, getActionColor(action))}
                    transition="all 0.2s"
                    _hover={{
                      color: `${getActionColor(action)}.600`,
                    }}
                  >
                    <Text mr={1}>Pelajari selengkapnya</Text>
                    <Icon as={FaBookOpen} boxSize={4} />
                  </Flex>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
        
        {/* Modal for detailed information */}
        <ActionDetailModal 
          isOpen={isOpen} 
          onClose={onClose} 
          action={selectedAction}
          color={selectedColor}
        />
      </MotionContainer>
    </Box>
  );
}

export default EarthquakePrevention;
