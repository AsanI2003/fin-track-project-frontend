import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/HomeLayout";
import { Box, CircularProgress } from "@mui/material";
import PrivateRoute from "../components/PrivateRoute";

// Public pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/home/About"));
const Contact = lazy(() => import("../pages/home/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// Dashboard pages
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Overview = lazy(() => import("../pages/dashboard/Overview"));
const Manage = lazy(() => import("../pages/dashboard/Manage"));
const FinTrackAI = lazy(() => import("../pages/dashboard/FinTrackAI"));

const Index = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        }
      >
        <Routes>
          {/* Routes that use HomeLayout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Overview />} />{" "}
            {/* default dashboard page */}
            <Route path="manage" element={<Manage />} />
            <Route path="ai" element={<FinTrackAI />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Index;
