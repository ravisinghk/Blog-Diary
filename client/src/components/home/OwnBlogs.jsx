import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { API } from "../../services/api";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";



const Image = styled("img")({
  objectFit: "cover",
  margin: '7vh auto 3px auto',
  width:"80%",
  heigth: "100%"
  
});

const OwnBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const {accountDetails} = useContext(DataContext)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllBlogs({category : category || ''});
      if (response.isSuccess) {
        setBlogs(response.data);
      }
    };

    fetchData();
    console.log(blogs);
  }, [category]);

  const checkIfOwn = (blog) => {
    return blog.username === accountDetails.username
    // return blog.username === 'ravisingh'
  }

  return (
    <Box sx={{ flexGrow: "2",marginTop:"50px" }}>
      <Grid container spacing={2} >
        {blogs && blogs.length > 0 ? (
          blogs.filter(checkIfOwn).map((blog) => (
              <Grid item xs={12} md={6} lg={4} sx={{width: "100%", margin: 'auto'}}>
            <Link to={`/detailedBlog/${blog._id}`} style={{textDecoration: 'none', }}>
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  imgUrl={blog.picture}
                  author={blog.username}
                  category={blog.category[0]}
                  date={blog.createdDate.split("T")[0]}
                  // to={`detailedBlog/${blog._id}`} style={{textDecoration: 'none', }}
                  // onClick={() => navigate(`/detailedBlog/${blog._id}`)}
                />
            </Link>
              </Grid>
          ))
        ) : (
          <Grid item xs={6}  sx={{margin:"auto"}}>
            <Image src="images/blank.png" alt="" />
            <Typography sx={{color: "grey"}}>Nothing To Show</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OwnBlogs;
