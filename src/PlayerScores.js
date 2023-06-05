import React from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

const PlayerScores = ({ players, onNewGame }) => {
  const handleNewGame = () => {
    onNewGame(); // Invoke the onNewGame function when the new game button is clicked
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Player Scores
      </Text>
      <VStack align="start" spacing={1}>
        {players.map(player => (
          <Box key={player.id} bg="gray.100" p={2} borderRadius="md">
            <Text fontWeight="bold">{player.name}</Text>
            <Text>Score: {player.score}</Text>
          </Box>
        ))}
      </VStack>
      <Button colorScheme="brand" mt={4} onClick={handleNewGame}>
        New Game
      </Button>
    </Box>
  );
};

export default PlayerScores;
