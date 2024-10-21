import express from 'express';
import { db } from '../../config/firebase.js';
import { doc, getDocs, setDoc, addDoc, collection } from 'firebase/firestore';

export const getArticles = async (req, res) => {
  try {
    const articlesCollectionRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesCollectionRef);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      message: 'Articles Found',
      articles: articles,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postArticles = async (req, res) => {
  try {
    const articleData = req.body;
    const articlesCollectionRef = collection(db, 'articles');

    await addDoc(articlesCollectionRef, articleData);

    res.status(200).json({
      message: 'Article saved successfully',
      articleId: articleData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
