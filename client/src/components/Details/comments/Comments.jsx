import styled from "@emotion/styled";
import { AddComment, Delete } from "@mui/icons-material";
import { Avatar, Button, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from '../../../services/api'
import theme from "../../../theme";

const CommentsSection = styled(Box)({
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:"flex-start",
  width:"90%", 
  // border:"1px solid red",
  marginBottom: "40px",
  gap:"30px",
  height: "auto"

})

const AddCommentBox = styled(Box)({
  display: "flex",
  justifyContent:"space-between",
  alignItems: 'center',
  // border: "1px solid green",
  width: '90%',
  backgroundColor: "#CAEBF2",
  height:"65px",
  padding:"0px 15px",
  borderRadius: "5px"
})


const CommentsList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap:"30px",
  justifyContent:"space-between",
  alignItems: 'center',
  // border: "1px solid green",
  width: '90%',
  // backgroundColor: theme.palette.secondary.main,
  // backgroundColor: "#CAEBF2",
  padding:"0px 15px",
  borderRadius: "5px"
})

const SingleComment = styled(Box)({
  display: "flex",
  flexDirection: 'column',
  justifyContent:"center",
  alignItems: 'flex-start',
  gap: "10px",
  // border: "1px solid green",
  width: '90%',
  backgroundColor: theme.palette.secondary.main,
  // backgroundColor: "#CAEBF2",
  height:"40px",
  padding:"15px 15px",
  borderRadius: "5px",
  // marginBottom: '10px',
  // border: "2px solid green"
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
})

const CommentHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  // border:"1px solid black",
  gap: '15px',
  width: '100%',
  alignItems: 'center',
  height:"15px"

})

const CommentInfo = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  // border:"1px solid black",
  gap: '13px'

})

const StyledDelete = styled(Delete)({
  
    color: "red",
    // border: "2px solid red",
    borderRadius: "3px",
    cursor: "pointer",
    "&:hover": { transform: "scale(104%)" },

})

const initialValue = {
  name: '',
  postId: '',
  comment: '',
  date: new Date(),

}


const Comments = ({ blog }) => {


  const { accountDetails } = useContext(DataContext);

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getData = async() => {
      const response =  await API.getAllComments(blog._id)
      if(response.isSuccess){
        setComments(response.data)
      }
    }
    getData()
   
  }, [blog, toggle])
  

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: accountDetails.username,
      postId: blog._id,
      comment: e.target.value
    })
  }

  const addComment = async (e) => {
    let response = await API.newComment(comment);
    if(response.isSuccess){
      setComment(initialValue);
    }
    setToggle(!toggle)
  }

  const removeComment = async (commentId) => {
    console.log(commentId)
  await API.deleteComment(commentId)
    setToggle(!toggle)
   
  }

  return (
    <CommentsSection>
      {/* Add Comment Box */}
      <AddCommentBox>
        <Avatar alt="Remy Sharp" src="/images/llama.png" />
        <TextareaAutosize
          placeholder="Add a Comment..."
          style={{ width: "80%", height: "30px", margin:"0px 10px" }}
          value={comment.comment}
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={(e) => addComment(e)}>Post</Button>
      </AddCommentBox>

      <CommentsList>

      {comments && comments.length > 0 &&
        comments.map( comment => (

          <SingleComment>
            <CommentHeader>
              <CommentInfo>
                <Typography sx={{color: '#586994', fontSize: "12px"}}>{comment.name}</Typography>
                <Typography sx={{color: '#586994', fontSize: "12px"}} >{new Date(comment.date).toDateString()}</Typography>
              </CommentInfo>
              { comment.name === accountDetails.username && <StyledDelete color="error" onClick={() => removeComment(comment._id)}/> }
              {/* <StyledDelete color="error" /> */}
            </CommentHeader>
            <Box>
              <Typography>{comment.comment}</Typography>
            </Box>
          </SingleComment>


        )) 
      }

  


      </CommentsList>

    </CommentsSection>
  );
};

export default Comments;
