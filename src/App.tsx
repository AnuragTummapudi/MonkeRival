import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Type, Users, UserPlus, Trophy } from 'lucide-react';
import TypingTest from './components/TypingTest';
import RaceMode from './components/RaceMode';

function App() {
  const [mode, setMode] = useState<'time' | 'words' | 'quote' | 'custom' | 'race' | 'friend'>('time');
  const [timeLimit, setTimeLimit] = useState<number>(30);

  return (
    <div className="min-h-screen bg-[#232323] text-gray-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">MonkeRival</span>
          </div>
          <nav className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'time' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMode('time')}
            >
              <Timer className="w-4 h-4 inline-block mr-2" />
              Time
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'race' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMode('race')}
            >
              <Users className="w-4 h-4 inline-block mr-2" />
              Race
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'friend' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMode('friend')}
            >
              <UserPlus className="w-4 h-4 inline-block mr-2" />
              Friend
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {mode === 'time' && (
          <div className="flex justify-center space-x-4 mb-8">
            {[15, 30, 60, 120].map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeLimit === time ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                onClick={() => setTimeLimit(time)}
              >
                {time}s
              </motion.button>
            ))}
          </div>
        )}

        {mode === 'time' && <TypingTest mode={mode} timeLimit={timeLimit} />}
        {(mode === 'race' || mode === 'friend') && <RaceMode mode={mode} />}
      </main>
    </div>
  );
}

export default App;