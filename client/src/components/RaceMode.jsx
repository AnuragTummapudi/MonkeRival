import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

function RaceMode({ mode }) {
  const [socket, setSocket] = useState(null);
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('waiting');
  const [countdown, setCountdown] = useState(3);
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('playerJoined', (players) => {
      setPlayers(players);
    });

    newSocket.on('gameStart', ({ text }) => {
      setText(text);
      setGameState('countdown');
    });

    newSocket.on('updateProgress', ({ playerId, progress, wpm }) => {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, progress, wpm } : p
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (gameState === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setGameState('racing');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleJoinRoom = () => {
    if (socket) {
      const code = mode === 'friend' ? roomCode : uuidv4();
      socket.emit('joinRoom', { roomCode: code });
    }
  };

  const handleKeyDown = (e) => {
    if (gameState !== 'racing') return;

    if (e.key === text[currentIndex]) {
      setInput((prev) => prev + e.key);
      setCurrentIndex((prev) => prev + 1);
      
      const progress = ((currentIndex + 1) / text.length) * 100;
      socket?.emit('progress', { progress });

      if (currentIndex + 1 === text.length) {
        socket?.emit('finished');
        setGameState('finished');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-8 shadow-xl"
      >
        {gameState === 'waiting' && (
          <div className="text-center">
            {mode === 'friend' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Enter room code"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                />
                <button
                  onClick={handleJoinRoom}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Join Room
                </button>
              </div>
            ) : (
              <button
                onClick={handleJoinRoom}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Find Opponent
              </button>
            )}
          </div>
        )}

        {gameState === 'countdown' && (
          <div className="text-center">
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-6xl font-bold text-blue-500"
            >
              {countdown}
            </motion.div>
          </div>
        )}

        {(gameState === 'racing' || gameState === 'finished') && (
          <>
            <div className="mb-8">
              {players.map((player, index) => (
                <div key={player.id} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Player {index + 1}</span>
                    <span className="text-blue-500">{player.wpm} WPM</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${player.progress}%` }}
                      animate={{ width: `${player.progress}%` }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="font-mono text-lg leading-relaxed relative">
              <div className="absolute inset-0 pointer-events-none">
                {text.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${
                      index < currentIndex
                        ? 'text-green-500'
                        : index === currentIndex
                        ? 'text-blue-500 border-l-2 border-blue-500 animate-pulse'
                        : 'text-gray-500'
                    }`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <textarea
                className="w-full h-32 bg-transparent text-transparent caret-blue-500 resize-none focus:outline-none"
                onKeyDown={handleKeyDown}
                value={input}
                onChange={() => {}}
                autoFocus
                disabled={gameState === 'finished'}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default RaceMode;