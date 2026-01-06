import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/HomeLayout";
import { Box, CircularProgress } from "@mui/material";
import PrivateRoute from "../components/PrivateRoute";


const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/home/About"));
const Contact = lazy(() => import("../pages/home/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

//dashboard pages
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Overview = lazy(() => import("../pages/dashboard/Overview"));
const Manage = lazy(() => import("../pages/dashboard/Manage"));
const FinTrackAI = lazy(() => import("../pages/dashboard/FinTrackAI"));
const BillsGallery = lazy(() => import("../pages/dashboard/BillGallery"));

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
      
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Overview />} />{" "}
         
            <Route path="manage" element={<Manage />} />
            <Route path="ai" element={<FinTrackAI />} />
            <Route path="bills" element={<BillsGallery />} />
          
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Index;
