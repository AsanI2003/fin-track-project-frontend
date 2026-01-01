import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { label: "Overview", path: "/dashboard" }, // default route
    { label: "Manage", path: "/dashboard/manage" },
    { label: "FinTrack Pro AI", path: "/dashboard/ai" },
    { label: "Log Out", path: "/" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navLinks.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.label}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/dashboard"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            FinTrack Pro
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>

      {/* Page Content */}
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Outlet /> {/* Inject Overview/Manage/AI here */}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 2,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} FinTrack Pro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
