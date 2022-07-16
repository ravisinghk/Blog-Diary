
import Post from '../model/post.js'


export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();
        res.status(200).json('Post saved successfully');

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}


export const getAllBlogs = async (req, res) => {

    let category =  req.query.category;
    let blogs;
    try {

        if(category) {
            blogs = await Post.find({category: category})
        }
        else{

            blogs = await Post.find({})
        }

        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const getBlog = async (req, res) => {
    console.log("req.params: ",req.params)
    try {
        const blog = await Post.findById(req.params.id)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const updateBlog = async (req, res) => {

    try {
        const blog = await Post.findById(req.params.id)

        if(!blog){
            return res.status(404).json({msg: 'Post Not Found'})
        }

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body })  //$set, $addToSet
        return res.status(200).json({msg: 'post updated successfully'})

    } catch (error) {
        return res.status(500).json({error})
    }
}

export const deleteBlog = async (req, res) => {

    try {
        // const blog = await Post.findByIdAndDelete(req.params.id) // we can use this one too...it will directly delete
        const blog = await Post.findById(req.params.id)

        if(!blog){
            return res.status(404).json({msg: 'Post Not Found'})
        }

        await blog.delete();

        return res.status(200).json({msg: 'post deleted successfully'})

    } catch (error) {
        return res.status(500).json({error})
    }
}