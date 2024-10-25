import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    default: 'For Edit',
  },
  writer: {
    type: String,
    required: [true, 'Writer is required'],
  },
  editor: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
