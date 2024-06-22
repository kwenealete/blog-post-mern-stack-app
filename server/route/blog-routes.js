const express = require("express");
const blogRouter = express.Router();

const {
  addNewBlogPost,
  updateBlogPost,
  deleteBlogPost,
  fetchListOfBlogs,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlogPost);
blogRouter.put("/update/:id", updateBlogPost);
blogRouter.delete("/delete/:id", deleteBlogPost);

module.exports = blogRouter;
