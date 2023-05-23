import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import { GET_USER_STATS } from "../../queries";
import Chart from "chart.js/auto";

const DreamChart = ({ dreamStats }) => {
  const { loading, error, data } = useQuery(GET_USER_STATS, {
    variables: {
      id: dreamStats
    },
  });

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!loading && !error) {
      const stats = data.user.stats;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "My Dataset",
              data: [10, 20, 30, 40, 50, 60],
            },
          ],
        },
        options: {},
      });

      chartInstanceRef.current = chartInstance;
    }
  }, [loading, error, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const stats = data.user.stats;
  console.log("hi", data.user.stats);

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            family: "'Livvic', sans-serif",
            size: 12,
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
    <div
      className="dream-chart-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="dream-chart"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60vh",
          width: "60vw",
          overflow: "hidden",
          position: "relative",
          background: "rgba(255, 255, 255, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxSizing: "border-box",
          color: "white",
          textShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
        }}
      >
        <div
          style={{
            "--card-font-size": "clamp(1rem, 2vw, 2rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80%",
            width: "80%",
            fontFamily: "'Livvic', sans-serif",
          }}
        >
          <h2
            className="list-head"
            style={{
              fontFamily: "Yellowtail, cursive",
              fontSize: `clamp(1.5rem, 6vw, 4rem)`,
            }}
          >
            Dream Stats
          </h2>
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
        <div
          className="chart-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <div className="pie-chart">
            <h3>Top 5 Emotions</h3>
            <Pie data={pieEmotionsData} options={pieOptions} />
          </div>
          <div className="pie-chart">
            <h3>Top 5 Tags</h3>
            <Pie data={pieTagsData} options={pieOptions} />
          </div>
        </div>
        <div>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default DreamChart;
