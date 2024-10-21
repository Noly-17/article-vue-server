import admin from 'firebase-admin';
import serviceAccount from './article.json' assert { type: 'json' };

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

export default admin;
