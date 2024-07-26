import { admin} from '../config/firebase.js';

export const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
  
    if (!idToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.decoded = decodedToken;
      next();
    } catch (error) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
};