import React from 'react';
import { Box, Button, Heading, Input, List, ListItem, Grid } from '@chakra-ui/react';

const GameInterface = ({ gameOver, winnerNames, highscore, revealedWord, playerName, setPlayerName, handleJoinGame, handleLeaveGame, handleGuessLetter, players, selectedPlayer, setSelectedPlayer, turnId }) => {
  return (
    <Box>
      <Heading as="h1" mb={4} color="brand.900">
        Word Guessing Game
      </Heading>
      <Heading as="h2" mb={2} color="brand.700">
        Turn: {turnId}
      </Heading>
      <Box color="brand.500">
        Revealed Word: {revealedWord.join(' ')}
      </Box>
      <Input
        type="text"
        placeholder="Your Name"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        mb={4}
        colorScheme="brand"
      />
      <Button
        colorScheme="brand"
        onClick={handleJoinGame}
        mb={4}
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        Join Game
      </Button>

      <Button
        colorScheme="brand"
        onClick={handleLeaveGame}
        mb={4}
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
        isDisabled={!selectedPlayer} // Disable the button if no player is selected
      >
        Remove Player
      </Button>

      <Heading as="h3" mb={2} color="brand.700">
        Players:
      </Heading>
      <List>
        {players.map(player => (
          <ListItem
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            style={{
              cursor: 'pointer',
              backgroundColor:
                player === selectedPlayer ? '#ddd' : '',
            }}
          >
            {player.name}
          </ListItem>
        ))}
      </List>
      <Heading as="h3" mb={2} color="brand.700">
        Guess a Letter:
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {[
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ].map(letter => (
          <Button
            colorScheme="brand"
            onClick={() => handleGuessLetter(letter)}
            key={letter}
            _hover={{ transform: 'scale(1.05) rotate(3deg)' }}
            transition="all 0.2s"
          >
            {letter}
          </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default GameInterface;
