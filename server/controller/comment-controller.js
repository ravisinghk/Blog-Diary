
import Comment from '../model/comment.js'

export const newComment = async (req, res) => {
    try {
        console.log(req.body)
        const comment =  await new Comment(req.body);
        comment.save();

        return res.status(200).json({msg: 'Comment Added Successfully'})
        
    } catch (error) {
         return res.status(500).json(error)
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id })
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteComment = async (req, res) => {

    console.log("Hello")
    console.log(req.body)

    try {
        const comment = await Comment.findById(req.params.id);
        await comment.delete();
        return res.status(200).json({msg: 'Comment Deleted Successfully'})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}