import React, { useState } from 'react';
import ResultsPage from './components/ResultsPage';
import TypingTest from './components/TypingTest';

function App() {
    const [testCompleted, setTestCompleted] = useState(false);
    const [stats, setStats] = useState(null);

    const handleTestCompletion = (results) => {
        setStats(results);
        setTestCompleted(true);
    };

    return (
        <div className="App">
            {testCompleted ? (
                <ResultsPage stats={stats} />
            ) : (
                <TypingTest onComplete={handleTestCompletion} />
            )}
        </div>
    );
}

export default App;