import { Box } from "@chakra-ui/react";

const FallingEffect = ({ emoji, count = 30 }) => {
  const emojis = Array.from({ length: count });

  return (
    <>
      {emojis.map((_, i) => (
        <FallingEmoji key={i} emoji={emoji} delay={Math.random() * 5} />
      ))}
    </>
  );
};

const FallingEmoji = ({ emoji, delay }) => {
  const left = Math.random() * 100;

  return (
    <Box
      position="fixed"
      top="-2rem"
      left={`${left}vw`}
      fontSize="1.5rem"
      zIndex={5}
      pointerEvents="none"
      userSelect="none"
      style={{
        animation: `fall 4s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh);
              opacity: 0.4;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default FallingEffect;
