import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import React from "react";
import { useState, useContext } from "react";
import Password from "./Password";

// import { API } from '../../service/api';
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { useEffect } from "react";

const LoginMainBox = styled(Box)({
  margin: "6.25% auto",

  maxWidth: 750,
  width: "80%",
  height: "75%",
  maxHeight: "450px",
  display: "flex",
  // border: "3px solid green",
  alignItems: "center",
  // boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
});

const ImageBox = styled(Box)({
  flexGrow: "1",
  height: "100%",
  width: "350px",
});

const Image = styled("img")({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

const Error = styled(Typography)({
  color: "red",
  fontSize: "10px",
  lineHeight: "0",
  marginTop: "10px",
  fontWeight: "600",
});

const InfoBox = styled(Box)({
  flexGrow: "3",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  backgroundColor: theme.palette.secondary.main,
  //   border: "3px solid red",
  padding: "0px 30px",
});

const ButtonBox = styled(Box)({
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  // border: "3px solid yellow",
});

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [account, setAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setAccountDetails } = useContext(DataContext);

  const toggleAccount = () => {
    account === "login" ? setAccount("signup") : setAccount("login");
  };

  const onInputChange = (e) => {
    account === "login"
      ? setLogin({ ...login, [e.target.name]: e.target.value.trim() })
      : setSignup({ ...signup, [e.target.name]: e.target.value.trim() });
  };

  const getPassword = (pass) => {
    account === "login"
      ? setLogin({ ...login, password: pass })
      : setSignup({ ...signup, password: pass });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    console.log(response);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      setLogin(loginInitialValues);
      setAccount("login");
    } else {
      setError("Something Went Wrong! Please Try Again");
      console.log("Something Went Wrong! Please Try Again");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    console.log("mkjiiok "+ response)
    if (response.isSuccess) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccountDetails({
        username: response.data.username,
        name: response.data.name,
      });

      isUserAuthenticated(true);

      navigate("/");
    } 
    else {
      setError("Something Went Wrong! Please Try Again");
    }

  };

  // useEffect(() => {
  //  setError("vfhev") 
  // })

  return (
    <LoginMainBox>
      <ImageBox sx={{display: { xs: "none", md: "block" } }} >
        <Image alt="Image" src="images/entry.jpeg" />
      </ImageBox>

      <InfoBox>
        {account === "login" ? (
          <>
            <Box
              sx={{
                flexGrow: "2",
                display: "flex",
                flexDirection: "column",
                // border: "3px solid blue",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                label="Username"
                color="primary"
                name="username"
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              />
              <Password getPassword={getPassword} />
            </Box>

            <ButtonBox>
              <Error>{error}</Error>
              <Button variant="contained" onClick={() => loginUser()}>
                Login
              </Button>
              <Typography variant="p">OR</Typography>
              <Button variant="outlined" onClick={() => toggleAccount()}>
                Don't have an account
              </Button>
            </ButtonBox>
          </>
        ) : (
          <>
            <Box
              sx={{
                flexGrow: "2",
                display: "flex",
                flexDirection: "column",
                // border: "3px solid blue",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                label="Name"
                color="primary"
                name="name"
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              />
              <TextField
                label="Username"
                color="primary"
                name="username"
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              />
              <Password getPassword={getPassword} />
            </Box>

            <ButtonBox>
              {error !== "" && <Error>{error}</Error>}
              <Button variant="contained" onClick={() => signupUser()}>
                Register
              </Button>
              <Typography variant="p">OR</Typography>
              <Button variant="outlined" onClick={() => toggleAccount()}>
                Already have an account
              </Button>
            </ButtonBox>
          </>
        )}
      </InfoBox>
    </LoginMainBox>
  );
};

export default Login;
