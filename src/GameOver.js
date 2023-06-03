import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const GameOver = ({ winners, highscore }) => {
  const winnerNames = winners.map(winner => winner.name).join(', ');

  return (
    <Box>
      <Heading as="h1" mb={4} color="brand.900">
        Game Over!
      </Heading>
      <Box color="brand.700">
        Winners are {winnerNames} with {highscore} points!
      </Box>
    </Box>
  );
};

export default GameOver;
