import express from "express";
import { deleteComment, getComments, newComment,  } from "../controller/comment-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { createPost, getAllBlogs, getBlog, updateBlog, deleteBlog } from "../controller/post-controller.js";
import { loginUser, logoutUser, signupUser,  } from "../controller/user-controller.js";

import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser);

// Here, the middleware uploads the file on mongodb....
// Inorder to perform some task before actual api call, middleware is used
router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename',  getImage)

router.post('/createPost', authenticateToken, createPost);
router.get('/blogs', authenticateToken, getAllBlogs )
router.get('/blog/:id', authenticateToken, getBlog )
router.put('/update/:id', authenticateToken, updateBlog)

router.delete('/delete/:id', authenticateToken, deleteBlog)

router.post('/comment/new', authenticateToken, newComment)
router.get('/comments/:id', authenticateToken, getComments)
router.delete('/comment/delete/:id', authenticateToken, deleteComment)


export default router;