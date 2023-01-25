// React hooks
import React, { useState, useEffect } from "react";

// React router dom
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

//Framer motion
import { AnimatePresence, motion } from "framer-motion";

//Libraries
import Cookies from "js-cookie";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

//Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/readex-pro/600.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

//Views
import Home from "./Components/Views/Home/Home";
import Signin from "./Components/Views/Auth/Sign in/SignIn";
import Signup from "./Components/Views/Auth/Sign up/SignUp";
import Dashboard from "./Components/Views/Dashboard/Dashboard";
import Error404 from "./Components/Views/Error 404/Error404";
import ExploresPalettes from "./Components/Views/Explore Palettes/ExplorePalettes";
import FavoritesPalettes from "./Components/Views/Favorites Palettes/FavoritesPalettes";
import GeneratorView from "./Components/Views/GeneratorView/GeneratorView";
import ProfileView from "./Components/Views/ProfileView/ProfileView";
import UpdateProfile from "./Components/Views/UpdateProfile/UpdateProfile";

//Components
import PrimarySearchAppBar from "../src/Components/Header/AppBar";

const RequireAuth = ({ children }) => {
  if (!Cookies.get("we_color_token")) {
    return <Navigate to="/signin" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },

  out: {
    opacity: 0,
  },
};

const App = () => {
  const [darkmode, setDarkMode] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();

  const theme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
    typography: {
      fontFamily: "readex-pro/600.css",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <PrimarySearchAppBar
          check={darkmode}
          change={() => {
            setDarkMode(!darkmode);
          }}
        />
        <Sidebar
          backgroundColor={darkmode ? "#313638" : "#E8E9EB"}
          style={{ height: "100vh" }}
        >
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
              <h2>Options</h2>
            </MenuItem>
          </Menu>
        </Sidebar>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              index
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            ></Route>
            <Route
              path="/signin"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Signin />
                </motion.div>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Signup />
                </motion.div>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <motion.div
                    className="page"
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={pageTransition}
                  >
                    <Dashboard />
                  </motion.div>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="*"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Error404 />
                </motion.div>
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <ExploresPalettes />
                </motion.div>
              }
            ></Route>
            <Route
              path="/favorites"
              element={
                <RequireAuth>
                  <motion.div
                    className="page"
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={pageTransition}
                  >
                    <FavoritesPalettes />
                  </motion.div>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="generator"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <GeneratorView />
                </motion.div>
              }
            ></Route>
            <Route
              path="/profileview"
              element={
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <ProfileView />
                </motion.div>
              }
            ></Route>
            <Route
              path="/updateprofile"
              element={
                <RequireAuth>
                  <motion.div
                    className="page"
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={pageTransition}
                  >
                    <UpdateProfile />
                  </motion.div>
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};

export default App;
