import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { DreamData } from "../../DreamData";
import { Chart as chartJS } from 'chart.js/auto'

const DreamChart = () => {
  const [dreamData, setDreamData] = useState({
    labels: DreamData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: DreamData.map((data) => data.userGain),
        backgroundColor: ["white", "aqua"],
        borderColor: "white", // Set line color to white
        borderWidth: 2, // Increase line width
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Set legend text color to white
          font: {
            weight: "bold", // Make legend text bold
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white", // Set y-axis tick text color to white
          font: {
            weight: "bold", // Make y-axis tick text bold
          },
        },
      },
      x: {
        ticks: {
          color: "white", // Set x-axis tick text color to white
          font: {
            weight: "bold", // Make x-axis tick text bold
          },
        },
      },
    },
  };

  return (
    <div
      className="dream-chart"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50%",
          width: "60%",
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
        <Line data={dreamData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DreamChart;
