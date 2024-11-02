import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("req", req.headers);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  } 
  jwt.verify(token, config.jwtSecret as string, (err, decoded) => {
    if (err) {
       res.status(401).json({ error: 'Unauthorized' });
       return;
    }
    console.log(decoded); 
     res.status(200).json({message:"Token is valid"});
    next();
  });
};