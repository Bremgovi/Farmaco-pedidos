import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (requiredType?: number) => (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Token is invalid" + err});
      return;
    }
    
    if (requiredType !== undefined && (user as any).user.userTypeId !== requiredType) {
      return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
    }
    
    (req as any).user = user;
    next();
  });
};

export default authenticateToken;
