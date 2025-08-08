import { Box, Text, VStack, Link } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Privacy Policy
        </Text>
        <Text>
          Your privacy is important to me. Echo is a front-end only application
          that does not collect or store any personal data.
        </Text>
        <Text>
          However, to support the app and keep it free, I use Google AdSense for
          displaying ads. Google may collect certain anonymous information such
          as cookies and device identifiers to personalize ads. For more
          information on how Google uses your data, please visit the{" "}
          <Link
            href="https://policies.google.com/privacy"
            color="blue.400"
            isExternal
          >
            Google Privacy Policy
          </Link>
          .
        </Text>
        <Text>
          If you have any questions about this privacy policy or your data,
          please feel free to contact me at{" "}
          <Link href="mailto:dailyechogame@gmail.com" color="blue.400">
            dailyechogame@gmail.com
          </Link>
          .
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicy;
