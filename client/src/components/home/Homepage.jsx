import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import BlogFeed from "./BlogFeed";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import CreateBlog from "../create/CreateBlog"
import { useNavigate } from "react-router-dom";

const MainContentBox = styled(Box)({
  display: "flex",
  width: "100%",
  marginTop:"50px"
});

const Homepage = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout( () => navigate('/login') , 900000);

  // }, [])
  

  return (
    <Box sx={{ height: "100%", width: "100%" }}>

    {/* this is Create Blog box */}
        {/* <CreateBlog /> */}
      {/* this box is the Entry box */}
      <MainContentBox>
        <BlogFeed />
        <SideBar />
      </MainContentBox>
    </Box>
  );
};

export default Homepage;
