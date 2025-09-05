import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    // If no cookie token, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await User.findById(decode.userId).select('_id username email');

    if (!userDoc) {
      return res.status(401).json({ msg: 'Invalid token, user not found' });
    }

    req.user = { id: userDoc._id.toString(), username: userDoc.username, email: userDoc.email };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}; 