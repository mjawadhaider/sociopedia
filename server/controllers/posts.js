import Post from '../models/Post.js';
import User from '../models/User.js';

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);
    } catch (error) {
        console.error('<<<<<--------------Start-------------------->>>>>');
        console.error(error.message);
        console.error('<<<<<---------------End--------------------->>>>>');
        res.status(409).json({ error: error.message });
    }
};

// READ
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        console.error('<<<<<--------------Start-------------------->>>>>');
        console.error(error.message);
        console.error('<<<<<---------------End--------------------->>>>>');
        res.status(404).json({ error: error.message });
    }
};
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        console.error('<<<<<--------------Start-------------------->>>>>');
        console.error(error.message);
        console.error('<<<<<---------------End--------------------->>>>>');
        res.status(404).json({ error: error.message });
    }
};

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        console.log(post, 'post before');

        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        console.log(post, 'post after');
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('<<<<<--------------Start-------------------->>>>>');
        console.error(error.message);
        console.error('<<<<<---------------End--------------------->>>>>');
        res.status(404).json({ error: err.message });
    }
};
