import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  Button,
  ChakraProvider,
  extendTheme,
  Center,
  CSSReset,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Confetti from "./lib/Confetti";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f2f6ff",
      100: "#c5d4e9",
      200: "#98b3d4",
      300: "#6a91be",
      400: "#3d70a9",
      500: "#114f93",
      600: "#0d3d74",
      700: "#0a2b55",
      800: "#061936",
      900: "#030617",
    },
    secondary: {
      50: "#f2eaff",
      100: "#d4b6ff",
      200: "#b488ff",
      300: "#9761ff",
      400: "#7a3dff",
      500: "#5d17ff",
      600: "#4d00cc",
      700: "#3d0099",
      800: "#2d0066",
      900: "#1e0033",
      neonPurple: "#aa00ff",
    },
  },
});

const PlayerScores = ({ players, winners, highscore, onNewGame }) => {
  const [winningPlayer, setWinningPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (winners.length > 0 && winners[0].id) {
      setShowModal(true);
      setWinningPlayer(winners[0].id);
    }
  }, [winners]);

  const handleNewGame = () => {
    setWinningPlayer(null);
    setShowModal(false);
    onNewGame();
  };

  const handlePlayerWin = (playerId) => {
    setWinningPlayer(playerId);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Center>
        <Box
          position="relative"
          display="inline-block"
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="md"
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            mb={2}
            color="brand.900"
            position="relative"
            zIndex={1}
          >
            <span className="outline-text">Player Scores</span>
          </Text>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="brand.100"
            opacity={0.3}
            borderRadius="xl"
            zIndex={0}
            animation={winningPlayer ? "glowAnimation 2s infinite" : "none"}
          />
          <Grid templateColumns={`repeat(${players.length}, 1fr)`} gap={2}>
            {players.slice(0, 4).map((player) => (
              <Grid
                key={player.id}
                templateColumns="1fr"
                bg={
                  player.id === winningPlayer
                    ? "secondary.500"
                    : "secondary.300"
                }
                p={2}
                borderRadius="md"
                color="brand.900"
                onClick={() => handlePlayerWin(player.id)}
                cursor="pointer"
                boxShadow={
                  player.id === winningPlayer
                    ? "0 0 10px rgba(85, 23, 255, 0.5)"
                    : "none"
                }
                transform={
                  player.id === winningPlayer ? "translateY(-3px)" : "none"
                }
                transition="transform 0.3s"
              >
                <Text fontWeight="bold">{player.name}</Text>
                <Text>Score: {player.score}</Text>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Center>
      <Center>
        <Button colorScheme="brand" mt={4} onClick={handleNewGame}>
          New Game
        </Button>
      </Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Over!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showModal && <Confetti />}
            <Text fontWeight="bold">{winners[0]?.name}</Text>
            <Text>Score: {winners[0]?.score}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" onClick={handleNewGame}>
              New Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <style>
        {`@keyframes glowAnimation { 0% { box-shadow: 0 0 10px rgba(85, 23, 255, 0.5); } 50% { box-shadow: 0 0 20px rgba(85, 23, 255, 1); } 100% { box-shadow: 0 0 10px rgba(85, 23, 255, 0.5); } }`}
      </style>
    </ChakraProvider>
  );
};

export default PlayerScores;
