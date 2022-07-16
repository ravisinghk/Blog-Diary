import styled from "@emotion/styled";
import {
  AlternateEmail,
  Category,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { categories } from "../../constants/catData";
import theme from "../../theme";
import Categories from "./Categories";
import MUILink from '@mui/material/Link';
import {Link } from 'react-router-dom'

const Image = styled("img")({
  objectFit: "cover",
  width: "150px",
  height: "150px",
  borderRadius: "5px",
});

const SideBarBox = styled(Box)(({ theme }) => ({
  minWidth: "250px",
  width: "20%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  backgroundColor: theme.palette.secondary.main,
  // border: "1px solid green",
  minHeight:"90.98vh"
}));

const SideBarInnerBox = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "17px",
  position: "fixed",
  margin: "20px",
  // marginTop: "15px",
  // border: "1px solid blue"
});

const AboutTitle = styled(Typography)({
  borderTop: "1px solid #A8A8C7",
  borderBottom: "1px solid #A8A8C7",
  width: "60%",
  margin: "10px auto",
});

const CategoryTitle = styled(Typography)({
  borderTop: "1px solid #A8A8C7",
  borderBottom: "1px solid #A8A8C7",
  marginBottom: "10px",
});

const SideBar = () => {
  return (
    <SideBarBox>
      <SideBarInnerBox>
        <Box sx={{ width: "95%" }}>
          <CategoryTitle>Categories</CategoryTitle>
          <Categories />
        </Box>

        <Box sx={{ width: "70%", marginTop: "10px" }}>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button variant="contained" size="small">
              Write a Blog
            </Button>
          </Link>
          <Link to='myblogs' style={{textDecoration:"none"}}>
            <Button variant="outlined" size="small" sx={{ mt: 2 }}>
              View My Blogs
            </Button>
          </Link>
        </Box>

        <Box sx={{ width: "90%", mt: 5 }}>
          <Typography
            sx={{
              borderTop: "1px solid #A8A8C7",
              borderBottom: "1px solid #A8A8C7",
            }}
          >
            Contact Developer
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              mt: 1,
              
            }}
          >
            <MUILink
              href="https://github.com/ravisinghk"
              target="_blank"
              sx={{color: "black"}}
            >
             <GitHub sx={{ cursor: "pointer" }} /> 
            </MUILink>
            <MUILink
              href="https://www.linkedin.com/in/ravisingh-kushwah-3383861b5/"
              target="_blank"
              sx={{color: "black"}}
            >
             <LinkedIn sx={{ cursor: "pointer" }} /> 
            </MUILink>
            <MUILink
              href="mailto: ravisinghkushwah27@gmail.com"
              target="_blank"
              sx={{color: "black"}}
            >
             <AlternateEmail sx={{ cursor: "pointer" }} />
            </MUILink>
            
            
          </Box>
        </Box>
      </SideBarInnerBox>
    </SideBarBox>
  );
};

export default SideBar;
