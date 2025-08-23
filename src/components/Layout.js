import { Box, Image, Link, Heading } from "@chakra-ui/react";
import SideMenu from "./SideMenu";
import { Outlet, Link as RouterLink } from "react-router-dom";

const Layout = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={4} position="relative">
      <SideMenu />
      <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
        <Box textAlign="center" mb={6}>
          <Image src="/EchoBig.png" alt="Echo Logo" boxSize="100px" mx="auto" />
          <Heading as="h1" size="lg" mt={2}>
            Daily Echo Game
          </Heading>
        </Box>
      </Link>
      <Outlet /> {/* Render matched child routes here */}
    </Box>
  );
};

export default Layout;
