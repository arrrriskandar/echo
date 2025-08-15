import { Box, Image, Link } from "@chakra-ui/react";
import SideMenu from "./SideMenu";
import { Outlet, Link as RouterLink } from "react-router-dom";

const Layout = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={4} position="relative">
      <SideMenu />
      <Link as={RouterLink} to="/">
        <Image
          src="/EchoBig.png"
          alt="Echo Logo"
          boxSize="100px"
          mx="auto"
          mb={6}
        />
      </Link>
      <Outlet /> {/* Render matched child routes here */}
    </Box>
  );
};

export default Layout;
