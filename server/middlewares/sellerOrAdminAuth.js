import jwt from 'jsonwebtoken';

export const sellerOrAdminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (decodedToken.role !== 'seller' && decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Access restricted to sellers or admins only' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
