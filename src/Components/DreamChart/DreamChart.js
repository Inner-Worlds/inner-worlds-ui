import React from "react";
import { useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import { GET_USER_STATS }from "../../queries";
import { Chart as chartJS } from 'chart.js/auto'


const DreamChart = () => {
    const { loading, error, data } = useQuery(GET_USER_STATS, {
      variables: {
        id: "1", // Provide the user ID here dynamically
      },
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const stats = data.user.stats;
  
    const chartData = {
      labels: [
        "Current Streak",
        "Longest Streak",
        "Dreams (Month)",
        "Dreams (Week)",
        "Total Dreams",
        "Average Lucidity",
        "Emotions",
        "Tags",
      ],
      datasets: [
        {
          label: "Statistics",
          data: [
            stats.currentStreak,
            stats.longestStreak,
            stats.dreamNumMonth,
            stats.dreamNumWeek,
            stats.totalDreams,
            stats.averageLucidity,
            stats.top5Emotions.map((emotion) => emotion.frequency),
            stats.top5Tags.map((tag) => tag.frequency),
          ],
          backgroundColor: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "aqua",
            "green",
            "blue",
          ],
          borderColor: "aqua",
          borderWidth: 2,
        },
      ],
    };
  
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
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  };
  
  export default DreamChart;