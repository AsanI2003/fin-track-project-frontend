import React, { useRef } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import html2canvas from "html2canvas";

// Register Chart.js components + datalabels plugin
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const Overview = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const categoryData = {
    labels: ["Food", "Housing", "Transport", "Healthcare", "Misc"],
    datasets: [
      {
        data: [300, 500, 200, 100, 150],
        backgroundColor: ["#1976d2", "#9c27b0", "#ff9800", "#4caf50", "#f44336"],
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses",
        data: [400, 600, 300, 700, 500],
        backgroundColor: "#1976d2",
      },
    ],
  };

  // Options for Doughnut chart
  const categoryOptions = {
    plugins: {
      datalabels: {
        color: "#000",
        font: { weight: "bold" },
        formatter: (value: number) => `$${value}`,
      },
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  // Options for Bar chart (labels inside bars)
  const monthlyOptions = {
    plugins: {
      datalabels: {
        color: "#fff", // white text inside blue bars
        anchor: "center",
        align: "center",
        formatter: (value: number) => `$${value}`,
        font: {
          weight: "bold",
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Capture screenshot of body area
  const handleGenerateReport = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#fff", // ensures white background
        scale: 2, // higher resolution
      });
      const link = document.createElement("a");
      link.download = "fintrack-report.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      {/* Body area to capture */}
      <div ref={reportRef}>
        <Grid container spacing={3}>
          {/* Spent This Month - full width */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Spent This Month</Typography>
              <Typography variant="h3" color="error">
                $800
              </Typography>
            </Paper>
          </Grid>

          {/* Doughnut chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                This Month Expenses by Category
              </Typography>
              <Box sx={{ height: 400 }}>
                <Doughnut data={categoryData} options={categoryOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Bar chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Yearly Expenses Overview
              </Typography>
              <Box sx={{ height: 400 }}>
                <Bar data={monthlyData} options={monthlyOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {/* Generate Report Button */}
      <Box sx={{ textAlign: "right", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Box>
    </Box>
  );
};

export default Overview;
