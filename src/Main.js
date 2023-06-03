import React, { useEffect, useState } from 'react';
import { Center, Grid, VStack } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import GameInterface from './GameInterface';
import GameOver from './GameOver';
import PlayerScores from './PlayerScores';

import '@fontsource/inter';
import './button.css';

const eventPool = {
    PLAYER_JOIN: 'playerJoin',
    GAME_START: 'gameStart',
    UPDATE_PLAYER: 'updatePlayer',
    PLAYER_GUESS: 'playerGuess',
    PLAYER_SCORE: 'playerScore',
    PLAYER_TURN: 'playerTurn',
    GAME_OVER: 'gameOver',
    PLAYER_LEAVE: 'playerLeave',
  };
  

const Game = () => {
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [revealedWord, setRevealedWord] = useState([]);
  const [turnId, setTurnId] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winners, setWinners] = useState([]);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server's URL and PORT
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on(eventPool.PLAYER_JOIN, players => {
      setPlayers(players);
    });

    newSocket.on(eventPool.PLAYER_LEAVE, updatedPlayers => {
      setPlayers(updatedPlayers);
    });

    newSocket.on(eventPool.UPDATE_PLAYER, updatedPlayer => {
      setPlayers(prevPlayers =>
        prevPlayers.map(player => {
          if (player.id === updatedPlayer.id) {
            return updatedPlayer;
          }
          return player;
        })
      );
    });

    newSocket.on(eventPool.GAME_START, payload => {
      setRevealedWord(payload.revealedWord);
      setTurnId(payload.turnId);
    });

    newSocket.on(eventPool.PLAYER_GUESS, message => {
      console.log(message);
    });

    newSocket.on(eventPool.PLAYER_SCORE, payload => {
      console.log(payload);
    });

    newSocket.on(eventPool.GAME_OVER, ({ winners, highscore }) => {
      setGameOver(true);
      setWinners(winners);
      setHighscore(highscore);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinGame = () => {
    socket.emit(eventPool.PLAYER_JOIN, { name: playerName });
  };

  const handleLeaveGame = () => {
    if (selectedPlayer) {
      socket.emit(eventPool.PLAYER_LEAVE, selectedPlayer.id);
    }
  };

  const handleGuessLetter = letter => {
    socket.emit(eventPool.PLAYER_GUESS, letter);
  };

  return (
    <Center bg="brand.50" h="100vh">
      <Grid placeItems="center" w="full" h="full" p={10}>
        <VStack
          spacing={6}
          p={6}
          w="full"
          maxW="md"
          borderWidth={2}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          {gameOver ? (
            <GameOver winners={winners} highscore={highscore} />
          ) : (
            <>
              <PlayerScores players={players} />
              <GameInterface
                gameOver={gameOver}
                winners={winners}
                highscore={highscore}
                revealedWord={revealedWord}
                setPlayerName={setPlayerName}
                playerName={playerName}
                handleJoinGame={handleJoinGame}
                handleLeaveGame={handleLeaveGame}
                handleGuessLetter={handleGuessLetter}
                players={players}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                turnId={turnId}
              />
            </>
          )}
        </VStack>
      </Grid>
    </Center>
  );
};

export default Game;
