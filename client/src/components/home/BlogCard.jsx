import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDots } from "../../utils/common-utils";

const BlogCardStyle = styled(Card)({
  maxWidth: 285,
  maxHeight: 450,
  margin: "25px auto",
  boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  cursor: "pointer",
  // border:"2px solid red"
});





const BlogCard = ({blogId, title, description, imgUrl, author, category, date}) => {

  const navigate = useNavigate();

  const url = imgUrl ? imgUrl : 'images/default.jpg'

  return (
    // <BlogCardStyle onClick={() => navigate(`detailedBlog/${blogId}`)}>
    <BlogCardStyle >
      <CardMedia
        component="img"
        height="175"
        image={url}
        alt="green iguana"
      />
      <CardContent sx={{ p: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: "20px", fontWeight: 500 }}
        >
          {addDots(title, 50)}
        </Typography>
        <Typography sx={{fontSize: '14px', color:"#4053A0", fontWeight:600}}>
          {category}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px",
          }}
        >
          <Typography sx={{ fontSize: "12px", color: "#A8A8C7" }}>
            {author}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#A8A8C7" }}>
           {new Date(date).toDateString().split(' ').slice(1).join(' ')}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          {addDots(description, 300)}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </BlogCardStyle>
  );
};

export default BlogCard;
