import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { palette } from "@mui/system";
import "./App.css";
import Login from "./components/auth/Login";
import Main from "./components/Main";
import DataProvider from "./context/DataProvider";
import theme from "./theme";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/home/NavBar";
import CreateBlog from "./components/create/CreateBlog";
import DetailedBlog from "./components/Details/DetailedBlog";
import UpdateBlog from "./components/create/UpdateBlog";
import OwnBlogs from "./components/home/OwnBlogs";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DataProvider>
          <div className="App" style={{height: "85vh"}}>
          
            <Routes>
              <Route
                path="/login"
                element={<Login isUserAuthenticated={isUserAuthenticated} />}
              />

              <Route
                path="/"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                }
              >
                <Route
                  path="/"
                  element={<Main />}
                />

              </Route>

              <Route
                path="/create"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                }
              >
                <Route
                  path="/create"
                  element={<CreateBlog/>}
                />

              </Route>

              <Route
                path="/detailedBlog/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                }
              >
                <Route
                  path="/detailedBlog/:id"
                  element={<DetailedBlog/>}
                />

              </Route>


              <Route
                path="/update/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                }
              >
                <Route
                  path="/update/:id"
                  element={<UpdateBlog/>}
                />

              </Route>

              <Route
                path="/myblogs"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} />
                }
              >
                <Route
                  path="/myblogs"
                  element={<OwnBlogs/>}
                />

              </Route>

            </Routes>
          </div>
        </DataProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
