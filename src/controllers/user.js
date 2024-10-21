import express from 'express';
import { db } from '../../config/firebase.js';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists())
      res.status(404).json({ error: 'User data not found in Firestore' });

    const userData = {
      ...userDoc.data(),
    };

    res.status(200).json({
      message: 'User Found',
      user: userData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { id, email, fName, lName, type = null, status = null } = req.body;

  if (!email || !fName || !lName || !id)
    return res
      .status(400)
      .json({ error: 'All fields including user ID are required' });

  try {
    const userDocRef = doc(collection(db, 'users'), id);

    await setDoc(userDocRef, {
      id,
      email,
      fName,
      lName,
      type,
      status,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'User signed up successfully',
      data: {
        uid: id,
        email,
      },
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(400).json({ error: error.message });
  }
};
