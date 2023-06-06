import React, { Fragment, useEffect, useState } from "react";
import {
  Center,
  Grid,
  VStack,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import GameInterface from "./GameInterface";
import PlayerScores from "./PlayerScores";
// import GameOver from "./GameOver";
import "@fontsource/inter";
import "./button.css";

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

const eventPool = {
  PLAYER_JOIN: "playerJoin",
  GAME_START: "gameStart",
  UPDATE_PLAYER: "updatePlayer",
  PLAYER_GUESS: "playerGuess",
  PLAYER_SCORE: "playerScore",
  PLAYER_TURN: "playerTurn",
  GAME_OVER: "gameOver",
  PLAYER_LEAVE: "playerLeave",
  START_NEW_GAME: "startNewGame",
};

const Game = () => {
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [revealedWord, setRevealedWord] = useState([]);
  const [turnId, setTurnId] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winners, setWinners] = useState([]);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Replace with your server's URL and PORT
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    newSocket.on(eventPool.PLAYER_JOIN, (players) => {
      setPlayers(players);
    });

    newSocket.on(eventPool.PLAYER_LEAVE, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    newSocket.on(eventPool.PLAYER_TURN, (payload) => {
      console.log(payload);
      setTurnId(payload.turnId);
      // You can add more code here to handle other properties of payload
    });

    newSocket.on(eventPool.UPDATE_PLAYER, (updatedPlayer) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === updatedPlayer.id) {
            return updatedPlayer;
          }
          return player;
        })
      );
    });

    newSocket.on(eventPool.GAME_START, (payload) => {
      setRevealedWord(payload.revealedWord);
      setTurnId(payload.turnId);
    });

    newSocket.on(eventPool.PLAYER_GUESS, (message) => {
      console.log(message);

      // Assume the `message` is in this format: { winners: [...], highscore: ... }
      if (message.winners) {
        setWinners(message.winners);
        setHighscore(message.highscore);
        setGameOver(true);
      }
    });

    newSocket.on(eventPool.PLAYER_SCORE, (payload) => {
      console.log(payload);
    });

    // Add check for unexpected payload structure
    newSocket.on(eventPool.GAME_OVER, (payload) => {
      if (
        !payload ||
        !payload.winners ||
        typeof payload.highscore === "undefined"
      ) {
        console.error("Unexpected GAME_OVER payload:", payload);
        return;
      }

      console.log(
        "GameOver event received with data: ",
        payload.winners,
        payload.highscore
      );
      setGameOver(true);
      setWinners(payload.winners);
      console.log("Winners: ", winners);
      setHighscore(payload.highscore);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [winners]);

  const handleJoinGame = () => {
    socket.emit(eventPool.PLAYER_JOIN, { name: playerName });
  };

  const handleLeaveGame = () => {
    if (selectedPlayer) {
      socket.emit(eventPool.PLAYER_LEAVE, selectedPlayer.id);
    }
  };

  const handleStartNewGame = () => {
    socket.emit(eventPool.START_NEW_GAME);
    window.location.reload();
  };

  const handleGuessLetter = (letter) => {
    socket.emit(eventPool.PLAYER_GUESS, letter);
  };

  return (
    <ChakraProvider theme={theme}>
      <Center bgGradient="linear(to-r, secondary.200, secondary.600)" h="100vh">
        <Grid
          placeItems="center"
          w="full"
          h="full"
          p={10}
          bgGradient="linear(to-r, secondary.200, secondary.600)"
        >
          <VStack
            spacing={6}
            p={6}
            w="full"
            maxW="lg"
            borderWidth={2}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
          >
            <PlayerScores
              players={players}
              winners={winners}
              highscore={highscore}
              onNewGame={handleStartNewGame}
              primaryColor="brand.500"
              secondaryColor="secondary.500"
            />

            {gameOver ? (
              <Fragment/>
            ) : (
              <GameInterface
                gameOver={gameOver}
                onNewGame={handleStartNewGame}
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
                primaryColor="brand.500" // Set primary color
                secondaryColor="secondary.500" // Set secondary color
              />
            )}
          </VStack>
        </Grid>
      </Center>
    </ChakraProvider>
  );
};

export default Game;
