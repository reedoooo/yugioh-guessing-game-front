import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const PlayerScores = ({ players }) => {
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
    </Box>
  );
};

export default PlayerScores;
