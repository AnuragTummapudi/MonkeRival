import React from "react";
import { Line } from "react-chartjs-2";

const ResultsPage = ({ stats }) => {
  const { wpm, accuracy, raw, characters, consistency, time, graphData } = stats;

  const chartData = {
    labels: Array.from({ length: graphData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Words per Minute',
        data: graphData,
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Time (seconds)' } },
      y: { title: { display: true, text: 'WPM' } },
    },
  };

  return (
    <div className="results-page">
      <h1>Typing Test Results</h1>
      <div className="stats">
        <p><strong>WPM:</strong> {wpm}</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Raw:</strong> {raw}</p>
        <p><strong>Characters:</strong> {characters}</p>
        <p><strong>Consistency:</strong> {consistency}%</p>
        <p><strong>Time:</strong> {time}s</p>
      </div>
      <div className="graph">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ResultsPage;
