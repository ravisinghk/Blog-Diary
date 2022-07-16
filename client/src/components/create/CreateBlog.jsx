import styled from "@emotion/styled";
import { AddCircle, AddCircleOutline, Api } from "@mui/icons-material";
import { Button, InputBase, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState, useContext} from "react";
import SelectCategory from "./SelectCategory";

import { DataContext } from "../../context/DataProvider";
import {API} from "../../services/api"
import { useNavigate } from "react-router-dom";

const CreateBlogBox = styled(Box)({
  width: "80%",
  margin: "auto",
  marginTop: "100px",
  // border: "1px solid cyan",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Image = styled("img")({
  objectFit: "cover",
  width: "80%",
  maxHeight: "250px",
  height: '20%',
  // display: "none",
  // border: '1px solid green',
  alignSelf: "center",
  boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  borderRadius: "4px"
});


const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  category: '',
  createdDate: new Date(),

}

const CreateBlog = () => {

  const [post , setPost] = useState(initialPost);
  const [file, setFile] = useState('');

  const navigate = useNavigate();

  // const [imgUrl, setImgUrl] = useState("images/upload.png")
  // const iUrl = "images/upload.png";
  // const [imgUrl, setImgUrl] = useState(iUrl)


  const {accountDetails} = useContext(DataContext)

  const url = post.picture ? post.picture : "images/upload.png";

  useEffect(() => {
    const getImage = async() => {
      if(file){
        const data = new FormData();
        data.append("name", file.name)
        data.append("file", file);

        
        // API call to upload Image
        const response = await API.uploadFile(data);
        post.picture = response.data //TODO
       }
    }
    getImage();
    post.username = accountDetails.username;
    // console.log("Account Details "+ accountDetails)
    // setImgUrl(post.picture)
  }, [file])

  const handleChange = (e) => {
    setPost({...post, [e.target.name]: e.target.value  })
    // console.log(post)
  }

  const savePost = async () => {
    let response = await API.createPost(post);
    if(response.isSuccess){
      navigate('/')
      setPost(initialPost)
    }
  }


  return (
    <CreateBlogBox>
      <Image src={url} alt="" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="fileInput">
            <AddCircleOutline
              color="action"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                },
              }}
            />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          <InputBase
            placeholder="Title"
            sx={{ margin: "10px", fontSize: "20px" }}
            name="title"
            onChange = {(e) => handleChange(e)}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SelectCategory funcOnChange = {handleChange} />
          <Button variant="contained" sx={{ height: "35px" }} onClick={() => savePost()}>
          {/* <Button variant="contained" sx={{ height: "35px" }} onClick={() => console.log(post)}> */}
            Publish
          </Button>
        </Box>
      </Box>
      <TextareaAutosize
        placeholder="Tell Your Story..."
        style={{ border: "none", outline: "none", fontSize: "15px" }}
        minRows={15}
        name='description'
        onChange = {(e) => handleChange(e)}
      />
    </CreateBlogBox>
  );
};

export default CreateBlog;
