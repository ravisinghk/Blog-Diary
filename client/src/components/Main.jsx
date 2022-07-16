import { Box } from "@mui/material";
import React from "react";
import Login from "./auth/Login";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Homepage from "./home/Homepage";
import NavBar from "./home/NavBar";

const Main = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Homepage />
    </Box>
  );
};

export default Main;
