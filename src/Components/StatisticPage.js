import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const StatisticsPage = ({ accountId }) => {
  const sessionId = localStorage.getItem("session_id");

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Character Scores",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [pieChart, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Character Scores",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "pink"],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/account/${accountId.accountId}`)
      .then((response) => {
        const characters = response?.data?.characters || [];
        if (Array.isArray(characters)) {
          const labels = characters.map((char) => char?.character?.class_name || "Unknown");
          const scores = characters.map((char) => char?.score?.reward_score || 0);

          setBarChartData({
            labels,
            datasets: [
              {
                label: "Character Scores",
                data: scores,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "pink"],
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });

          setPieChartData({
            labels,
            datasets: [
              {
                label: "Character Scores",
                data: scores,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "pink"],
                hoverOffset: 4,
              },
            ],
          });
        } else {
          console.error("Characters is not an array or is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, [accountId]);

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adjust dynamically
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, fontSize: { xs: "1.5rem", md: "2rem" } }}
      >
        Statistics Dashboard
      </Typography>

      {/* Statistic Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          { title: "Total Score", value: "1,024", change: "+12% since last month" },
          { title: "Monthly Revenue", value: "$45,000", change: "+8% since last month" },
          { title: "New Signups", value: "320", change: "+5% since last week" },
          { title: "Active Sessions", value: "82", change: "-3% since last week" },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ height: { xs: "300px", md: "400px" } }}>
              <Typography variant="h6" gutterBottom>
                Character Scores
              </Typography>
              <Box sx={{ height: "100%" }}>
                <Bar data={barChartData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ height: { xs: "500px", md: "400px" } }}>
              <Typography variant="h6" gutterBottom>
                Category Distribution
              </Typography>
              <Box sx={{ height: "100%" }}>
                <Pie data={pieChart} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;
