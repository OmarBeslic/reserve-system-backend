import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUser, loginUser } from '../services/authService';
import { config } from '../config';
export const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const existingUser = await getUser(userData.email);
    if (existingUser) {
      throw new Error('user_exists');
    }
    const user = await createUser(userData);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
export const login = async (req:Request, res:Response)=>{
  try {
    const loginData = req.body;
    const user = await getUser(loginData.email);
    if(!user) throw new Error("user_not_found");
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if(!isPasswordValid) throw new Error("invalid_password");

    const token = jwt.sign({ userId: user.id }, config.jwtSecret as string, {
      expiresIn: '1h',
    });
    res.status(200).json({message:"Login successful", token});
    return;
  } catch (error) {
    if(error instanceof Error){
      res.status(400).json({error:error.message});
    }else{
      res.status(500).json({error:"An unexpected error occurred"});
    } 
  }
}

