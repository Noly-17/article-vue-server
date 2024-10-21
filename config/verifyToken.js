import admin from './firebaseAdmin.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res
      .status(403)
      .send({ error: 'No token provided, authorization denied.' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    const userId = req?.params?.id;
    if (userId) {
      const firestore = admin.firestore();
      const userDoc = await firestore.collection('users').doc(userId).get();

      if (!userDoc.exists)
        return res.status(404).send({ error: 'User not found.' });

      const userData = userDoc.data();
      const accountType = userData.type;

      if (!accountType)
        return res.status(400).send({ error: 'User account type not found.' });

      req.type = accountType;
    }
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(403).send({ error: 'Token has expired.' });
    } else if (error.code === 'auth/invalid-id-token') {
      return res.status(403).send({ error: 'Invalid token.' });
    }
    return res.status(403).send({ error: 'Unauthorized access.' });
  }
};

export default verifyToken;
