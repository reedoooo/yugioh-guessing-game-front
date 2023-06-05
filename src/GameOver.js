import React from 'react';
import { Box, Heading, List, ListItem, Button } from '@chakra-ui/react';

const GameOver = ({ winners, highscore, onNewGame }) => {
  const handleNewGame = () => {
    onNewGame(); // Invoke the onNewGame function when the new game button is clicked
  };

  return (
    <Box>
      <Heading as="h1" mb={4} color="brand.900">
        Game Over!
      </Heading>
      <Heading as="h2" mb={2} color="brand.700">
        Winners:
      </Heading>
      <List>
        {winners.map(winner => (
          <ListItem key={winner.id}>
            {winner.name} - {winner.score}
          </ListItem>
        ))}
      </List>
      <Heading as="h2" mt={4} mb={2} color="brand.700">
        Highscore:
      </Heading>
      <Box color="brand.700">{highscore} points</Box>
      <Button mt={4} colorScheme="brand" onClick={handleNewGame}>
        New Game
      </Button>
    </Box>
  );
};

export default GameOver;
