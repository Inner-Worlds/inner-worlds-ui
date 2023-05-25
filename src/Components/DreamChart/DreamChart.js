import React from "react";
import { useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import { GET_USER_STATS } from "../../queries";
import { Chart, registerables } from "chart.js";
import Astronaut from "../../assets/Astronaut - (550 x 550px).svg";
import "./DreamChart.css";

Chart.register(...registerables);

const DreamChart = ({ dreamUser }) => {
  const { loading, error, data } = useQuery(GET_USER_STATS, {
    variables: {
      id: dreamUser,
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="loading-msg">
        <span className="loading-text">Loading...</span>
      </div>
    );
  }

  const stats = data.user.stats;

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: "Livvic",
          },
          color: "#fff",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const pieEmotionsData = {
    labels: stats.top5Emotions.map((emotion) => emotion.name),
    datasets: [
      {
        data: stats.top5Emotions.map((emotion) => emotion.percent),
        backgroundColor: [
          "rgba(255, 175, 0, 0.8)",
          "rgba(211, 74, 36, 0.8)",
          "rgba(153, 40, 0, 0.8)",
          "rgba(71, 223, 209, 0.8)",
          "rgba(255, 255, 255, 0.8)",
          "rgba(65, 105, 225, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieTagsData = {
    labels: stats.top5Tags.map((tag) => tag.name),
    datasets: [
      {
        data: stats.top5Tags.map((tag) => tag.percent),
        backgroundColor: [
          "rgba(255, 175, 0, 0.8)",
          "rgba(211, 74, 36, 0.8)",
          "rgba(153, 40, 0, 0.8)",
          "rgba(71, 223, 209, 0.8)",
          "rgba(255, 255, 255, 0.8)",
          "rgba(65, 105, 225, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dream-chart-container">
      {error?.message ? (
        <div className="stats-error">Sorry! Something went wrong!</div>
      ) : (
        <>
          <img
            className="background-stats-astronaut"
            src={Astronaut}
            alt="Floating Astronaut"
          />
          <div className="stats-container">
            <div className="chart-content">
              <h2 className="list-head">Dream Stats</h2>
              <div className="number-stat">
                <div className="number-title">Current Streak:</div>
                <div className="number-value">{stats.currentStreak}</div>
              </div>
              <div className="number-stat">
                <div className="number-title">Longest Streak:</div>
                <div className="number-value">{stats.longestStreak}</div>
              </div>
              <div className="number-stat">
                <div className="number-title">Dreams This Month:</div>
                <div className="number-value">{stats.dreamNumMonth}</div>
              </div>
              <div className="number-stat">
                <div className="number-title">Dreams This Week:</div>
                <div className="number-value">{stats.dreamNumWeek}</div>
              </div>
              <div className="number-stat">
                <div className="number-title">Total Dreams:</div>
                <div className="number-value">{stats.totalDreams}</div>
              </div>
              <div className="number-stat">
                <div className="number-title">Avg Lucidity Weekly:</div>
                <div className="number-value">{stats.averageLucidity}</div>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <div className="pie-chart">
              <h3 className="top-5-header">Top 5 Emotions</h3>
              <Pie data={pieEmotionsData} options={chartOptions} />
            </div>
            <div className="pie-chart">
              <h3 className="top-5-header">Top 5 Tags</h3>
              <Pie data={pieTagsData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DreamChart;
