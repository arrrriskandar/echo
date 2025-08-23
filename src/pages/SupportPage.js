import { Box, Text, VStack, Image, Link } from "@chakra-ui/react";

const SupportMe = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="left">
        <Text fontSize="2xl" fontWeight="bold">
          Support Me
        </Text>
        <Text>
          If you enjoy using Daily Echo Game and want to show some love, feel
          free to support me!
        </Text>
        <Link href="https://www.buymeacoffee.com/ariskandar" isExternal>
          <Image
            src="/qrcode.png"
            alt="Buy Me a Coffee QR Code"
            boxSize="150px"
            objectFit="contain"
            cursor="pointer"
            mx="auto"
            display="block"
          />
        </Link>
      </VStack>
    </Box>
  );
};

export default SupportMe;
