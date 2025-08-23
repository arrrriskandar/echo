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
import { useNavigate, useLocation } from "react-router-dom";

const SideMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    {
      path: "/",
      label: "Home",
      description: "Play or view result",
    },
    {
      path: "/about",
      label: "About",
      description: "Learn more about Daily Echo Game",
    },
    {
      path: "/instructions",
      label: "Instructions",
      description: "How to play the game",
    },
    {
      path: "/contact",
      label: "Contact",
      description: "Get in touch with us",
    },
    {
      path: "/privacy",
      label: "Privacy Policy",
      description: "Privacy and data use",
    },
    {
      path: "/support",
      label: "Support Me",
      description: "Buy me a coffee ☕️",
    },
  ];

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
              {menuItems.map(({ path, label, description }) => {
                const isActive = location.pathname === path;
                return (
                  <Box
                    key={path}
                    as="button"
                    onClick={() => handleNavigate(path)}
                    padding="10px"
                    borderRadius="md"
                    _hover={{ bg: "#5170ff" }}
                    bg={isActive ? "#5170ff" : "transparent"}
                    textAlign="left"
                  >
                    <Text fontWeight="bold">{label}</Text>
                    <Text fontSize="sm" color="gray.400">
                      {description}
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideMenu;
