import jwt from 'jsonwebtoken';

export const editorVerify = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.type !== 'editor')
      return res.status(403).json({ message: 'Access denied, editor only' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
