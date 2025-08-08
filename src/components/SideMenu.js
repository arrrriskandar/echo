import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Box,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const SideMenu = ({ onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (key) => {
    onSelect(key);
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        onClick={onOpen}
        size="md"
        position="fixed"
        top="4"
        left="4"
        zIndex="overlay"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Box
                as="button"
                onClick={() => handleSelect("about")}
                padding="10px"
                borderRadius="md"
                _hover={{ bg: "#5170ff" }}
                textAlign="left"
              >
                <Text fontWeight="bold">About</Text>
                <Text fontSize="sm" color="gray.400">
                  Learn more about Echo
                </Text>
              </Box>
              <Box
                as="button"
                onClick={() => handleSelect("instructions")}
                padding="10px"
                borderRadius="md"
                _hover={{ bg: "#5170ff" }}
                textAlign="left"
              >
                <Text fontWeight="bold">Instructions</Text>
                <Text fontSize="sm" color="gray.400">
                  How to play the game
                </Text>
              </Box>
              <Box
                as="button"
                onClick={() => handleSelect("contact")}
                padding="10px"
                borderRadius="md"
                _hover={{ bg: "#5170ff" }}
                textAlign="left"
              >
                <Text fontWeight="bold">Contact</Text>
                <Text fontSize="sm" color="gray.400">
                  Get in touch with us
                </Text>
              </Box>
              <Box
                as="button"
                onClick={() => handleSelect("privacy")}
                padding="10px"
                borderRadius="md"
                _hover={{ bg: "#5170ff" }}
                textAlign="left"
              >
                <Text fontWeight="bold">Privacy Policy</Text>
                <Text fontSize="sm" color="gray.400">
                  Privacy and data use
                </Text>
              </Box>
              <Box
                as="button"
                onClick={() => handleSelect("support")}
                padding="10px"
                borderRadius="md"
                _hover={{ bg: "#5170ff" }}
                textAlign="left"
              >
                <Text fontWeight="bold">Support Me</Text>
                <Text fontSize="sm" color="gray.400">
                  Buy me a coffee ☕️
                </Text>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideMenu;
