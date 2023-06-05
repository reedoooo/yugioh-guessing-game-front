import React from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Grid,
  ChakraProvider,
  extendTheme,
  Text,
} from "@chakra-ui/react";

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

const GameInterface = ({
  revealedWord,
  playerName,
  setPlayerName,
  handleJoinGame,
  handleLeaveGame,
  handleGuessLetter,
  players,
  selectedPlayer,
  setSelectedPlayer,
  turnId,
  onNewGame,
}) => {


  const darkerPrimaryColor = "brand.900";

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Heading as="h1" mb={4} color={darkerPrimaryColor}>
          Word Guessing Game
        </Heading>
        <Heading as="h2" mb={2} color={darkerPrimaryColor}>
          Turn: {turnId}
        </Heading>
        <Box
          color={darkerPrimaryColor}
          bg="white"
          p={4}
          borderRadius="lg"
          boxShadow="lg"
        >
          Revealed Word: {revealedWord.join(" ")}
        </Box>
        <Input
          type="text"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          mb={4}
          colorScheme="brand"
        />
        <Button
          colorScheme="brand"
          onClick={handleJoinGame}
          mb={4}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s"
        >
          Join Game
        </Button>
        <Button
          colorScheme="brand"
          onClick={handleLeaveGame}
          mb={4}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s"
          isDisabled={!selectedPlayer}
        >
          Remove Player
        </Button>
        <Heading as="h3" mb={2} color={darkerPrimaryColor}>
          Players:
        </Heading>
        <Grid templateColumns={`repeat(4, 1fr)`} gap={4}>
          {players.slice(0, 4).map((player) => (
            <Box
              key={player.id}
              bg="white"
              p={6}
              onClick={() => setSelectedPlayer(player)} // Set the selected player when the Box is clicked
    cursor="pointer" // Change the cursor to indicate the Box is clickable
    borderColor={selectedPlayer?.id === player.id ? 'brand.500' : 'seconday.500'} // Highlight the selected player
    borderWidth={2}
              borderRadius="xl"
              boxShadow="md"
            >
              <Text fontWeight="bold">{player.name}</Text>
              <Text>Score: {player.score}</Text>
            </Box>
          ))}
        </Grid>
        <Heading as="h3" mb={2} color={darkerPrimaryColor}>
          Guess a Letter:
        </Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          {[
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "_",
          ].map((letter) => (
            <Button
              colorScheme="brand"
              onClick={() => handleGuessLetter(letter)}
              key={letter}
              _hover={{ transform: "scale(1.05) rotate(3deg)" }}
              transition="all 0.2s"
            >
              {letter}
            </Button>
          ))}
        </Grid>

      </Box>
    </ChakraProvider>
  );
};

export default GameInterface;
