import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Welcome to FinTrack Pro
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Your smart companion for managing expenses.
        </Typography>

        {/* Login / Register Buttons */}
        <Box mt={3}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mr: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Feature Tiles Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                📊 Track Expenses
              </Typography>
              <Typography color="text.secondary">
                Record daily expenses to see where your money goes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                📈 Reports & Insights
              </Typography>
              <Typography color="text.secondary">
                Visualize your spending habits with charts and reports to make
                better decisions for future expenses.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
