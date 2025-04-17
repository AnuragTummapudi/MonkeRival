import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypingTestProps {
  mode: 'time' | 'words' | 'quote' | 'custom';
  timeLimit: number;
}

const sampleText = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.";

const TypingTest: React.FC<TypingTestProps> = ({ mode, timeLimit }) => {
  const [text, setText] = useState(sampleText.split(''));
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const calculateWPM = useCallback(() => {
    if (!startTime) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = input.length / 5; // assuming average word length of 5 characters
    return Math.round(wordsTyped / timeElapsed);
  }, [startTime, input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (e.key === text[currentIndex]) {
      setInput(prev => prev + e.key);
      setCurrentIndex(prev => prev + 1);
    } else {
      setMistakes(prev => prev + 1);
    }
  }, [currentIndex, text, startTime]);

  useEffect(() => {
    if (startTime && !isFinished) {
      const interval = setInterval(() => {
        setWpm(calculateWPM());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isFinished, calculateWPM]);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-8 shadow-xl"
      >
        <div className="mb-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-500">{wpm} WPM</div>
          <div className="text-gray-400">Accuracy: {Math.max(0, Math.round((input.length - mistakes) / Math.max(input.length, 1) * 100))}%</div>
        </div>

        <div className="font-mono text-lg leading-relaxed relative">
          <div className="absolute inset-0 pointer-events-none">
            {text.map((char, index) => (
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
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TypingTest;