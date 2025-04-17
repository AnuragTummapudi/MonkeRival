import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingTest from './components/TypingTest';
import ResultsPage from './components/ResultsPage';
import Login from './components/login';

function App() {
  const [timeLimit, setTimeLimit] = useState(30);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#232323] text-gray-200 flex flex-col">
              {/* Header */}
              <header className="border-b border-gray-700 p-4">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">MonkeRival</span>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex justify-center space-x-4 mb-8">
                  {[15, 30, 60, 120].map((time) => (
                    <button
                      key={time}
                      className={`px-4 py-2 rounded-lg ${
                        timeLimit === time
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                      onClick={() => setTimeLimit(time)}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
                <TypingTest timeLimit={timeLimit} />
              </main>
            </div>
          }
        />
        <Route
          path="/resultspage"
          element={
            <div className="min-h-screen bg-[#232323] text-gray-200 flex flex-col">
              <header className="border-b border-gray-700 p-4">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">MonkeRival</span>
                  </div>
                </div>
              </header>
              <main className="flex-1 container mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
                  <ResultsPage />
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;