import Article from '../models/articles.js';
import { upload } from '../middlewares/upload.js';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

export const getArticles = async (req, res) => {
  const type = req.body.type;
  try {
    const articles = await Article.find();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const updatedArticles = articles.map((article) => {
      if (article.imageUrl) article.imageUrl = `${baseUrl}${article.imageUrl}`;
      return article;
    });
    res.status(200).json({
      message: 'Articles retrieved successfully',
      articles: updatedArticles,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSingleArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne(id);
    res.status(200).json({ message: 'Article get successfully', article });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postArticles = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const {
      title,
      link,
      type,
      status = 'For Edit',
      writer,
      editor = '',
      content,
      company,
      date,
    } = req.body;

    try {
      const newArticle = new Article({
        title,
        link,
        type,
        status,
        writer,
        editor,
        content,
        company,
        date,
      });

      if (req.file) newArticle.imageUrl = `/uploads/${req.file.filename}`;

      const savedArticle = await newArticle.save();

      res.status(201).json({
        message: 'Article posted successfully',
        article: savedArticle,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

export const publishArticle = async (req, res) => {
  const { id } = req.params;
  const { editor, status = 'Published' } = req.body;
  const updateData = {
    editor,
    status,
  };

  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedArticle)
      return res.status(404).json({ message: 'Article not found' });

    res.status(200).json({
      message: 'Article updated successfully',
      updatedArticle,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
};

export const editArticle = (req, res) => {
  const { id } = req.params;
  const __dirname = dirname(fileURLToPath(import.meta.url));

  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: err.message });
    }

    const updateData = req.body;

    try {
      const article = await Article.findById(id);
      if (!article)
        return res.status(404).json({ message: 'Article not found' });

      if (req.file) {
        if (article.imageUrl) {
          const oldImagePath = path.join(
            __dirname,
            '../uploads',
            path.basename(article.imageUrl)
          );

          fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting the old image:', unlinkErr);
            } else {
              console.log('Old image successfully deleted');
            }
          });
        }

        article.imageUrl = `/uploads/${req.file.filename}`;
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      if (article.imageUrl) {
        article.imageUrl = `${baseUrl}${article.imageUrl}`;
      }

      Object.assign(article, updateData);

      const updatedArticle = await article.save();
      console.log('Article updated successfully:', updatedArticle);

      return res.status(200).json({
        message: 'Article updated successfully',
        updatedArticle,
      });
    } catch (error) {
      console.error('Error updating article:', error);
      return res
        .status(500)
        .json({ message: 'Error updating article', error: error.message });
    }
  });
};
