import React, { useRef, useEffect, useState } from "react";
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
import { getSummary } from "../../api/expensesApi";

// Chart.js components + datalabels plugin
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
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await getSummary();
      setSummary(res);
    };
    load();
  }, []);

  if (!summary) {
    return <Typography>Loading...</Typography>;
  }

  const categoryData = {
    labels: Object.keys(summary.categoryTotals),
    datasets: [
      {
        data: Object.values(summary.categoryTotals),
        backgroundColor: ["#1976d2", "#9c27b0", "#ff9800", "#4caf50", "#f44336"],
      },
    ],
  };

  const monthlyData = {
    labels: Object.keys(summary.yearlyTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(summary.yearlyTotals),
        backgroundColor: "#1976d2",
      },
    ],
  };

  const categoryOptions = {
    plugins: {
      datalabels: {
        color: "#000",
        font: { weight: "bold" },
        formatter: (value: number) => `$${value}`,
      },
      legend: { position: "bottom" },
    },
    maintainAspectRatio: false,
  };

  const monthlyOptions = {
    plugins: {
      datalabels: {
        color: "#fff",
        anchor: "center",
        align: "center",
        formatter: (value: number) => `$${value}`,
        font: { weight: "bold" },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: { usePointStyle: true, pointStyle: "rect" },
      },
    },
    maintainAspectRatio: false,
  };

  const handleGenerateReport = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#fff",
        scale: 2,
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

      <div ref={reportRef}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Spent This Month</Typography>
              <Typography variant="h3" color="error">
                ${summary.totalThisMonth}
              </Typography>
            </Paper>
          </Grid>

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
