const mongoose = require("mongoose");
const Blog = require("../model/Blog");

// Writing codes for our CRUD (create,read,update,delete) operations

//Fetching blog posts

const fetchListOfBlogs = async (req, res) => {
  let blogPosts;
  try {
    blogPosts = await Blog.find();
  } catch (e) {
    console.log(e);
  }

  if (!blogPosts) {
    return res.stattus(404).json({ message: "No blogs have been found" });
  }

  return res.stattus(200).json({ blogPosts });
};

// Adding a new blog post

const addNewBlogPost = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newBlogPost = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newBlogPost.save();
  } catch (e) {
    console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlogPost.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newBlogPost });
};

// Deleting a blog post

const deleteBlogPost = async (req, res) => {
  const id = req.params.id;

  try {
    const currentBlogPost = await Blog.findByIdAndDelete(id);
    if (!currentBlogPost) {
      return res.status(400).json({ message: "Blog post not found" });
    }
    return res.status(200).json({ message: "Blog post successfully deleted" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Unable to delete post, please try again" });
  }
};

//Updating a blog post

const updateBlogPost = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  let blogPostToUpdate;

  try {
    blogPostToUpdate = await Blog.findByIdAndUpdate(id, { title, description });
  } catch (e) {
    console.log(e);

    return res.send(500).json({
      message:
        "Something went wrong while perfoming an update!! Please try again",
    });
  }

  if (!blogPostToUpdate) {
    return res.status(500).json({ message: "Unable to update" });
  }

  return res.status(200).json({ blogPostToUpdate });
};

module.exports = {
  fetchListOfBlogs,
  deleteBlogPost,
  updateBlogPost,
  addNewBlogPost,
};
