// Import Mongoose
const mongoose = require('mongoose');

// Comment Schema (Subdocument)
const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: 'General',
    trim: true,
  },
  likes: {
    type: [String], // Array of usernames who liked the post
    default: [],
  },
  comments: [CommentSchema], // Embedding comments as subdocuments
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Middleware to update the 'updatedAt' field
BlogPostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and Export BlogPost Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;