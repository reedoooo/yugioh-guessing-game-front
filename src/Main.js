import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Game = () => {
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [revealedWord, setRevealedWord] = useState([]);
  const [turnId, setTurnId] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winnerNames, setWinnerNames] = useState('');
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    const newSocket = io(process.env.PORT); // Connect to the server
    setSocket(newSocket);

    // Event listeners for server events
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('PLAYER_JOIN', player => {
      setPlayers(prevPlayers => [...prevPlayers, player]);
    });

    newSocket.on('UPDATE_PLAYER', updatedPlayer => {
      setPlayers(prevPlayers =>
        prevPlayers.map(player => {
          if (player.id === updatedPlayer.id) {
            return updatedPlayer;
          }
          return player;
        })
      );
    });

    newSocket.on('GAME_START', payload => {
      setRevealedWord(payload.revealedWord);
      setTurnId(payload.turnId);
    });

    newSocket.on('PLAYER_GUESS', message => {
      console.log(message);
    });

    newSocket.on('PLAYER_SCORE', payload => {
      console.log(payload);
    });

    newSocket.on('GAME_OVER', ({ winners, highscore }) => {
      setGameOver(true);
      setWinnerNames(winners.map(winner => winner.name).join(', '));
      setHighscore(highscore);
    });

    return () => {
      newSocket.disconnect(); // Clean up the socket connection
    };
  }, []);

  const handleJoinGame = () => {
    socket.emit('PLAYER_JOIN', { name: playerName });
  };

  const handleGuessLetter = letter => {
    socket.emit('PLAYER_GUESS', letter);
  };

  return (
    <div>
      {gameOver ? (
        <div>
          <h1>Game Over!</h1>
          <p>
            Winners are {winnerNames} with {highscore} points!
          </p>
        </div>
      ) : (
        <div>
          <h1>Word Guessing Game</h1>
          <h2>Turn: {turnId}</h2>
          <p>Revealed Word: {revealedWord.join(' ')}</p>
          <input
            type="text"
            placeholder="Your Name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
          <button onClick={handleJoinGame}>Join Game</button>
          <h3>Players:</h3>
          <ul>
            {players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          <h3>Guess a Letter:</h3>
          <button onClick={() => handleGuessLetter('A')}>A</button>
          <button onClick={() => handleGuessLetter('B')}>B</button>
          <button onClick={() => handleGuessLetter('C')}>C</button>
          {/* ... Other letters */}
        </div>
      )}
    </div>
  );
};

export default Game;
