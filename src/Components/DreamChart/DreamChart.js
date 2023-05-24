import React from "react";
import { useQuery } from "@apollo/client";
import {  Pie } from "react-chartjs-2";
import { GET_USER_STATS } from "../../queries";
import { Chart, registerables } from 'chart.js'
import './DreamChart.css'

Chart.register(...registerables)


const DreamChart = ({ dreamUser }) => {
  const { loading, error, data } = useQuery(GET_USER_STATS, {
    variables: {
      id: dreamUser,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const stats = data.user.stats;
  console.log(data.user.stats)

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  const pieEmotionsData = {
    labels: stats.top5Emotions.map((emotion) => emotion.name),
    datasets: [
      {
        data: stats.top5Emotions.map((emotion) => emotion.frequency),
        backgroundColor: ["#FFAF00", "#D34A24", "#992800", "#47DFD1", "white"],
        borderWidth: 1,
      },
    ],
  };

  const pieTagsData = {
    labels: stats.top5Tags.map((tag) => tag.name),
    datasets: [
      {
        data: stats.top5Tags.map((tag) => tag.frequency),
        backgroundColor: ["#FFAF00", "#D34A24", "#992800", "#47DFD1", "white"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dream-chart-container">
      <div className="dream-chart">
        <div className="chart-content">
          <h2 className="list-head">Dream Stats</h2>
          <div className="number-stat">
            <div className="number-title">Current Streak</div>
            <div className="number-value">{stats.currentStreak}</div>
          </div>
          <div className="number-stat">
            <div className="number-title">Longest Streak</div>
            <div className="number-value">{stats.longestStreak}</div>
          </div>
          <div className="number-stat">
            <div className="number-title">Dreams (Month)</div>
            <div className="number-value">{stats.dreamNumMonth}</div>
          </div>
          <div className="number-stat">
            <div className="number-title">Dreams (Week)</div>
            <div className="number-value">{stats.dreamNumWeek}</div>
          </div>
          <div className="number-stat">
            <div className="number-title">Total Dreams</div>
            <div className="number-value">{stats.totalDreams}</div>
          </div>
          <div className="number-stat">
            <div className="number-title">Average Lucidity</div>
            <div className="number-value">{stats.averageLucidity}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="pie-chart">
            <h3>Top 5 Emotions</h3>
            <Pie data={pieEmotionsData} options={chartOptions} />
          </div>
          <div className="pie-chart">
            <h3>Top 5 Tags</h3>
            <Pie data={pieTagsData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );  
};

export default DreamChart;
