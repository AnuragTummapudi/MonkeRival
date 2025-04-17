import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sampleText = `The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.`;

const TypingTest = ({ timeLimit = 30 }) => {
  const [words] = useState(sampleText.split(' '));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [lockedWords, setLockedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTestCompletion();
    }
  }, [isTestRunning, timeLeft]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const currentWord = words[currentWordIndex];

    if (value.endsWith(' ')) {
      // Submit the current word
      setLockedWords((prev) => [
        ...prev,
        { word: currentWord, input: currentInput.trim() },
      ]);
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentInput('');
      if (currentInput.trim() !== currentWord) {
        setMistakes((prev) => prev + 1);
      }
    } else {
      setCurrentInput(value);
    }
  };

  const handleTestStart = () => {
    setIsTestRunning(true);
  };

  const handleTestCompletion = () => {
    const totalWords = lockedWords.length;
    const correctWords = lockedWords.filter(
      (entry) => entry.word === entry.input
    ).length;
    const accuracy = Math.round((correctWords / totalWords) * 100);
    const wpm = Math.round((totalWords / timeLimit) * 60);

    navigate('/results', {
      state: {
        wpm,
        accuracy,
        mistakes,
        time: timeLimit,
        graphData: Array.from({ length: timeLimit }, (_, i) => (i + 1) * (wpm / timeLimit)),
      },
    });
  };

  const renderWordFeedback = (word, input) => {
    const feedback = [];
    const maxLength = Math.max(word.length, input.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < input.length && i < word.length) {
        feedback.push(
          <span
            key={i}
            className={input[i] === word[i] ? 'text-green-500' : 'text-red-500'}
          >
            {input[i]}
          </span>
        );
      } else if (i < input.length) {
        feedback.push(
          <span key={i} className="text-red-500">
            {input[i]}
          </span>
        );
      } else {
        feedback.push(
          <span key={i} className="text-gray-500">
            {word[i]}
          </span>
        );
      }
    }

    return feedback;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-8 shadow-xl"
      >
        {!isTestRunning ? (
          <div className="text-center">
            <button
              onClick={handleTestStart}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Start Test
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <div className="text-2xl font-bold text-blue-500">
                Time Left: {timeLeft}s
              </div>
              <div className="text-gray-400">
                Mistakes: {mistakes}
              </div>
            </div>

            <div className="font-mono text-lg leading-relaxed">
              {words.map((word, index) => (
                <span key={index} className="mr-2">
                  {index < currentWordIndex
                    ? renderWordFeedback(word, lockedWords[index]?.input || '')
                    : index === currentWordIndex
                    ? renderWordFeedback(word, currentInput)
                    : word}
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full mt-4 p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              value={currentInput}
              onChange={handleInputChange}
              disabled={timeLeft === 0}
              placeholder={
                timeLeft === 0 ? 'Test completed!' : 'Type here...'
              }
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TypingTest;