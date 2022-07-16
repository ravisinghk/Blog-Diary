import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/api";
import { Edit, Delete } from "@mui/icons-material";
import Comments from "./comments/Comments";

const Image = styled("img")({
  objectFit: "cover",
  width: "80%",
  maxHeight: "300px",
  height: "30%",
  // display: "none",
  // border: '1px solid green',
  alignSelf: "center",
  boxShadow:
    "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  borderRadius: "4px",
});

const DetailedBlogBox = styled(Box)({
  marginTop: "75px",
  // border: "1px solid green",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
});

const BlogDetails = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px",
});

const initialBlog = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdDate: "",
};


const DetailedBlog = () => {
  const [blog, setBlog] = useState({});

  const [category, setCategory] = useState();
  const [date, setDate] = useState();

  const { accountDetails } = useContext(DataContext);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getBlogById(id);
      console.log(response);
      if (response.isSuccess) {
        setBlog(response.data);
        setCategory(response.data.category[0]);
        setDate(new Date(response.data.createdDate).toDateString().split(' ').slice(1).join(' '));
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async () => {
    let response = await API.deleteBlog(blog._id);
    if(response.isSuccess){
      navigate('/')
    }
  }

  return (
    <DetailedBlogBox>
      <Box sx={{ width: "100%" }}>
        <Image
          src={blog.picture ? blog.picture : "/images/default.jpg"}
          alt=""
        />
      </Box>

      <Box sx={{ width: "80%" }}>
        <Typography variant="h4">{blog.title}</Typography>

        {accountDetails.username === blog.username && (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
          >
            <Link to={`/update/${blog._id}`}>
              <Edit
                sx={{
                  color: "#3F88C5",
                  border: "2px solid #3F88C5",
                  borderRadius: "3px",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(104%)" },
                }}
              />
            </Link>
            <Delete
              sx={{
                color: "red",
                border: "2px solid red",
                borderRadius: "3px",
                cursor: "pointer",
                "&:hover": { transform: "scale(104%)" },
              }}
              onClick={() => deleteBlog()}
            />
          </Box>
        )}

        <BlogDetails>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Typography sx={{ color: "#586994" }}>
              <span style={{ fontWeight: 600 }}>Author:</span> {blog.username}
            </Typography>
            <Typography sx={{ color: "#586994", display: {xs: 'none', md: 'block'} }}>
              {/* <span style={{ fontWeight: 600 }}>Category:</span> {blog.category[0]} */}
              <span style={{ fontWeight: 600 }}>Category:</span> {category}
            </Typography>
          </Box>
          <Typography sx={{ color: "#586994" }}>
            {/* <span style={{ fontWeight: 600 }}>Date:</span> {blog.createdDate.split('T')[0]} */}
            {/* <span style={{ fontWeight: 600 }}>Date:</span> {new Date(blog.date).toDateString()} */}
            <span style={{ fontWeight: 600 }}>Date:</span> {date}
          </Typography>
        </BlogDetails>
      </Box>
      <Box sx={{ width: "80%", marginBottom: "40px" }}>
        <Typography sx={{ textAlign: "left", color: "#5E7F82" }}>
          {blog.description}
        </Typography>
      </Box>


      <Comments blog={blog} />

    </DetailedBlogBox>
  );
};

export default DetailedBlog;
